import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
  const topic = event.queryStringParameters?.topic || 'nature';
  const token = process.env.API_UNSPLASH;
  const baseUrl = 'https://api.unsplash.com';
  const endpoint = '/photos/random';

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Unsplash API key configuration' }),
    };
  }

  try {
    const requests: Promise<unknown>[] = [];
    let remainingImages = parseInt(event.queryStringParameters?.count || '8', 10);
    let remainingRequests = 50;

    while (remainingImages > 0) {
      const fetchCount = Math.min(remainingImages, 30);
      const params = new URLSearchParams({
        query: topic,
        count: fetchCount.toString(),
        client_id: token,
      });
      const handler = async (r: Response) => {
        if (!r.ok) throw new Error(`Unsplash API error: ${r.status}`);
        const limitHeader = r.headers.get('x-ratelimit-remaining');
        if (limitHeader) {
          const limit = parseInt(limitHeader, 10);
          if (limit < remainingRequests) {
            remainingRequests = limit;
          }
        }
        return r.json();
      };
      requests.push(fetch(`${baseUrl}${endpoint}?${params.toString()}`).then(handler));
      remainingImages -= fetchCount;
    }

    const results = (await Promise.all(requests)).flat();
    const imageMap = new Map(
      results.map((img) => {
        const isObject = typeof img === 'object' && img !== null;
        if (!isObject || !('id' in img)) {
          throw new TypeError('Received items in unexpected format');
        }
        return [img.id, img];
      }),
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        images: imageMap.values().toArray(),
        remainingRequests,
      }),
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }
};
