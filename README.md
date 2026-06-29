# 🎙️ AI Voice Agent SaaS Platform

<p align="center">
  
  <p align="center">
    A modern, production-ready AI Voice Agent platform built with <strong>Next.js, Node.js, PostgreSQL, OpenAI Realtime API, Deepgram, and ElevenLabs.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript">
    <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js">
    <img src="https://img.shields.io/badge/PostgreSQL-Prisma-blue?style=for-the-badge&logo=postgresql">
    <img src="https://img.shields.io/badge/OpenAI-Realtime-purple?style=for-the-badge&logo=openai">
    <img src="https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss">
  </p>

---

## 📖 About

AI Voice Agent is a full-stack SaaS application that enables users to create, customize, test, and deploy intelligent AI-powered voice assistants capable of natural real-time conversations.

Designed with scalability, security, and maintainability in mind, this platform integrates cutting-edge AI technologies to deliver seamless voice interactions for customer support, automation, sales, and virtual assistant solutions.

---

# ✨ Features

## 🔐 Authentication

* Email & Password Authentication
* JWT Authentication
* Google OAuth Login
* Forgot Password
* Reset Password
* Secure Protected Routes

---

## 🤖 AI Agent Management

* Create AI Voice Agents
* Edit Existing Agents
* Delete Agents
* Duplicate Agents
* Custom Instructions
* Personality Configuration
* Language Selection
* Voice Selection
* Temperature Adjustment
* Knowledge Base Assignment

---

## 📞 Voice Calling

* Real-Time AI Conversations
* Live Audio Streaming
* Inbound Calls
* Outbound Calls
* Call Controls
* Mute
* Hold
* End Call
* Transfer Calls

---

## 💬 Conversation Management

* Live Speech Transcription
* Conversation History
* Search Conversations
* Export as PDF
* Export as CSV
* Export as JSON

---

## 🧠 AI Playground

* Prompt Testing
* Voice Testing
* Function Calling
* Tool Calling
* Knowledge Base Testing
* Latency Monitoring
* Response Time Analytics
* Token Usage Tracking

---

## 📚 Knowledge Base

* Upload PDF Files
* Upload DOCX Files
* Upload TXT Files
* OpenAI Embeddings
* Vector Search
* Retrieval-Augmented Generation (RAG)

---

## 📊 Analytics Dashboard

* Total AI Agents
* Active Agents
* Total Calls
* Total Minutes
* Daily Activity
* Average Call Duration
* Token Usage
* User Growth Analytics

---

## 👨‍💼 Admin Panel

* User Management
* AI Agent Monitoring
* Call Monitoring
* Billing Monitoring
* Activity Logs
* System Analytics

---

# 🛠️ Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* ShadCN UI
* Zustand

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* JWT
* Google OAuth

### Artificial Intelligence

* OpenAI GPT Models
* OpenAI Realtime API
* Function Calling
* Tool Calling

### Voice Services

* Deepgram Speech-to-Text
* ElevenLabs Text-to-Speech

### Storage

* AWS S3

### DevOps

* Docker
* Docker Compose
* GitHub Actions

---

# 📂 Project Structure

```text
AI-Voice-Agent/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── types/
│   │   └── utils/
│
├── docker/
├── docs/
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/MisbahZehra/aivoiceagent.git

cd aivoiceagent
```

---

## Install Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Install Backend

```bash
cd backend

npm install

npm run dev
```

---

## Database Migration

```bash
npx prisma migrate dev

npx prisma generate
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=

JWT_SECRET=

OPENAI_API_KEY=

DEEPGRAM_API_KEY=

ELEVENLABS_API_KEY=

AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

AWS_REGION=

AWS_BUCKET_NAME=
```

---

# 🧪 Available Scripts

```bash
npm run dev

npm run build

npm run test

npm start
```

---

# 🔒 Security

* JWT Authentication
* Helmet Middleware
* Rate Limiting
* Input Validation
* XSS Protection
* CSRF Protection
* SQL Injection Prevention
* Secure API Design

---

# 📈 Future Enhancements

* Multi-Tenant SaaS
* Stripe Subscription Billing
* WhatsApp Integration
* CRM Integration
* AI Workflow Builder
* Multi-Language Support
* Advanced Reporting
* Team Collaboration
* API Marketplace

---

# 📸 Screenshots

> Add screenshots of your Dashboard, AI Agent Builder, Voice Playground, Analytics Dashboard, and Call Interface here.

---

# 🚀 Deployment

The application can be deployed using:

* Docker
* Docker Compose
* Vercel (Frontend)
* Railway / Render (Backend)
* PostgreSQL (Neon, Supabase, Railway)

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you'd like to improve this project, feel free to fork the repository and submit a pull request.

---

👩‍💻 Author

## Misbah Zehra

**Frontend Developer • Full Stack Developer • AI Enthusiast**

---

# 📄 License

This project is created for educational, portfolio, and professional demonstration purposes.

---

<div align="center">

## ⭐ If you like this project, don't forget to give it a Star!

**Built with ❤️ by Misbah Zehra**

</div>
