<div align="center">

# 🚀 Vrushket More — Portfolio

### AI/ML Engineer | Data Scientist | Full-Stack Developer

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-vmore2.github.io-00d4ff?style=for-the-badge)](https://vmore2.github.io)
[![AI Chatbot](https://img.shields.io/badge/🤖_AI_Assistant-Chat_Now-7c3aed?style=for-the-badge)](https://vrushket-vrushket-assistant.hf.space)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/vrushketmore)

<br/>

**A premium portfolio website featuring an AI-powered chatbot that answers questions about my experience using RAG (Retrieval-Augmented Generation).**

[Features](#-features) • [Tech Stack](#-tech-stack) • [AI Chatbot](#-ai-chatbot) • [Local Setup](#-local-setup) • [Architecture](#-architecture)

</div>

---

## ✨ Features

### 🎨 Premium Design
- **Dark space theme** with glassmorphism effects
- **Animated gradients** and hover interactions
- **Responsive layout** — works on all devices
- **Smooth scroll** navigation
- **Intersection Observer** animations

### 💬 AI Chatbot Assistant
- **RAG-powered** — answers from my actual resume & projects
- **Real-time** responses via Groq API
- **Embedded widget** — chat without leaving the site
- **Personality-driven** — reflects my communication style

### 📂 Sections
- **Hero** — Dynamic introduction with stats
- **About** — Background and journey
- **Projects** — Filterable project cards with modals
- **Skills** — Animated progress bars
- **Experience** — Interactive timeline
- **Publications** — Research papers
- **Contact** — Direct outreach form

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Custom properties, animations, glassmorphism |
| JavaScript | Interactivity, Intersection Observer API |
| Font Awesome | Icons |
| Google Fonts | Inter typography |

### AI Chatbot
| Technology | Purpose |
|------------|---------|
| Python | Backend logic |
| Gradio | Chat interface & hosting |
| Groq API | LLM inference (Llama 3.3 70B) |
| ChromaDB | Vector database |
| sentence-transformers | Text embeddings |

### Deployment
| Service | Purpose |
|---------|---------|
| GitHub Pages | Portfolio hosting |
| HuggingFace Spaces | Chatbot hosting |

---

## 🤖 AI Chatbot

### How It Works

The chatbot uses **Retrieval-Augmented Generation (RAG)** to answer questions about my experience:

```
User Question
     │
     ▼
┌─────────────────────────┐
│  Embed Question         │  ← sentence-transformers
│  (384-dim vector)       │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Vector Search          │  ← ChromaDB
│  (Find relevant docs)   │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  LLM Generation         │  ← Groq (Llama 3.3)
│  (Context + Question)   │
└───────────┬─────────────┘
            │
            ▼
      AI Response
```

### Knowledge Base

The chatbot is trained on:
- `resume.md` — Full resume content
- `projects.md` — Detailed project descriptions
- `skills.md` — Technical capabilities
- `personality.md` — Response style guide
- `faq.md` — Common questions

### Try It

```
💬 "What projects has Vrushket worked on?"
💬 "Tell me about his ML experience"
💬 "What tech stack does he use?"
💬 "Is he available for opportunities?"
```

---

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main HTML
├── styles.css              # All styling (2000+ lines)
├── script.js               # Interactivity
├── chatbot-widget.css      # Floating chat button
│
├── chatbot/                # Chatbot source (local dev)
│   ├── app.py              # Gradio + RAG logic
│   ├── requirements.txt    # Python dependencies
│   └── knowledge_base/     # Documents for RAG
│       ├── resume.md
│       ├── projects.md
│       ├── skills.md
│       ├── personality.md
│       └── faq.md
│
└── assets/                 # Images & media
```

---

## 🚀 Local Setup

### Portfolio

```bash
# Clone the repository
git clone https://github.com/vmore2/vmore2.github.io.git
cd vmore2.github.io

# Open in browser
start index.html  # Windows
open index.html   # macOS
```

### Chatbot (Local Development)

```bash
# Navigate to chatbot directory
cd chatbot

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Set API key
export GROQ_API_KEY="your-groq-api-key"

# Run
python app.py
```

---

## 🏗 Architecture

### CSS Design System

```css
:root {
    /* Dark Space Theme */
    --bg-primary: #0a0f1a;
    --bg-secondary: #0d1424;
    
    /* Accent Colors */
    --accent-cyan: #00d4ff;
    --accent-purple: #7c3aed;
    --accent-pink: #ff0080;
    
    /* Signature Gradient */
    --gradient-primary: linear-gradient(135deg, 
        var(--accent-cyan), 
        var(--accent-purple), 
        var(--accent-pink)
    );
}
```

### Glassmorphism Effect

```css
.card {
    background: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(148, 163, 184, 0.1);
}
```

### RAG Pipeline

```python
# Embed user question
embedding = model.encode(question)

# Search knowledge base
results = collection.query(query_texts=[question], n_results=5)

# Generate response with context
response = groq.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": f"Context: {results}"},
        {"role": "user", "content": question}
    ]
)
```

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| Lighthouse Performance | 95+ |
| First Contentful Paint | < 1.5s |
| Chatbot Response Time | < 2s |
| Mobile Responsive | ✅ |

---

## 🔮 Future Improvements

- [ ] Add blog section with markdown support
- [ ] Implement dark/light theme toggle
- [ ] Add project detail pages
- [ ] Streaming chatbot responses
- [ ] Multi-language support

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contact

**Vrushket More**

- 📧 Email: [vmore2@binghamton.edu](mailto:vmore2@binghamton.edu)
- 💼 LinkedIn: [linkedin.com/in/vrushketmore](https://linkedin.com/in/vrushketmore)
- 💻 GitHub: [github.com/vmore2](https://github.com/vmore2)
- 🌐 Portfolio: [vmore2.github.io](https://vmore2.github.io)

---

<div align="center">

**Built with ❤️ and ☕**

*If you found this helpful, consider giving it a ⭐!*

</div>
