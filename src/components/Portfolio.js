import React, { useState, useEffect } from "react";
import "../App.css";

const Portfolio = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  // Portfolio projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Çiftlik Yönetim Uygulaması",
      description: "Tarım işletmelerinin verimliliklerini artırmak için geliştirdiğim masaüstü uygulama.",
      technologies: ["Python", "PyQt", "QtDesigner"],
      image: "/project-placeholder.png",
      link: "https://github.com/Flooodie/PyQt"
    },
    {
      id: 2,
      title: "Silajlık Mısır Yetiştiriciliği",
      description: "130 dönüm silajlık mısır ekildi.",
      technologies: ["Traktör", "Mibzer", "Kultivatör"],
      image: "/project-placeholder.png",
      link: "#"
    }
  ]);

  // Generate random stars and meteors for background
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.5,
          animationDuration: Math.random() * 3 + 2
        });
      }
      setStars(newStars);
    };

    const generateMeteors = () => {
      const newMeteors = [];
      for (let i = 0; i < 5; i++) {
        newMeteors.push({
          id: i,
          top: Math.random() * 30 + 70, // Start from bottom area (70-100%)
          left: Math.random() * 30 + 70, // Start from right area (70-100%)
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 10
        });
      }
      setMeteors(newMeteors);
    };

    generateStars();
    generateMeteors();

    // Regenerate meteors every 15 seconds
    const meteorInterval = setInterval(() => {
      generateMeteors();
    }, 15000);

    return () => clearInterval(meteorInterval);
  }, []);

  return (
    <div className="space-background">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s infinite ease-in-out`
          }}
        />
      ))}

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            animationDuration: `${meteor.duration}s`,
            animationDelay: `${meteor.delay}s`
          }}
        />
      ))}

      <section className="portfolio-section">
        <h1>PORTFOLYO</h1>

        <div className="portfolio-container">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-image">
                <div className="image-placeholder">
                  <span>{project.title}</span>
                </div>
              </div>
              <div className="portfolio-content">
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.link} className="view-project-btn">Projeyi Görüntüle</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
