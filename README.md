# OmniBrain AI – Document RAG Search Engine

A full-stack RAG platform that lets users upload PDFs and ask questions using semantic vector search.

Built and maintained by **Kaushal Raithatha**.

## Features
- Upload PDF documents via REST API
- Chunk & embed using LangChain + OpenAI embeddings
- Store and query embeddings in PostgreSQL with pgvector
- Async queue via Redis + BullMQ
- JWT authentication

## Tech Stack
| Layer | Technology |
|-------|----------|
| Frontend | React.js, TailwindCSS |
| Backend | Node.js, Express.js, LangChain |
| Vector DB | PostgreSQL + pgvector |
| Queue | Redis + BullMQ |
| DevOps | Docker, Docker Compose |

## Quick Start
```bash
git clone https://github.com/Kausha07/kaushal-quivr-brain.git
cd kaushal-quivr-brain
cp .env.example .env
docker-compose up --build
```

## Author
**Kaushal Raithatha** – [GitHub](https://github.com/Kausha07)
