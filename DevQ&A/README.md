# DevQ&A - Questions, Answers & Lessons Study Hub

A responsive Question & Answer website built with Vue 3 and TypeScript that allows you to input questions on one device (PC, phone, tablet) and see the exact same data instantly on all other devices!

## ✨ Features

- **Multi-Device Real-Time Synchronization**:
  - Input a question on your phone → it appears on your PC.
  - Input on your PC → it appears on your phone.
  - No separate database setup or cloud account required; syncs automatically through the app's local data storage (`data/questions.json`).
  - Offline fallback with `localStorage` ensures data is never lost.
- **Category Board & Full Page Navigation**:
  - Landing page is the **Category Board** displaying only the categories (Backend, Web Development, etc.).
  - Questions are hidden until you click a category.
  - Clicking a category navigates to a **new dedicated page** showing all questions for that category.
- **Bilingual Definitions (Khmer & English)**:
  - English definition / answer.
  - Khmer definition / answer (និយមន័យជាភាសាខ្មែរ) with Kantumruy Pro font.
  - Adapts to your input (if you input only Khmer, only English, or both).
- **Interactive Flashcard Study Mode**:
  - Test yourself with flip cards (`Space` / `Enter` to flip, `Arrow` keys to navigate).
- **Subtle, Clean Modern UI**:
  - Clean slight rounding (no big bubble pills).
  - Dynamic vibrant color themes per category.
  - Fully responsive across mobile phones, tablets, and desktops.

## 🚀 How to Run and Connect Your Devices

### 1. Start the App on your Computer:
```bash
cd "C:\DevQ&A\DevQ&A"
npm run dev
```

### 2. Open on Any Device:
- **On your Computer:** Open [http://localhost:5173/](http://localhost:5173/)
- **On your Phone / Tablet:** Connect to the same Wi-Fi network and open `http://192.168.100.219:5173/`

Any question you add, edit, or delete on either device will automatically synchronize in real time!
