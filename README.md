# 🖥️ Merge Monitor – PR Status Board

A **React.js + Node.js** web application to track and visualize your team’s Pull Requests (PRs) across repositories.  
Designed as a **Single Page Application (SPA)** with clean navigation and filters, Merge Monitor helps development teams stay productive by keeping PR reviews and merges transparent.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Screenshots](#-screenshots)
- [MVP Checklist](#-mvp-checklist)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

Merge Monitor is a **PR Status Board** that allows your team to:

- Quickly check **open**, **closed**, and **merged** pull requests.
- Filter PRs based on status (e.g., rejected vs merged).
- View contributors at a glance.
- Centralize collaboration and reduce bottlenecks in code reviews.

Built with **React Router** for smooth SPA navigation and a modern UI styled with **CSS** (Tailwind optional for future use).

---

## ✨ Features

- **🔑 Authentication (Google/GitHub)** – secure login for team members.
- **🏠 Home Tab** – introduction and quick overview of the board.
- **📂 Open PRs Tab** – see all pull requests currently awaiting review.
- **✅ Closed PRs Tab** – track merged/rejected PRs with filters:
  - Show only rejected/closed
  - Show only merged
- **👨‍💻 Contributors Tab** – list of all contributors and activity.
- **🔄 SPA Navigation** – built with React Router.
- **📱 Responsive Design** – mobile-friendly layout.
- **⏰ Live Clock** in the header (optional).

---

## 🛠️ Tech Stack

**Frontend:**

- React.js (Vite)
- React Router
- CSS (custom)
- TailwindCSS

**Backend:**

- Node.js
- Express (planned for API routes)

**Other:**

- GitHub API (for fetching PRs & contributors)
- Google/GitHub OAuth (for authentication)

---

## 📂 Project Structure

```bash
merge-monitor/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, logos
│   ├── components/         # Reusable components (NavTabs, Header, Footer, etc.)
│   ├── pages/              # Page-level components (Home, OpenPRs, ClosedPRs, Contributors)
│   ├── App.jsx             # Main app with routes
│   ├── main.jsx            # React entry point
│   └── styles/             # CSS files
├── package.json
└── README.md
```
