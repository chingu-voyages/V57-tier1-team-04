🧭 GitHub PR Dashboard

A modern and responsive dashboard for tracking your GitHub Pull Requests — built with React, Node.js, Octokit, and Tailwind CSS.
It helps developers and teams visualize, filter, and manage their PRs across multiple repositories in one clean interface.

🚀 Features

🔍 Pull Request Overview – Fetches PRs across multiple repos using the GitHub API (via Octokit).

📊 Status Indicators – Shows open, merged, and draft PRs with clear visual cues.

🧠 Smart Filters – Filter PRs by repository, status, date, or assignee.

🕒 Real-Time Updates – Automatically refreshes data using GitHub’s REST API.

💬 PR Details – View title, author, labels, reviewers, and merge status.

🌙 Dark/Light Mode – Sleek, responsive design powered by Tailwind CSS.

⚙️ Secure Setup – Supports environment variables for authentication.

🧩 Tech Stack
Layer	Technologies
Frontend	React, Vite, Tailwind CSS
Backend	Node.js, Express
API Integration	GitHub REST API (Octokit)
Deployment	Vercel / Netlify
Version Control	Git & GitHub

🛠️ Installation & Setup

Clone the repository

git clone https://github.com/<your-username>/github-pr-dashboard.git
cd github-pr-dashboard


Install dependencies

npm install


Create an environment file
Create a .env file in the project root and add:

VITE_GITHUB_TOKEN=your_personal_access_token
VITE_GITHUB_USERNAME=your_github_username


⚠️ Important: Generate a GitHub Personal Access Token (classic) with repo and read:user permissions.

Run the development server

npm run dev


Build for production

npm run build


Deploy

You can easily deploy using Vercel or Netlify.

For Vercel, just import the repo, set environment variables, and deploy.

🧠 Usage

Enter your GitHub username to view all active PRs.

Click a PR to view details like:

Title & description

Repository name

Labels and reviewers

Merge status (open, merged, closed)

Filter by:

Status (open / merged / draft)

Date range

Repository

Assignee

📸 Screenshots (optional)

Add screenshots here once your UI is live — for example:

/public/screenshots/dashboard-light.png

💡 Future Enhancements

🔔 Real-time GitHub webhook updates

📈 Merge statistics & activity graphs

👥 Multi-user dashboard view

🧩 Integration with Jira or Slack

🤝 Contributing

Contributions are welcome!
To contribute:

Fork the project

Create a new branch (feature/your-feature)

Commit your changes

Open a Pull Request 🚀

## 👩‍💻 About the Developers


- Teammate name #1: Gursimran Singh [GitHub](https://github.com/Gursimranb127) / [LinkedIn](https://www.linkedin.com/in/gursimransinghonly)
- Teammate name #2: Cat Young [GitHub](https://github.com/CatYoung018) / [LinkedIn](https://linkedin.com/in/catrilliayoung)
- Teammate name #3: Nikoo Nasrpooya [GitHub](https://github.com/NikooNasrpooya) / [LinkedIn](https://www.linkedin.com/in/nikoo-nasrpooya/)
- Teammate name #4: Abdullah Corduk [GitHub](https://github.com/corduka) / [LinkedIn](https://www.linkedin.com/in/cordukabdullah/)

## Deployment
[GitHub PR Dashboard](https://v57-tier1-team-04.vercel.app/)
