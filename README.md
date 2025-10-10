# 🔀 Pull Request DashBoard

A GitHub Pull Request management tool built by Team 04 during Chingu Voyage 57 - Tier 1.

## 🔍 Overview

As junior developers learning to work in teams, we realized how important it is to stay on top of pull requests. This project gave us the opportunity to develop a clear, visual way to track PRs, reviews, and comments in our repository. 

We built this tool to help development teams quickly see the status of all PRs at a glance. It's designed to make code review workflows more transparent and manageable.

This was the first time any of us worked on a collaborative project! It helped us learn React, Tailwind CSS, work with APIs, and practice real-world Git workflows.

## 🚀 Features

- **View Pull Requests**: Display all open or closed PRs from a team's GitHub repository
- **Search Functionality**: Filter PRs by title, author, or description
- **Detailed PR Information**: See reviews, comments, and status for each PR 
- **Accessible Design**: Includes ARIA labels and full keyboard navigation support 
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: Fetches live data directly from GitHub's API
- **Clean UI**: Built with Tailwind CSS for a modern, professional look

## 🎥 Live Demo

 [View Live Project](#) _(https://v57-tier1-team-04.vercel.app/)_

## 📸 App in Action
![Appinaction](https://github.com/user-attachments/assets/afdfe5a6-0eff-4175-869f-26a1cd3c26da)



## 📈 Running the Project

Want to run this project locally? Follow these steps:

### 📜 Prerequisites

- Node.js installed on your computer
- A GitHub Personal Access Token ([How to create one](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens))

### 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chingu-voyages/V57-tier1-team-04 
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add:
   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   VITE_GITHUB_ORG=your_github_organization
   VITE_GITHUB_REPO_NAME=your_repository_name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173` (or the port shown in your terminal)

6. **Deploy**
   We chose Vercel. To use Vercel, import the repo, set environment variables, and deploy.

## 🧩 Dependencies

This project was built with the following technologies:

- [React](https://react.dev/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Fast build tool and development server
- [Octokit](https://github.com/octokit/octokit.js) - GitHub's official API client for JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 🧠 What We Learned

As a team of junior developers, this project taught us:

- How to work collaboratively using Git and GitHub (branches, PRs, code reviews)
- Using React hooks like `useState`, `useEffect`, and `useCallback`
- Making API calls and handling asynchronous data with `async/await`
- Error handling with try/catch blocks
- Component-based architecture in React
- Implementing accessibility best practices with ARIA labels and keyboard navigation
- The importance of clear communication and documentation

## 👥 Meet the Team

We're a team of 4 junior developers from around the world, brought together by [Chingu](https://chingu.io/)!

- **Abdullah Corduk** - [GitHub](https://github.com/corduka) | [LinkedIn](https://www.linkedin.com/in/cordukabdullah/)
- **Nikoo Nasrpooya** - [GitHub](https://github.com/NikooNasrpooya) | [LinkedIn](https://www.linkedin.com/in/nikoo-nasrpooya/)
- **Gursimran Singh** - [GitHub](https://github.com/Gursimranb127) | [LinkedIn](https://www.linkedin.com/in/gursimransinghonly)
- **Cat Young** - [GitHub](https://github.com/CatYoung018) | [LinkedIn](https://linkedin.com/in/catrilliayoung)

## 💡 Future Enhancements

- [ ] Enhance AI Chatbot by integrating Google Gemini API 
- [ ] Merge statistics and activity graphs
- [ ] Implement GitHub login to elimiate personal access tokens
- [ ] Add Back to Top navigation button for improved accessibility on long PR lists
- [ ] Multi-user dashboard view
- [ ] Integration with Jira or Slack
- [ ] Real-time GitHub webhook updates

## 🤝 Contributing

This was built as part of a Chingu Voyage learning project, but we welcome feedback and suggestions! If you spot a bug or have ideas for improvements:

1. Open an issue describing your suggestion
2. Or fork the repo, make your changes, and submit a pull request

We review PRs regularly and appreciate any contributions that help us learn!

## 🙏 Acknowledgments

- **Chingu** - For organizing this amazing collaborative learning experience
- **[Lindsay](https://github.com/lkallen)** - For guidance and support throughout the project

## ✅ License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with 💻 and ☕ during Chingu Voyage 57 | Fall 2025*
