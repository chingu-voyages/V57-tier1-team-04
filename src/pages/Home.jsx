function Home() {
  return (
    <div className="main-content" aria-labelledby="home-heading">
      <h2 id="home-heading" className="main-h2">Welcome to Pull Request DashBoard 🚀</h2>
      <p>
        Stay on top of your team's workflow with a single glance. The{" "}
        <strong>Pull Request DashBoard</strong> helps you track all PRs —
        whether they're open, merged, or closed — in one centralized dashboard.
      </p>

      <section aria-labelledby="features-heading">
        <h3 id="features-heading">🔑 Key Features</h3>
        <ul>
          <li>
            📂 <strong>Open PRs</strong> – see what's waiting for review or
            approval.
          </li>
          <li>
            ✅ <strong>Closed PRs</strong> – filter by <em>merged</em> or{" "}
            <em>rejected</em> outcomes.
          </li>
          <li>
            👥 <strong>Contributors</strong> – track who's actively
            collaborating on your repo.
          </li>
          <li>
            📊 <strong>Real-time insights</strong> – stay updated with your
            team's progress.
          </li>
        </ul>
      </section>

      <section aria-labelledby="why-heading">
        <h3 id="why-heading">🚀 Why use Pull Request DashBoard?</h3>
        <p>
          Teams often struggle with <em>delayed reviews</em> and{" "}
          <em>unclear PR ownership</em>. PR Status Board keeps everyone aligned,
          reduces bottlenecks, and helps you deliver faster.
        </p>
      </section>

      <section aria-labelledby="get-started-heading">
        <h3 id="get-started-heading">🧭 Get Started</h3>
        <p>
          Use the tabs above to navigate between
          <strong> Open PRs</strong>, <strong>Closed PRs</strong>, and
          <strong> Contributors</strong>.
        </p>
        <p>Ready to ship better code? Let's dive in! 🚀</p>
      </section>
    </div>
  );
}

export default Home;
