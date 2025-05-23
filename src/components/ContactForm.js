import React, { useState, useEffect } from "react";
import "../App.css";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [stars, setStars] = useState([]);
  const [spaceships, setSpaceships] = useState([]);

  // Generate random stars for background
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

    // Generate spaceships
    const generateSpaceships = () => {
      const ships = [
        {
          id: 1,
          top: 15,
          left: 10,
          rotation: 15,
          delay: 0
        },
        {
          id: 2,
          top: 75,
          left: 85,
          rotation: -15,
          delay: 1.5
        }
      ];
      setSpaceships(ships);
    };

    generateStars();
    generateSpaceships();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    setForm({ name: "", email: "", message: "" });
  };

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

      {/* Spaceships */}
      {spaceships.map((ship) => (
        <div
          key={ship.id}
          className="spaceship-decoration"
          style={{
            top: `${ship.top}%`,
            left: `${ship.left}%`,
            transform: `rotate(${ship.rotation}deg)`,
            animationDelay: `${ship.delay}s`
          }}
        >
          {ship.id === 1 ? (
            <div className="pixel-ship pixel-ship-left" />
          ) : (
            <div className="pixel-ship pixel-ship-right" />
          )}
        </div>
      ))}

      {/* Planet */}
      <div className="planet"></div>

      <section className="contact-section" id="contact">
        <div className="form-header">
          <h1>İLETİŞİM FORMU</h1>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon phone-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <span>+90 539 210 6043</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon email-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <span>ismailcirpici@gmail.com</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pixel-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Ad Soyad"
              value={form.name}
              onChange={handleChange}
              className="pixel-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Mail"
              value={form.email}
              onChange={handleChange}
              className="pixel-input"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Mesaj"
              value={form.message}
              onChange={handleChange}
              className="pixel-input pixel-textarea"
              required
            />
          </div>
          <button type="submit" className="pixel-button">Gönder</button>
          {success && <p className="success-msg">Mesajınız gönderildi!</p>}
        </form>
        <div className="social-icons">
          <a href="https://github.com/Flooodie" target="_blank" rel="noopener noreferrer" className="pixel-icon github-icon">
            <svg className="github-svg" viewBox="0 0 16 16" width="20" height="20">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
          <a href="https://steamcommunity.com/id/luboshmirrrr/" target="_blank" rel="noopener noreferrer" className="pixel-icon steam-icon">
            <svg className="steam-svg" viewBox="0 0 24 24" width="20" height="20">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
            </svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="pixel-icon instagram-icon">
            <svg className="instagram-svg" viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="pixel-icon facebook-icon">
            <svg className="facebook-svg" viewBox="0 0 24 24" width="20" height="20">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="pixel-icon x-icon">
            <svg className="x-svg" viewBox="0 0 24 24" width="20" height="20">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;