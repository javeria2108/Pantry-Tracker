import { OpenAI } from 'openai';

const openAI = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,dangerouslyAllowBrowser: true });

export const getItemNameFromImage = async (imageUrl: string) => {
  try {
    const response = await openAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'what is the name of item in this image',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'low',
              },
            },
          ],
        },
      ],
    });
    console.log('Response:', response);
    const itemName = response.choices[0].message.content;
    return itemName || 'unknown';
  } catch (error) {
    console.error('Error fetching item name:', error);
    return '';
  }
};
