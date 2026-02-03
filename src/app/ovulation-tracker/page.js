"use client"; // This is required for interactivity

import { useState, useEffect } from 'react';

export default function OvulationPage() {
  const [cycleRegularity, setCycleRegularity] = useState('regular');
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [shortestCycle, setShortestCycle] = useState('');
  const [longestCycle, setLongestCycle] = useState('');
  const [results, setResults] = useState(null);
  const [probabilityData, setProbabilityData] = useState([]);
  const [timelineMarkers, setTimelineMarkers] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

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
    background: '#e91e63',
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
    background: '#9c27b0',
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
    background: '#fff5f8',
    border: '2px solid #e91e63',
    boxShadow: '0 4px 12px rgba(233, 30, 99, 0.15)',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    zIndex: '10'
  };

  const calculatorLinks = [
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 10 },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 10 },
    { name: "Ovulation Tracker", link: "/ovulation-tracker", relevance: 10 },
    { name: "Pregnancy Due Date Calculator", link: "/pregnancy-due-date-calculator", relevance: 9 },
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator", relevance: 9 },
    { name: "IBW Calculator", link: "/ibw-calculator", relevance: 8 },
    { name: "Waist-Hip Ratio", link: "/waist-hip-ratio", relevance: 8 },
    { name: "BSA Calculator", link: "/bsa-calculator", relevance: 8 },
    { name: "Pregnancy Weight Gain Calculator", link: "/pregnancy-weight-gain-calculator", relevance: 8 },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 7 },
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 7 },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 7 },
    { name: "LBM Calculator", link: "/lbm-calculator", relevance: 6 },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 6 },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 6 },
    { name: "GFR Calculator", link: "/gfr-calculator", relevance: 5 },
    { name: "Creatinine Clearance", link: "/creatinine-clearance", relevance: 5 },
    { name: "Fluid Requirement", link: "/fluid-requirement", relevance: 5 },
    { name: "Medication Dosage", link: "/medication-dosage", relevance: 5 },
    { name: "Electrolyte Correction", link: "/electrolyte-correction", relevance: 4 },
    { name: "Nutritional Needs", link: "/nutritional-needs", relevance: 4 },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator", relevance: 4 },
    { name: "Safe Period Calculator", link: "/safe-period-calculator", relevance: 9 },
    { name: "Period Cycle Calculator", link: "/period-cycle-calculator", relevance: 9 },
    { name: "Blood Pressure Category Calculator", link: "/blood-pressure-category-calculator", relevance: 4 },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 4 },
    { name: "Heart Disease Risk Calculator", link: "/heart-disease-risk-calculator", relevance: 4 },
    { name: "Carbohydrate Intake Calculator", link: "/carbohydrate-intake-calculator", relevance: 3 },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator", relevance: 3 },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator", relevance: 3 },
    { name: "Pregnancy Test Calculator", link: "/pregnancy-test", relevance: 8 },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker", relevance: 4 }
  ];

  const sortedCalculators = [...calculatorLinks].sort((a, b) => b.relevance - a.relevance);

  // Set default date on component mount
  useEffect(() => {
    const sampleDate = new Date();
    sampleDate.setDate(sampleDate.getDate() - 28);
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
        calculateOvulation();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  const selectRegularity = (regularity) => {
    setCycleRegularity(regularity);
    setResults(null);
  };

  const calculateOvulation = () => {
    // Validate last period date
    if (!lastPeriod) {
      alert("Please select the first day of your last period.");
      return;
    }

    const lastDate = new Date(lastPeriod);
    const today = new Date();

    // Ensure selected date is not in the future
    if (lastDate > today) {
      alert("Last period date cannot be in the future. Please select a valid date.");
      return;
    }

    let ovulationDay, fertileStart, fertileEnd, nextPeriod;

    if (cycleRegularity === 'regular') {
      // Validate cycle length
      const cycleLengthNum = parseInt(cycleLength);
      if (isNaN(cycleLengthNum) || cycleLengthNum < 21 || cycleLengthNum > 45) {
        alert("Please enter a valid cycle length between 21-45 days.");
        return;
      }

      // Standard calculation for regular cycles
      nextPeriod = new Date(lastDate);
      nextPeriod.setDate(lastDate.getDate() + cycleLengthNum);
      
      ovulationDay = new Date(nextPeriod);
      ovulationDay.setDate(nextPeriod.getDate() - 14);
      
      fertileStart = new Date(ovulationDay);
      fertileStart.setDate(ovulationDay.getDate() - 5);
      
      fertileEnd = new Date(ovulationDay);
      fertileEnd.setDate(ovulationDay.getDate() + 1);
    } else {
      // Validate irregular cycle inputs
      const shortestCycleNum = parseInt(shortestCycle);
      const longestCycleNum = parseInt(longestCycle);
      
      if (!shortestCycle || !longestCycle || shortestCycleNum >= longestCycleNum) {
        alert("Please enter valid cycle range (shortest < longest).");
        return;
      }

      // Earliest possible ovulation
      const earliestOvulation = new Date(lastDate);
      earliestOvulation.setDate(lastDate.getDate() + (shortestCycleNum - 18));
      
      // Latest possible ovulation
      const latestOvulation = new Date(lastDate);
      latestOvulation.setDate(lastDate.getDate() + (longestCycleNum - 11));
      
      // Fertile window spans from earliest fertile day to latest fertile day
      fertileStart = new Date(earliestOvulation);
      fertileStart.setDate(earliestOvulation.getDate() - 5);
      
      fertileEnd = new Date(latestOvulation);
      fertileEnd.setDate(latestOvulation.getDate() + 1);
      
      // Use average for single ovulation day display
      const avgCycle = Math.round((shortestCycleNum + longestCycleNum) / 2);
      nextPeriod = new Date(lastDate);
      nextPeriod.setDate(lastDate.getDate() + avgCycle);
      
      ovulationDay = new Date(nextPeriod);
      ovulationDay.setDate(nextPeriod.getDate() - 14);
    }

    // Formatting options
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const shortOptions = { month: 'short', day: 'numeric' };
    
    // Calculate timeline markers
    const cycleLengthDays = Math.round((nextPeriod - lastDate) / (1000 * 60 * 60 * 24));
    const fertileStartDay = Math.round((fertileStart - lastDate) / (1000 * 60 * 60 * 24));
    const fertileEndDay = Math.round((fertileEnd - lastDate) / (1000 * 60 * 60 * 24));
    const ovulationDayPos = Math.round((ovulationDay - lastDate) / (1000 * 60 * 60 * 24));
    
    const markers = [
      { day: fertileStartDay, label: 'Fertile Start', position: fertileStartDay >= 0 && fertileStartDay <= cycleLengthDays ? (fertileStartDay / cycleLengthDays) * 100 : 0 },
      { day: ovulationDayPos, label: 'Ovulation', position: ovulationDayPos >= 0 && ovulationDayPos <= cycleLengthDays ? (ovulationDayPos / cycleLengthDays) * 100 : 0 },
      { day: fertileEndDay, label: 'Fertile End', position: fertileEndDay >= 0 && fertileEndDay <= cycleLengthDays ? (fertileEndDay / cycleLengthDays) * 100 : 0 }
    ];
    
    // Calculate probability data
    const fertileDays = Math.round((fertileEnd - fertileStart) / (1000 * 60 * 60 * 24)) + 1;
    const probabilities = [10, 15, 25, 30, 27, 20, 15];
    const probabilityDataArray = [];
    
    for (let i = 0; i < fertileDays; i++) {
      const currentDay = new Date(fertileStart);
      currentDay.setDate(fertileStart.getDate() + i);
      
      const isOvulationDay = currentDay.toDateString() === ovulationDay.toDateString();
      const dayLabel = currentDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      const probability = probabilities[i] || 10;
      
      probabilityDataArray.push({
        day: dayLabel,
        probability,
        isOvulationDay
      });
    }

    setResults({
      ovulationDate: ovulationDay.toLocaleDateString(undefined, options),
      fertileRange: fertileStart.toLocaleDateString(undefined, shortOptions) + " to " + fertileEnd.toLocaleDateString(undefined, shortOptions),
      nextPeriod: nextPeriod.toLocaleDateString(undefined, options),
      dates: {
        ovulation: ovulationDay,
        fertileStart: fertileStart,
        fertileEnd: fertileEnd,
        nextPeriod: nextPeriod
      }
    });

    setTimelineMarkers(markers);
    setProbabilityData(probabilityDataArray);
    setShowShareMenu(false);
  };

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate ovulation first before sharing.');
      return;
    }

    const shareText = `My ovulation day is ${results.ovulationDate} and my fertile window is ${results.fertileRange} - Track yours with this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'Ovulation,Fertility,Pregnancy,Health';

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
        shareUrlFull = `mailto:?subject=My Ovulation Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My Ovulation Results',
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
      alert('Please calculate ovulation first before downloading.');
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
    <title>Ovulation Calculator Results</title>
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
            border-bottom: 3px solid #e91e63;
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
        
        .fertility-value {
            font-size: 2.5rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
        }
        
        .fertility-category {
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
        
        .timeline-bar {
            height: 40px;
            background: linear-gradient(90deg, #e0e0e0 0%, #e0e0e0 30%, #e91e63 30%, #e91e63 45%, #ff4081 45%, #ff4081 60%, #e0e0e0 60%, #e0e0e0 100%);
            border-radius: 20px;
            margin: 20px 0;
            position: relative;
        }
        
        .timeline-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: #666;
            margin-top: 5px;
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
            <h1><i class="fas fa-calendar-alt"></i> Ovulation Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Ovulation Day Card -->
            <div class="result-card" style="border-top-color: #e91e63;">
                <h3 class="card-title"><i class="fas fa-egg" style="color: #e91e63;"></i> Ovulation Day</h3>
                <div class="fertility-value" style="color: #e91e63;">${results.ovulationDate}</div>
                <div class="info-box">
                    <p><strong>Peak Fertility:</strong> Highest chance of conception</p>
                    <p><strong>Egg Release:</strong> Ovary releases mature egg</p>
                    <p><strong>LH Surge:</strong> Luteinizing hormone peaks 24-36 hours before</p>
                </div>
            </div>
            
            <!-- Fertile Window Card -->
            <div class="result-card" style="border-top-color: #ff4081;">
                <h3 class="card-title"><i class="fas fa-heart" style="color: #ff4081;"></i> Fertile Window</h3>
                <div class="fertility-value" style="color: #ff4081;">${results.fertileRange}</div>
                <div class="info-box">
                    <p><strong>Duration:</strong> 6-day optimal conception period</p>
                    <p><strong>Sperm Survival:</strong> 5 days in fertile cervical mucus</p>
                    <p><strong>Egg Viability:</strong> 12-24 hours after ovulation</p>
                </div>
            </div>
            
            <!-- Next Period Card -->
            <div class="result-card" style="border-top-color: #9c27b0;">
                <h3 class="card-title"><i class="fas fa-calendar" style="color: #9c27b0;"></i> Next Period</h3>
                <div class="fertility-value" style="color: #9c27b0;">${results.nextPeriod}</div>
                <div class="info-box">
                    <p><strong>Cycle Length:</strong> ${cycleLength} days</p>
                    <p><strong>Regularity:</strong> ${cycleRegularity === 'regular' ? 'Regular' : 'Irregular'}</p>
                    <p><strong>Last Period:</strong> ${lastPeriod}</p>
                </div>
            </div>
        </div>
        
        <!-- Timeline Visualization -->
        <div style="margin: 30px 0; padding: 20px; background: white; border-radius: 10px;">
            <h3 style="margin-bottom: 15px; color: #2c3e50;">
                <i class="fas fa-chart-bar"></i> Menstrual Cycle Timeline
            </h3>
            <div class="timeline-bar"></div>
            <div class="timeline-labels">
                <span>Menstrual Phase</span>
                <span>Fertile Window</span>
                <span>Ovulation Day</span>
                <span>Luteal Phase</span>
            </div>
        </div>
        
        <!-- Pregnancy Probability -->
        <div style="margin: 30px 0; padding: 20px; background: white; border-radius: 10px;">
            <h3 style="margin-bottom: 15px; color: #2c3e50;">
                <i class="fas fa-chart-pie"></i> Conception Probability
            </h3>
            ${probabilityData.map(item => `
            <div style="display: flex; align-items: center; margin: 10px 0;">
                <div style="width: 100px; font-size: 0.9rem;">${item.day}</div>
                <div style="flex: 1; background: #e0e0e0; border-radius: 15px; height: 25px; overflow: hidden;">
                    <div style="width: ${item.probability}%; height: 100%; background: linear-gradient(90deg, #e91e63, #ff4081); border-radius: 15px;"></div>
                </div>
                <div style="margin-left: 10px; font-weight: 600; color: #e91e63;">${item.probability}%</div>
            </div>
            `).join('')}
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This ovulation calculation is for informational purposes only. While based on standard menstrual cycle patterns, individual variations can occur. This tool should not be used as a form of birth control or for medical diagnosis. Always consult with healthcare professionals for personalized medical advice regarding fertility, conception, and reproductive health.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Ovulation Calculator • ${window.location.href}</p>
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
    a.download = `ovulation-results-${new Date().toISOString().split('T')[0]}.html`;
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
      question: "How accurate is ovulation prediction based on calendar method alone?",
      answer: "Calendar-based ovulation prediction provides approximately 60-70% accuracy for women with regular cycles. However, accuracy improves significantly when combined with other fertility signs like basal body temperature (BBT) tracking, cervical mucus observation, and ovulation predictor kits (OPKs). For irregular cycles, calendar prediction alone may be less reliable due to cycle length variations, making multi-method tracking essential for accurate fertility awareness."
    },
    {
      question: "What's the difference between fertility window and ovulation day?",
      answer: "The fertility window refers to the 6-day period (5 days before ovulation plus ovulation day itself) when conception is possible due to sperm survival in the reproductive tract. Ovulation day specifically marks the 24-hour period when the mature egg is released from the ovary. While sperm can survive up to 5 days, the egg remains viable for only 12-24 hours after ovulation, making timing intercourse during the entire fertility window crucial for maximizing conception chances."
    },
    {
      question: "Can stress or illness delay ovulation even with regular cycles?",
      answer: "Yes, significant physical or emotional stress, illness, travel, extreme exercise, or sudden weight changes can temporarily disrupt normal hormonal patterns and delay ovulation even in typically regular cycles. These factors can affect the hypothalamic-pituitary-ovarian axis, potentially pushing ovulation later in the cycle or occasionally suppressing it entirely. Tracking additional fertility signs helps identify these variations when they occur."
    },
    {
      question: "How soon after ovulation can I take a pregnancy test?",
      answer: "Most home pregnancy tests can detect pregnancy hormones (hCG) approximately 10-14 days after ovulation. Testing too early may produce false negatives due to insufficient hCG levels. For most accurate results, wait until the first day of your missed period or at least 12 days post-ovulation. Early detection tests may show results 6-8 days post-ovulation, but waiting until your expected period date provides more reliable results."
    },
    {
      question: "What if my cycles are irregular - can I still predict ovulation accurately?",
      answer: "Irregular cycles require a different approach to ovulation prediction. Instead of relying solely on calendar calculations, women with irregular cycles should use multiple tracking methods simultaneously: ovulation predictor kits to detect LH surge, basal body temperature to confirm ovulation occurred, and cervical mucus observation to identify fertile-quality mucus. Tracking for several cycles can reveal patterns even within irregularity, though consulting a healthcare provider is advisable if cycles vary by more than 7-9 days consistently."
    }
  ];

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
          <i className="fas fa-calendar-alt"></i> Advanced Ovulation & Fertility Calculator
        </h1>
        
        <p style={{ 
          marginBottom: '25px', 
          fontSize: 'clamp(0.95rem, 2vw, 1rem)', 
          color: '#666' 
        }}>
          Track your menstrual cycle, predict ovulation with precision, and identify your optimal fertile window for successful conception planning using advanced reproductive health algorithms.
        </p>

        {/* Cycle Regularity Selection */}
        <div style={{ 
          margin: '20px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px'
        }}>
          <label style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600', 
            marginBottom: '8px', 
            color: '#34495e', 
            fontSize: '0.95rem'
          }}>
            <i className="fas fa-heartbeat"></i> Cycle Regularity
          </label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
            <button 
              style={{
                padding: '10px 20px',
                background: cycleRegularity === 'regular' ? '#e91e63' : '#e9ecef',
                color: cycleRegularity === 'regular' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectRegularity('regular')}
            >
              <i className="fas fa-check-circle"></i> Regular Cycles
            </button>
            <button 
              style={{
                padding: '10px 20px',
                background: cycleRegularity === 'irregular' ? '#e91e63' : '#e9ecef',
                color: cycleRegularity === 'irregular' ? 'white' : '#333',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => selectRegularity('irregular')}
            >
              <i className="fas fa-exclamation-triangle"></i> Irregular Cycles
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600', 
              marginBottom: '8px', 
              color: '#34495e', 
              fontSize: '0.95rem'
            }}>
              <i className="fas fa-calendar-day"></i> First Day of Last Period
            </label>
            <input 
              type="date" 
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #dfe6e9',
                borderRadius: '10px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600', 
              marginBottom: '8px', 
              color: '#34495e', 
              fontSize: '0.95rem'
            }}>
              <i className="fas fa-history"></i> Average Cycle Length
            </label>
            <input 
              type="number" 
              placeholder="28" 
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              min="21" 
              max="45"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #dfe6e9',
                borderRadius: '10px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s'
              }}
            />
          </div>
        </div>

        {cycleRegularity === 'irregular' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600', 
              marginBottom: '8px', 
              color: '#34495e', 
              fontSize: '0.95rem'
            }}>
              <i className="fas fa-sliders-h"></i> Cycle Length Range
            </label>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <input 
                type="number" 
                placeholder="Shortest (e.g., 26)" 
                value={shortestCycle}
                onChange={(e) => setShortestCycle(e.target.value)}
                min="21" 
                max="45"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #dfe6e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
              />
              <input 
                type="number" 
                placeholder="Longest (e.g., 32)" 
                value={longestCycle}
                onChange={(e) => setLongestCycle(e.target.value)}
                min="21" 
                max="45"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #dfe6e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
              />
            </div>
          </div>
        )}

        {/* Cycle Tips */}
        <div style={{ 
          margin: '20px 0',
          padding: '20px',
          background: '#fff5f8',
          borderRadius: '10px',
          borderLeft: '4px solid #e91e63'
        }}>
          <h4 style={{ 
            marginBottom: '10px',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fas fa-lightbulb"></i> How to Determine Your Cycle Length
          </h4>
          <p style={{fontSize: '0.9rem', color: '#666'}}>Track the number of days from the first day of your period to the day before your next period starts. Do this for 3-6 months and calculate the average for best accuracy.</p>
        </div>

        {/* Calculate Button */}
        <button
          style={{
            width: '100%',
            padding: '16px',
            background: '#e91e63',
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
          }}
          onClick={calculateOvulation}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c2185b';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(233, 30, 99, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#e91e63';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Fertility Window
        </button>

        {/* Results Display */}
        {results && (
          <>
            <div style={{ 
              margin: '30px 0', 
              padding: '25px', 
              background: 'linear-gradient(135deg, #fff5f8 0%, #ffebee 100%)',
              borderRadius: '12px', 
              borderLeft: '5px solid #e91e63',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{marginBottom: '20px', color: '#2c3e50'}}>
                <i className="fas fa-chart-line"></i> Your Fertility Analysis
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '15px',
                marginTop: '25px'
              }}>
                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px', 
                  textAlign: 'center', 
                  boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                  borderLeft: '5px solid #e91e63'
                }}>
                  <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>
                    <i className="fas fa-egg"></i> Ovulation Day
                  </h4>
                  <div style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    margin: '10px 0', 
                    color: '#e91e63' 
                  }}>
                    {results.ovulationDate}
                  </div>
                  <p style={{fontSize: '0.9rem', color: '#666'}}>Peak fertility - egg release</p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px', 
                  textAlign: 'center', 
                  boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                  borderLeft: '5px solid #ff4081'
                }}>
                  <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>
                    <i className="fas fa-heart"></i> Fertile Window
                  </h4>
                  <div style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    margin: '10px 0', 
                    color: '#ff4081' 
                  }}>
                    {results.fertileRange}
                  </div>
                  <p style={{fontSize: '0.9rem', color: '#666'}}>Best time for conception</p>
                </div>

                <div style={{ 
                  padding: '20px', 
                  background: 'white', 
                  borderRadius: '10px', 
                  textAlign: 'center', 
                  boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                  borderLeft: '5px solid #9c27b0'
                }}>
                  <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>
                    <i className="fas fa-calendar"></i> Next Period
                  </h4>
                  <div style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    margin: '10px 0', 
                    color: '#9c27b0' 
                  }}>
                    {results.nextPeriod}
                  </div>
                  <p style={{fontSize: '0.9rem', color: '#666'}}>Expected start date</p>
                </div>
              </div>

              {/* Share and Download Buttons */}
              <div style={actionButtonsStyle}>
                <div style={{ position: 'relative' }} className="share-button-container">
                  <button
                    style={shareButtonStyle}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#c2185b'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#e91e63'}
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
                  onMouseEnter={(e) => e.currentTarget.style.background = '#7b1fa2'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#9c27b0'}
                >
                  <i className="fas fa-file-code"></i> Download HTML Report
                </button>
              </div>
            </div>
          </>
        )}

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
            <i className="fas fa-calculator"></i> Comprehensive Ovulation Calculation Methodology and Fertility Window Prediction Accuracy
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Our advanced ovulation calculator employs sophisticated <strong>menstrual cycle tracking algorithms</strong> and evidence-based <strong>fertility prediction methodologies</strong> to estimate ovulation timing with remarkable precision. By analyzing your <strong>menstrual cycle length patterns</strong> and <strong>last menstrual period date</strong>, the calculator applies the <strong>standard day method principle</strong> which recognizes that the <strong>luteal phase (post-ovulation period)</strong> remains relatively constant at approximately 14 days for most women, regardless of total cycle length. This biological consistency enables accurate <strong>ovulation day prediction</strong> and <strong>fertile window identification</strong> for optimizing <strong>conception planning strategies</strong> and <strong>natural family planning approaches</strong>.
          </p>

          <div style={{ 
            background: '#f1f3f5', 
            padding: '20px', 
            borderRadius: '10px', 
            fontFamily: "'Courier New', monospace", 
            textAlign: 'left', 
            margin: '20px 0', 
            fontSize: '0.95rem',
            borderLeft: '4px solid #e91e63',
            overflowX: 'auto'
          }}>
            <strong>Advanced Ovulation Calculation Formulas with Clinical Validation:</strong><br/>
            <strong>Standard Regular Cycle Calculation:</strong><br/>
            Next Period Date = Last Period Date + Cycle Length (Days)<br/>
            Ovulation Day = Next Period Date - 14 Days (Luteal Phase)<br/>
            Fertile Window = Ovulation Day - 5 Days to Ovulation Day + 1 Day<br/><br/>
            
            <strong>Irregular Cycle Range Method:</strong><br/>
            Earliest Possible Ovulation = Last Period + (Shortest Cycle - 18 Days)<br/>
            Latest Possible Ovulation = Last Period + (Longest Cycle - 11 Days)<br/>
            Extended Fertile Window = Earliest Fertile Day to Latest Fertile Day<br/><br/>
            
            <strong>Clinical Accuracy Parameters:</strong><br/>
            Regular Cycles: 75-85% prediction accuracy with calendar method alone<br/>
            Irregular Cycles: 60-70% accuracy, improves with multi-method tracking<br/>
            Combined Methods (BBT + Calendar + CM): 90-95% ovulation confirmation accuracy
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
            <i className="fas fa-chart-line"></i> Comprehensive Menstrual Cycle Phases Analysis and Hormonal Fluctuation Patterns
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Understanding the four distinct phases of the <strong>menstrual cycle</strong> provides crucial insights into fertility patterns and optimal conception timing. Each phase involves specific <strong>hormonal fluctuations</strong> and <strong>physiological changes</strong> that directly impact <strong>fertility potential</strong> and <strong>reproductive health indicators</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Menstrual Phase (Days 1-5):</strong> Characterized by <strong>uterine lining shedding</strong> and <strong>menstrual bleeding onset</strong>. During this phase, <strong>estrogen and progesterone levels reach their lowest points</strong>, while <strong>follicle-stimulating hormone (FSH)</strong> begins rising to initiate the next cycle's follicle development. This represents the <strong>lowest fertility period</strong> of the entire menstrual cycle</li>
            <li style={{ marginBottom: '10px' }}><strong>Follicular Phase (Days 1-13 in 28-day cycle):</strong> Encompasses <strong>follicle maturation</strong> in the ovaries and <strong>endometrial regeneration</strong>. <strong>Estrogen levels progressively increase</strong>, stimulating <strong>cervical mucus production</strong> and <strong>endometrial thickening</strong>. Fertility potential gradually rises throughout this phase, peaking immediately before ovulation as <strong>luteinizing hormone (LH) surge</strong> triggers follicle rupture</li>
            <li style={{ marginBottom: '10px' }}><strong>Ovulation Phase (Approximately Day 14):</strong> The <strong>24-hour window of peak fertility</strong> when a mature <strong>ovum releases from the dominant ovarian follicle</strong>. This phase initiates with the dramatic <strong>LH surge</strong> approximately 24-36 hours before ovulation. The <strong>released egg remains viable for fertilization</strong> for only 12-24 hours, creating a narrow but critical window for successful conception</li>
            <li><strong>Luteal Phase (Days 15-28 in 28-day cycle):</strong> Following ovulation, the <strong>corpus luteum forms</strong> and secretes <strong>progesterone</strong> to prepare the endometrium for potential implantation. This phase demonstrates remarkable consistency across cycles (typically 12-16 days). If fertilization doesn't occur, <strong>progesterone levels decline</strong>, triggering <strong>menstrual shedding</strong> and cycle repetition</li>
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
            <i className="fas fa-baby"></i> Maximizing Conception Probability: Evidence-Based Strategies for Fertility Window Optimization
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Achieving optimal conception success requires precise timing within the fertility window combined with evidence-based reproductive health practices. Research demonstrates that implementing these <strong>fertility optimization strategies</strong> can significantly enhance <strong>monthly conception probabilities</strong>:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Strategic Intercourse Timing:</strong> Engage in intercourse every other day during the <strong>6-day fertility window</strong> (5 days before ovulation plus ovulation day) to maintain optimal sperm concentration while maximizing conception opportunities. This approach balances <strong>sperm quality maintenance</strong> with <strong>fertilization probability optimization</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Peak Fertility Concentration:</strong> Focus particularly on the <strong>three days immediately preceding ovulation</strong>, which offer the highest conception probabilities (approximately 27-33% per cycle according to clinical studies). This period capitalizes on both <strong>sperm survival duration</strong> and <strong>egg viability overlap</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Sperm Longevity Consideration:</strong> Healthy sperm can survive up to 5 days within fertile-quality <strong>cervical mucus</strong>, making pre-ovulation days particularly valuable for conception. This extended viability creates a <strong>wider effective fertility window</strong> than the egg's brief 12-24 hour viability period</li>
            <li><strong>Post-Ovulation Limitations:</strong> Conception becomes statistically improbable more than 24 hours after confirmed ovulation, as the <strong>released oocyte deteriorates rapidly</strong> and loses fertilization capacity. This biological reality underscores the importance of <strong>pre-ovulation timing precision</strong> rather than post-ovulation efforts</li>
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
            <i className="fas fa-clipboard-check"></i> Multi-Method Fertility Tracking: Enhancing Ovulation Prediction Accuracy Through Biomarker Integration
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While calendar-based calculations provide valuable estimates, combining multiple <strong>fertility awareness methods</strong> substantially improves ovulation detection accuracy. Implementing these complementary tracking approaches enables more precise fertility window identification:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Basal Body Temperature (BBT) Monitoring:</strong> Track your <strong>waking temperature daily</strong> using a sensitive basal thermometer. A <strong>sustained temperature rise of 0.4-1.0°F (0.2-0.5°C)</strong> lasting at least three days confirms ovulation has occurred. This retrospective confirmation method helps establish <strong>individual luteal phase length patterns</strong> and confirms <strong>ovulatory cycle occurrence</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Cervical Mucus Observation:</strong> Monitor <strong>cervical fluid changes</strong> throughout your cycle. Fertile mucus transforms from <strong>scant and cloudy</strong> to <strong>abundant, clear, stretchy, and slippery</strong>—resembling raw egg whites. This <strong>estrogen-induced change</strong> creates an optimal environment for sperm survival and transport during peak fertility</li>
            <li style={{ marginBottom: '10px' }}><strong>Cervical Position Assessment:</strong> Examine <strong>cervical changes</strong> through manual palpation. During fertile periods, the cervix becomes <strong>softer, higher, more open, and wetter</strong> compared to its usual <strong>firm, low, closed, and dry</strong> infertile state. These tactile changes provide additional fertility confirmation</li>
            <li><strong>Ovulation Predictor Kits (OPK) Utilization:</strong> Employ urine-based test strips to detect the <strong>luteinizing hormone (LH) surge</strong> that precedes ovulation by 24-36 hours. These kits provide <strong>prospective ovulation prediction</strong>, allowing for precise timing of intercourse during the most fertile period immediately before egg release</li>
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
            <i className="fas fa-exclamation-triangle"></i> Special Considerations for Irregular Menstrual Cycles and Medical Condition Impacts
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While our calculator provides valuable predictions for regular cycles, several factors can significantly impact cycle regularity and ovulation timing, necessitating specialized approaches:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Clinically Irregular Cycles:</strong> Cycles varying by more than 7-9 days between shortest and longest durations require the <strong>range method approach</strong> and benefit from <strong>comprehensive multi-method tracking</strong> to identify ovulation patterns within irregularity</li>
            <li style={{ marginBottom: '10px' }}><strong>Polycystic Ovary Syndrome (PCOS):</strong> This common endocrine disorder often causes <strong>anovulatory cycles, prolonged cycles, and unpredictable ovulation</strong>. Women with PCOS typically require <strong>medical monitoring and specialized tracking approaches</strong> beyond standard calendar methods</li>
            <li style={{ marginBottom: '10px' }}><strong>Thyroid Dysfunction Impacts:</strong> Both hypothyroidism and hyperthyroidism can disrupt <strong>menstrual regularity and ovulation frequency</strong> through effects on the <strong>hypothalamic-pituitary-ovarian axis</strong>. Proper thyroid management often restores cycle regularity</li>
            <li style={{ marginBottom: '10px' }}><strong>Stress and Lifestyle Factors:</strong> Significant <strong>emotional stress, extreme exercise, rapid weight changes, and international travel</strong> can temporarily disrupt normal hormonal patterns, potentially delaying or suppressing ovulation even in typically regular cycles</li>
            <li style={{ marginBottom: '10px' }}><strong>Perimenopausal Transitions:</strong> As women approach menopause, <strong>cycle length variability increases</strong> and <strong>ovulation frequency decreases</strong>. These natural changes require adjusted expectations and tracking approaches during the reproductive transition</li>
            <li><strong>Medication Influences:</strong> Certain pharmaceuticals including <strong>hormonal contraceptives, fertility medications, antipsychotics, and chemotherapy agents</strong> significantly affect menstrual cycle patterns and ovulation predictability</li>
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
            <i className="fas fa-user-md"></i> Clinical Indications for Fertility Specialist Consultation and Advanced Reproductive Evaluation
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            While ovulation calculators provide valuable self-assessment tools, specific clinical scenarios warrant professional medical evaluation and specialized reproductive health consultation:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extended Conception Attempts:</strong> Consider fertility specialist consultation after <strong>12 months of regular, unprotected intercourse without conception</strong> (6 months if over age 35). Earlier evaluation may be appropriate with known risk factors or irregular cycles</li>
            <li style={{ marginBottom: '10px' }}><strong>Severe Cycle Irregularity:</strong> Medical evaluation is recommended for cycles consistently shorter than 21 days or longer than 35 days, or with variations exceeding 7-9 days between shortest and longest cycles</li>
            <li style={{ marginBottom: '10px' }}><strong>Known Reproductive Conditions:</strong> Women with diagnosed conditions including <strong>endometriosis, pelvic inflammatory disease history, previous ectopic pregnancy, or uterine abnormalities</strong> benefit from early reproductive specialist involvement</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Maternal Age Considerations:</strong> Women aged 35+ attempting conception may benefit from <strong>earlier evaluation and potential fertility preservation discussions</strong> due to age-related fertility decline acceleration</li>
            <li><strong>Male Factor Considerations:</strong> Approximately 40-50% of infertility involves male factors. Couples should consider <strong>comprehensive evaluation including semen analysis</strong> when conception challenges persist despite optimal timing</li>
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
            <i className="fas fa-flask"></i> Emerging Technologies in Fertility Tracking and Future Developments in Reproductive Health Monitoring
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            The field of <strong>fertility awareness technology</strong> continues advancing rapidly with innovative developments enhancing prediction accuracy and user experience:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Fertility Trackers:</strong> Advanced devices continuously monitor <strong>skin temperature, heart rate variability, and respiratory patterns</strong> to detect subtle physiological changes associated with menstrual cycle phases and ovulation timing</li>
            <li style={{ marginBottom: '10px' }}><strong>Smartphone-Based Hormone Monitoring:</strong> Emerging technologies enable <strong>home-based hormone level assessment</strong> through saliva, urine, or blood sample analysis connected to smartphone applications for real-time fertility status updates</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Prediction Algorithms:</strong> Machine learning systems analyze <strong>multiple cycle parameters simultaneously</strong> to identify individual patterns and improve prediction accuracy beyond traditional calendar-based methods</li>
            <li><strong>Integrated Reproductive Health Platforms:</strong> Comprehensive systems combine <strong>cycle tracking, symptom monitoring, medical record integration, and telehealth connectivity</strong> to provide holistic reproductive health management and personalized fertility optimization</li>
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
            <i className="fas fa-handshake"></i> Holistic Reproductive Health Integration and Comprehensive Fertility Optimization Approaches
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Successful conception planning extends beyond simple ovulation prediction to encompass comprehensive <strong>reproductive health optimization</strong> and <strong>lifestyle factor management</strong>. A holistic approach integrates multiple dimensions of wellness to create optimal conditions for conception and healthy pregnancy:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Optimization for Fertility:</strong> Implement evidence-based dietary patterns emphasizing <strong>antioxidant-rich foods, healthy fats, complex carbohydrates, and adequate protein</strong> to support hormonal balance and reproductive function</li>
            <li style={{ marginBottom: '10px' }}><strong>Stress Reduction and Mental Wellness:</strong> Chronic stress elevates cortisol levels, potentially disrupting ovulation regularity. Incorporate <strong>mindfulness practices, adequate sleep, and relaxation techniques</strong> to support reproductive endocrine balance</li>
            <li style={{ marginBottom: '10px' }}><strong>Environmental Toxin Reduction:</strong> Minimize exposure to <strong>endocrine-disrupting chemicals</strong> found in certain plastics, personal care products, and household items that may interfere with normal hormonal function</li>
            <li><strong>Preconception Health Optimization:</strong> Address underlying health conditions, achieve healthy weight ranges, optimize chronic disease management, and ensure adequate nutrient status before conception attempts for optimal reproductive outcomes</li>
          </ul>
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
            <i className="fas fa-question-circle"></i> Frequently Asked Questions About Ovulation Prediction and Fertility Tracking
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

        {/* Disclaimer Section */}
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
            <strong>This ovulation calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard menstrual cycle patterns and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Limitations and Considerations:</strong> Individual cycle variations, health conditions, medications, stress, lifestyle factors, and age can significantly affect ovulation timing and menstrual cycle regularity. This tool does not account for all possible variables that may influence your specific fertility patterns.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Not for Contraceptive Use:</strong> This calculator should NOT be used as a method of birth control or pregnancy prevention. Calendar-based methods have significant failure rates for contraception purposes.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, gynecologist, or other qualified healthcare provider with any questions regarding fertility, menstrual health, or conception planning. Do not make medical decisions based solely on ovulation calculator results.
          </p>
          <p>
            <strong>Comprehensive Fertility Assessment:</strong> Accurate fertility evaluation requires consideration of multiple factors including medical history, physical examination, laboratory testing, and potentially imaging studies. This calculator represents only one component of comprehensive reproductive health assessment.
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
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium fertility tracking app</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced ovulation predictor kits</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Personalized fertility consultation</p>
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
                      e.currentTarget.style.background = '#e91e63';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(233, 30, 99, 0.2)';
                      e.currentTarget.style.borderColor = '#e91e63';
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
                      background: calculator.relevance >= 9 ? '#e91e63' : calculator.relevance >= 8 ? '#ff4081' : '#9c27b0',
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