"use client";

import { useState, useEffect } from 'react';

export default function BMRPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmrResult, setBmrResult] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [tdeeResult, setTdeeResult] = useState(null);
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
    background: '#9b59b6',
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
    background: '#9b59b6',
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
    background: '#8e44ad',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(155, 89, 182, 0.2)'
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
    background: '#f5f0ff',
    border: '2px solid #9b59b6',
    boxShadow: '0 4px 12px rgba(155, 89, 182, 0.15)',
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
    setAge('30');
    setWeight('70');
    setHeight('175');
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
    setBmrResult(null);
    setSelectedActivity(null);
    setTdeeResult(null);
    setResults(null);
  };

  const calculateBMR = () => {
    const ageVal = parseFloat(age);
    let weightVal = parseFloat(weight);
    let heightVal = parseFloat(height);
    
    if (!ageVal || !weightVal || !heightVal || ageVal <= 0 || weightVal <= 0 || heightVal <= 0) {
      alert('Please fill in all fields with valid numbers.');
      return;
    }
    
    // Convert imperial to metric if needed
    if (currentUnit === 'imperial') {
      weightVal = weightVal * 0.453592;
      heightVal = heightVal * 2.54;
    }
    
    let bmr;
    
    if (gender === 'male') {
      bmr = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) + 5;
    } else {
      bmr = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) - 161;
    }
    
    const roundedBMR = Math.round(bmr);
    setBmrResult(roundedBMR);
    setSelectedActivity(null);
    setTdeeResult(null);
    setShowShareMenu(false);
    
    // Store results for sharing/downloading
    setResults({
      bmr: roundedBMR,
      tdee: null,
      measurements: {
        age: ageVal,
        weight: parseFloat(weight),
        height: parseFloat(height),
        unit: currentUnit,
        gender: gender
      },
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
  };
  
  const selectActivity = (multiplier, name) => {
    setSelectedActivity({ multiplier, name });
    const tdee = Math.round(bmrResult * multiplier);
    setTdeeResult(tdee);
    
    // Update results with TDEE
    setResults(prev => ({
      ...prev,
      tdee: tdee,
      activity: { multiplier, name }
    }));
  };

  const activityLevels = [
    { multiplier: 1.2, name: 'Sedentary', desc: 'Little or no exercise' },
    { multiplier: 1.375, name: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { multiplier: 1.55, name: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { multiplier: 1.725, name: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    { multiplier: 1.9, name: 'Extra Active', desc: 'Very hard exercise & physical job' }
  ];

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate BMR first before sharing.');
      return;
    }

    const shareText = `My Basal Metabolic Rate is ${results.bmr} calories/day - Calculate yours using this advanced BMR calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'BMR,Metabolism,Health,Fitness';

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
        shareUrlFull = `mailto:?subject=My BMR Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My BMR Results',
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
      alert('Please calculate BMR first before downloading.');
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
    <title>BMR Calculator Results</title>
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
            border-bottom: 3px solid #9b59b6;
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
        
        .bmr-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: #9b59b6;
        }
        
        .tdee-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: #3498db;
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
            background: #f5f0ff;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #9b59b6;
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
            <h1><i class="fas fa-bed"></i> BMR Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- BMR Results Card -->
            <div class="result-card" style="border-top-color: #9b59b6;">
                <h3 class="card-title"><i class="fas fa-fire" style="color: #9b59b6;"></i> Basal Metabolic Rate Results</h3>
                <div class="bmr-value">${results.bmr} calories/day</div>
                <div class="health-tip">
                    <strong><i class="fas fa-info-circle"></i> What This Means:</strong><br>
                    This is the number of calories your body needs at complete rest for basic physiological functions like breathing, circulation, and cell production.
                </div>
            </div>
            
            <!-- TDEE Results Card -->
            ${results.tdee ? `
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-running" style="color: #3498db;"></i> Total Daily Energy Expenditure</h3>
                <div class="tdee-value">${results.tdee} calories/day</div>
                <div class="health-tip">
                    <strong><i class="fas fa-info-circle"></i> Activity Level:</strong> ${results.activity.name} (×${results.activity.multiplier})<br>
                    <strong>Daily Calorie Needs:</strong> This is your estimated total daily calorie expenditure including physical activity.
                </div>
            </div>
            ` : ''}
            
            <!-- Measurements Card -->
            <div class="result-card" style="border-top-color: #2ecc71;">
                <h3 class="card-title"><i class="fas fa-user" style="color: #2ecc71;"></i> Personal Information</h3>
                <div class="measurement-grid">
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.age} years</div>
                        <div class="measurement-label">Age</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.weight} ${results.measurements.unit === 'metric' ? 'kg' : 'lbs'}</div>
                        <div class="measurement-label">Weight</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.height} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}</div>
                        <div class="measurement-label">Height</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.gender === 'male' ? 'Male' : 'Female'}</div>
                        <div class="measurement-label">Gender</div>
                    </div>
                </div>
                <div class="info-box">
                    <p><strong>Calculation Method:</strong> Mifflin-St Jeor Equation</p>
                    <p><strong>Unit System:</strong> ${results.measurements.unit === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lbs/in)'}</p>
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This BMR calculation is for informational purposes only. The Mifflin-St Jeor equation provides an estimate that may vary by ±10% from measured metabolic rates. These calculations should be interpreted as estimates and not as medical advice. Always consult with healthcare professionals for personalized health and nutrition guidance.</p>
        </div>
        
        <div class="footer">
            <p>Generated by BMR Calculator • ${window.location.href}</p>
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
    a.download = `bmr-results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateBMR();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [age, weight, height, gender, currentUnit]);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between BMR and RMR?",
      answer: "BMR (Basal Metabolic Rate) is measured under strict conditions: after 8 hours of sleep, 12 hours of fasting, and in a thermoneutral environment. RMR (Resting Metabolic Rate) is measured under less strict conditions and is typically about 10% higher than BMR. For practical purposes, most calculators (including this one) use RMR equations but call them BMR."
    },
    {
      question: "How accurate is the Mifflin-St Jeor equation?",
      answer: "The Mifflin-St Jeor equation is currently considered the most accurate for predicting BMR in healthy individuals, with an accuracy of about ±10% for most people. It's more accurate than older equations like Harris-Benedict, especially for obese individuals. However, accuracy can vary based on body composition, age, and other factors."
    },
    {
      question: "Why does my BMR decrease as I age?",
      answer: "BMR decreases by about 1-2% per decade after age 20 due to several factors: loss of muscle mass (sarcopenia), hormonal changes, decreased organ mass, and reduced cellular metabolic activity. This is why weight management often becomes more challenging with age unless activity levels increase or calorie intake decreases."
    },
    {
      question: "Can I increase my BMR?",
      answer: "Yes, you can increase your BMR through several methods: 1) Build muscle through resistance training (muscle burns more calories than fat), 2) Stay hydrated, 3) Eat enough protein (has highest thermic effect), 4) Get quality sleep, 5) Manage stress, and 6) Consider high-intensity interval training. However, genetic factors limit how much you can change your BMR."
    },
    {
      question: "How often should I recalculate my BMR?",
      answer: "Recalculate your BMR whenever your weight changes by 5-10 pounds, or every 3-6 months for general tracking. Significant changes in muscle mass, age milestones, or lifestyle changes also warrant recalculation. For weight loss programs, recalculate every 4-8 weeks as your body composition changes."
    },
    {
      question: "Why is my TDEE different from my BMR?",
      answer: "TDEE (Total Daily Energy Expenditure) includes all calorie-burning activities: BMR (60-75%), physical activity (15-30%), and thermic effect of food (10%). TDEE = BMR × Activity Multiplier. The activity multiplier accounts for exercise and daily movement, which is why TDEE is always higher than BMR unless you're completely bedridden."
    }
  ];

  // Health calculators sorted by SEO relevance (BMR-related first)
  const healthCalculators = [
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 10 },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 10 },
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 9 },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 9 },
    { name: "LBM Calculator", link: "/lbm-calculator", relevance: 9 },
    { name: "Nutritional Needs Calculator", link: "/nutritional-needs", relevance: 8 },
    { name: "Carbohydrate Intake Calculator", link: "/carbohydrate-intake-calculator", relevance: 8 },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator", relevance: 8 },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator", relevance: 7 },
    { name: "Waist Hip Ratio", link: "/waist-hip-ratio", relevance: 7 },
    { name: "BSA Calculator", link: "/bsa-calculator", relevance: 7 },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 6 },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 6 },
    { name: "Blood Pressure Calculator", link: "/blood-pressure-category-calculator", relevance: 6 },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 5 },
    { name: "Heart Disease Risk Calculator", link: "/heart-disease-risk-calculator", relevance: 5 },
    { name: "Ovulation Tracker", link: "/ovulation-tracker", relevance: 4 },
    { name: "Pregnancy Due Date Calculator", link: "/pregnancy-due-date-calculator", relevance: 4 },
    { name: "Pregnancy Weight Gain Calculator", link: "/pregnancy-weight-gain-calculator", relevance: 4 },
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator", relevance: 4 },
    { name: "Safe Period Calculator", link: "/safe-period-calculator", relevance: 4 },
    { name: "Period Cycle Calculator", link: "/period-cycle-calculator", relevance: 4 },
    { name: "GFR Calculator", link: "/gfr-calculator", relevance: 3 },
    { name: "Creatinine Clearance", link: "/creatinine-clearance", relevance: 3 },
    { name: "Fluid Requirement Calculator", link: "/fluid-requirement", relevance: 3 },
    { name: "Medication Dosage Calculator", link: "/medication-dosage", relevance: 3 },
    { name: "Electrolyte Correction Calculator", link: "/electrolyte-correction", relevance: 3 },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator", relevance: 3 },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator", relevance: 3 },
    { name: "Pregnancy Test Calculator", link: "/pregnancy-test", relevance: 2 },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker", relevance: 2 }
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
          <i className="fas fa-bed"></i> Basal Metabolic Rate (BMR) Calculator - Advanced Metabolic Analysis Tool
        </h1>
        
        <p style={{ 
          marginBottom: '25px', 
          fontSize: 'clamp(0.95rem, 2vw, 1rem)', 
          color: '#666' 
        }}>
          Calculate your <strong>precise Basal Metabolic Rate (BMR)</strong> using the validated <strong>Mifflin-St Jeor equation</strong> for accurate <strong>resting energy expenditure estimation</strong>. Essential for <strong>weight management planning, personalized nutrition strategies, and metabolic health assessment</strong>.
        </p>

        {/* Units Toggle */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            style={{
              padding: '8px 16px',
              background: currentUnit === 'metric' ? '#9b59b6' : '#f1f3f5',
              color: currentUnit === 'metric' ? 'white' : '#333',
              border: '2px solid #dfe6e9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: currentUnit === 'metric' ? '600' : '500',
              transition: 'all 0.3s'
            }}
            onClick={() => toggleUnits('metric')}
          >
            Metric (kg/cm)
          </button>
          <button 
            style={{
              padding: '8px 16px',
              background: currentUnit === 'imperial' ? '#9b59b6' : '#f1f3f5',
              color: currentUnit === 'imperial' ? 'white' : '#333',
              border: '2px solid #dfe6e9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: currentUnit === 'imperial' ? '600' : '500',
              transition: 'all 0.3s'
            }}
            onClick={() => toggleUnits('imperial')}
          >
            Imperial (lbs/in)
          </button>
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
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-birthday-cake"></i> Age</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25" 
              min="15" 
              max="100"
              style={inputStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> {currentUnit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={currentUnit === 'metric' ? '70' : '154'}
              min="30" 
              max="300" 
              step="0.1"
              style={inputStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> {currentUnit === 'metric' ? 'Height (cm)' : 'Height (in)'}</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={currentUnit === 'metric' ? '175' : '69'}
              min="100" 
              max="250" 
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateBMR}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Basal Metabolic Rate
        </button>

        {/* Results Display with Share/Download Buttons */}
        {results && (
          <div style={resultsContainerStyle}>
            {/* BMR Results Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#9b59b6' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-fire" style={{ color: '#9b59b6' }}></i> Basal Metabolic Rate Results
              </h4>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                margin: '15px 0',
                textAlign: 'center',
                color: '#9b59b6'
              }}>
                {bmrResult?.toLocaleString()} calories/day
              </div>
              <div style={{ 
                padding: '15px',
                background: '#f5f0ff',
                borderRadius: '8px',
                margin: '20px 0',
                borderLeft: '4px solid #9b59b6'
              }}>
                <strong><i className="fas fa-info-circle"></i> What This Means:</strong><br/>
                This is the number of calories your body needs at complete rest for basic physiological functions like breathing, circulation, and cell production.
              </div>
            </div>

            {/* Measurements Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#2ecc71' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-user" style={{ color: '#2ecc71' }}></i> Personal Information
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                margin: '20px 0'
              }}>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.age} years
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Age</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.weight} {results.measurements.unit === 'metric' ? 'kg' : 'lbs'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Weight</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.height} {results.measurements.unit === 'metric' ? 'cm' : 'in'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Height</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.gender === 'male' ? 'Male' : 'Female'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Gender</div>
                </div>
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Calculation Method:</strong> Mifflin-St Jeor Equation</p>
                <p><strong>Unit System:</strong> {results.measurements.unit === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lbs/in)'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Activity Level Selection */}
        {bmrResult && (
          <div style={{ 
            margin: '30px 0',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '10px',
            display: 'block'
          }}>
            <h4 style={{ 
              color: '#2c3e50',
              marginBottom: '15px',
              fontSize: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-running"></i> Activity Level Adjustment - Calculate Your TDEE
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '15px', color: '#666' }}>
              Select your activity level to estimate your <strong>Total Daily Energy Expenditure (TDEE)</strong> for <strong>weight maintenance calorie calculation</strong>:
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginTop: '15px'
            }}>
              {activityLevels.map((activity) => (
                <div 
                  key={activity.multiplier}
                  style={{
                    background: selectedActivity?.multiplier === activity.multiplier ? '#f5f0ff' : 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    border: `2px solid ${selectedActivity?.multiplier === activity.multiplier ? '#9b59b6' : '#e0e0e0'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => selectActivity(activity.multiplier, activity.name)}
                  onMouseEnter={(e) => {
                    if (selectedActivity?.multiplier !== activity.multiplier) {
                      e.currentTarget.style.borderColor = '#9b59b6';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedActivity?.multiplier !== activity.multiplier) {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.transform = 'none';
                    }
                  }}
                >
                  <h4 style={{ marginBottom: '5px' }}>{activity.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>{activity.desc}</p>
                  <p style={{ fontWeight: 'bold', color: '#9b59b6', marginTop: '5px' }}>× {activity.multiplier}</p>
                </div>
              ))}
            </div>
            
            {/* TDEE Results */}
            {tdeeResult && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                borderLeft: '4px solid #3498db'
              }}>
                <h4>Daily Calorie Needs for Weight Maintenance</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db', margin: '10px 0' }}>
                  {tdeeResult?.toLocaleString()} calories/day
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Total Daily Energy Expenditure (TDEE) - <strong>Your weight maintenance calories</strong><br/>
                  Activity Level: {selectedActivity.name} (×{selectedActivity.multiplier})
                </p>
              </div>
            )}
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
              onMouseEnter={(e) => e.currentTarget.style.background = '#8e44ad'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#9b59b6'}
            >
              <i className="fas fa-file-code"></i> Download HTML Report
            </button>
          </div>
        )}

        {/* Energy Expenditure Comparison */}
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
            <i className="fas fa-chart-bar"></i> Daily Energy Expenditure Breakdown
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
            Understanding your <strong>calorie expenditure distribution</strong> is crucial for <strong>effective weight management strategies</strong>:
          </p>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Basal Metabolic Rate (BMR) - Resting Energy Expenditure</span>
              <span>60-75%</span>
            </div>
            <div style={{
              height: '30px',
              background: '#ecf0f1',
              borderRadius: '15px',
              margin: '5px 0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #9b59b6, #8e44ad)',
                borderRadius: '15px',
                width: '70%',
                transition: 'width 1s ease'
              }}></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Physical Activity - Exercise & Non-Exercise Activity Thermogenesis</span>
              <span>15-30%</span>
            </div>
            <div style={{
              height: '30px',
              background: '#ecf0f1',
              borderRadius: '15px',
              margin: '5px 0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3498db, #2980b9)',
                borderRadius: '15px',
                width: '25%',
                transition: 'width 1s ease'
              }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Thermic Effect of Food - Diet-Induced Thermogenesis</span>
              <span>10%</span>
            </div>
            <div style={{
              height: '30px',
              background: '#ecf0f1',
              borderRadius: '15px',
              margin: '5px 0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
                borderRadius: '15px',
                width: '10%',
                transition: 'width 1s ease'
              }}></div>
            </div>
          </div>
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
            <i className="fas fa-question-circle"></i> Comprehensive Guide to Basal Metabolic Rate (BMR) - Understanding Your Body's Energy Requirements
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Basal Metabolic Rate (BMR)</strong> represents the <strong>fundamental energy expenditure measurement</strong> that quantifies the <strong>minimum calorie requirement</strong> for maintaining <strong>essential physiological functions</strong> during complete physical and digestive rest. This <strong>critical metabolic parameter</strong> accounts for approximately <strong>60-75% of total daily energy expenditure (TDEE)</strong> in most individuals, serving as the <strong>foundational component for personalized nutrition planning, weight management strategies, and metabolic health assessment protocols</strong>. Understanding your <strong>precise BMR calculation</strong> enables <strong>evidence-based dietary decisions, optimal calorie intake determination, and effective body composition manipulation</strong> for achieving <strong>specific health and fitness objectives</strong>.
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
            <i className="fas fa-calculator"></i> Advanced BMR Calculation Methodology: Mifflin-St Jeor Equation Scientific Validation and Accuracy Assessment
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Our <strong>advanced metabolic calculator</strong> employs the <strong>validated Mifflin-St Jeor equation</strong>, recognized by the <strong>American Dietetic Association</strong> as the <strong>most accurate BMR prediction formula</strong> for contemporary populations. This <strong>evidence-based metabolic calculation methodology</strong> was developed through <strong>comprehensive research involving diverse demographic groups</strong> and demonstrates <strong>superior predictive accuracy compared to older equations</strong> like the Harris-Benedict formula, particularly for <strong>overweight and obese individuals</strong>. The <strong>Mifflin-St Jeor equation accuracy</strong> typically ranges within <strong>±10% of measured metabolic rates</strong> in clinical validation studies, making it the <strong>preferred choice for healthcare professionals, nutritionists, and fitness experts</strong> worldwide.
          </p>
          
          <div style={{ 
            background: '#f1f3f5', 
            padding: '20px', 
            borderRadius: '10px', 
            fontFamily: "'Courier New', monospace", 
            textAlign: 'left', 
            margin: '20px 0', 
            fontSize: '0.95rem',
            borderLeft: '4px solid #9b59b6',
            overflowX: 'auto'
          }}>
            <strong>Mifflin-St Jeor Equation - Validated BMR Prediction Formulas:</strong><br/>
            <strong>For Adult Males (Age 18-80):</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5<br/><br/>
            <strong>For Adult Females (Age 18-80):</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161<br/><br/>
            <strong>Scientific Validation:</strong> Developed from 498 healthy subjects (247 male, 251 female)<br/>
            <strong>Accuracy Range:</strong> ±10% compared to indirect calorimetry measurements<br/>
            <strong>Population Specificity:</strong> Superior accuracy for overweight/obese individuals<br/>
            <strong>Clinical Application:</strong> ADA recommended for clinical nutrition assessment
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
            <i className="fas fa-heartbeat"></i> Critical Importance of BMR Calculation for Weight Management and Metabolic Health Optimization
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Accurate <strong>BMR determination serves multiple essential functions</strong> in comprehensive <strong>health optimization and disease prevention strategies</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Precision Weight Loss Programming:</strong> Enables creation of <strong>scientifically validated calorie deficit calculations</strong> that promote <strong>sustainable adipose tissue reduction</strong> while minimizing <strong>lean muscle mass catabolism, metabolic adaptation complications, and weight loss plateau development</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Optimized Muscle Gain Protocols:</strong> Facilitates determination of <strong>appropriate calorie surplus ranges</strong> for supporting <strong>lean tissue hypertrophy, strength development, and athletic performance enhancement</strong> without excessive fat accumulation</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Health Assessment:</strong> Provides <strong>baseline metabolic rate quantification</strong> for identifying potential <strong>thyroid dysfunction indicators, metabolic syndrome markers, and age-related metabolic decline patterns</strong> requiring medical evaluation</li>
            <li style={{ marginBottom: '10px' }}><strong>Personalized Nutrition Strategy Development:</strong> Establishes <strong>individualized daily calorie intake targets</strong> for creating <strong>tailored dietary plans, macronutrient distribution optimization, and meal timing strategies</strong> aligned with specific health objectives</li>
            <li><strong>Clinical Weight Management Support:</strong> Assists <strong>healthcare professionals</strong> in developing <strong>evidence-based intervention protocols</strong> for <strong>bariatric surgery candidates, obesity treatment patients, and metabolic disorder management</strong></li>
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
            <i className="fas fa-balance-scale"></i> Comprehensive Analysis of BMR Versus TDEE: Understanding Total Daily Energy Expenditure Components
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While <strong>BMR quantifies resting energy requirements</strong>, <strong>Total Daily Energy Expenditure (TDEE)</strong> represents the <strong>complete daily calorie burn</strong> encompassing <strong>multiple energy expenditure components</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Basal Metabolic Rate (60-75%):</strong> Calories expended for <strong>fundamental physiological maintenance processes</strong> including <strong>cellular metabolism, organ function, breathing, circulation, and body temperature regulation</strong> during complete rest</li>
            <li style={{ marginBottom: '10px' }}><strong>Non-Exercise Activity Thermogenesis (15-30%):</strong> Energy burned through <strong>daily spontaneous movements</strong> including <strong>postural maintenance, fidgeting, walking, standing, and occupational activities</strong> not classified as structured exercise</li>
            <li style={{ marginBottom: '10px' }}><strong>Exercise Activity Thermogenesis (Variable):</strong> Calories expended during <strong>planned physical activities</strong> including <strong>aerobic training, resistance exercise, sports participation, and structured workout sessions</strong></li>
            <li><strong>Thermic Effect of Food (10%):</strong> Energy required for <strong>food digestion, nutrient absorption, metabolic processing, and storage</strong>, varying based on <strong>macronutrient composition, meal frequency, and individual metabolic efficiency</strong></li>
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
            <i className="fas fa-chart-line"></i> Comprehensive Analysis of Factors Influencing Basal Metabolic Rate and Energy Expenditure Patterns
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Your <strong>individual metabolic rate characteristics</strong> result from complex interactions between <strong>multiple physiological, genetic, and environmental determinants</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Body Composition Impact Analysis:</strong> <strong>Lean muscle tissue demonstrates higher metabolic activity</strong> compared to adipose tissue, with each pound of muscle burning approximately <strong>6-10 calories daily at rest</strong> versus <strong>2-3 calories per pound of fat</strong>. This explains why individuals with greater <strong>muscle mass proportion</strong> typically exhibit <strong>elevated basal metabolic rates</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Metabolic Decline Patterns:</strong> Metabolic rate typically decreases <strong>1-2% per decade</strong> after age 20 due to <strong>sarcopenia (muscle loss), hormonal alterations, organ mass reduction, and decreased cellular metabolic efficiency</strong>. This natural decline necessitates <strong>progressive calorie intake adjustments</strong> for weight maintenance</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Metabolic Variability Factors:</strong> Inherited genetic polymorphisms influence <strong>individual metabolic efficiency, mitochondrial density, hormone receptor sensitivity, and neurotransmitter activity</strong>, creating <strong>interpersonal metabolic rate variations</strong> of up to <strong>20-30% among individuals with similar body compositions</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Regulation Mechanisms:</strong> Thyroid hormones (T3/T4) serve as <strong>primary metabolic rate regulators</strong>, with <strong>hypothyroidism reducing BMR by 15-40%</strong> and <strong>hyperthyroidism increasing BMR by 50-100%</strong>. Additional hormonal influences include <strong>cortisol, estrogen, testosterone, growth hormone, and insulin sensitivity patterns</strong></li>
            <li><strong>Environmental and Behavioral Influences:</strong> Factors including <strong>ambient temperature extremes, altitude exposure, sleep quality, stress levels, and dietary patterns</strong> can temporarily or chronically alter <strong>energy expenditure characteristics and metabolic rate calculations</strong></li>
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
            <i className="fas fa-utensils"></i> Practical Application Strategies: Implementing BMR Calculations for Evidence-Based Health Optimization
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Effectively applying your <strong>BMR calculation results</strong> enables development of <strong>comprehensive, science-based health strategies</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Precision Weight Loss Calculation Protocol:</strong> Subtract <strong>500-750 calories from your calculated TDEE</strong> to establish a <strong>sustainable calorie deficit</strong> promoting <strong>1-1.5 pounds of weekly fat loss</strong> while minimizing <strong>metabolic adaptation and muscle catabolism risks</strong>. This approach supports <strong>long-term weight maintenance success</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Optimized Muscle Building Strategy:</strong> Add <strong>250-500 calories to your TDEE</strong> to create a <strong>moderate calorie surplus</strong> supporting <strong>maximal lean tissue accretion, strength development, and performance enhancement</strong> while limiting <strong>excessive adipose tissue accumulation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Reset Implementation:</strong> Temporarily consume calories at or slightly above your <strong>calculated BMR level</strong> for <strong>2-4 weeks</strong> to address <strong>metabolic adaptation issues, hormonal imbalance correction, and metabolic damage repair</strong> following extended calorie restriction periods</li>
            <li style={{ marginBottom: '10px' }}><strong>Strategic Macronutrient Distribution Planning:</strong> Allocate <strong>protein (1.6-2.2g/kg), carbohydrates (3-7g/kg), and fats (0.8-1.2g/kg)</strong> based on <strong>total energy requirements, activity levels, and specific health objectives</strong> for <strong>optimal body composition outcomes</strong></li>
            <li><strong>Reverse Dieting Protocol Execution:</strong> Gradually increase calorie intake from <strong>BMR level to calculated TDEE</strong> over <strong>8-16 weeks</strong> to facilitate <strong>metabolic rate restoration, hormonal balance recovery, and sustainable weight maintenance</strong> following significant weight loss phases</li>
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
            <i className="fas fa-exclamation-triangle"></i> Comprehensive Understanding of Metabolic Adaptation and Weight Loss Plateaus
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            During weight loss, <strong>multiple physiological adaptations</strong> naturally decrease your <strong>metabolic rate and energy expenditure</strong>, explaining <strong>weight loss plateau development</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Reduced Body Mass Impact:</strong> Smaller bodies require <strong>fewer maintenance calories</strong> for basic physiological functions, with each <strong>10% reduction in body weight</strong> decreasing <strong>BMR by approximately 15-20%</strong> due to <strong>decreased organ mass, blood volume, and structural tissue requirements</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Enhanced Metabolic Efficiency Development:</strong> The body becomes <strong>progressively more efficient at energy utilization</strong> during calorie restriction, reducing <strong>non-essential energy expenditure</strong> through <strong>decreased spontaneous movement, improved cellular efficiency, and optimized metabolic pathways</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Regulation Alterations:</strong> Weight loss triggers <strong>leptin reduction (appetite-suppressing hormone)</strong> and <strong>ghrelin elevation (hunger-stimulating hormone)</strong>, creating <strong>increased hunger signals and reduced satiety responses</strong> that challenge dietary adherence</li>
            <li><strong>Adaptive Thermogenesis Activation:</strong> The body <strong>intentionally reduces non-vital energy expenditure</strong> through mechanisms including <strong>decreased heart rate variability, reduced body temperature, and minimized non-exercise activity thermogenesis</strong> as protective responses to perceived energy scarcity</li>
          </ul>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            To effectively combat <strong>weight loss plateaus and metabolic adaptation</strong>, implement <strong>regular BMR recalculations every 4-8 weeks</strong> and adjust your <strong>calorie intake accordingly</strong>. Incorporate <strong>periodic diet breaks, refeed days, and calorie cycling strategies</strong> to <strong>mitigate metabolic slowdown and support long-term weight management success</strong>.
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
            <i className="fas fa-clipboard-check"></i> Clinical Applications and Healthcare Integration of BMR Assessment
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            In <strong>clinical healthcare settings</strong>, <strong>accurate BMR assessment</strong> serves multiple <strong>diagnostic and therapeutic functions</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Status Evaluation:</strong> Healthcare professionals utilize <strong>BMR calculations</strong> to assess <strong>nutritional requirements for hospitalized patients, surgical candidates, and critical care populations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Disorder Diagnosis:</strong> <strong>Deviations from predicted metabolic rates</strong> can indicate <strong>thyroid dysfunction, mitochondrial disorders, or endocrine abnormalities</strong> requiring further medical investigation</li>
            <li style={{ marginBottom: '10px' }}><strong>Geriatric Health Assessment:</strong> Monitoring <strong>age-related metabolic changes</strong> helps develop <strong>appropriate nutritional interventions for elderly populations</strong> addressing <strong>sarcopenia prevention and frailty reduction</strong></li>
            <li><strong>Pediatric Growth Monitoring:</strong> <strong>Age-adjusted metabolic calculations</strong> assist in determining <strong>appropriate calorie intake for children and adolescents</strong> during critical growth and development phases</li>
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
            <i className="fas fa-dumbbell"></i> Evidence-Based Strategies for Metabolic Rate Optimization and Enhancement
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While <strong>genetic factors establish metabolic baselines</strong>, multiple <strong>evidence-based strategies</strong> can positively influence <strong>metabolic rate characteristics</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Resistance Training Implementation:</strong> Regular <strong>strength training sessions</strong> increase <strong>lean muscle mass</strong>, which can elevate <strong>resting metabolic rate by 7-10%</strong> due to muscle's <strong>higher metabolic activity compared to adipose tissue</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>High-Intensity Interval Training (HIIT):</strong> Incorporating <strong>HIIT protocols</strong> induces <strong>excess post-exercise oxygen consumption (EPOC)</strong>, increasing <strong>calorie burn for 24-48 hours post-workout</strong> beyond the exercise session itself</li>
            <li style={{ marginBottom: '10px' }}><strong>Protein Prioritization Strategy:</strong> Consuming <strong>adequate high-quality protein</strong> maximizes the <strong>thermic effect of food (TEF)</strong>, with protein digestion requiring <strong>20-30% of its calorie content</strong> compared to <strong>5-10% for carbohydrates and 0-3% for fats</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hydration Optimization:</strong> Maintaining <strong>adequate water intake</strong> supports <strong>cellular metabolic processes</strong>, with studies suggesting <strong>increased water consumption</strong> can temporarily boost <strong>metabolic rate by 24-30%</strong> for approximately <strong>60-90 minutes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Sleep Quality Enhancement:</strong> Obtaining <strong>7-9 hours of quality sleep nightly</strong> regulates <strong>appetite hormones (leptin and ghrelin), cortisol patterns, and growth hormone release</strong>—all influencing <strong>metabolic rate and body composition</strong></li>
            <li><strong>Stress Management Implementation:</strong> Chronic stress elevates <strong>cortisol production</strong>, which can promote <strong>visceral fat accumulation and metabolic inefficiency</strong>. Implementing <strong>stress reduction techniques</strong> supports <strong>optimal metabolic function</strong></li>
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
            <i className="fas fa-question-circle"></i> Frequently Asked Questions About Basal Metabolic Rate
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
            <strong>This BMR calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard medical formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Formula Limitations Warning:</strong> The Mifflin-St Jeor equation provides estimates that may vary by ±10% from measured metabolic rates. Individual variations in body composition, hormonal status, medications, medical conditions, and genetic factors can significantly affect actual metabolic rates.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, or other qualified healthcare provider with any questions regarding weight management, nutrition, or metabolic health conditions. Do not make significant changes to your diet or exercise regimen based solely on BMR calculations.
          </p>
          <p>
            <strong>Comprehensive Health Assessment:</strong> BMR is just one component of comprehensive health assessment. Complete evaluation should include body composition analysis, medical history review, laboratory testing, and consideration of individual health factors.
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
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Metabolic tracking device</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Personalized meal planning service</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Metabolic health coaching program</p>
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
                      e.currentTarget.style.background = '#9b59b6';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(155, 89, 182, 0.2)';
                      e.currentTarget.style.borderColor = '#9b59b6';
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
                      background: calculator.relevance >= 9 ? '#9b59b6' : calculator.relevance >= 8 ? '#3498db' : calculator.relevance >= 7 ? '#2ecc71' : '#f39c12',
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