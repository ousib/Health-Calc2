"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(null);

  const toggle = (name) => setActive(active === name ? null : name);
  const closeAll = () => {
    setIsOpen(false);
    setActive(null);
  };

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,.1)",
      position: "relative",
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.4rem",
      fontWeight: "700",
      textDecoration: "none",
      color: "#2c3e50",
    },
    span: { color: "#3498db" },
    btn: {
      background: "none",
      border: "none",
      fontSize: "1.6rem",
      cursor: "pointer",
    },
    menu: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "#fff",
      boxShadow: "0 8px 20px rgba(0,0,0,.15)",
      listStyle: "none",
      padding: 0,
      margin: 0,
      maxHeight: "85vh",
      overflowY: "auto",
    },
    item: { borderBottom: "1px solid #eee" },
    link: {
      display: "flex",
      gap: "1rem",
      padding: "1rem 1.5rem",
      textDecoration: "none",
      color: "#2c3e50",
      fontWeight: "500",
    },
    head: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem 1.5rem",
      cursor: "pointer",
      fontWeight: "600",
    },
    sub: { background: "#f8f9fa" },
    subLink: {
      display: "block",
      padding: "0.7rem 3rem",
      textDecoration: "none",
      color: "#555",
      fontSize: "0.95rem",
    },
  };

  return (
    <header>
      <nav style={styles.nav}>
        <Link href="/" style={styles.logo} onClick={closeAll}>
          <i className="fas fa-calculator"></i>{" "}
          Health<span style={styles.span}>Calculators</span>Online
        </Link>

        <button style={styles.btn} onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {isOpen && (
          <ul style={styles.menu}>
            <li style={styles.item}>
              <Link href="/" style={styles.link} onClick={closeAll}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>

            {/* BODY & WEIGHT */}
            <li style={styles.item}>
              <div style={styles.head} onClick={() => toggle("body")}>
                Body & Weight
                <i className={`fas fa-chevron-${active === "body" ? "up" : "down"}`}></i>
              </div>
              {active === "body" && (
                <div style={styles.sub}>
                  <Link href="/bmi-calculator" style={styles.subLink} onClick={closeAll}>BMI Calculator</Link>
                  <Link href="/body-fat-calculator" style={styles.subLink} onClick={closeAll}>Body Fat %</Link>
                  <Link href="/ibw-calculator" style={styles.subLink} onClick={closeAll}>Ideal Body Weight</Link>
                  <Link href="/lbm-calculator" style={styles.subLink} onClick={closeAll}>Lean Body Mass</Link>
                  <Link href="/waist-hip-ratio" style={styles.subLink} onClick={closeAll}>Waist–Hip Ratio</Link>
                  <Link href="/bsa-calculator" style={styles.subLink} onClick={closeAll}>Body Surface Area</Link>
                  <Link href="/pregnancy-weight-gain-calculator" style={styles.subLink} onClick={closeAll}>Pregnancy Weight Gain</Link>
                </div>
              )}
            </li>

            {/* ENERGY & NUTRITION */}
            <li style={styles.item}>
              <div style={styles.head} onClick={() => toggle("energy")}>
                Energy & Nutrition
                <i className={`fas fa-chevron-${active === "energy" ? "up" : "down"}`}></i>
              </div>
              {active === "energy" && (
                <div style={styles.sub}>
                  <Link href="/calorie-calculator" style={styles.subLink} onClick={closeAll}>Calorie Calculator</Link>
                  <Link href="/tdee-calculator" style={styles.subLink} onClick={closeAll}>TDEE & Macros</Link>
                  <Link href="/bmr-calculator" style={styles.subLink} onClick={closeAll}>BMR Calculator</Link>
                  <Link href="/water-intake-calculator" style={styles.subLink} onClick={closeAll}>Water Intake</Link>
                  <Link href="/fluid-requirement" style={styles.subLink} onClick={closeAll}>Fluid Requirement</Link>
                </div>
              )}
            </li>

            {/* MEDICAL */}
            <li style={styles.item}>
              <div style={styles.head} onClick={() => toggle("medical")}>
                Medical & Clinical
                <i className={`fas fa-chevron-${active === "medical" ? "up" : "down"}`}></i>
              </div>
              {active === "medical" && (
                <div style={styles.sub}>
                  <Link href="/gfr-calculator" style={styles.subLink} onClick={closeAll}>GFR Calculator</Link>
                  <Link href="/creatinine-clearance" style={styles.subLink} onClick={closeAll}>Creatinine Clearance</Link>
                  <Link href="/medication-dosage" style={styles.subLink} onClick={closeAll}>Medication Dosage</Link>
                  <Link href="/anion-gap-calculator" style={styles.subLink} onClick={closeAll}>Anion Gap</Link>
                </div>
              )}
            </li>

            {/* HEART */}
            <li style={styles.item}>
              <div style={styles.head} onClick={() => toggle("heart")}>
                Heart & Cardiovascular
                <i className={`fas fa-chevron-${active === "heart" ? "up" : "down"}`}></i>
              </div>
              {active === "heart" && (
                <div style={styles.sub}>
                  <Link href="/heart-rate-calculator" style={styles.subLink} onClick={closeAll}>Heart Rate Zones</Link>
                  <Link href="/blood-pressure-category-calculator" style={styles.subLink} onClick={closeAll}>Blood Pressure</Link>
                  <Link href="/heart-disease-risk-calculator" style={styles.subLink} onClick={closeAll}>Heart Disease Risk</Link>
                </div>
              )}
            </li>

            {/* WOMEN */}
            <li style={styles.item}>
              <div style={styles.head} onClick={() => toggle("women")}>
                Women’s Health
                <i className={`fas fa-chevron-${active === "women" ? "up" : "down"}`}></i>
              </div>
              {active === "women" && (
                <div style={styles.sub}>
                  <Link href="/ovulation-tracker" style={styles.subLink} onClick={closeAll}>Ovulation Tracker</Link>
                  <Link href="/pregnancy-due-date-calculator" style={styles.subLink} onClick={closeAll}>Due Date</Link>
                  <Link href="/fertile-window-calculator" style={styles.subLink} onClick={closeAll}>Fertile Window</Link>
                  <Link href="/safe-period-calculator" style={styles.subLink} onClick={closeAll}>Safe Period</Link>
                </div>
              )}
            </li>

            {/* ABOUT / CONTACT */}
            <li style={styles.item}>
              <Link href="/about" style={styles.link} onClick={closeAll}>About</Link>
            </li>
            <li style={styles.item}>
              <Link href="/contact" style={styles.link} onClick={closeAll}>Contact</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
