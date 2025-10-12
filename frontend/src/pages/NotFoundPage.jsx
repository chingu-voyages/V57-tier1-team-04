import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
  <section className="not-found" aria-labelledby="not-found-heading">
    <div className="main-content">
      <h1 id="not-found-heading">404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-[#60B8DE] text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
        aria-label="Return to home page"
        >
          Back to Home
        </Link>
    </div>
  </section>
);
}

export default NotFoundPage;
