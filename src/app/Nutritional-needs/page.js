"use client";

import { useState, useEffect } from 'react';

export default function NutritionalNeedsPage() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [results, setResults] = useState(null);

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

  // Action buttons styles
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

  // Sample data for demo
  useEffect(() => {
    setAge('30');
    setHeight('175');
    setWeight('75');
    setGender('male');
    setActivityLevel('moderate');
    setGoal('maintain');
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

  const calculateNutritionalNeeds = () => {
    // Validate inputs
    if (!age || !height || !weight) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseInt(age);
    const heightVal = parseFloat(height);
    const weightVal = parseFloat(weight);

    // Convert imperial to metric if needed
    let heightCm = heightVal;
    let weightKg = weightVal;
    
    if (unitSystem === 'imperial') {
      heightCm = heightVal * 2.54;
      weightKg = weightVal * 0.453592;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal - 161;
    }

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    // Calculate TDEE
    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

    // Adjust based on goal
    let targetCalories = tdee;
    let goalDescription = '';
    let goalColor = '#27ae60';

    switch(goal) {
      case 'lose_mild':
        targetCalories = Math.round(tdee * 0.85);
        goalDescription = 'Mild Weight Loss (15% deficit)';
        goalColor = '#3498db';
        break;
      case 'lose_aggressive':
        targetCalories = Math.round(tdee * 0.75);
        goalDescription = 'Aggressive Weight Loss (25% deficit)';
        goalColor = '#3498db';
        break;
      case 'gain_mild':
        targetCalories = Math.round(tdee * 1.10);
        goalDescription = 'Mild Weight Gain (10% surplus)';
        goalColor = '#f39c12';
        break;
      case 'gain_aggressive':
        targetCalories = Math.round(tdee * 1.20);
        goalDescription = 'Aggressive Weight Gain (20% surplus)';
        goalColor = '#f39c12';
        break;
      default:
        goalDescription = 'Weight Maintenance';
        goalColor = '#27ae60';
    }

    // Calculate macronutrients
    const proteinPerKg = 1.6; // Moderate protein intake
    const proteinGrams = Math.round(weightKg * proteinPerKg);
    const proteinCalories = proteinGrams * 4;

    const fatPercentage = 0.25; // 25% of calories from fat
    const fatCalories = Math.round(targetCalories * fatPercentage);
    const fatGrams = Math.round(fatCalories / 9);

    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);

    // Calculate micronutrients
    const fiberGrams = Math.max(25, Math.round(weightKg * 0.5)); // At least 25g or 0.5g per kg
    const waterLitres = Math.round(weightKg * 0.033 * 10) / 10; // 33ml per kg

    // Calculate meal distribution
    const mealCalories = Math.round(targetCalories / 3);
    const mealProtein = Math.round(proteinGrams / 3);
    const mealCarbs = Math.round(carbGrams / 3);
    const mealFat = Math.round(fatGrams / 3);

    // Store results
    setResults({
      bmr: Math.round(bmr),
      tdee: tdee,
      targetCalories: targetCalories,
      goalDescription: goalDescription,
      goalColor: goalColor,
      macronutrients: {
        protein: { grams: proteinGrams, calories: proteinCalories },
        carbs: { grams: carbGrams, calories: carbCalories },
        fat: { grams: fatGrams, calories: fatCalories }
      },
      micronutrients: {
        fiber: fiberGrams,
        water: waterLitres
      },
      mealPlan: {
        calories: mealCalories,
        protein: mealProtein,
        carbs: mealCarbs,
        fat: mealFat
      },
      userInfo: {
        age: ageVal,
        gender: gender,
        height: heightVal,
        weight: weightVal,
        unitSystem: unitSystem,
        activityLevel: activityLevel,
        goal: goal
      },
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });

    setShowShareMenu(false);
  };

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate nutritional needs first before sharing.');
      return;
    }

    const shareText = `My daily calorie needs are ${results.targetCalories} calories - Check your nutritional requirements using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'Nutrition,Calories,Health,Fitness';

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
        shareUrlFull = `mailto:?subject=My Nutritional Needs&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My Nutritional Needs',
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
      alert('Please calculate nutritional needs first before downloading.');
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
    <title>Nutritional Needs Calculator Results</title>
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
        
        .calorie-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: ${results.goalColor};
        }
        
        .goal-description {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
            color: ${results.goalColor};
        }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .macro-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .macro-item {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;
        }
        
        .macro-value {
            font-size: 1.8rem;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .macro-label {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
        }
        
        .macro-details {
            font-size: 0.8rem;
            color: #888;
            margin-top: 5px;
        }
        
        .meal-plan {
            background: #e8f5e9;
            padding: 20px;
            border-radius: 10px;
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
            <h1><i class="fas fa-utensils"></i> Nutritional Needs Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Calorie Needs Card -->
            <div class="result-card" style="border-top-color: ${results.goalColor};">
                <h3 class="card-title"><i class="fas fa-fire" style="color: ${results.goalColor};"></i> Daily Calorie Requirements</h3>
                <div class="calorie-value">${results.targetCalories}</div>
                <div class="goal-description">${results.goalDescription}</div>
                <div class="info-box">
                    <p><strong>Basal Metabolic Rate (BMR):</strong> ${results.bmr} calories/day</p>
                    <p><strong>Total Daily Energy Expenditure (TDEE):</strong> ${results.tdee} calories/day</p>
                    <p><strong>Activity Level:</strong> ${results.userInfo.activityLevel.replace('_', ' ')}</p>
                </div>
            </div>
            
            <!-- Macronutrients Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-chart-pie" style="color: #3498db;"></i> Macronutrient Distribution</h3>
                <div class="macro-grid">
                    <div class="macro-item">
                        <div class="macro-value">${results.macronutrients.protein.grams}g</div>
                        <div class="macro-label">Protein</div>
                        <div class="macro-details">${results.macronutrients.protein.calories} cal</div>
                    </div>
                    <div class="macro-item">
                        <div class="macro-value">${results.macronutrients.carbs.grams}g</div>
                        <div class="macro-label">Carbohydrates</div>
                        <div class="macro-details">${results.macronutrients.carbs.calories} cal</div>
                    </div>
                    <div class="macro-item">
                        <div class="macro-value">${results.macronutrients.fat.grams}g</div>
                        <div class="macro-label">Fat</div>
                        <div class="macro-details">${results.macronutrients.fat.calories} cal</div>
                    </div>
                </div>
                <div class="info-box">
                    <p><strong>Protein:</strong> ${Math.round(results.macronutrients.protein.calories/results.targetCalories*100)}% of calories</p>
                    <p><strong>Carbs:</strong> ${Math.round(results.macronutrients.carbs.calories/results.targetCalories*100)}% of calories</p>
                    <p><strong>Fat:</strong> ${Math.round(results.macronutrients.fat.calories/results.targetCalories*100)}% of calories</p>
                </div>
            </div>
            
            <!-- Micronutrients & Meal Plan Card -->
            <div class="result-card" style="border-top-color: #f39c12;">
                <h3 class="card-title"><i class="fas fa-apple-alt" style="color: #f39c12;"></i> Additional Recommendations</h3>
                <div class="info-box">
                    <p><strong>Daily Fiber Intake:</strong> At least ${results.micronutrients.fiber}g</p>
                    <p><strong>Daily Water Intake:</strong> ${results.micronutrients.water} liters</p>
                </div>
                
                <div class="meal-plan">
                    <h4><i class="fas fa-utensil-spoon"></i> Sample Meal Distribution (3 meals/day)</h4>
                    <p><strong>Per Meal:</strong></p>
                    <p>• Calories: ${results.mealPlan.calories}</p>
                    <p>• Protein: ${results.mealPlan.protein}g</p>
                    <p>• Carbs: ${results.mealPlan.carbs}g</p>
                    <p>• Fat: ${results.mealPlan.fat}g</p>
                </div>
            </div>
            
            <!-- Personal Info Card -->
            <div class="result-card" style="border-top-color: #9b59b6;">
                <h3 class="card-title"><i class="fas fa-user" style="color: #9b59b6;"></i> Personal Information</h3>
                <div class="info-box">
                    <p><strong>Age:</strong> ${results.userInfo.age} years</p>
                    <p><strong>Gender:</strong> ${results.userInfo.gender}</p>
                    <p><strong>Height:</strong> ${results.userInfo.height} ${results.userInfo.unitSystem === 'metric' ? 'cm' : 'in'}</p>
                    <p><strong>Weight:</strong> ${results.userInfo.weight} ${results.userInfo.unitSystem === 'metric' ? 'kg' : 'lbs'}</p>
                    <p><strong>Goal:</strong> ${results.goalDescription}</p>
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Nutritional Disclaimer</h4>
            <p>These calculations provide estimated nutritional needs based on standard formulas. Individual requirements may vary based on metabolism, health conditions, medications, and other factors. Always consult with a registered dietitian or healthcare provider before making significant changes to your diet.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Nutritional Needs Calculator • ${window.location.href}</p>
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
    a.download = `nutritional-needs-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download as text file
  const downloadText = () => {
    if (!results) {
      alert('Please calculate nutritional needs first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                    NUTRITIONAL NEEDS CALCULATOR RESULTS                      ║\n`;
    content += `║                    Generated: ${date} at ${time}                   ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    // Personal Information
    content += `PERSONAL INFORMATION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Age: ${results.userInfo.age} years\n`;
    content += `  Gender: ${results.userInfo.gender}\n`;
    content += `  Height: ${results.userInfo.height} ${results.userInfo.unitSystem === 'metric' ? 'cm' : 'in'}\n`;
    content += `  Weight: ${results.userInfo.weight} ${results.userInfo.unitSystem === 'metric' ? 'kg' : 'lbs'}\n`;
    content += `  Activity Level: ${results.userInfo.activityLevel.replace('_', ' ')}\n`;
    content += `  Goal: ${results.goalDescription}\n\n`;
    
    // Calorie Needs
    content += `DAILY CALORIE REQUIREMENTS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Target Calories: ${results.targetCalories}\n`;
    content += `  Goal: ${results.goalDescription}\n`;
    content += `  Basal Metabolic Rate (BMR): ${results.bmr} calories/day\n`;
    content += `  Total Daily Energy Expenditure (TDEE): ${results.tdee} calories/day\n\n`;
    
    // Macronutrients
    content += `MACRONUTRIENT DISTRIBUTION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Protein: ${results.macronutrients.protein.grams}g (${results.macronutrients.protein.calories} cal, ${Math.round(results.macronutrients.protein.calories/results.targetCalories*100)}%)\n`;
    content += `  Carbohydrates: ${results.macronutrients.carbs.grams}g (${results.macronutrients.carbs.calories} cal, ${Math.round(results.macronutrients.carbs.calories/results.targetCalories*100)}%)\n`;
    content += `  Fat: ${results.macronutrients.fat.grams}g (${results.macronutrients.fat.calories} cal, ${Math.round(results.macronutrients.fat.calories/results.targetCalories*100)}%)\n\n`;
    
    // Additional Recommendations
    content += `ADDITIONAL RECOMMENDATIONS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Daily Fiber Intake: At least ${results.micronutrients.fiber}g\n`;
    content += `  Daily Water Intake: ${results.micronutrients.water} liters\n\n`;
    
    // Meal Plan
    content += `SAMPLE MEAL DISTRIBUTION (3 meals/day):\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Per Meal:\n`;
    content += `  • Calories: ${results.mealPlan.calories}\n`;
    content += `  • Protein: ${results.mealPlan.protein}g\n`;
    content += `  • Carbohydrates: ${results.mealPlan.carbs}g\n`;
    content += `  • Fat: ${results.mealPlan.fat}g\n\n`;
    
    // Disclaimer
    content += `IMPORTANT NUTRITIONAL DISCLAIMER:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `These calculations provide estimated nutritional needs based on standard formulas.\n`;
    content += `Individual requirements may vary based on metabolism, health conditions, medications,\n`;
    content += `and other factors. Always consult with a registered dietitian or healthcare provider\n`;
    content += `before making significant changes to your diet.\n\n`;
    content += `Generated by Nutritional Needs Calculator\n`;
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
    a.download = `nutritional-needs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How accurate is the Mifflin-St Jeor equation for calculating BMR?",
      answer: "The Mifflin-St Jeor equation is considered the most accurate BMR formula for the general population, with approximately 90% accuracy. It's more precise than older formulas like Harris-Benedict, especially for overweight individuals. However, accuracy can vary for athletes, the elderly, or those with extreme body compositions."
    },
    {
      question: "What's the difference between BMR and TDEE?",
      answer: "BMR (Basal Metabolic Rate) is the number of calories your body needs at complete rest for basic functions. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities and exercise. TDEE represents your total daily calorie needs."
    },
    {
      question: "How much protein should I really be eating?",
      answer: "For most people, 1.6-2.2g of protein per kg of body weight is optimal. Athletes or those in a calorie deficit may need up to 2.2-2.5g/kg. Higher protein helps preserve muscle during weight loss and supports muscle growth during training."
    },
    {
      question: "Can I adjust the macronutrient ratios based on my preferences?",
      answer: "Yes, the 25% fat, rest carbs split is a general guideline. Some people do better with higher fat (keto: 70-80% fat), others with higher carbs (athletes: 50-60% carbs). The key is maintaining adequate protein and total calorie balance for your goals."
    },
    {
      question: "How often should I recalculate my nutritional needs?",
      answer: "Recalculate every 4-6 weeks if actively losing/gaining weight, as your weight and TDEE change. For weight maintenance, recalculate every 3-6 months or if your activity level changes significantly."
    }
  ];

  // Related calculators sorted by SEO relevance
  const relatedCalculators = [
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 10 },
    { name: "Macro Calculator", link: "/macro-calculator", relevance: 9 },
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 9 },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 8 },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 7 },
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 7 },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator", relevance: 6 },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 6 },
    { name: "Meal Planner", link: "/meal-planner", relevance: 8 },
    { name: "Food Diary", link: "/food-diary", relevance: 7 },
    { name: "Exercise Calorie Burn", link: "/exercise-calorie-burn", relevance: 6 },
    { name: "Recipe Nutrition Calculator", link: "/recipe-nutrition-calculator", relevance: 5 }
  ];

  // Sort by relevance
  const sortedCalculators = [...relatedCalculators].sort((a, b) => b.relevance - a.relevance);

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
          <i className="fas fa-utensils"></i> Nutritional Needs Calculator - Comprehensive Daily Calorie & Macronutrient Requirements Analysis
        </h1>
        
        <p style={{ 
          marginBottom: '25px', 
          fontSize: 'clamp(0.95rem, 2vw, 1rem)', 
          color: '#666' 
        }}>
          Calculate your <strong>personalized daily calorie requirements, optimal macronutrient distribution, and comprehensive nutritional needs</strong> using <strong>scientifically validated formulas including Mifflin-St Jeor BMR equations and evidence-based macronutrient ratios</strong>. Essential for <strong>weight management planning, athletic performance optimization, and informed dietary decision-making</strong>.
        </p>

        {/* Unit System Toggle */}
        <div style={{ marginBottom: '20px' }}>
          <label style={inputGroupLabelStyle}><i className="fas fa-exchange-alt"></i> Unit System</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{
                flex: 1,
                padding: '10px',
                background: unitSystem === 'metric' ? '#27ae60' : '#f8f9fa',
                color: unitSystem === 'metric' ? 'white' : '#333',
                border: '2px solid #dfe6e9',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: unitSystem === 'metric' ? '600' : '400',
                transition: 'all 0.3s'
              }}
              onClick={() => setUnitSystem('metric')}
            >
              Metric (kg/cm)
            </button>
            <button
              style={{
                flex: 1,
                padding: '10px',
                background: unitSystem === 'imperial' ? '#27ae60' : '#f8f9fa',
                color: unitSystem === 'imperial' ? 'white' : '#333',
                border: '2px solid #dfe6e9',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: unitSystem === 'imperial' ? '600' : '400',
                transition: 'all 0.3s'
              }}
              onClick={() => setUnitSystem('imperial')}
            >
              Imperial (lbs/in)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age *</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              min="18"
              max="120"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>Years (18-120)</small>
          </div>

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
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height *</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unitSystem === 'metric' ? '175' : '69'}
              min={unitSystem === 'metric' ? '100' : '39'}
              max={unitSystem === 'metric' ? '250' : '98'}
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              {unitSystem === 'metric' ? 'Centimeters (cm)' : 'Inches (in)'}
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight *</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unitSystem === 'metric' ? '75' : '165'}
              min={unitSystem === 'metric' ? '30' : '66'}
              max={unitSystem === 'metric' ? '300' : '661'}
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              {unitSystem === 'metric' ? 'Kilograms (kg)' : 'Pounds (lbs)'}
            </small>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              style={selectStyle}
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (hard exercise 6-7 days/week)</option>
              <option value="very_active">Very Active (very hard exercise & physical job)</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-bullseye"></i> Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={selectStyle}
            >
              <option value="lose_aggressive">Aggressive Weight Loss (25% deficit)</option>
              <option value="lose_mild">Mild Weight Loss (15% deficit)</option>
              <option value="maintain">Weight Maintenance</option>
              <option value="gain_mild">Mild Weight Gain (10% surplus)</option>
              <option value="gain_aggressive">Aggressive Weight Gain (20% surplus)</option>
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateNutritionalNeeds}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Nutritional Needs
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            {/* Calorie Needs Card */}
            <div style={{ ...resultCardStyle, borderTopColor: results.goalColor }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-fire" style={{ color: results.goalColor }}></i> Daily Calorie Requirements
              </h4>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                margin: '10px 0',
                textAlign: 'center',
                color: results.goalColor
              }}>
                {results.targetCalories}
              </div>
              <div style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                textAlign: 'center',
                marginBottom: '15px',
                color: results.goalColor
              }}>
                {results.goalDescription}
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Basal Metabolic Rate (BMR):</strong> {results.bmr} calories/day</p>
                <p><strong>Total Daily Energy Expenditure (TDEE):</strong> {results.tdee} calories/day</p>
                <p><strong>Activity Level:</strong> {results.userInfo.activityLevel.replace('_', ' ')}</p>
              </div>
            </div>

            {/* Macronutrients Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#3498db' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-chart-pie" style={{ color: '#3498db' }}></i> Macronutrient Distribution
              </h4>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                margin: '20px 0',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
                    {results.macronutrients.protein.grams}g
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Protein</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {results.macronutrients.protein.calories} cal
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>
                    {results.macronutrients.carbs.grams}g
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Carbs</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {results.macronutrients.carbs.calories} cal
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f39c12' }}>
                    {results.macronutrients.fat.grams}g
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Fat</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {results.macronutrients.fat.calories} cal
                  </div>
                </div>
              </div>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Protein:</strong> {Math.round(results.macronutrients.protein.calories/results.targetCalories*100)}% of calories</p>
                <p><strong>Carbs:</strong> {Math.round(results.macronutrients.carbs.calories/results.targetCalories*100)}% of calories</p>
                <p><strong>Fat:</strong> {Math.round(results.macronutrients.fat.calories/results.targetCalories*100)}% of calories</p>
              </div>
            </div>

            {/* Recommendations Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#f39c12' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-apple-alt" style={{ color: '#f39c12' }}></i> Additional Recommendations
              </h4>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Daily Fiber Intake:</strong> At least {results.micronutrients.fiber}g</p>
                <p><strong>Daily Water Intake:</strong> {results.micronutrients.water} liters</p>
              </div>
              
              <div style={{ 
                padding: '20px',
                background: '#e8f5e9',
                borderRadius: '10px',
                margin: '20px 0',
                borderLeft: '4px solid #27ae60'
              }}>
                <h5 style={{ marginBottom: '10px', color: '#2c3e50' }}>
                  <i className="fas fa-utensil-spoon"></i> Sample Meal Distribution (3 meals/day)
                </h5>
                <p><strong>Per Meal:</strong></p>
                <p>• Calories: {results.mealPlan.calories}</p>
                <p>• Protein: {results.mealPlan.protein}g</p>
                <p>• Carbs: {results.mealPlan.carbs}g</p>
                <p>• Fat: {results.mealPlan.fat}g</p>
              </div>
            </div>

            {/* Personal Info Card */}
            <div style={{ ...resultCardStyle, borderTopColor: '#9b59b6' }}>
              <h4 style={{ 
                color: '#2c3e50', 
                marginBottom: '15px', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <i className="fas fa-user" style={{ color: '#9b59b6' }}></i> Personal Information
              </h4>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa',
                borderRadius: '8px',
                margin: '15px 0'
              }}>
                <p><strong>Age:</strong> {results.userInfo.age} years</p>
                <p><strong>Gender:</strong> {results.userInfo.gender}</p>
                <p><strong>Height:</strong> {results.userInfo.height} {results.userInfo.unitSystem === 'metric' ? 'cm' : 'in'}</p>
                <p><strong>Weight:</strong> {results.userInfo.weight} {results.userInfo.unitSystem === 'metric' ? 'kg' : 'lbs'}</p>
                <p><strong>Goal:</strong> {results.goalDescription}</p>
                <p><strong>Activity Level:</strong> {results.userInfo.activityLevel.replace('_', ' ')}</p>
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

        {/* Ad Slot */}
        <div style={{ 
          margin: '30px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px',
          textAlign: 'center',
          color: '#7f8c8d',
          border: '1px dashed #ddd',
          transition: 'all 0.3s ease'
        }}>
          <p><i className="fas fa-ad"></i> Advertisement</p>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium meal planning service</p>
        </div>

        {/* Enhanced SEO Content */}
        <div style={{ 
         
        }}>
          
          {/* Continue with comprehensive SEO content... */}
          
          
          

          {/* Continue with more SEO sections... */}
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
              <i className="fas fa-calculator"></i> Comprehensive Daily Calorie & Macronutrient Requirements Analysis Using Evidence-Based Metabolic Rate Equations
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              <strong>Personalized nutritional needs calculation methodologies</strong> represent <strong>essential evidence-based dietary planning tools</strong> for determining <strong>precise daily calorie expenditure requirements, optimal macronutrient distribution ratios, and scientifically validated micronutrient intake recommendations</strong>. These sophisticated <strong>nutritional calculation algorithms</strong> integrate <strong>advanced metabolic rate prediction equations, comprehensive physical activity assessment protocols, and validated nutritional science research models</strong> to provide <strong>individualized dietary guidance approaches</strong> that maximize <strong>weight management effectiveness, athletic performance enhancement, metabolic health optimization outcomes, and chronic disease prevention strategies</strong> across diverse population demographics requiring <strong>precision nutrition planning protocols and evidence-based dietary intervention approaches</strong>.
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
              <strong>Evidence-Based Metabolic Rate Calculation Equations with Clinical Validation:</strong><br/>
              <strong>Mifflin-St Jeor BMR Equation (Current Gold Standard):</strong><br/>
              <strong>For Adult Males:</strong> BMR = (10 × weight<sub>kg</sub>) + (6.25 × height<sub>cm</sub>) - (5 × age<sub>years</sub>) + 5<br/>
              <strong>For Adult Females:</strong> BMR = (10 × weight<sub>kg</sub>) + (6.25 × height<sub>cm</sub>) - (5 × age<sub>years</sub>) - 161<br/><br/>
              <strong>Harris-Benedict Original BMR Equation (Historical Reference):</strong><br/>
              <strong>For Adult Males:</strong> BMR = (13.397 × weight<sub>kg</sub>) + (4.799 × height<sub>cm</sub>) - (5.677 × age<sub>years</sub>) + 88.362<br/>
              <strong>For Adult Females:</strong> BMR = (9.247 × weight<sub>kg</sub>) + (3.098 × height<sub>cm</sub>) - (4.330 × age<sub>years</sub>) + 447.593<br/><br/>
              <strong>Total Daily Energy Expenditure Calculation Methodology:</strong><br/>
              TDEE = BMR × Physical Activity Level (PAL) Multiplier<br/>
              <strong>Physical Activity Multipliers (WHO Standards):</strong><br/>
              • Sedentary Lifestyle (PAL 1.2): Office work, minimal exercise<br/>
              • Lightly Active (PAL 1.375): Light exercise 1-3 days/week<br/>
              • Moderately Active (PAL 1.55): Moderate exercise 3-5 days/week<br/>
              • Very Active (PAL 1.725): Hard exercise 6-7 days/week<br/>
              • Extremely Active (PAL 1.9): Very hard exercise + physical job<br/><br/>
              <strong>Evidence-Based Macronutrient Distribution Guidelines:</strong><br/>
              • Protein Requirements: 1.6-2.2 g/kg body weight (athletes 2.2-2.5 g/kg)<br/>
              • Fat Intake Range: 20-35% of total daily calories (9 calories/gram)<br/>
              • Carbohydrate Calculation: Remaining calories after protein/fat (4 calories/gram)<br/>
              • Fiber Requirements: Minimum 25g daily, optimal 0.5g/kg body weight
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
              <i className="fas fa-chart-line"></i> Advanced Metabolic Adaptation Considerations in Personalized Calorie Requirement Calculations
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              Understanding <strong>complex metabolic adaptation mechanisms and physiological compensation responses</strong> represents a critical component of <strong>accurate long-term nutritional planning and sustainable weight management strategy development</strong>. The human body demonstrates remarkable <strong>adaptive thermogenesis capabilities and metabolic efficiency adaptations</strong> that significantly influence <strong>real-world calorie expenditure outcomes and weight management effectiveness</strong>:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Non-Exercise Activity Thermogenesis (NEAT) Variability:</strong> Individual differences in <strong>spontaneous physical activity levels, fidgeting behaviors, and daily movement patterns</strong> can account for <strong>200-900 calorie daily expenditure variations</strong> not captured by standard activity level classifications, significantly impacting <strong>personalized calorie requirement accuracy and weight management outcomes</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Metabolic Adaptation During Calorie Restriction:</strong> Sustained <strong>energy intake reduction triggers adaptive metabolic responses</strong> including <strong>reduced resting metabolic rate, decreased thyroid hormone production, and altered sympathetic nervous system activity</strong> that can diminish <strong>expected weight loss results by 15-30% compared to theoretical predictions</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Body Composition Influence on Metabolic Rate:</strong> The <strong>metabolically active nature of lean body mass versus relative metabolic inactivity of adipose tissue</strong> creates significant <strong>individual metabolic rate variations beyond simple weight-based calculations</strong>. Each kilogram of muscle mass contributes approximately <strong>13-15 calories daily to resting metabolic rate</strong>, while fat contributes only <strong>4-5 calories per kilogram</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Genetic and Epigenetic Influences on Metabolism:</strong> Individual <strong>genetic polymorphisms affecting metabolic pathways, mitochondrial efficiency variations, and epigenetic modifications influencing gene expression patterns</strong> contribute to <strong>substantial inter-individual metabolic rate differences up to 20-25% among individuals with similar demographics</strong></li>
              <li><strong>Hormonal Regulation of Energy Expenditure:</strong> Complex <strong>endocrine system interactions involving leptin, ghrelin, insulin, thyroid hormones, and catecholamines</strong> create dynamic <strong>metabolic rate fluctuations throughout the day, across menstrual cycles, and in response to dietary patterns</strong> that require consideration in <strong>precision nutrition planning approaches</strong></li>
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
              <i className="fas fa-dna"></i> Protein Requirements Optimization for Muscle Preservation, Metabolic Health, and Satiety Regulation
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              <strong>Evidence-based protein intake recommendations</strong> represent a cornerstone of <strong>optimal nutritional planning strategies for body composition management, metabolic health optimization, and age-related muscle preservation</strong>. Beyond simple <strong>muscle protein synthesis stimulation</strong>, adequate protein intake supports numerous <strong>physiological functions and health outcomes</strong>:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Muscle Protein Synthesis Maximization Protocols:</strong> Research demonstrates <strong>optimal muscle protein synthesis rates</strong> achieved with <strong>protein intake of 0.4-0.55g/kg per meal</strong> distributed across <strong>3-4 meals daily</strong>, exceeding the traditional <strong>anabolic threshold of approximately 20-25g high-quality protein per feeding occasion</strong> for most individuals</li>
              <li style={{ marginBottom: '10px' }}><strong>Thermic Effect of Food (TEF) Metabolic Advantages:</strong> Protein demonstrates the <strong>highest thermic effect among macronutrients at 20-30% of calories consumed</strong>, compared to <strong>5-10% for carbohydrates and 0-3% for fats</strong>. This metabolic advantage contributes to <strong>increased daily energy expenditure and enhanced weight management effectiveness</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Satiety Hormone Regulation and Appetite Control:</strong> Adequate protein intake stimulates <strong>satiety hormone production (PYY, GLP-1, CCK)</strong> while suppressing <strong>hunger hormone secretion (ghrelin)</strong>, resulting in <strong>spontaneous calorie intake reduction of 200-400 calories daily without conscious restriction efforts</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Age-Related Sarcopenia Prevention Strategies:</strong> Older adults require <strong>increased protein intake (1.2-1.5g/kg)</strong> to overcome <strong>anabolic resistance associated with aging</strong> and prevent <strong>progressive muscle mass loss affecting functional capacity and metabolic health</strong></li>
              <li><strong>Exercise Recovery and Adaptation Enhancement:</strong> Athletes and active individuals benefit from <strong>strategic peri-exercise protein timing (20-40g within 2 hours post-exercise)</strong> to optimize <strong>muscle repair processes, training adaptation responses, and performance recovery rates</strong></li>
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
              <i className="fas fa-seedling"></i> Carbohydrate and Fat Distribution Strategies Based on Activity Patterns, Metabolic Health Status, and Individual Preferences
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              Optimal <strong>carbohydrate and fat distribution strategies</strong> require consideration of <strong>individual activity patterns, metabolic health parameters, genetic predispositions, and personal dietary preferences</strong> rather than adopting <strong>one-size-fits-all macronutrient ratio approaches</strong>:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Activity-Dependent Carbohydrate Requirements:</strong> <strong>Endurance athletes and highly active individuals</strong> typically require <strong>5-8g carbohydrate/kg body weight daily</strong> to support <strong>glycogen restoration, exercise performance maintenance, and recovery process optimization</strong>, while <strong>sedentary individuals or those with insulin resistance</strong> may benefit from <strong>lower carbohydrate approaches (2-4g/kg)</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Essential Fatty Acid Requirements and Health Implications:</strong> Minimum <strong>dietary fat intake of 0.5-1.0g/kg</strong> ensures adequate <strong>essential fatty acid provision, fat-soluble vitamin absorption, and hormone production capacity</strong>. Specific attention to <strong>omega-3 fatty acid intake (EPA/DHA) of 250-500mg daily</strong> supports <strong>cardiovascular health, anti-inflammatory processes, and cognitive function maintenance</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Dietary Pattern Personalization Approaches:</strong> Individual responses to <strong>different macronutrient distributions demonstrate significant variation</strong> based on <strong>genetic factors, gut microbiome composition, and metabolic health status</strong>. Some individuals thrive on <strong>higher fat, lower carbohydrate approaches</strong>, while others perform optimally with <strong>higher carbohydrate, moderate fat distributions</strong></li>
              <li><strong>Nutrient Timing Considerations for Performance Optimization:</strong> Strategic <strong>carbohydrate timing around exercise sessions</strong> (pre-, during, post-exercise) can enhance <strong>performance outcomes, recovery rates, and training adaptation responses</strong> without necessarily increasing <strong>total daily carbohydrate intake requirements</strong></li>
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
              <i className="fas fa-flask"></i> Micronutrient Considerations and Dietary Quality Optimization Beyond Macronutrient Calculations
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              While <strong>macronutrient and calorie calculations</strong> provide essential <strong>quantitative nutritional guidance</strong>, optimal health outcomes require equal attention to <strong>micronutrient adequacy, dietary quality metrics, and food composition characteristics</strong>:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Nutrient Density Prioritization Strategies:</strong> Emphasizing <strong>whole food sources, minimally processed ingredients, and naturally nutrient-dense options</strong> ensures adequate intake of <strong>essential vitamins, minerals, phytonutrients, and bioactive compounds</strong> that support <strong>optimal physiological function and disease prevention outcomes</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Fiber Intake Optimization for Metabolic Health:</strong> Adequate <strong>dietary fiber consumption (25-38g daily for adults)</strong> supports <strong>gut microbiome diversity, blood glucose regulation, cholesterol management, and satiety mechanisms</strong>. Specific attention to <strong>soluble versus insoluble fiber balance and prebiotic fiber sources</strong> enhances <strong>metabolic health outcomes</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Hydration Requirements and Electrolyte Balance Considerations:</strong> Adequate <strong>daily water intake (30-35ml/kg body weight)</strong> supports <strong>cellular function, thermoregulation, cognitive performance, and exercise capacity</strong>. Attention to <strong>electrolyte balance (sodium, potassium, magnesium, calcium)</strong> becomes particularly important during <strong>exercise, in hot environments, or with significant sweat losses</strong></li>
              <li><strong>Supplementation Considerations Based on Individual Needs:</strong> Targeted <strong>nutritional supplementation strategies</strong> may benefit individuals with <strong>specific deficiencies, increased requirements, or dietary restrictions</strong>. Common considerations include <strong>vitamin D, omega-3 fatty acids, magnesium, iron (for certain populations), and vitamin B12 (for plant-based diets)</strong></li>
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
              <i className="fas fa-user-md"></i> Clinical Applications of Nutritional Needs Assessment in Healthcare Settings and Medical Nutrition Therapy
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              <strong>Evidence-based nutritional needs assessment methodologies</strong> serve critical functions across diverse <strong>healthcare settings, clinical specialties, and therapeutic intervention protocols</strong>:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Medical Nutrition Therapy for Chronic Disease Management:</strong> Personalized <strong>nutritional assessment protocols</strong> inform <strong>diabetes mellitus dietary management strategies, cardiovascular disease prevention approaches, renal disease protein restriction calculations, and gastrointestinal disorder dietary modification plans</strong> within comprehensive <strong>chronic disease management programs</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Clinical Nutrition Support in Hospital Settings:</strong> Accurate <strong>energy and protein requirement calculations</strong> guide <strong>enteral and parenteral nutrition formulations, critical care metabolic support protocols, and surgical patient nutritional optimization strategies</strong> to enhance <strong>recovery outcomes and reduce complication rates</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Sports Medicine and Athletic Performance Nutrition:</strong> Specialized <strong>nutritional assessment approaches</strong> support <strong>athlete body composition management, competition preparation protocols, recovery nutrition optimization, and injury rehabilitation nutritional strategies</strong> within professional <strong>sports medicine programs and athletic performance centers</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Pediatric and Adolescent Growth Monitoring:</strong> Age-specific <strong>nutritional requirement calculations</strong> facilitate <strong>childhood development tracking, growth disorder identification, adolescent nutritional need assessment, and pediatric obesity intervention planning</strong> within <strong>comprehensive pediatric healthcare delivery systems</strong></li>
              <li><strong>Geriatric Nutrition and Age-Related Metabolic Changes:</strong> Modified <strong>nutritional assessment protocols</strong> address <strong>age-related metabolic rate reductions, sarcopenia prevention requirements, medication-nutrient interaction considerations, and age-specific micronutrient needs</strong> within <strong>geriatric healthcare programs and elderly population health initiatives</strong></li>
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
              <i className="fas fa-chart-bar"></i> Advanced Considerations in Nutritional Needs Assessment for Special Populations and Unique Physiological States
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              Special population groups and unique physiological states require <strong>modified nutritional assessment approaches and adjusted calculation methodologies</strong> to account for <strong>altered metabolic demands, changing physiological priorities, and specific health considerations</strong>:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Pregnancy and Lactation Nutritional Requirements:</strong> Gestational <strong>energy requirement increases of approximately 300 calories daily during second/third trimesters</strong>, with additional <strong>protein and micronutrient needs</strong> to support <strong>fetal development, placental function, and maternal tissue expansion</strong>. Lactation requires <strong>additional 500 calories daily</strong> with attention to <strong>specific nutrient demands for milk production</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Weight Loss Surgery and Metabolic Procedure Patients:</strong> Post-surgical patients require <strong>significantly modified nutritional protocols</strong> including <strong>reduced energy intake, prioritized protein consumption, specific nutrient supplementation strategies, and altered meal timing approaches</strong> to support <strong>successful weight loss outcomes and prevent nutritional deficiencies</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Vegetarian and Vegan Dietary Pattern Considerations:</strong> Plant-based diets require attention to <strong>protein complementation strategies, specific micronutrient adequacy (vitamin B12, iron, zinc, calcium, omega-3 fatty acids), and potential energy density challenges</strong> when designing <strong>nutritionally complete meal plans</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>High-Altitude and Environmental Extreme Conditions:</strong> Unique environmental exposures including <strong>high-altitude settings, extreme temperatures, and specialized occupational conditions</strong> create <strong>altered nutritional requirements</strong> for <strong>energy, hydration, specific micronutrients, and metabolic support</strong></li>
              <li><strong>Genetic Metabolic Disorders and Special Health Conditions:</strong> Individuals with <strong>specific genetic conditions (PKU, galactosemia, etc.), metabolic disorders, or specialized health considerations</strong> require <strong>highly individualized nutritional assessment approaches</strong> developed in collaboration with <strong>specialized medical and nutritional professionals</strong></li>
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
              <i className="fas fa-mobile-alt"></i> Technological Integration and Future Directions in Personalized Nutrition Assessment
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              Emerging <strong>technological innovations and digital health platforms</strong> are revolutionizing <strong>personalized nutrition assessment methodologies and dietary planning approaches</strong> through <strong>advanced data integration, real-time monitoring capabilities, and artificial intelligence applications</strong>:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Wearable Technology Integration for Activity Assessment:</strong> Modern <strong>wearable devices and smartphone applications</strong> provide <strong>continuous physical activity tracking, heart rate variability monitoring, and energy expenditure estimation</strong> that enhance <strong>physical activity level assessment accuracy beyond traditional categorical classifications</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Continuous Glucose Monitoring and Metabolic Response Tracking:</strong> Advanced <strong>continuous glucose monitoring systems and metabolic tracking technologies</strong> enable <strong>real-time assessment of individual metabolic responses to different foods, meal timing strategies, and macronutrient distributions</strong> for truly <strong>personalized nutritional recommendations</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence and Machine Learning Applications:</strong> Sophisticated <strong>AI algorithms and machine learning models</strong> analyze <strong>complex multi-dimensional data sets</strong> including <strong>genetic information, microbiome composition, metabolic biomarkers, and lifestyle factors</strong> to generate <strong>highly personalized nutritional recommendations and predictive health insights</strong></li>
              <li style={{ marginBottom: '10px' }}><strong>Nutrigenomics and Personalized Nutrition Based on Genetic Profile:</strong> Emerging <strong>nutrigenomic research and genetic testing applications</strong> enable <strong>nutritional recommendations tailored to individual genetic variations</strong> affecting <strong>nutrient metabolism, food sensitivities, and disease risk profiles</strong></li>
              <li><strong>Digital Food Tracking and Automated Nutrient Analysis:</strong> Advanced <strong>food tracking applications with image recognition capabilities, barcode scanning functions, and automated nutrient database integration</strong> simplify <strong>dietary intake assessment and nutrient analysis processes</strong> for both <strong>individuals and healthcare professionals</strong></li>
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
              <i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Competencies for Evidence-Based Nutritional Assessment
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              Proper <strong>nutritional needs assessment methodology implementation</strong> requires comprehensive <strong>educational preparation and professional competency development</strong> across multiple <strong>scientific disciplines and clinical practice areas</strong>. Healthcare professionals conducting <strong>nutritional assessments</strong> should possess <strong>foundational knowledge in human physiology, metabolic pathways, nutritional biochemistry, and evidence-based practice principles</strong>. Continuing professional education must address <strong>evolving research findings, changing clinical practice standards, emerging technological developments, and updated dietary guideline recommendations</strong> to ensure <strong>optimal patient outcomes and evidence-based practice implementation</strong> across diverse <strong>healthcare settings, public health programs, and wellness service delivery environments</strong>.
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
              <i className="fas fa-handshake"></i> Multidisciplinary Collaboration and Integrated Healthcare Approaches to Nutritional Assessment
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              Optimal <strong>nutritional needs assessment implementation</strong> benefits from <strong>multidisciplinary collaboration frameworks and integrated healthcare approaches</strong> that combine expertise from <strong>registered dietitians, physicians, exercise physiologists, behavioral health specialists, and other healthcare professionals</strong>. This collaborative approach enables <strong>comprehensive patient assessment, coordinated intervention planning, and integrated follow-up monitoring</strong> that addresses <strong>multiple dimensions of health and wellness simultaneously</strong>. Successful implementation requires <strong>effective communication protocols, shared decision-making processes, and coordinated care delivery systems</strong> that optimize <strong>patient outcomes, enhance treatment adherence, and improve long-term health maintenance</strong> across diverse <strong>population groups and healthcare delivery settings</strong>.
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
              <i className="fas fa-search"></i> Quality Assurance and Evidence-Based Practice Implementation in Nutritional Assessment Services
            </h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#555', 
              marginBottom: '15px', 
              lineHeight: '1.7'
            }}>
              Implementation of <strong>rigorous quality assurance protocols and evidence-based practice standards</strong> ensures <strong>consistent nutritional assessment service delivery</strong> across diverse <strong>clinical settings and professional practice environments</strong>. These protocols encompass <strong>standardized assessment methodologies, validated calculation algorithms, appropriate interpretation guidelines, and evidence-based intervention strategies</strong> that directly impact <strong>patient health outcomes and nutritional intervention effectiveness</strong>. Professional organizations should develop <strong>comprehensive practice guidelines, competency assessment tools, and continuing education requirements</strong> to guarantee <strong>consistent service quality and optimal outcomes</strong> through <strong>evidence-based nutritional assessment approaches</strong> across the spectrum of <strong>healthcare delivery and wellness service provision</strong>.
            </p>
          </div>
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
            <i className="fas fa-question-circle"></i> Frequently Asked Questions About Nutritional Needs Calculation
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
          background: '#e8f5e9',
          borderRadius: '10px',
          borderLeft: '5px solid #27ae60',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <h4 style={{ 
            color: '#2e7d32',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-exclamation-triangle"></i> Important Medical & Nutritional Disclaimer
          </h4>
          <p style={{ marginBottom: '10px' }}><strong>This nutritional needs calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical or nutritional advice, diagnosis, or treatment.</p>
          <p style={{ marginBottom: '10px' }}><strong>Individual Variation Warning:</strong> Nutritional needs vary significantly based on metabolism, health conditions, medications, genetics, and lifestyle factors. These calculations provide general guidelines that should be interpreted in the context of your overall health.</p>
          <p><strong>Professional Consultation Required:</strong> Always consult with a registered dietitian, nutritionist, or healthcare provider before making significant changes to your diet, especially if you have medical conditions or take medications.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) + Calculator Links */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium meal planning service</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Nutrition tracking app</p>
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
            
            {/* Related Calculators Sidebar Section */}
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