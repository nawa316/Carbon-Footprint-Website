# 🌱 SustainaTrack - Carbon Emission Tracker and Calculator

## 📖 Introduction
Everyday choices—like how we travel, eat, and use energy—contribute to climate change, yet most people lack tools to understand their personal impact. This project introduces a simple, quiz-based Carbon Footprint Calculator that helps users track emissions, get personalized tips, and build sustainable habits through a gamified experience.

---

## 📌 Problem Statement 
Despite growing awareness around climate change, most individuals lack simple and accessible tools to understand and manage their personal environmental impact. Existing carbon footprint calculators are often overly technical, lengthy, or unengaging, making them difficult for the average user to interact with regularly or meaningfully.

This complexity creates a gap between awareness and action, where users may know climate change is an issue but struggle to identify how their daily habits contribute to it or what steps they can take to improve. There is a clear need for a platform that simplifies carbon tracking, provides actionable insights, and motivates users to adopt sustainable practices through engaging features.

---

## ✅ Solution Proposed
This project offers an interactive, user-friendly platform that calculates an individual's carbon footprint using a simple quiz-based approach. By replacing complex forms with lifestyle-related questions, it delivers accurate emission estimates in an engaging format. The system provides personalized suggestions to help users reduce their environmental impact and includes a point-based reward mechanism to encourage consistent, sustainable behavior. Designed with scalability in mind, the platform is accessible across devices and aims to make carbon tracking practical, informative, and habit-forming.

---

## 🟠Objectives
- **Interactive & User-Friendly**: Replaces complex forms with a quiz-based approach for better user engagement.
- **Gamification for Motivation**: Encourages eco-friendly choices through a point-based reward system and progress tracking.
- **Scalability & Future Expansion**: Can extend to organizations, schools, and integrate AI, blockchain, and mobile apps.
- **Encouraging Behavioural Change**: Provides personalized insights to help users adopt sustainable and responsible lifestyle choices.

---

## 🏗️ Technical Stack Used

### Frontend
- **HTML, CSS, JavaScript**: Used to create an interactive and visually engaging interface for the Carbon Emission Calculator and Tracker, ensuring a seamless user experience.
- **React.js**: Powers the quiz-based input system, real-time dashboard, and gamification elements, allowing users to track their carbon footprint and earn rewards dynamically.

### Backend
- **Node.js and Express.js**: Handles carbon footprint calculations, user authentication, and reward logic, ensuring secure and efficient communication between the frontend and database.
- **MongoDB**: Stores user profiles, quiz responses, emission data, and reward points, allowing users to track their sustainability progress over time.

### Development Tools
- **Visual Studio Code**: Used for developing, debugging, and testing all project components, ensuring a smooth and error-free development process.
- **Postman**: Used for API testing, debugging, and validation during backend development to ensure seamless communication between the frontend and backend components.
- **Git and GitHub**: Enables version control and collaborative development, ensuring secure storage and seamless updates to the system.

---

## 🛠 Implementation and Platform Design
### Information Delivery Methods
- **Data Input**: Users input data in categories such as Shopping, Transport, Electricity, and Food.
- **Backend Processing**: Node.js processes inputs, calculates emissions, and ensures seamless communication between the frontend and database.
- **Instant Feedback**: The platform delivers real-time feedback and personalized insights through an interactive, user-friendly interface.

### Carbon Emission Categories and Reduction Awareness
- **Categories**: Shopping, Transport, Electricity, and Food.
- **Emission Impact**: Each category educates users on the environmental impact and offers reduction strategies (e.g., sustainable transport options, energy-efficient practices).
- **User-Focused Content**: The platform tailors information based on user inputs, encouraging sustainable behavior and helping users make informed decisions.

### Interactive Calculations and Gamification
- **Real-Time Calculations**: Users receive real-time feedback on their carbon footprint.
- **Gamification**: Points are awarded for sustainable actions, motivating continued participation.
- **Result Breakdown**: Detailed insights into carbon emissions by category are displayed, allowing users to track progress and visualize their environmental impact.

