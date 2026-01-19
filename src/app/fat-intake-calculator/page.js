"use client";

import { useState, useEffect } from 'react';

export default function FatIntakeCalculatorPage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintenance');
  const [dietType, setDietType] = useState('balanced');
  const [bodyFat, setBodyFat] = useState('20');
  const [cholesterol, setCholesterol] = useState('normal');
  const [metabolicHealth, setMetabolicHealth] = useState('healthy');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [fatHistory, setFatHistory] = useState([]);

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

  const fatCardStyle = {
    borderTopColor: '#3498db'
  };

  const distributionCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const timingCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const qualityCardStyle = {
    borderTopColor: '#2ecc71'
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
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const stickyAdStyle = {
    position: 'sticky',
    top: '20px',
    background: '#ebf5fb',
    border: '2px solid #3498db',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.15)',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '300px',
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
    borderTop: '2px solid #3498db',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  };

  const calculatorCardStyle = {
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#2c3e50',
    transition: 'all 0.3s',
    border: '2px solid transparent'
  };

  const hoverCalculatorCardStyle = {
    background: '#3498db',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.2)',
    borderColor: '#3498db'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#e8f4fc',
    borderRadius: '10px',
    borderLeft: '5px solid #3498db',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#2980b9',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Fat intake recommendations
  const fatRecommendations = {
    maintenance: { min: 0.8, max: 1.2 },
    fatLoss: { min: 0.5, max: 0.8 },
    muscleGain: { min: 1.0, max: 1.5 },
    athletic: { min: 0.7, max: 1.0 },
    ketogenic: { min: 1.5, max: 2.5 },
    lowFat: { min: 0.3, max: 0.5 }
  };

  // Diet type multipliers
  const dietTypeMultipliers = {
    balanced: 1.0,
    mediterranean: 1.2,
    keto: 1.8,
    paleo: 1.3,
    vegan: 0.9,
    lowFat: 0.6
  };

  // Cholesterol multipliers
  const cholesterolMultipliers = {
    normal: 1.0,
    borderline: 0.8,
    high: 0.6,
    veryHigh: 0.5
  };

  // Sample data for demo
  useEffect(() => {
    setWeight('75');
    setHeight('175');
    setAge('30');
    setGender('male');
    setActivityLevel('moderate');
    setGoal('maintenance');
    setDietType('balanced');
    setBodyFat('20');
    setCholesterol('normal');
    setMetabolicHealth('healthy');

    // Generate sample fat history
    const historyData = [];
    const goals = ['Maintenance', 'Fat Loss', 'Muscle Gain'];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const fatGrams = Math.floor(Math.random() * 80) + 50;
      const goalType = goals[Math.floor(Math.random() * goals.length)];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        fat: fatGrams,
        goal: goalType,
        cholesterol: Math.floor(Math.random() * 40) + 160
      });
    }
    setFatHistory(historyData);
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

  const calculateFatIntake = () => {
    // Validate inputs
    if (!weight || !height || !age || !bodyFat) {
      alert('Please fill in all required fields.');
      return;
    }

    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const ageVal = parseInt(age);
    const bodyFatVal = parseFloat(bodyFat);

    if (weightVal < 30 || weightVal > 300) {
      alert('Weight should be between 30 and 300 kg.');
      return;
    }

    if (heightVal < 100 || heightVal > 250) {
      alert('Height should be between 100 and 250 cm.');
      return;
    }

    if (ageVal < 18 || ageVal > 120) {
      alert('Age should be between 18 and 120 years.');
      return;
    }

    if (bodyFatVal < 5 || bodyFatVal > 60) {
      alert('Body fat percentage should be between 5 and 60.');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal - 161;
    }

    // Calculate TDEE with activity multiplier
    const activityFactors = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
      athlete: 2.0
    };

    let tdee = bmr * activityFactors[activityLevel];

    // Calculate lean body mass
    const leanBodyMass = weightVal * (1 - bodyFatVal / 100);

    // Base fat needs
    let fatPerKgMin = fatRecommendations[goal].min;
    let fatPerKgMax = fatRecommendations[goal].max;

    // Adjust for diet type
    const dietMultiplier = dietTypeMultipliers[dietType];
    fatPerKgMin *= dietMultiplier;
    fatPerKgMax *= dietMultiplier;

    // Adjust for cholesterol levels
    const cholesterolMultiplier = cholesterolMultipliers[cholesterol];
    fatPerKgMin *= cholesterolMultiplier;
    fatPerKgMax *= cholesterolMultiplier;

    // Adjust for metabolic health
    if (metabolicHealth === 'prediabetic' || metabolicHealth === 'insulinResistant') {
      fatPerKgMin *= 1.1;
      fatPerKgMax *= 1.2;
    } else if (metabolicHealth === 'diabetic') {
      fatPerKgMin *= 1.2;
      fatPerKgMax *= 1.3;
    } else if (metabolicHealth === 'pcos') {
      fatPerKgMin *= 0.9;
      fatPerKgMax *= 1.0;
    }

    // Calculate fat range
    const minFat = Math.round(weightVal * fatPerKgMin);
    const maxFat = Math.round(weightVal * fatPerKgMax);
    const optimalFat = Math.round((minFat + maxFat) / 2);

    // Calculate percentage of total calories
    const fatCalories = optimalFat * 9; // 9 calories per gram
    const fatPercentage = Math.round((fatCalories / tdee) * 100);

    // Calculate other macronutrients
    const proteinGrams = Math.round(leanBodyMass * 1.8); // Based on lean mass
    const proteinCalories = proteinGrams * 4;
    const carbCalories = tdee - (fatCalories + proteinCalories);
    const carbGrams = Math.round(carbCalories / 4);

    // Calculate fatty acid ratios
    const saturatedFat = Math.round(optimalFat * 0.3); // Max 30%
    const monounsaturatedFat = Math.round(optimalFat * 0.45); // 40-50%
    const polyunsaturatedFat = Math.round(optimalFat * 0.25); // 20-30%
    const omega6ToOmega3Ratio = '4:1 (optimal: 4:1 to 1:1)';

    // Fat distribution throughout the day
    const fatDistribution = [
      { meal: 'Breakfast', percentage: 20, grams: Math.round(optimalFat * 0.20), timing: 'Morning energy & hormone support' },
      { meal: 'Lunch', percentage: 30, grams: Math.round(optimalFat * 0.30), timing: 'Satiety & nutrient absorption' },
      { meal: 'Dinner', percentage: 35, grams: Math.round(optimalFat * 0.35), timing: 'Hormone production & recovery' },
      { meal: 'Snacks', percentage: 15, grams: Math.round(optimalFat * 0.15), timing: 'Energy maintenance' }
    ];

    // Fat source suggestions
    const fatSources = {
      saturated: [
        { name: 'Coconut Oil', serving: '1 tbsp', fat: 14, saturated: 12, benefits: 'MCTs for quick energy' },
        { name: 'Grass-fed Butter', serving: '1 tbsp', fat: 11, saturated: 7, benefits: 'Butyrate for gut health' },
        { name: 'Egg Yolks', serving: '2 large', fat: 10, saturated: 3, benefits: 'Choline & vitamins' },
        { name: 'Dark Chocolate', serving: '30g 85%', fat: 12, saturated: 7, benefits: 'Antioxidants' }
      ],
      monounsaturated: [
        { name: 'Avocado', serving: '1 medium', fat: 21, saturated: 3, benefits: 'Fiber & potassium' },
        { name: 'Olive Oil', serving: '1 tbsp', fat: 14, saturated: 2, benefits: 'Heart healthy' },
        { name: 'Almonds', serving: '30g', fat: 14, saturated: 1, benefits: 'Vitamin E' },
        { name: 'Macadamia Nuts', serving: '30g', fat: 21, saturated: 3, benefits: 'Highest MUFA nuts' }
      ],
      polyunsaturated: [
        { name: 'Salmon', serving: '150g', fat: 22, saturated: 4, benefits: 'Omega-3 EPA/DHA' },
        { name: 'Flaxseeds', serving: '2 tbsp ground', fat: 9, saturated: 1, benefits: 'ALA omega-3' },
        { name: 'Walnuts', serving: '30g', fat: 18, saturated: 2, benefits: 'ALA & antioxidants' },
        { name: 'Chia Seeds', serving: '2 tbsp', fat: 9, saturated: 1, benefits: 'Omega-3 & fiber' }
      ]
    };

    // Timing recommendations
    const timingRecommendations = [
      'Consume healthy fats with all meals for sustained energy',
      'Include MCTs in morning for cognitive function',
      'Combine fats with fat-soluble vitamins (A,D,E,K)',
      'Post-workout: Include anti-inflammatory fats (omega-3)',
      'Evening: Emphasize calming fats (olive oil, nuts)'
    ];

    // Quality strategies
    const qualityStrategies = [
      'Prioritize monounsaturated and polyunsaturated fats',
      'Limit industrial seed oils (soybean, corn, canola)',
      'Choose grass-fed and wild-caught animal products',
      'Avoid trans fats and hydrogenated oils completely',
      'Balance omega-6 to omega-3 ratio (aim for 4:1 or lower)'
    ];

    // Additional recommendations
    const additionalRecommendations = [
      `Aim for ${minFat}-${maxFat}g total fat daily`,
      `Fat should provide ${fatPercentage}% of daily calories`,
      `Limit saturated fat to ${saturatedFat}g (≤10% of calories)`,
      `Include ${Math.round(optimalFat * 0.1)}g omega-3 daily`,
      'Cook with stable fats (coconut oil, ghee, avocado oil)'
    ];

    // Risk assessment
    let riskLevel = 'Low';
    let riskColor = '#2ecc71';
    let riskRecommendations = [];

    if (cholesterol === 'high' && saturatedFat > (tdee * 0.1 / 9)) {
      riskLevel = 'Moderate';
      riskColor = '#f39c12';
      riskRecommendations.push('Reduce saturated fat intake to ≤7% of calories');
      riskRecommendations.push('Increase monounsaturated and polyunsaturated fats');
      riskRecommendations.push('Consider plant sterols and soluble fiber');
    } else if (cholesterol === 'veryHigh') {
      riskLevel = 'High';
      riskColor = '#e74c3c';
      riskRecommendations.push('Consult cardiologist for personalized fat recommendations');
      riskRecommendations.push('Focus on Mediterranean diet principles');
      riskRecommendations.push('Consider omega-3 supplementation (2-4g EPA+DHA)');
    }

    // Calculate specific fat targets
    const targets = {
      saturated: `${Math.round(tdee * 0.07 / 9)}-${Math.round(tdee * 0.1 / 9)}g (7-10% of calories)`,
      omega3: `${Math.round(weightVal * 0.03)}-${Math.round(weightVal * 0.05)}g daily`,
      monounsaturated: `${Math.round(optimalFat * 0.4)}-${Math.round(optimalFat * 0.5)}g daily`,
      transFat: '0g (avoid completely)'
    };

    // Hormone support calculations
    const hormoneSupport = {
      testosterone: fatPercentage >= 30 ? 'Optimal' : 'Suboptimal',
      estrogen: 'Balanced',
      cortisol: 'Stabilized with balanced intake',
      leptin: 'Adequate for satiety signaling'
    };

    setResults({
      weight: weightVal,
      height: heightVal,
      age: ageVal,
      gender: gender,
      goal: goal,
      activityLevel: activityLevel,
      dietType: dietType,
      bodyFat: bodyFatVal,
      cholesterol: cholesterol,
      metabolicHealth: metabolicHealth,
      bmi: (weightVal / ((heightVal / 100) ** 2)).toFixed(1),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      leanBodyMass: Math.round(leanBodyMass),
      minFat: minFat,
      maxFat: maxFat,
      optimalFat: optimalFat,
      fatPerKgMin: fatPerKgMin.toFixed(2),
      fatPerKgMax: fatPerKgMax.toFixed(2),
      fatCalories: fatCalories,
      fatPercentage: fatPercentage,
      proteinGrams: proteinGrams,
      carbGrams: carbGrams,
      saturatedFat: saturatedFat,
      monounsaturatedFat: monounsaturatedFat,
      polyunsaturatedFat: polyunsaturatedFat,
      omega6ToOmega3Ratio: omega6ToOmega3Ratio,
      fatDistribution: fatDistribution,
      fatSources: fatSources,
      timingRecommendations: timingRecommendations,
      qualityStrategies: qualityStrategies,
      additionalRecommendations: additionalRecommendations,
      riskLevel: riskLevel,
      riskColor: riskColor,
      riskRecommendations: riskRecommendations,
      targets: targets,
      hormoneSupport: hormoneSupport,
      fatHistory: fatHistory
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between saturated, unsaturated, and trans fats? Which should I prioritize?",
      answer: "Saturated fats: Solid at room temp, found in animal products (butter, lard, red meat) and tropical oils (coconut, palm). Modern research suggests not all saturated fats are equal - dairy and coconut fat may be neutral or beneficial, while processed meats show negative associations. Unsaturated fats: Liquid at room temp, include monounsaturated (olive oil, avocados, nuts) and polyunsaturated (fish, walnuts, flaxseeds). These are generally heart-healthy, especially omega-3 polyunsaturated fats. Trans fats: Artificial (partially hydrogenated oils) or natural (ruminant animals). Artificial trans fats are harmful and should be avoided completely. Prioritization: 1) Monounsaturated fats as primary fat source (40-50% of total fat), 2) Omega-3 polyunsaturated fats for inflammation control, 3) Some saturated fats from quality sources, 4) Avoid all artificial trans fats and limit industrial seed oils high in omega-6."
    },
    {
      question: "How does fat intake affect cholesterol levels and heart health? What's the optimal fat intake for lipid profiles?",
      answer: "Fat's impact on cholesterol is nuanced: Saturated fats typically raise LDL cholesterol but also raise HDL. The effect varies by individual (hyper-responders vs hypo-responders). Monounsaturated fats improve overall lipid profile - lower LDL, raise HDL, reduce oxidation. Polyunsaturated fats (especially omega-3) lower triglycerides, reduce inflammation, improve HDL function. Trans fats are worst - raise LDL, lower HDL, increase inflammation. Optimal fat intake for heart health: Total fat: 30-40% of calories for most people. Saturated: ≤10% of calories (≤7% if high cholesterol). Focus on quality: Replace saturated fats with unsaturated, not carbohydrates. Mediterranean diet pattern: 35-40% fat (mostly olive oil, nuts, fish). Individual testing: Get advanced lipid panel (LDL particle number, ApoB, LP(a)) for accurate assessment. Genetic factors: ApoE genotype influences fat metabolism - E4 carriers may need lower saturated fat."
    },
    {
      question: "Can you eat too little fat? What are the risks of extremely low-fat diets?",
      answer: "Yes, fat deficiency risks are significant: Hormonal disruption: Fat is essential for sex hormone production (testosterone, estrogen). Very low fat (<15% calories) can lower testosterone by 20-30% in men and cause menstrual irregularities in women. Nutrient deficiencies: Fat-soluble vitamins (A, D, E, K) require fat for absorption. Low fat impairs uptake of these critical nutrients. Skin and hair issues: Essential fatty acid deficiency causes dry skin, hair loss, poor wound healing. Gallbladder problems: Very low fat reduces gallbladder contractions, increasing gallstone risk. Cognitive decline: Brain is 60% fat - low fat intake impairs cognitive function, mood, and mental health. Cellular dysfunction: Every cell membrane requires fats for structure and function. Metabolic slowdown: Fat helps regulate metabolism and body temperature. Minimum requirements: At least 20% of calories from fat (0.5g/kg minimum), with emphasis on essential fatty acids."
    },
    {
      question: "What are the best fat sources for cooking vs. eating raw? How to choose cooking oils properly?",
      answer: "Cooking fat stability depends on smoke point and oxidation resistance: High heat cooking (frying, searing): Avocado oil (smoke point: 270°C), Ghee (250°C), Coconut oil (177°C), Beef tallow (250°C). These have high saturated/monounsaturated content, resist oxidation. Medium heat (sautéing, baking): Olive oil (extra virgin: 190-210°C), Butter (177°C), Duck fat (190°C). Good for most home cooking. No heat (dressings, finishing): Flaxseed oil, Walnut oil, Hemp oil - rich in omega-3 but very heat-sensitive. Sesame oil (toasted) for flavor. Avoid for high heat: Industrial seed oils (soybean, corn, canola, sunflower) - high in polyunsaturated omega-6, easily oxidized, form harmful compounds when heated. Key principles: 1) Match oil to cooking temperature, 2) Avoid reusing heated oils, 3) Store oils properly (dark, cool place), 4) Extra virgin oils for low heat or raw, 5) When in doubt, use avocado oil or ghee."
    },
    {
      question: "How does fat intake affect hormone production (testosterone, estrogen, cortisol)? What's optimal for hormonal balance?",
      answer: "Fat is crucial for hormone synthesis: Cholesterol is precursor for all steroid hormones. Testosterone: Studies show diets with 30-40% fat (especially monounsaturated and saturated) support optimal testosterone. Very low fat (<20%) decreases testosterone. Zone for men: 0.8-1.2g/kg, with emphasis on olive oil, nuts, eggs, fatty fish. Estrogen: Adequate fat supports estrogen production in women. Very low fat can cause amenorrhea. However, excess body fat increases estrogen production via aromatase. Balance: 0.7-1.0g/kg for women. Cortisol: Omega-3 fats help regulate cortisol response. MCTs may reduce stress response. Blood sugar stability from fat helps prevent cortisol spikes. Thyroid: Very low fat can impair thyroid function by reducing cholesterol availability. Optimal ranges: Men: 30-40% calories from fat, Women: 25-35%. Quality matters: Emphasize monounsaturated fats, adequate saturated for hormone precursors, omega-3 for inflammation control."
    },
    {
      question: "What about fat intake for brain health and cognitive function? Which fats are most important for the brain?",
      answer: "Brain is 60% fat - specific fats are critical: Omega-3 DHA: Most important brain fat. Comprises 30% of brain gray matter. Essential for neuron membrane fluidity, synaptic function, neuroprotection. Sources: Fatty fish (salmon, sardines), algae oil. Minimum: 500mg DHA+EPA daily, optimal: 1-2g. Cholesterol: Brain contains 25% of body's cholesterol. Essential for myelin sheath formation, synaptic function. Dietary cholesterol doesn't significantly impact brain cholesterol. Saturated fats: Provide stability to cell membranes. MCTs (coconut oil) provide ketones - alternative brain fuel, beneficial in Alzheimer's. Phospholipids: Choline (eggs, liver) for acetylcholine production. Critical for memory. Optimal brain fat intake: 1) Ensure adequate omega-3 (aim for 1g DHA+EPA daily), 2) Include cholesterol-rich foods (eggs, shellfish), 3) Use MCT oil for cognitive tasks, 4) Avoid trans fats completely (damage brain cells), 5) Balance omega-6 to omega-3 ratio (4:1 or lower)."
    }
  ];

  const healthCalculators = [
    { name: "Carbohydrate Intake Calculator", link: "/carbohydrate-intake-calculator" },
    { name: "Protein Intake Calculator", link: "/protein-intake-calculator" },
    { name: "Macro Calculator", link: "/macro-calculator" },
    { name: "Calorie Calculator", link: "/calorie-calculator" },
    { name: "Cholesterol Calculator", link: "/cholesterol-calculator" },
    { name: "Body Fat Calculator", link: "/body-fat-calculator" },
    { name: "Metabolism Calculator", link: "/metabolism-calculator" },
    { name: "Heart Health Calculator", link: "/heart-health-calculator" },
    { name: "Omega-3 Calculator", link: "/omega3-calculator" },
    { name: "Ketone Calculator", link: "/ketone-calculator" },
    { name: "Hormone Balance Calculator", link: "/hormone-balance-calculator" },
    { name: "Brain Health Calculator", link: "/brain-health-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-oil-can"></i> Fat Intake Calculator - Comprehensive Lipid Requirement Analysis & Metabolic Health Optimization Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise dietary fat intake requirements, personalized lipid optimization strategies, and evidence-based metabolic health enhancement recommendations</strong> using <strong>advanced biochemical algorithms, comprehensive physiological data integration, and current nutritional lipid science</strong>. Essential for <strong>hormonal balance optimization, cellular function enhancement, and informed dietary fat decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight (kg) *</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="75"
              min="30"
              max="300"
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Current body weight in kilograms
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height (cm) *</label>
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
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years) *</label>
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
            <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              style={selectStyle}
            >
              <option value="sedentary">Sedentary (office job, little exercise)</option>
              <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (hard exercise 6-7 days/week)</option>
              <option value="very_active">Very Active (hard daily exercise & physical job)</option>
              <option value="athlete">Athlete (twice daily training, competitive)</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-bullseye"></i> Primary Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={selectStyle}
            >
              <option value="maintenance">Weight Maintenance</option>
              <option value="fatLoss">Fat Loss / Cutting</option>
              <option value="muscleGain">Muscle Building / Hypertrophy</option>
              <option value="athletic">Athletic Performance</option>
              <option value="lowFat">Low Fat Lifestyle</option>
              <option value="ketogenic">Ketogenic Diet</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-utensils"></i> Diet Type</label>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              style={selectStyle}
            >
              <option value="balanced">Balanced / Mixed Diet</option>
              <option value="mediterranean">Mediterranean Diet</option>
              <option value="keto">Ketogenic / High Fat</option>
              <option value="paleo">Paleo Diet</option>
              <option value="vegan">Vegan Plant-Based</option>
              <option value="lowFat">Low Fat Diet</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heartbeat"></i> Metabolic Health</label>
            <select
              value={metabolicHealth}
              onChange={(e) => setMetabolicHealth(e.target.value)}
              style={selectStyle}
            >
              <option value="healthy">Healthy (no issues)</option>
              <option value="prediabetic">Prediabetic / Insulin Resistant</option>
              <option value="diabetic">Type 2 Diabetes</option>
              <option value="pcos">PCOS / Hormonal Issues</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-percentage"></i> Body Fat Percentage (%) *</label>
            <input
              type="number"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              placeholder="20"
              min="5"
              max="60"
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Estimated or measured body fat percentage
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heart"></i> Cholesterol Levels</label>
            <select
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
              style={selectStyle}
            >
              <option value="normal">Normal (LDL &lt; 100 mg/dL)</option>
              <option value="borderline">Borderline High (LDL 100-129)</option>
              <option value="high">High (LDL 130-159)</option>
              <option value="veryHigh">Very High (LDL ≥ 160)</option>
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateFatIntake}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Fat Intake Requirements
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...fatCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Fat Intake Requirements</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: '#3498db' }}>
                  {results.optimalFat}g
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px'
                }}>
                  Optimal Daily Fat Intake
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: results.riskLevel === 'High' ? '#f8d7da' : 
                            results.riskLevel === 'Moderate' ? '#fff3cd' : '#d4edda',
                  borderRadius: '8px',
                  color: results.riskLevel === 'High' ? '#721c24' : 
                        results.riskLevel === 'Moderate' ? '#856404' : '#155724',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {results.riskLevel} Risk Level | Range: {results.minFat}-{results.maxFat}g/day
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Fat/kg:</strong> {results.fatPerKgMin}-{results.fatPerKgMax}g/kg body weight</div>
                  <div><strong>Percentage:</strong> {results.fatPercentage}% of {results.tdee} calories</div>
                  <div><strong>Omega-6:Omega-3:</strong> {results.omega6ToOmega3Ratio}</div>
                  <div><strong>Macro Split:</strong> C{Math.round((results.carbGrams * 4 / results.tdee) * 100)}/P{Math.round((results.proteinGrams * 4 / results.tdee) * 100)}/F{results.fatPercentage}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Weight: {results.weight}kg | Body Fat: {results.bodyFat}% | Age: {results.age}</div>
                <div>Goal: {results.goal} | Diet: {results.dietType} | Cholesterol: {results.cholesterol}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...distributionCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-pie"></i> Fatty Acid Distribution</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Optimal Fatty Acid Ratio:</strong></div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Saturated Fat</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#e74c3c', width: '25%', textAlign: 'center' }}>
                      {results.saturatedFat}g
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                      ≤30% of total fat
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Monounsaturated</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#3498db', width: '25%', textAlign: 'center' }}>
                      {results.monounsaturatedFat}g
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                      40-50% of total fat
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Polyunsaturated</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2ecc71', width: '25%', textAlign: 'center' }}>
                      {results.polyunsaturatedFat}g
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                      20-30% of total fat
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>{results.targets.saturated}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Saturated Fat Limit</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>{results.targets.omega3}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Omega-3 Daily</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>0g</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Trans Fat Target</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Key Principles:</strong></div>
                <div>• Prioritize monounsaturated fats</div>
                <div>• Include adequate omega-3</div>
                <div>• Limit processed vegetable oils</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...timingCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clock"></i> Timing Strategies</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#666' }}>
                  <strong>Critical Timing Recommendations:</strong>
                </div>
                {results.timingRecommendations.map((rec, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: '4px solid #9b59b6'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                      {rec}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Hormone Support Status:</strong></div>
                <div>• Testosterone: {results.hormoneSupport.testosterone}</div>
                <div>• Estrogen: {results.hormoneSupport.estrogen}</div>
                <div>• Cortisol: {results.hormoneSupport.cortisol}</div>
                <div>• Leptin: {results.hormoneSupport.leptin}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...qualityCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-star"></i> Quality Recommendations</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Fat Quality Strategies:</strong></div>
                  {results.qualityStrategies.map((strategy, index) => (
                    <div key={index} style={{
                      padding: '5px 0',
                      borderBottom: index < results.qualityStrategies.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontSize: '0.85rem' }}>• {strategy}</span>
                    </div>
                  ))}
                </div>
                {results.riskRecommendations.length > 0 && (
                  <div style={{ 
                    padding: '10px', 
                    background: results.riskColor === '#e74c3c' ? '#f8d7da' : '#fff3cd',
                    borderRadius: '8px',
                    color: results.riskColor === '#e74c3c' ? '#721c24' : '#856404',
                    fontSize: '0.85rem'
                  }}>
                    <strong>Health Considerations:</strong>
                    {results.riskRecommendations.map((rec, index) => (
                      <div key={index} style={{ marginTop: '5px' }}>• {rec}</div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Best Fat Sources:</strong></div>
                <div>• Saturated: Coconut oil, grass-fed butter, eggs</div>
                <div>• Monounsaturated: Avocado, olive oil, nuts</div>
                <div>• Polyunsaturated: Salmon, walnuts, flaxseeds</div>
              </div>
            </div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium omega-3 supplement analysis</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Dietary Fat Intake Analysis: Advanced Lipid Biochemistry & Metabolic Health Optimization Protocol</h3>
          <p style={paragraphStyle}><strong>Dietary fat intake calculation methodologies</strong> represent <strong>essential lipid biochemistry assessment tools</strong> for determining <strong>precise fatty acid requirement profiles, optimal lipid metabolism management, and evidence-based cardiovascular health enhancement strategies</strong>. These advanced calculations integrate <strong>sophisticated metabolic analysis, comprehensive physiological data parameters, and validated nutritional lipid science research models</strong> to provide <strong>individualized lipid optimization approaches</strong> that maximize <strong>hormonal balance effectiveness, cellular function enhancement, and informed dietary fat decision-making processes</strong> across diverse physiological scenarios requiring <strong>precision fatty acid requirement stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Fat Requirement Algorithms - Comprehensive Lipid Biochemistry Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated dietary fat requirement calculation equations</strong> exist for <strong>comprehensive metabolic optimization protocols</strong>, each demonstrating specific <strong>physiological applications and variable lipid response profiles</strong> influencing <strong>dietary intervention decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Essential Fatty Acid Requirement:</strong> Omega-3 (g/day) = Body Weight (kg) × 0.03 (minimum) to 0.05 (optimal)<br/>
            <strong>Saturated Fat Limitation:</strong> Max Saturated = Total Calories × 0.07 ÷ 9 (for cardiac risk reduction)<br/>
            <strong>Monounsaturated Optimization:</strong> MUFA = Total Fat × 0.45 (Mediterranean diet optimal)<br/>
            <strong>Ketogenic Ratio Calculation:</strong> Keto Ratio = (Fat grams × 9) ÷ (Protein grams × 4 + Carb grams × 4)<br/>
            <strong>Cholesterol Production Estimation:</strong> Endogenous Cholesterol = 1000mg + Dietary Cholesterol × 0.3<br/>
            <strong>Clinical Requirement Stratification:</strong> Maintenance (0.8-1.2g/kg), Fat Loss (0.5-0.8g/kg), Muscle Gain (1.0-1.5g/kg), Athletic (0.7-1.0g/kg), Ketogenic (1.5-2.5g/kg), Low Fat (0.3-0.5g/kg)
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Dietary Fat Optimization - Comprehensive Lipid Biochemistry Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>dietary fat intake optimization methodology implementation</strong> serves critical functions across multiple <strong>metabolic biochemistry specialties and cardiovascular health areas</strong> requiring <strong>precise lipid substrate delivery</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Cardiovascular Health Protocol:</strong> Essential for <strong>lipid profile optimization strategies, arterial inflammation reduction, endothelial function enhancement, and atherosclerosis prevention interventions</strong> in cardiac risk populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Balance Management:</strong> Guides <strong>steroid hormone production optimization strategies, endocrine system regulation approaches, and reproductive health maintenance protocols</strong> in hormonal imbalance populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Neurological Function Enhancement:</strong> Determines <strong>brain lipid composition optimization, cognitive performance enhancement, neuroprotection strategies, and mood regulation approaches</strong> for comprehensive brain health</li>
            <li style={{ marginBottom: '10px' }}><strong>Cellular Integrity Maintenance:</strong> Essential for <strong>membrane fluidity optimization, cellular signaling enhancement, organelle function support, and apoptosis regulation interventions</strong> in cellular health maintenance</li>
            <li style={{ marginBottom: '10px' }}><strong>Inflammatory Response Modulation:</strong> Manages <strong>eicosanoid pathway regulation, cytokine production optimization, oxidative stress reduction, and immune system balance requirements</strong> for optimal inflammatory control</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Flexibility Support:</strong> Coordinates <strong>fat oxidation capacity enhancement, ketone production optimization, insulin sensitivity improvement, and energy substrate switching approaches</strong> for metabolic health</li>
            <li><strong>Nutrient Absorption Facilitation:</strong> Facilitates <strong>fat-soluble vitamin uptake optimization, phytochemical bioavailability enhancement, mineral absorption improvement, and nutrient cofactor activation methods</strong> for comprehensive nutritional status</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Factors in Dietary Fat Requirement Determination - Comprehensive Lipid Biochemistry Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and lifestyle factors</strong> influence <strong>dietary fat requirement parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Lipid Metabolism Variations:</strong> ApoE genotype patterns, LDL receptor polymorphisms, cholesterol synthesis genetic variants, and triglyceride metabolism heritability factors significantly affect <strong>dietary fat tolerance thresholds and lipid response profiles</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Status Parameters:</strong> Testosterone and estrogen levels, thyroid function status, cortisol rhythm patterns, and insulin sensitivity profiles dramatically alter <strong>fat utilization efficiency and storage propensity characteristics</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Gastrointestinal Function Variables:</strong> Bile production capacity, pancreatic lipase activity, intestinal absorption efficiency, and microbiome composition patterns create <strong>specific fat digestion and absorption capacity profiles requiring targeted interventions</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Health Status Elements:</strong> Insulin resistance severity, fatty liver presence, metabolic syndrome components, and inflammatory marker levels demonstrate <strong>individualized fat metabolism variations requiring personalized approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Dietary Pattern Interactions:</strong> Carbohydrate intake levels, protein quality sources, fiber consumption amounts, and phytochemical diversity considerations affect <strong>fat digestion efficiency and metabolic utilization pathways</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lifestyle and Environmental Factors:</strong> Physical activity patterns, stress exposure levels, sleep quality duration, and environmental toxin exposures create <strong>fat metabolism modulation patterns requiring adaptive responses</strong></li>
            <li><strong>Age and Developmental Stage Influences:</strong> Childhood growth requirements, adolescent hormonal changes, adult maintenance needs, and elderly nutrient absorption declines significantly impact <strong>fat requirement calculations and quality specifications</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Dietary Fat Requirement Calculations - Advanced Lipid Biochemistry Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>dietary fat requirement calculation methodologies</strong> provide valuable <strong>nutritional planning tools</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive metabolic evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Disorder Contexts:</strong> Familial hypercholesterolemia with LDL receptor defects, lipoprotein lipase deficiency with severe hypertriglyceridemia, and abetalipoproteinemia with fat malabsorption demonstrating <strong>specialized nutritional management needs beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Severe Metabolic Conditions:</strong> Type 1 diabetes with ketoacidosis risk, advanced liver disease with fat processing impairment, and pancreatic insufficiency with digestive enzyme deficiency showing <strong>unique fat metabolism patterns requiring specialized approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Gastrointestinal Disease Scenarios:</strong> Gallbladder removal with bile salt deficiency, celiac disease with fat malabsorption, and inflammatory bowel disease with nutrient loss creating <strong>fat digestion challenges requiring medical management</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Athletic Populations:</strong> Ultra-endurance athletes with caloric density needs, bodybuilders with contest preparation requirements, and weight-class athletes with rapid weight management showing <strong>unique fat requirement patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirements:</strong> Advanced lipid profiling including LDL particle number, lipoprotein(a) measurement, oxidized LDL assessment, and fatty acid composition analysis providing <strong>enhanced precision beyond calculation estimates</strong></li>
            <li><strong>Precision Nutrition Applications:</strong> Genetic testing for fat metabolism variants, continuous ketone monitoring for ketogenic adaptation, metabolomic profiling for individual lipid responses, and microbiome analysis for fat fermentation capacity enabling <strong>enhanced individualized fat prescription</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Dietary Fat Science - Evolution of Lipid Biochemistry Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>dietary fat requirement assessment and optimization methodologies</strong> reflects <strong>centuries of nutritional research advancement</strong> and <strong>scientific practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Lipid Discovery Era:</strong> Recognition of <strong>fats as concentrated energy sources, essential fatty acid identification, and cholesterol structure elucidation</strong> establishing foundational nutritional biochemistry knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Cardiovascular Research Period:</strong> Development of <strong>lipid hypothesis frameworks, cholesterol-heart disease correlation studies, and saturated fat limitation guidelines</strong> revolutionizing cardiovascular nutrition science</li>
            <li style={{ marginBottom: '10px' }}><strong>Fatty Acid Classification Phase:</strong> Introduction of <strong>saturated-unsaturated classification systems, trans fat identification, and omega-3 discovery research</strong> for enhanced nutritional understanding</li>
            <li style={{ marginBottom: '10px' }}><strong>Mediterranean Diet Revolution:</strong> Creation of <strong>monounsaturated fat benefit studies, olive oil research frameworks, and traditional diet pattern analyses</strong> for cardiovascular disease prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Ketogenic Diet Research:</strong> Identification of <strong>therapeutic ketosis mechanisms, neurological application studies, and metabolic advantage investigations</strong> for comprehensive therapeutic understanding</li>
            <li><strong>Precision Lipidomics Integration:</strong> Implementation of <strong>advanced lipid profiling technologies, genetic polymorphism testing, personalized fat response algorithms, and real-time metabolic feedback applications</strong> for scalable metabolic optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Lipid Biochemistry Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>dietary fat intake optimization implementation</strong> in contemporary clinical and wellness practice environments and <strong>evidence-based lipid biochemistry protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Assessment Protocol:</strong> Implement <strong>comprehensive lipid profile evaluation, genetic risk assessment, metabolic health analysis, and dietary preference integration</strong> before fat prescription development</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Calculation Methods:</strong> Utilize <strong>activity-adjusted requirement equations, goal-specific modification factors, metabolic health correction algorithms, and genetic risk compensation formulas</strong> for accurate fat requirement determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Strategic Quality Planning:</strong> Develop <strong>fatty acid ratio optimization strategies, cooking oil selection frameworks, source quality prioritization approaches, and processing minimization protocols</strong> for enhanced metabolic efficiency</li>
            <li style={{ marginBottom: '10px' }}><strong>Timing Optimization Procedures:</strong> Establish <strong>meal distribution consideration systems, hormone synchronization approaches, nutrient absorption enhancement methods, and energy provision timing protocols</strong> for optimal fat utilization</li>
            <li style={{ marginBottom: '10px' }}><strong>Monitoring and Adjustment Systems:</strong> Implement <strong>lipid profile tracking methodologies, inflammatory response assessment tools, tolerance evaluation procedures, and requirement adjustment algorithms</strong> for dynamic nutritional management</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>cardiologist-dietitian communication, endocrinology consultation, gastroenterology collaboration, and genetic counseling integration</strong> for comprehensive metabolic care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Dietary Fat Nutrition - Emerging Lipid Biochemistry Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>dietary fat nutrition research initiatives</strong> continue refining <strong>requirement assessment and optimization approaches</strong> with promising technological developments and <strong>innovative nutritional methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Lipid Monitoring:</strong> Continuous ketone monitoring integration, real-time fatty acid profiling technologies, and dynamic cholesterol synthesis tracking tools for precise lipid status management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized fat requirement prediction models</strong> incorporating genetic data, microbiome profiles, and metabolic biomarkers</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Supplementation Systems:</strong> Individualized fatty acid formulation delivery, targeted lipid nanoparticle technologies, and customized omega-3 to omega-6 ratio modulators for enhanced metabolic optimization</li>
            <li style={{ marginBottom: '10px' }}><strong>Novel Fat Sources:</strong> Algae-based omega-3 production, cultured animal fat alternatives, and precision-fermented lipid formulations for sustainable and optimized fat nutrition</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Nutrition Integration:</strong> Polymorphism-specific fat tolerance algorithms, pharmacogenetic lipid response prediction, and personalized cardiovascular risk management based on <strong>individual genetic profiles</strong></li>
            <li><strong>Integrated Metabolic Platforms:</strong> Development of <strong>comprehensive lipid optimization systems, real-time nutrition feedback applications, and precision cardiovascular wellness delivery models</strong> for optimal fat nutrition outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>dietary fat nutrition methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare and nutrition professionals</strong> across multiple lipid biochemistry disciplines. Comprehensive training curricula should systematically include <strong>lipid metabolism principles, fatty acid biochemistry foundations, cardiovascular risk management strategies, and hormonal balance nutrition techniques</strong>. Continuing professional education programs must consistently address <strong>evolving lipid research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient and client outcomes and evidence-based practice implementation across diverse healthcare, wellness, and sports nutrition delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent lipid biochemistry management practices</strong> across diverse professional settings. These protocols encompass <strong>requirement calculation standardization methodologies, dietary intervention fidelity monitoring, metabolic outcome measurement systems, and clinical guideline implementation requirements</strong> that directly impact <strong>cardiovascular health outcomes and lipid optimization effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse professional delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based lipid biochemistry management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Dietary Fat Intake Optimization</h2>
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

        {/* Health Calculators Section */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Health & Nutrition Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>lipid biochemistry calculation tools and wellness monitoring calculators</strong> for fat optimization and overall health management:</p>
          <div style={calculatorsGridStyle}>
            {healthCalculators.map((calculator, index) => (
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
                <i className="fas fa-calculator"></i> {calculator.name}
              </a>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div style={medicalDisclaimerStyle}>
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical & Nutritional Disclaimer</h4>
          <p style={paragraphStyle}><strong>This fat intake calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical models and nutritional guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Cardiovascular Disease Warning:</strong> Individuals with existing heart disease, high cholesterol, hypertension, or other cardiovascular conditions should consult with a healthcare provider before making significant changes to fat intake. Medication adjustments (especially statins) may be necessary with dietary fat modification.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, cardiologist, or other qualified healthcare provider with any questions regarding fat intake, cholesterol management, or dietary changes. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Gallbladder Considerations:</strong> Individuals without a gallbladder or with gallbladder disease may need specific fat digestion strategies and should consult with a gastroenterologist before increasing fat intake.</p>
          <p style={{ marginBottom: '10px' }}><strong>Individual Variation:</strong> Fat tolerance varies significantly based on genetics, metabolic health, digestive function, and individual response. These calculations provide starting points that should be adjusted based on personal progress, tolerance, and professional guidance.</p>
          <p style={{ marginBottom: '10px' }}><strong>Ketogenic Diet Caution:</strong> High-fat ketogenic diets require medical supervision for individuals with pancreatic insufficiency, liver disease, gallbladder issues, or certain metabolic disorders. Monitor blood lipids regularly when following high-fat diets.</p>
          <p style={{ marginBottom: '10px' }}><strong>Balance and Moderation:</strong> Dietary fats should be part of a balanced diet including adequate protein, complex carbohydrates, fiber, vitamins, and minerals. Do not neglect other essential nutrients while focusing on fat optimization.</p>
          <p><strong>Quality Matters:</strong> The quality and type of fats consumed are as important as the quantity. Prioritize whole food fat sources, minimize processed fats, and avoid artificial trans fats completely.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium omega-3 supplement guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced cholesterol testing kit</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete heart health optimization program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px sticky ad</p>
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
      
      {/* Sticky Footer Ad (Mobile) */}
      {!showSidebar && (
        <div style={stickyFooterAdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#2c3e50' }}>
                <i className="fas fa-mobile-alt"></i> Mobile Health Offer
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Get personalized fat intake coaching - 30% off
              </p>
            </div>
            <button style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '15px'
            }}>
              Learn More
            </button>
          </div>
        </div>
      )}
    </main>
  );
}