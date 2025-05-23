import React, { useState, useEffect } from "react";
import "../App.css";

const About = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [profileHover, setProfileHover] = useState(false);
  const [tractorPosition, setTractorPosition] = useState(0);
  const [crops, setCrops] = useState(Array(8).fill(false));
  const [score, setScore] = useState(0);
  const [hasShownNotification, setHasShownNotification] = useState(false);

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

  // Initialize farm animation
  useEffect(() => {
    // Set initial tractor position
    setTractorPosition(10);

    // Initialize crops as not grown
    setCrops(Array(8).fill(false));

    // Show notification after 3 seconds, only once
    if (!hasShownNotification) {
      const notificationTimer = setTimeout(() => {
        const welcomeMessage = "Traktöre ve bitkilere tıklayarak çiftlik oyununu oynayabilirsin!";
        alert(welcomeMessage);
        setHasShownNotification(true);
      }, 3000);

      return () => clearTimeout(notificationTimer);
    }
  }, [hasShownNotification]);

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

      <section className="about-section">
        <h1>BEN KİMİM?</h1>

        <div className="about-content">
          <div
            className="profile-photo-container"
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
          >
            <div className={`profile-photo ${profileHover ? 'hover' : ''}`}>
              <img src="/profile-photo.png" alt="İsmail ÇIRPICI" className="profile-image" />
              {profileHover && (
                <div className="profile-hover-effect">
                  <div className="pixel-scan"></div>
                </div>
              )}
            </div>
          </div>

          <div className="about-text">
            <p>
              Ben Ismail ÇIRPICI. Bilgisayar mühendisliği öğrencisi aynı zamanda full-time çiftçiyim.
              İlgi alanlarım arasında bir işi optimize etmek ve oyun oynamak yer almakta.
              Gelecek için planlarım arasında çiftlik uygulamaları geliştirip ülkemizde tarımı daha verimli hale getirmek var.
            </p>
          </div>
        </div>

        <div className="pixel-farm-animation">
          <div
            className="tractor"
            style={{ left: `${tractorPosition}%` }}
            onClick={() => {
              // Move tractor to a random position when clicked
              const newPosition = Math.floor(Math.random() * 80) + 10;
              setTractorPosition(newPosition);
            }}
          ></div>
          <div className="crops">
            {crops.map((grown, i) => (
              <div
                key={i}
                className={`crop ${grown ? 'grown' : ''}`}
                onClick={() => {
                  if (!grown) {
                    // Create a new array with the clicked crop set to grown
                    const newCrops = [...crops];
                    newCrops[i] = true;
                    setCrops(newCrops);

                    // Increase score
                    setScore(prevScore => prevScore + 10);

                    // After some time, reset the crop
                    setTimeout(() => {
                      const resetCrops = [...newCrops];
                      resetCrops[i] = false;
                      setCrops(resetCrops);
                    }, 3000);
                  }
                }}
              ></div>
            ))}
          </div>
          <div className="soil"></div>
          <div className="farm-score">Puan: {score}</div>
        </div>
      </section>
    </div>
  );
};

export default About;