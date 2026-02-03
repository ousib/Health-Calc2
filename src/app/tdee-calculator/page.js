// src/app/tdee/page.js
"use client"; // This is required for interactivity

import { useState, useEffect } from 'react';

export default function TDEEPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('180');
  const [activity, setActivity] = useState('1.55');
  const [fitnessGoal, setFitnessGoal] = useState('loss');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  // Container style
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
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };
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
        calculateTDEE();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setResults(null);
  };

  const selectGoal = (goal) => {
    setFitnessGoal(goal);
    setResults(null);
  };

  const calculateTDEE = () => {
    const ageValue = parseFloat(age);
    let weightValue = parseFloat(weight);
    let heightValue = parseFloat(height);
    const activityValue = parseFloat(activity);

    // Validate inputs
    if (!ageValue || !weightValue || !heightValue || ageValue <= 0 || weightValue <= 0 || heightValue <= 0) {
      alert('Please enter valid age, height, and weight values.');
      return;
    }

    // Convert imperial to metric if needed
    if (currentUnit === 'imperial') {
      weightValue = weightValue * 0.453592;
      heightValue = heightValue * 2.54;
    }

    // Calculate BMR using Mifflin-St Jeor
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightValue) + (6.25 * heightValue) - (5 * ageValue) + 5;
    } else {
      bmr = (10 * weightValue) + (6.25 * heightValue) - (5 * ageValue) - 161;
    }

    // Calculate TDEE
    const tdee = Math.round(bmr * activityValue);

    // Calculate goal-specific calories
    let lossCalories = tdee - 500;
    let maintenanceCalories = tdee;
    let gainCalories = tdee + 300;

    // Calculate macros based on goal
    let proteinPercent, carbsPercent, fatPercent;
    let goalName;

    switch (fitnessGoal) {
      case 'loss':
        proteinPercent = 0.35;
        carbsPercent = 0.40;
        fatPercent = 0.25;
        goalName = 'Weight Loss';
        break;
      case 'maintenance':
        proteinPercent = 0.30;
        carbsPercent = 0.45;
        fatPercent = 0.25;
        goalName = 'Maintenance';
        break;
      case 'gain':
        proteinPercent = 0.30;
        carbsPercent = 0.50;
        fatPercent = 0.20;
        goalName = 'Muscle Gain';
        break;
    }

    // Calculate goal-specific calories for macros
    const goalCalories = fitnessGoal === 'loss' ? lossCalories :
      fitnessGoal === 'maintenance' ? maintenanceCalories : gainCalories;

    // Calculate macronutrient grams
    const proteinGrams = Math.round((goalCalories * proteinPercent) / 4);
    const carbsGrams = Math.round((goalCalories * carbsPercent) / 4);
    const fatGrams = Math.round((goalCalories * fatPercent) / 9);

    setResults({
      tdee: tdee,
      bmr: Math.round(bmr),
      lossCalories: lossCalories,
      maintenanceCalories: maintenanceCalories,
      gainCalories: gainCalories,
      proteinGrams: proteinGrams,
      carbsGrams: carbsGrams,
      fatGrams: fatGrams,
      proteinPercent: Math.round(proteinPercent * 100),
      carbsPercent: Math.round(carbsPercent * 100),
      fatPercent: Math.round(fatPercent * 100),
      goalName: goalName,
      measurements: {
        age: ageValue,
        weight: weightValue,
        height: heightValue,
        unit: currentUnit,
        gender: gender,
        activity: activityValue
      },
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
    setShowShareMenu(false);
  };

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate TDEE first before sharing.');
      return;
    }

    const shareText = `My TDEE is ${results.tdee} calories - Check your Total Daily Energy Expenditure using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'TDEE,Fitness,Nutrition,Health,Macros';

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
        shareUrlFull = `mailto:?subject=My TDEE Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My TDEE Results',
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
      alert('Please calculate TDEE first before downloading.');
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
    <title>TDEE Calculator Results</title>
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
        
        .tdee-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: #27ae60;
        }
        
        .calorie-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .calorie-card {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;
        }
        
        .calorie-value {
            font-size: 1.8rem;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .loss-value { color: #e74c3c; }
        .maintenance-value { color: #27ae60; }
        .gain-value { color: #f39c12; }
        
        .macro-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .macro-card {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;
        }
        
        .macro-value {
            font-size: 1.8rem;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .protein-value { color: #3498db; }
        .carbs-value { color: #e74c3c; }
        .fat-value { color: #f39c12; }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
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
            <h1><i class="fas fa-fire"></i> TDEE Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Main Results Card -->
            <div class="result-card" style="border-top-color: #27ae60;">
                <h3 class="card-title"><i class="fas fa-fire" style="color: #27ae60;"></i> Total Daily Energy Expenditure</h3>
                <div class="tdee-value">${results.tdee.toLocaleString()} kcal</div>
                <div class="info-box">
                    <p><strong>BMR (Basal Metabolic Rate):</strong> ${results.bmr.toLocaleString()} kcal</p>
                    <p><strong>Activity Level:</strong> ${results.measurements.activity} (${getActivityName(results.measurements.activity)})</p>
                    <p><strong>Goal:</strong> ${results.goalName}</p>
                </div>
            </div>
            
            <!-- Calorie Goals Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-bullseye" style="color: #3498db;"></i> Calorie Goals</h3>
                <div class="calorie-grid">
                    <div class="calorie-card">
                        <div class="calorie-value loss-value">${results.lossCalories.toLocaleString()} kcal</div>
                        <div style="font-size: 0.85rem; color: #666;">Weight Loss</div>
                    </div>
                    <div class="calorie-card">
                        <div class="calorie-value maintenance-value">${results.maintenanceCalories.toLocaleString()} kcal</div>
                        <div style="font-size: 0.85rem; color: #666;">Maintenance</div>
                    </div>
                    <div class="calorie-card">
                        <div class="calorie-value gain-value">${results.gainCalories.toLocaleString()} kcal</div>
                        <div style="font-size: 0.85rem; color: #666;">Muscle Gain</div>
                    </div>
                </div>
                <div class="info-box">
                    <p><strong>Note:</strong> Weight loss targets a 500-calorie deficit, muscle gain targets a 300-calorie surplus</p>
                </div>
            </div>
            
            <!-- Macronutrients Card -->
            <div class="result-card" style="border-top-color: #f39c12;">
                <h3 class="card-title"><i class="fas fa-utensils" style="color: #f39c12;"></i> Macronutrient Recommendations</h3>
                <div class="macro-grid">
                    <div class="macro-card">
                        <div class="macro-value protein-value">${results.proteinGrams.toLocaleString()}g</div>
                        <div style="font-size: 0.85rem; color: #666;">Protein</div>
                        <div style="font-size: 0.8rem; color: #666;">(${results.proteinPercent}%)</div>
                    </div>
                    <div class="macro-card">
                        <div class="macro-value carbs-value">${results.carbsGrams.toLocaleString()}g</div>
                        <div style="font-size: 0.85rem; color: #666;">Carbohydrates</div>
                        <div style="font-size: 0.8rem; color: #666;">(${results.carbsPercent}%)</div>
                    </div>
                    <div class="macro-card">
                        <div class="macro-value fat-value">${results.fatGrams.toLocaleString()}g</div>
                        <div style="font-size: 0.85rem; color: #666;">Fat</div>
                        <div style="font-size: 0.8rem; color: #666;">(${results.fatPercent}%)</div>
                    </div>
                </div>
                <div class="info-box">
                    <p><strong>Total Calories:</strong> ${fitnessGoal === 'loss' ? results.lossCalories : fitnessGoal === 'maintenance' ? results.maintenanceCalories : results.gainCalories} kcal</p>
                    <p><strong>Calculation:</strong> 4 kcal/g protein & carbs, 9 kcal/g fat</p>
                </div>
            </div>
            
            <!-- Personal Information Card -->
            <div class="result-card" style="border-top-color: #9b59b6;">
                <h3 class="card-title"><i class="fas fa-user" style="color: #9b59b6;"></i> Personal Information</h3>
                <div class="info-box">
                    <p><strong>Age:</strong> ${results.measurements.age} years</p>
                    <p><strong>Gender:</strong> ${results.measurements.gender === 'male' ? 'Male' : 'Female'}</p>
                    <p><strong>Weight:</strong> ${results.measurements.weight.toFixed(1)} kg</p>
                    <p><strong>Height:</strong> ${results.measurements.height.toFixed(1)} cm</p>
                    <p><strong>Unit System:</strong> ${results.measurements.unit === 'metric' ? 'Metric' : 'Imperial'}</p>
                    <p><strong>Calculation Method:</strong> Mifflin-St Jeor Equation</p>
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This TDEE calculation is for informational purposes only. The Mifflin-St Jeor equation provides estimates that may vary by ±10% from individual metabolic rates. Calorie and macronutrient recommendations should be adjusted based on individual response, activity level changes, and health conditions. Always consult with healthcare professionals for personalized nutrition advice.</p>
        </div>
        
        <div class="footer">
            <p>Generated by TDEE Calculator • ${window.location.href}</p>
            <p style="margin-top: 10px; font-size: 0.8rem;">This report was generated on ${date} at ${time}</p>
        </div>
    </div>
</body>
</html>`;

    // Helper function for activity name
    function getActivityName(value) {
      const activities = {
        '1.2': 'Sedentary',
        '1.375': 'Lightly Active',
        '1.55': 'Moderately Active',
        '1.725': 'Very Active',
        '1.9': 'Extra Active'
      };
      return activities[value] || 'Unknown';
    }

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tdee-results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download as text file
  const downloadText = () => {
    if (!results) {
      alert('Please calculate TDEE first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                         TDEE CALCULATOR RESULTS                            ║\n`;
    content += `║                    Generated: ${date} at ${time}                   ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    // Main Results
    content += `TOTAL DAILY ENERGY EXPENDITURE:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  TDEE: ${results.tdee.toLocaleString()} calories/day\n`;
    content += `  BMR (Basal Metabolic Rate): ${results.bmr.toLocaleString()} calories/day\n`;
    content += `  Activity Level: ${results.measurements.activity} (${getActivityName(results.measurements.activity)})\n`;
    content += `  Goal: ${results.goalName}\n\n`;
    
    // Calorie Goals
    content += `CALORIE GOALS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Weight Loss: ${results.lossCalories.toLocaleString()} calories/day (500-calorie deficit)\n`;
    content += `  Maintenance: ${results.maintenanceCalories.toLocaleString()} calories/day\n`;
    content += `  Muscle Gain: ${results.gainCalories.toLocaleString()} calories/day (300-calorie surplus)\n\n`;
    
    // Macronutrients
    content += `MACRONUTRIENT RECOMMENDATIONS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Protein: ${results.proteinGrams.toLocaleString()}g (${results.proteinPercent}%)\n`;
    content += `  Carbohydrates: ${results.carbsGrams.toLocaleString()}g (${results.carbsPercent}%)\n`;
    content += `  Fat: ${results.fatGrams.toLocaleString()}g (${results.fatPercent}%)\n`;
    content += `  Total Calories: ${fitnessGoal === 'loss' ? results.lossCalories : fitnessGoal === 'maintenance' ? results.maintenanceCalories : results.gainCalories} kcal\n\n`;
    
    // Personal Information
    content += `PERSONAL INFORMATION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Age: ${results.measurements.age} years\n`;
    content += `  Gender: ${results.measurements.gender === 'male' ? 'Male' : 'Female'}\n`;
    content += `  Weight: ${results.measurements.weight.toFixed(1)} kg\n`;
    content += `  Height: ${results.measurements.height.toFixed(1)} cm\n`;
    content += `  Unit System: ${results.measurements.unit === 'metric' ? 'Metric' : 'Imperial'}\n`;
    content += `  Calculation Method: Mifflin-St Jeor Equation\n\n`;
    
    // Disclaimer
    content += `IMPORTANT MEDICAL DISCLAIMER:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `This TDEE calculation is for informational purposes only. The Mifflin-St Jeor\n`;
    content += `equation provides estimates that may vary by ±10% from individual metabolic\n`;
    content += `rates. Calorie and macronutrient recommendations should be adjusted based on\n`;
    content += `individual response, activity level changes, and health conditions. Always\n`;
    content += `consult with healthcare professionals for personalized nutrition advice.\n\n`;
    content += `Generated by TDEE Calculator\n`;
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
    a.download = `tdee-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Helper function for activity name
  const getActivityName = (value) => {
    const activities = {
      '1.2': 'Sedentary',
      '1.375': 'Lightly Active',
      '1.55': 'Moderately Active',
      '1.725': 'Very Active',
      '1.9': 'Extra Active'
    };
    return activities[value] || 'Unknown';
  };

  // Health calculators sorted by SEO relevance
  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 10 },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 10 },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 9 },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 9 },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator", relevance: 8 },
    { name: "Waist Hip Ratio", link: "/waist-hip-ratio", relevance: 8 },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 7 },
    { name: "BSA Calculator", link: "/bsa-calculator", relevance: 7 },
    { name: "LBM Calculator", link: "/lbm-calculator", relevance: 6 },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 6 },
    { name: "Ovulation Tracker", link: "/ovulation-tracker", relevance: 5 },
    { name: "Pregnancy Due Date Calculator", link: "/pregnancy-due-date-calculator", relevance: 5 },
    { name: "GFR Calculator", link: "/gfr-calculator", relevance: 5 },
    { name: "Creatinine Clearance", link: "/creatinine-clearance", relevance: 4 },
    { name: "Fluid Requirement", link: "/fluid-requirement", relevance: 4 },
    { name: "Medication Dosage", link: "/medication-dosage", relevance: 4 },
    { name: "Electrolyte Correction", link: "/electrolyte-correction", relevance: 3 },
    { name: "Nutritional Needs", link: "/nutritional-needs", relevance: 3 },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator", relevance: 3 },
    { name: "Pregnancy Weight Gain Calculator", link: "/pregnancy-weight-gain-calculator", relevance: 3 },
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator", relevance: 2 },
    { name: "Safe Period Calculator", link: "/safe-period-calculator", relevance: 2 },
    { name: "Period Cycle Calculator", link: "/period-cycle-calculator", relevance: 2 },
    { name: "Blood Pressure Category Calculator", link: "/blood-pressure-category-calculator", relevance: 2 },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 2 },
    { name: "Heart Disease Risk Calculator", link: "/heart-disease-risk-calculator", relevance: 2 },
    { name: "Carbohydrate Intake Calculator", link: "/carbohydrate-intake-calculator", relevance: 1 },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator", relevance: 1 },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator", relevance: 1 },
    { name: "Pregnancy Test", link: "/pregnancy-test", relevance: 1 },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker", relevance: 1 }
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
          <i className="fas fa-fire"></i> TDEE & Macro Calculator - Total Daily Energy Expenditure Analysis
        </h1>
        
        <p style={{ 
          marginBottom: '25px', 
          fontSize: 'clamp(0.95rem, 2vw, 1rem)', 
          color: '#666',
          lineHeight: '1.6'
        }}>
          Calculate your <strong>Total Daily Energy Expenditure (TDEE)</strong> using the scientifically validated <strong>Mifflin-St Jeor equation</strong>. Discover personalized <strong>calorie intake targets</strong> for <strong>weight loss optimization, muscle building protocols, or weight maintenance strategies</strong> with evidence-based <strong>macronutrient distribution recommendations</strong>.
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
            Metric (kg/cm)
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
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years)</label>
            <input 
              type="number" 
              placeholder="30" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="15" 
              max="80" 
              step="1"
              style={inputStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> 
              {currentUnit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
            </label>
            <input 
              type="number" 
              placeholder={currentUnit === 'metric' ? '75' : '165'}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="30" 
              max="300" 
              step="0.1"
              style={inputStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> 
              {currentUnit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
            </label>
            <input 
              type="number" 
              placeholder={currentUnit === 'metric' ? '180' : '71'}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="100" 
              max="250" 
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Activity Level</label>
          <select 
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            style={selectStyle}
          >
            <option value="1.2">Sedentary (Office job, little exercise)</option>
            <option value="1.375">Lightly Active (1-3 days/week)</option>
            <option value="1.55">Moderately Active (3-5 days/week)</option>
            <option value="1.725">Very Active (6-7 days/week)</option>
            <option value="1.9">Extra Active (Athlete/Physical Job)</option>
          </select>
        </div>

        {/* Goal Selection */}
        <div style={{ 
          margin: '20px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px'
        }}>
          <label style={inputGroupLabelStyle}><i className="fas fa-bullseye"></i> Select Your Goal</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
            <button 
              style={{
                padding: '10px 20px',
                background: fitnessGoal === 'loss' ? '#27ae60' : '#e9ecef',
                color: fitnessGoal === 'loss' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: fitnessGoal === 'loss' ? '600' : '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectGoal('loss')}
            >
              <i className="fas fa-weight-loss"></i> Weight Loss
            </button>
            <button 
              style={{
                padding: '10px 20px',
                background: fitnessGoal === 'maintenance' ? '#27ae60' : '#e9ecef',
                color: fitnessGoal === 'maintenance' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: fitnessGoal === 'maintenance' ? '600' : '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectGoal('maintenance')}
            >
              <i className="fas fa-balance-scale"></i> Maintenance
            </button>
            <button 
              style={{
                padding: '10px 20px',
                background: fitnessGoal === 'gain' ? '#27ae60' : '#e9ecef',
                color: fitnessGoal === 'gain' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: fitnessGoal === 'gain' ? '600' : '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectGoal('gain')}
            >
              <i className="fas fa-dumbbell"></i> Muscle Gain
            </button>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateTDEE}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate My TDEE & Macros
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            {/* Main TDEE Result */}
            <div style={{ ...resultCardStyle, borderTopColor: '#27ae60' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '20px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-fire" style={{ color: '#27ae60' }}></i> Total Daily Energy Expenditure
              </h4>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                margin: '15px 0',
                textAlign: 'center',
                color: '#27ae60'
              }}>
                {results.tdee.toLocaleString()} kcal
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>BMR (Basal Metabolic Rate):</strong> {results.bmr.toLocaleString()} kcal</p>
                <p><strong>Activity Level:</strong> {results.measurements.activity} ({getActivityName(results.measurements.activity)})</p>
                <p><strong>Goal:</strong> {results.goalName}</p>
              </div>
            </div>

            {/* Calorie Goals */}
            <div style={{ ...resultCardStyle, borderTopColor: '#3498db' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '20px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-bullseye" style={{ color: '#3498db' }}></i> Calorie Goals
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                margin: '20px 0'
              }}>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0', color: '#e74c3c' }}>
                    {results.lossCalories.toLocaleString()} kcal
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Weight Loss</div>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0', color: '#27ae60' }}>
                    {results.maintenanceCalories.toLocaleString()} kcal
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Maintenance</div>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0', color: '#f39c12' }}>
                    {results.gainCalories.toLocaleString()} kcal
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Muscle Gain</div>
                </div>
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#e8f5e9',
                borderRadius: '8px',
                margin: '15px 0',
                borderLeft: '4px solid #27ae60'
              }}>
                <p><strong>Note:</strong> Weight loss targets a 500-calorie deficit, muscle gain targets a 300-calorie surplus</p>
              </div>
            </div>

            {/* Macronutrients */}
            <div style={{ ...resultCardStyle, borderTopColor: '#f39c12' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '20px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-utensils" style={{ color: '#f39c12' }}></i> Macronutrient Recommendations
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                margin: '20px 0'
              }}>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0', color: '#3498db' }}>
                    {results.proteinGrams.toLocaleString()}g
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Protein</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>({results.proteinPercent}%)</div>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0', color: '#e74c3c' }}>
                    {results.carbsGrams.toLocaleString()}g
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Carbohydrates</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>({results.carbsPercent}%)</div>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0', color: '#f39c12' }}>
                    {results.fatGrams.toLocaleString()}g
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Fat</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>({results.fatPercent}%)</div>
                </div>
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Total Calories:</strong> {fitnessGoal === 'loss' ? results.lossCalories : fitnessGoal === 'maintenance' ? results.maintenanceCalories : results.gainCalories} kcal</p>
                <p><strong>Calculation:</strong> 4 kcal/g protein & carbs, 9 kcal/g fat</p>
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

        {/* Activity Level Info */}
        <div style={{ 
          margin: '25px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px',
          borderLeft: '4px solid #27ae60'
        }}>
          <h4 style={{ 
            marginBottom: '15px',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-running"></i> Understanding Activity Levels
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
            Your activity multiplier affects TDEE calculation accuracy. Choose the level that best matches your weekly routine:
          </p>
          
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '15px',
            fontSize: '0.9rem'
          }}>
            <thead>
              <tr>
                <th style={{ 
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: '#e9ecef',
                  color: '#2c3e50'
                }}>Activity Level</th>
                <th style={{ 
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: '#e9ecef',
                  color: '#2c3e50'
                }}>Description</th>
                <th style={{ 
                  padding: '12px',
                  textAlign: 'left',
                  backgroundColor: '#e9ecef',
                  color: '#2c3e50'
                }}>Multiplier</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Sedentary</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Little/no exercise, desk job</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>1.2</td></tr>
              <tr><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Lightly Active</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Light exercise 1-3 days/week</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>1.375</td></tr>
              <tr><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Moderately Active</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Moderate exercise 3-5 days/week</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>1.55</td></tr>
              <tr><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Very Active</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Hard exercise 6-7 days/week</td><td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>1.725</td></tr>
              <tr><td style={{ padding: '12px', textAlign: 'left' }}>Extra Active</td><td style={{ padding: '12px', textAlign: 'left' }}>Very hard exercise or physical job</td><td style={{ padding: '12px', textAlign: 'left' }}>1.9</td></tr>
            </tbody>
          </table>
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
            <i className="fas fa-fire"></i> Comprehensive Total Daily Energy Expenditure Analysis: Metabolic Rate Calculation & Macronutrient Optimization Strategies
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Total Daily Energy Expenditure calculation methodologies</strong> represent the cornerstone of <strong>evidence-based nutritional science and personalized weight management protocols</strong>. This sophisticated <strong>metabolic rate assessment approach</strong> integrates <strong>Basal Metabolic Rate determination, Physical Activity Level quantification, and Thermic Effect of Food estimation</strong> to provide <strong>accurate daily calorie requirement predictions</strong>. Our advanced <strong>TDEE calculator algorithm</strong> employs the <strong>validated Mifflin-St Jeor equation</strong>, recognized by the <strong>American Dietetic Association</strong> as the most precise method for <strong>resting metabolic rate estimation in contemporary populations</strong>.
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
            <strong>Mifflin-St Jeor Metabolic Equation (Clinical Validation Research):</strong><br/>
            <strong>For Adult Males (Age 18-80):</strong><br/>
            BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5<br/><br/>
            <strong>For Adult Females (Age 18-80):</strong><br/>
            BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161<br/><br/>
            <strong>Total Daily Energy Expenditure Calculation:</strong><br/>
            TDEE = BMR × Physical Activity Level (PAL) Multiplier<br/><br/>
            <strong>Scientific Validation Data:</strong> ±10% accuracy for 95% of adult population<br/>
            <strong>Research Comparison:</strong> Superior to Harris-Benedict equation for contemporary body compositions<br/>
            <strong>Clinical Application:</strong> Used in medical nutrition therapy and sports science research
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
            <i className="fas fa-chart-line"></i> Strategic TDEE Application for Different Body Composition Objectives and Metabolic Optimization
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Precise TDEE calculation implementation</strong> enables targeted nutritional interventions for specific <strong>physiological outcomes and body composition transformations</strong>. For <strong>sustainable adipose tissue reduction protocols</strong>, implementing a <strong>moderate 300-500 calorie daily deficit</strong> from maintenance levels supports <strong>gradual fat loss of 0.3-0.5 kg weekly</strong> while minimizing <strong>lean muscle mass catabolism and metabolic adaptation resistance</strong>. For <strong>hypertrophy-focused muscle acquisition phases</strong>, establishing a <strong>strategic 200-300 calorie daily surplus</strong> combined with <strong>progressive resistance training protocols</strong> facilitates <strong>optimal protein synthesis and lean tissue accrual</strong> while limiting <strong>excessive adipose tissue accumulation</strong>.
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
            <i className="fas fa-utensils"></i> Advanced Macronutrient Distribution Strategies Based on Physiological Goals and Metabolic Requirements
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Beyond simple <strong>total calorie intake calculations</strong>, sophisticated <strong>macronutrient distribution optimization</strong> significantly influences <strong>metabolic outcomes, hormonal responses, and body composition adaptations</strong>. Our calculator provides <strong>goal-specific macronutrient ratio recommendations</strong> based on <strong>exercise physiology research and nutritional science evidence</strong>. For <strong>weight loss optimization protocols</strong>, emphasis on <strong>higher protein intake (1.6-2.2g/kg body weight)</strong> supports <strong>satiety regulation, lean mass preservation, and thermic effect maximization</strong>. For <strong>muscle building phases</strong>, increased <strong>carbohydrate consumption (4-7g/kg)</strong> facilitates <strong>glycogen replenishment, training performance enhancement, and recovery optimization</strong>.
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
            <i className="fas fa-running"></i> Periodized Nutritional Programming: Dynamic TDEE Adjustments Based on Training Cycles and Metabolic Adaptation
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Effective <strong>nutritional periodization strategies</strong> require dynamic <strong>TDEE recalibration based on training periodization cycles and metabolic adaptation responses</strong>. During <strong>intense training blocks with high volume protocols</strong>, increasing <strong>carbohydrate intake to 5-8g/kg body weight</strong> supports <strong>glycogen storage optimization and recovery capacity enhancement</strong>. For <strong>weight loss plateaus or metabolic adaptation scenarios</strong>, implementing <strong>strategic diet breaks, reverse dieting protocols, or metabolic assessments</strong> followed by <strong>TDEE recalculation based on current metabolic parameters</strong> prevents <strong>adaptive thermogenesis and metabolic compensation</strong>. During <strong>competition preparation or physique enhancement phases</strong>, employing <strong>strategic calorie cycling around training stimulus</strong> and <strong>regular TDEE reassessment every 4-6 weeks</strong> maintains progress toward <strong>fitness objectives and body composition targets</strong>.
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
            <i className="fas fa-user-md"></i> Clinical Applications of TDEE Calculation in Medical Nutrition Therapy and Metabolic Health Management
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            In <strong>clinical healthcare settings and medical nutrition therapy protocols</strong>, accurate <strong>TDEE estimation methodologies</strong> are essential for developing <strong>evidence-based therapeutic nutrition interventions and metabolic health management strategies</strong>. Healthcare practitioners including <strong>registered dietitians, endocrinologists, and sports medicine physicians</strong> utilize <strong>precise TDEE calculations</strong> to establish appropriate <strong>calorie prescription levels</strong> for patients with <strong>obesity management requirements, type 2 diabetes metabolic control needs, cardiovascular disease risk reduction protocols, and metabolic syndrome treatment plans</strong>. Personalized <strong>TDEE estimation approaches</strong> significantly improve <strong>clinical outcomes and patient adherence</strong> by preventing <strong>iatrogenic malnutrition risks</strong> while supporting <strong>comprehensive medical treatment protocols and chronic disease management strategies</strong>.
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
            <i className="fas fa-exclamation-triangle"></i> Critical Considerations and Limitations in TDEE Estimation Accuracy and Individual Metabolic Variability
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While <strong>TDEE calculator algorithms</strong> provide valuable <strong>initial estimation frameworks</strong>, numerous physiological factors influence <strong>individual energy expenditure variability and metabolic rate precision</strong>. Key considerations include <strong>genetic metabolic variations (±15% from population averages), hormonal fluctuations across menstrual cycle phases, sleep quality and duration impacts, chronic stress levels affecting cortisol secretion, medication side effects influencing metabolism, and adaptive thermogenesis responses during prolonged calorie restriction periods</strong>. These <strong>mathematical formulas</strong> serve as <strong>initial estimation tools</strong> requiring subsequent <strong>individual calibration through systematic progress monitoring including weekly weight trends, body circumference measurements, bioelectrical impedance analysis, and performance metric assessments</strong>.
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
            <i className="fas fa-rocket"></i> Comprehensive Implementation Protocol: Actionable Steps for TDEE-Based Nutrition Program Success
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            To effectively implement your <strong>personalized TDEE calculation results</strong> and achieve sustainable <strong>nutritional program success</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Establish Baseline Adherence Verification:</strong> Utilize <strong>digital food scales, nutrition tracking applications, and meal preparation protocols</strong> for 1-2 weeks to verify <strong>nutritional accuracy and portion control precision</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Implement Gradual Calorie Adjustments:</strong> Modify <strong>daily calorie intake by 100-200 calorie increments</strong> weekly based on <strong>systematic progress metrics and physiological responses</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Prioritize Protein Adequacy Optimization:</strong> Consume <strong>1.6-2.2g/kg body weight of high-quality protein daily</strong> to preserve <strong>lean muscle mass during calorie deficits and support muscle protein synthesis during surplus phases</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Monitor Training Performance Metrics:</strong> Adjust <strong>carbohydrate intake based on training performance indicators, recovery capacity assessments, and energy level evaluations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Schedule Periodic Metabolic Reassessment:</strong> Recalculate <strong>TDEE every 4-6 weeks or following 5kg body weight change</strong> to account for <strong>metabolic adaptation and body composition alterations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Consider Professional Nutritional Consultation:</strong> Engage <strong>registered dietitians or certified nutrition specialists</strong> for <strong>personalized medical nutrition therapy and evidence-based dietary guidance</strong></li>
            <li><strong>Track Comprehensive Progress Metrics:</strong> Combine <strong>scale weight measurements with body circumference assessments, progress photography documentation, and performance testing evaluations</strong> for holistic progress tracking</li>
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
            <i className="fas fa-flask"></i> Research Advancements in Metabolic Rate Measurement and Future Technological Developments
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Ongoing <strong>scientific research initiatives and technological innovation projects</strong> continue refining <strong>metabolic rate measurement accuracy and energy expenditure prediction methodologies</strong>. Emerging technologies including <strong>indirect calorimetry devices with breath-by-breath analysis, doubly labeled water techniques for free-living energy expenditure measurement, wearable metabolic sensors with continuous monitoring capabilities, and artificial intelligence algorithms for personalized metabolic prediction</strong> provide increasingly precise <strong>TDEE estimation and metabolic health assessment</strong>. Future developments in <strong>genomic testing for metabolic predisposition, microbiome analysis for nutrient absorption efficiency, and personalized nutrition based on metabolic typing</strong> promise to revolutionize <strong>individualized energy requirement determination and precision nutrition implementation</strong>.
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
            <i className="fas fa-handshake"></i> Holistic Health Integration: Combining TDEE with Comprehensive Wellness Assessment and Lifestyle Optimization
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Total Daily Energy Expenditure calculation integration</strong> represents a foundational component within comprehensive <strong>health assessment protocols and wellness optimization strategies</strong>. Combining <strong>accurate TDEE estimation</strong> with evaluation of complementary metrics including <strong>cardiovascular fitness capacity assessment, muscular strength and endurance testing, flexibility and balance measurements, sleep quality analysis, stress management evaluation, and metabolic health marker assessment</strong> provides a multidimensional understanding of <strong>overall health status and wellness optimization potential</strong>. This integrative approach enables more effective <strong>personalized health coaching strategies and targeted lifestyle intervention development</strong> that addresses multiple <strong>wellness dimensions simultaneously</strong> for optimal <strong>preventive health outcomes, chronic disease risk reduction, and quality of life enhancement</strong> across diverse populations and life stages.
          </p>
        </div>
          {/* Q&A Dropdown Section */}
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
            <i className="fas fa-question-circle"></i> Frequently Asked Questions About TDEE Calculation & Nutrition Planning
          </h2>
          
          <div style={{ 
            marginBottom: '15px',
            border: '1px solid #dfe6e9',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.3s'
              }}
              onClick={() => setActiveFAQ(activeFAQ === 1 ? null : 1)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeFAQ === 1 ? '#e9ecef' : '#f8f9fa';
              }}
            >
              How accurate is the Mifflin-St Jeor equation compared to metabolic testing?
              <i className={`fas fa-chevron-${activeFAQ === 1 ? 'up' : 'down'}`}></i>
            </div>
            <div style={{
              padding: activeFAQ === 1 ? '20px' : '0 20px',
              maxHeight: activeFAQ === 1 ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'white'
            }}>
              The <strong>Mifflin-St Jeor equation</strong> demonstrates approximately <strong>±10% accuracy</strong> for 95% of the adult population when compared to <strong>indirect calorimetry metabolic testing</strong>. Clinical validation studies show it outperforms older formulas like <strong>Harris-Benedict</strong> by accounting for contemporary body compositions. While <strong>laboratory metabolic testing</strong> provides the most precise measurements (±2-5% accuracy), the Mifflin-St Jeor equation offers an excellent <strong>cost-effective estimation method</strong> for most individuals. Professional athletes, those with significant metabolic disorders, or individuals experiencing <strong>weight loss plateaus</strong> may benefit from <strong>indirect calorimetry testing</strong> for more precise measurements.
            </div>
          </div>
          
          <div style={{ 
            marginBottom: '15px',
            border: '1px solid #dfe6e9',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.3s'
              }}
              onClick={() => setActiveFAQ(activeFAQ === 2 ? null : 2)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeFAQ === 2 ? '#e9ecef' : '#f8f9fa';
              }}
            >
              Why does my calculated TDEE seem too high/low compared to what I actually eat?
              <i className={`fas fa-chevron-${activeFAQ === 2 ? 'up' : 'down'}`}></i>
            </div>
            <div style={{
              padding: activeFAQ === 2 ? '20px' : '0 20px',
              maxHeight: activeFAQ === 2 ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'white'
            }}>
              Several factors can cause discrepancies between <strong>calculated TDEE estimates</strong> and <strong>actual energy intake requirements</strong>. Common reasons include: 1) <strong>Genetic metabolic variations</strong> (±15% from population averages), 2) <strong>Non-exercise activity thermogenesis (NEAT)</strong> differences, 3) <strong>Thermic effect of food variations</strong> based on diet composition, 4) <strong>Underreporting of food intake</strong> in self-monitoring, 5) <strong>Hormonal influences</strong> including thyroid function and cortisol levels, 6) <strong>Medication effects</strong> on metabolism, and 7) <strong>Sleep quality and stress</strong> impacts on energy expenditure. The calculated TDEE should serve as a <strong>starting point requiring individual calibration</strong> based on 2-3 weeks of <strong>consistent tracking and weight monitoring</strong>.
            </div>
          </div>
          
          <div style={{ 
            marginBottom: '15px',
            border: '1px solid #dfe6e9',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.3s'
              }}
              onClick={() => setActiveFAQ(activeFAQ === 3 ? null : 3)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeFAQ === 3 ? '#e9ecef' : '#f8f9fa';
              }}
            >
              How often should I recalculate my TDEE during weight loss or muscle gain phases?
              <i className={`fas fa-chevron-${activeFAQ === 3 ? 'up' : 'down'}`}></i>
            </div>
            <div style={{
              padding: activeFAQ === 3 ? '20px' : '0 20px',
              maxHeight: activeFAQ === 3 ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'white'
            }}>
              For optimal progress during <strong>weight management phases</strong>, recalculate TDEE every 4-6 weeks or after every 5kg (11lbs) of body weight change. More frequent adjustments (every 2-3 weeks) may be needed during <strong>rapid weight loss phases</strong> or for individuals with significant <strong>metabolic adaptation</strong>. During <strong>muscle building phases</strong>, monthly recalculations are sufficient unless experiencing <strong>unexpected weight fluctuations</strong>. Key indicators requiring recalculation include: 1) <strong>Weight loss plateau</strong> lasting 2+ weeks despite adherence, 2) <strong>Excessive hunger or fatigue</strong> suggesting inadequate intake, 3) <strong>Significant changes in activity level</strong> or training volume, and 4) <strong>Body composition measurements</strong> indicating disproportionate fat/muscle changes.
            </div>
          </div>
          
          <div style={{ 
            marginBottom: '15px',
            border: '1px solid #dfe6e9',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.3s'
              }}
              onClick={() => setActiveFAQ(activeFAQ === 4 ? null : 4)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeFAQ === 4 ? '#e9ecef' : '#f8f9fa';
              }}
            >
              What's the difference between TDEE, BMR, and RMR in metabolic calculations?
              <i className={`fas fa-chevron-${activeFAQ === 4 ? 'up' : 'down'}`}></i>
            </div>
            <div style={{
              padding: activeFAQ === 4 ? '20px' : '0 20px',
              maxHeight: activeFAQ === 4 ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'white'
            }}>
              These terms represent different aspects of <strong>energy expenditure measurement</strong>: 1) <strong>BMR (Basal Metabolic Rate)</strong> measures energy expenditure at complete rest in a thermoneutral environment after 8 hours of sleep and 12 hours of fasting - representing the <strong>minimum energy for vital functions</strong>. 2) <strong>RMR (Resting Metabolic Rate)</strong> is similar to BMR but measured under less strict conditions, typically 3-4% higher. 3) <strong>TDEE (Total Daily Energy Expenditure)</strong> includes <strong>BMR/RMR plus all daily activity</strong>: physical exercise, non-exercise activity thermogenesis (NEAT), and the thermic effect of food (TEF). In practical terms: <strong>TDEE = BMR × Activity Multiplier</strong>, where activity multiplier ranges from 1.2 (sedentary) to 1.9 (extra active).
            </div>
          </div>
          
          <div style={{ 
            marginBottom: '15px',
            border: '1px solid #dfe6e9',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.3s'
              }}
              onClick={() => setActiveFAQ(activeFAQ === 5 ? null : 5)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeFAQ === 5 ? '#e9ecef' : '#f8f9fa';
              }}
            >
              How do I adjust my TDEE calculations for women during different menstrual cycle phases?
              <i className={`fas fa-chevron-${activeFAQ === 5 ? 'up' : 'down'}`}></i>
            </div>
            <div style={{
              padding: activeFAQ === 5 ? '20px' : '0 20px',
              maxHeight: activeFAQ === 5 ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'white'
            }}>
              <strong>Menstrual cycle phases</strong> can influence <strong>energy expenditure and nutritional requirements</strong> by 100-300 calories daily. During the <strong>follicular phase (days 1-14)</strong>, metabolic rate is relatively stable. The <strong>luteal phase (days 15-28)</strong> typically increases <strong>BMR by 5-10%</strong> due to elevated progesterone and body temperature. Some women may need to <strong>increase calorie intake by 100-300 calories</strong> during the luteal phase, particularly if experiencing increased hunger or energy needs. <strong>Strength and endurance</strong> often peak during the follicular phase, making it ideal for intense training, while the luteal phase may require <strong>reduced intensity or increased recovery focus</strong>. Tracking symptoms and adjusting intake based on individual responses provides the most personalized approach.
            </div>
          </div>
          
          <div style={{ 
            marginBottom: '15px',
            border: '1px solid #dfe6e9',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.3s'
              }}
              onClick={() => setActiveFAQ(activeFAQ === 6 ? null : 6)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeFAQ === 6 ? '#e9ecef' : '#f8f9fa';
              }}
            >
              Can TDEE calculations be accurate for athletes and highly active individuals?
              <i className={`fas fa-chevron-${activeFAQ === 6 ? 'up' : 'down'}`}></i>
            </div>
            <div style={{
              padding: activeFAQ === 6 ? '20px' : '0 20px',
              maxHeight: activeFAQ === 6 ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'white'
            }}>
              While standard <strong>TDEE calculations</strong> provide reasonable estimates for most active individuals, <strong>elite athletes and highly trained individuals</strong> may require more sophisticated approaches. Challenges include: 1) <strong>Increased lean muscle mass</strong> altering standard weight-based equations, 2) <strong>Elevated exercise economy</strong> reducing energy cost of familiar movements, 3) <strong>Training periodization cycles</strong> creating variable energy needs, and 4) <strong>Metabolic adaptations</strong> from chronic training. For athletes, consider: Using <strong>activity multipliers at the higher end</strong> (1.7-2.0), incorporating <strong>training volume and intensity metrics</strong>, monitoring <strong>performance and recovery indicators</strong>, and potentially using <strong>sport-specific formulas</strong> or <strong>indirect calorimetry testing</strong>. Many athletes benefit from <strong>carbohydrate periodization</strong> based on training demands rather than fixed macronutrient percentages.
            </div>
          </div>
          
          <div style={{ 
            border: '1px solid #dfe6e9',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                padding: '20px',
                background: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.3s'
              }}
              onClick={() => setActiveFAQ(activeFAQ === 7 ? null : 7)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeFAQ === 7 ? '#e9ecef' : '#f8f9fa';
              }}
            >
              What are common mistakes people make when interpreting and applying TDEE calculations?
              <i className={`fas fa-chevron-${activeFAQ === 7 ? 'up' : 'down'}`}></i>
            </div>
            <div style={{
              padding: activeFAQ === 7 ? '20px' : '0 20px',
              maxHeight: activeFAQ === 7 ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              background: 'white'
            }}>
              Common <strong>TDEE calculation and application mistakes</strong> include: 1) <strong>Overestimating activity level</strong> (most people are less active than they perceive), 2) <strong>Using inaccurate body measurements</strong> (morning weight after voiding provides most consistent data), 3) <strong>Ignoring metabolic adaptation</strong> during prolonged calorie restriction, 4) <strong>Focusing only on scale weight</strong> rather than body composition changes, 5) <strong>Not accounting for age-related metabolic decline</strong> (BMR decreases 1-2% per decade after 20), 6) <strong>Applying aggressive deficits</strong> that compromise muscle mass and metabolic health, 7) <strong>Neglecting to adjust for lifestyle changes</strong> (new job, injury, travel), and 8) <strong>Expecting linear progress</strong> rather than accounting for normal weight fluctuations. Successful implementation requires <strong>regular monitoring, flexibility in adjustments, and patience</strong> with the process.
            </div>
          </div>
        </div>
        {/* Medical Disclaimer */}
        <div style={{ 
          margin: '40px 0',
          padding: '25px',
          background: '#f8d7da',
          borderRadius: '10px',
          borderLeft: '5px solid #721c24'
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
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>This TDEE calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard medical formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Limitations Warning:</strong> TDEE calculations may vary by ±10-15% due to individual metabolic differences, genetic factors, hormonal variations, medication effects, and lifestyle variables. The Mifflin-St Jeor equation provides population-based estimates that require individual calibration.
          </p>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, or other qualified healthcare provider with any questions regarding weight management, nutrition, or health conditions. Do not make significant changes to your diet or exercise regimen based solely on TDEE calculations.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Individual Variation:</strong> Calorie and macronutrient requirements vary significantly based on age, gender, genetics, medical conditions, medication use, and individual metabolic factors. These calculations provide general guidelines that should be interpreted in the context of your overall health.
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
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium nutrition tracking app</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Professional food scale on sale</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Personalized nutrition coaching</p>
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
                      background: calculator.relevance >= 9 ? '#27ae60' : calculator.relevance >= 8 ? '#3498db' : calculator.relevance >= 5 ? '#f39c12' : '#95a5a6',
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