### Verification
- **Data Accuracy**: The platform includes validation mechanisms to ensure the accuracy of user inputs and calculated carbon footprints. 
- **User Feedback**: The platform allows users to report discrepancies or errors in the data, ensuring continuous improvement of the system.
- **Testing**: Postman and other testing tools are used for API testing to verify smooth communication between the frontend and backend, ensuring data integrity and reliability.

---

## 🚀 How to Run This Project
1. Clone this Repository
2. Start the Frontend
```bash
cd frontend
npm start
```
3. Start the Backend
```bash
cd backend
npm run dev
```

⚠️ Make sure Node.js and npm are installed on your system.  
💡 Run frontend and backend files in two different terminals.

---

## 💻Platform Screenshots
![Home Page](image.png)

![Login Page](image-1.png)

![Shopping Section](image-2.png)

![Transport Section](image-3.png)

![Electricity Section](image-4.png)

![Food Section](image-5.png)

![Result Section](image-6.png)

![Congratulations Page](image-7.png)

![Redeem Page](image-8.png)

![Profile Page](image-9.png)

---

## 🤝 Conclusion
This project transforms climate awareness into actionable steps through an engaging, data-driven carbon tracking system. With gamification, personalized insights, and real-time feedback, it motivates users to adopt sustainable habits. Technically robust and scalable, the platform is well-suited for individuals, institutions, and large-scale sustainability initiatives.


# 🌱 SustainaTrack - Carbon Emission Tracker and Calculator

**Course Assignment: Systems Development and Operations (DevOps Track)**

An interactive, full-stack, eco-friendly web-based application designed to track and calculate personal carbon footprints using a quiz-based approach. Built natively on Google Cloud Platform (GCP) following **Green DevOps** infrastructure principles with an automated end-to-end Monorepo CI/CD pipeline.

---

## 📖 1. Project Overview

### 📌 Problem Statement 
Despite growing awareness around climate change, most individuals lack simple and accessible tools to understand and manage their personal environmental impact. Existing carbon footprint calculators are often overly technical, lengthy, or unengaging, making them difficult for the average user to interact with regularly or meaningfully.

This complexity creates a gap between awareness and action, where users may know climate change is an issue but struggle to identify how their daily habits contribute to it or what steps they can take to improve. There is a clear need for a platform that simplifies carbon tracking, provides actionable insights, and motivates users to adopt sustainable practices through engaging features.

### ✅ Proposed Solution
This project offers an interactive, user-friendly platform that calculates an individual's carbon footprint using a simple quiz-based approach. By replacing complex forms with lifestyle-related questions, it delivers accurate emission estimates in an engaging format. The system provides personalized suggestions to help users reduce their environmental impact and includes a point-based reward mechanism to encourage consistent, sustainable behavior. Designed with scalability in mind, the platform is accessible across devices and aims to make carbon tracking practical, informative, and habit-forming.

### 🟠 Objectives
- **Interactive & User-Friendly**: Replaces complex forms with a quiz-based approach for better user engagement.
- **Gamification for Motivation**: Encourages eco-friendly choices through a point-based reward system and progress tracking.
- **Scalability & Future Expansion**: Built with decoupled microservices capable of integrating advanced logic (e.g., System Dynamics, Fuzzy Logic) and expanding into mobile applications.
- **Encouraging Behavioural Change**: Provides personalized insights to help users adopt sustainable and responsible lifestyle choices.

---

## 🏗️ 2. Technical Architecture & Tech Stack

