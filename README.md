# NPC Dialogue Starter

A minimal template for building LLM-powered NPC dialogue systems. Works with any OpenAI-compatible API.

## Quick Start

```bash
npm install
cp .env.example .env  # add your API key
node index.js
```

## Architecture

```
Player Input → Context Builder → LLM API → Response Parser → Game Engine
                    ↑                              |
                    └──── Memory / State ──────────┘
```

## Features

- Dialogue context management (short-term + long-term memory)
- Character personality injection via system prompts
- Response parsing with emotion/action tags
- Conversation history windowing
- Input validation for config and NPC IDs
- Emotion-aware temperature control

## Modules

| Module | Description |
|--------|-------------|
| `DialogueManager` | Core dialogue generation with session history |
| `ContextBuilder` | NPC profile-based context injection |
| `MemoryStore` | Long-term NPC memory with relevance scoring |
| `Emotion System` | Emotion-aware prompt modification |

## License

MIT
