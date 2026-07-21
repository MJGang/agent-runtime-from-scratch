# Agent Runtime from Scratch

这是配套教程持续迭代的代码项目。当前检查点允许调用方通过 `provider:model` 在运行时选择模型。

## 环境要求

- Node.js
- npm
- 你自己的 DeepSeek API Key
- 你自己的 OpenRouter API Key

## 初始化

安装依赖：

```bash
npm install
```

复制 `.env.example` 为 `.env`，再填入你自己的配置：

```dotenv
DEEPSEEK_API_KEY=你的真实Key
DEEPSEEK_BASE_URL=https://api.deepseek.com

OPENROUTER_API_KEY=你的真实Key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

`.env` 已经被 Git 忽略，不要把真实 Key 写入代码、提交记录或公开日志。

## 发出请求

选择 DeepSeek：

```bash
npm run dev -- deepseek:deepseek-v4-flash
```

选择 OpenRouter：

```bash
npm run dev -- openrouter:nvidia/nemotron-3-nano-30b-a3b:free
```

命令行参数使用 `provider:model` 格式。程序只会调用本次选中的模型，并打印完整的 Chat Completions 响应。

## 本地验证

```bash
npm run typecheck
npm run build
```

## 当前边界

项目目前只引入了 `ProviderConfig`、`ModelRef`、`provider:model` 解析和一个手工维护的 Provider Map。`model_id` 会直接传给 Provider；还没有模型治理、协议适配、工具调用或 Agent Loop。
