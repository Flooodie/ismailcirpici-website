import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navigation = () => (
  <nav className="nav">
    <Link to="/">ANA SAYFA</Link>
    <Link to="/ben-kimim">BEN KİMİM?</Link>
    <Link to="/neler-yapabilirim">NELER YAPABİLİRİM?</Link>
    <Link to="/portfolyo">PORTFOLYO</Link>
    <Link to="/iletisim">İLETİŞİM</Link>
  </nav>
);

export default Navigation;