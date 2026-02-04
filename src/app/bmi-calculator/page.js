"use client";

import { useState, useEffect } from 'react';

export default function BMICalculatorPage() {
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [history, setHistory] = useState([]);
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
    color: '#666'
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

  const bmiCardStyle = {
    borderTopColor: '#27ae60'
  };

  const categoryCardStyle = {
    borderTopColor: '#3498db'
  };

  const riskCardStyle = {
    borderTopColor: '#f39c12'
  };

  const bodyCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '10px 0'
  };

  const infoSectionStyle = {
    marginTop: '40px',
    borderTop: '1px solid #eee',
    paddingTop: '30px'
  };

  const sectionTitleStyle = {
    color: '#2c3e50',
    marginBottom: '15px',
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const paragraphStyle = {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '15px',
    lineHeight: '1.7'
  };

  const formulaBoxStyle = {
    background: '#f1f3f5',
    padding: '20px',
    borderRadius: '10px',
    fontFamily: "'Courier New', monospace",
    textAlign: 'left',
    margin: '20px 0',
    fontSize: '0.95rem',
    borderLeft: '4px solid #27ae60',
    overflowX: 'auto'
  };

  const adSlotStyle = {
    margin: '30px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#7f8c8d',
    border: '1px dashed #ddd',
    transition: 'all 0.3s ease'
  };

  const hoverAdSlotStyle = {
    background: '#f0f2f5',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
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

  const mobileAdsStyle = {
    display: 'none',
    margin: '30px 0',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  };

  const mobileAdStyle = {
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#7f8c8d',
    border: '1px dashed #ddd',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const stickyFooterAdStyle = {
    display: 'none',
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    background: '#f8f9fa',
    padding: '15px',
    borderTop: '2px solid #27ae60',
    textAlign: 'center',
    zIndex: '1000',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
  };

  const faqSectionStyle = {
    margin: '40px 0',
    padding: '30px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  };

  const faqTitleStyle = {
    color: '#2c3e50',
    marginBottom: '25px',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const faqItemStyle = {
    marginBottom: '15px',
    border: '1px solid #dfe6e9',
    borderRadius: '10px',
    overflow: 'hidden'
  };

  const faqQuestionStyle = {
    padding: '20px',
    background: '#f8f9fa',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
    color: '#2c3e50',
    transition: 'background 0.3s'
  };

  const hoverFaqQuestionStyle = {
    background: '#e9ecef'
  };

  const faqAnswerStyle = {
    padding: '0 20px',
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    background: 'white'
  };

  const activeFaqAnswerStyle = {
    padding: '20px',
    maxHeight: '500px'
  };

  const calculatorsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '20px'
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
    background: '#27ae60',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(39, 174, 96, 0.2)',
    borderColor: '#27ae60'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#e8f5e9',
    borderRadius: '10px',
    borderLeft: '5px solid #27ae60',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#2e7d32',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // New styles for share and download buttons
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
    // For the demo: 5 feet 9 inches = 69 inches
    setHeight('175');
    setFeet('5');
    setInches('9');
    setWeight('75');
    setAge('30');
    setGender('male');
    setUnitSystem('metric');
    setActivityLevel('moderate');
    setWaist('85');
    setHip('95');

    // Generate sample history
    const historyData = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const bmi = Math.floor(Math.random() * 8) + 20;
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        bmi: bmi.toFixed(1),
        weight: Math.floor(Math.random() * 15) + 70,
        height: 175
      });
    }
    setHistory(historyData);
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

  const calculateBMI = () => {
    // Validate inputs
    if (!weight) {
      alert('Please fill in Weight value.');
      return;
    }

    const weightVal = parseFloat(weight);
    const ageVal = age ? parseInt(age) : null;
    const waistVal = waist ? parseFloat(waist) : null;
    const hipVal = hip ? parseFloat(hip) : null;

    // Calculate height based on unit system
    let heightVal, heightMeters, weightKg;
    
    if (unitSystem === 'metric') {
      heightVal = parseFloat(height);
      // Validate ranges for metric
      if (heightVal < 100 || heightVal > 250) {
        alert('Height should be between 100 and 250 cm.');
        return;
      }
      if (weightVal < 30 || weightVal > 300) {
        alert('Weight should be between 30 and 300 kg.');
        return;
      }
      heightMeters = heightVal / 100;
      weightKg = weightVal;
    } else {
      // For imperial: convert feet and inches to total inches
      const feetVal = parseFloat(feet) || 0;
      const inchesVal = parseFloat(inches) || 0;
      heightVal = (feetVal * 12) + inchesVal;
      
      // Validate ranges for imperial
      if (heightVal < 39 || heightVal > 98) {
        alert('Height should be between 3\'3" (39") and 8\'2" (98").');
        return;
      }
      if (weightVal < 66 || weightVal > 661) {
        alert('Weight should be between 66 and 661 lbs.');
        return;
      }
      heightMeters = heightVal * 0.0254;
      weightKg = weightVal * 0.453592;
    }

    // Calculate BMI
    const bmi = weightKg / (heightMeters * heightMeters);
    const bmiRounded = bmi.toFixed(1);

    // Determine BMI category
    let category = '';
    let categoryColor = '';
    let healthRisk = '';
    let recommendations = [];
    let bmiPrime = (bmi / 25).toFixed(2);

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = '#f39c12';
      healthRisk = 'Increased risk of nutritional deficiencies, osteoporosis, and weakened immunity';
      recommendations = [
        'Gradual weight gain through nutrient-dense foods',
        'Strength training to build muscle mass',
        'Consult healthcare provider to rule out underlying conditions',
        'Monitor nutritional intake and ensure adequate calories'
      ];
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
      categoryColor = '#27ae60';
      healthRisk = 'Lowest risk for weight-related health problems';
      recommendations = [
        'Maintain current weight with balanced diet',
        'Regular physical activity (150+ minutes/week)',
        'Annual health check-ups',
        'Continue healthy lifestyle habits'
      ];
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      categoryColor = '#e67e22';
      healthRisk = 'Moderate risk for hypertension, type 2 diabetes, and cardiovascular disease';
      recommendations = [
        'Weight loss of 5-10% of current body weight',
        'Increase physical activity to 300+ minutes/week',
        'Reduce processed foods and sugar intake',
        'Consult healthcare provider for personalized plan'
      ];
    } else {
      category = 'Obese';
      categoryColor = '#e74c3c';
      healthRisk = 'High risk for multiple chronic diseases and reduced life expectancy';
      recommendations = [
        'Medical consultation for comprehensive weight management',
        'Consider structured weight loss program',
        'Regular monitoring of blood pressure and blood glucose',
        'Psychological support if needed'
      ];
    }

    // Calculate waist-to-hip ratio if data available
    let whr = null;
    let whrCategory = '';
    if (waistVal && hipVal) {
      whr = (waistVal / hipVal).toFixed(2);
      if (gender === 'male') {
        whrCategory = whr < 0.9 ? 'Low risk' : whr < 1.0 ? 'Moderate risk' : 'High risk';
      } else {
        whrCategory = whr < 0.8 ? 'Low risk' : whr < 0.85 ? 'Moderate risk' : 'High risk';
      }
    }

    // Calculate ideal weight range
    const idealWeightMin = 18.5 * heightMeters * heightMeters;
    const idealWeightMax = 24.9 * heightMeters * heightMeters;
    
    // Convert back to user's preferred units
    let idealWeightDisplay;
    if (unitSystem === 'metric') {
      idealWeightDisplay = `${idealWeightMin.toFixed(1)} - ${idealWeightMax.toFixed(1)} kg`;
    } else {
      idealWeightDisplay = `${(idealWeightMin * 2.20462).toFixed(1)} - ${(idealWeightMax * 2.20462).toFixed(1)} lbs`;
    }

    // Calculate weight to lose/gain
    const currentWeight = unitSystem === 'metric' ? weightVal : weightVal * 0.453592;
    const weightDifference = currentWeight - idealWeightMax;
    let weightAction = '';
    
    if (weightDifference > 0) {
      weightAction = `Lose ${Math.abs(weightDifference).toFixed(1)} kg to reach normal range`;
    } else if (weightDifference < -5) {
      weightAction = `Gain ${Math.abs(weightDifference).toFixed(1)} kg to reach normal range`;
    } else {
      weightAction = 'Maintain current weight';
    }

    // Calculate body surface area (BSA)
    const bsa = Math.sqrt((heightVal * weightVal) / 3600).toFixed(2);

    // Calculate lean body mass
    let lbm = 0;
    if (gender === 'male') {
      lbm = (0.32810 * weightVal) + (0.33929 * heightVal) - 29.5336;
    } else {
      lbm = (0.29569 * weightVal) + (0.41813 * heightVal) - 43.2933;
    }
    const bodyFatPercentage = ((weightVal - lbm) / weightVal * 100).toFixed(1);

    // Calculate ponderal index (alternative to BMI)
    const ponderalIndex = (weightVal / (heightMeters * heightMeters * heightMeters)).toFixed(1);

    // Risk assessment
    let riskLevel = '';
    let riskColor = '';
    
    if (bmi < 18.5) {
      riskLevel = 'Moderate Health Risk';
      riskColor = '#f39c12';
    } else if (bmi < 25) {
      riskLevel = 'Low Health Risk';
      riskColor = '#27ae60';
    } else if (bmi < 30) {
      riskLevel = 'High Health Risk';
      riskColor = '#e67e22';
    } else if (bmi < 35) {
      riskLevel = 'Very High Health Risk';
      riskColor = '#e74c3c';
    } else {
      riskLevel = 'Extremely High Health Risk';
      riskColor = '#c0392b';
    }

    // Calculate BMR (Basal Metabolic Rate)
    let bmr = 0;
    if (ageVal) {
      if (gender === 'male') {
        bmr = 10 * weightKg + 6.25 * (heightMeters * 100) - 5 * ageVal + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * (heightMeters * 100) - 5 * ageVal - 161;
      }
    }

    // Calculate TDEE based on activity level
    const activityFactors = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    const tdee = bmr ? Math.round(bmr * activityFactors[activityLevel]) : null;

    // Generate health metrics
    const healthMetrics = {
      bmr: bmr ? Math.round(bmr) : null,
      tdee: tdee,
      bsa: bsa,
      ponderalIndex: ponderalIndex,
      lbm: lbm.toFixed(1),
      bodyFatPercentage: bodyFatPercentage
    };

    setResults({
      bmi: bmiRounded,
      bmiPrime: bmiPrime,
      category: category,
      categoryColor: categoryColor,
      healthRisk: healthRisk,
      riskLevel: riskLevel,
      riskColor: riskColor,
      idealWeight: idealWeightDisplay,
      weightAction: weightAction,
      recommendations: recommendations,
      whr: whr,
      whrCategory: whrCategory,
      healthMetrics: healthMetrics,
      values: {
        height: heightVal,
        weight: weightVal,
        age: ageVal,
        gender: gender,
        unitSystem: unitSystem,
        waist: waistVal,
        hip: hipVal
      },
      history: history
    });
    setShowShareMenu(false);
  };

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate BMI first before sharing.');
      return;
    }

    const shareText = `My BMI is ${results.bmi} (${results.category}) - Check your BMI using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'BMI,Health,Fitness,Wellness';

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
        shareUrlFull = `mailto:?subject=My BMI Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My BMI Results',
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

  // Download as HTML file (preserves formatting)
  const downloadHTML = () => {
    if (!results) {
      alert('Please calculate BMI first before downloading.');
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
    <title>BMI Calculator Results</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2129774584753444"
     crossorigin="anonymous"></script>
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
        
        .bmi-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
        }
        
        .bmi-category {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
        }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            text-align: center;
            margin: 20px 0;
        }
        
        .metric-value {
            font-size: 1.8rem;
            font-weight: bold;
        }
        
        .metric-label {
            font-size: 0.85rem;
            color: #666;
            margin-top: 5px;
        }
        
        .recommendation-item {
            padding: 12px;
            background: #f8f9fa;
            border-radius: 6px;
            margin-bottom: 12px;
            border-left: 4px solid #f39c12;
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
            <h1><i class="fas fa-weight"></i> BMI Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Personal Information Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-user" style="color: #3498db;"></i> Personal Information</h3>
                <div class="info-box">
                    <p><strong>Height:</strong> ${results.values.height} ${results.values.unitSystem === 'metric' ? 'cm' : 'in'}</p>
                    <p><strong>Weight:</strong> ${results.values.weight} ${results.values.unitSystem === 'metric' ? 'kg' : 'lbs'}</p>
                    <p><strong>Age:</strong> ${results.values.age || 'Not specified'}</p>
                    <p><strong>Gender:</strong> ${results.values.gender}</p>
                    <p><strong>Activity Level:</strong> ${activityLevel.replace('_', ' ')}</p>
                    ${results.values.waist && results.values.hip ? `
                    <p><strong>Waist:</strong> ${results.values.waist} ${results.values.unitSystem === 'metric' ? 'cm' : 'in'}</p>
                    <p><strong>Hip:</strong> ${results.values.hip} ${results.values.unitSystem === 'metric' ? 'cm' : 'in'}</p>
                    ` : ''}
                </div>
            </div>
            
            <!-- BMI Results Card -->
            <div class="result-card" style="border-top-color: #27ae60;">
                <h3 class="card-title"><i class="fas fa-calculator" style="color: #27ae60;"></i> BMI Results</h3>
                <div class="bmi-value" style="color: ${results.categoryColor};">${results.bmi} kg/m²</div>
                <div class="bmi-category" style="color: ${results.categoryColor};">${results.category}</div>
                <div class="info-box" style="background: ${results.riskColor === '#e74c3c' ? '#f8d7da' : results.riskColor === '#e67e22' ? '#fff3cd' : '#d4edda'}; color: ${results.riskColor === '#e74c3c' ? '#721c24' : results.riskColor === '#e67e22' ? '#856404' : '#155724'};">
                    <strong>${results.riskLevel}</strong> | BMI Prime: ${results.bmiPrime}
                </div>
                <div class="info-box">
                    <p><strong>Ideal Weight Range:</strong> ${results.idealWeight}</p>
                    <p><strong>Health Risk:</strong> ${results.healthRisk}</p>
                    <p><strong>Weight Action:</strong> ${results.weightAction}</p>
                </div>
            </div>
            
            <!-- Additional Metrics Card -->
            <div class="result-card" style="border-top-color: #9b59b6;">
                <h3 class="card-title"><i class="fas fa-chart-bar" style="color: #9b59b6;"></i> Additional Metrics</h3>
                <div class="metric-grid">
                    <div>
                        <div class="metric-value" style="color: #3498db;">${results.bmiPrime}</div>
                        <div class="metric-label">BMI Prime</div>
                    </div>
                    <div>
                        <div class="metric-value" style="color: #00b894;">${results.healthMetrics.bsa} m²</div>
                        <div class="metric-label">Body Surface Area</div>
                    </div>
                    <div>
                        <div class="metric-value" style="color: #9b59b6;">${results.healthMetrics.ponderalIndex}</div>
                        <div class="metric-label">Ponderal Index</div>
                    </div>
                </div>
                ${results.whr ? `
                <div style="text-align: center; margin-top: 15px;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: #f39c12;">Waist-to-Hip Ratio: ${results.whr}</div>
                    <div style="color: #666;">(${results.whrCategory})</div>
                </div>
                ` : ''}
                <div class="info-box" style="margin-top: 15px;">
                    <p><strong>Body Fat Percentage:</strong> ${results.healthMetrics.bodyFatPercentage}% (estimated)</p>
                    <p><strong>Lean Body Mass:</strong> ${results.healthMetrics.lbm} kg</p>
                    ${results.healthMetrics.bmr ? `<p><strong>Basal Metabolic Rate:</strong> ${results.healthMetrics.bmr} calories/day</p>` : ''}
                    ${results.healthMetrics.tdee ? `<p><strong>Total Daily Energy Expenditure:</strong> ${results.healthMetrics.tdee} calories/day</p>` : ''}
                </div>
            </div>
            
            <!-- Recommendations Card -->
            <div class="result-card" style="border-top-color: #f39c12;">
                <h3 class="card-title"><i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i> Health Recommendations</h3>
                <div style="margin: 20px 0;">
                    <div style="margin-bottom: 15px; color: #666;">
                        <strong>Action Plan Based on Your BMI:</strong>
                    </div>
                    ${results.recommendations.map((rec, index) => `
                    <div class="recommendation-item">
                        <strong>${index + 1}.</strong> ${rec}
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This BMI calculation is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. BMI does not account for muscle mass, bone density, overall body composition, or racial and sex differences. Athletes, pregnant women, children, the elderly, and individuals with high muscle mass may get misleading results.</p>
        </div>
        
        <div class="footer">
            <p>Generated by BMI Calculator • ${window.location.href}</p>
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
    a.download = `bmi-results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download as text file
  const downloadText = () => {
    if (!results) {
      alert('Please calculate BMI first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                            BMI CALCULATOR RESULTS                            ║\n`;
    content += `║                    Generated: ${date} at ${time}                   ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    // Personal Information
    content += `PERSONAL INFORMATION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Height: ${results.values.height} ${results.values.unitSystem === 'metric' ? 'cm' : 'in'}\n`;
    content += `  Weight: ${results.values.weight} ${results.values.unitSystem === 'metric' ? 'kg' : 'lbs'}\n`;
    content += `  Age: ${results.values.age || 'Not specified'}\n`;
    content += `  Gender: ${results.values.gender}\n`;
    content += `  Activity Level: ${activityLevel.replace('_', ' ')}\n`;
    if (results.values.waist && results.values.hip) {
      content += `  Waist: ${results.values.waist} ${results.values.unitSystem === 'metric' ? 'cm' : 'in'}\n`;
      content += `  Hip: ${results.values.hip} ${results.values.unitSystem === 'metric' ? 'cm' : 'in'}\n`;
    }
    content += `\n`;
    
    // Results
    content += `BMI RESULTS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  BMI Score: ${results.bmi} kg/m²\n`;
    content += `  Category: ${results.category}\n`;
    content += `  BMI Prime: ${results.bmiPrime}\n`;
    content += `  Health Risk Level: ${results.riskLevel}\n`;
    content += `  Ideal Weight Range: ${results.idealWeight}\n`;
    content += `  Health Risk: ${results.healthRisk}\n`;
    content += `  Weight Action: ${results.weightAction}\n`;
    content += `\n`;
    
    // Additional Metrics
    content += `ADDITIONAL METRICS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    if (results.whr) {
      content += `  Waist-to-Hip Ratio: ${results.whr} (${results.whrCategory})\n`;
    }
    content += `  Body Surface Area: ${results.healthMetrics.bsa} m²\n`;
    content += `  Ponderal Index: ${results.healthMetrics.ponderalIndex}\n`;
    content += `  Body Fat Percentage: ${results.healthMetrics.bodyFatPercentage}% (estimated)\n`;
    content += `  Lean Body Mass: ${results.healthMetrics.lbm} kg\n`;
    if (results.healthMetrics.bmr) {
      content += `  Basal Metabolic Rate: ${results.healthMetrics.bmr} calories/day\n`;
    }
    if (results.healthMetrics.tdee) {
      content += `  Total Daily Energy Expenditure: ${results.healthMetrics.tdee} calories/day\n`;
    }
    content += `\n`;
    
    // Recommendations
    content += `HEALTH RECOMMENDATIONS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    results.recommendations.forEach((rec, index) => {
      content += `  ${index + 1}. ${rec}\n`;
    });
    content += `\n`;
    
    // Disclaimer
    content += `IMPORTANT MEDICAL DISCLAIMER:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `This BMI calculation is for informational purposes only. It is not a substitute\n`;
    content += `for professional medical advice, diagnosis, or treatment. Always seek the advice\n`;
    content += `of your physician or other qualified health provider with any questions you may\n`;
    content += `have regarding a medical condition.\n\n`;
    content += `Generated by BMI Calculator\n`;
    content += `URL: ${window.location.href}\n`;
    content += `\n╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                            END OF REPORT                              ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n`;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmi-results-${new Date().toISOString().split('T')[0]}.txt`;
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
      question: "What's the difference between BMI and body fat percentage? Which is more accurate for health assessment?",
      answer: "BMI (Body Mass Index) is a simple weight-to-height ratio that provides a general screening for weight categories. Body fat percentage measures the actual proportion of fat mass to total body weight. BMI is better for population studies and general screening but has limitations for individuals with high muscle mass. Body fat percentage gives a more accurate picture of body composition but requires specialized equipment (DEXA, BIA, skinfold calipers). For most people, BMI is sufficient for general health assessment, but athletes, pregnant women, elderly, and those with significant muscle mass should also consider body fat percentage. The most comprehensive approach uses both metrics along with waist circumference."
    },
    {
      question: "Can BMI be inaccurate for athletes or muscular individuals? How should they assess their health?",
      answer: "Yes, BMI can be misleading for athletes and muscular individuals because it doesn't differentiate between muscle and fat. A muscular athlete with low body fat may be classified as overweight or obese by BMI standards. These individuals should use multiple assessment tools: 1) Body fat percentage (aim for 6-24% for men, 16-30% for women, depending on sport), 2) Waist-to-hip ratio (<0.9 for men, <0.85 for women), 3) Waist circumference (<40 inches for men, <35 inches for women), 4) Performance metrics (strength, endurance), 5) Blood work (cholesterol, glucose). Remember: Health is multidimensional - focus on performance, body composition, and metabolic health, not just weight classification."
    },
    {
      question: "What are the health risks associated with being underweight (BMI <18.5)?",
      answer: "Being underweight carries significant health risks: 1) Nutritional deficiencies leading to anemia, osteoporosis, and weakened immune function. 2) Reproductive issues including menstrual irregularities and fertility problems. 3) Increased surgical and illness complication risks due to poor nutritional reserves. 4) Higher mortality rates from certain conditions like COPD. 5) Muscle wasting and sarcopenia risk. 6) Poor wound healing. Causes can include: Eating disorders, hyperthyroidism, malabsorption syndromes, cancer, chronic infections, or excessive exercise. Healthy weight gain strategies: Calorie-dense nutritious foods, strength training, addressing underlying medical conditions, and working with a dietitian. Underweight individuals should consult healthcare providers to rule out medical causes."
    },
    {
      question: "How does BMI calculation differ for children and adolescents?",
      answer: "For children 2-20 years, BMI is calculated differently: 1) Same formula but interpreted using age- and sex-specific percentiles. 2) CDC growth charts are used: Underweight: <5th percentile, Healthy weight: 5th to <85th percentile, Overweight: 85th to <95th percentile, Obese: ≥95th percentile. 3) BMI changes dramatically during growth spurts and puberty. 4) Pediatric BMI tracks growth patterns over time - single measurements have limited value. 5) Healthcare providers look at BMI trajectory. 6) Different cutoffs for Asian children may apply. 7) Assessment includes parental heights for genetic potential. Pediatric BMI helps identify: Growth disorders, early obesity risk, eating disorders, and nutritional deficiencies. Always interpret pediatric BMI with healthcare provider guidance."
    },
    {
      question: "What is 'normal weight obesity' and how common is it?",
      answer: "Normal weight obesity (NWO) occurs when someone has a normal BMI but high body fat percentage (>30% for women, >25% for men). Prevalence: 20-30% of normal-BMI individuals. Risks similar to obese individuals: Metabolic syndrome, insulin resistance, dyslipidemia, inflammation, cardiovascular disease. Causes: 1) Sedentary lifestyle with poor diet leading to fat accumulation despite normal weight. 2) Age-related muscle loss (sarcopenia). 3) Genetic predisposition to store visceral fat. 4) Previous weight loss with muscle loss. Detection requires body composition analysis (DEXA, BIA, or skinfold measurements). Prevention/Treatment: Resistance training to build muscle, adequate protein intake, regular physical activity, and monitoring waist circumference. NWO highlights BMI's limitation in assessing body composition."
    },
    {
      question: "How accurate are online BMI calculators and home scales with BMI function?",
      answer: "Online BMI calculators: Very accurate for formula calculation if you input correct measurements. Accuracy depends on: 1) Precise height and weight input. 2) Correct unit selection. 3) Understanding of limitations. Home scales with BMI function: Use bioelectrical impedance (BIA) to estimate body fat and calculate BMI. Accuracy varies: 1) Hydration status significantly affects BIA readings. 2) Best used consistently (same time, conditions). 3) Not as accurate as professional methods. 4) Good for tracking trends rather than absolute values. For most people, simple online calculators with manual measurements are sufficient. For body composition, consider professional assessment. Remember: All BMI tools have the same inherent limitations - they don't assess muscle vs fat, distribution, or metabolic health."
    }
  ];

  const relatedCalculators = [
    { name: "Body Fat Calculator", link: "/body-fat-calculator" },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator" },
    { name: "Waist-Hip Ratio", link: "/waist-hip-ratio" },
    { name: "Calorie Calculator", link: "/calorie-calculator" },
    { name: "TDEE Calculator", link: "/tdee-calculator" },
    { name: "BMR Calculator", link: "/bmr-calculator" },
    { name: "Water Intake Calculator", link: "/water-intake-calculator" },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator" },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator" },
    { name: "Heart Disease Risk", link: "/heart-disease-risk-calculator" },
    { name: "Carbohydrate Intake", link: "/carbohydrate-intake-calculator" },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-weight"></i> BMI Calculator - Comprehensive Body Mass Index Analysis & Health Risk Assessment Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate your <strong>Body Mass Index, analyze weight classification categories, and receive evidence-based health risk assessment recommendations</strong> using <strong>advanced anthropometric algorithms, comprehensive body composition data integration, and current medical research protocols</strong>. Essential for <strong>weight management planning, chronic disease risk stratification, and informed health optimization decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height *</label>
            {unitSystem === 'metric' ? (
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
                  required
                />
                <small style={{ color: '#666', fontSize: '0.8rem' }}>
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
                    required
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
                    required
                  />
                  <small style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
                    Inches (in)
                  </small>
                </div>
              </div>
            )}
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

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              min="18"
              max="120"
              step="1"
              style={inputStyle}
            />
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
                  fontWeight: unitSystem === 'metric' ? '600' : '400'
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
                  fontWeight: unitSystem === 'imperial' ? '600' : '400'
                }}
                onClick={() => setUnitSystem('imperial')}
              >
                Imperial (lbs/ft/in)
              </button>
            </div>
          </div>

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
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tape"></i> Waist Circumference (optional)</label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder={unitSystem === 'metric' ? '85' : '33.5'}
              min={unitSystem === 'metric' ? '50' : '20'}
              max={unitSystem === 'metric' ? '200' : '79'}
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              {unitSystem === 'metric' ? 'Centimeters (cm)' : 'Inches (in)'}
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tape"></i> Hip Circumference (optional)</label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder={unitSystem === 'metric' ? '95' : '37.4'}
              min={unitSystem === 'metric' ? '50' : '20'}
              max={unitSystem === 'metric' ? '200' : '79'}
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateBMI}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate BMI & Analyze Health Risks
        </button>

        {/* Results Display */}
        {results && (
          <>
            <div style={resultsContainerStyle}>
              <div style={{ ...resultCardStyle, ...bmiCardStyle }}>
                <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> BMI Results</h4>
                <div style={{ margin: '20px 0' }}>
                  <div style={{ ...resultValueStyle, color: results.categoryColor }}>
                    {results.bmi} kg/m²
                  </div>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    color: '#666',
                    marginBottom: '15px',
                    fontWeight: 'bold'
                  }}>
                    {results.category}
                  </div>
                  <div style={{ 
                    padding: '15px', 
                    background: results.riskColor === '#e74c3c' ? '#f8d7da' : 
                              results.riskColor === '#e67e22' ? '#fff3cd' : '#d4edda',
                    borderRadius: '8px',
                    color: results.riskColor === '#e74c3c' ? '#721c24' : 
                          results.riskColor === '#e67e22' ? '#856404' : '#155724',
                    fontWeight: '600',
                    marginBottom: '15px'
                  }}>
                    {results.riskLevel} | BMI Prime: {results.bmiPrime}
                  </div>
                  <div style={{ 
                    padding: '10px', 
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    color: '#666'
                  }}>
                    <div><strong>Ideal Weight Range:</strong> {results.idealWeight}</div>
                    <div><strong>Health Risk:</strong> {results.healthRisk}</div>
                    <div><strong>Weight Action:</strong> {results.weightAction}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <div>Height: {
                    results.values.unitSystem === 'metric' 
                      ? `${results.values.height} cm`
                      : `${Math.floor(results.values.height / 12)}'${Math.round(results.values.height % 12)}"`
                  }</div>
                  <div>Weight: {results.values.weight} {results.values.unitSystem === 'metric' ? 'kg' : 'lbs'}</div>
                  <div>Age: {results.values.age || 'Not specified'} | Gender: {results.values.gender}</div>
                </div>
              </div>

              <div style={{ ...resultCardStyle, ...categoryCardStyle }}>
                <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> BMI Categories</h4>
                <div style={{ margin: '20px 0' }}>
                  <div style={{ 
                    padding: '15px', 
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>World Health Organization Classification:</strong></div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <span style={{ fontSize: '0.9rem', width: '50%' }}>Underweight</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#f39c12', width: '25%', textAlign: 'center' }}>
                        {'<'}18.5
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                        Increased risk
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <span style={{ fontSize: '0.9rem', width: '50%' }}>Normal Weight</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#27ae60', width: '25%', textAlign: 'center' }}>
                        18.5-24.9
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                        Lowest risk
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <span style={{ fontSize: '0.9rem', width: '50%' }}>Overweight</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#e67e22', width: '25%', textAlign: 'center' }}>
                        25-29.9
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                        Moderate risk
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0'
                    }}>
                      <span style={{ fontSize: '0.9rem', width: '50%' }}>Obese</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#e74c3c', width: '25%', textAlign: 'center' }}>
                        ≥30
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                        High risk
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>{results.whr || 'N/A'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Waist-Hip Ratio</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00b894' }}>{results.healthMetrics.bsa} m²</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Body Surface Area</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b59b6' }}>{results.healthMetrics.ponderalIndex}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Ponderal Index</div>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <div><strong>Your Position:</strong></div>
                  <div>• BMI: {results.bmi} ({results.category})</div>
                  <div>• WHR: {results.whr || 'Not calculated'} ({results.whrCategory})</div>
                  <div>• Prime: {results.bmiPrime} (1.0 = upper limit of normal)</div>
                </div>
              </div>

              <div style={{ ...resultCardStyle, ...riskCardStyle }}>
                <h4 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Health Recommendations</h4>
                <div style={{ margin: '20px 0' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '15px', color: '#666' }}>
                    <strong>Action Plan Based on Your BMI:</strong>
                  </div>
                  {results.recommendations.map((rec, index) => (
                    <div key={index} style={{
                      padding: '12px',
                      background: '#f8f9fa',
                      borderRadius: '6px',
                      marginBottom: '12px',
                      borderLeft: '4px solid #f39c12'
                    }}>
                      <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                        <strong style={{ marginRight: '5px' }}>{index + 1}.</strong> {rec}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <div><strong>Metabolic Metrics:</strong></div>
                  <div>• BMR: {results.healthMetrics.bmr || 'N/A'} calories/day</div>
                  <div>• TDEE: {results.healthMetrics.tdee || 'N/A'} calories/day</div>
                  <div>• Body Fat: {results.healthMetrics.bodyFatPercentage}% (estimated)</div>
                  <div>• Lean Mass: {results.healthMetrics.lbm} kg</div>
                </div>
              </div>

              <div style={{ ...resultCardStyle, ...bodyCardStyle }}>
                <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Body Composition</h4>
                <div style={{ margin: '20px 0' }}>
                  <div style={{ 
                    padding: '15px', 
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Comprehensive Assessment:</strong></div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      <div style={{ marginBottom: '8px' }}>• BMI measures weight relative to height</div>
                      <div style={{ marginBottom: '8px' }}>• Waist-hip ratio assesses fat distribution</div>
                      <div style={{ marginBottom: '8px' }}>• Body surface area important for medication dosing</div>
                      <div>• Ponderal index alternative for extreme heights</div>
                    </div>
                  </div>
                  {results.healthMetrics.bmr && (
                    <div style={{ 
                      padding: '10px', 
                      background: '#ebf5fb',
                      borderRadius: '8px',
                      fontSize: '0.85rem'
                    }}>
                      <strong>Daily Calorie Needs:</strong><br/>
                      BMR: {results.healthMetrics.bmr} cal (basal)<br/>
                      TDEE: {results.healthMetrics.tdee} cal (total)
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <div><strong>Important:</strong></div>
                  <div>• BMI is a screening tool, not diagnostic</div>
                  <div>• Consult healthcare provider for comprehensive assessment</div>
                  <div>• Consider body composition analysis for accuracy</div>
                  <div>• Regular monitoring recommended for health management</div>
                </div>
              </div>
            </div>

            {/* Share and Download Buttons */}
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
          </>
        )}

        <div
          style={adSlotStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverAdSlotStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = adSlotStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <p><i className="fas fa-ad"></i> Advertisement</p>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium body composition analysis tool</p>
        </div>

        {/* Enhanced SEO Content */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Body Mass Index Analysis: Advanced Anthropometric Assessment & Metabolic Health Risk Stratification Protocol</h3>
          <p style={paragraphStyle}><strong>Body Mass Index calculation methodologies</strong> represent <strong>essential clinical anthropometric assessment tools</strong> for determining <strong>precise weight classification parameters, obesity-related metabolic risk stratification algorithms, and evidence-based weight management intervention strategies</strong>. These advanced calculations integrate <strong>sophisticated biometric analysis, comprehensive body composition data parameters, and validated public health research models</strong> to provide <strong>individualized health risk assessment approaches</strong> that maximize <strong>chronic disease prevention effectiveness, metabolic syndrome identification accuracy, and informed lifestyle intervention decision-making processes</strong> across diverse population demographics requiring <strong>precision weight classification stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced BMI Algorithms - Comprehensive Anthropometric Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated Body Mass Index calculation equations</strong> exist for <strong>comprehensive weight assessment protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>health intervention decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Standard Adult BMI Formula:</strong> BMI = Weight (kg) ÷ [Height (m)]²<br/>
            <strong>Imperial System Adaptation:</strong> BMI = [Weight (lbs) ÷ Height (in)²] × 703<br/>
            <strong>Pediatric BMI Percentile Calculation:</strong> BMI-for-age = (BMI Value) compared to CDC growth chart percentiles<br/>
            <strong>Adjusted BMI for Age Consideration:</strong> Age-Adjusted BMI = Standard BMI × (1 + [Age Factor Coefficient])<br/>
            <strong>Ponderal Index Alternative:</strong> PI = Weight (kg) ÷ Height (m)³ (superior for extreme height variations)<br/>
            <strong>Body Adiposity Index Formula:</strong> BAI = (Hip Circumference ÷ Height¹.⁵) - 18 (circumference-based assessment)<br/>
            <strong>BMI Prime Simplification:</strong> BMI Prime = Actual BMI ÷ 25 (simplified classification metric)<br/>
            <strong>New BMI Formulation:</strong> New BMI = 1.3 × Weight (kg) ÷ Height (m)².⁵ (proposed improved formula)
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of BMI Analysis - Comprehensive Weight Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>Body Mass Index assessment methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and public health areas</strong> requiring <strong>precise weight classification strategies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Preventive Medicine Protocol:</strong> Essential for <strong>population obesity screening strategies, metabolic syndrome identification approaches, and chronic disease prevention interventions</strong> in primary care clinical practice settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Bariatric Surgery Assessment:</strong> Guides <strong>surgical eligibility determination algorithms, procedure selection criteria frameworks, and postoperative outcome monitoring protocols</strong> in severe obesity management programs</li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Status Evaluation:</strong> Determines <strong>malnutrition risk assessment strategies, dietary intervention planning methodologies, and nutritional supplement requirement calculations</strong> for comprehensive nutritional care delivery</li>
            <li style={{ marginBottom: '10px' }}><strong>Epidemiological Research Applications:</strong> Essential for <strong>population health trend analysis systems, obesity prevalence tracking frameworks, and public health policy development models</strong> in health services research initiatives</li>
            <li style={{ marginBottom: '10px' }}><strong>Insurance Risk Assessment:</strong> Manages <strong>premium calculation algorithms, underwriting risk stratification protocols, and coverage eligibility determination requirements</strong> for health insurance provision systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Military and Occupational Health:</strong> Coordinates <strong>fitness standard compliance monitoring, duty assignment suitability assessment, and performance capability evaluation approaches</strong> for occupational health management programs</li>
            <li><strong>Pediatric Growth Monitoring:</strong> Facilitates <strong>childhood development tracking systems, growth disorder detection methodologies, and nutritional intervention timing protocols</strong> for comprehensive pediatric health advancement</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Factors in BMI Interpretation - Comprehensive Anthropometric Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and demographic factors</strong> influence <strong>Body Mass Index interpretation parameters</strong> and require consideration for appropriate clinical decision-making:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Ethnic-Specific Variations:</strong> Asian population lower risk thresholds, African descent population different fat distribution patterns, and indigenous population unique metabolic profiles significantly affect <strong>BMI classification accuracy and cardiovascular risk assessment validity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Changes:</strong> Pediatric growth curve considerations, adult metabolic rate variations, and elderly sarcopenia development patterns dramatically alter <strong>BMI interpretation frameworks and health risk correlation validities</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Muscle Mass Considerations:</strong> Athletic training physiological effects, occupational physical demands, and genetic muscle potential variations create <strong>specific BMI limitation scenarios requiring complementary body composition assessment approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Body Composition Variables:</strong> Visceral fat accumulation patterns, subcutaneous fat distribution differences, and lean tissue mass variations demonstrate <strong>individualized health risk variations beyond simple weight classification metrics</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Measurement Accuracy Factors:</strong> Height measurement precision requirements, weight fluctuation temporal impacts, and anthropometric variation patterns affect <strong>BMI calculation reliability and longitudinal health tracking validity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Health Status Interactions:</strong> Pregnancy weight physiological changes, edema pathological conditions, amputation surgical situations, and chronic disease metabolic states create <strong>specialized interpretation challenges requiring expert clinical assessment expertise</strong></li>
            <li><strong>Psychological Considerations:</strong> Body image perception influences, eating disorder risk factors, and weight stigma psychological impacts significantly influence <strong>BMI discussion approaches and lifestyle intervention acceptance likelihoods</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of BMI Calculations - Advanced Anthropometric Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>Body Mass Index calculation methodologies</strong> provide valuable <strong>population health screening tools</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive medical evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Athletic Population Assessments:</strong> Professional athlete body composition evaluation, strength training individual monitoring, and military personnel fitness tracking demonstrating <strong>specialized assessment needs beyond standard BMI classification algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Geriatric Health Evaluation:</strong> Sarcopenic obesity identification protocols, frailty syndrome assessment frameworks, and age-related body composition physiological changes showing <strong>unique health risk patterns requiring specialized clinical approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Pregnancy and Postpartum Monitoring:</strong> Gestational weight gain physiological tracking, postpartum weight retention assessment, and breastfeeding nutrition special requirements creating <strong>specialized monitoring protocols beyond standard BMI applications</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Chronic Disease Contexts:</strong> Renal failure with fluid retention complications, congestive heart failure with edema manifestations, and liver disease with ascites presentations affecting <strong>weight measurement interpretation reliability and clinical utility</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Body Composition Requirements:</strong> Dual-energy X-ray absorptiometry (DEXA) scanning technologies, bioelectrical impedance analysis (BIA) methodologies, and underwater weighing hydrostatic techniques providing <strong>enhanced precision beyond basic BMI calculations</strong></li>
            <li><strong>Genetic and Metabolic Disorders:</strong> Prader-Willi syndrome specialized monitoring, lipodystrophy rare condition assessment, and metabolic syndrome comprehensive evaluation enabling <strong>enhanced individualized assessment approaches beyond population screening tools</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of BMI Science - Evolution of Anthropometric Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>Body Mass Index assessment and interpretation methodologies</strong> reflects <strong>centuries of medical research advancement</strong> and <strong>scientific practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Anthropometric Discovery Era:</strong> Recognition of <strong>height-weight relationship principles, body proportion concepts, and nutritional status assessment foundations</strong> establishing foundational public health knowledge systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Quetelet Index Development Period:</strong> Creation of <strong>mathematical height-weight ratio frameworks, population study standardization methods, and statistical analysis application approaches</strong> revolutionizing nutritional epidemiology science</li>
            <li style={{ marginBottom: '10px' }}><strong>Modern BMI Standardization:</strong> Introduction of <strong>World Health Organization classification systems, clinical practice guideline implementations, and international comparison standardization protocols</strong> for global health assessment consistency</li>
            <li style={{ marginBottom: '10px' }}><strong>Limitation Recognition Phase:</strong> Identification of <strong>muscle mass confounding effects, ethnic variation considerations, and age-specific adjustment needs</strong> for enhanced clinical application accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Alternative Index Development:</strong> Implementation of <strong>waist circumference measurements, body fat percentage assessments, and metabolic syndrome criteria applications</strong> for comprehensive health risk evaluation</li>
            <li><strong>Digital Health Integration:</strong> Development of <strong>electronic medical record algorithms, mobile health application implementations, artificial intelligence prediction models, and population health analytics platforms</strong> for scalable public health monitoring</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Weight Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>Body Mass Index assessment implementation</strong> in contemporary clinical practice environments and <strong>evidence-based weight management protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Standardized Measurement Protocol:</strong> Implement <strong>accurate height measurement techniques, precise weight assessment methods, consistent measurement condition controls, and proper equipment calibration procedures</strong> before clinical interpretation determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Classification Strategies:</strong> Utilize <strong>age-specific percentile charts for pediatric assessment, ethnic-adjusted cut-off values where applicable, and clinical context integration frameworks</strong> for accurate health risk categorization</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Risk Assessment:</strong> Develop <strong>waist circumference measurement integration, blood pressure correlation analysis, laboratory parameter consideration, and family history evaluation approaches</strong> for holistic patient risk profiling</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Intervention Planning:</strong> Establish <strong>personalized weight management targets, appropriate referral pathway algorithms, multidisciplinary team coordination frameworks, and longitudinal monitoring schedule optimization</strong> for optimal treatment outcomes</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Systems:</strong> Implement <strong>clear result interpretation guidance, realistic expectation setting protocols, sustainable lifestyle modification education, and behavioral change support provision</strong> for empowered patient participation</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>primary care physician-specialist communication, dietitian consultation integration, exercise physiologist involvement, and mental health professional support</strong> for comprehensive weight management care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in BMI Assessment - Emerging Anthropometric Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>Body Mass Index research initiatives</strong> continue refining <strong>assessment and interpretation approaches</strong> with promising technological developments and <strong>innovative health monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Body Composition Technologies:</strong> 3D body scanning systems, smart scale bioimpedance devices, wearable body composition monitors, and smartphone camera assessment applications for comprehensive anthropometric profiling</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized risk prediction models</strong> incorporating genetic data, lifestyle factors, environmental influences, and health outcome correlations</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Health Integration:</strong> Continuous glucose monitoring correlation, inflammatory biomarker assessment, gut microbiome analysis, and epigenetic profiling for enhanced metabolic risk characterization</li>
            <li style={{ marginBottom: '10px' }}><strong>Digital Health Platforms:</strong> Development of <strong>integrated health management systems, remote monitoring applications, telehealth consultation platforms, and population health analytics solutions</strong> for scalable weight management delivery</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Medicine Approaches:</strong> Genetic predisposition testing for obesity, pharmacogenetic treatment response prediction, microbiome-based intervention personalization, and metabolomic profiling for individualized therapy</li>
            <li><strong>Global Health Innovations:</strong> Creation of <strong>low-cost assessment technologies, resource-limited setting adaptations, community-based screening programs, and task-shifting implementation strategies</strong> for equitable health monitoring access</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>Body Mass Index interpretation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>anthropometric measurement principles, growth assessment fundamentals, obesity classification strategies, and metabolic risk evaluation methods</strong>. Continuing professional education programs must consistently address <strong>evolving research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient outcomes and evidence-based practice implementation across diverse healthcare, public health, and primary care delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent weight management practices</strong> across diverse clinical settings. These protocols encompass <strong>measurement standardization methodologies, equipment calibration requirements, interpretation guideline adherence, and treatment protocol implementation standards</strong> that directly impact <strong>patient health outcomes and weight management effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and clinical practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based weight management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About BMI</h2>
          {faqs.map((faq, index) => (
            <div key={index} style={faqItemStyle}>
              <div
                style={{
                  ...faqQuestionStyle,
                  ...(activeFAQ === index ? hoverFaqQuestionStyle : {})
                }}
                onClick={() => toggleFAQ(index)}
                onMouseEnter={(e) => e.currentTarget.style.background = hoverFaqQuestionStyle.background}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = activeFAQ === index
                    ? hoverFaqQuestionStyle.background
                    : faqQuestionStyle.background;
                }}
              >
                {faq.question}
                <i className={`fas fa-chevron-${activeFAQ === index ? 'up' : 'down'}`}></i>
              </div>
              <div style={{
                ...faqAnswerStyle,
                ...(activeFAQ === index ? activeFaqAnswerStyle : {})
              }}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Related Calculators Mobile Section (when sidebar is hidden) */}
        {!showSidebar && (
          <div style={infoSectionStyle}>
            <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Health Calculators</h3>
            <p style={paragraphStyle}>Explore our comprehensive collection of health and fitness calculators for complete wellness assessment:</p>
            <div style={calculatorsGridStyle}>
              {relatedCalculators.map((calculator, index) => (
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
                  <i className="fas fa-calculator" style={{ marginRight: '5px' }}></i> {calculator.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div style={medicalDisclaimerStyle}>
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer</h4>
          <p style={paragraphStyle}><strong>This BMI calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard medical formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>BMI Limitations Warning:</strong> BMI does not account for muscle mass, bone density, overall body composition, or racial and sex differences. Athletes, pregnant women, children, the elderly, and individuals with high muscle mass may get misleading results.</p>
          <p style={paragraphStyle}><strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, or other qualified healthcare provider with any questions regarding weight management, nutrition, or health conditions. Do not make significant changes to your diet or exercise regimen based solely on BMI calculations.</p>
          <p style={{ marginBottom: '10px' }}><strong>Comprehensive Health Assessment:</strong> BMI is just one indicator of health. Comprehensive assessment should include body composition analysis, waist circumference, blood pressure, cholesterol levels, blood glucose, and other relevant health markers.</p>
          <p style={{ marginBottom: '10px' }}><strong>Eating Disorder Considerations:</strong> If you have or suspect you may have an eating disorder, seek professional help immediately. BMI calculations should not be used by individuals with eating disorders without professional supervision.</p>
          <p><strong>Individual Variation:</strong> Healthy weight ranges vary significantly based on age, gender, genetics, muscle mass, and individual health factors. These calculations provide general guidelines that should be interpreted in the context of your overall health.</p>
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
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium fitness tracking app</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Smart body composition scale</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete health assessment package</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px sticky ad</p>
            </div>
            
            {/* Related Calculators Sidebar Section */}
            <div style={{ padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
              <h4 style={{ marginBottom: '15px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-calculator"></i> Related Health Calculators
              </h4>
              <div style={calculatorsGridStyle}>
                {relatedCalculators.map((calculator, index) => (
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
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Additional Ads when sidebar disappears (mobile) */}
      {!showSidebar && (
        <div style={{ ...mobileAdsStyle, display: 'grid' }}>
          <div style={mobileAdStyle}>
            <p><i className="fas fa-ad"></i> Mobile Advertisement 1</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Optimized for mobile viewing</p>
          </div>
          <div style={mobileAdStyle}>
            <p><i className="fas fa-ad"></i> Mobile Advertisement 2</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for on-the-go tracking</p>
          </div>
        </div>
      )}
      
      {/* Sticky Footer Ad (Mobile) */}
      {!showSidebar && (
        <div style={stickyFooterAdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#2c3e50' }}>
                <i className="fas fa-mobile-alt"></i> Mobile Health Tracker
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Track your BMI and health metrics anytime - Free download
              </p>
            </div>
            <button style={{
              background: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '15px'
            }}>
              Get App
            </button>
          </div>
        </div>
      )}
    </main>
  );
}