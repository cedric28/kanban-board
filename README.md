# 🧩 Minimalist Kanban Board

This project is a minimalist Kanban board built with **React**, **TypeScript**, **Material UI**, and **Framer Motion**.  
It allows you to manage tasks across four columns: **Not Started**, **In Progress**, **Blocked**, and **Done**.  
Tasks are draggable between columns and persist across reloads.

🌐 **Live Demo**: [https://kanban-board-lake-nine.vercel.app/](https://kanban-board-lake-nine.vercel.app/)

---

## ✨ Features

- 🧱 **Four Columns** – Not Started, In Progress, Blocked, Done  
- 🖱️ **Draggable Tasks** – Drag and drop tasks between columns  
- 💾 **Task Persistence** – Tasks are saved in local storage  
- ➕ **Create Tasks** – Add new tasks with optional due dates and subtasks  
- ✅ **Subtasks** – Support for subtasks with completion indicators  
- ⏰ **Due Dates** – Highlighted based on urgency  
- 🎞️ **Animations** – Smooth transitions during drag and state changes  

---

## 🗂️ Project Structure

```plaintext
🗂️ Kanban Board
├── 📂 public
├── 📂 src
│   ├── 📁 components
│   │   └── 🪟 modal
│   ├── 📁 context
│   ├── 📁 types
│   ├── 📁 utils
│   ├── 📄 App.tsx
│   ├── 📄 index.tsx
│   └── 🎨 theme.ts
├── 📄 package.json
└── 📄 tsconfig.json
```

## 🚀 Getting Started

Follow the steps below to set up and run the Kanban Board project on your local machine.

---

### 📦 Prerequisites

Make sure you have the following installed:

- 🟢 **Node.js** (version 14 or higher)
- 📦 **npm** (comes with Node.js)

---

### 🔧 Installation & Setup

1. **Clone the repository**
 ```bash
  git clone https://github.com/your-username/kanban-board.git
  cd kanban-board ```

2. **Install dependencies**

 ```bash
  npm install
   ```


3. **Start the development server**
  ```bash
  npm start
  ```

4. **Open your browser**

```plaintext
Visit http://localhost:3000 to use the app.
```