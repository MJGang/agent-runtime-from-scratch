# Agent Runtime from Scratch

这是配套教程持续迭代的代码项目。当前检查点只完成一件事：通过真实的 DeepSeek API 发出一次模型请求。

## 环境要求

- Node.js
- npm
- 你自己的 DeepSeek API Key

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
```

`.env` 已经被 Git 忽略，不要把真实 Key 写入代码、提交记录或公开日志。

## 发出第一次请求

```bash
npm run dev
```

程序会向 DeepSeek 发送“北京的天气通常有什么特点？”，并在终端打印完整的 Chat Completions 响应。这个问题不依赖实时数据，也不需要工具。模型输出存在随机性，具体措辞不属于本步骤的验收条件。

## 本地验证

单元测试不会调用付费 API：

```bash
npm test
npm run typecheck
npm run build
```

## 当前边界

项目暂时没有 Runtime、Provider、Adapter、Catalog、工具循环或其他抽象。它们只会在后续需求出现、当前写法无法满足时再加入。
