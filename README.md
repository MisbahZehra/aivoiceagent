# AI Voice Agent

This workspace contains a separate frontend and backend setup for the AI voice agent project.

## Structure
- `frontend/` — Next.js 15 application
- `backend/` — Express + TypeScript API server
- 
📂 Project Structure
project-root/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── config/
│   │   └── utils/
│
├── docker/
├── docs/
└── README.md

- AI Voice Agent SaaS Platform
A production-ready AI Voice Agent platform built using Next.js, Node.js, PostgreSQL, OpenAI Realtime API, Deepgram, ElevenLabs, and AWS S3.

🚀 Overview
AI Voice Agent SaaS Platform is a full-stack application that allows users to create, manage, test, and deploy intelligent AI voice agents. The platform provides real-time voice conversations, agent customization, transcript management, analytics, and knowledge base integration.

The system is designed with scalability, security, and maintainability in mind, following modern software engineering best practices.

✨ Features
Authentication & Authorization
User Registration
User Login
JWT Authentication
Google Authentication
Password Reset Functionality
Protected Routes
AI Agent Management
Create AI Agents
Edit Existing Agents
Delete Agents
Duplicate Agents
Configure Agent Personality
Custom Instructions
Voice Selection
Language Configuration
Temperature Control
Voice Calling System
Real-Time Voice Conversations

Inbound Calling Support

Outbound Calling Support

Live Audio Streaming

Call Controls

Mute
Hold
Transfer
End Call
Conversation Management
Live Transcription

Conversation History

Search Conversations

Export Conversations

PDF
CSV
JSON
AI Testing Playground
Prompt Testing
Voice Testing
Function Calling Testing
Knowledge Base Testing
Response Time Monitoring
Token Usage Tracking
Latency Monitoring
Knowledge Base
PDF Upload Support
DOCX Upload Support
TXT Upload Support
Embedding Generation
Vector Search
Retrieval-Augmented Generation (RAG)
Analytics Dashboard
Total Calls
Total Agents
Active Agents
Total Minutes
Token Usage Statistics
Average Call Duration
Daily Activity Charts
Admin Panel
User Management
Agent Monitoring
Call Monitoring
Billing Monitoring
Log Management
🛠️ Technology Stack
Frontend
Next.js 15
React
TypeScript
Tailwind CSS
ShadCN UI
Zustand
Backend
Node.js
Express.js
TypeScript
Database
PostgreSQL
Prisma ORM
AI Services
OpenAI GPT Models
OpenAI Realtime API
Function Calling
Tool Calling
Voice Services
Deepgram Speech-to-Text
ElevenLabs Text-to-Speech
Storage
AWS S3
DevOps
Docker
Docker Compose
GitHub Actions
📂 Project Structure
project-root/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── config/
│   │   └── utils/
│
├── docker/
├── docs/
└── README.md
⚙️ Installation
Clone Repository
git clone https://github.com/MisbahZehra/project-name.git
Frontend Setup
cd frontend
npm install
npm run dev
Backend Setup
cd backend
npm install
npm run dev
Database Migration
npx prisma migrate dev
🔑 Environment Variables
Create a .env file and configure:

DATABASE_URL=

JWT_SECRET=

OPENAI_API_KEY=

DEEPGRAM_API_KEY=

ELEVENLABS_API_KEY=

AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

AWS_REGION=

AWS_BUCKET_NAME=
🧪 Testing
Frontend Tests
npm run test
Backend Tests
npm run test
Build Verification
npm run build
🔒 Security Features
JWT Authentication
Rate Limiting
Helmet Security Middleware
Input Validation
XSS Protection
CSRF Protection
SQL Injection Prevention
Secure API Design
🚀 Deployment
Docker
docker-compose up --build
Production Build
npm run build
npm start
📈 Future Improvements
Multi-Tenant SaaS Support
Subscription Billing
Stripe Integration
WhatsApp Integration
CRM Integration
Multi-Language Support
AI Workflow Automation
Advanced Analytics
👩‍💻 Author
Misbah Zehra

Frontend Developer | AI Enthusiast | Full Stack Developer

📄 License
This project is developed for educational, portfolio, and professional demonstration purposes.

About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Contributors
1
@MisbahZehra
MisbahZehra Misbah Zehra
Footer

