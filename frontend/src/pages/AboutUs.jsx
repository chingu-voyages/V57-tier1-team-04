function AboutUs() {
  
  const contributors = [
    { name: "Abdullah", github: "corduka" },
    { name: "Nikoo", github: "NikooNasrpooya" },
    { name: "Cat", github: "CatYoung018" },
    { name: "Gursimran", github: "Gursimranb127" },
  ]
  return (
    <section aria-labelledby="about-heading" >
      <div className="main-content">
        <h2 id="about-heading" className="main-h2">Who We Are</h2>
        <p>
This project was built by four junior developers 👩‍💻👨‍💻 as a part of Chingu Voyage 57, Tier 1. </p>

<p>We worked collaboratively 🤝 to create a PR status monitoring tool, merging our different strengths and skills 💪. 
        </p>
        <p>Each member of the team contributed to the design and development of the applications in order to create a functional and user-friendly final product ✨. </p>
        <p>Using Scrum ceremonies, we were able to get organized 📋 and tackle optional features as well. We are excited to share our work with you! 🎉</p>
        <ul aria-label="Project contributors">
          {contributors.map((contributor) => (
            <li key={contributor.github}>
            <a
              href={`https://github.com/${contributor.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contributor-name text-black font-semibold hover:text-[#60B8DE] hover:underline transition-colors"
              aria-label={`View ${contributor.name}'s GitHub profile (@${contributor.github})`}
            >
              {contributor.name}
            </a>
          </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AboutUs;
