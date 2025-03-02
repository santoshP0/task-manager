# Task Manager App

A simple **React Native Task Manager** that allows users to create, update, and delete tasks. This app uses **React Native Paper** for UI, **Context API** for state management, and communicates with a **Node.js backend**.

---

## 📌 Features
- Add, edit, and delete tasks
- Fetch tasks from backend API
- Swipe to delete tasks
- Pull-to-refresh for task list
- Toast notifications for actions
- Modern UI with **React Native Paper**

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/santoshP0/task-manager.git
cd task-manager-app
```

### 2️⃣ Install Dependencies
```sh
npm install   # or npm install
```

### 3️⃣ Configure Backend URL
Update the **API base URL** in `config.ts`:
```ts
// src/services/config.ts
export const API_BASE_URL = 'http://your-backend-url.com';
```

### 4️⃣ Run the App
#### For Android
```sh
npx expo run android 
```
---

## 🛠 Tech Stack
- **React Native (Expo or CLI)**
- **React Native Paper** (UI Components)
- **Context API** (State Management)
- **Axios** (API Calls)
- **Node.js & Express** (Backend)
- **MongoDB** (Database)

