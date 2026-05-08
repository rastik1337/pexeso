import type { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
  const theme = event.queryStringParameters?.theme || 'nature';
  const count = event.queryStringParameters?.count || '8';
  const token = process.env.API_UNSPLASH;

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Unsplash API key configuration' }),
    };
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=${count}&query=${theme}&client_id=${token}`,
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }
};
