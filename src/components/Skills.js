import React, { useState, useEffect } from "react";
import "../App.css";

// Örnek beceriler ve ilgi alanları
const initialSkills = [
  {
    id: 1,
    title: "Tarım Optimizasyonu",
    description: "Çiftlik süreçlerini optimize etmek için teknoloji kullanımı",
    icon: "🌾",
    color: "#4CAF50",
    level: 90
  },
  {
    id: 2,
    title: "Web Geliştirme",
    description: "React, JavaScript ve modern web teknolojileri",
    icon: "💻",
    color: "#2196F3",
    level: 85
  },
  {
    id: 3,
    title: "Veri Analizi",
    description: "Data toplama, analiz etme ve raporlama",
    icon: "📊",
    color: "#9C27B0",
    level: 75
  },
  {
    id: 4,
    title: "Mobil Uygulama Geliştirme",
    description: "Çiftçiler için mobil uygulamalar",
    icon: "📱",
    color: "#FF5722",
    level: 70
  },
  {
    id: 5,
    title: "Oyun Oynamak",
    description: "Strateji ve simülasyon oyunları",
    icon: "🎮",
    color: "#607D8B",
    level: 95
  }
];

const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState({ title: "", description: "", icon: "🔧", color: "#3f51b5", level: 50 });
  const [activeSkill, setActiveSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [stars, setStars] = useState([]);
  const [animatingSkill, setAnimatingSkill] = useState(null);

  // Yıldızları oluştur (arka plan için)
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

    generateStars();
  }, []);

  // Yeni beceri ekleme
  const handleAddSkill = () => {
    if (newSkill.title && newSkill.description) {
      const skillToAdd = {
        ...newSkill,
        id: skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1
      };

      setSkills([...skills, skillToAdd]);
      setNewSkill({ title: "", description: "", icon: "🔧", color: "#3f51b5", level: 50 });
      setIsAdding(false);
    }
  };

  // Beceri silme
  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
    if (activeSkill && activeSkill.id === id) {
      setActiveSkill(null);
    }
  };

  // Beceri seviyesini güncelleme
  const handleLevelChange = (id, newLevel) => {
    setSkills(skills.map(skill =>
      skill.id === id ? { ...skill, level: newLevel } : skill
    ));

    if (activeSkill && activeSkill.id === id) {
      setActiveSkill({ ...activeSkill, level: newLevel });
    }
  };

  // İkon değiştirme
  const handleIconChange = (id) => {
    const icons = ["🔧", "💻", "📱", "🌾", "📊", "🎮", "🚜", "🌱", "🧠", "🔬", "📈", "🛠️"];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    setSkills(skills.map(skill =>
      skill.id === id ? { ...skill, icon: randomIcon } : skill
    ));

    if (activeSkill && activeSkill.id === id) {
      setActiveSkill({ ...activeSkill, icon: randomIcon });
    }
  };

  // Beceri animasyonu tetikleme
  const handleSkillClick = (skillId) => {
    setAnimatingSkill(skillId);

    // Animasyonu 2 saniye sonra durdur
    setTimeout(() => {
      setAnimatingSkill(null);
    }, 2000);
  };

  return (
    <div className="space-background">
      {/* Yıldızlar */}
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

      <section className="skills-section">
        <h1>Neler Yapabilirim?</h1>

        <div className="skills-container">
          {skills.map(skill => (
            <div
              key={skill.id}
              className={`skill-box ${animatingSkill === skill.id ? 'animating' : ''}`}
              style={{
                backgroundColor: skill.color,
                boxShadow: `0 5px 15px ${skill.color}80`
              }}
              onClick={() => handleSkillClick(skill.id)}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>

              {/* Konuya özel animasyon elementleri */}
              {animatingSkill === skill.id && (
                <div className={`skill-animation skill-animation-${skill.id}`}>
                  {skill.id === 1 && ( // Tarım Optimizasyonu
                    <>
                      <div className="floating-plant">🌱</div>
                      <div className="floating-plant">🌾</div>
                      <div className="floating-plant">🚜</div>
                    </>
                  )}
                  {skill.id === 2 && ( // Web Geliştirme
                    <>
                      <div className="floating-code">{'<>'}</div>
                      <div className="floating-code">{'{ }'}</div>
                      <div className="floating-code">{'</>'}</div>
                    </>
                  )}
                  {skill.id === 3 && ( // Veri Analizi
                    <>
                      <div className="floating-data">📈</div>
                      <div className="floating-data">📊</div>
                      <div className="floating-data">💹</div>
                    </>
                  )}
                  {skill.id === 4 && ( // Mobil Uygulama
                    <>
                      <div className="floating-mobile">📱</div>
                      <div className="floating-mobile">⚡</div>
                      <div className="floating-mobile">🔧</div>
                    </>
                  )}
                  {skill.id === 5 && ( // Oyun Oynamak
                    <>
                      <div className="floating-game">🎮</div>
                      <div className="floating-game">🏆</div>
                      <div className="floating-game">⭐</div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>




      </section>
    </div>
  );
};

export default Skills;