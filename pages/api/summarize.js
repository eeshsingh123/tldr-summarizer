import { Configuration, OpenAIApi } from "openai";
require("dotenv").config({ path: ".env" });

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.text,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });

  res.status(200).json({ result: completion.data });
}
