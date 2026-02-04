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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [results, setResults] = useState(null);
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  // Container style with more space for main content
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
    background: '#27ae60',
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

  // Input grid style for better layout
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
    background: '#27ae60',
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
    background: '#219150',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(39, 174, 96, 0.2)'
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
    background: '#e8f5e9',
    border: '2px solid #27ae60',
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.15)',
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
    setHeight('175');
    setNeck('38');
    setWaist('85');
    setHips('95');
    setFeet('5');        // Add this
    setInches('9'); 
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
    setBodyFatResult(null);
    setScalePosition(0);
    setResults(null);
    // Clear height inputs when switching units
    if (unit === 'metric') {
      setHeight('');
    } else {
      setFeet('');
      setInches('');
    }
  };

  const calculateBodyFat = () => {
    
    let heightVal;
  
    // Calculate height based on unit system
    if (currentUnit === 'metric') {
      heightVal = parseFloat(height);
      // Validate height for metric
      if (!heightVal || heightVal <= 0) {
        alert('Please enter your height in cm.');
        return;
      }
    } else {
      // For imperial: convert feet and inches to total inches
      const feetVal = parseFloat(feet) || 0;
      const inchesVal = parseFloat(inches) || 0;
      heightVal = (feetVal * 12) + inchesVal;
      
      // Validate height for imperial
      if (!feetVal || !inchesVal || heightVal <= 0) {
        alert('Please enter your height in feet and inches.');
        return;
      }
      if (heightVal < 39 || heightVal > 98) {
        alert('Height should be between 3\'3" (39") and 8\'2" (98").');
        return;
      }
    }
    
    const neckVal = parseFloat(neck);
    const waistVal = parseFloat(waist);
    const hipsVal = gender === 'female' ? parseFloat(hips) : 0;
    
    // Validate other inputs
    if (!neckVal || !waistVal || neckVal <= 0 || waistVal <= 0) {
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
    setShowShareMenu(false);
    
    // Store comprehensive results for sharing/downloading
    setResults({
      bodyFat: bfResult,
      category: categoryResult,
      categoryColor: color,
      tip: tipResult,
      measurements: {
        height: heightVal,
        neck: neckVal,
        waist: waistVal,
        hips: hipsVal,
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
      alert('Please calculate body fat first before sharing.');
      return;
    }

    const shareText = `My body fat percentage is ${results.bodyFat}% (${results.category}) - Check yours using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'BodyFat,Fitness,Health,Wellness';

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
        shareUrlFull = `mailto:?subject=My Body Fat Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My Body Fat Results',
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
      alert('Please calculate body fat first before downloading.');
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
    <title>Body Fat Calculator Results</title>
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
            border-bottom: 3px solid #27ae60;
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
        
        .bf-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: ${results.categoryColor};
        }
        
        .bf-category {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
            color: ${results.categoryColor};
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
            background: #e8f5e9;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #27ae60;
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
            <h1><i class="fas fa-percentage"></i> Body Fat Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Main Results Card -->
            <div class="result-card" style="border-top-color: #27ae60;">
                <h3 class="card-title"><i class="fas fa-percentage" style="color: #27ae60;"></i> Body Fat Analysis Results</h3>
                <div class="bf-value">${results.bodyFat}%</div>
                <div class="bf-category">${results.category}</div>
                <div class="health-tip">
                    <strong><i class="fas fa-lightbulb"></i> Health Recommendation:</strong><br>
                    ${results.tip}
                </div>
            </div>
            
            <!-- Measurements Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-tape" style="color: #3498db;"></i> Measurement Details</h3>
                <div class="measurement-grid">
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.height} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}</div>
                        <div class="measurement-label">Height</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.neck} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}</div>
                        <div class="measurement-label">Neck Circumference</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.waist} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}</div>
                        <div class="measurement-label">Waist Circumference</div>
                    </div>
                    ${results.measurements.hips ? `
                    <div class="measurement-item">
                        <div class="measurement-value">${results.measurements.hips} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}</div>
                        <div class="measurement-label">Hip Circumference</div>
                    </div>
                    ` : ''}
                </div>
                <div class="info-box">
                    <p><strong>Calculation Method:</strong> U.S. Navy Body Fat Formula</p>
                    <p><strong>Gender:</strong> ${results.measurements.gender === 'male' ? 'Male' : 'Female'}</p>
                    <p><strong>Unit System:</strong> ${results.measurements.unit === 'metric' ? 'Metric (cm)' : 'Imperial (inches)'}</p>
                </div>
            </div>
            
            <!-- Category Explanation Card -->
            <div class="result-card" style="border-top-color: #f39c12;">
                <h3 class="card-title"><i class="fas fa-info-circle" style="color: #f39c12;"></i> Body Fat Category Explanation</h3>
                <div class="info-box">
                    <p><strong>${results.category}:</strong> ${results.category === 'Essential Fat' ? 
                      'The minimum amount of body fat necessary for basic physiological functions and hormone production.' : 
                      results.category === 'Athlete' ? 
                      'Optimal range for athletic performance, typically seen in trained individuals with good muscle definition.' :
                      results.category === 'Fitness' ? 
                      'Healthy range with good muscle tone and low disease risk, ideal for most active individuals.' :
                      results.category === 'Acceptable' ? 
                      'Average range with moderate health risks, may benefit from body composition improvement.' :
                      'High body fat percentage associated with increased health risks and metabolic concerns.'}</p>
                </div>
                <div class="health-tip">
                    <strong><i class="fas fa-heartbeat"></i> Health Implications:</strong><br>
                    Body fat percentage is a crucial indicator of overall health and fitness. Maintaining appropriate levels supports metabolic health, hormone balance, and reduces disease risk.
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This body fat calculation is for informational purposes only. The U.S. Navy method provides an estimate that may vary by ±3-4% from clinical measurements. Body fat percentage should be interpreted in context with other health indicators. Always consult with healthcare professionals for personalized health advice.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Body Fat Calculator • ${window.location.href}</p>
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
    a.download = `body-fat-results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download as text file
  const downloadText = () => {
    if (!results) {
      alert('Please calculate body fat first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                      BODY FAT CALCULATOR RESULTS                           ║\n`;
    content += `║                    Generated: ${date} at ${time}                   ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    // Main Results
    content += `BODY FAT ANALYSIS RESULTS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Body Fat Percentage: ${results.bodyFat}%\n`;
    content += `  Category: ${results.category}\n`;
    content += `  Health Recommendation: ${results.tip}\n\n`;
    
    // Measurements
    content += `MEASUREMENT DETAILS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Height: ${results.measurements.height} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}\n`;
    content += `  Neck Circumference: ${results.measurements.neck} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}\n`;
    content += `  Waist Circumference: ${results.measurements.waist} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}\n`;
    if (results.measurements.hips) {
      content += `  Hip Circumference: ${results.measurements.hips} ${results.measurements.unit === 'metric' ? 'cm' : 'in'}\n`;
    }
    content += `  Gender: ${results.measurements.gender === 'male' ? 'Male' : 'Female'}\n`;
    content += `  Unit System: ${results.measurements.unit === 'metric' ? 'Metric (cm)' : 'Imperial (inches)'}\n`;
    content += `  Calculation Method: U.S. Navy Body Fat Formula\n\n`;
    
    // Category Explanation
    content += `CATEGORY EXPLANATION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  ${results.category}: ${results.category === 'Essential Fat' ? 
      'The minimum amount of body fat necessary for basic physiological functions and hormone production.' : 
      results.category === 'Athlete' ? 
      'Optimal range for athletic performance, typically seen in trained individuals with good muscle definition.' :
      results.category === 'Fitness' ? 
      'Healthy range with good muscle tone and low disease risk, ideal for most active individuals.' :
      results.category === 'Acceptable' ? 
      'Average range with moderate health risks, may benefit from body composition improvement.' :
      'High body fat percentage associated with increased health risks and metabolic concerns.'}\n\n`;
    
    // Health Implications
    content += `HEALTH IMPLICATIONS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `Body fat percentage is a crucial indicator of overall health and fitness.\n`;
    content += `Maintaining appropriate levels supports metabolic health, hormone balance,\n`;
    content += `and reduces disease risk. Regular monitoring can help track progress in\n`;
    content += `fitness and weight management programs.\n\n`;
    
    // Disclaimer
    content += `IMPORTANT MEDICAL DISCLAIMER:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `This body fat calculation is for informational purposes only. The U.S. Navy\n`;
    content += `method provides an estimate that may vary by ±3-4% from clinical measurements.\n`;
    content += `Body fat percentage should be interpreted in context with other health\n`;
    content += `indicators. Always consult with healthcare professionals for personalized\n`;
    content += `health advice and comprehensive health assessment.\n\n`;
    content += `Generated by Body Fat Calculator\n`;
    content += `URL: ${window.location.href}\n`;
    content += `Date: ${date} | Time: ${time}\n`;
    content += `\n╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                            END OF REPORT                              ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n`;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `body-fat-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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

  // Health calculators sorted by SEO relevance
  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 10 },
    { name: "Body Type Calculator", link: "/body-type-calculator", relevance: 9 },
    { name: "Waist to Height Ratio", link: "/waist-to-height-ratio", relevance: 9 },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator", relevance: 8 },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 8 },
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 8 },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 7 },
    { name: "Macro Calculator", link: "/macro-calculator", relevance: 7 },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 6 },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 6 },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 5 },
    { name: "Heart Disease Risk Calculator", link: "/heart-disease-risk-calculator", relevance: 5 }
  ];

  // Sort by relevance
  const sortedCalculators = [...healthCalculators].sort((a, b) => b.relevance - a.relevance);

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
          <i className="fas fa-percentage"></i> Body Fat Percentage Calculator - Navy Method Body Composition Analysis
        </h1>
        
        <p style={{ 
          marginBottom: '25px', 
          fontSize: 'clamp(0.95rem, 2vw, 1rem)', 
          color: '#666' 
        }}>
          Calculate your <strong>body fat percentage estimate</strong> using the validated <strong>U.S. Navy Method formula</strong> for accurate <strong>body composition assessment</strong> without expensive equipment like <strong>DEXA scans or hydrostatic weighing</strong>.
        </p>

        {/* Units Toggle */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            style={{
              padding: '8px 16px',
              background: currentUnit === 'metric' ? '#27ae60' : '#f1f3f5',
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
              background: currentUnit === 'imperial' ? '#27ae60' : '#f1f3f5',
              color: currentUnit === 'imperial' ? 'white' : '#333',
              border: '2px solid #dfe6e9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: currentUnit === 'imperial' ? '600' : '500',
              transition: 'all 0.3s'
            }}
            onClick={() => toggleUnits('imperial')}
          >
            Imperial (ft/in)
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
            <i className="fas fa-info-circle"></i> Accurate Body Measurement Instructions for Precise Body Fat Calculation
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
              <strong>Height Measurement:</strong> Stand barefoot against a wall, heels together, looking straight ahead
            </div>
          </div>
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
              2
            </div>
            <div>
              <strong>Neck Circumference:</strong> Measure below the Adam's apple (larynx) with tape parallel to floor
            </div>
          </div>
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
              3
            </div>
            <div>
              <strong>Waist Measurement:</strong> Measure at the narrowest point between ribs and hips (or at navel if no natural waist)
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
              4
            </div>
            <div>
              <strong>Hips Measurement (Women):</strong> Measure at the widest point of buttocks, tape parallel to floor
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-venus-mars"></i> Biological Sex</label>
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
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height *</label>
            {currentUnit === 'metric' ? (
              <>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                  min="100"
                  max="250"
                  step="0.1"
                  style={inputStyle}
                />
                <small style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
                  Centimeters (cm)
                </small>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="5"
                    min="3"
                    max="8"
                    step="1"
                    style={inputStyle}
                  />
                  <small style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
                    Feet (ft)
                  </small>
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="9"
                    min="0"
                    max="11"
                    step="0.1"
                    style={inputStyle}
                  />
                  <small style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
                    Inches (in)
                  </small>
                </div>
              </div>
            )}
          </div>
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> {currentUnit === 'metric' ? 'Neck (cm)' : 'Neck (inches)'}</label>
            <input 
              type="number" 
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              placeholder={currentUnit === 'metric' ? '38' : '15'}
              min="20" 
              max="60" 
              step="0.1"
              style={inputStyle}
            />
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
              max="150" 
              step="0.1"
              style={inputStyle}
            />
          </div>
          
          <div style={{ ...inputGroupStyle, display: gender === 'female' ? 'block' : 'none' }}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user-circle"></i> {currentUnit === 'metric' ? 'Hips (cm)' : 'Hips (inches)'}</label>
            <input 
              type="number" 
              value={hips}
              onChange={(e) => setHips(e.target.value)}
              placeholder={currentUnit === 'metric' ? '95' : '37.5'}
              min="60" 
              max="150" 
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateBodyFat}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Body Fat Percentage
        </button>

        {/* Results Display with Share/Download Buttons */}
        {results && (
          <div style={resultsContainerStyle}>
            {/* Main Results Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#27ae60' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-percentage" style={{ color: '#27ae60' }}></i> Body Fat Analysis Results
              </h4>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                margin: '15px 0',
                textAlign: 'center',
                color: getCategoryColor()
              }}>
                {bodyFatResult}%
              </div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                textAlign: 'center',
                marginBottom: '15px',
                color: getCategoryColor()
              }}>
                {category}
              </div>
              <div style={{ 
                padding: '15px',
                background: '#e8f5e9',
                borderRadius: '8px',
                margin: '20px 0',
                borderLeft: '4px solid #27ae60'
              }}>
                <strong><i className="fas fa-lightbulb"></i> Health Recommendation:</strong><br/>
                {tip}
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
                <i className="fas fa-tape" style={{ color: '#3498db' }}></i> Measurement Details
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                margin: '20px 0'
              }}>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.unit === 'metric' 
                      ? `${results.measurements.height} cm`
                      : `${Math.floor(results.measurements.height / 12)}'${Math.round(results.measurements.height % 12)}"`
                    }
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Height</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.neck} {results.measurements.unit === 'metric' ? 'cm' : 'in'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Neck</div>
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {results.measurements.waist} {results.measurements.unit === 'metric' ? 'cm' : 'in'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Waist</div>
                </div>
                {results.measurements.hips && (
                  <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {results.measurements.hips} {results.measurements.unit === 'metric' ? 'cm' : 'in'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>Hips</div>
                  </div>
                )}
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Calculation Method:</strong> U.S. Navy Body Fat Formula</p>
                <p><strong>Gender:</strong> {results.measurements.gender === 'male' ? 'Male' : 'Female'}</p>
                <p><strong>Unit System:</strong> {results.measurements.unit === 'metric' ? 'Metric (cm)' : 'Imperial (inches)'}</p>
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
              onMouseEnter={(e) => e.currentTarget.style.background = '#219150'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#27ae60'}
            >
              <i className="fas fa-file-code"></i> Download HTML Report
            </button>
            
            <button
              style={{
                ...downloadButtonStyle,
                background: '#9b59b6'
              }}
              onClick={downloadText}
              onMouseEnter={(e) => e.currentTarget.style.background = '#8e44ad'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#9b59b6'}
            >
              <i className="fas fa-file-alt"></i> Download Text Report
            </button>
          </div>
        )}

        {/* Body Fat Scale Visualization */}
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
            <i className="fas fa-chart-line"></i> Body Fat Percentage Scale - Understanding Your Body Composition Category
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
            Visual representation of <strong>body fat distribution categories</strong> based on <strong>American Council on Exercise (ACE) standards</strong>:
          </p>
          <div style={{
            position: 'relative',
            height: '40px',
            background: 'linear-gradient(90deg, #3498db 0%, #3498db 10%, #27ae60 10%, #27ae60 25%, #2ecc71 25%, #2ecc71 40%, #f39c12 40%, #f39c12 70%, #e74c3c 70%, #e74c3c 100%)',
            borderRadius: '20px',
            margin: '20px 0'
          }}>
            {bodyFatResult && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                width: '4px',
                height: '60px',
                background: '#2c3e50',
                borderRadius: '2px',
                transform: 'translateX(-2px)',
                left: `${scalePosition}%`
              }}></div>
            )}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#7f8c8d',
            marginTop: '5px'
          }}>
            <span>Essential Fat</span>
            <span>Athlete</span>
            <span>Fitness</span>
            <span>Acceptable</span>
            <span>Obese</span>
          </div>
        </div>

        {/* Category Table */}
        <h3 style={{ 
          color: '#2c3e50', 
          marginBottom: '15px', 
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '30px'
        }}>
          <i className="fas fa-list-alt"></i> Body Fat Percentage Categories - American Council on Exercise (ACE) Standards
        </h3>
        
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
                Body Composition Category
              </th>
              <th style={{ 
                padding: '15px', 
                textAlign: 'left', 
                backgroundColor: '#2c3e50', 
                color: 'white', 
                fontWeight: '600'
              }}>
                Men (%)
              </th>
              <th style={{ 
                padding: '15px', 
                textAlign: 'left', 
                backgroundColor: '#2c3e50', 
                color: 'white', 
                fontWeight: '600'
              }}>
                Women (%)
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
            <tr style={{ color: '#3498db', fontWeight: 'bold', backgroundColor: '#ebf5fb' }}>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Essential Fat</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>2-5%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>10-13%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Minimum required for basic physiological function and hormone production</td>
            </tr>
            <tr style={{ color: '#27ae60', fontWeight: 'bold', backgroundColor: '#e8f5e9' }}>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Athletes</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>6-13%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>14-20%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Optimal for athletic performance and lean muscle definition</td>
            </tr>
            <tr style={{ color: '#2ecc71', fontWeight: 'bold', backgroundColor: '#eafaf1' }}>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Fitness</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>14-17%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>21-24%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Healthy range with good muscle tone and low disease risk</td>
            </tr>
            <tr style={{ color: '#f39c12', fontWeight: 'bold', backgroundColor: '#fef5e7' }}>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Acceptable/Average</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>18-24%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>25-31%</td>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Moderate health risks, may benefit from body composition improvement</td>
            </tr>
            <tr style={{ color: '#e74c3c', fontWeight: 'bold', backgroundColor: '#fdedec' }}>
              <td style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Obese/High Risk</td>
              <td style={{ padding: '15px', textAlign: 'left' }}>25%+</td>
              <td style={{ padding: '15px', textAlign: 'left' }}>32%+</td>
              <td style={{ padding: '15px', textAlign: 'left' }}>Increased risk of metabolic diseases, cardiovascular issues</td>
            </tr>
          </tbody>
        </table>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
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
    <i className="fas fa-calculator"></i> Comprehensive Body Fat Analysis Using Navy Method Circumference Measurements
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    The <strong>U.S. Navy Method body fat calculator</strong> represents a scientifically validated <strong>anthropometric measurement technique</strong> that provides remarkably accurate <strong>adipose tissue percentage estimation</strong> using simple circumference measurements. This <strong>non-invasive body composition assessment methodology</strong> has demonstrated <strong>clinical validation correlation coefficients exceeding 0.85</strong> when compared with expensive <strong>dual-energy X-ray absorptiometry (DEXA) scanning technology, BodPod air displacement plethysmography systems, and hydrostatic underwater weighing protocols</strong>. The <strong>circumference-based body fat calculation algorithm</strong> represents an accessible alternative for individuals seeking <strong>precise body composition tracking</strong> without requiring <strong>specialized medical equipment or professional assessment facilities</strong>.
  </p>

  <div style={{ 
    background: '#f1f3f5', 
    padding: '20px', 
    borderRadius: '10px', 
    fontFamily: "'Courier New', monospace", 
    textAlign: 'left', 
    margin: '20px 0', 
    fontSize: '0.95rem',
    borderLeft: '4px solid #27ae60',
    overflowX: 'auto'
  }}>
    <strong>Advanced U.S. Navy Body Fat Calculation Formulas with Scientific Validation:</strong><br/>
    <strong>For Adult Males (Age 17-60):</strong><br/>
    %BF = 495 / (1.0324 - 0.19077 × log₁₀(waist - neck) + 0.15456 × log₁₀(height)) - 450<br/><br/>
    <strong>For Adult Females (Age 17-60):</strong><br/>
    %BF = 495 / (1.29579 - 0.35004 × log₁₀(waist + hips - neck) + 0.22100 × log₁₀(height)) - 450<br/><br/>
    <strong>Clinical Accuracy Validation:</strong> ±3.0-4.5% compared to DEXA scanning gold standard methodology<br/>
    <strong>Population Validation:</strong> Developed from 6,000+ U.S. Navy personnel anthropometric measurements<br/>
    <strong>Measurement Precision:</strong> Requires standardized circumference measurement protocols for optimal accuracy
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
    <i className="fas fa-balance-scale"></i> Body Fat Percentage Versus Body Mass Index: Comprehensive Health Risk Assessment Comparison Analysis
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    <strong>Body fat percentage calculation methodology</strong> provides substantially superior <strong>health risk stratification insights</strong> compared to traditional <strong>Body Mass Index (BMI) weight-to-height ratio calculations</strong>. While <strong>BMI assessment algorithms</strong> simply evaluate <strong>height-weight proportionality relationships</strong>, sophisticated <strong>body composition analysis techniques</strong> differentiate between <strong>lean muscle tissue mass and adipose fat storage distribution patterns</strong>. This critical distinction becomes particularly important for multiple population subgroups requiring <strong>precise metabolic health evaluation protocols</strong>:
  </p>
  <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
    <li style={{ marginBottom: '10px' }}><strong>Muscular Athletic Individuals:</strong> Strength-trained athletes, bodybuilders, and physically active individuals often demonstrate <strong>elevated BMI classification due to increased lean body mass</strong> despite maintaining <strong>optimal body fat percentage ranges below 15% for men and 24% for women</strong></li>
       <li style={{ marginBottom: '10px' }}><strong>Metabolically Obese Normal Weight (MONW) Phenotype:</strong> Individuals exhibiting <strong>normal BMI ranges between 18.5-24.9 kg/m²</strong> but presenting <strong>excessively elevated body fat percentages exceeding 25% for men and 32% for women</strong>, creating significant <strong>metabolic syndrome risk despite normal weight classification</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Age-Related Sarcopenic Obesity Development:</strong> Older adults experiencing <strong>progressive lean muscle mass deterioration (sarcopenia)</strong> combined with <strong>gradual adipose tissue accumulation</strong> may maintain <strong>stable body weight measurements</strong> while undergoing <strong>detrimental body composition alterations</strong> requiring specialized assessment approaches</li>
    <li><strong>Comprehensive Fitness Progress Tracking:</strong> Individuals engaged in <strong>structured body recomposition programs</strong> involving simultaneous <strong>adipose tissue reduction and lean muscle preservation/growth</strong> require <strong>body fat percentage monitoring rather than simple weight measurement tracking</strong> for accurate progress evaluation</li>
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
    <i className="fas fa-heartbeat"></i> Comprehensive Health Risk Stratification Based on Body Fat Percentage Ranges and Metabolic Disease Correlation
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Understanding your specific <strong>body fat category classification according to American Council on Exercise standards</strong> enables precise <strong>health risk stratification and metabolic disease prevention planning</strong>:
  </p>
  <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
    <li style={{ marginBottom: '10px' }}><strong>Essential Fat Ranges (Men 2-5%, Women 10-13%):</strong> Represents the <strong>minimum adipose tissue requirement</strong> for <strong>hormone production regulation, fat-soluble vitamin absorption facilitation, and vital organ protection mechanisms</strong>. Levels below these ranges may indicate <strong>nutritional deficiency conditions, endocrine dysfunction, or excessive athletic training</strong> requiring medical evaluation</li>
    <li style={{ marginBottom: '10px' }}><strong>Athlete Performance Ranges (Men 6-13%, Women 14-20%):</strong> Associated with <strong>optimal athletic performance capacity, enhanced insulin sensitivity, superior cardiovascular efficiency, and rapid recovery capability</strong>. These ranges support <strong>competitive sports participation, endurance event completion, and high-intensity training adaptation</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Fitness Health Ranges (Men 14-17%, Women 21-24%):</strong> Represents the <strong>ideal body composition balance</strong> for <strong>general health maintenance, disease prevention optimization, and sustainable lifestyle management</strong>. Individuals within these ranges demonstrate <strong>minimal chronic disease risk, balanced hormone profiles, and optimal metabolic function</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Acceptable Average Ranges (Men 18-24%, Women 25-31%):</strong> Indicates <strong>moderately elevated health risks</strong> including <strong>metabolic syndrome development potential, cardiovascular disease predisposition, and insulin resistance initiation</strong>. Individuals in these ranges benefit significantly from <strong>structured body composition improvement programs and lifestyle modification interventions</strong></li>
    <li><strong>Obese High-Risk Ranges (Men 25%+, Women 32%+):</strong> Associated with <strong>significantly elevated morbidity and mortality risks</strong> including <strong>type 2 diabetes development, hypertension progression, dyslipidemia manifestation, certain cancer susceptibility, and osteoarthritis acceleration</strong>. These ranges necessitate <strong>comprehensive medical evaluation and evidence-based weight management intervention</strong></li>
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
    <i className="fas fa-chart-pie"></i> Advanced Fat Distribution Pattern Analysis: Visceral versus Subcutaneous Adipose Tissue Health Implications
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    The <strong>specific anatomical location of body fat accumulation</strong> significantly influences <strong>metabolic health risk assessment and disease prevention strategies</strong>:
  </p>
  <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
    <li style={{ marginBottom: '10px' }}><strong>Visceral (Intra-Abdominal) Adipose Tissue:</strong> Fat stored <strong>within the abdominal cavity surrounding internal organs</strong> represents the <strong>most metabolically active and dangerous fat type</strong>. Visceral fat secretes <strong>pro-inflammatory cytokines, increases insulin resistance, elevates blood pressure, and promotes atherosclerosis development</strong>. Measurement techniques focusing on <strong>waist circumference assessment</strong> help estimate visceral fat accumulation</li>
    <li style={{ marginBottom: '10px' }}><strong>Subcutaneous (Beneath Skin) Adipose Tissue:</strong> Fat located <strong>directly beneath the skin surface throughout the body</strong> demonstrates <strong>reduced metabolic activity compared to visceral fat</strong>. While excessive subcutaneous fat contributes to <strong>overall obesity classification</strong>, it presents <strong>lower cardiovascular disease risk</strong> than equivalent amounts of visceral adipose tissue</li>
    <li style={{ marginBottom: '10px' }}><strong>Gynoid (Pear-Shaped) Fat Distribution Pattern:</strong> Characterized by <strong>predominant fat accumulation in hip and thigh regions</strong>, commonly observed in <strong>premenopausal women due to estrogen influence</strong>. This distribution pattern associates with <strong>reduced metabolic disease risk</strong> compared to abdominal fat accumulation, though excessive levels still contribute to <strong>musculoskeletal strain and mobility limitation</strong></li>
    <li><strong>Android (Apple-Shaped) Fat Distribution Pattern:</strong> Marked by <strong>concentrated fat storage in abdominal and upper body regions</strong>, frequently observed in <strong>men and postmenopausal women</strong>. This pattern correlates strongly with <strong>elevated metabolic syndrome risk, cardiovascular disease development, and type 2 diabetes incidence</strong>, making waist circumference measurement particularly important for risk assessment</li>
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
    <i className="fas fa-tape"></i> Critical Factors Influencing Navy Method Body Fat Calculation Accuracy and Measurement Protocol Optimization
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Multiple variables can affect the <strong>precision and reliability of Navy Method body fat percentage calculations</strong>, requiring awareness for proper interpretation:
  </p>
  <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
    <li style={{ marginBottom: '10px' }}><strong>Measurement Technique Consistency Requirements:</strong> <strong>Tape measure placement accuracy, consistent tension application, and anatomical landmark identification precision</strong> significantly impact circumference measurement reliability. Standardized protocols recommend <strong>duplicate measurements within 0.5 cm agreement</strong> for optimal accuracy</li>
    <li style={{ marginBottom: '10px' }}><strong>Individual Body Type Variation Considerations:</strong> Unique <strong>muscle insertion patterns, skeletal structure differences, and genetic fat distribution tendencies</strong> create individual variability in <strong>circumference-to-body-fat relationships</strong>. The Navy Method demonstrates <strong>highest accuracy for average body types</strong> with reduced precision for extreme physiques</li>
    <li style={{ marginBottom: '10px' }}><strong>Demographic and Ethnic Specificity Factors:</strong> Research indicates <strong>population-specific variations in body composition norms</strong> requiring consideration during interpretation. Certain ethnic groups demonstrate <strong>different fat distribution patterns and metabolic risk thresholds</strong> that may influence classification accuracy</li>
    <li style={{ marginBottom: '10px' }}><strong>Physiological State Fluctuation Impacts:</strong> <strong>Hydration status variations, menstrual cycle hormonal changes, sodium intake fluctuations, and recent exercise effects</strong> can temporarily alter <strong>circumference measurements</strong> without reflecting actual body composition changes. Consistent measurement timing minimizes these confounding factors</li>
    <li><strong>Training Status and Muscle Development Effects:</strong> Highly trained athletes with <strong>significant muscular hypertrophy</strong> may experience <strong>circumference measurement inflation</strong> that overestimates actual body fat percentage. These individuals benefit from <strong>complementary assessment methods</strong> for accurate body composition evaluation</li>
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
    <i className="fas fa-dumbbell"></i> Evidence-Based Strategies for Healthy Body Fat Reduction and Sustainable Body Composition Optimization
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    For individuals classified in <strong>"Acceptable" or "Obese" body fat categories</strong>, implementing comprehensive evidence-based strategies can facilitate <strong>safe adipose tissue reduction and long-term body composition improvement</strong>:
  </p>
  <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
    <li style={{ marginBottom: '10px' }}><strong>Moderate Calorie Deficit Implementation:</strong> Establishing a <strong>sustainable 500-750 calorie daily energy deficit</strong> supports <strong>gradual fat loss of 1-1.5 pounds weekly</strong> while minimizing <strong>lean muscle mass catabolism and metabolic adaptation resistance</strong>. Extreme calorie restriction often triggers <strong>adaptive thermogenesis and subsequent weight regain</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Progressive Resistance Training Emphasis:</strong> Incorporating <strong>structured strength training protocols 3-4 times weekly</strong> preserves <strong>lean body mass during weight loss</strong>, maintains <strong>resting metabolic rate efficiency</strong>, and enhances <strong>insulin sensitivity and glucose metabolism optimization</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Optimal Protein Intake Prioritization:</strong> Consuming <strong>1.6-2.2 grams of high-quality protein per kilogram of body weight daily</strong> supports <strong>muscle protein synthesis stimulation, satiety hormone regulation, and thermic effect of food maximization</strong>. Protein distribution across 3-4 meals enhances <strong>muscle preservation effectiveness</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Strategic Cardiovascular Exercise Integration:</strong> Performing <strong>150-300 minutes of moderate-intensity aerobic activity weekly</strong>, combined with <strong>high-intensity interval training sessions</strong>, optimizes <strong>fat oxidation capacity and cardiovascular health improvement</strong> while complementing resistance training adaptations</li>
    <li style={{ marginBottom: '10px' }}><strong>Sleep Quality and Duration Optimization:</strong> Ensuring <strong>7-9 hours of quality sleep nightly</strong> regulates <strong>appetite hormones (leptin and ghrelin), cortisol secretion patterns, and growth hormone release</strong>—all critical factors influencing <strong>body fat regulation and metabolic health maintenance</strong></li>
    <li><strong>Comprehensive Stress Management Implementation:</strong> Utilizing <strong>mindfulness meditation techniques, deep breathing exercises, and relaxation practices</strong> reduces <strong>chronic cortisol elevation</strong> that promotes <strong>visceral fat accumulation, insulin resistance development, and emotional eating behaviors</strong></li>
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
    <i className="fas fa-stethoscope"></i> Clinical Indications for Professional Body Composition Assessment and Advanced Diagnostic Testing
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    While the <strong>Navy Method provides valuable screening estimates</strong>, specific clinical scenarios warrant <strong>professional body composition evaluation using advanced diagnostic technologies</strong>:
  </p>
  <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
    <li style={{ marginBottom: '10px' }}><strong>Competitive Athletic Performance Optimization:</strong> Elite athletes requiring <strong>precise body composition measurements</strong> for <strong>performance enhancement, weight class management, and training adaptation monitoring</strong> benefit from <strong>DEXA scanning, BodPod assessment, or hydrostatic weighing protocols</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Medical Weight Management Program Participation:</strong> Individuals with <strong>obesity-related comorbidities including type 2 diabetes, cardiovascular disease, or metabolic syndrome</strong> require <strong>clinical monitoring and precise body composition tracking</strong> for <strong>treatment efficacy evaluation and risk stratification refinement</strong></li>
    <li style={{ marginBottom: '10px' }}><strong>Body Recomposition Program Implementation:</strong> Individuals pursuing simultaneous <strong>fat loss and muscle gain objectives</strong> need <strong>accurate differentiation between adipose tissue reduction and lean mass changes</strong> that exceeds circumference method capabilities</li>
    <li><strong>Metabolic Disorder Management and Monitoring:</strong> Patients with conditions affecting body composition including <strong>polycystic ovary syndrome (PCOS), thyroid dysfunction, Cushing's syndrome, or growth hormone abnormalities</strong> benefit from <strong>comprehensive assessment integrating multiple measurement modalities</strong></li>
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
    <i className="fas fa-chart-bar"></i> Long-Term Health Benefits Associated with Optimal Body Fat Percentage Maintenance and Metabolic Disease Prevention
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Sustaining <strong>healthy body fat percentage ranges within fitness category parameters</strong> provides extensive <strong>long-term health advantages extending beyond aesthetic considerations</strong> to encompass comprehensive <strong>disease prevention, functional capacity preservation, and quality of life enhancement</strong> throughout the lifespan.
  </p>

  <h4 style={{ 
    color: '#2c3e50', 
    marginBottom: '10px', 
    fontSize: '1.1rem',
    marginTop: '20px'
  }}>
    Metabolic Health Optimization and Type 2 Diabetes Prevention
  </h4>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Maintaining <strong>body fat percentages within evidence-based fitness ranges</strong> substantially enhances <strong>insulin sensitivity improvement and glucose metabolism optimization</strong>, reducing <strong>type 2 diabetes development risk by 60-70%</strong> compared to individuals with elevated body fat percentages. Proper <strong>adipose tissue regulation</strong> supports balanced production of key hormones including <strong>leptin for appetite control, adiponectin for insulin sensitivity enhancement, and cortisol for stress response modulation</strong>—all critical for <strong>metabolic homeostasis maintenance and energy balance regulation</strong>.
  </p>

  <h4 style={{ 
    color: '#2c3e50', 
    marginBottom: '10px', 
    fontSize: '1.1rem'
  }}>
    Cardiovascular Disease Risk Reduction and Arterial Health Preservation
  </h4>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Each percentage point reduction in <strong>excess body fat accumulation</strong> correlates with measurable improvements in <strong>blood pressure regulation, lipid profile optimization, and endothelial function enhancement</strong>. Individuals maintaining <strong>optimal body composition metrics</strong> demonstrate superior <strong>vascular reactivity and reduced systemic inflammation</strong>, key protective factors against <strong>atherosclerosis development, coronary artery disease progression, and cardiovascular event incidence</strong>.
  </p>

  <h4 style={{ 
    color: '#2c3e50', 
    marginBottom: '10px', 
    fontSize: '1.1rem'
  }}>
    Musculoskeletal Health Maintenance and Osteoarthritis Prevention
  </h4>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Optimal <strong>body fat distribution combined with adequate lean muscle mass preservation</strong> significantly reduces <strong>osteoarthritis development risk</strong> by minimizing <strong>joint loading stress and inflammatory cytokine production</strong>. Maintaining <strong>appropriate muscle-to-fat ratios</strong> supports <strong>bone mineral density preservation</strong>, particularly crucial for preventing <strong>osteoporosis progression in postmenopausal women and aging populations</strong>.
  </p>

  <h4 style={{ 
    color: '#2c3e50', 
    marginBottom: '10px', 
    fontSize: '1.1rem'
  }}>
    Cancer Risk Mitigation and Tumor Development Prevention
  </h4>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Extensive epidemiological research establishes compelling connections between <strong>excess body fat accumulation</strong> and increased risks for various malignancies including <strong>breast cancer, colorectal cancer, endometrial cancer, pancreatic cancer, and renal cell carcinoma</strong>. <strong>Adipose tissue reduction</strong> decreases circulating levels of <strong>estrogen, insulin, insulin-like growth factors, and pro-inflammatory cytokines</strong> that promote <strong>cancerous cell proliferation, angiogenesis stimulation, and tumor progression acceleration</strong>.
  </p>

  <h4 style={{ 
    color: '#2c3e50', 
    marginBottom: '10px', 
    fontSize: '1.1rem'
  }}>
    Cognitive Function Enhancement and Mental Health Optimization
  </h4>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Emerging neuroscience research reveals significant connections between <strong>healthy body composition maintenance</strong> and improved <strong>cognitive performance metrics, mood regulation stability, and depression/anxiety risk reduction</strong>. The <strong>neuroprotective effects of regular physical activity and balanced nutrition</strong> that support <strong>optimal body fat management</strong> contribute to enhanced <strong>brain-derived neurotrophic factor (BDNF) production</strong>, supporting <strong>neuroplasticity, synaptic connectivity, and mental resilience throughout adulthood and aging</strong>.
  </p>

  <h4 style={{ 
    color: '#2c3e50', 
    marginBottom: '10px', 
    fontSize: '1.1rem'
  }}>
    Longevity Extension and Healthspan Enhancement
  </h4>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Longitudinal population studies consistently demonstrate that individuals maintaining <strong>fitness-level body fat percentages</strong> experience increased <strong>healthspan duration and reduced all-cause mortality rates</strong>. Beyond lifespan extension, proper <strong>body composition management</strong> significantly enhances <strong>physical functioning capacity, mobility independence, and daily activity performance</strong> in later life stages, supporting <strong>active aging paradigms and sustained quality of life metrics</strong>.
  </p>

  <h4 style={{ 
    color: '#2c3e50', 
    marginBottom: '10px', 
    fontSize: '1.1rem'
  }}>
    Practical Implementation Strategies for Sustainable Body Composition Management
  </h4>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Achieving and maintaining <strong>optimal body fat percentage ranges</strong> requires consistent implementation of <strong>evidence-based lifestyle practices and behavioral modification techniques</strong>. Successful <strong>body composition management programs</strong> involve creating <strong>personalized nutrition protocols, structured exercise regimens, sleep optimization strategies, and stress reduction approaches</strong> tailored to individual <strong>physiological characteristics, psychological preferences, and environmental constraints</strong>. Regular <strong>body fat percentage monitoring</strong> using validated methods like the <strong>Navy circumference technique</strong> provides <strong>objective feedback for strategy adjustment and motivation maintenance</strong> throughout the <strong>health optimization journey and lifelong wellness commitment</strong>.
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
    <i className="fas fa-notes-medical"></i> Clinical Integration of Body Fat Assessment in Modern Healthcare Delivery Systems
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Contemporary <strong>healthcare providers and wellness practitioners</strong> increasingly incorporate <strong>comprehensive body composition assessment protocols</strong> into routine patient evaluations for enhanced <strong>health risk stratification accuracy and personalized intervention planning precision</strong>. In diverse <strong>clinical practice environments</strong>, understanding detailed <strong>body fat distribution patterns and adipose tissue characteristics</strong> informs critical decisions regarding <strong>pharmacological dosing adjustments, surgical risk evaluation frameworks, rehabilitation protocol development, and chronic disease management strategies</strong>. The <strong>validated U.S. Navy Method calculation system</strong> represents a practical, cost-effective <strong>screening tool implementation</strong> that can be efficiently deployed across <strong>primary care settings, sports medicine clinics, corporate wellness programs, and community health initiatives</strong> to identify at-risk individuals requiring <strong>comprehensive metabolic health evaluation or targeted lifestyle intervention programming</strong>.
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
    <i className="fas fa-flask"></i> Research Advancements in Body Composition Science and Future Technological Developments
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    Ongoing <strong>scientific research initiatives and technological innovation projects</strong> continue refining our understanding of <strong>optimal body fat distribution patterns</strong> and their complex relationships with <strong>long-term health outcomes and disease prevention efficacy</strong>. Emerging technologies including <strong>advanced bioelectrical impedance analysis (BIA) devices with multi-frequency capabilities, precision dual-energy X-ray absorptiometry (DEXA) scanning systems, three-dimensional body imaging technologies, and artificial intelligence-powered body composition prediction algorithms</strong> provide increasingly accurate measurements of <strong>adipose tissue distribution characteristics, lean body mass composition, and metabolic health indicators</strong>. Future developments in <strong>wearable sensor technologies, smartphone application integrations, and machine learning analytical platforms</strong> promise to make <strong>continuous body composition monitoring and real-time metabolic feedback</strong> more accessible for individuals pursuing <strong>personalized health optimization and data-driven lifestyle modification programs</strong>.
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
    <i className="fas fa-handshake"></i> Holistic Health Monitoring Integration and Comprehensive Wellness Program Implementation
  </h3>
  <p style={{ 
    fontSize: '0.95rem', 
    color: '#555', 
    marginBottom: '15px', 
    lineHeight: '1.7'
  }}>
    <strong>Body fat percentage tracking and monitoring</strong> represents a foundational component within comprehensive <strong>health and fitness assessment protocols</strong> that should integrate with evaluation of complementary metrics including <strong>cardiovascular fitness capacity, muscular strength and endurance capabilities, flexibility and balance measurements, and metabolic health marker analysis</strong>. Combining <strong>detailed body composition data</strong> with assessments of <strong>blood pressure regulation, lipid profile characteristics, blood glucose control, inflammatory marker levels, and genetic predisposition factors</strong> provides a multidimensional understanding of an individual's <strong>overall health status and disease risk profile</strong>. This integrative approach enables more effective <strong>personalized health coaching strategies and targeted lifestyle intervention development</strong> that addresses multiple wellness dimensions simultaneously for optimal <strong>preventive health outcomes, chronic disease risk reduction, and quality of life enhancement</strong> across diverse populations and life stages.
  </p>
</div>

        {/* FAQ Section */}
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
            <i className="fas fa-question-circle"></i> Frequently Asked Questions About Body Fat Percentage Measurement
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

      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) + Related Calculators */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Try our premium fitness tracking app</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>High-quality body fat calipers on sale</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Join our personalized coaching program</p>
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
                      e.currentTarget.style.background = '#27ae60';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(39, 174, 96, 0.2)';
                      e.currentTarget.style.borderColor = '#27ae60';
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
                      background: calculator.relevance >= 9 ? '#27ae60' : calculator.relevance >= 8 ? '#3498db' : '#f39c12',
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