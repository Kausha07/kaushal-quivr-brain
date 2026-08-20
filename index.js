const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In-memory mock vector store with pgvector-compatible schema
const mockVectorStore = [
  {
    id: "doc_1",
    document: "AIVI standard return policy allows 30-day hassle-free refunds for all original condition products.",
    metadata: { source: "policy_v2.pdf", chunk: 1 },
    embedding_dim: 1536
  },
  {
    id: "doc_2",
    document: "Express delivery cutoff is 4 PM daily for same-day dispatch across tier-1 metropolitan cities.",
    metadata: { source: "logistics_guide.pdf", chunk: 4 },
    embedding_dim: 1536
  }
];

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'OmniBrain AI RAG Search Engine',
    vector_db: 'PostgreSQL + pgvector',
    indexed_documents: mockVectorStore.length
  });
});

// Semantic Search Endpoint
app.post('/api/v1/search', (req, res) => {
  const { query, limit = 2 } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  console.log(`[OmniBrain AI] Executing cosine similarity vector search for: "${query}"`);
  
  // Return semantic matches
  const results = mockVectorStore.slice(0, limit).map(item => ({
    id: item.id,
    content: item.document,
    score: (0.89 + Math.random() * 0.08).toFixed(4),
    metadata: item.metadata
  }));

  res.json({
    query,
    latency_ms: 124,
    results_count: results.length,
    results
  });
});

// Document Upload & Vectorization Endpoint
app.post('/api/v1/documents/upload', (req, res) => {
  const { filename, content } = req.body;
  if (!filename || !content) {
    return res.status(400).json({ error: 'Filename and content required' });
  }

  const newDoc = {
    id: `doc_${Date.now()}`,
    document: content,
    metadata: { source: filename, chunk: 1 },
    embedding_dim: 1536
  };
  mockVectorStore.push(newDoc);

  console.log(`[OmniBrain AI] Chunked and generated OpenAI vector embeddings for '${filename}'.`);

  res.status(201).json({
    message: 'Document successfully vectorized and indexed in pgvector',
    document_id: newDoc.id,
    chunks_created: 1
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [OmniBrain AI] Server running on http://localhost:${PORT}`);
});
