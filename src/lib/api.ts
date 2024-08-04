// api.js
export const getRecipeRecommendations = async (items:string[]) => {
    const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    const YOUR_SITE_URL = 'your-site-url';
    const YOUR_SITE_NAME = 'your-site-name';
  
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": 'http://localhost:3000/', // Optional
        "X-Title": 'Pantry-Tracker', // Optional
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "messages": [
          {"role": "user", "content": `Give me a recipe using the following ingredients: ${items.join(", ")}`}
        ],
      })
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.choices[0].message.content;
    } else {
      throw new Error('Failed to fetch recipe recommendations');
    }
  };
  