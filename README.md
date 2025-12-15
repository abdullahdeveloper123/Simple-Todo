# 🗂️ Modern To‑Do App

A clean, responsive, and productivity‑focused **To‑Do web application** built with **Vanilla HTML, CSS, and JavaScript**, styled for a corporate / professional look. The app uses a simple state‑driven approach with `localStorage` for persistence.

---

## ✨ Features

* ➕ Add new tasks
* ✅ Mark tasks as completed
* 🗑️ Delete tasks
* 📂 Filter tasks:

  * **All**
  * **Active**
  * **Completed**
* 💾 Persistent storage using `localStorage`
* 📊 Live counters (Total / Active / Completed)
* 🧼 Empty‑state UI handling
* 📱 Responsive, modern layout

---

## 🧠 Key Concepts Used

* Single source of truth (`savedTasks` array)
* Derived state using `Array.filter()`
* Idempotent rendering (clear & rebuild UI from state)
* DOM manipulation via `createElement`
* Event handling bound during render cycle
* LocalStorage‑based persistence

---

## 📁 Project Structure

```bash
TODO/
│
├── index.html             
│
└── assets/
    ├── bootstrap/
    │   ├── bootstrap.min.css
    │   └── bootstrap.bundle.min.js
    │
    ├── font/
    │   └── Montserrat.ttf
    │
    ├── js/
    │   └── main.js          
    │
    └── style/
        └── style.css        
```

---

## ⚙️ How the App Works

### 1️⃣ State Management

All tasks are stored in one array:

```js
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
```

Each task object:

```js
{
  task: "Finish internship assignment",
  done: false
}
```

This array is the **single source of truth**.

---

### 2️⃣ Rendering Logic

The UI is rebuilt every time the state changes:

```js
renderTasks()
```

Before rendering, the task list container is cleared to prevent duplication. The DOM always reflects the current state.

---

### 3️⃣ Filtering (All / Active / Completed)

Filtering does **not** mutate the main array. Instead, a derived array is created:

```js
savedTasks.filter(task => !task.done)
```

This approach keeps logic predictable and scalable.

---

### 4️⃣ Persistence

Tasks are saved automatically after every change:

```js
localStorage.setItem('tasks', JSON.stringify(savedTasks))
```

Reloading the page restores all tasks and their completion state.

---

## 📊 Counters

The app displays live counts for:

* **Total tasks**
* **Active tasks**
* **Completed tasks**

All counters are derived from the main state array.

---

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. Start adding tasks 🎯

No build tools or dependencies required.

---

## 🧪 Possible Improvements

* ✏️ Inline task editing
* 🧹 Clear completed tasks button
* 🌙 Dark mode
* ⌨️ Keyboard (Enter) support
* 🎯 Task priority levels

---

## 📚 Learning Outcome

This project demonstrates how modern frontend frameworks work internally by implementing:

* State‑driven UI updates
* Derived data rendering
* Clean separation of concerns

---

## 🧑‍💻 Author

Built with a focus on **clarity, maintainability, and professional frontend practices**.

Ideal for learning, portfolios, and internship‑level frontend projects.

---

⭐ Feel free to fork, improve, or extend this project!
