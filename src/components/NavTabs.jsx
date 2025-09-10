function NavTabs({ activeTab, setActiveTab }) {
  return (
    <nav>
      <button
        className={activeTab === "home" ? "active" : ""}
        onClick={() => setActiveTab("home")}
      >
        Home
      </button>
      <button
        className={activeTab === "open-prs" ? "active" : ""}
        onClick={() => setActiveTab("open-prs")}
      >
        <i class="fa-solid fa-code-pull-request"></i> Open PRs
      </button>
      <button
        className={activeTab === "closed-prs" ? "active" : ""}
        onClick={() => setActiveTab("closed-prs")}
      >
        <i class="fa-solid fa-code-merge"></i> Closed PRs
      </button>
      <button
        className={activeTab === "contributors" ? "active" : ""}
        onClick={() => setActiveTab("contributors")}
      >
        <i class="fa-solid fa-users-line"></i> Contributors
      </button>
    </nav>
  );
}

export default NavTabs;
