"use client";

import { useState, useEffect } from 'react';

export default function PregnancyWeightGainPage() {
  const [prePregnancyWeight, setPrePregnancyWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weeksPregnant, setWeeksPregnant] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [age, setAge] = useState('');
  const [parity, setParity] = useState('0');
  const [multiplePregnancy, setMultiplePregnancy] = useState('single');
  const [bmiCategory, setBmiCategory] = useState('normal');
  const [results, setResults] = useState(null);
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
    background: '#3498db',
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
    background: '#2980b9',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.2)'
  };

  // Share/Download button styles
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

  const weightGainCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const recommendationsCardStyle = {
    borderTopColor: '#3498db'
  };

  const weeklyCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#9b59b6',
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
    borderLeft: '4px solid #3498db',
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
    border: '2px solid #3498db',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.15)',
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

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#fff8e1',
    borderRadius: '10px',
    borderLeft: '5px solid #f39c12',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#e67e22',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Sidebar calculators sorted by SEO relevance
  const sidebarCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 10 },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 9 },
    { name: "Pregnancy Due Date", link: "/pregnancy-due-date-calculator", relevance: 9 },
    { name: "Ovulation Tracker", link: "/ovulation-tracker", relevance: 9 },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator", relevance: 8 },
    { name: "Waist Hip Ratio", link: "/waist-hip-ratio", relevance: 8 },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 8 },
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 8 },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 8 },
    { name: "Fertile Window", link: "/fertile-window-calculator", relevance: 8 },
    { name: "BSA Calculator", link: "/bsa-calculator", relevance: 7 },
    { name: "Lean Body Mass", link: "/lbm-calculator", relevance: 7 },
    { name: "Water Intake", link: "/water-intake-calculator", relevance: 7 },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 7 },
    { name: "GFR Calculator", link: "/gfr-calculator", relevance: 6 },
    { name: "Creatinine Clearance", link: "/creatinine-clearance", relevance: 6 },
    { name: "Fluid Requirements", link: "/fluid-requirement", relevance: 6 },
    { name: "Medication Dosage", link: "/medication-dosage", relevance: 6 },
    { name: "Nutritional Needs", link: "/nutritional-needs", relevance: 6 },
    { name: "Cardiac Index", link: "/cardiac-index-calculator", relevance: 5 },
    { name: "Safe Period", link: "/safe-period-calculator", relevance: 5 },
    { name: "Period Cycle", link: "/period-cycle-calculator", relevance: 5 },
    { name: "Blood Pressure Category", link: "/blood-pressure-category-calculator", relevance: 5 },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 5 },
    { name: "Heart Disease Risk", link: "/heart-disease-risk-calculator", relevance: 5 },
    { name: "Carbohydrate Intake", link: "/carbohydrate-intake-calculator", relevance: 4 },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator", relevance: 4 },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator", relevance: 4 },
    { name: "Pregnancy Test", link: "/pregnancy-test", relevance: 4 },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker", relevance: 4 }
  ];

  // Sort by relevance
  const sortedCalculators = [...sidebarCalculators].sort((a, b) => b.relevance - a.relevance);

  // BMI categories with weight gain recommendations (IOM 2009 guidelines)
  const bmiCategories = [
    { id: 'underweight', name: 'Underweight', bmiRange: '<18.5', totalGain: '12.5-18 kg', weeklyGain: '0.51 kg/week' },
    { id: 'normal', name: 'Normal Weight', bmiRange: '18.5-24.9', totalGain: '11.5-16 kg', weeklyGain: '0.42 kg/week' },
    { id: 'overweight', name: 'Overweight', bmiRange: '25.0-29.9', totalGain: '7-11.5 kg', weeklyGain: '0.28 kg/week' },
    { id: 'obese', name: 'Obese', bmiRange: '≥30.0', totalGain: '5-9 kg', weeklyGain: '0.22 kg/week' }
  ];

  // Multiple pregnancy guidelines
  const multiplePregnancyOptions = [
    { id: 'single', name: 'Single', totalGain: 'Standard BMI-based' },
    { id: 'twins', name: 'Twins', totalGain: '17-25 kg for normal BMI' },
    { id: 'triplets', name: 'Triplets+', totalGain: 'Individualized recommendations' }
  ];

  // Sample data for demo
  useEffect(() => {
    setPrePregnancyWeight('65');
    setHeight('165');
    setWeeksPregnant('20');
    setCurrentWeight('70');
    setAge('30');
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

  const calculatePregnancyWeightGain = () => {
    // Validate inputs
    if (!prePregnancyWeight || !height || !weeksPregnant) {
      alert('Please fill in pre-pregnancy weight, height, and weeks pregnant.');
      return;
    }

    const preWeightVal = parseFloat(prePregnancyWeight);
    const heightVal = parseFloat(height);
    const weeksVal = parseFloat(weeksPregnant);
    const currentWeightVal = parseFloat(currentWeight) || preWeightVal;
    const ageVal = parseFloat(age) || 30;
    const parityVal = parseInt(parity) || 0;

    if (preWeightVal <= 0 || heightVal <= 0 || weeksVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    // Calculate pre-pregnancy BMI
    const heightInMeters = heightVal / 100;
    const prePregnancyBMI = preWeightVal / (heightInMeters * heightInMeters);

    // Determine BMI category
    let calculatedBmiCategory = 'normal';
    if (prePregnancyBMI < 18.5) calculatedBmiCategory = 'underweight';
    else if (prePregnancyBMI < 25) calculatedBmiCategory = 'normal';
    else if (prePregnancyBMI < 30) calculatedBmiCategory = 'overweight';
    else calculatedBmiCategory = 'obese';

    // Use selected category or calculated one
    const finalBmiCategory = bmiCategory !== 'normal' ? bmiCategory : calculatedBmiCategory;
    const bmiData = bmiCategories.find(cat => cat.id === finalBmiCategory);

    // Calculate weight gain so far
    const currentGain = currentWeightVal - preWeightVal;

    // Calculate expected total gain based on BMI category
    let expectedTotalGainMin = 11.5;
    let expectedTotalGainMax = 16;
    let weeklyRate = 0.42;

    switch(finalBmiCategory) {
      case 'underweight':
        expectedTotalGainMin = 12.5;
        expectedTotalGainMax = 18;
        weeklyRate = 0.51;
        break;
      case 'overweight':
        expectedTotalGainMin = 7;
        expectedTotalGainMax = 11.5;
        weeklyRate = 0.28;
        break;
      case 'obese':
        expectedTotalGainMin = 5;
        expectedTotalGainMax = 9;
        weeklyRate = 0.22;
        break;
    }

    // Adjust for multiple pregnancy
    if (multiplePregnancy === 'twins') {
      expectedTotalGainMin = 17;
      expectedTotalGainMax = 25;
      weeklyRate = 0.68;
    } else if (multiplePregnancy === 'triplets') {
      expectedTotalGainMin = 20;
      expectedTotalGainMax = 30;
      weeklyRate = 0.80;
    }

    // Calculate expected gain at current week
    const weeksRemaining = 40 - weeksVal;
    const expectedGainAtCurrentWeek = weeklyRate * weeksVal;
    const expectedTotalGainAtTerm = weeklyRate * 40;

    // Determine if current gain is appropriate
    let gainStatus = 'Appropriate';
    let gainAssessment = '';
    let recommendations = [];

    if (currentGain < expectedGainAtCurrentWeek * 0.7) {
      gainStatus = 'Below Recommended';
      gainAssessment = 'Weight gain may be insufficient for optimal fetal growth';
      recommendations.push('Consult with healthcare provider about nutrition');
      recommendations.push('Consider meeting with a registered dietitian');
      recommendations.push('Ensure adequate calorie and nutrient intake');
    } else if (currentGain > expectedGainAtCurrentWeek * 1.3) {
      gainStatus = 'Above Recommended';
      gainAssessment = 'Weight gain may be excessive, increasing pregnancy risks';
      recommendations.push('Focus on nutrient-dense, lower-calorie foods');
      recommendations.push('Continue moderate physical activity if approved by provider');
      recommendations.push('Monitor for signs of gestational diabetes');
    } else {
      gainStatus = 'Within Recommended Range';
      gainAssessment = 'Weight gain appears appropriate for your stage of pregnancy';
      recommendations.push('Continue balanced nutrition and regular prenatal care');
      recommendations.push('Maintain moderate physical activity as tolerated');
      recommendations.push('Attend all scheduled prenatal appointments');
    }

    // Calculate weekly rate needed to reach target
    const remainingGainNeeded = expectedTotalGainAtTerm - currentGain;
    const weeklyRateNeeded = weeksRemaining > 0 ? remainingGainNeeded / weeksRemaining : 0;

    // Calculate trimester-specific recommendations
    const trimester = weeksVal <= 13 ? 1 : (weeksVal <= 26 ? 2 : 3);
    let trimesterGain = '';
    
    if (trimester === 1) {
      trimesterGain = '0.5-2 kg total (minimal gain expected)';
    } else if (trimester === 2) {
      trimesterGain = `~${weeklyRate.toFixed(2)} kg per week`;
    } else {
      trimesterGain = `~${weeklyRate.toFixed(2)} kg per week until delivery`;
    }

    setResults({
      prePregnancyBMI: prePregnancyBMI.toFixed(1),
      bmiCategory: bmiData?.name || 'Normal Weight',
      currentGain: currentGain.toFixed(1),
      gainStatus: gainStatus,
      gainAssessment: gainAssessment,
      expectedTotalGain: `${expectedTotalGainMin}-${expectedTotalGainMax} kg`,
      weeklyRate: weeklyRate.toFixed(2),
      weeklyRateNeeded: weeklyRateNeeded.toFixed(2),
      expectedGainAtCurrentWeek: expectedGainAtCurrentWeek.toFixed(1),
      remainingGainNeeded: remainingGainNeeded.toFixed(1),
      recommendations: recommendations,
      trimester: trimester,
      trimesterGain: trimesterGain,
      parity: parityVal,
      multiplePregnancy: multiplePregnancyOptions.find(m => m.id === multiplePregnancy)?.name || 'Single',
      age: ageVal,
      weeksPregnant: weeksVal,
      prePregnancyWeight: preWeightVal,
      currentWeight: currentWeightVal,
      height: heightVal
    });
    setShowShareMenu(false);
  };

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate pregnancy weight gain first before sharing.');
      return;
    }

    const shareText = `My pregnancy weight gain at ${results.weeksPregnant} weeks: ${results.currentGain}kg (${results.gainStatus}) - Check yours using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'Pregnancy,WeightGain,MaternityHealth,PrenatalCare';

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
        shareUrlFull = `mailto:?subject=My Pregnancy Weight Gain Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My Pregnancy Weight Gain Results',
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
      alert('Please calculate pregnancy weight gain first before downloading.');
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
    <title>Pregnancy Weight Gain Calculator Results</title>
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
            border-bottom: 3px solid #3498db;
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
        
        .weight-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: #9b59b6;
        }
        
        .weight-category {
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
        
        .recommendation-item {
            padding: 12px;
            background: #e8f5e9;
            border-radius: 6px;
            margin-bottom: 12px;
            border-left: 4px solid #2ecc71;
        }
        
        .status-box {
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: bold;
            text-align: center;
        }
        
        .disclaimer {
            background: #fff8e1;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #f39c12;
            margin-top: 30px;
        }
        
        .disclaimer h4 {
            color: #e67e22;
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
            <h1><i class="fas fa-baby"></i> Pregnancy Weight Gain Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Main Results Card -->
            <div class="result-card" style="border-top-color: #9b59b6;">
                <h3 class="card-title"><i class="fas fa-weight-scale" style="color: #9b59b6;"></i> Weight Gain Analysis</h3>
                <div class="weight-value">${results.currentGain} kg</div>
                <div class="weight-category">Current Weight Gain</div>
                <div class="status-box" style="background: ${results.gainStatus === 'Within Recommended Range' ? '#d4edda' : 
                                results.gainStatus === 'Below Recommended' ? '#fff3cd' : '#f8d7da'}; 
                                color: ${results.gainStatus === 'Within Recommended Range' ? '#155724' : 
                                results.gainStatus === 'Below Recommended' ? '#856404' : '#721c24'};">
                    ${results.gainStatus}
                </div>
                <div class="info-box">
                    <p><strong>Assessment:</strong> ${results.gainAssessment}</p>
                    <p><strong>Weeks Pregnant:</strong> ${results.weeksPregnant}</p>
                    <p><strong>Pre-pregnancy BMI:</strong> ${results.prePregnancyBMI} (${results.bmiCategory})</p>
                    <p><strong>Expected gain at ${results.weeksPregnant} weeks:</strong> ${results.expectedGainAtCurrentWeek} kg</p>
                </div>
            </div>
            
            <!-- Recommendations Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-bullseye" style="color: #3498db;"></i> Recommendations & Targets</h3>
                <div class="info-box">
                    <p><strong>Total Recommended Gain:</strong> ${results.expectedTotalGain} kg</p>
                    <p><strong>Trimester ${results.trimester} Gain:</strong> ${results.trimesterGain}</p>
                    <p><strong>Multiple Pregnancy:</strong> ${results.multiplePregnancy}</p>
                    <p><strong>Previous Pregnancies:</strong> ${results.parity}</p>
                    <p><strong>Age:</strong> ${results.age} years</p>
                </div>
                <h4 style="margin: 20px 0 10px 0; color: #2c3e50;"><i class="fas fa-lightbulb"></i> Recommendations:</h4>
                ${results.recommendations.map((rec, index) => `
                <div class="recommendation-item">
                    <strong>${index + 1}.</strong> ${rec}
                </div>
                `).join('')}
            </div>
            
            <!-- Weekly Planning Card -->
            <div class="result-card" style="border-top-color: #2ecc71;">
                <h3 class="card-title"><i class="fas fa-calendar-week" style="color: #2ecc71;"></i> Weekly Planning</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: bold; color: #2ecc71;">${results.weeklyRate} kg/week</div>
                        <div style="font-size: 0.9rem; color: #666;">Recommended Weekly Rate</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: bold; color: #e74c3c;">${results.weeklyRateNeeded} kg/week</div>
                        <div style="font-size: 0.9rem; color: #666;">Rate Needed to Reach Target</div>
                    </div>
                </div>
                <div class="info-box">
                    <p><strong>Remaining Pregnancy:</strong> ${results.remainingGainNeeded} kg needed over ${40 - results.weeksPregnant} weeks</p>
                    <p><strong>Based on:</strong> Institute of Medicine 2009 Guidelines</p>
                    <p><strong>Note:</strong> Individual needs may vary - consult healthcare provider</p>
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This pregnancy weight gain calculation is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician, midwife, or other qualified healthcare provider with any questions regarding pregnancy weight gain or nutritional planning.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Pregnancy Weight Gain Calculator • ${window.location.href}</p>
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
    a.download = `pregnancy-weight-gain-results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download as text file
  const downloadText = () => {
    if (!results) {
      alert('Please calculate pregnancy weight gain first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                    PREGNANCY WEIGHT GAIN CALCULATOR RESULTS                   ║\n`;
    content += `║                    Generated: ${date} at ${time}                   ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    // Main Results
    content += `WEIGHT GAIN ANALYSIS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Current Weight Gain: ${results.currentGain} kg\n`;
    content += `  Status: ${results.gainStatus}\n`;
    content += `  Assessment: ${results.gainAssessment}\n`;
    content += `  Weeks Pregnant: ${results.weeksPregnant}\n`;
    content += `  Pre-pregnancy BMI: ${results.prePregnancyBMI} (${results.bmiCategory})\n`;
    content += `  Expected gain at ${results.weeksPregnant} weeks: ${results.expectedGainAtCurrentWeek} kg\n\n`;
    
    // Recommendations
    content += `RECOMMENDATIONS & TARGETS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Total Recommended Gain: ${results.expectedTotalGain} kg\n`;
    content += `  Trimester ${results.trimester} Gain: ${results.trimesterGain}\n`;
    content += `  Multiple Pregnancy: ${results.multiplePregnancy}\n`;
    content += `  Previous Pregnancies: ${results.parity}\n`;
    content += `  Age: ${results.age} years\n\n`;
    
    content += `  Recommendations:\n`;
    results.recommendations.forEach((rec, index) => {
      content += `  ${index + 1}. ${rec}\n`;
    });
    content += `\n`;
    
    // Weekly Planning
    content += `WEEKLY PLANNING:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Recommended Weekly Rate: ${results.weeklyRate} kg/week\n`;
    content += `  Rate Needed to Reach Target: ${results.weeklyRateNeeded} kg/week\n`;
    content += `  Remaining Pregnancy: ${results.remainingGainNeeded} kg needed over ${40 - results.weeksPregnant} weeks\n`;
    content += `  Based on: Institute of Medicine 2009 Guidelines\n`;
    content += `  Note: Individual needs may vary - consult healthcare provider\n\n`;
    
    // Personal Information
    content += `PERSONAL INFORMATION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Pre-pregnancy Weight: ${results.prePregnancyWeight} kg\n`;
    content += `  Current Weight: ${results.currentWeight} kg\n`;
    content += `  Height: ${results.height} cm\n\n`;
    
    // Disclaimer
    content += `IMPORTANT MEDICAL DISCLAIMER:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `This pregnancy weight gain calculation is for informational purposes only.\n`;
    content += `It is not a substitute for professional medical advice, diagnosis, or treatment.\n`;
    content += `Always seek the advice of your physician, midwife, or other qualified\n`;
    content += `healthcare provider with any questions regarding pregnancy weight gain\n`;
    content += `or nutritional planning.\n\n`;
    
    content += `Generated by Pregnancy Weight Gain Calculator\n`;
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
    a.download = `pregnancy-weight-gain-results-${new Date().toISOString().split('T')[0]}.txt`;
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
      question: "What are the Institute of Medicine (IOM) guidelines for pregnancy weight gain?",
      answer: "The 2009 IOM guidelines recommend: Underweight (BMI <18.5): 12.5-18 kg; Normal weight (BMI 18.5-24.9): 11.5-16 kg; Overweight (BMI 25-29.9): 7-11.5 kg; Obese (BMI ≥30): 5-9 kg. For twin pregnancies: Normal weight: 17-25 kg; Overweight: 14-23 kg; Obese: 11-19 kg. These ranges optimize outcomes for both mother and baby."
    },
    {
      question: "How does pregnancy weight gain distribute in the body?",
      answer: "Typical distribution at term: Baby: 3.4 kg; Placenta: 0.7 kg; Amniotic fluid: 0.8 kg; Uterus: 0.9 kg; Breast tissue: 0.9 kg; Blood volume: 1.8 kg; Fluid volume: 1.8 kg; Maternal fat stores: 3.2 kg. Total: ~12.5 kg. Underweight women may need more fat stores, while obese women need less. This distribution supports fetal growth, breastfeeding, and maternal health."
    },
    {
      question: "What are the risks of insufficient or excessive weight gain?",
      answer: "Insufficient gain risks: Preterm birth, low birth weight, fetal growth restriction, developmental issues. Excessive gain risks: Gestational diabetes, preeclampsia, cesarean delivery, macrosomia (large baby), childhood obesity, maternal postpartum weight retention. Both extremes increase risk of pregnancy complications and long-term health issues for mother and child."
    },
    {
      question: "How does weight gain differ by trimester?",
      answer: "First trimester: 0.5-2 kg total (often minimal due to nausea). Second trimester: 0.35-0.5 kg/week for normal BMI. Third trimester: 0.35-0.5 kg/week until delivery. Underweight women may need slightly more per week, obese women slightly less. Weight gain pattern matters more than total - steady, consistent gain is ideal rather than rapid gains."
    },
    {
      question: "How should weight gain be managed with morning sickness or other complications?",
      answer: "Morning sickness: Focus on staying hydrated, small frequent meals, bland foods. Weight loss or minimal gain in first trimester is usually acceptable if catching up occurs later. Gestational diabetes: Follow medical nutrition therapy, monitor blood glucose, control carbohydrate intake. Preeclampsia: Follow medical advice, may have fluid retention affecting weight. Always consult healthcare provider for personalized guidance."
    },
    {
      question: "How does age affect pregnancy weight gain recommendations?",
      answer: "Teen mothers (under 20): Need additional weight gain to support their own growth plus fetal development. Women over 35: May need to gain in upper range of recommendations due to increased risk of low birth weight. Older mothers also need careful monitoring for gestational diabetes and hypertension risks. Always follow provider's personalized recommendations based on individual health status."
    }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-baby"></i> Pregnancy Weight Gain Calculator - Comprehensive Gestational Weight Management Protocol
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>personalized pregnancy weight gain recommendations, trimester-specific targets, and optimal gestational weight management strategies</strong> based on <strong>pre-pregnancy BMI, multiple gestation status, and individual health factors</strong>. Essential for <strong>healthy pregnancy outcomes, fetal development optimization, and maternal health preservation</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Pre-Pregnancy Weight (kg)</label>
            <input
              type="number"
              value={prePregnancyWeight}
              onChange={(e) => setPrePregnancyWeight(e.target.value)}
              placeholder="65"
              min="30"
              max="200"
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="165"
              min="100"
              max="250"
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar"></i> Weeks Pregnant</label>
            <input
              type="number"
              value={weeksPregnant}
              onChange={(e) => setWeeksPregnant(e.target.value)}
              placeholder="20"
              min="1"
              max="42"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight-scale"></i> Current Weight (kg)</label>
            <input
              type="number"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="70"
              min="30"
              max="250"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Leave blank if same as pre-pregnancy
            </small>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              min="18"
              max="50"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-baby"></i> Previous Pregnancies</label>
            <select
              value={parity}
              onChange={(e) => setParity(e.target.value)}
              style={selectStyle}
            >
              <option value="0">0 (First pregnancy)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-babies"></i> Multiple Pregnancy</label>
            <select
              value={multiplePregnancy}
              onChange={(e) => setMultiplePregnancy(e.target.value)}
              style={selectStyle}
            >
              {multiplePregnancyOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name} ({option.totalGain})</option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-chart-line"></i> BMI Category</label>
            <select
              value={bmiCategory}
              onChange={(e) => setBmiCategory(e.target.value)}
              style={selectStyle}
            >
              {bmiCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} (BMI {category.bmiRange})
                </option>
              ))}
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Auto-calculated if left as "Normal"
            </small>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculatePregnancyWeightGain}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Pregnancy Weight Gain
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...weightGainCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-bar"></i> Weight Gain Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>{results.currentGain} kg</div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  Current Weight Gain
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: results.gainStatus === 'Within Recommended Range' ? '#d4edda' : 
                            results.gainStatus === 'Below Recommended' ? '#fff3cd' : '#f8d7da',
                  borderRadius: '8px',
                  color: results.gainStatus === 'Within Recommended Range' ? '#155724' : 
                        results.gainStatus === 'Below Recommended' ? '#856404' : '#721c24',
                  fontWeight: '600'
                }}>
                  {results.gainStatus}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Pre-pregnancy BMI: {results.prePregnancyBMI} ({results.bmiCategory})</div>
                <div>Assessment: {results.gainAssessment}</div>
                <div>Expected at {results.weeksPregnant} weeks: {results.expectedGainAtCurrentWeek} kg</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...recommendationsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-bullseye"></i> Recommendations & Targets</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>
                    {results.expectedTotalGain} kg
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Recommended Gain</div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {results.recommendations.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {results.recommendations.map((rec, idx) => (
                        <li key={idx} style={{ marginBottom: '8px' }}>{rec}</li>
                      ))}
                    </ul>
                  ) : 'Continue current healthy practices'}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Trimester {results.trimester}: {results.trimesterGain}</div>
                <div>Multiple Pregnancy: {results.multiplePregnancy}</div>
                <div>Parity: {results.parity} previous pregnancies</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...weeklyCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calendar-week"></i> Weekly Planning</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2ecc71' }}>{results.weeklyRate} kg/week</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Recommended Weekly Rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>{results.weeklyRateNeeded} kg/week</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Rate Needed to Reach Target</div>
                  </div>
                </div>
                <div style={{ marginTop: '15px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '5px' }}>Remaining Pregnancy:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {results.remainingGainNeeded} kg needed over {40 - results.weeksPregnant} weeks
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Based on Institute of Medicine 2009 Guidelines</div>
                <div>Individual needs may vary - consult healthcare provider</div>
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
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Pregnancy Weight Gain Management: Advanced Gestational Weight Optimization Protocol for Optimal Maternal-Fetal Health Outcomes</h3>
          <p style={paragraphStyle}><strong>Pregnancy weight gain calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>optimal gestational weight parameters, trimester-specific growth targets, and individualized maternal-fetal health optimization strategies</strong>. These advanced calculations integrate <strong>pre-pregnancy anthropometric measurements, maternal health factors, multiple gestation considerations, and evidence-based gestational guidelines</strong> to provide <strong>personalized pregnancy management approaches</strong> that maximize <strong>fetal development outcomes while minimizing pregnancy-related complications</strong> across diverse obstetric scenarios requiring <strong>precision prenatal care protocols and specialized nutritional management strategies</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Pregnancy Weight Gain Calculation Methods - Comprehensive Gestational Management Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated pregnancy weight gain determination equations</strong> exist for <strong>comprehensive gestational weight management protocols</strong>, each demonstrating specific <strong>clinical applications and evidence-based accuracy profiles</strong> influencing <strong>prenatal care decision-making processes</strong> and <strong>maternal-fetal health optimization strategies</strong>. These sophisticated algorithms incorporate <strong>advanced mathematical modeling techniques, population-specific adjustment factors, and longitudinal outcome validation data</strong> to ensure <strong>reliable clinical utility and predictive accuracy</strong> across diverse obstetric populations:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Institute of Medicine (IOM) 2009 Protocol - Gold Standard Guidelines:</strong><br/>
            Underweight (BMI &gt;18.5): 12.5-18 kg total gain | 0.51 kg/week (2nd/3rd trimester)<br/>
            Normal weight (BMI 18.5-24.9): 11.5-16 kg total gain | 0.42 kg/week (2nd/3rd trimester)<br/>
            Overweight (BMI 25.0-29.9): 7-11.5 kg total gain | 0.28 kg/week (2nd/3rd trimester)<br/>
            Obese (BMI ≥30.0): 5-9 kg total gain | 0.22 kg/week (2nd/3rd trimester)<br/><br/>
            <strong>Multiple Gestation Specialized Calculations:</strong><br/>
            Twin pregnancies: Normal weight: 17-25 kg | Overweight: 14-23 kg | Obese: 11-19 kg<br/>
            Triplet+ pregnancies: Individualized protocols based on serial ultrasound assessment<br/><br/>
            <strong>Advanced Maternal Age Adjustments:</strong><br/>
            Women &gt;35 years: Upper range recommendations to prevent low birth weight risks<br/>
            Adolescent pregnancies: Additional 2-4 kg for continued maternal growth requirements
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Pregnancy Weight Gain Calculation - Comprehensive Prenatal Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>pregnancy weight gain calculation methodology implementation</strong> serves critical functions across multiple <strong>obstetric specialties and prenatal management areas</strong> requiring <strong>precise gestational monitoring and evidence-based intervention strategies</strong>. These applications extend beyond simple weight tracking to encompass comprehensive <strong>maternal-fetal health optimization protocols</strong> that directly impact <strong>pregnancy outcomes and long-term health trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Optimal Fetal Growth Monitoring and Macrosomia Prevention:</strong> Systematic weight gain assessment enables <strong>early identification of inadequate or excessive fetal growth patterns</strong>, facilitating timely interventions to prevent <strong>low birth weight complications or macrosomia-related delivery risks</strong>. Regular weight monitoring provides <strong>surrogate indicators of placental function and nutrient transfer efficiency</strong> between maternal and fetal compartments</li>
            <li style={{ marginBottom: '10px' }}><strong>Gestational Diabetes Mellitus Prevention and Management Protocols:</strong> Controlled weight gain represents a cornerstone of <strong>gestational diabetes prevention strategies and metabolic management approaches</strong>. Appropriate weight trajectories help maintain <strong>insulin sensitivity, glucose homeostasis, and metabolic balance</strong> during pregnancy, significantly reducing risks of <strong>fetal hyperinsulinemia, neonatal hypoglycemia, and long-term metabolic programming effects</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hypertensive Disorder Risk Reduction and Preeclampsia Prevention:</strong> Modulated weight gain patterns contribute to <strong>vascular adaptation optimization, blood pressure regulation, and endothelial function preservation</strong> throughout pregnancy. Appropriate weight management reduces risks of <strong>gestational hypertension progression, preeclampsia development, and associated maternal-fetal complications</strong> through improved <strong>vascular compliance and reduced inflammatory burden</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Multiple Gestation Nutritional Optimization and Preterm Birth Prevention:</strong> Specialized weight gain calculations for twin and higher-order pregnancies address <strong>increased metabolic demands, accelerated fetal growth requirements, and enhanced nutritional competition</strong>. Targeted weight management supports <strong>optimal twin growth trajectories, adequate placental development, and reduced risks of preterm labor initiation</strong> through comprehensive nutritional support</li>
            <li style={{ marginBottom: '10px' }}><strong>Adolescent Pregnancy Growth Support and Developmental Optimization:</strong> Age-specific weight gain recommendations account for <strong>ongoing maternal growth requirements, nutritional competition dynamics, and developmental stage considerations</strong>. These specialized protocols ensure <strong>adequate nutritional partitioning between maternal growth completion and fetal development support</strong>, addressing unique challenges in <strong>teenage pregnancy management and long-term health preservation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Maternal Age Pregnancy Metabolic Adaptation Support:</strong> Tailored weight gain approaches for pregnancies beyond age 35 address <strong>age-related metabolic changes, decreased physiological reserve, and increased complication risks</strong>. These strategies optimize <strong>nutrient utilization efficiency, metabolic adaptation capacity, and pregnancy outcome improvement</strong> in older maternal populations</li>
            <li><strong>Post-Bariatric Surgery Pregnancy Nutritional Management and Complication Prevention:</strong> Modified weight gain protocols following weight loss surgery consider <strong>altered gastrointestinal anatomy, nutrient absorption limitations, and metabolic adaptation requirements</strong>. These specialized approaches prevent <strong>nutritional deficiencies, promote appropriate fetal growth, and minimize surgical complication risks</strong> in post-bariatric pregnancy management</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Comprehensive Factors Affecting Pregnancy Weight Gain Patterns - Advanced Gestational Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological, pathological, and psychosocial factors</strong> influence <strong>pregnancy weight gain calculation accuracy parameters and clinical interpretation validity</strong>. Understanding these complex interactions enables <strong>personalized weight management approaches and improved outcome prediction</strong> across diverse obstetric scenarios:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Pre-Pregnancy Nutritional Status and Body Composition Characteristics:</strong> Baseline <strong>adipose tissue distribution patterns, lean muscle mass proportions, micronutrient storage levels, and metabolic efficiency parameters</strong> significantly affect <strong>gestational weight gain patterns, nutrient partitioning dynamics, and fetal growth trajectories</strong>. Comprehensive preconception assessment provides <strong>essential context for personalized weight gain recommendations and nutritional intervention planning</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hyperemesis Gravidarum Pathophysiology and Nutritional Impact Considerations:</strong> Severe nausea and vomiting during pregnancy dramatically alter <strong>early gestational weight trajectories, nutrient absorption capabilities, and metabolic adaptation processes</strong>. These conditions require specialized management approaches including <strong>modified weight gain expectations, targeted nutritional supplementation, and comprehensive symptom management strategies</strong> to ensure adequate fetal development despite maternal nutritional challenges</li>
            <li style={{ marginBottom: '10px' }}><strong>Gestational Age Progression and Trimester-Specific Metabolic Demands:</strong> Different pregnancy stages demonstrate <strong>distinct metabolic requirements, hormonal influence patterns, and weight distribution characteristics</strong>. First trimester typically involves <strong>minimal weight gain with focus on organogenesis support</strong>, second trimester emphasizes <strong>rapid fetal growth and maternal adaptation</strong>, while third trimester focuses on <strong>final fetal maturation and maternal preparation for delivery and lactation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Multiple Gestation Physiological Adaptations and Increased Metabolic Requirements:</strong> Twin and higher-order pregnancies exhibit <strong>accelerated weight gain patterns, enhanced nutritional demands, modified hormonal profiles, and increased cardiovascular adaptations</strong>. These physiological changes necessitate <strong>specialized weight monitoring protocols, increased caloric intake recommendations, and enhanced nutrient density requirements</strong> to support optimal multifetal development</li>
            <li style={{ marginBottom: '10px' }}><strong>Maternal Metabolic Conditions and Endocrine Regulation Influences:</strong> Pre-existing conditions including <strong>diabetes mellitus, thyroid disorders, polycystic ovary syndrome, and metabolic syndrome</strong> significantly influence <strong>weight gain efficiency, nutrient utilization patterns, and metabolic adaptation capacity</strong>. These conditions require <strong>condition-specific weight management approaches, enhanced monitoring protocols, and multidisciplinary care coordination</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Pharmacological Intervention Effects and Medication-Induced Modifications:</strong> Various pregnancy-related medications including <strong>anti-emetics, insulin preparations, thyroid medications, and antihypertensive agents</strong> dramatically alter <strong>appetite regulation mechanisms, metabolic rate parameters, nutrient utilization efficiency, and fluid balance dynamics</strong>. Understanding these pharmacological influences enables <strong>accurate weight gain interpretation and appropriate management adjustment</strong></li>
            <li><strong>Psychosocial Determinants and Environmental Influence Factors:</strong> Complex interactions between <strong>food insecurity conditions, eating disorder histories, mental health status, socioeconomic factors, cultural beliefs, and social support systems</strong> profoundly impact <strong>nutritional intake patterns, weight management capabilities, and health behavior implementation</strong>. Addressing these determinants requires <strong>comprehensive psychosocial assessment and integrated support services</strong> beyond numerical weight calculations</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Advanced Limitations of Pregnancy Weight Gain Formulas - Comprehensive Gestational Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>pregnancy weight gain calculation methodologies</strong> provide valuable <strong>clinical starting points and population-based guidelines</strong>, specific clinical situations necessitate <strong>advanced assessment approaches, dynamic monitoring protocols, and individualized management strategies</strong> that extend beyond standardized formula applications:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Body Composition Scenarios and Athletic Population Considerations:</strong> Professional athletes, individuals with severe obesity, eating disorder recovery patients, and those with significant muscle mass require <strong>individualized weight gain approaches beyond standard formula applications</strong>. These populations demonstrate <strong>unique metabolic characteristics, altered body composition parameters, and specialized nutritional requirements</strong> that standard calculations may not accurately address</li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Medical Comorbidities and Multisystem Disease Presentations:</strong> Combined <strong>renal-cardiac-metabolic dysfunction, autoimmune conditions with pregnancy implications, genetic disorders affecting metabolism, and rare endocrine conditions</strong> require <strong>nuanced nutritional management approaches and specialized weight monitoring protocols</strong> developed through multidisciplinary team collaboration and evidence-based guideline adaptation</li>
            <li style={{ marginBottom: '10px' }}><strong>Cultural and Ethnic Variations in Optimal Pregnancy Weight Parameters:</strong> Different populations demonstrate <strong>varying optimal weight gain ranges, distinct body composition patterns, unique metabolic adaptations, and population-specific complication risks</strong>. These variations necessitate <strong>population-specific guideline development, culturally sensitive counseling approaches, and individualized risk assessment protocols</strong> rather than universal formula application</li>
            <li style={{ marginBottom: '10px' }}><strong>Assisted Reproductive Technology Pregnancies and Special Conception Circumstances:</strong> In vitro fertilization (IVF) pregnancies, donor egg conceptions, surrogate arrangements, and pregnancies following fertility treatments may exhibit <strong>different weight gain patterns, altered hormonal profiles, increased complication risks, and unique psychological considerations</strong>. These scenarios require <strong>specialized monitoring approaches and individualized management strategies</strong> beyond standard obstetric protocols</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations and High-Risk Pregnancy Management:</strong> Clinical scenarios including <strong>fetal growth restriction, placental insufficiency, maternal malnutrition, severe pregnancy complications, and critical care obstetric situations</strong> require <strong>intensive nutritional surveillance, specialized assessment methodologies, and multidisciplinary management approaches</strong> that exceed standard weight gain calculation capabilities</li>
            <li><strong>Alternative Assessment Methodologies and Comprehensive Evaluation Approaches:</strong> Integration of <strong>advanced body composition analysis techniques, sophisticated nutritional biomarker monitoring, detailed ultrasound assessment protocols, and comprehensive metabolic evaluation strategies</strong> provides enhanced insight beyond simple weight measurements. These approaches enable <strong>precise nutritional status assessment, accurate fetal growth evaluation, and personalized intervention planning</strong> for optimal pregnancy outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Pregnancy Weight Gain Guidelines - Evolution of Obstetric Nutrition Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>pregnancy weight gain calculation methodologies and clinical guideline development</strong> reflects <strong>decades of obstetric research advancement, nutritional science progression, and clinical practice refinement trajectories</strong>. This historical development demonstrates <strong>increasing sophistication in maternal-fetal health understanding and evidence-based practice implementation</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Foundations and Initial Recognition Phase:</strong> Initial medical recognition of <strong>maternal weight impact on pregnancy outcomes</strong> established basic weight monitoring principles, though approaches were often <strong>restrictive and inadequately evidence-based</strong>. Early guidelines frequently emphasized <strong>strict weight limitation rather than optimal nutritional support</strong>, reflecting limited understanding of <strong>fetal nutritional requirements and maternal metabolic adaptations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization and Population-Based Development:</strong> Development of <strong>standardized weight gain charts, systematic prenatal nutrition guidelines, and population-based recommendations</strong> revolutionized obstetric care by introducing <strong>consistent monitoring approaches and evidence-informed practices</strong>. This period saw increasing recognition of <strong>maternal nutrition importance for fetal development and pregnancy outcome optimization</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Scientific Advances and Evidence-Based Refinement:</strong> Introduction of <strong>BMI-based weight gain classifications, trimester-specific recommendations, epidemiological outcome studies, and evidence-based guideline development</strong> significantly improved pregnancy weight management precision. Research during this period established clear connections between <strong>appropriate weight gain and reduced pregnancy complication risks</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>2009 Institute of Medicine Guideline Publication and Contemporary Standard Establishment:</strong> Comprehensive evidence review and systematic guideline development established <strong>current gold standard recommendations based on pre-pregnancy BMI categories</strong>. These guidelines represented <strong>significant advancement in personalized pregnancy care through differentiated recommendations for underweight, normal weight, overweight, and obese categories</strong></li>
            <li><strong>Contemporary Precision Obstetrics and Individualized Medicine Approaches:</strong> Current practice integrates <strong>advanced individualized risk assessment methodologies, sophisticated monitoring technologies, personalized nutrition approaches, and multidisciplinary care coordination</strong> for optimal pregnancy management. Modern approaches emphasize <strong>personalized care rather than universal application, considering individual characteristics, medical history, and specific pregnancy circumstances</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Prenatal Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>pregnancy weight gain calculation implementation and evidence-based prenatal care protocol delivery</strong> in contemporary clinical practice environments, healthcare providers should adopt systematic approaches that integrate <strong>scientific evidence, clinical expertise, and patient-centered care principles</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Baseline Assessment Protocol and Preconception Evaluation:</strong> Systematically evaluate <strong>pre-pregnancy weight history, accurate anthropometric measurements, complete medical/nutritional assessment, and comprehensive health status evaluation</strong> before calculation initiation and pregnancy planning. This assessment should include <strong>detailed medical history review, medication evaluation, lifestyle assessment, and psychosocial determinant identification</strong> for personalized care planning</li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Monitoring Implementation and Serial Assessment Protocol:</strong> Utilize <strong>serial weight measurements, nutritional intake tracking, physical activity assessment, and comprehensive fetal growth evaluation</strong> rather than static formula application. Implement <strong>regular monitoring schedules, standardized measurement techniques, and consistent documentation practices</strong> to identify trends and facilitate timely interventions when needed</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Risk Stratification Procedures and Personalized Planning Approaches:</strong> Systematically incorporate <strong>medical comorbidities, obstetric history, genetic factors, lifestyle characteristics, environmental exposures, and psychosocial determinants</strong> into weight gain planning and nutritional management. Develop <strong>personalized care plans addressing specific risk factors, individual preferences, and unique pregnancy circumstances</strong> for optimal outcomes</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Care Integration Protocol and Collaborative Management Framework:</strong> Develop <strong>comprehensive management frameworks</strong> involving <strong>obstetricians, maternal-fetal medicine specialists, registered dietitians, mental health professionals, social workers, and support services</strong> beyond numerical calculations alone. Implement <strong>regular team communication, coordinated care planning, and integrated service delivery</strong> for comprehensive prenatal support</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient-Centered Education Enhancement and Health Literacy Optimization:</strong> Coordinate weight management with <strong>comprehensive nutritional counseling, physical activity guidance, behavioral support services, and health education programs</strong> for comprehensive prenatal care. Utilize <strong>culturally appropriate materials, literacy-sensitive approaches, and engaging educational methods</strong> to enhance understanding and promote adherence</li>
            <li><strong>Quality Improvement Integration and Outcome Measurement Implementation:</strong> Implement <strong>pregnancy outcome tracking systems, patient satisfaction measurement, evidence-based protocol implementation, and continuous quality improvement processes</strong> for ongoing optimization. Utilize <strong>data-driven approaches, performance metrics, and outcome analysis</strong> to refine practices and enhance care quality over time</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Pregnancy Weight Management - Emerging Obstetric Technologies and Innovative Approaches</h3>
          <p style={paragraphStyle}>Ongoing <strong>pregnancy weight management research initiatives and technological innovation projects</strong> continue refining <strong>assessment approaches, monitoring methodologies, and intervention strategies</strong> with promising developments that will transform obstetric care delivery and maternal-fetal health optimization:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Body Composition Monitoring and Precision Assessment Technologies:</strong> Integration of <strong>sophisticated bioelectrical impedance analysis systems, air displacement plethysmography devices, three-dimensional photonic scanning technologies, and advanced ultrasound assessment protocols</strong> for precise body composition tracking throughout pregnancy. These technologies enable <strong>accurate differentiation between maternal fat mass, lean tissue, and fluid components</strong> for enhanced nutritional management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Clinical Applications and Predictive Analytics Implementation:</strong> Development of <strong>machine learning algorithms and artificial intelligence systems</strong> for <strong>personalized weight gain prediction models</strong> incorporating multiple clinical variables, lifestyle factors, genetic information, and environmental determinants. These advanced systems facilitate <strong>individualized risk assessment, early complication prediction, and personalized intervention planning</strong> based on comprehensive data analysis</li>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Monitoring Technologies and Continuous Assessment Platforms:</strong> Integration of <strong>smart scale systems, nutritional intake trackers, physical activity monitors, and continuous glucose monitoring devices</strong> with electronic health records for real-time pregnancy management. These technologies enable <strong>continuous data collection, trend analysis, and timely intervention</strong> through seamless data integration and automated alert systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Nutrigenomic Testing Advancements and Personalized Nutrition Approaches:</strong> Implementation of <strong>genetic profiling technologies and metabolic pathway analysis</strong> for <strong>personalized nutritional requirements determination, metabolic optimization strategies, and complication risk prediction</strong>. These approaches enable <strong>individualized dietary planning based on genetic predispositions, metabolic characteristics, and specific nutrient requirements</strong> for optimal pregnancy outcomes</li>
            <li style={{ marginBottom: '10px' }}><strong>Telemedicine Integration Strategies and Digital Health Implementation:</strong> Development of <strong>remote weight monitoring systems, virtual nutritional counseling platforms, digital behavior change interventions, and telehealth consultation services</strong> for comprehensive prenatal care delivery. These approaches enhance <strong>accessibility, convenience, and engagement</strong> while maintaining <strong>clinical oversight and evidence-based practice implementation</strong></li>
            <li><strong>Mobile Health Applications and Patient Engagement Platforms:</strong> Creation of <strong>pregnancy-specific tracking applications, educational content delivery systems, support network facilitation tools, and behavior change implementation platforms</strong> for continuous patient engagement and monitoring. These digital solutions promote <strong>self-management, knowledge acquisition, and health behavior implementation</strong> through user-friendly interfaces and evidence-based content delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>pregnancy weight gain calculation methodology education and comprehensive training programs</strong> represent <strong>essential clinical competency requirements</strong> for <strong>healthcare professionals</strong> across multiple obstetric disciplines and maternal health specialties. Comprehensive training curricula should systematically include <strong>gestational physiology principles, calculation methodologies, nutritional assessment techniques, behavioral counseling strategies, and evidence-based practice implementation</strong>. Continuing medical education programs must consistently address <strong>evolving obstetric research findings, changing clinical practice standards, emerging technological developments, and updated guideline recommendations</strong> to ensure optimal maternal-fetal outcomes and evidence-based practice implementation across diverse healthcare settings and patient populations.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols and systematic standardization procedures</strong> ensures <strong>consistent pregnancy weight management practices and optimal care delivery</strong> across diverse healthcare settings and professional practice environments. These protocols should encompass <strong>calculation standardization methodologies, measurement technique verification procedures, documentation consistency requirements, and clinical outcome measurement parameters</strong> that directly impact <strong>maternal health indicators, fetal development outcomes, and pregnancy complication rates</strong>. Professional organizations and healthcare institutions should develop <strong>standardized training materials, competency assessment tools, clinical practice guideline documents, and quality improvement frameworks</strong> to guarantee consistent clinical application quality, evidence-based practice implementation, and optimal patient outcomes across diverse healthcare delivery settings and specialty practice areas within contemporary obstetric care systems.</p>        
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Pregnancy Weight Gain</h2>
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

        {/* Medical Disclaimer */}
        <div style={medicalDisclaimerStyle}>
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer</h4>
          <p style={paragraphStyle}><strong>This pregnancy weight gain calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Pregnancy weight gain calculations have inherent limitations and may not accurately reflect individual nutritional needs. Actual pregnancy weight management requires comprehensive clinical assessment by qualified healthcare providers including obstetricians, midwives, and registered dietitians.</p>
          <p style={paragraphStyle}><strong>Individual Variation Awareness:</strong> Every pregnancy is unique. Weight gain patterns vary based on multiple factors including genetics, metabolism, activity level, and overall health. These calculations provide general guidelines that should be personalized by your healthcare team.</p>
          <p style={paragraphStyle}><strong>Medical Condition Considerations:</strong> Women with pre-existing medical conditions (diabetes, thyroid disorders, eating disorders, etc.) or pregnancy complications (gestational diabetes, preeclampsia, hyperemesis) require specialized nutritional guidance beyond standard calculations.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your obstetrician, midwife, or other qualified healthcare provider with any questions regarding pregnancy weight gain or nutritional planning. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Eating Disorder Precautions:</strong> Individuals with a history of eating disorders should use weight gain calculators only under professional supervision. These tools may trigger unhealthy behaviors or excessive anxiety about weight in susceptible individuals.</p>
          <p style={paragraphStyle}><strong>Holistic Health Perspective:</strong> While weight gain is one aspect of pregnancy health, it should be considered alongside other important factors including nutritional quality, physical activity, mental health, and overall wellbeing. Focus on comprehensive prenatal care rather than weight metrics alone.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) + Calculators */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Prenatal nutrition coaching program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Smart pregnancy scale with app</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete prenatal health guide</p>
              <div style={{ flexGrow: 1 }}></div>
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
                      e.currentTarget.style.background = '#3498db';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(52, 152, 219, 0.2)';
                      e.currentTarget.style.borderColor = '#3498db';
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
                      background: calculator.relevance >= 9 ? '#3498db' : calculator.relevance >= 8 ? '#27ae60' : '#f39c12',
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

      {/* Additional Ads when sidebar disappears (mobile) */}
      {!showSidebar && (
        <div style={{ ...mobileAdsStyle, display: 'grid' }}>
          <div style={mobileAdStyle}>
            <p><i className="fas fa-ad"></i> Mobile Advertisement 1</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Optimized for mobile viewing</p>
          </div>
          <div style={mobileAdStyle}>
            <p><i className="fas fa-ad"></i> Mobile Advertisement 2</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for smaller screens</p>
          </div>
        </div>
      )}
    </main>
  );
}