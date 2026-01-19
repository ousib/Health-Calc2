"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleDropdown = (name) => {
        if (isMobile) {
            setActiveDropdown(activeDropdown === name ? null : name);
        }
    };

    const closeMobileMenu = () => {
        if (isMobile) {
            setIsMobileOpen(false);
            setActiveDropdown(null);
        }
    };

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <Link href="/" onClick={closeMobileMenu}>
                        <i className="fas fa-calculator"></i>
                        Health<span>Calc</span>
                    </Link>
                </div>
                
                <button 
                    className="mobile-toggle" 
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${isMobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
                
                <ul className={`nav-links ${isMobileOpen ? 'active' : ''}`}>
                    <li>
                        <Link href="/" onClick={closeMobileMenu}>
                            <i className="fas fa-home"></i> Home
                        </Link>
                    </li>
                    
                    {/* Body & Weight Dropdown */}
                    <li 
                        className={`dropdown ${activeDropdown === 'body' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('body')}
                    >
                        <span className="dropbtn">
                            <i className="fas fa-weight"></i> Body & Weight 
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <Link href="/bmi-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-chart-line"></i> BMI Calculator
                            </Link>
                            <Link href="/body-fat-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-percentage"></i> Body Fat %
                            </Link>
                            <Link href="/ibw-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-balance-scale"></i> Ideal Weight (IBW)
                            </Link>
                            <Link href="/lbm-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-dumbbell"></i> Lean Body Mass
                            </Link>
                            <Link href="/waist-hip-ratio" onClick={closeMobileMenu}>
                                <i className="fas fa-ruler-combined"></i> Waist-to-Hip Ratio
                            </Link>
                            <Link href="/bsa-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-square"></i> Body Surface Area
                            </Link>
                            <Link href="/pregnancy-weight-gain-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-baby-carriage"></i> Pregnancy Weight Gain
                            </Link>
                        </div>
                    </li>

                    {/* Energy & Nutrition Dropdown */}
                    <li 
                        className={`dropdown ${activeDropdown === 'energy' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('energy')}
                    >
                        <span className="dropbtn">
                            <i className="fas fa-bolt"></i> Energy & Nutrition 
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <Link href="/calorie-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-fire"></i> Calorie Calculator
                            </Link>
                            <Link href="/tdee-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-chart-pie"></i> TDEE & Macros
                            </Link>
                            <Link href="/bmr-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-bed"></i> BMR Calculator
                            </Link>
                            <Link href="/nutritional-needs" onClick={closeMobileMenu}>
                                <i className="fas fa-apple-alt"></i> Nutritional Needs
                            </Link>
                            <Link href="/carbohydrate-intake-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-bread-slice"></i> Carb Intake
                            </Link>
                            <Link href="/fat-intake-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-oil-can"></i> Fat Intake
                            </Link>
                            <Link href="/water-intake-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-tint"></i> Water Intake
                            </Link>
                            <Link href="/fluid-requirement" onClick={closeMobileMenu}>
                                <i className="fas fa-flask"></i> Fluid Requirement
                            </Link>
                        </div>
                    </li>

                    {/* Medical & Clinical Dropdown */}
                    <li 
                        className={`dropdown ${activeDropdown === 'medical' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('medical')}
                    >
                        <span className="dropbtn">
                            <i className="fas fa-stethoscope"></i> Medical & Clinical 
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <Link href="/gfr-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-kidneys"></i> GFR Calculator
                            </Link>
                            <Link href="/creatinine-clearance" onClick={closeMobileMenu}>
                                <i className="fas fa-vial"></i> Creatinine Clearance
                            </Link>
                            <Link href="/medication-dosage" onClick={closeMobileMenu}>
                                <i className="fas fa-pills"></i> Medication Dosage
                            </Link>
                            <Link href="/electrolyte-correction" onClick={closeMobileMenu}>
                                <i className="fas fa-atom"></i> Electrolyte Correction
                            </Link>
                            <Link href="/anion-gap-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-calculator"></i> Anion Gap
                            </Link>
                        </div>
                    </li>

                    {/* Heart & Cardiovascular Dropdown */}
                    <li 
                        className={`dropdown ${activeDropdown === 'cardio' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('cardio')}
                    >
                        <span className="dropbtn">
                            <i className="fas fa-heartbeat"></i> Heart & Cardiovascular 
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <Link href="/heart-rate-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-heart"></i> Heart Rate Zones
                            </Link>
                            <Link href="/cardiac-index-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-heartbeat"></i> Cardiac Index
                            </Link>
                            <Link href="/blood-pressure-category-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-tachometer-alt"></i> BP Category
                            </Link>
                            <Link href="/blood-pressure-tracker" onClick={closeMobileMenu}>
                                <i className="fas fa-chart-line"></i> BP Tracker
                            </Link>
                            <Link href="/heart-disease-risk-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-heartbeat"></i> Heart Disease Risk
                            </Link>
                        </div>
                    </li>

                    {/* Women's Health & Pregnancy Dropdown */}
                    <li 
                        className={`dropdown ${activeDropdown === 'womensHealth' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('womensHealth')}
                    >
                        <span className="dropbtn">
                            <i className="fas fa-female"></i> Women's Health 
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <Link href="/ovulation-tracker" onClick={closeMobileMenu}>
                                <i className="fas fa-calendar-alt"></i> Ovulation Tracker
                            </Link>
                            <Link href="/pregnancy-due-date-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-baby"></i> Due Date Calculator
                            </Link>
                            <Link href="/pregnancy-test" onClick={closeMobileMenu}>
                                <i className="fas fa-clipboard-check"></i> Pregnancy Test
                            </Link>
                            <Link href="/fertile-window-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-calendar-check"></i> Fertile Window
                            </Link>
                            <Link href="/safe-period-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-shield-alt"></i> Safe Period
                            </Link>
                            <Link href="/period-cycle-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-history"></i> Period Cycle
                            </Link>
                        </div>
                    </li>

                    {/* Risk Assessment Dropdown */}
                    <li 
                        className={`dropdown ${activeDropdown === 'risk' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('risk')}
                    >
                        <span className="dropbtn">
                            <i className="fas fa-clipboard-check"></i> Risk Assessment 
                            <i className="fas fa-chevron-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <Link href="/diabetes-risk-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-syringe"></i> Diabetes Risk
                            </Link>
                            <Link href="/heart-disease-risk-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-heartbeat"></i> Heart Disease Risk
                            </Link>
                            <Link href="/blood-pressure-category-calculator" onClick={closeMobileMenu}>
                                <i className="fas fa-tachometer-alt"></i> Blood Pressure Risk
                            </Link>
                        </div>
                    </li>

                    <li>
                        <Link href="/about" onClick={closeMobileMenu}>
                            <i className="fas fa-info-circle"></i> About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" onClick={closeMobileMenu}>
                            <i className="fas fa-envelope"></i> Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}