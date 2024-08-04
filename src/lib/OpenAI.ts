import * as dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';
const openAI = new OpenAI();

export const getItemNameFromImage = async (imageUrl: string) => {
  try {
    const response = await openAI.chat.completions.create({
      model: 'gpt-4-vision-preview',
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
    const itemName = response.choices[0];
    return itemName || '';
  } catch (error) {
    console.error('Error fetching item name:', error);
    return '';
  }
};
