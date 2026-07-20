import "dotenv/config";
import OpenAI from "openai";

async function main() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseURL = process.env.DEEPSEEK_BASE_URL;
  const model = process.env.DEEPSEEK_MODEL;

  if (!apiKey || !baseURL || !model) {
    throw new Error(
      "请先在 .env 中配置 DEEPSEEK_API_KEY、DEEPSEEK_BASE_URL 和 DEEPSEEK_MODEL"
    );
  }

  const client = new OpenAI({
    apiKey,
    baseURL
  });

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "user", content: "北京的天气通常有什么特点？" }
    ]
  });

  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
