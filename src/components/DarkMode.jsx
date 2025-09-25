import { useState, useEffect } from "react";

export default function DarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [dark]);

  return (
      <div className="flex justify-end pt-10 pr-10">
      <button
      onMouseEnter={() => setDark(!dark)}
      className="text-4xl bg-transparent border-none cursor-wait transition-transform duration-750 ease-in-out
             hover:scale-175"
      >
      {dark ? "🌕" : "🌑"}
    </button>
    </div>
  );
}