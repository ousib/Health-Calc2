// src/app/pregnancy/page.js
"use client"; // This is required for interactivity

import { useState, useEffect } from 'react';

export default function PregnancyPage() {
  const [calculationMethod, setCalculationMethod] = useState('lmp');
  const [lastPeriod, setLastPeriod] = useState('');
  const [conceptionDate, setConceptionDate] = useState('');
  const [crlMeasurement, setCrlMeasurement] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [results, setResults] = useState(null);
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Styles
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: showSidebar ? '1fr 300px' : '1fr',
    gap: '30px'
  };

  const calculatorBoxStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    width: '100%'
  };

  const calcTitleStyle = {
    marginBottom: '10px',
    color: '#2c3e50',
    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const calcDescStyle = {
    marginBottom: '25px',
    fontSize: 'clamp(0.95rem, 2vw, 1rem)',
    color: '#666',
    lineHeight: '1.6'
  };

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
    background: '#f4eef8',
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

  // Share and Download styles
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

  const calculatorCardStyle = {
    padding: '12px',
    background: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '0.85rem',
    transition: 'all 0.3s',
    border: '2px solid transparent'
  };

  const hoverCalculatorCardStyle = {
    background: '#9b59b6',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(155, 89, 182, 0.2)',
    borderColor: '#9b59b6'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#f4eef8',
    borderRadius: '10px',
    borderLeft: '5px solid #9b59b6',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#8e44ad',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Set default date on component mount
  useEffect(() => {
    const sampleDate = new Date();
    sampleDate.setDate(sampleDate.getDate() - 56);
    setLastPeriod(sampleDate.toISOString().split('T')[0]);
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

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateDueDate();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  const selectMethod = (method) => {
    setCalculationMethod(method);
    setResults(null);
  };

  const calculateDueDate = () => {
    const today = new Date();
    const cycleLengthNum = parseInt(cycleLength) || 28;
    
    let lmpDate, dueDate, conceptionDateCalc;

    // Validate inputs based on selected method
    switch(calculationMethod) {
      case 'lmp':
        if (!lastPeriod) {
          alert("Please select the date of your last menstrual period.");
          return;
        }
        lmpDate = new Date(lastPeriod);
        if (lmpDate > today) {
          alert("Last period date cannot be in the future.");
          return;
        }
        
        // Calculate due date using Naegele's Rule with adjustable cycle length
        dueDate = new Date(lmpDate);
        dueDate.setDate(lmpDate.getDate() + 280 + (cycleLengthNum - 28));
        
        // Estimate conception date (ovulation typically around day 14 of cycle)
        conceptionDateCalc = new Date(lmpDate);
        conceptionDateCalc.setDate(lmpDate.getDate() + 14);
        break;
        
      case 'conception':
        if (!conceptionDate) {
          alert("Please select the estimated conception date.");
          return;
        }
        const conceptionInput = new Date(conceptionDate);
        if (conceptionInput > today) {
          alert("Conception date cannot be in the future.");
          return;
        }
        
        // Due date = conception date + 266 days
        dueDate = new Date(conceptionInput);
        dueDate.setDate(conceptionInput.getDate() + 266);
        
        // Estimate LMP (conception - 14 days)
        lmpDate = new Date(conceptionInput);
        lmpDate.setDate(conceptionInput.getDate() - 14);
        conceptionDateCalc = new Date(conceptionInput);
        break;
        
      case 'ultrasound':
        const crl = parseFloat(crlMeasurement);
        if (!crl || crl <= 0) {
          alert("Please enter a valid CRL measurement in millimeters.");
          return;
        }
        
        // Estimate gestational age from CRL (simplified formula)
        const gestationalDays = crl * 0.65 + 42;
        
        // Ultrasound date is assumed to be today for this calculation
        const ultrasoundDate = new Date();
        
        // Due date = ultrasound date + (280 - gestational age in days)
        dueDate = new Date(ultrasoundDate);
        dueDate.setDate(ultrasoundDate.getDate() + (280 - gestationalDays));
        
        // Estimate LMP (due date - 280 days)
        lmpDate = new Date(dueDate);
        lmpDate.setDate(dueDate.getDate() - 280);
        
        // Estimate conception (LMP + 14 days)
        conceptionDateCalc = new Date(lmpDate);
        conceptionDateCalc.setDate(lmpDate.getDate() + 14);
        break;
        
      default:
        alert("Please select a calculation method.");
        return;
    }

    // Calculate weeks pregnant
    const diffTime = Math.abs(today - lmpDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const daysRemaining = Math.max(0, Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)));
    
    // Determine trimester
    let trimester = "";
    if (weeks <= 12) trimester = "First Trimester";
    else if (weeks <= 26) trimester = "Second Trimester";
    else trimester = "Third Trimester";
    
    // Estimate conception week
    const conceptionWeek = Math.floor((conceptionDateCalc - lmpDate) / (1000 * 60 * 60 * 24 * 7)) + 1;
    
    // Calculate timeline position
    let position = 0;
    if (weeks <= 12) {
      position = (weeks / 12) * 25;
    } else if (weeks <= 26) {
      position = 25 + ((weeks - 12) / 14) * 37.5;
    } else if (weeks <= 40) {
      position = 62.5 + ((weeks - 26) / 14) * 37.5;
    } else {
      position = 100;
    }
    
    setTimelinePosition(position);

    const longOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const methodNames = {
      'lmp': 'last menstrual period',
      'conception': 'conception date',
      'ultrasound': 'ultrasound dating'
    };

    const nextAppointmentWeek = weeks + 4 > 40 ? 40 : weeks + 4;

    setResults({
      dueDate: dueDate.toLocaleDateString(undefined, longOptions),
      methodUsed: methodNames[calculationMethod],
      weeks: weeks,
      trimester: trimester,
      daysLeft: daysRemaining,
      conceptionWeek: `Week ${conceptionWeek}`,
      nextAppointmentWeek: nextAppointmentWeek,
      lmpDate: lmpDate.toLocaleDateString(),
      conceptionDate: conceptionDateCalc.toLocaleDateString(),
      dueDateObj: dueDate
    });
    setShowShareMenu(false);
  };

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate due date first before sharing.');
      return;
    }

    const shareText = `My estimated due date is ${results.dueDate} - Check your pregnancy due date using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'Pregnancy,DueDate,Baby,Health';

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
        shareUrlFull = `mailto:?subject=My Pregnancy Due Date&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My Pregnancy Due Date',
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
      alert('Please calculate due date first before downloading.');
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
    <title>Pregnancy Due Date Calculator Results</title>
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
        
        .due-date-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: #9b59b6;
        }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .progress-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .progress-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
            text-align: center;
        }
        
        .progress-value {
            font-size: 1.8rem;
            font-weight: bold;
            margin: 5px 0;
        }
        
        .progress-label {
            font-size: 0.85rem;
            color: #666;
            margin-top: 5px;
        }
        
        .disclaimer {
            background: #f4eef8;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #9b59b6;
            margin-top: 30px;
        }
        
        .disclaimer h4 {
            color: #8e44ad;
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
            <h1><i class="fas fa-baby"></i> Pregnancy Due Date Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Main Results Card -->
            <div class="result-card" style="border-top-color: #9b59b6;">
                <h3 class="card-title"><i class="fas fa-calendar-check" style="color: #9b59b6;"></i> Estimated Due Date (EDD)</h3>
                <div class="due-date-value">${results.dueDate}</div>
                <div class="info-box">
                    <p><strong>Calculation Method:</strong> ${calculationMethod === 'lmp' ? 'Last Menstrual Period (LMP)' : calculationMethod === 'conception' ? 'Conception Date' : 'Ultrasound Dating'}</p>
                    <p><strong>Last Menstrual Period:</strong> ${results.lmpDate}</p>
                    <p><strong>Estimated Conception:</strong> ${results.conceptionDate}</p>
                </div>
            </div>
            
            <!-- Progress Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-chart-line" style="color: #3498db;"></i> Pregnancy Progress</h3>
                <div class="progress-grid">
                    <div class="progress-item">
                        <div class="progress-value" style="color: #9b59b6;">${results.weeks}</div>
                        <div class="progress-label">Weeks Pregnant</div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-value" style="color: #3498db;">${results.trimester}</div>
                        <div class="progress-label">Current Trimester</div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-value" style="color: #2ecc71;">${results.daysLeft}</div>
                        <div class="progress-label">Days Until Due Date</div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-value" style="color: #e74c3c;">${results.conceptionWeek}</div>
                        <div class="progress-label">Estimated Conception Week</div>
                    </div>
                </div>
            </div>
            
            <!-- Timeline Card -->
            <div class="result-card" style="border-top-color: #f39c12;">
                <h3 class="card-title"><i class="fas fa-timeline" style="color: #f39c12;"></i> Pregnancy Timeline</h3>
                <div class="info-box">
                    <p><strong>First Trimester:</strong> Weeks 1-12 (Organ development)</p>
                    <p><strong>Second Trimester:</strong> Weeks 13-26 (Growth and movement)</p>
                    <p><strong>Third Trimester:</strong> Weeks 27-40 (Final growth and preparation)</p>
                </div>
                <div style="text-align: center; margin-top: 15px;">
                    <div style="height: 20px; background: linear-gradient(90deg, #9b59b6 0%, #9b59b6 25%, #3498db 25%, #3498db 62.5%, #2ecc71 62.5%, #2ecc71 100%); border-radius: 10px; position: relative;">
                        <div style="position: absolute; top: -10px; left: ${timelinePosition}%; width: 4px; height: 40px; background: #2c3e50; border-radius: 2px; transform: translateX(-2px);"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.8rem; color: #666;">
                        <span>Week ${results.weeks}</span>
                        <span>Week 40</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This pregnancy due date calculation is for informational purposes only. Only 4% of babies are born exactly on their due date. Most births occur within two weeks before or after the estimated due date. Always consult with healthcare professionals for personalized medical advice and prenatal care.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Pregnancy Due Date Calculator • ${window.location.href}</p>
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
    a.download = `pregnancy-due-date-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Health calculators sorted by SEO relevance
  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 10 },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 10 },
    { name: "Ovulation Tracker", link: "/ovulation-tracker", relevance: 10 },
    { name: "Pregnancy Test Calculator", link: "/pregnancy-test", relevance: 10 },
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator", relevance: 9 },
    { name: "Safe Period Calculator", link: "/safe-period-calculator", relevance: 9 },
    { name: "Period Cycle Calculator", link: "/period-cycle-calculator", relevance: 9 },
    { name: "Pregnancy Weight Gain Calculator", link: "/pregnancy-weight-gain-calculator", relevance: 9 },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker", relevance: 8 },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator", relevance: 8 },
    { name: "Waist-Hip Ratio", link: "/waist-hip-ratio", relevance: 8 },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 8 },
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 8 },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 8 },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 7 },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 7 },
    { name: "GFR Calculator", link: "/gfr-calculator", relevance: 6 },
    { name: "Creatinine Clearance", link: "/creatinine-clearance", relevance: 6 },
    { name: "Body Surface Area Calculator", link: "/bsa-calculator", relevance: 6 },
    { name: "Lean Body Mass Calculator", link: "/lbm-calculator", relevance: 6 },
    { name: "Fluid Requirement Calculator", link: "/fluid-requirement", relevance: 5 },
    { name: "Medication Dosage Calculator", link: "/medication-dosage", relevance: 5 },
    { name: "Electrolyte Correction", link: "/electrolyte-correction", relevance: 5 },
    { name: "Nutritional Needs Calculator", link: "/nutritional-needs", relevance: 5 },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator", relevance: 4 },
    { name: "Blood Pressure Category Calculator", link: "/blood-pressure-category-calculator", relevance: 4 },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 4 },
    { name: "Heart Disease Risk Calculator", link: "/heart-disease-risk-calculator", relevance: 4 },
    { name: "Carbohydrate Intake Calculator", link: "/carbohydrate-intake-calculator", relevance: 3 },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator", relevance: 3 },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator", relevance: 3 }
  ];

  // Sort by relevance
  const sortedCalculators = [...healthCalculators].sort((a, b) => b.relevance - a.relevance);

  // FAQ Data
  const faqs = [
    {
      question: "How accurate is the pregnancy due date calculator?",
      answer: "Our pregnancy due date calculator provides estimates based on standard medical calculations. The most accurate method is ultrasound dating in the first trimester, which has an accuracy of ±5-7 days. Last menstrual period dating typically has an accuracy of ±7-14 days. Remember that only 4% of babies are born exactly on their due date, with most births occurring within two weeks before or after the estimated date."
    },
    {
      question: "What's the difference between gestational age and fetal age?",
      answer: "Gestational age is measured from the first day of your last menstrual period (LMP), while fetal age is measured from the actual conception date. Since ovulation typically occurs about 14 days after LMP, fetal age is approximately 2 weeks less than gestational age. Healthcare providers use gestational age for pregnancy dating and care planning."
    },
    {
      question: "How does cycle length affect due date calculation?",
      answer: "The standard due date calculation assumes a 28-day menstrual cycle with ovulation on day 14. If your cycles are consistently longer or shorter, we adjust the calculation accordingly. Longer cycles typically mean later ovulation, which can push your due date later. Always inform your healthcare provider about your typical cycle length for the most accurate dating."
    },
    {
      question: "Can I use this calculator if I have irregular periods?",
      answer: "Yes, but ultrasound dating will provide more accurate results. With irregular periods, it's difficult to predict ovulation timing accurately. If you know your conception date (from fertility tracking or assisted reproduction), use the conception date method. Otherwise, an early pregnancy ultrasound provides the most reliable dating for irregular cycles."
    },
    {
      question: "What should I do after calculating my due date?",
      answer: "1. Schedule your first prenatal appointment (typically weeks 8-10). 2. Start taking prenatal vitamins with folic acid. 3. Review any medications with your healthcare provider. 4. Begin implementing healthy pregnancy habits. 5. Consider downloading and sharing your results with your partner and healthcare provider."
    },
    {
      question: "When should I contact a healthcare provider?",
      answer: "Contact a healthcare provider immediately if you experience: severe abdominal pain, heavy bleeding, fever over 100.4°F (38°C), severe headaches with vision changes, persistent vomiting, decreased fetal movement (after 28 weeks), or any other concerning symptoms. For routine care, schedule your first prenatal visit around 8-10 weeks of pregnancy."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-baby"></i> Pregnancy Due Date Calculator & EDD Estimator
        </h1>
        <p style={calcDescStyle}>
          Calculate your estimated due date (EDD) using multiple validated medical methods, track pregnancy progress by week, and receive comprehensive trimester information for evidence-based prenatal planning and maternal health optimization.
        </p>

        {/* Method Selection */}
        <div style={{ 
          margin: '20px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px'
        }}>
          <label style={inputGroupLabelStyle}><i className="fas fa-calculator"></i> Calculation Method</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
            <button 
              style={{
                padding: '10px 20px',
                background: calculationMethod === 'lmp' ? '#9b59b6' : '#e9ecef',
                color: calculationMethod === 'lmp' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: calculationMethod === 'lmp' ? '600' : '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectMethod('lmp')}
            >
              <i className="fas fa-calendar-day"></i> Last Period (LMP)
            </button>
            <button 
              style={{
                padding: '10px 20px',
                background: calculationMethod === 'conception' ? '#9b59b6' : '#e9ecef',
                color: calculationMethod === 'conception' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: calculationMethod === 'conception' ? '600' : '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectMethod('conception')}
            >
              <i className="fas fa-heart"></i> Conception Date
            </button>
            <button 
              style={{
                padding: '10px 20px',
                background: calculationMethod === 'ultrasound' ? '#9b59b6' : '#e9ecef',
                color: calculationMethod === 'ultrasound' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: calculationMethod === 'ultrasound' ? '600' : '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectMethod('ultrasound')}
            >
              <i className="fas fa-wave-square"></i> Ultrasound Dating
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div style={inputGridStyle}>
          {calculationMethod === 'lmp' && (
            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-calendar-day"></i> First Day of Last Period</label>
              <input 
                type="date" 
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                style={inputStyle}
              />
              <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Day 1 of your menstrual cycle</p>
            </div>
          )}
          
          {calculationMethod === 'conception' && (
            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-heart"></i> Conception Date</label>
              <input 
                type="date" 
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                style={inputStyle}
              />
              <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Estimated date of conception</p>
            </div>
          )}
          
          {calculationMethod === 'ultrasound' && (
            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-wave-square"></i> Ultrasound CRL (mm)</label>
              <input 
                type="number" 
                placeholder="e.g., 45" 
                value={crlMeasurement}
                onChange={(e) => setCrlMeasurement(e.target.value)}
                min="1" 
                max="100"
                style={inputStyle}
              />
              <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Crown-rump length measurement</p>
            </div>
          )}
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-history"></i> Cycle Length (Optional)</label>
            <input 
              type="number" 
              placeholder="28" 
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              min="21" 
              max="45"
              style={inputStyle}
            />
            <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Days between periods (default 28)</p>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateDueDate}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Due Date
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            {/* Main Results Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#9b59b6' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-calendar-check" style={{ color: '#9b59b6' }}></i> Estimated Due Date (EDD)
              </h4>
              <div style={{ 
                fontSize: 'clamp(2rem, 6vw, 2.8rem)', 
                fontWeight: '800', 
                margin: '15px 0',
                textAlign: 'center',
                color: '#8e44ad'
              }}>
                {results.dueDate}
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Calculation Method:</strong> Based on {results.methodUsed}</p>
                <p><strong>Last Menstrual Period:</strong> {results.lmpDate}</p>
                <p><strong>Estimated Conception:</strong> {results.conceptionDate}</p>
              </div>
            </div>

            {/* Progress Cards */}
            <div style={{ ...resultCardStyle, borderTopColor: '#3498db' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-chart-line" style={{ color: '#3498db' }}></i> Pregnancy Progress
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                margin: '20px 0'
              }}>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#9b59b6' }}>
                    {results.weeks}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Weeks Pregnant</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>
                    {results.trimester}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Current Trimester</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2ecc71' }}>
                    {results.daysLeft}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Days Until Due Date</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
                    {results.conceptionWeek}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Estimated Conception Week</div>
                </div>
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
              style={{
                ...shareButtonStyle,
                background: '#27ae60'
              }}
              onClick={downloadHTML}
              onMouseEnter={(e) => e.currentTarget.style.background = '#219150'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#27ae60'}
            >
              <i className="fas fa-file-code"></i> Download HTML Report
            </button>
          </div>
        )}

        {/* Pregnancy Timeline Visualization */}
        {results && (
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
              <i className="fas fa-chart-bar"></i> Pregnancy Progress Timeline
            </h4>
            <div style={{
              height: '40px',
              background: 'linear-gradient(90deg, #9b59b6 0%, #9b59b6 25%, #3498db 25%, #3498db 62.5%, #2ecc71 62.5%, #2ecc71 100%)',
              borderRadius: '20px',
              margin: '20px 0',
              position: 'relative'
            }}>
              <div 
                style={{
                  position: 'absolute',
                  top: '-10px',
                  width: '3px',
                  height: '60px',
                  background: '#2c3e50',
                  borderRadius: '2px',
                  transform: 'translateX(-1.5px)',
                  left: `${timelinePosition}%`
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: '#7f8c8d',
              marginTop: '5px'
            }}>
              <span>1st Trimester<br/>(Weeks 1-12)</span>
              <span>2nd Trimester<br/>(Weeks 13-26)</span>
              <span>3rd Trimester<br/>(Weeks 27-40)</span>
            </div>
            <p style={{marginTop: '20px', fontSize: '0.9rem', color: '#666'}}>
              <i className="fas fa-info-circle"></i> Only 4% of babies are born exactly on their due date. Most arrive within 2 weeks before or after.
            </p>
          </div>
        )}

        {/* Pregnancy Tips */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          margin: '25px 0'
        }}>
          <div style={{
            padding: '20px',
            background: '#f4eef8',
            borderRadius: '10px',
            borderLeft: '4px solid #9b59b6',
            transition: 'all 0.3s'
          }}>
            <h4 style={{ 
              marginBottom: '10px',
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-pills"></i> Prenatal Vitamins
            </h4>
            <p style={{fontSize: '0.85rem', color: '#666'}}>Start or continue taking prenatal vitamins with folic acid (400-800 mcg daily).</p>
          </div>
          <div style={{
            padding: '20px',
            background: '#f4eef8',
            borderRadius: '10px',
            borderLeft: '4px solid #9b59b6',
            transition: 'all 0.3s'
          }}>
            <h4 style={{ 
              marginBottom: '10px',
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-procedures"></i> Rest & Hydration
            </h4>
            <p style={{fontSize: '0.85rem', color: '#666'}}>Increase water intake and prioritize rest, especially during the first trimester.</p>
          </div>
          <div style={{
            padding: '20px',
            background: '#f4eef8',
            borderRadius: '10px',
            borderLeft: '4px solid #9b59b6',
            transition: 'all 0.3s'
          }}>
            <h4 style={{ 
              marginBottom: '10px',
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-ban"></i> Avoidances
            </h4>
            <p style={{fontSize: '0.85rem', color: '#666'}}>Avoid alcohol, tobacco, certain medications, and high-mercury fish.</p>
          </div>
          <div style={{
            padding: '20px',
            background: '#f4eef8',
            borderRadius: '10px',
            borderLeft: '4px solid #9b59b6',
            transition: 'all 0.3s'
          }}>
            <h4 style={{ 
              marginBottom: '10px',
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-user-md"></i> Healthcare Provider
            </h4>
            <p style={{fontSize: '0.85rem', color: '#666'}}>Schedule your first prenatal appointment around week 8-10 of pregnancy.</p>
          </div>
        </div>

        {/* Enhanced SEO Content */}
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
            <i className="fas fa-question-circle"></i> Comprehensive Guide to Pregnancy Due Date Calculation Using Evidence-Based Medical Methods
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Accurate pregnancy due date calculation represents a fundamental component of <strong>comprehensive prenatal care planning</strong>, <strong>fetal development milestone tracking</strong>, and <strong>evidence-based birth preparation strategies</strong>. Our advanced calculator implements three clinically-validated methods: <strong>Last Menstrual Period (LMP) dating using Naegele's Rule modifications</strong>, <strong>precise conception date calculation for known fertilization timing scenarios</strong>, and <strong>ultrasound-based gestational age estimation utilizing crown-rump length biometric measurements</strong>. Each methodology offers distinct <strong>accuracy profiles and clinical application contexts</strong> for optimal <strong>pregnancy timeline creation</strong> and <strong>estimated delivery date (EDD) prediction</strong> across diverse obstetric scenarios.
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
            <i className="fas fa-calculator"></i> Medical Standards for Due Date Estimation: Comprehensive Application of Naegele's Rule with Modern Adjustments
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Contemporary <strong>obstetric healthcare providers</strong> primarily utilize these validated methodologies for precise due date estimation and <strong>gestational age determination protocols</strong>:
          </p>
          
          <div style={{ 
            background: '#f1f3f5', 
            padding: '20px', 
            borderRadius: '10px', 
            fontFamily: "'Courier New', monospace", 
            textAlign: 'center', 
            margin: '20px 0', 
            fontSize: '1rem',
            borderLeft: '4px solid #9b59b6',
            overflowX: 'auto'
          }}>
            <strong>Naegele's Rule (Standard LMP Method - Modified):</strong><br />
            Due Date = First Day of LMP + 7 Days - 3 Months + 1 Year + (Cycle Length - 28 Days)<br /><br />
            
            <strong>Conception Date Method (Precise Timing Scenarios):</strong><br />
            Due Date = Conception Date + 266 Days (38 Weeks Gestational Age)<br />
            (Adds 2 weeks to 280-day pregnancy duration)<br /><br />
            
            <strong>Ultrasound Dating (First Trimester Gold Standard):</strong><br />
            Based on fetal biometric measurements (CRL = Crown-Rump Length)<br />
            Gestational Age (Days) = CRL (mm) × 0.65 + 42<br />
            Due Date = Ultrasound Date + (280 - Calculated Gestational Age)
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
            <i className="fas fa-baby"></i> Understanding Gestational Age Versus Fetal Age: Critical Concepts for Accurate Pregnancy Monitoring
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Distinguishing between these two essential age measurements represents a fundamental requirement for <strong>precise pregnancy milestone tracking</strong> and <strong>evidence-based prenatal care scheduling</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Gestational Age Measurement Protocol:</strong> Calculated from the first day of your <strong>last menstrual period (LMP) dating methodology</strong>, this represents the standard medical measurement employed for <strong>systematic prenatal care scheduling algorithms</strong>, <strong>comprehensive fetal development assessment protocols</strong>, and <strong>evidence-based pregnancy milestone tracking systems</strong>. Gestational age consistently measures approximately <strong>two weeks longer than actual fetal age</strong> due to the biological interval between menstruation and ovulation.</li>
            <li style={{ marginBottom: '10px' }}><strong>Fetal Age (Conceptional Age) Determination:</strong> Measured from the <strong>actual biological conception date</strong>, representing the <strong>true embryonic and fetal development time</strong>. Since <strong>ovulation typically occurs approximately 14 days following the last menstrual period</strong> in standard 28-day cycles, fetal age consistently calculates as approximately <strong>two weeks less than established gestational age measurements</strong>.</li>
          </ul>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            When obstetric providers reference "8 weeks pregnant" during clinical consultations, they consistently refer to <strong>gestational age measurement standards</strong>, indicating that <strong>fertilization occurred approximately 6 weeks previously</strong>, with embryonic development spanning that specific timeframe.
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
            <i className="fas fa-calendar-alt"></i> Comprehensive Three-Trimester Pregnancy Progression: Developmental Milestones and Maternal Physiological Adaptation
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Pregnancy progresses systematically through three distinct trimesters, each characterized by specific <strong>fetal development milestone achievement</strong> and <strong>maternal physiological adaptation processes</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>First Trimester Development (Weeks 1-12):</strong> Characterized by <strong>critical organogenesis completion</strong> with all major organ systems forming during this foundational period. Common symptoms requiring management include <strong>morning sickness symptom mitigation strategies</strong>, <strong>pregnancy fatigue management approaches</strong>, and <strong>early pregnancy symptom recognition protocols</strong>. This trimester establishes the <strong>fundamental developmental framework</strong> for subsequent fetal growth.</li>
            <li style={{ marginBottom: '10px' }}><strong>Second Trimester Progression (Weeks 13-26):</strong> Often designated the "honeymoon period" as <strong>nausea typically subsides significantly</strong>. Features include <strong>fetal movement recognition initiation</strong>, <strong>comprehensive anatomy scan completion</strong>, and <strong>maternity clothing transition requirements</strong>. This phase emphasizes <strong>rapid fetal growth</strong> and <strong>maternal physical adaptation</strong> to advancing pregnancy.</li>
            <li><strong>Third Trimester Finalization (Weeks 27-40):</strong> Represents the final growth phase characterized by <strong>substantial fetal weight gain accumulation</strong>, <strong>critical lung maturation processes</strong>, and <strong>optimal birth positioning achievement</strong>. Common concerns addressed include <strong>third trimester physical discomfort management</strong> and <strong>systematic labor preparation strategies</strong> for optimal birth outcomes.</li>
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
            <i className="fas fa-hospital"></i> Ultrasound Dating Methodology: Gold Standard Protocol for Precise Pregnancy Due Date Estimation
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While LMP dating provides a standardized clinical reference, <strong>first-trimester ultrasound examination protocols</strong> offer superior accuracy for due date estimation across diverse clinical scenarios. Early pregnancy ultrasounds systematically measure <strong>crown-rump length (CRL) biometric parameters</strong>—the longest straight-line measurement of the developing fetus from cranial to caudal endpoints—which demonstrates strong correlation with established gestational age standards. Ultrasound dating accuracy demonstrates progressive diminution as pregnancy advances through distinct developmental phases:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early First Trimester (Weeks 6-13):</strong> Accuracy within ±5-7 days (95% confidence interval)—optimal timeframe for <strong>definitive early pregnancy confirmation</strong> and <strong>precise gestational dating establishment</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Second Trimester Evaluation (Weeks 14-27):</strong> Accuracy within ±7-14 days—standard interval for <strong>comprehensive anatomy scan timing optimization</strong> and <strong>fetal anomaly screening protocols</strong></li>
            <li><strong>Third Trimester Assessment (Weeks 28-40):</strong> Accuracy within ±21-30 days—primarily employed for <strong>serial fetal growth assessment tracking</strong> rather than definitive dating purposes</li>
          </ul>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Consequently, obstetric providers typically utilize the earliest reliable ultrasound examination for definitive pregnancy dating and generally refrain from adjusting established due dates following first-trimester confirmation unless <strong>significant clinical discrepancies exceeding established thresholds</strong> become apparent during subsequent evaluations.
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
            <i className="fas fa-exclamation-triangle"></i> Critical Factors Influencing Due Date Calculation Accuracy and Biological Pregnancy Duration
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Multiple biological and clinical factors significantly influence due date calculation precision and actual physiological pregnancy duration across diverse populations:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Menstrual Cycle Irregularity Considerations:</strong> Women presenting with <strong>irregular menstrual cycle patterns</strong> or diagnosed with <strong>polycystic ovary syndrome (PCOS)</strong> frequently experience <strong>variable ovulation timing unpredictability</strong> complicating standard dating calculations</li>
            <li style={{ marginBottom: '10px' }}><strong>Cycle Length Variation Impacts:</strong> The conventional 28-day cycle assumption proves inadequate for women demonstrating <strong>consistently shorter or longer menstrual intervals</strong> requiring individualized adjustment protocols</li>
            <li style={{ marginBottom: '10px' }}><strong>Ovulation Timing Variability:</strong> Ovulation occurring <strong>significantly earlier or later than day 14</strong> within the menstrual cycle directly affects conception dating accuracy and subsequent due date calculations</li>
            <li style={{ marginBottom: '10px' }}><strong>Ethnic and Genetic Influences:</strong> Certain population studies suggest <strong>subtle variations in average pregnancy length</strong> among distinct ethnic groups, though clinical significance remains debated within obstetric literature</li>
            <li style={{ marginBottom: '10px' }}><strong>Previous Pregnancy History Patterns:</strong> Women typically demonstrate <strong>similar pregnancy duration characteristics</strong> across successive gestations, with first pregnancies often extending slightly longer than subsequent ones</li>
            <li><strong>Maternal Age and Health Status:</strong> <strong>Advanced maternal age categories</strong> and specific <strong>medical conditions including diabetes, hypertension, or thyroid disorders</strong> can influence physiological pregnancy duration and timing patterns</li>
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
            <i className="fas fa-clipboard-check"></i> Post-Due Date Calculation Implementation: Essential Evidence-Based Prenatal Care Planning Strategies
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Following due date calculation completion, implementing these evidence-based <strong>comprehensive prenatal care strategies</strong> establishes optimal foundation for healthy pregnancy progression:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Schedule Comprehensive Prenatal Care Initiation:</strong> Contact qualified obstetric providers for <strong>initial prenatal visit scheduling</strong> typically recommended during <strong>weeks 8-10 gestational timeframe</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Initiate Prenatal Supplementation Protocols:</strong> Begin daily <strong>prenatal vitamin formulations</strong> containing minimum <strong>400-800 micrograms of folic acid</strong> for neural tube defect prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Conduct Medication Safety Review:</strong> Consult healthcare providers regarding <strong>all prescription medications, over-the-counter preparations, and herbal supplements</strong> for pregnancy compatibility assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Implement Healthy Pregnancy Lifestyle Habits:</strong> Adopt <strong>balanced nutritional patterns, adequate hydration protocols, and appropriate exercise routines</strong> tailored to individual pregnancy stages</li>
            <li style={{ marginBottom: '10px' }}><strong>Establish Systematic Pregnancy Tracking Systems:</strong> Initiate <strong>pregnancy journal maintenance or digital tracking applications</strong> for symptom monitoring, question documentation, and milestone recording</li>
            <li><strong>Educate Regarding Warning Sign Recognition:</strong> Learn <strong>concerning symptom patterns</strong> requiring immediate medical attention and <strong>emergency contact protocols</strong></li>
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
            <i className="fas fa-user-md"></i> Due Date Adjustment Protocols: Understanding Clinical Scenarios Requiring Estimated Delivery Date Modification
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Healthcare providers may adjust established due dates based on these specific clinical scenarios and diagnostic findings:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Ultrasound Dating Discrepancy:</strong> When <strong>first-trimester ultrasound dating measurements</strong> differ from LMP-based calculations by <strong>greater than 5-7 days threshold</strong>, ultrasound dating typically receives priority</li>
            <li style={{ marginBottom: '10px' }}><strong>Uncertain Last Menstrual Period Documentation:</strong> For patients presenting with <strong>irregular menstrual cycles, hormonal contraception use, or unknown LMP dates</strong>, ultrasound dating provides primary reference</li>
            <li style={{ marginBottom: '10px' }}><strong>Assisted Reproductive Technology Scenarios:</strong> With <strong>precisely documented conception dates</strong> from IVF, IUI, or other fertility treatments, conception dating offers superior accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Significant Fetal Growth Variation Patterns:</strong> When <strong>serial ultrasound evaluations</strong> demonstrate <strong>consistent growth pattern divergence</strong> from expected developmental trajectories</li>
            <li><strong>Multiple Gestation Pregnancy Considerations:</strong> Twin, triplet, and higher-order multiple pregnancies frequently require <strong>adjusted dating protocols and modified growth expectations</strong> compared to singleton gestations</li>
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
            <i className="fas fa-question-circle"></i> Frequently Asked Questions About Pregnancy Due Date Calculation
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
        <div style={medicalDisclaimerStyle}>
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer</h4>
          <p style={{ marginBottom: '15px' }}>
            <strong>This pregnancy due date calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard obstetric formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Accuracy Limitations:</strong> Only 4% of babies are born exactly on their calculated due date. Most births occur within two weeks before or after the estimated date. Individual pregnancy experiences vary based on numerous biological and clinical factors.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <strong>Professional Medical Consultation Required:</strong> Always seek the advice of your obstetrician, midwife, or other qualified healthcare provider with any questions regarding pregnancy, prenatal care, or medical conditions. Do not make healthcare decisions based solely on calculator results.
          </p>
          <p>
            <strong>Comprehensive Prenatal Care:</strong> Due date calculation is just one aspect of comprehensive prenatal care. Always consult with healthcare professionals for personalized medical advice, regular prenatal check-ups, and appropriate pregnancy monitoring.
          </p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) + Related Calculators */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium pregnancy tracking app</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Prenatal vitamins and supplements</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Join our pregnancy support community</p>
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
                Explore our comprehensive collection of health assessment tools sorted by relevance:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {sortedCalculators.map((calculator, index) => (
                  <a
                    key={index}
                    href={calculator.link}
                    style={calculatorCardStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverCalculatorCardStyle)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = calculatorCardStyle.background;
                      e.currentTarget.style.color = calculatorCardStyle.color;
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = calculatorCardStyle.borderColor;
                    }}
                  >
                    {calculator.name}
                    <span style={{ 
                      display: 'block',
                      fontSize: '0.7rem',
                      marginTop: '5px',
                      color: calculator.relevance >= 9 ? '#27ae60' : calculator.relevance >= 8 ? '#3498db' : '#f39c12'
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