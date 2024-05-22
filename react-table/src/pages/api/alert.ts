import axios from 'axios';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('https://njwinkshi5hyldkqq4srpuoxrm0weqer.lambda-url.us-east-1.on.aws', req.body);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}