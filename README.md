# Study Double

StudyDouble is a web-based productivity app that uses AI-driven compatibility matching to pair students for virtual body doubling sessions. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it features real-time communication via WebRTC and Socket.io, secure authentication with JWT, and a multi-tiered matching algorithm combining user clustering, neural collaborative filtering, and productivity-based reranking to optimize study partner recommendations based on personality, goals, and study habits.

---

## 🛠️ Built With

- **MongoDB** 
- **Express.js**
- **React.js** 
- **Node.js**
- **Socket.IO**
- **WebRTC**
- **Mongoose**
- **JWT**

---

## 📦 Installation

### 1. Clone the repository

git clone https://github.com/kamaldbouk/studydouble.git
cd studydouble

### 2. Setup the Server

cd backend
npm install

Then start the backend: npm run dev

### 3. Setup the Client

cd ../frontend
npm install

Then start the React frontend: npm start

## 👥 Features

🔐 Registration & Login  
Create an account with your name, email, and password, then customize your profile with study goals, communication style, and personality traits. Authentication is secured using JWT.

🔎 Smart Matching & Explore  
Browse user profiles or get automatically paired through our AI-driven algorithm that matches users based on study preferences, personality traits, and productivity metrics.

📹 Real-Time Study Sessions  
Join 1-on-1 video sessions via WebRTC with live chat powered by Socket.IO for a collaborative and focused study environment.

🧠 Personalized Profiles  
Update your academic information, session preferences, and communication style anytime to improve your matching results.