### 🗺️ System Architecture
The application is structured as a **decoupled Monorepo** containing two distinct, isolated directory layers for the frontend and backend. They do not cross-contaminate at the repository layer; instead, they integrate exclusively at the runtime environment via secure HTTPS REST API communication.
[ Frontend Browser UI ] ────( HTTPS REST API / CORS Secure )────► [ Express.js API Server ]
(GCP Cloud Run - Front)                                            (GCP Cloud Run - Back)
│
▼ (Mongoose Schema)
[ MongoDB NoSQL Database ]
### 🛠️ Technology Stack Components

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React.js | Latest | Powers the dynamic quiz input, live tracker, and dashboard elements. |
| **Backend Runtime** | Node.js / Express.js | 20 LTS | Manages emission calculation formulas, user auth, and API routes. |
| **Database Tier** | MongoDB NoSQL | Latest | Stores user profiles, quiz inputs, and historical points via Mongoose. |
| **CI/CD Orchestrator** | GitHub Actions | Runner v4 | Drives automated workflows, paths-filtering, and cloud staging. |
| **Container Engine** | Docker | Latest | Standardizes execution environments into secure, light OCI images. |
| **Cloud Registry** | GCP Artifact Registry | - | Stores optimized production Docker container images securely. |
| **Compute Engine (FE)** | GCP Cloud Run | Managed | Fully managed serverless platform for hosting containerized frontend apps. |
| **Compute Engine (BE)** | GCP Cloud Run | Managed | Fully managed serverless platform that autoscales backend container pods. |
| **Monitoring Saturation** | GCP Cloud Monitoring | - | Tracks real-time resource utilization, CPU/RAM spikes, and API logs. |

---

## 🔄 3. Continuous Integration & Deployment (CI/CD)

The project utilizes an automated end-to-end pipeline managed by GitHub Actions (`.github/workflows/deploy.yml`). This configuration enforces strict code validation gates, multi-repo folder separation, and automated serverless container orchestration natively into GCP.

### 🚀 Pipeline Workflow Design
The pipeline maps out 4 main stages that trigger automatically upon a `git push` event to the `main` branch, provided changes occur within the specified application folders:
[ Sinta's Laptop Push ] ──► [ Stage 2: Detect Changes ]
│
┌─────────────────────────┴─────────────────────────┐
▼ (if 'frontend/')                                ▼ (if 'backend/')
[ Stage 3: Lint & Audit Frontend ]                  [ Stage 3: Lint & Audit Backend ]
│                                                   │
▼                                                   ▼
[ Stage 4: Docker Build & Push FE ]                 [ Stage 4: Docker Build & Push BE ]
│                                                   │
▼                                                   ▼
[ Stage 5: Deploy Frontend to Cloud Run ]           [ Stage 5: Deploy Backend to Cloud Run ]
### 🌿 Green DevOps Implementation
In adherence to sustainable engineering practices, this pipeline minimizes infrastructure environmental impact through:
1. **Paths-Filtering Optimization:** Utilizing `dorny/paths-filter@v3`, the workflow isolates changes. If modifications are purely backend-focused, the entire frontend compilation pipeline is bypassed—significantly reducing unnecessary computing hours and electricity consumption on GitHub's remote runner servers.
2. **Resource Constraint Caps:** Cloud Run deployments are strictly limited to necessary baselines (`--memory=256Mi` for frontend, `--memory=512Mi` for backend), preventing computational over-provisioning and optimizing carbon footprints in Google's data centers.

---

## 📁 4. Project Directory Structure

```text
sustainatrack-devops/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Core GitHub Actions workflow engine
├── backend/
│   ├── Dockerfile              # Containerization configuration for Express server
│   ├── package.json            # Node.js backend dependencies and scripts
│   ├── server.js               # Entry point for Express REST API
│   └── src/                    # Calculation modules and mongoose schemas
├── frontend/
│   ├── Dockerfile              # Containerization configuration for React web app
│   ├── package.json            # Frontend dependencies
│   ├── public/                 # Static assets and UI icons
│   └── src/                    # React views, components, and quiz state
└── README.md                   # System documentation
---
## 📁 5. Installation and Local Setup
```text
📋 Prerequisites
Ensure the following tools are installed locally on your development machine:

Node.js (v18.0.0 or higher)

npm (v9.0.0 or higher)

Docker Desktop (For building local container containers)

Git version control system

🛠️ Execution Steps
Step 1: Clone the Repository

