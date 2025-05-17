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

### 🧑‍💼 Registration & Login
Visit the homepage.
Create an account by filling out your name, email, password, and profile preferences.
Log in to access the platform features.

### 🔍 Explore & Match
View other user profiles under the "Explore" section.
Add friends or initiate a study session.

### 📹 Start a Study Session
When matched with a user, click Start Session.
A real-time video and audio room will open (powered by WebRTC).
Use the chat box to exchange text messages.

### ✏️ Edit Profile
Go to your profile page to update your study preferences, bio, and communication styles.
