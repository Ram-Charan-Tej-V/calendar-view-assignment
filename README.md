# Calendar View Assignment

![Build](https://github.com/Ram-Charan-Tej-V/calendar-view-assignment/actions/workflows/deploy.yml/badge.svg)
![Storybook](https://img.shields.io/badge/Storybook-Live-blue)

## 📍 Live Storybook
Once deployed, your Storybook will be available at:
👉 [https://Ram-Charan-Tej-V.github.io/calendar-view-assignment](https://Ram-Charan-Tej-V.github.io/calendar-view-assignment)

---

## 🚀 Quick Start

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run Storybook
```bash
npm run storybook
```

### 3️⃣ Run the App locally (Vite)
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173).

---

## 🧩 Tech Stack

- **React 18**
- **TypeScript (strict mode)**
- **Tailwind CSS**
- **Storybook 7**
- **Vite** build tool
- No UI libraries (Radix, MUI, Chakra, etc.)

---

## 🧱 Features Implemented

✅ Month view (42-cell grid)  
✅ Add / Edit / Delete events (lazy-loaded modal)  
✅ Keyboard navigation & ARIA labels  
✅ Storybook stories (Default, Empty state)  
✅ Tailwind-only custom UI  
✅ Ready for GitHub Pages deployment

---

## 🪄 How to Deploy (GitHub Pages)

1. Push your project to the repository:  
   `https://github.com/Ram-Charan-Tej-V/calendar-view-assignment`

2. Ensure your default branch is **main**.

3. GitHub Actions will automatically:
   - Build your Storybook (`npm run build-storybook`)
   - Deploy it to GitHub Pages.

4. Visit your Storybook live at:  
   👉 [https://Ram-Charan-Tej-V.github.io/calendar-view-assignment](https://Ram-Charan-Tej-V.github.io/calendar-view-assignment)

---

## 🕒 Suggested Commit History (for clean repo)

```bash
git init
git add .
git commit -m "init: project scaffold with Vite + React + TS + Tailwind"
git commit -m "feat: implement month view calendar grid"
git commit -m "feat: add event modal for create/edit/delete"
git commit -m "chore: configure Storybook stories"
git commit -m "ci: add GitHub Actions workflow for Pages deploy"
git branch -M main
git remote add origin https://github.com/Ram-Charan-Tej-V/calendar-view-assignment.git
git push -u origin main
```

---

## 🧾 Notes

- Complies with assignment requirements (no external UI libraries / no AI builders).
- Focused on clean, maintainable, and scalable React + TypeScript structure.
- Built manually for internship submission.
