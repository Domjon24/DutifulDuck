import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { promises as fs } from "fs";
import path from "path";
import dotenv from "dotenv";

// Load hello.env from the same folder
dotenv.config({ path: path.join(process.cwd(), "pages", "api", "hello.env") });

const apiKey = process.env.MY_API_KEY;

if (!apiKey) {
  throw new Error("MY_API_KEY is missing");
}

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey,
});

// import OpenAI from "openai";

// const openai = new OpenAI({
//         baseURL: 'https://api.deepseek.com',
//         apiKey: ''
// });

// export async function main() {
 
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant from canada. Use canadian slang/jargon when replying (if feesiable)" }],
//     max_tokens: 300,
//     model: "deepseek-chat",

//   });

//   console.log(completion.choices[0].message.content);
// }

// main();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    const filePath = path.join(process.cwd(), "pages/api/commands.txt");
    const fileContent = await fs.readFile(filePath, "utf-8");

    const commands = ["leap", "roll", "sleep", "pray", "wrestle", "fetch"];
    const normalizedInput = question.trim().toLowerCase();
    const matchedCommand = commands.find((cmd) =>
      normalizedInput.includes(cmd)
    );

    const systemPrompt = `
You are a fallback bot in a game similar to BK's 'Subservient Chicken'.
A user will try to guess one of the commands from the list: ${fileContent.trim()}.

If the answer matches *exactly*, respond: "Correct!".
If it’s a close match (e.g., synonym or variation), treat it as correct.
If it’s way off, guide the user toward the correct category without ever listing or revealing the valid commands.

Never give away or list any command. Be concise and mysterious.
`;

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      model: "deepseek-chat",
      max_tokens: 300,
    });

    res.status(200).json({
      ...response,
      matchedCommand: matchedCommand || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}