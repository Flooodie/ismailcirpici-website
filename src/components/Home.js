import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// Basit yıldız yağmuru ve tıklanabilir uzay gemisi
const getRandom = (min, max) => Math.random() * (max - min) + min;

const Home = () => {
  const navigate = useNavigate();
  const [shipX, setShipX] = useState(50); // yüzde olarak
  const [shipY, setShipY] = useState(70);
  const [stars, setStars] = useState([]);
  const [targetPlanet, setTargetPlanet] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const shipRef = useRef();

  // Gezegenler ve yönlendirme bilgileri
  const planets = [
    { id: 1, name: "Ben Kimim?", x: 20, y: 30, color: "#ff6a00", size: 60, route: "/ben-kimim" },
    { id: 2, name: "Neler Yapabilirim?", x: 50, y: 20, color: "#00cc66", size: 70, route: "/neler-yapabilirim" },
    { id: 3, name: "Portfolyo", x: 75, y: 35, color: "#9966ff", size: 65, route: "/portfolyo" },
    { id: 4, name: "İletişim", x: 85, y: 60, color: "#ff3366", size: 55, route: "/iletisim" }
  ];

  // Yıldızları oluştur
  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: getRandom(0, 100),
          y: 0,
          speed: getRandom(0.3, 1.2),
        },
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Yıldızları hareket ettir
  useEffect(() => {
    const move = setInterval(() => {
      setStars((prev) =>
        prev
          .map((star) => ({ ...star, y: star.y + star.speed }))
          .filter((star) => star.y < 100)
      );
    }, 30);
    return () => clearInterval(move);
  }, []);

  // Uzay gemisinin gezegene doğru hareketi
  useEffect(() => {
    if (targetPlanet && isMoving) {
      const moveTowardsPlanet = setInterval(() => {
        setShipX(prevX => {
          const diff = targetPlanet.x - prevX;
          return Math.abs(diff) < 1 ? targetPlanet.x : prevX + diff * 0.1;
        });

        setShipY(prevY => {
          const diff = targetPlanet.y - prevY;
          return Math.abs(diff) < 1 ? targetPlanet.y : prevY + diff * 0.1;
        });

        // Gezegene ulaşıldığında
        if (Math.abs(shipX - targetPlanet.x) < 2 && Math.abs(shipY - targetPlanet.y) < 2) {
          clearInterval(moveTowardsPlanet);
          setIsMoving(false);

          // Kısa bir gecikme sonrası yönlendirme
          setTimeout(() => {
            navigate(targetPlanet.route);
          }, 500);
        }
      }, 50);

      return () => clearInterval(moveTowardsPlanet);
    }
  }, [targetPlanet, isMoving, shipX, shipY, navigate]);

  // Gemiye tıklanınca rastgele bir gezegene hareket et
  const moveShip = () => {
    if (!isMoving) {
      const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
      setTargetPlanet(randomPlanet);
      setIsMoving(true);
    }
  };

  // Gezegene tıklanınca o gezegene hareket et
  const moveTowardsPlanet = (planet) => {
    if (!isMoving) {
      setTargetPlanet(planet);
      setIsMoving(true);
    }
  };

  return (
    <div className="home-space">
      <h1 className="home-title">Ismail ÇIRPICI'nın dünyasına hoşgeldiniz !</h1>
      <p className="home-desc">Gezegenlere tıklayarak sayfalar arasında gezin veya uzay gemisine tıklayarak rastgele bir gezegene gidin!</p>
      <div className="space-area">
        {/* Yıldızlar */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          />
        ))}

        {/* Gezegenler */}
        {planets.map((planet) => (
          <div
            key={planet.id}
            className="home-planet"
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              backgroundColor: planet.color
            }}
            onClick={() => moveTowardsPlanet(planet)}
            title={planet.name}
          >
            <div className="planet-name">{planet.name}</div>
          </div>
        ))}

        {/* Uzay gemisi */}
        <div
          className="spaceship"
          ref={shipRef}
          style={{
            left: `${shipX}%`,
            top: `${shipY}%`,
            transform: `rotate(${targetPlanet ? Math.atan2(targetPlanet.y - shipY, targetPlanet.x - shipX) * (180 / Math.PI) : 0}deg)`
          }}
          onClick={moveShip}
          title="Gemiyi rastgele bir gezegene göndermek için tıkla!"
        >
          <svg width="80" height="50" viewBox="0 0 80 50" className="realistic-spaceship">
            <defs>
              {/* Gradients for realistic look */}
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="50%" stopColor="#c0c0c0" />
                <stop offset="100%" stopColor="#808080" />
              </linearGradient>
              <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b0b0b0" />
                <stop offset="100%" stopColor="#606060" />
              </linearGradient>
              <radialGradient id="engineGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00ccff" stopOpacity="1" />
                <stop offset="70%" stopColor="#0099cc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#006699" stopOpacity="0.3" />
              </radialGradient>
              <radialGradient id="cockpitGradient" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#87ceeb" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4682b4" stopOpacity="0.6" />
              </radialGradient>
            </defs>

            {/* Main body */}
            <ellipse cx="40" cy="25" rx="35" ry="12" fill="url(#bodyGradient)" stroke="#505050" strokeWidth="1"/>

            {/* Wings */}
            <polygon points="15,20 5,35 15,30 25,35" fill="url(#wingGradient)" stroke="#404040" strokeWidth="1"/>
            <polygon points="65,20 75,35 65,30 55,35" fill="url(#wingGradient)" stroke="#404040" strokeWidth="1"/>

            {/* Cockpit */}
            <ellipse cx="55" cy="25" rx="12" ry="8" fill="url(#cockpitGradient)" stroke="#4682b4" strokeWidth="1"/>

            {/* Engine exhausts */}
            <circle cx="8" cy="22" r="3" fill="url(#engineGlow)" className={isMoving ? "engine-active" : ""}/>
            <circle cx="8" cy="28" r="3" fill="url(#engineGlow)" className={isMoving ? "engine-active" : ""}/>

            {/* Engine flames when moving */}
            {isMoving && (
              <>
                <ellipse cx="3" cy="22" rx="8" ry="2" fill="#ff6600" opacity="0.8" className="engine-flame"/>
                <ellipse cx="3" cy="28" rx="8" ry="2" fill="#ff6600" opacity="0.8" className="engine-flame"/>
                <ellipse cx="1" cy="22" rx="6" ry="1.5" fill="#ffaa00" className="engine-flame"/>
                <ellipse cx="1" cy="28" rx="6" ry="1.5" fill="#ffaa00" className="engine-flame"/>
              </>
            )}

            {/* Detail lines */}
            <line x1="20" y1="25" x2="50" y2="25" stroke="#606060" strokeWidth="1"/>
            <line x1="25" y1="20" x2="45" y2="20" stroke="#606060" strokeWidth="0.5"/>
            <line x1="25" y1="30" x2="45" y2="30" stroke="#606060" strokeWidth="0.5"/>

            {/* Navigation lights */}
            <circle cx="72" cy="20" r="1.5" fill="#ff0000" className="nav-light"/>
            <circle cx="72" cy="30" r="1.5" fill="#00ff00" className="nav-light"/>

            {/* Antenna */}
            <line x1="60" y1="17" x2="62" y2="12" stroke="#808080" strokeWidth="1"/>
            <circle cx="62" cy="12" r="1" fill="#ffff00"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;