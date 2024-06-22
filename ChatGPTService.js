import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const API_URL = 'https://api.openai.com/v1/chat/completions';

const ChatGPTService = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4', // Use the model you have access to, e.g., 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return 'An error occurred. Please try again later.';
  }
};

export default ChatGPTService;