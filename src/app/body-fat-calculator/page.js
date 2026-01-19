"use client";

import { useState, useEffect } from 'react';

export default function BodyFatPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [bodyFatResult, setBodyFatResult] = useState(null);
  const [category, setCategory] = useState('');
  const [tip, setTip] = useState('');
  const [scalePosition, setScalePosition] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Sample data for demo
  useEffect(() => {
    setHeight('175');
    setNeck('38');
    setWaist('85');
    setHips('95');
  }, []);

  // Handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setBodyFatResult(null);
    setScalePosition(0);
  };

  const calculateBodyFat = () => {
    const heightVal = parseFloat(height);
    const neckVal = parseFloat(neck);
    const waistVal = parseFloat(waist);
    const hipsVal = gender === 'female' ? parseFloat(hips) : 0;
    
    // Validate inputs
    if (!heightVal || !neckVal || !waistVal || heightVal <= 0 || neckVal <= 0 || waistVal <= 0) {
      alert('Please fill in all required fields with valid numbers.');
      return;
    }
    
    if (gender === 'female' && (!hipsVal || hipsVal <= 0)) {
      alert('Please enter your hip measurement.');
      return;
    }
    
    // Convert imperial to metric if needed
    let heightCm = heightVal;
    let neckCm = neckVal;
    let waistCm = waistVal;
    let hipsCm = hipsVal;
    
    if (currentUnit === 'imperial') {
      // Convert inches to cm
      heightCm = heightVal * 2.54;
      neckCm = neckVal * 2.54;
      waistCm = waistVal * 2.54;
      hipsCm = hipsVal * 2.54;
    }
    
    let bf = 0;
    
    if (gender === 'male') {
      if (waistCm <= neckCm) {
        alert('Waist measurement must be larger than neck measurement.');
        return;
      }
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      if (waistCm + hipsCm <= neckCm) {
        alert('Sum of waist and hips must be larger than neck measurement.');
        return;
      }
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipsCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }
    
    // Validate result
    if (bf <= 0 || bf > 60) {
      alert('Invalid result. Please check your measurements and try again.');
      return;
    }
    
    const bfResult = bf.toFixed(1);
    
    // Determine category and health tip
    let categoryResult = "Acceptable";
    let color = "#f39c12";
    let tipResult = "";
    
    if (gender === 'male') {
      if (bf < 6) { 
        categoryResult = "Essential Fat"; 
        color = "#3498db"; 
        tipResult = "Consider increasing body fat slightly for optimal health.";
      }
      else if (bf < 14) { 
        categoryResult = "Athlete"; 
        color = "#27ae60"; 
        tipResult = "Excellent body composition for athletic performance.";
      }
      else if (bf < 18) { 
        categoryResult = "Fitness"; 
        color = "#2ecc71"; 
        tipResult = "Great fitness level. Maintain with regular exercise.";
      }
      else if (bf > 25) { 
        categoryResult = "Obese"; 
        color = "#e74c3c"; 
        tipResult = "Consider consulting a healthcare provider for weight management strategies.";
      }
    } else {
      if (bf < 14) { 
        categoryResult = "Essential Fat"; 
        color = "#3498db"; 
        tipResult = "Consider increasing body fat slightly for hormonal health.";
      }
      else if (bf < 21) { 
        categoryResult = "Athlete"; 
        color = "#27ae60"; 
        tipResult = "Excellent body composition for athletic performance.";
      }
      else if (bf < 25) { 
        categoryResult = "Fitness"; 
        color = "#2ecc71"; 
        tipResult = "Great fitness level. Maintain with regular exercise.";
      }
      else if (bf > 32) { 
        categoryResult = "Obese"; 
        color = "#e74c3c"; 
        tipResult = "Consider consulting a healthcare provider for weight management strategies.";
      }
    }
    
    // Calculate scale position
    let position = 0;
    if (bf < 5) {
      position = (bf / 5) * 10;
    } else if (bf < 13) {
      position = 10 + ((bf - 5) / 8) * 15;
    } else if (bf < 17) {
      position = 25 + ((bf - 13) / 4) * 15;
    } else if (bf < 24) {
      position = 40 + ((bf - 17) / 7) * 30;
    } else {
      position = 70 + Math.min(((bf - 24) / 30) * 30, 30);
    }
    
    setBodyFatResult(bfResult);
    setCategory(categoryResult);
    setTip(tipResult);
    setScalePosition(position);
  };

  const getCategoryColor = () => {
    if (!bodyFatResult) return '#f39c12';
    const bf = parseFloat(bodyFatResult);
    
    if (gender === 'male') {
      if (bf < 6) return '#3498db';
      if (bf < 14) return '#27ae60';
      if (bf < 18) return '#2ecc71';
      if (bf > 25) return '#e74c3c';
      return '#f39c12';
    } else {
      if (bf < 14) return '#3498db';
      if (bf < 21) return '#27ae60';
      if (bf < 25) return '#2ecc71';
      if (bf > 32) return '#e74c3c';
      return '#f39c12';
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How accurate is the Navy Method for body fat calculation?",
      answer: "The U.S. Navy Method body fat calculator provides estimates within ±3-4% of more precise clinical methods like DEXA scans or hydrostatic weighing for most individuals. However, accuracy may vary for athletes, seniors, or individuals with extreme body types."
    },
    {
      question: "What's the difference between body fat percentage and BMI?",
      answer: "Body fat percentage measures the proportion of fat mass to total body weight, while BMI (Body Mass Index) is a height-weight ratio. Body composition analysis provides more meaningful health insights as it distinguishes between muscle and fat, whereas BMI can misclassify muscular individuals as overweight."
    },
    {
      question: "How often should I measure my body fat percentage?",
      answer: "For tracking progress, measure every 2-4 weeks. Daily measurements aren't recommended due to normal fluctuations from hydration, sodium intake, and hormonal changes. Always measure at the same time of day under consistent conditions for accurate comparisons."
    },
    {
      question: "Can women use the same formula as men?",
      answer: "No, women require additional hip measurements in the Navy Method formula due to different fat distribution patterns. Women naturally carry more essential body fat for reproductive health and hormonal balance, which is reflected in the different calculation formula and category ranges."
    },
    {
      question: "What's the healthiest body fat percentage range?",
      answer: "For men, 14-17% represents the fitness range with optimal health benefits. For women, 21-24% is considered ideal. These ranges balance metabolic health, hormonal function, and disease prevention while maintaining sustainable lifestyle habits."
    }
  ];

  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "BMR Calculator", link: "/bmr-calculator" },
    { name: "TDEE Calculator", link: "/tdee-calculator" },
    { name: "Macro Calculator", link: "/macro-calculator" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator" },
    { name: "Waist to Height Ratio", link: "/waist-to-height-ratio" },
    { name: "Body Type Calculator", link: "/body-type-calculator" },
    { name: "Calorie Calculator", link: "/calorie-calculator" }
  ];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateBodyFat();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [height, neck, waist, hips, gender, currentUnit]);

  return (
    <>
      <style jsx>{`
        /* Base & Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          position: relative;
        }

        /* Calculator Box */
        .calculator-box {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          width: 100%;
        }

        .calc-title { 
          margin-bottom: 10px; 
          color: #2c3e50; 
          font-size: clamp(1.8rem, 4vw, 2.2rem);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .calc-desc { 
          margin-bottom: 25px; 
          font-size: clamp(0.95rem, 2vw, 1rem); 
          color: #666; 
        }
        
        /* Input Groups */
        .measurement-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .input-group { 
          margin-bottom: 15px; 
        }
        
        .input-group label { 
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600; 
          margin-bottom: 8px; 
          color: #34495e; 
          font-size: 0.95rem;
        }
        
        .input-group input, .input-group select { 
          width: 100%; 
          padding: 14px 16px; 
          border: 2px solid #dfe6e9; 
          border-radius: 10px; 
          font-size: 1rem; 
          outline: none; 
          transition: all 0.3s;
        }
        
        .input-group input:focus, .input-group select:focus { 
          border-color: #27ae60; 
          box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
        }

        /* Units Toggle */
        .units-toggle {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .unit-btn {
          padding: 8px 16px;
          background: #f1f3f5;
          border: 2px solid #dfe6e9;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .unit-btn.active {
          background: #27ae60;
          color: white;
          border-color: #27ae60;
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #27ae60; 
          color: white; 
          border: none; 
          border-radius: 10px; 
          font-size: 1.1rem; 
          font-weight: bold; 
          cursor: pointer; 
          transition: 0.3s; 
          margin: 15px 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .calc-btn:hover { 
          background: #219150; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%);
          border-radius: 12px; 
          border-left: 5px solid #27ae60;
          text-align: center;
          display: ${bodyFatResult ? 'block' : 'none'}; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .bf-val { 
          font-size: clamp(2.5rem, 8vw, 3.5rem); 
          font-weight: 800; 
          display: block; 
          margin: 10px 0; 
          color: ${getCategoryColor()};
        }

        /* Body Fat Visual Scale */
        .bodyfat-scale {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .scale-container {
          position: relative;
          height: 40px;
          background: linear-gradient(90deg, 
            #3498db 0%, 
            #3498db 10%, 
            #27ae60 10%, 
            #27ae60 25%, 
            #2ecc71 25%, 
            #2ecc71 40%, 
            #f39c12 40%, 
            #f39c12 70%, 
            #e74c3c 70%, 
            #e74c3c 100%);
          border-radius: 20px;
          margin: 20px 0;
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #7f8c8d;
          margin-top: 5px;
        }

        .scale-marker {
          position: absolute;
          top: -10px;
          width: 4px;
          height: 60px;
          background: #2c3e50;
          border-radius: 2px;
          transform: translateX(-2px);
          left: ${scalePosition}%;
        }

        /* Tables & Content */
        .category-table {
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px; 
          font-size: 0.95rem;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }
        
        .category-table th, .category-table td {
          padding: 15px; 
          text-align: left; 
          border-bottom: 1px solid #eee;
        }
        
        .category-table th { 
          background-color: #2c3e50; 
          color: white; 
          font-weight: 600;
        }
        
        /* Highlight row colors */
        .cat-essential { color: #3498db; font-weight: bold; background-color: #ebf5fb; }
        .cat-athlete { color: #27ae60; font-weight: bold; background-color: #e8f5e9; }
        .cat-fitness { color: #2ecc71; font-weight: bold; background-color: #eafaf1; }
        .cat-acceptable { color: #f39c12; font-weight: bold; background-color: #fef5e7; }
        .cat-obese { color: #e74c3c; font-weight: bold; background-color: #fdedec; }

        /* SEO Content Styles */
        .info-section { 
          margin-top: 40px; 
          border-top: 1px solid #eee; 
          padding-top: 30px; 
        }
        
        .info-section h3 { 
          color: #2c3e50; 
          margin-bottom: 15px; 
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .info-section p { 
          font-size: 0.95rem; 
          color: #555; 
          margin-bottom: 15px; 
          line-height: 1.7;
        }
        
        .formula-box { 
          background: #f1f3f5; 
          padding: 20px; 
          border-radius: 10px; 
          font-family: 'Courier New', monospace; 
          text-align: left; 
          margin: 20px 0; 
          font-size: 0.95rem;
          border-left: 4px solid #27ae60;
          overflow-x: auto;
        }

        /* Sidebar */
        .sidebar {
          display: none;
        }

        /* Sidebar Content */
        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
        }

        /* Ad Slots */
        .ad-slot {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          color: #7f8c8d;
          border: 1px dashed #ddd;
          transition: all 0.3s ease;
          
        }

        .sidebar-ad {
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .ad-slot:hover {
          background: #f0f2f5;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .sticky-ad {
          position: sticky;
          top: 20px;
          background: #e8f5e9;
          border: 2px solid #27ae60;
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.15);
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        /* Measurement Guide */
        .measurement-guide {
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #3498db;
        }

        .measurement-guide h4 {
          margin-bottom: 15px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .guide-step {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 15px;
        }

        .guide-number {
          background: #3498db;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        /* FAQ Section */
        .faq-section {
          margin: 40px 0;
          padding: 30px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .faq-title {
          color: #2c3e50;
          margin-bottom: 25px;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .faq-item {
          margin-bottom: 15px;
          border: 1px solid #dfe6e9;
          border-radius: 10px;
          overflow: hidden;
        }

        .faq-question {
          padding: 20px;
          background: #f8f9fa;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #2c3e50;
          transition: background 0.3s;
        }

        .faq-question:hover {
          background: #e9ecef;
        }

        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          background: white;
        }

        .faq-answer.active {
          padding: 20px;
          max-height: 500px;
        }

        /* Health Calculators Grid */
        .calculators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .calculator-card {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          text-decoration: none;
          color: #2c3e50;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .calculator-card:hover {
          background: #27ae60;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.2);
          border-color: #27ae60;
        }

        /* Additional Ads when sidebar disappears */
        .mobile-ads {
          display: none;
          margin: 30px 0;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .mobile-ad {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          color: #7f8c8d;
          border: 1px dashed #ddd;
        }

        /* Responsive Styles */
        @media (min-width: 768px) {
          .container {
            grid-template-columns: 85% 300px;
            padding: 30px;
          }

          .sidebar {
            display: block;
          }

          .measurement-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .calc-btn {
            max-width: 300px;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 20px;
          }
          
          .category-table {
            display: block;
            overflow-x: auto;
          }
          
          .sidebar {
            display: none;
          }
          
          .mobile-ads {
            display: grid;
          }
          
          .calculators-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 15px;
          }
          
          .measurement-grid {
            grid-template-columns: 1fr;
          }
          
          .results-box {
            padding: 20px;
          }
          
          .info-section {
            margin-top: 30px;
            padding-top: 20px;
          }
          
          .formula-box {
            font-size: 0.85rem;
            padding: 15px;
          }
          
          .category-table th, .category-table td {
            padding: 12px 10px;
          }
          
          .calculators-grid {
            grid-template-columns: 1fr;
          }
          
          .faq-section {
            padding: 20px;
          }
        }

        /* Print Styles */
        @media print {
          .ad-slot, .sidebar, .calc-btn, .mobile-ads, .faq-section {
            display: none;
          }
          
          .results-box {
            border: 2px solid #333;
          }
        }

        /* List Styles */
        ul {
          margin-left: 20px;
          margin-bottom: 15px;
          color: #555;
        }

        li {
          margin-bottom: 10px;
        }
      `}</style>

      <main className="container">
        <section className="calculator-box">
          <h1 className="calc-title"><i className="fas fa-percentage"></i> Body Fat Percentage Calculator - Navy Method Body Composition Analysis</h1>
          <p className="calc-desc">Calculate your <strong>body fat percentage estimate</strong> using the validated <strong>U.S. Navy Method formula</strong> for accurate <strong>body composition assessment</strong> without expensive equipment like <strong>DEXA scans or hydrostatic weighing</strong>.</p>
          
          <div className="units-toggle">
            <button 
              className={`unit-btn ${currentUnit === 'metric' ? 'active' : ''}`} 
              onClick={() => toggleUnits('metric')}
            >
              Metric (cm)
            </button>
            <button 
              className={`unit-btn ${currentUnit === 'imperial' ? 'active' : ''}`} 
              onClick={() => toggleUnits('imperial')}
            >
              Imperial (inches)
            </button>
          </div>

          <div className="measurement-guide">
            <h4><i className="fas fa-info-circle"></i> Accurate Body Measurement Instructions for Precise Body Fat Calculation</h4>
            <div className="guide-step">
              <div className="guide-number">1</div>
              <div>
                <strong>Height Measurement:</strong> Stand barefoot against a wall, heels together, looking straight ahead
              </div>
            </div>
            <div className="guide-step">
              <div className="guide-number">2</div>
              <div>
                <strong>Neck Circumference:</strong> Measure below the Adam's apple (larynx) with tape parallel to floor
              </div>
            </div>
            <div className="guide-step">
              <div className="guide-number">3</div>
              <div>
                <strong>Waist Measurement:</strong> Measure at the narrowest point between ribs and hips (or at navel if no natural waist)
              </div>
            </div>
            <div className="guide-step">
              <div className="guide-number">4</div>
              <div>
                <strong>Hips Measurement (Women):</strong> Measure at the widest point of buttocks, tape parallel to floor
              </div>
            </div>
          </div>

          <div className="input-group">
            <label><i className="fas fa-venus-mars"></i> Biological Sex</label>
            <select 
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="measurement-grid">
            <div className="input-group">
              <label><i className="fas fa-ruler-vertical"></i> {currentUnit === 'metric' ? 'Height (cm)' : 'Height (inches)'}</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={currentUnit === 'metric' ? '175' : '69'}
                min="100" 
                max="250" 
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label><i className="fas fa-user"></i> {currentUnit === 'metric' ? 'Neck (cm)' : 'Neck (inches)'}</label>
              <input 
                type="number" 
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                placeholder={currentUnit === 'metric' ? '38' : '15'}
                min="20" 
                max="60" 
                step="0.1"
              />
            </div>
          </div>

          <div className="measurement-grid">
            <div className="input-group">
              <label><i className="fas fa-ruler-horizontal"></i> {currentUnit === 'metric' ? 'Waist (cm)' : 'Waist (inches)'}</label>
              <input 
                type="number" 
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder={currentUnit === 'metric' ? '85' : '33.5'}
                min="50" 
                max="150" 
                step="0.1"
              />
            </div>
            <div className="input-group" style={{ display: gender === 'female' ? 'block' : 'none' }}>
              <label><i className="fas fa-user-circle"></i> {currentUnit === 'metric' ? 'Hips (cm)' : 'Hips (inches)'}</label>
              <input 
                type="number" 
                value={hips}
                onChange={(e) => setHips(e.target.value)}
                placeholder={currentUnit === 'metric' ? '95' : '37.5'}
                min="60" 
                max="150" 
                step="0.1"
              />
            </div>
          </div>

          <button className="calc-btn" onClick={calculateBodyFat}>
            <i className="fas fa-calculator"></i> Calculate Body Fat Percentage
          </button>

          <div className="results-box" style={{ display: bodyFatResult ? 'block' : 'none' }}>
            <h3>Body Composition Analysis Results</h3>
            <span className="bf-val">{bodyFatResult || '--'}%</span>
            <p>Category: <strong style={{ color: getCategoryColor() }}>{category}</strong></p>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>{tip}</p>
          </div>

          {/* Body Fat Scale Visualization */}
          <div className="bodyfat-scale">
            <h4><i className="fas fa-chart-line"></i> Body Fat Percentage Scale - Understanding Your Body Composition Category</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
              Visual representation of <strong>body fat distribution categories</strong> based on <strong>American Council on Exercise (ACE) standards</strong>:
            </p>
            <div className="scale-container">
              {bodyFatResult && <div className="scale-marker"></div>}
            </div>
            <div className="scale-labels">
              <span>Essential Fat</span>
              <span>Athlete</span>
              <span>Fitness</span>
              <span>Acceptable</span>
              <span>Obese</span>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          </div>

          <h3><i className="fas fa-list-alt"></i> Body Fat Percentage Categories - American Council on Exercise (ACE) Standards</h3>
          <table className="category-table">
            <thead>
              <tr>
                <th>Body Composition Category</th>
                <th>Men (%)</th>
                <th>Women (%)</th>
                <th>Health Implications</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cat-essential">
                <td>Essential Fat</td>
                <td>2-5%</td>
                <td>10-13%</td>
                <td>Minimum required for basic physiological function and hormone production</td>
              </tr>
              <tr className="cat-athlete">
                <td>Athletes</td>
                <td>6-13%</td>
                <td>14-20%</td>
                <td>Optimal for athletic performance and lean muscle definition</td>
              </tr>
              <tr className="cat-fitness">
                <td>Fitness</td>
                <td>14-17%</td>
                <td>21-24%</td>
                <td>Healthy range with good muscle tone and low disease risk</td>
              </tr>
              <tr className="cat-acceptable">
                <td>Acceptable/Average</td>
                <td>18-24%</td>
                <td>25-31%</td>
                <td>Moderate health risks, may benefit from body composition improvement</td>
              </tr>
              <tr className="cat-obese">
                <td>Obese/High Risk</td>
                <td>25%+</td>
                <td>32%+</td>
                <td>Increased risk of metabolic diseases, cardiovascular issues</td>
              </tr>
            </tbody>
          </table>

          {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
          <div className="info-section">
            <h3><i className="fas fa-calculator"></i> Navy Method Body Fat Calculation: How This Anthropometric Measurement Works</h3>
            <p>The <strong>U.S. Navy Method body fat calculator</strong> represents a scientifically validated <strong>anthropometric measurement technique</strong> that estimates <strong>adipose tissue percentage</strong> using circumference measurements. This <strong>non-invasive body composition assessment</strong> method provides a reliable alternative to expensive <strong>clinical body fat testing</strong> methods like <strong>DEXA scans, BodPod air displacement, or hydrostatic underwater weighing</strong>.</p>

            <div className="formula-box">
              <strong>U.S. Navy Method Body Fat Formulas:</strong><br/>
              <strong>For Men:</strong><br/>
              %BF = 495 / (1.0324 - 0.19077 × log₁₀(waist - neck) + 0.15456 × log₁₀(height)) - 450<br/><br/>
              <strong>For Women:</strong><br/>
              %BF = 495 / (1.29579 - 0.35004 × log₁₀(waist + hips - neck) + 0.22100 × log₁₀(height)) - 450<br/><br/>
              <strong>Accuracy Range:</strong> Typically within ±3-4% of more precise clinical measurements
            </div>

            <h3><i className="fas fa-balance-scale"></i> Body Fat Percentage vs. BMI: Why Body Composition Matters More Than Weight Alone</h3>
            <p><strong>Body fat percentage measurement</strong> provides superior health insights compared to <strong>BMI (Body Mass Index) calculation</strong> alone. While <strong>BMI only considers height-weight ratio</strong>, <strong>body composition analysis</strong> distinguishes between <strong>lean body mass and adipose tissue distribution</strong>. This distinction is crucial for:</p>
            <ul>
              <li><strong>Muscular Individuals:</strong> Athletes may show <strong>high BMI due to muscle mass</strong> despite having <strong>low body fat percentage</strong></li>
              <li><strong>Metabolically Obese Normal Weight (MONW):</strong> Individuals with <strong>normal BMI but high body fat</strong> (<strong>"skinny fat" phenomenon</strong>)</li>
              <li><strong>Age-Related Changes:</strong> Seniors may maintain <strong>stable weight while losing muscle</strong> and gaining fat (<strong>sarcopenic obesity</strong>)</li>
              <li><strong>Fitness Progress Tracking:</strong> Monitoring <strong>body recomposition</strong> (fat loss with muscle maintenance/gain)</li>
            </ul>
            
            <h3><i className="fas fa-heartbeat"></i> Health Risks Associated with Different Body Fat Percentage Ranges</h3>
            <p>Understanding your <strong>body fat category classification</strong> helps assess <strong>health risk stratification</strong>:</p>
            <ul>
              <li><strong>Essential Fat Range (Men 2-5%, Women 10-13%):</strong> Required for <strong>hormone production, vitamin absorption, and organ protection</strong></li>
              <li><strong>Athlete Range (Men 6-13%, Women 14-20%):</strong> Associated with <strong>optimal athletic performance, insulin sensitivity, and cardiovascular health</strong></li>
              <li><strong>Fitness Range (Men 14-17%, Women 21-24%):</strong> Represents <strong>healthy body composition with minimal disease risk</strong></li>
              <li><strong>Acceptable Range (Men 18-24%, Women 25-31%):</strong> Moderate increased risk for <strong>metabolic syndrome and cardiovascular diseases</strong></li>
              <li><strong>Obese Range (Men 25%+, Women 32%+):</strong> Significant elevated risk for <strong>type 2 diabetes, hypertension, dyslipidemia, and certain cancers</strong></li>
            </ul>
            
            <h3><i className="fas fa-chart-pie"></i> Fat Distribution Patterns: Visceral vs. Subcutaneous Fat Health Implications</h3>
            <p>The <strong>location of body fat accumulation</strong> significantly impacts <strong>health risk assessment</strong>:</p>
            <ul>
              <li><strong>Visceral (Abdominal) Fat:</strong> Fat stored <strong>around internal organs</strong> - associated with <strong>increased inflammation, insulin resistance, and cardiovascular risk</strong></li>
              <li><strong>Subcutaneous Fat:</strong> Fat stored <strong>under the skin</strong> - generally <strong>less metabolically active</strong> than visceral fat</li>
              <li><strong>Gynoid (Pear-Shaped) Pattern:</strong> Fat accumulation in <strong>hips and thighs</strong> - generally <strong>lower metabolic risk</strong></li>
              <li><strong>Android (Apple-Shaped) Pattern:</strong> Fat accumulation in <strong>abdominal area</strong> - associated with <strong>higher metabolic disease risk</strong></li>
            </ul>
            
            <h3><i className="fas fa-tape"></i> Factors Affecting Body Fat Percentage Accuracy in Circumference-Based Methods</h3>
            <p>Several factors can influence the <strong>accuracy of Navy Method calculations</strong>:</p>
            <ul>
              <li><strong>Measurement Technique Variability:</strong> Tape measure placement and tension consistency</li>
              <li><strong>Body Type Differences:</strong> Individual variations in <strong>fat distribution patterns and muscle insertion points</strong></li>
              <li><strong>Age and Ethnicity Considerations:</strong> Different populations may have <strong>varying body composition norms</strong></li>
              <li><strong>Hydration Status:</strong> Water retention can temporarily affect <strong>circumference measurements</strong></li>
              <li><strong>Training Status:</strong> Highly trained individuals may have <strong>different muscle-to-fat ratios</strong></li>
            </ul>

            <h3><i className="fas fa-dumbbell"></i> Strategies for Healthy Body Fat Reduction and Body Composition Improvement</h3>
            <p>For individuals in the <strong>"Acceptable" or "Obese" categories</strong>, evidence-based strategies include:</p>
            <ul>
              <li><strong>Calorie Deficit Creation:</strong> 500-calorie daily deficit for <strong>safe 1-pound weekly fat loss</strong></li>
              <li><strong>Resistance Training Emphasis:</strong> Preserve <strong>lean muscle mass during weight loss</strong> to maintain <strong>metabolic rate</strong></li>
              <li><strong>High-Protein Nutrition:</strong> 1.6-2.2g protein/kg body weight for <strong>muscle preservation and satiety</strong></li>
              <li><strong>Cardiovascular Exercise:</strong> 150-300 minutes weekly of <strong>moderate-intensity aerobic activity</strong></li>
              <li><strong>Sleep Optimization:</strong> 7-9 hours nightly for <strong>hormone regulation and recovery</strong></li>
              <li><strong>Stress Management:</strong> Cortisol reduction through <strong>mindfulness and relaxation techniques</strong></li>
            </ul>

            <h3><i className="fas fa-stethoscope"></i> When to Seek Professional Body Composition Assessment</h3>
            <p>While the <strong>Navy Method provides useful estimates</strong>, consider <strong>professional body composition testing</strong> for:</p>
            <ul>
              <li><strong>Competitive Athletes:</strong> Requiring <strong>precise body fat measurements</strong> for performance optimization</li>
              <li><strong>Medical Weight Management:</strong> Individuals with <strong>obesity-related comorbidities</strong> needing clinical monitoring</li>
              <li><strong>Body Recomposition Programs:</strong> Tracking <strong>simultaneous fat loss and muscle gain</strong> accurately</li>
              <li><strong>Metabolic Disorders:</strong> Patients with <strong>diabetes, PCOS, or thyroid conditions</strong> affecting body composition</li>
            </ul>

            <h3><i className="fas fa-chart-bar"></i> Long-Term Benefits of Maintaining Healthy Body Fat Percentage Levels</h3>
            <p>Sustaining <strong>optimal body fat percentage ranges</strong> offers numerous <strong>long-term health benefits and disease prevention advantages</strong> that extend far beyond aesthetics. Research consistently demonstrates that individuals maintaining <strong>healthy body composition measurements</strong> experience significantly reduced risks for <strong>chronic metabolic diseases, cardiovascular conditions, and age-related health decline</strong>.</p>

            <p><strong>Metabolic Health Optimization:</strong> Maintaining <strong>body fat within recommended fitness ranges</strong> enhances <strong>insulin sensitivity and glucose metabolism</strong>, reducing type 2 diabetes risk by up to 70%. Proper <strong>adipose tissue regulation</strong> supports <strong>balanced hormone production</strong> including leptin, adiponectin, and cortisol - all crucial for <strong>appetite control, energy balance, and stress response</strong>.</p>

            <p><strong>Cardiovascular Protection:</strong> Each percentage point reduction in <strong>excess body fat percentage</strong> correlates with measurable improvements in <strong>blood pressure, cholesterol profiles, and arterial health</strong>. Individuals with <strong>healthy body composition metrics</strong> demonstrate superior <strong>endothelial function and reduced systemic inflammation</strong>, key factors in preventing atherosclerosis and related cardiovascular events.</p>

            <p><strong>Musculoskeletal Health Preservation:</strong> Proper <strong>body fat distribution and lean muscle maintenance</strong> significantly reduce osteoarthritis risk by minimizing joint stress. Maintaining <strong>optimal muscle-to-fat ratios</strong> supports <strong>bone density preservation</strong>, particularly important for preventing osteoporosis in postmenopausal women and aging populations.</p>

            <p><strong>Cancer Risk Reduction:</strong> Numerous epidemiological studies establish clear connections between <strong>excess body fat accumulation</strong> and increased risks for various cancers including breast, colon, endometrial, pancreatic, and kidney cancers. <strong>Adipose tissue reduction</strong> decreases circulating levels of <strong>estrogen, insulin, and inflammatory cytokines</strong> that promote cancerous cell growth and proliferation.</p>

            <p><strong>Cognitive Function and Mental Health:</strong> Emerging research reveals compelling connections between <strong>healthy body composition</strong> and improved <strong>cognitive performance, mood regulation, and reduced depression risk</strong>. The <strong>neuroprotective effects of regular exercise and proper nutrition</strong> that support <strong>body fat management</strong> contribute to enhanced <strong>brain-derived neurotrophic factor (BDNF) production</strong>, supporting neuroplasticity and mental resilience.</p>

            <p><strong>Longevity and Quality of Life:</strong> Population studies consistently demonstrate that individuals maintaining <strong>fitness-level body fat percentages</strong> experience increased <strong>healthspan and reduced all-cause mortality</strong>. Beyond lifespan extension, proper <strong>body composition management</strong> significantly enhances <strong>physical functioning, mobility, and independence</strong> in later life stages, supporting active aging and sustained quality of life.</p>

            <p><strong>Practical Implementation Strategies:</strong> Achieving and maintaining <strong>optimal body fat percentage levels</strong> requires consistent implementation of evidence-based practices. Successful <strong>body composition management</strong> involves creating sustainable <strong>nutrition and exercise protocols</strong> tailored to individual needs, preferences, and lifestyle constraints. Regular <strong>body fat percentage monitoring</strong> using validated methods like the <strong>Navy circumference technique</strong> provides objective feedback for adjusting strategies and maintaining motivation throughout the <strong>health optimization journey</strong>.</p>
          </div>

          {/* Q&A Dropdown Section */}
          <div className="faq-section">
            <h2 className="faq-title"><i className="fas fa-question-circle"></i> Frequently Asked Questions About Body Fat Percentage Measurement</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <i className={`fas fa-chevron-${activeFAQ === index ? 'up' : 'down'}`}></i>
                </div>
                <div className={`faq-answer ${activeFAQ === index ? 'active' : ''}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

          {/* Health Calculators Section */}
          <div className="info-section">
            <h3><i className="fas fa-calculator"></i> Related Health & Fitness Calculators</h3>
            <p>Explore our comprehensive collection of <strong>health assessment tools and fitness calculators</strong> to better understand your overall wellness and track your progress:</p>
            <div className="calculators-grid">
              {healthCalculators.map((calculator, index) => (
                <a key={index} href={calculator.link} className="calculator-card">
                  <i className="fas fa-calculator"></i> {calculator.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar with 3 Ads (3rd one sticky) */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <div className="ad-slot sidebar-ad">
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Try our premium fitness tracking app</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sidebar-ad">
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>High-quality body fat calipers on sale</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sticky-ad">
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Join our personalized coaching program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px sticky ad</p>
            </div>
          </div>
        </aside>

        {/* Additional Ads when sidebar disappears (mobile) */}
        <div className="mobile-ads">
          <div className="mobile-ad">
            <p><i className="fas fa-ad"></i> Mobile Advertisement 1</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Optimized for mobile viewing</p>
          </div>
          <div className="mobile-ad">
            <p><i className="fas fa-ad"></i> Mobile Advertisement 2</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for smaller screens</p>
          </div>
        </div>
      </main>
    </>
  );
}