function Home() {
  return (
    <div className="main-content">
      <h2 className="main-h2">Welcome to PR Status Board 🚀</h2>
      <p>
        Stay on top of your team’s workflow with a single glance. The{" "}
        <strong>PR Status Board</strong> helps you track all pull requests —
        whether they’re open, merged, or closed — in one centralized dashboard.
      </p>

      <section>
        <h3>🔑 Key Features</h3>
        <ul>
          <li>
            📂 <strong>Open PRs</strong> – see what’s waiting for review or
            approval.
          </li>
          <li>
            ✅ <strong>Closed PRs</strong> – filter by <em>merged</em> or{" "}
            <em>rejected</em> outcomes.
          </li>
          <li>
            👥 <strong>Contributors</strong> – track who’s actively
            collaborating on your repo.
          </li>
          <li>
            📊 <strong>Real-time insights</strong> – stay updated with your
            team’s progress.
          </li>
        </ul>
      </section>

      <section>
        <h3>🚀 Why use PR Status Board?</h3>
        <p>
          Teams often struggle with <em>delayed reviews</em> and
          <em>unclear PR ownership</em>. PR Status Board keeps everyone aligned,
          reduces bottlenecks, and helps you deliver faster.
        </p>
      </section>

      <section>
        <h3>🧭 Get Started</h3>
        <p>
          Use the tabs above to navigate between
          <strong>Open PRs</strong>, <strong>Closed PRs</strong>, and
          <strong>Contributors</strong>.
        </p>
        <p>Ready to ship better code? Let’s dive in! 🚀</p>
      </section>
    </div>
  );
}

export default Home;
