import "dotenv/config";
import OpenAI from "openai";

interface ProviderConfig {
  provider_id: string;
  apiKey: string;
  baseURL: string;
}

interface ModelRef {
  provider_id: string;
  model_id: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`请先在 .env 中配置 ${name}`);
  }

  return value;
}

async function callModel(
  providers: ReadonlyMap<string, ProviderConfig>,
  model: ModelRef,
  prompt: string
) {
  const provider = providers.get(model.provider_id);

  if (!provider) {
    throw new Error(`未知的 Provider：${model.provider_id}`);
  }

  const client = new OpenAI({
    apiKey: provider.apiKey,
    baseURL: provider.baseURL
  });

  return client.chat.completions.create({
    model: model.model_id,
    messages: [{ role: "user", content: prompt }],
    stream: false
  });
}

async function main() {
  const providers = new Map<string, ProviderConfig>([
    [
      "deepseek",
      {
        provider_id: "deepseek",
        apiKey: requireEnv("DEEPSEEK_API_KEY"),
        baseURL: requireEnv("DEEPSEEK_BASE_URL")
      }
    ],
    [
      "openrouter",
      {
        provider_id: "openrouter",
        apiKey: requireEnv("OPENROUTER_API_KEY"),
        baseURL: requireEnv("OPENROUTER_BASE_URL")
      }
    ]
  ]);

  const models: ModelRef[] = [
    {
      provider_id: "deepseek",
      model_id: requireEnv("DEEPSEEK_MODEL")
    },
    {
      provider_id: "openrouter",
      model_id: requireEnv("OPENROUTER_MODEL")
    }
  ];

  const prompt = "北京的天气通常有什么特点？";

  for (const model of models) {
    const response = await callModel(providers, model, prompt);

    console.log(`\n=== ${model.provider_id} / ${model.model_id} ===`);
    console.log(JSON.stringify(response, null, 2));
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
