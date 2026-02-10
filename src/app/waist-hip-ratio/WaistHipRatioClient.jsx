"use client";

import { useState, useEffect } from 'react';

export default function WaistHipRatioPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('female');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [whrResult, setWhrResult] = useState(null);
  const [category, setCategory] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [results, setResults] = useState(null);

  // Container style with sidebar
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: showSidebar ? '1fr 300px' : '1fr',
    gap: '30px'
  };

  // Calculator box style
  const calculatorBoxStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    width: '100%'
  };

  // Styles for share/download buttons
  const actionButtonsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap'
  };

  const shareButtonStyle = {
    padding: '12px 20px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const downloadButtonStyle = {
    padding: '12px 20px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const shareMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
    padding: '15px',
    zIndex: 1000,
    minWidth: '200px',
    marginTop: '10px'
  };

  const sharePlatformButtonStyle = {
    width: '100%',
    padding: '10px 15px',
    marginBottom: '8px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: '0.2s'
  };

  // Input grid style
  const inputGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  };

  const inputGroupStyle = {
    marginBottom: '20px'
  };

  const inputGroupLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#34495e',
    fontSize: '0.95rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #dfe6e9',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s'
  };

  const selectStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #dfe6e9',
    borderRadius: '10px',
    fontSize: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s'
  };

  const calcBtnStyle = {
    width: '100%',
    padding: '16px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    margin: '15px 0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  const calcBtnHoverStyle = {
    background: '#c0392b',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(231, 76, 60, 0.2)'
  };

  const resultsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    margin: '30px 0'
  };

  const resultCardStyle = {
    padding: '25px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
    borderTop: '5px solid'
  };

  // Sidebar styles
  const sidebarStyle = {
    display: 'block',
    height: 'fit-content'
  };

  const sidebarContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
    height: '100%'
  };

  const sidebarAdStyle = {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f8f9fa',
    border: '2px dashed #ddd',
    borderRadius: '10px',
    color: '#7f8c8d',
    padding: '15px'
  };

  const stickyAdStyle = {
    position: 'sticky',
    top: '20px',
    background: '#fdedec',
    border: '2px solid #e74c3c',
    boxShadow: '0 4px 12px rgba(231, 76, 60, 0.15)',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    zIndex: '10'
  };

  // Sample data for demo
  useEffect(() => {
    setWaist('85');
    setHip('95');
  }, []);

  // Handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside share menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-button-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showShareMenu]);

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setWhrResult(null);
    setResults(null);
  };

  const calculateWHR = () => {
    const waistVal = parseFloat(waist);
    const hipVal = parseFloat(hip);
    
    if (!waistVal || !hipVal || waistVal <= 0 || hipVal <= 0) {
      alert('Please fill in both waist and hip measurements with valid numbers.');
      return;
    }
    
    if (waistVal >= hipVal) {
      alert('Hip measurement should be larger than waist measurement.');
      return;
    }
    
    const whr = waistVal / hipVal;
    const whrRounded = whr.toFixed(2);
    
    // Determine category and risk level
    let categoryResult = '';
    let riskResult = '';
    let color = '#2ecc71';
    
    if (gender === 'male') {
      if (whr < 0.9) {
        categoryResult = 'Low Risk';
        riskResult = 'Healthy weight distribution';
        color = '#2ecc71';
      } else if (whr < 1.0) {
        categoryResult = 'Moderate Risk';
        riskResult = 'Moderate health risk';
        color = '#f39c12';
      } else {
        categoryResult = 'High Risk';
        riskResult = 'High health risk - Apple shape';
        color = '#e74c3c';
      }
    } else {
      if (whr < 0.8) {
        categoryResult = 'Low Risk';
        riskResult = 'Healthy weight distribution';
        color = '#2ecc71';
      } else if (whr < 0.85) {
        categoryResult = 'Moderate Risk';
        riskResult = 'Moderate health risk';
        color = '#f39c12';
      } else {
        categoryResult = 'High Risk';
        riskResult = 'High health risk - Apple shape';
        color = '#e74c3c';
      }
    }
    
    setWhrResult(whrRounded);
    setCategory(categoryResult);
    setRiskLevel(riskResult);
    setShowShareMenu(false);
    
    // Store results for sharing/downloading
    setResults({
      whr: whrRounded,
      category: categoryResult,
      risk: riskResult,
      color: color,
      measurements: {
        waist: waistVal,
        hip: hipVal,
        unit: currentUnit,
        gender: gender
      },
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
  };

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate WHR first before sharing.');
      return;
    }

    const shareText = `My Waist-Hip Ratio is ${results.whr} (${results.category}) - Check yours using this health calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'WHR,Health,Fitness,BodyShape';

    let shareUrlFull = '';
    
    switch(platform) {
      case 'facebook':
        shareUrlFull = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrlFull = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
        break;
      case 'linkedin':
        shareUrlFull = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareUrlFull = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        shareUrlFull = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'reddit':
        shareUrlFull = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'pinterest':
        shareUrlFull = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareUrlFull = `mailto:?subject=My Waist-Hip Ratio Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My WHR Results',
            text: shareText,
            url: shareUrl,
          });
          return;
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('Results copied to clipboard!');
          return;
        }
    }

    window.open(shareUrlFull, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  // Download as HTML file
  const downloadHTML = () => {
    if (!results) {
      alert('Please calculate WHR first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Waist-Hip Ratio Calculator Results</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: #f8f9fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .report-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #e74c3c;
        }
        
        .report-header h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .report-header p {
            color: #666;
            font-size: 1.1rem;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .result-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.08);
            border-top: 5px solid;
        }
        
        .card-title {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .card-title i {
            font-size: 1.2rem;
        }
        
        .whr-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: ${results.color};
        }
        
        .whr-category {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
            color: ${results.color};
        }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .measurement-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .measurement-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        
        .measurement-value {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .measurement-label {
            font-size: 0.85rem;
            color: #666;
            margin-top: 5px;
        }
        
        .health-tip {
            padding: 15px;
            background: #fdedec;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #e74c3c;
        }
        
        .disclaimer {
            background: #f8d7da;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #721c24;
            margin-top: 30px;
        }
        
        .disclaimer h4 {
            color: #721c24;
            margin-bottom: 15px;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 0.9rem;
        }
        
        @media print {
            body {
                background: white;
                padding: 10px;
            }
            
            .result-card {
                box-shadow: none;
                border: 1px solid #ddd;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="report-header">
            <h1><i class="fas fa-tape"></i> Waist-Hip Ratio Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- WHR Results Card -->
            <div class="result-card" style="border-top-color: #e74c3c;">
                <h3 class="card-title"><i class="fas fa-tape" style="color: #e74c3c;"></i> Waist-Hip Ratio Analysis</h3>
                <div class="whr-value">${results.whr}</div>
                <div class="whr-category">${results.category}</div>
                <div class="health-tip">
                    <strong><i class="fas fa-exclamation-triangle"></i> Health Risk Assessment:</strong><br>
                    ${results.risk}
                </div>
            </div>
            
            <!-- Measurements Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-ruler" style="color: #3498db;"></i> Measurement Details</h3>
                <div class="measurement-grid">
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.waist} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}</div>
                        <div class="measurement-label">Waist Circumference</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.hip} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}</div>
                        <div class="measurement-label">Hip Circumference</div>
                    </div>
                </div>
                <div class="info-box">
                    <p><strong>Formula:</strong> WHR = Waist ÷ Hip</p>
                    <p><strong>Gender:</strong> ${results.measurements.gender === 'male' ? 'Male' : 'Female'}</p>
                    <p><strong>Unit System:</strong> ${results.measurements.unit === 'metric' ? 'Metric (cm)' : 'Imperial (inches)'}</p>
                </div>
            </div>
            
            <!-- Category Explanation Card -->
            <div class="result-card" style="border-top-color: #f39c12;">
                <h3 class="card-title"><i class="fas fa-info-circle" style="color: #f39c12;"></i> Health Category Explanation</h3>
                <div class="info-box">
                    <p><strong>${results.category}:</strong> ${results.category === 'Low Risk' ? 
                      'Healthy fat distribution pattern with minimal metabolic disease risk.' : 
                      results.category === 'Moderate Risk' ? 
                      'Moderate fat accumulation in abdominal area requiring lifestyle attention.' :
                      'High abdominal fat accumulation associated with significant health risks.'}</p>
                </div>
                <div class="health-tip">
                    <strong><i class="fas fa-heartbeat"></i> Health Implications:</strong><br>
                    Waist-Hip Ratio is a crucial indicator of fat distribution patterns and metabolic health risk assessment.
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This Waist-Hip Ratio calculation is for informational purposes only. WHR provides an estimate of body fat distribution patterns. Always consult with healthcare professionals for comprehensive health assessment and personalized medical advice.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Waist-Hip Ratio Calculator • ${window.location.href}</p>
            <p style="margin-top: 10px; font-size: 0.8rem;">This report was generated on ${date} at ${time}</p>
        </div>
    </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whr-results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateWHR();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [waist, hip, gender, currentUnit]);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between Waist-Hip Ratio and BMI?",
      answer: "BMI measures overall weight relative to height, while WHR specifically assesses fat distribution patterns. WHR is more predictive of health risks because it identifies abdominal fat accumulation (visceral fat), which is more dangerous than fat stored elsewhere. A person can have normal BMI but high WHR (apple shape), indicating increased health risks despite normal weight."
    },
    {
      question: "How do I accurately measure my waist and hips?",
      answer: "For waist: Measure at the narrowest point between ribs and hips, or at navel level if no natural waist. For hips: Measure at the widest point of buttocks. Stand relaxed, exhale normally, and keep tape parallel to floor without compressing skin. Measure 2-3 times for accuracy. Avoid measuring over clothing for most accurate results."
    },
    {
      question: "Why are WHR standards different for men and women?",
      answer: "Women naturally have wider hips for childbearing, resulting in lower WHR values. Men typically store more abdominal fat (android/apple shape), while women store more hip/thigh fat (gynoid/pear shape). These biological differences mean different cut-off points indicate similar health risks for each gender."
    },
    {
      question: "What health risks are associated with high WHR?",
      answer: "High WHR (≥0.85 for women, ≥1.0 for men) indicates abdominal obesity and is strongly linked to: Type 2 diabetes, cardiovascular disease, hypertension, certain cancers (breast, colon), metabolic syndrome, and premature mortality. Visceral fat releases inflammatory chemicals that disrupt metabolism and insulin function."
    },
    {
      question: "Can I improve my WHR without losing weight?",
      answer: "Yes, through targeted strategies: 1) Strength training to build hip/glute muscles, 2) Reduce abdominal fat through cardio and diet, 3) Improve posture, 4) Manage stress (cortisol promotes abdominal fat), 5) Get adequate sleep, 6) Balance hormones. WHR improvement often requires both fat loss and muscle gain in specific areas."
    },
    {
      question: "How often should I measure my WHR?",
      answer: "Measure every 4-8 weeks when actively working on body composition. For general monitoring, check every 3-6 months. Always measure at the same time of day under consistent conditions. Women should avoid measuring during menstrual periods when bloating can affect measurements."
    }
  ];

  // Health calculators sorted by SEO relevance (WHR-related first)
  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 10 },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 10 },
    { name: "Body Type Calculator", link: "/body-type-calculator", relevance: 10 },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator", relevance: 9 },
    { name: "BSA Calculator", link: "/bsa-calculator", relevance: 8 },
    { name: "LBM Calculator", link: "/lbm-calculator", relevance: 8 },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 7 },
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 7 },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 7 },
    { name: "Waist-to-Height Ratio", link: "/waist-to-height-ratio", relevance: 9 },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 6 },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 6 },
    { name: "Ovulation Tracker", link: "/ovulation-tracker", relevance: 5 },
    { name: "Pregnancy Due Date Calculator", link: "/pregnancy-due-date-calculator", relevance: 5 },
    { name: "GFR Calculator", link: "/gfr-calculator", relevance: 4 },
    { name: "Creatinine Clearance", link: "/creatinine-clearance", relevance: 4 },
    { name: "Fluid Requirement", link: "/fluid-requirement", relevance: 4 },
    { name: "Medication Dosage", link: "/medication-dosage", relevance: 4 },
    { name: "Electrolyte Correction", link: "/electrolyte-correction", relevance: 4 },
    { name: "Nutritional Needs", link: "/nutritional-needs", relevance: 6 },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator", relevance: 4 },
    { name: "Pregnancy Weight Gain Calculator", link: "/pregnancy-weight-gain-calculator", relevance: 5 },
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator", relevance: 5 },
    { name: "Safe Period Calculator", link: "/safe-period-calculator", relevance: 5 },
    { name: "Period Cycle Calculator", link: "/period-cycle-calculator", relevance: 5 },
    { name: "Blood Pressure Calculator", link: "/blood-pressure-category-calculator", relevance: 7 },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 8 },
    { name: "Heart Disease Risk Calculator", link: "/heart-disease-risk-calculator", relevance: 8 },
    { name: "Carbohydrate Intake Calculator", link: "/carbohydrate-intake-calculator", relevance: 6 },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator", relevance: 6 },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator", relevance: 3 },
    { name: "Pregnancy Test Calculator", link: "/pregnancy-test", relevance: 4 },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker", relevance: 5 }
  ];

  // Sort by relevance
  const sortedCalculators = [...healthCalculators].sort((a, b) => b.relevance - a.relevance);

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={{ 
          marginBottom: '10px', 
          color: '#2c3e50', 
          fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-tape"></i> Waist-Hip Ratio Calculator - Body Fat Distribution Analysis Tool
        </h1>
        
        <p style={{ 
          marginBottom: '25px', 
          fontSize: 'clamp(0.95rem, 2vw, 1rem)', 
          color: '#666' 
        }}>
          Calculate your <strong>Waist-Hip Ratio (WHR)</strong> to assess <strong>body fat distribution patterns</strong> and <strong>metabolic health risks</strong>. Essential for identifying <strong>apple vs pear body shapes</strong> and understanding <strong>cardiovascular disease risk factors</strong>.
        </p>

        {/* Units Toggle */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            style={{
              padding: '8px 16px',
              background: currentUnit === 'metric' ? '#e74c3c' : '#f1f3f5',
              color: currentUnit === 'metric' ? 'white' : '#333',
              border: '2px solid #dfe6e9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: currentUnit === 'metric' ? '600' : '500',
              transition: 'all 0.3s'
            }}
            onClick={() => toggleUnits('metric')}
          >
            Metric (cm)
          </button>
          <button 
            style={{
              padding: '8px 16px',
              background: currentUnit === 'imperial' ? '#e74c3c' : '#f1f3f5',
              color: currentUnit === 'imperial' ? 'white' : '#333',
              border: '2px solid #dfe6e9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: currentUnit === 'imperial' ? '600' : '500',
              transition: 'all 0.3s'
            }}
            onClick={() => toggleUnits('imperial')}
          >
            Imperial (inches)
          </button>
        </div>

        {/* Measurement Guide */}
        <div style={{ 
          margin: '25px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px',
          borderLeft: '4px solid #3498db'
        }}>
          <h4 style={{ 
            marginBottom: '15px',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fas fa-info-circle"></i> Accurate Measurement Instructions
          </h4>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '15px' }}>
            <div style={{ 
              background: '#3498db',
              color: 'white',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              flexShrink: '0'
            }}>
              1
            </div>
            <div>
              <strong>Waist Measurement:</strong> Measure at the narrowest point between ribs and hips (or at navel level if no natural waist)
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ 
              background: '#3498db',
              color: 'white',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              flexShrink: '0'
            }}>
              2
            </div>
            <div>
              <strong>Hip Measurement:</strong> Measure at the widest point of buttocks, keeping tape parallel to floor
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-venus-mars"></i> Gender</label>
            <select 
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={selectStyle}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-horizontal"></i> {currentUnit === 'metric' ? 'Waist (cm)' : 'Waist (inches)'}</label>
            <input 
              type="number" 
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder={currentUnit === 'metric' ? '85' : '33.5'}
              min="50" 
              max="200" 
              step="0.1"
              style={inputStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user-circle"></i> {currentUnit === 'metric' ? 'Hip (cm)' : 'Hip (inches)'}</label>
            <input 
              type="number" 
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder={currentUnit === 'metric' ? '95' : '37.5'}
              min="60" 
              max="200" 
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateWHR}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Waist-Hip Ratio
        </button>

        {/* Results Display with Share/Download Buttons */}
        {results && (
          <div style={resultsContainerStyle}>
            {/* WHR Results Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#e74c3c' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-tape" style={{ color: '#e74c3c' }}></i> Waist-Hip Ratio Analysis
              </h4>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                margin: '15px 0',
                textAlign: 'center',
                color: results.color
              }}>
                {whrResult}
              </div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                textAlign: 'center',
                marginBottom: '15px',
                color: results.color
              }}>
                {category}
              </div>
              <div style={{ 
                padding: '15px',
                background: '#fdedec',
                borderRadius: '8px',
                margin: '20px 0',
                borderLeft: '4px solid #e74c3c'
              }}>
                <strong><i className="fas fa-exclamation-triangle"></i> Health Risk Assessment:</strong><br/>
                {riskLevel}
              </div>
            </div>

            {/* Measurements Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#3498db' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-ruler" style={{ color: '#3498db' }}></i> Measurement Details
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                margin: '20px 0'
              }}>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.waist} {results.measurements.unit === 'metric' ? 'cm' : 'in'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Waist</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.hip} {results.measurements.unit === 'metric' ? 'cm' : 'in'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Hip</div>
                </div>
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Formula:</strong> WHR = Waist ÷ Hip</p>
                <p><strong>Gender:</strong> {results.measurements.gender === 'male' ? 'Male' : 'Female'}</p>
                <p><strong>Unit System:</strong> {results.measurements.unit === 'metric' ? 'Metric (cm)' : 'Imperial (inches)'}</p>
              </div>
            </div>

            {/* Health Standards Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#2ecc71' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-clipboard-check" style={{ color: '#2ecc71' }}></i> Health Standards
              </h4>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>World Health Organization Standards:</strong></p>
                <p><strong>Men:</strong><br/>
                • Low Risk: WHR &lt; 0.90<br/>
                • Moderate Risk: 0.90 - 0.99<br/>
                • High Risk: WHR ≥ 1.00</p>
                <p><strong>Women:</strong><br/>
                • Low Risk: WHR &lt; 0.80<br/>
                • Moderate Risk: 0.80 - 0.84<br/>
                • High Risk: WHR ≥ 0.85</p>
              </div>
              <div style={{ 
                padding: '15px',
                background: '#e8f5e9',
                borderRadius: '8px',
                margin: '15px 0',
                borderLeft: '4px solid #2ecc71'
              }}>
                <strong><i className="fas fa-lightbulb"></i> Body Shape Classification:</strong><br/>
                {whrResult < (gender === 'male' ? 0.9 : 0.8) ? 'Pear Shape (Low Risk)' : 
                 whrResult < (gender === 'male' ? 1.0 : 0.85) ? 'Intermediate Shape' : 
                 'Apple Shape (High Risk)'}
              </div>
            </div>
          </div>
        )}

        {/* Share and Download Buttons */}
        {results && (
          <div style={actionButtonsStyle}>
            <div style={{ position: 'relative' }} className="share-button-container">
              <button
                style={shareButtonStyle}
                onClick={() => setShowShareMenu(!showShareMenu)}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2980b9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#3498db'}
              >
                <i className="fas fa-share-alt"></i> Share Results
              </button>
              
              {showShareMenu && (
                <div style={shareMenuStyle}>
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#4267B2', color: 'white' }}
                    onClick={() => shareResults('facebook')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-facebook-f"></i> Facebook
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#1DA1F2', color: 'white' }}
                    onClick={() => shareResults('twitter')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-twitter"></i> Twitter
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#0077B5', color: 'white' }}
                    onClick={() => shareResults('linkedin')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-linkedin-in"></i> LinkedIn
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#25D366', color: 'white' }}
                    onClick={() => shareResults('whatsapp')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-whatsapp"></i> WhatsApp
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#0088CC', color: 'white' }}
                    onClick={() => shareResults('telegram')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-telegram"></i> Telegram
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#FF4500', color: 'white' }}
                    onClick={() => shareResults('reddit')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-reddit-alien"></i> Reddit
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#E60023', color: 'white' }}
                    onClick={() => shareResults('pinterest')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-pinterest-p"></i> Pinterest
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#666', color: 'white' }}
                    onClick={() => shareResults('email')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fas fa-envelope"></i> Email
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}
                    onClick={() => shareResults('copy')}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                  >
                    <i className="fas fa-copy"></i> Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
            
            <button
              style={downloadButtonStyle}
              onClick={downloadHTML}
              onMouseEnter={(e) => e.currentTarget.style.background = '#c0392b'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#e74c3c'}
            >
              <i className="fas fa-file-code"></i> Download HTML Report
            </button>
          </div>
        )}

        {/* Body Shape Visualization */}
        <div style={{ 
          margin: '30px 0',
          padding: '20px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ 
            marginBottom: '15px',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-user-circle"></i> Body Shape Classification - Apple vs Pear
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
            Understanding your <strong>body shape classification</strong> helps assess <strong>health risks and appropriate fitness strategies</strong>:
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{ 
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              borderLeft: '4px solid #e74c3c'
            }}>
              <h5 style={{ color: '#e74c3c', marginBottom: '10px' }}>Apple Shape (High WHR)</h5>
              <ul style={{ fontSize: '0.9rem', color: '#555', paddingLeft: '15px' }}>
                <li>Fat accumulates in abdominal area</li>
                <li>Higher risk of metabolic diseases</li>
                <li>Common in men and postmenopausal women</li>
                <li>Focus on reducing visceral fat</li>
              </ul>
            </div>
            
            <div style={{ 
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              borderLeft: '4px solid #3498db'
            }}>
              <h5 style={{ color: '#3498db', marginBottom: '10px' }}>Pear Shape (Low WHR)</h5>
              <ul style={{ fontSize: '0.9rem', color: '#555', paddingLeft: '15px' }}>
                <li>Fat accumulates in hips and thighs</li>
                <li>Lower risk of metabolic diseases</li>
                <li>Common in premenopausal women</li>
                <li>Focus on overall fitness and strength</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Health Risk Comparison Table */}
        <div style={{ 
          margin: '30px 0',
          padding: '20px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ 
            marginBottom: '15px',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-heartbeat"></i> Health Risk Comparison - WHO Standards
          </h4>
          
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            marginTop: '20px', 
            fontSize: '0.95rem',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
          }}>
            <thead>
              <tr>
                <th style={{ 
                  padding: '15px', 
                  textAlign: 'left', 
                  backgroundColor: '#2c3e50', 
                  color: 'white', 
                  fontWeight: '600'
                }}>
                  Risk Level
                </th>
                <th style={{ 
                  padding: '15px', 
                  textAlign: 'left', 
                  backgroundColor: '#2c3e50', 
                  color: 'white', 
                  fontWeight: '600'
                }}>
                  Men (WHR)
                </th>
                <th style={{ 
                  padding: '15px', 
                  textAlign: 'left', 
                  backgroundColor: '#2c3e50', 
                  color: 'white', 
                  fontWeight: '600'
                }}>
                  Women (WHR)
                </th>
                <th style={{ 
                  padding: '15px', 
                  textAlign: 'left', 
                  backgroundColor: '#2c3e50', 
                  color: 'white', 
                  fontWeight: '600'
                }}>
                  Health Implications
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ color: '#2ecc71', fontWeight: 'bold', backgroundColor: '#e8f5e9' }}>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Low Risk</td>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>&lt; 0.90</td>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>&lt; 0.80</td>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Minimal metabolic disease risk, healthy fat distribution</td>
              </tr>
              <tr style={{ color: '#f39c12', fontWeight: 'bold', backgroundColor: '#fef5e7' }}>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Moderate Risk</td>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>0.90 - 0.99</td>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>0.80 - 0.84</td>
                <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Increased risk of cardiovascular disease, requires monitoring</td>
              </tr>
              <tr style={{ color: '#e74c3c', fontWeight: 'bold', backgroundColor: '#fdedec' }}>
                <td style={{ padding: '15px', textAlign: 'left' }}>High Risk</td>
                <td style={{ padding: '15px', textAlign: 'left' }}>≥ 1.00</td>
                <td style={{ padding: '15px', textAlign: 'left' }}>≥ 0.85</td>
                <td style={{ padding: '15px', textAlign: 'left' }}>Substantially increased risk of metabolic syndrome, diabetes, heart disease</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Enhanced SEO Content with 1000+ words */}
        <div style={{ 
          marginTop: '40px', 
          borderTop: '1px solid #eee', 
          paddingTop: '30px' 
        }}>
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-tape"></i> Comprehensive Waist-Hip Ratio Analysis: Understanding Body Fat Distribution and Metabolic Health Risks
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Waist-Hip Ratio (WHR) calculation methodology</strong> represents a <strong>critical anthropometric assessment tool</strong> for evaluating <strong>body fat distribution patterns</strong> and identifying <strong>metabolic health risk stratification</strong>. This <strong>simple yet powerful measurement technique</strong> provides superior <strong>cardiovascular disease prediction accuracy</strong> compared to traditional <strong>Body Mass Index (BMI) assessments</strong> by specifically quantifying <strong>abdominal adipose tissue accumulation</strong> - the <strong>most dangerous fat storage pattern</strong> associated with <strong>increased morbidity and mortality risks</strong>.
          </p>

          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            <i className="fas fa-calculator"></i> Scientific Foundation: Waist-Hip Ratio Formula and Clinical Validation Research
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            The <strong>WHR calculation formula (Waist ÷ Hip)</strong> represents a <strong>validated clinical measurement technique</strong> endorsed by the <strong>World Health Organization (WHO)</strong> and <strong>American Heart Association</strong> for <strong>metabolic syndrome screening</strong> and <strong>cardiovascular risk assessment</strong>. Extensive <strong>epidemiological research studies</strong> involving millions of participants demonstrate that <strong>each 0.1 unit increase in WHR</strong> correlates with approximately <strong>20-30% elevated risk</strong> for <strong>cardiovascular events, type 2 diabetes development, and premature mortality</strong>, independent of <strong>overall body weight or BMI classification</strong>.
          </p>
          
          <div style={{ 
            background: '#f1f3f5', 
            padding: '20px', 
            borderRadius: '10px', 
            fontFamily: "'Courier New', monospace", 
            textAlign: 'left', 
            margin: '20px 0', 
            fontSize: '0.95rem',
            borderLeft: '4px solid #e74c3c',
            overflowX: 'auto'
          }}>
            <strong>Waist-Hip Ratio Calculation and Clinical Standards:</strong><br/>
            <strong>Basic Formula:</strong> WHR = Waist Circumference ÷ Hip Circumference<br/><br/>
            <strong>World Health Organization Risk Classification:</strong><br/>
            • <strong>Men:</strong> Low Risk &lt;0.90 | Moderate Risk 0.90-0.99 | High Risk ≥1.00<br/>
            • <strong>Women:</strong> Low Risk &lt;0.80 | Moderate Risk 0.80-0.84 | High Risk ≥0.85<br/><br/>
            <strong>Clinical Significance:</strong> WHR ≥0.85 (women) or ≥1.0 (men) indicates abdominal obesity<br/>
            <strong>Predictive Value:</strong> WHR predicts cardiovascular risk better than BMI alone<br/>
            <strong>Population Studies:</strong> Based on 300,000+ participant data from 58 studies
          </div>

          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            <i className="fas fa-heartbeat"></i> Comprehensive Health Implications: Why Waist-Hip Ratio Matters More Than Overall Weight
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Understanding your <strong>Waist-Hip Ratio classification</strong> provides critical insights into <strong>specific health risk profiles</strong> that extend beyond <strong>simple weight assessment metrics</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Syndrome Identification:</strong> High WHR serves as a <strong>primary diagnostic criterion</strong> for <strong>metabolic syndrome detection</strong>, characterized by <strong>insulin resistance, dyslipidemia, hypertension, and pro-inflammatory state</strong> that collectively increase <strong>cardiovascular disease and diabetes risks</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Cardiovascular Disease Prediction:</strong> Abdominal obesity measured by <strong>elevated WHR values</strong> strongly predicts <strong>coronary artery disease, stroke incidence, and heart failure development</strong> due to <strong>visceral fat secretion of inflammatory cytokines, free fatty acids, and adipokines</strong> that directly damage <strong>vascular endothelial function</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Type 2 Diabetes Risk Assessment:</strong> Each <strong>0.1 unit increase in WHR</strong> corresponds to approximately <strong>60% higher diabetes risk</strong> in women and <strong>50% higher risk</strong> in men, as <strong>abdominal adiposity promotes insulin resistance</strong> through multiple <strong>hormonal and inflammatory pathways</strong></li>
            <li><strong>Cancer Risk Stratification:</strong> Elevated WHR demonstrates significant associations with <strong>increased risks for breast cancer, colorectal cancer, endometrial cancer, and pancreatic cancer</strong>, potentially mediated through <strong>hormonal alterations, chronic inflammation, and insulin-like growth factor disturbances</strong></li>
          </ul>
          
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            <i className="fas fa-balance-scale"></i> Comparative Analysis: WHR vs. Other Body Composition Assessment Methods
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While multiple <strong>body composition assessment techniques</strong> exist, <strong>Waist-Hip Ratio measurement</strong> offers unique <strong>clinical advantages and practical benefits</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>WHR vs. BMI:</strong> Unlike <strong>Body Mass Index</strong> which only assesses <strong>overall weight-height proportionality</strong>, WHR specifically evaluates <strong>fat distribution patterns</strong>, identifying <strong>normal-weight individuals with abdominal obesity</strong> (metabolically obese normal weight) who face <strong>elevated health risks despite normal BMI</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>WHR vs. Waist Circumference:</strong> While <strong>waist measurement alone</strong> provides valuable information, WHR offers <strong>superior predictive accuracy</strong> by accounting for <strong>body frame size and gluteofemoral fat deposition</strong>, which may have <strong>protective metabolic effects</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>WHR vs. Body Fat Percentage:</strong> WHR focuses specifically on <strong>regional fat distribution</strong> rather than <strong>total body fat quantity</strong>, making it particularly valuable for identifying <strong>high-risk fat accumulation patterns</strong> even in individuals with <strong>normal overall body fat percentages</strong></li>
            <li><strong>WHR vs. Advanced Imaging:</strong> While methods like <strong>DEXA scanning, CT, or MRI</strong> provide <strong>precise visceral fat quantification</strong>, WHR serves as an <strong>accessible, cost-effective screening tool</strong> with <strong>excellent correlation to imaging results</strong> for clinical risk assessment</li>
          </ul>
          
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            <i className="fas fa-chart-line"></i> Biological Mechanisms: Why Abdominal Fat Poses Greater Health Risks
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            The <strong>heightened health risks</strong> associated with <strong>elevated Waist-Hip Ratio</strong> result from fundamental <strong>biological differences between fat depots</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Visceral vs. Subcutaneous Fat:</strong> Abdominal obesity primarily involves <strong>visceral adipose tissue</strong> surrounding internal organs, which demonstrates <strong>higher metabolic activity, greater lipolytic rates, and increased inflammatory cytokine production</strong> compared to <strong>subcutaneous fat deposits</strong> in other body regions</li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Secretion Patterns:</strong> Visceral fat secretes <strong>adipokines including leptin, adiponectin, resistin, and inflammatory cytokines</strong> that directly influence <strong>insulin sensitivity, blood pressure regulation, lipid metabolism, and systemic inflammation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Portal Theory Mechanism:</strong> Fatty acids released from <strong>visceral adipose tissue</strong> enter the <strong>portal circulation</strong> and travel directly to the <strong>liver</strong>, promoting <strong>hepatic insulin resistance, increased very-low-density lipoprotein production, and dyslipidemia development</strong></li>
            <li><strong>Inflammatory Pathways:</strong> Abdominal adipocytes produce <strong>pro-inflammatory mediators (TNF-α, IL-6, CRP)</strong> that contribute to <strong>chronic low-grade inflammation</strong>, a key factor in <strong>atherosclerosis progression, endothelial dysfunction, and metabolic disorder development</strong></li>
          </ul>

          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            <i className="fas fa-utensils"></i> Evidence-Based Strategies for Improving Waist-Hip Ratio and Reducing Health Risks
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Individuals with <strong>elevated Waist-Hip Ratio values</strong> can implement <strong>comprehensive lifestyle interventions</strong> to improve their <strong>body composition and metabolic health</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Targeted Exercise Programming:</strong> Combine <strong>moderate-intensity aerobic exercise (150-300 minutes weekly)</strong> with <strong>resistance training (2-3 sessions weekly)</strong> to simultaneously <strong>reduce abdominal fat</strong> and <strong>increase gluteal/leg muscle mass</strong>, directly improving WHR through <strong>dual mechanisms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Optimization:</strong> Emphasize <strong>high-fiber foods, lean proteins, healthy fats</strong> while reducing <strong>refined carbohydrates, added sugars, and processed foods</strong>. Specific strategies include <strong>increasing soluble fiber intake, consuming adequate protein, and incorporating anti-inflammatory foods</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Stress Management Implementation:</strong> Chronic stress elevates <strong>cortisol production</strong>, which promotes <strong>visceral fat accumulation</strong> through <strong>increased appetite, enhanced fat cell differentiation, and insulin resistance development</strong>. Implement <strong>stress reduction techniques including meditation, yoga, and adequate sleep</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Sleep Quality Enhancement:</strong> Obtain <strong>7-9 hours of quality sleep nightly</strong> to regulate <strong>appetite hormones (leptin and ghrelin), cortisol patterns, and growth hormone release</strong>—all factors influencing <strong>abdominal fat accumulation and WHR values</strong></li>
            <li><strong>Behavioral Modification Approaches:</strong> Implement <strong>mindful eating practices, portion control strategies, and regular meal timing</strong> to support <strong>sustainable weight management</strong> and <strong>abdominal fat reduction</strong> without extreme dietary restrictions</li>
          </ul>

          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            <i className="fas fa-exclamation-triangle"></i> Clinical Applications and Population-Specific Considerations for Waist-Hip Ratio Interpretation
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Healthcare professionals utilize <strong>Waist-Hip Ratio assessment</strong> across diverse <strong>clinical contexts and population subgroups</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Cardiovascular Risk Screening:</strong> WHR serves as a <strong>primary screening tool</strong> in <strong>primary care settings</strong> for identifying patients requiring <strong>comprehensive cardiovascular risk assessment, lipid profile testing, and blood pressure monitoring</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Diabetes Prevention Programs:</strong> Individuals with <strong>elevated WHR values</strong> represent <strong>high-priority candidates</strong> for <strong>diabetes prevention interventions</strong> including <strong>lifestyle modification programs, weight management support, and regular glucose monitoring</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Women's Health Considerations:</strong> Postmenopausal women experience <strong>natural shifts toward abdominal fat accumulation</strong> due to <strong>hormonal changes</strong>, making <strong>regular WHR monitoring</strong> particularly important for <strong>cardiovascular risk assessment during menopause transition</strong></li>
            <li><strong>Ethnic and Racial Variations:</strong> Different ethnic populations demonstrate <strong>varying body fat distribution patterns</strong> and may require <strong>population-specific WHR cut-off points</strong> for accurate <strong>health risk classification</strong>. South Asian populations, for example, show <strong>increased metabolic risks at lower WHR values</strong> compared to European populations</li>
          </ul>

          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            <i className="fas fa-clipboard-check"></i> Long-Term Health Monitoring and Preventive Strategies Using Waist-Hip Ratio Tracking
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Regular <strong>Waist-Hip Ratio monitoring</strong> provides valuable <strong>long-term health tracking data</strong> for <strong>preventive healthcare planning</strong> and <strong>lifestyle intervention evaluation</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Progress Tracking Methodology:</strong> Measure WHR <strong>every 4-8 weeks</strong> during active weight management phases, using <strong>consistent measurement techniques and timing</strong> to ensure <strong>accurate trend analysis and intervention effectiveness evaluation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Integrated Health Assessment:</strong> Combine WHR tracking with <strong>complementary health metrics</strong> including <strong>blood pressure measurements, lipid profiles, fasting glucose levels, and inflammatory markers</strong> for <strong>comprehensive metabolic health evaluation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Preventive Healthcare Planning:</strong> Use WHR trends to inform <strong>personalized preventive strategies</strong> including <strong>dietary adjustments, exercise programming, stress management approaches, and sleep optimization protocols</strong> tailored to individual <strong>risk profiles and lifestyle factors</strong></li>
            <li><strong>Clinical Decision Support:</strong> Healthcare providers utilize <strong>WHR assessment data</strong> to guide <strong>clinical decision-making</strong> regarding <strong>medication initiation, specialist referrals, diagnostic testing frequency, and follow-up scheduling</strong> for patients with <strong>elevated cardiovascular and metabolic risks</strong></li>
          </ul>
        </div>

        {/* Q&A Section */}
        <div style={{ 
          margin: '40px 0',
          padding: '30px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            color: '#2c3e50',
            marginBottom: '25px',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-question-circle"></i> Frequently Asked Questions About Waist-Hip Ratio
          </h2>
          {faqs.map((faq, index) => (
            <div key={index} style={{ 
              marginBottom: '15px',
              border: '1px solid #dfe6e9',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  padding: '20px',
                  background: activeFAQ === index ? '#e9ecef' : '#f8f9fa',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: '600',
                  color: '#2c3e50',
                  transition: 'background 0.3s'
                }}
                onClick={() => toggleFAQ(index)}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = activeFAQ === index ? '#e9ecef' : '#f8f9fa';
                }}
              >
                {faq.question}
                <i className={`fas fa-chevron-${activeFAQ === index ? 'up' : 'down'}`}></i>
              </div>
              <div style={{
                padding: activeFAQ === index ? '20px' : '0 20px',
                maxHeight: activeFAQ === index ? '500px' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                background: 'white'
              }}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Medical Disclaimer */}
        <div style={{ 
          margin: '40px 0',
          padding: '25px',
          background: '#f8d7da',
          borderRadius: '10px',
          borderLeft: '5px solid #721c24',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <h4 style={{ 
            color: '#721c24',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer
          </h4>
          <p style={{ marginBottom: '10px' }}>
            <strong>This Waist-Hip Ratio calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard medical formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Measurement Limitations Warning:</strong> WHR calculations depend on accurate measurement techniques. Individual variations in body shape, muscle distribution, medical conditions, and other factors can affect WHR interpretation. Always measure under consistent conditions for accurate comparisons.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, or other qualified healthcare provider with any questions regarding body composition, metabolic health, or cardiovascular risk assessment. Do not make significant health decisions based solely on WHR calculations.
          </p>
          <p>
            <strong>Comprehensive Health Assessment:</strong> WHR is one component of comprehensive health evaluation. Complete assessment should include medical history review, physical examination, laboratory testing, and consideration of individual health factors beyond body measurements.
          </p>
        </div>
      </section>

      {/* Sidebar with Ads and Calculator Links */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Body composition analysis device</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Customized workout programs</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Heart health monitoring program</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px sticky ad</p>
            </div>
            
            {/* Related Calculators Sidebar Section - Sorted by SEO Relevance */}
            <div style={{ 
              padding: '20px', 
              background: 'white', 
              borderRadius: '10px', 
              boxShadow: '0 3px 10px rgba(0,0,0,0.05)' 
            }}>
              <h4 style={{ 
                marginBottom: '15px', 
                color: '#2c3e50', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <i className="fas fa-calculator"></i> Related Health Calculators
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                Explore our comprehensive collection sorted by relevance:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sortedCalculators.map((calculator, index) => (
                  <a
                    key={index}
                    href={calculator.link}
                    style={{
                      padding: '12px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#2c3e50',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e74c3c';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(231, 76, 60, 0.2)';
                      e.currentTarget.style.borderColor = '#e74c3c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8f9fa';
                      e.currentTarget.style.color = '#2c3e50';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-calculator"></i> {calculator.name}
                    <span style={{ 
                      marginLeft: 'auto',
                      fontSize: '0.7rem',
                      background: calculator.relevance >= 9 ? '#e74c3c' : calculator.relevance >= 8 ? '#3498db' : calculator.relevance >= 7 ? '#f39c12' : '#2ecc71',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {calculator.relevance}/10
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}