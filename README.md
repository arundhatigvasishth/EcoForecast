# 🌱 EcoForecast

**Financial simulation platform for evaluating ROI and risk of sustainability investments for SMEs.**

EcoForecast helps small and medium-sized businesses make data-driven decisions about green transitions — replacing guesswork with financial modeling, risk simulation, and AI-powered insights.

---

## 🔍 The Problem

SMEs want to go green, but face real barriers:

-   Carbon audits are expensive and inaccessible 💸
-   Sustainability consultants are out of reach for most small businesses 🏢
-   Operational data is scattered across bills, receipts, and invoices 📄
-   The financial impact of green investments is unclear and risky

**EcoForecast replaces the leap of faith with a model.**

---

## 🚀 What EcoForecast Does

1. **Input** your operational data — electricity, water, and fuel costs across 4 quarters
2. **Simulate** your current vs. sustainable cost trajectory over 20 years
3. **Visualize** break-even timelines, cost comparisons, and carbon savings
4. **Ask** EcoAdvisor — our AI chatbot — questions about your specific results

---

## ⚙️ How It Works

### Data Input

Users enter quarterly financial data: electricity usage & cost, water usage & cost, and fuel usage & cost across all four quarters of a year.

### Simulation Engine

The backend runs a deterministic financial model that:

-   Projects baseline vs. sustainable costs over a 20-year horizon
-   Calculates break-even year for the green investment
-   Estimates carbon emissions reduction year-over-year

### Scoring

EcoForecast computes:

-   💰 Year 1 cost comparison (baseline vs. sustainable)
-   📈 Investment vs. cumulative savings over time
-   🌿 Carbon footprint reduction trajectory

### AI Layer — EcoAdvisor

Powered by **Groq + LLaMA 3**, EcoAdvisor is an embedded chatbot on the results page. It receives your actual simulation data as context and answers questions like:

-   _"When do I break even?"_
-   _"How much carbon will I save in 5 years?"_
-   _"Is this investment worth it for my business?"_

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | React + Vite + Tailwind CSS    |
| Backend    | Node.js + Express + TypeScript |
| Database   | MongoDB Atlas                  |
| AI Chatbot | Groq API (LLaMA 3.3 70B)       |
| Simulation | Custom financial model         |

---

## 📁 Project Structure

```
EcoForecast/
├── src/                        # React frontend
│   ├── components/             # Navbar, Hero, Services, etc.
│   ├── Pages/
│   │   └── Inputs/
│   │       ├── InputsPage.jsx  # Quarterly data entry
│   │       ├── MyCompany.jsx   # Company setup
│   │       └── Outputs/
│   │           ├── OutputPage.jsx           # Results dashboard
│   │           └── Components/
│   │               ├── BreakEven.jsx
│   │               ├── graph1.jsx           # Investment vs Year
│   │               ├── graph2.jsx           # Cost comparison
│   │               ├── carbonFootPrintBar.jsx
│   │               └── EcoAdvisor.jsx       # AI chatbot
├── server/
│   └── src/
│       ├── index.ts            # Express server + all API routes
│       ├── calculations/       # Financial simulation engine
│       ├── repositories/       # MongoDB data access
│       └── types.ts
```

---

## 🏃 Getting Started

### Prerequisites

-   Node.js 18+
-   MongoDB Atlas account
-   Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repo

```bash
git clone https://github.com/rbose21-05/EcoForecast.git
cd EcoForecast
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server && npm install
```

### 4. Configure environment variables

Create `server/.env`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
GROQ_API_KEY=your_groq_api_key
```

### 5. Run the backend

```bash
cd server && npm run dev
```

### 6. Run the frontend

```bash
# From root directory
npm run dev
```

### 7. Open in browser

```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| POST   | `/api/inputs`              | Save single-quarter inputs          |
| POST   | `/api/inputs/four-quarter` | Save full 4-quarter inputs          |
| GET    | `/api/inputs/latest`       | Fetch latest input document         |
| GET    | `/api/outputs/:inputId`    | Compute & return simulation results |
| POST   | `/api/chat`                | EcoAdvisor AI chat                  |

---

## 🤖 EcoAdvisor Chatbot

EcoAdvisor is context-aware — it receives your simulation results automatically and can answer specific questions about your data.

**Example questions to ask:**

-   "What does my break-even year mean?"
-   "How can I improve my sustainability score?"
-   "Is my fuel cost the biggest driver of emissions?"
-   "What upgrades would have the most impact?"

---

## 🌟 Key Features

-   ✅ Full-stack TypeScript/JavaScript application
-   ✅ Real financial simulation engine (not static estimates)
-   ✅ 20-year projection with carbon trajectory modeling
-   ✅ Context-aware AI chatbot with real simulation data
-   ✅ Clean, intuitive dashboard with interactive charts
-   ✅ MongoDB persistence for inputs and computed outputs

---

## 👥 Team

Built at a hackathon by a team passionate about making sustainability financially accessible for small businesses.

---
