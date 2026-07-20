# Agent Runtime from Scratch

这是配套教程持续迭代的代码项目。当前检查点通过统一的调用函数，分别请求 DeepSeek 与 OpenRouter 上的 Nemotron 模型。

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
DEEPSEEK_MODEL=deepseek-v4-flash

OPENROUTER_API_KEY=你的真实Key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=nvidia/nemotron-3-nano-30b-a3b:free
```

`.env` 已经被 Git 忽略，不要把真实 Key 写入代码、提交记录或公开日志。

## 发出请求

```bash
npm run dev
```

程序会使用相同的问题依次请求 DeepSeek 和 OpenRouter，并分别打印完整的 Chat Completions 响应。本步骤显式关闭流式输出，只观察 Provider、ModelRef 与基础调用结构。

## 本地验证

```bash
npm run typecheck
npm run build
```

## 当前边界

项目目前只引入了 `ProviderConfig`、`ModelRef` 和一个手工维护的 Provider Map。还没有 Catalog、Adapter、Transform、工具循环或完整 Runtime。
