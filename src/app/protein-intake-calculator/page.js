"use client";

import { useState, useEffect } from 'react';

export default function ProteinIntakeCalculatorPage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintenance');
  const [bodyFat, setBodyFat] = useState('');
  const [dietType, setDietType] = useState('balanced');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [proteinHistory, setProteinHistory] = useState([]);

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

  const proteinCardStyle = {
    borderTopColor: '#3498db'
  };

  const distributionCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const sourcesCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const timingCardStyle = {
    borderTopColor: '#f39c12'
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
    background: '#e3f2fd',
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

  // Protein calculation guidelines
  const proteinRecommendations = {
    maintenance: { min: 0.8, max: 1.0 },
    muscleGain: { min: 1.6, max: 2.2 },
    fatLoss: { min: 1.6, max: 2.4 },
    athletic: { min: 1.2, max: 1.7 },
    elderly: { min: 1.2, max: 1.5 },
    recovery: { min: 1.5, max: 2.0 }
  };

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.0,
    lightly_active: 1.1,
    moderate: 1.2,
    active: 1.3,
    very_active: 1.4,
    athlete: 1.5
  };

  // Sample data for demo
  useEffect(() => {
    setWeight('75');
    setHeight('175');
    setAge('30');
    setGender('male');
    setActivityLevel('moderate');
    setGoal('muscleGain');
    setBodyFat('18');
    setDietType('balanced');

    // Generate sample protein history
    const historyData = [];
    const goals = ['Maintenance', 'Muscle Gain', 'Fat Loss'];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const proteinGrams = Math.floor(Math.random() * 60) + 120;
      const goalType = goals[Math.floor(Math.random() * goals.length)];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        protein: proteinGrams,
        goal: goalType,
        weight: Math.floor(Math.random() * 15) + 70
      });
    }
    setProteinHistory(historyData);
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

  const calculateProteinIntake = () => {
    // Validate inputs
    if (!weight || !height || !age) {
      alert('Please fill in all required fields.');
      return;
    }

    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const ageVal = parseInt(age);
    const bodyFatVal = bodyFat ? parseFloat(bodyFat) : null;

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

    if (bodyFatVal && (bodyFatVal < 3 || bodyFatVal > 60)) {
      alert('Body fat percentage should be between 3 and 60%.');
      return;
    }

    // Calculate Lean Body Mass (LBM)
    let leanBodyMass = weightVal;
    if (bodyFatVal) {
      leanBodyMass = weightVal * (1 - (bodyFatVal / 100));
    } else {
      // Estimate body fat based on gender and BMI
      const bmi = weightVal / ((heightVal / 100) ** 2);
      if (gender === 'male') {
        if (bmi < 18.5) leanBodyMass = weightVal * 0.95;
        else if (bmi < 25) leanBodyMass = weightVal * 0.85;
        else if (bmi < 30) leanBodyMass = weightVal * 0.75;
        else leanBodyMass = weightVal * 0.65;
      } else {
        if (bmi < 18.5) leanBodyMass = weightVal * 0.90;
        else if (bmi < 25) leanBodyMass = weightVal * 0.80;
        else if (bmi < 30) leanBodyMass = weightVal * 0.70;
        else leanBodyMass = weightVal * 0.60;
      }
    }

    // Calculate BMI
    const bmi = weightVal / ((heightVal / 100) ** 2);

    // Base protein needs
    let proteinPerKgMin = proteinRecommendations[goal].min;
    let proteinPerKgMax = proteinRecommendations[goal].max;

    // Adjust for age
    if (ageVal >= 65) {
      proteinPerKgMin = Math.max(proteinPerKgMin, 1.2);
      proteinPerKgMax = Math.max(proteinPerKgMax, 1.5);
    }

    // Adjust for activity level
    const activityMultiplier = activityMultipliers[activityLevel];
    proteinPerKgMin *= activityMultiplier;
    proteinPerKgMax *= activityMultiplier;

    // Calculate protein range
    const minProtein = Math.round(leanBodyMass * proteinPerKgMin);
    const maxProtein = Math.round(leanBodyMass * proteinPerKgMax);
    const optimalProtein = Math.round((minProtein + maxProtein) / 2);

    // Calculate based on total weight (alternative method)
    const weightBasedMin = Math.round(weightVal * proteinPerKgMin * 0.9);
    const weightBasedMax = Math.round(weightVal * proteinPerKgMax * 0.9);

    // Use the higher of the two calculations
    const finalMinProtein = Math.max(minProtein, weightBasedMin);
    const finalMaxProtein = Math.max(maxProtein, weightBasedMax);
    const finalOptimalProtein = Math.round((finalMinProtein + finalMaxProtein) / 2);

    // Calculate calories from protein
    const caloriesFromProtein = finalOptimalProtein * 4;
    const totalCalories = (() => {
      // Estimate BMR using Mifflin-St Jeor Equation
      let bmr;
      if (gender === 'male') {
        bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal + 5;
      } else {
        bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal - 161;
      }
      
      // Apply activity multiplier
      const activityFactors = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
        athlete: 2.0
      };
      
      return Math.round(bmr * activityFactors[activityLevel]);
    })();

    const proteinPercentage = Math.round((caloriesFromProtein / totalCalories) * 100);

    // Protein distribution throughout the day
    const proteinDistribution = [
      { meal: 'Breakfast', percentage: 25, grams: Math.round(finalOptimalProtein * 0.25) },
      { meal: 'Lunch', percentage: 30, grams: Math.round(finalOptimalProtein * 0.30) },
      { meal: 'Dinner', percentage: 30, grams: Math.round(finalOptimalProtein * 0.30) },
      { meal: 'Snacks', percentage: 15, grams: Math.round(finalOptimalProtein * 0.15) }
    ];

    // Protein source suggestions based on diet type
    const proteinSources = {
      balanced: [
        { name: 'Chicken Breast', serving: '100g', protein: 31, calories: 165 },
        { name: 'Salmon', serving: '100g', protein: 25, calories: 208 },
        { name: 'Greek Yogurt', serving: '170g', protein: 17, calories: 100 },
        { name: 'Lentils', serving: '200g', protein: 18, calories: 230 },
        { name: 'Eggs', serving: '2 large', protein: 13, calories: 143 },
        { name: 'Protein Powder', serving: '1 scoop', protein: 24, calories: 120 }
      ],
      vegetarian: [
        { name: 'Tofu', serving: '150g', protein: 20, calories: 150 },
        { name: 'Tempeh', serving: '100g', protein: 19, calories: 193 },
        { name: 'Chickpeas', serving: '200g', protein: 15, calories: 269 },
        { name: 'Quinoa', serving: '185g', protein: 8, calories: 222 },
        { name: 'Cottage Cheese', serving: '200g', protein: 24, calories: 164 },
        { name: 'Pea Protein', serving: '1 scoop', protein: 21, calories: 100 }
      ],
      vegan: [
        { name: 'Seitan', serving: '100g', protein: 25, calories: 120 },
        { name: 'Edamame', serving: '155g', protein: 17, calories: 188 },
        { name: 'Hemp Seeds', serving: '30g', protein: 10, calories: 166 },
        { name: 'Spirulina', serving: '7g', protein: 4, calories: 20 },
        { name: 'Nutritional Yeast', serving: '16g', protein: 8, calories: 60 },
        { name: 'Vegan Protein', serving: '1 scoop', protein: 20, calories: 110 }
      ],
      highProtein: [
        { name: 'Lean Beef', serving: '100g', protein: 26, calories: 250 },
        { name: 'Tuna', serving: '100g', protein: 30, calories: 184 },
        { name: 'Whey Protein', serving: '1 scoop', protein: 25, calories: 120 },
        { name: 'Cottage Cheese', serving: '200g', protein: 24, calories: 164 },
        { name: 'Turkey Breast', serving: '100g', protein: 29, calories: 135 },
        { name: 'Casein Protein', serving: '1 scoop', protein: 24, calories: 120 }
      ]
    };

    // Timing recommendations
    const timingRecommendations = [
      'Consume 20-40g protein within 2 hours post-workout',
      'Space protein evenly throughout the day (every 3-4 hours)',
      'Include protein in every meal and snack',
      'Pre-sleep protein (casein) aids overnight muscle repair',
      'Fast-digesting protein post-workout, slow-digesting before bed'
    ];

    // Additional recommendations
    const additionalRecommendations = [
      `Aim for ${finalMinProtein}-${finalMaxProtein}g protein daily`,
      `Protein should provide ${proteinPercentage}% of daily calories`,
      'Stay hydrated - drink 3-4L water daily with high protein intake',
      'Combine protein sources for complete amino acid profile',
      'Monitor kidney function with very high protein diets (&gt;2.5g/kg)'
    ];

    // Risk assessment
    let riskLevel = 'Low';
    let riskColor = '#2ecc71';
    let riskRecommendations = [];

    if (finalOptimalProtein > weightVal * 2.5) {
      riskLevel = 'High';
      riskColor = '#e74c3c';
      riskRecommendations.push('Consult healthcare provider before exceeding 2.5g/kg protein');
      riskRecommendations.push('Monitor kidney function regularly');
      riskRecommendations.push('Ensure adequate hydration (4L+ daily)');
    } else if (finalOptimalProtein > weightVal * 2.0) {
      riskLevel = 'Moderate';
      riskColor = '#f39c12';
      riskRecommendations.push('Monitor hydration levels carefully');
      riskRecommendations.push('Consider periodic kidney function tests');
      riskRecommendations.push('Balance with adequate fiber intake');
    }

    // Calculate specific protein targets
    const targets = {
      muscleProteinSynthesis: Math.round(leanBodyMass * 0.4), // Per meal max for MPS
      dailyDistribution: `${Math.round(finalOptimalProtein / 4)}-${Math.round(finalOptimalProtein / 3)}g per meal`,
      postWorkout: `${Math.round(leanBodyMass * 0.25)}-${Math.round(leanBodyMass * 0.4)}g`,
      beforeBed: `${Math.round(leanBodyMass * 0.15)}-${Math.round(leanBodyMass * 0.25)}g slow-digesting protein`
    };

    setResults({
      weight: weightVal,
      height: heightVal,
      age: ageVal,
      gender: gender,
      goal: goal,
      activityLevel: activityLevel,
      leanBodyMass: Math.round(leanBodyMass),
      bmi: bmi.toFixed(1),
      bodyFatPercentage: bodyFatVal,
      minProtein: finalMinProtein,
      maxProtein: finalMaxProtein,
      optimalProtein: finalOptimalProtein,
      proteinPerKgMin: proteinPerKgMin.toFixed(2),
      proteinPerKgMax: proteinPerKgMax.toFixed(2),
      caloriesFromProtein: caloriesFromProtein,
      totalCalories: totalCalories,
      proteinPercentage: proteinPercentage,
      proteinDistribution: proteinDistribution,
      proteinSources: proteinSources[dietType] || proteinSources.balanced,
      timingRecommendations: timingRecommendations,
      additionalRecommendations: additionalRecommendations,
      riskLevel: riskLevel,
      riskColor: riskColor,
      riskRecommendations: riskRecommendations,
      targets: targets,
      dietType: dietType,
      proteinHistory: proteinHistory
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How much protein is too much? What are the risks of excessive protein intake?",
      answer: "Excessive protein risks: 1) Kidney strain: High protein increases glomerular filtration rate, problematic for pre-existing kidney disease. Limit to 2.0g/kg unless medically supervised. 2) Dehydration: Protein metabolism requires more water. Drink 30-40ml/kg body weight daily. 3) Nutrient imbalances: May displace fiber-rich foods, causing constipation. 4) Increased calcium excretion: High animal protein increases urinary calcium loss. 5) Digestive issues: Bloating, discomfort with rapid increases. Safe upper limits: Healthy adults: 2.0-2.5g/kg (short-term), 1.6-2.2g/kg (long-term). Kidney disease: 0.6-0.8g/kg. Liver disease: 1.0-1.5g/kg. Monitoring: Regular kidney function tests (BUN, creatinine) if consuming &gt;2.0g/kg long-term. Hydration and balanced nutrition crucial at high intakes."
    },
    {
      question: "What's the difference between animal and plant protein quality? How do I combine plant proteins?",
      answer: "Protein quality differences: 1) Amino acid profile: Animal proteins are 'complete' (contain all 9 essential amino acids). Most plant proteins are 'incomplete' (low in 1+ essential AAs). 2) Digestibility: Animal proteins 90-99% digestible, plant proteins 70-90%. 3) Leucine content: Critical for muscle protein synthesis. Animal sources higher (whey: 11%, beef: 8%, lentils: 7%). Plant protein combining: Complementary proteins don't need to be eaten same meal, but same day. Key combinations: Grains + legumes (rice + beans), nuts/seeds + legumes (hummus), grains + dairy (cereal + milk). Best plant proteins: Soy (complete), quinoa (complete), hemp seeds, chia seeds. PDCAAS scores: Whey/casein/egg: 1.0, soy: 0.91, pea: 0.89, wheat: 0.42. Vegans may need 10-20% more protein than omnivores."
    },
    {
      question: "How does protein timing affect muscle growth and recovery?",
      answer: "Protein timing strategies: 1) Post-workout 'anabolic window': Consume 20-40g within 2 hours. Fast-digesting (whey) ideal. 2) Even distribution: 4-6 meals with 20-40g protein maximizes muscle protein synthesis vs. skewed distribution. 3) Pre-sleep protein: 30-40g casein (slow-digesting) improves overnight muscle repair, morning protein synthesis. 4) Pre-workout: 20-30g protein 1-2 hours before training may enhance performance and recovery. 5) Breakfast protein: 30g+ reduces hunger, maintains muscle. Research findings: Total daily protein most important (80% of effect), timing accounts for remaining 20%. For athletes: 1.6-2.2g/kg evenly distributed (4+ doses), with emphasis post-workout and pre-sleep. Older adults: More sensitive to protein timing; need even distribution for muscle maintenance."
    },
    {
      question: "Can you build muscle on a vegan/vegetarian diet? How to optimize plant-based protein intake?",
      answer: "YES - Plant-based muscle building possible with planning. Key strategies: 1) Higher total intake: Vegans need 1.6-2.2g/kg (vs 1.6-2.0g/kg omnivores) due to lower digestibility/leucine. 2) Leucine optimization: Target 2.5-3g leucine per meal (soy: 2.5g/100g, pea protein: 1.8g/100g, add leucine supplement if needed). 3) Protein combining: Eat complementary proteins throughout day. 4) Timing: Emphasize post-workout and pre-sleep protein. 5) Supplementation: Consider vegan protein powder (pea/rice/hemp blend), creatine (vegan-friendly), beta-alanine. 6) Calorie sufficiency: Plant foods less calorie-dense; ensure enough total calories for muscle growth. Success factors: Resistance training progressive overload, adequate recovery, consistent protein intake. Monitor: Vitamin B12, iron, zinc, calcium, omega-3s (algae oil)."
    },
    {
      question: "How does age affect protein requirements? Special considerations for older adults?",
      answer: "Age-related changes increase protein needs: 1) Anabolic resistance: Reduced muscle protein synthesis response to protein/leucine. Need 25-30% more protein per meal. 2) Sarcopenia: Age-related muscle loss begins 30-40yo, accelerates after 60. 3) Digestion changes: Reduced stomach acid/protease enzyme production. Recommendations: Adults &lt;65: 1.6-2.2g/kg for muscle building, 1.0-1.2g/kg maintenance. Adults ≥65: 1.2-1.5g/kg maintenance, 1.5-2.0g/kg for muscle gain/recovery. Special considerations: Even distribution crucial (25-35g per meal, 4 meals). Leucine threshold: ≥2.5g per meal (vs 1.8g younger adults). Emphasize high-quality protein (whey, casein, egg). Resistance training essential. Monitor: Kidney function (eGFR), hydration status. Conditions: Chronic kidney disease reduces tolerance (0.6-0.8g/kg), osteoporosis may benefit from higher protein with adequate calcium."
    },
    {
      question: "What are the best protein sources for weight loss versus muscle gain?",
      answer: "Weight loss priorities: 1) High satiety: Protein increases fullness hormones (GLP-1, PYY). Best: Eggs, Greek yogurt, lean meats, legumes. 2) Low calorie density: High protein/calorie ratio. Best: White fish, shrimp, chicken breast, protein powder. 3) Thermic effect: Protein requires 20-30% of its calories for digestion vs 5-10% carbs/fats. 4) Muscle preservation: During calorie deficit, higher protein (1.6-2.4g/kg) prevents muscle loss. Muscle gain priorities: 1) Complete amino acid profile: Whey, casein, egg, meat, soy. 2) High leucine: &gt;2g per serving. Best: Whey (2.5g/25g), beef. 3) Convenience: Protein powders for meeting high targets. 4) Calorie-dense options when needed: Fatty fish, dairy, nuts. Both benefit from: Even distribution, post-workout nutrition, adequate total calories (surplus for gain, deficit for loss). Timing less critical than total daily intake for both goals."
    }
  ];

  const healthCalculators = [
    { name: "Calorie Calculator", link: "/calorie-calculator" },
    { name: "Macro Calculator", link: "/macro-calculator" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Weight Loss Calculator", link: "/weight-loss-calculator" },
    { name: "Muscle Gain Calculator", link: "/muscle-gain-calculator" },
    { name: "Body Fat Calculator", link: "/body-fat-calculator" },
    { name: "Metabolism Calculator", link: "/metabolism-calculator" },
    { name: "Nutrition Planner", link: "/nutrition-planner" },
    { name: "Meal Planning Tool", link: "/meal-planner" },
    { name: "Supplement Calculator", link: "/supplement-calculator" },
    { name: "Hydration Calculator", link: "/hydration-calculator" },
    { name: "Fitness Progress Tracker", link: "/fitness-tracker" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-dumbbell"></i> Protein Intake Calculator - Comprehensive Protein Requirements Analysis & Nutritional Optimization Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise protein intake requirements, personalized distribution strategies, and evidence-based nutritional optimization recommendations</strong> using <strong>advanced algorithmic analysis, comprehensive physiological data integration, and current sports nutrition science</strong>. Essential for <strong>muscle growth optimization, body composition management, and informed nutritional decision-making</strong>.
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
              <option value="muscleGain">Muscle Building / Hypertrophy</option>
              <option value="fatLoss">Fat Loss / Cutting</option>
              <option value="athletic">Athletic Performance</option>
              <option value="recovery">Injury Recovery / Rehab</option>
              <option value="elderly">Healthy Aging (65+ years)</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-percentage"></i> Body Fat % (optional)</label>
            <input
              type="number"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              placeholder="18"
              min="3"
              max="60"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              For more accurate lean mass calculation
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-utensils"></i> Diet Type</label>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              style={selectStyle}
            >
              <option value="balanced">Balanced / Omnivore</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="highProtein">High Protein Focus</option>
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateProteinIntake}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Protein Requirements
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...proteinCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Protein Requirements</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: '#3498db' }}>
                  {results.optimalProtein}g
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px'
                }}>
                  Optimal Daily Protein Intake
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
                  {results.riskLevel} Risk Level | Range: {results.minProtein}-{results.maxProtein}g/day
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Protein/kg:</strong> {results.proteinPerKgMin}-{results.proteinPerKgMax}g/kg body weight</div>
                  <div><strong>Lean Body Mass:</strong> {results.leanBodyMass}kg ({results.bodyFatPercentage ? results.bodyFatPercentage + '% BF' : 'estimated'})</div>
                  <div><strong>Calories from Protein:</strong> {results.caloriesFromProtein} ({results.proteinPercentage}% of {results.totalCalories} total)</div>
                  <div><strong>Goal:</strong> {results.goal.replace(/([A-Z])/g, ' $1')} | Activity: {results.activityLevel.replace(/_/g, ' ')}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Weight: {results.weight}kg | Height: {results.height}cm | Age: {results.age}</div>
                <div>Gender: {results.gender} | BMI: {results.bmi} | Diet: {results.dietType}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...distributionCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-pie"></i> Daily Distribution</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Optimal Protein Distribution:</strong></div>
                  {results.proteinDistribution.map((meal, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: index < results.proteinDistribution.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontSize: '0.9rem' }}>{meal.meal}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#9b59b6' }}>
                        {meal.grams}g
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {meal.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>{results.targets.muscleProteinSynthesis}g</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Max per meal for MPS</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>3-4h</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Ideal spacing</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f39c12' }}>4-6</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Daily meals</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Key Principles:</strong></div>
                <div>• Muscle Protein Synthesis maximized with 20-40g per meal</div>
                <div>• Even distribution enhances utilization</div>
                <div>• Post-workout and pre-sleep timing critical</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...sourcesCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-utensils"></i> Protein Sources</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#666' }}>
                  <strong>Recommended for {results.dietType} diet:</strong>
                </div>
                {results.proteinSources.slice(0, 5).map((source, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: '4px solid #2ecc71'
                  }}>
                    <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '0.9rem' }}>
                      {source.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                      {source.serving}: {source.protein}g protein, {source.calories} calories
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Sample Daily Plan ({results.optimalProtein}g):</strong></div>
                <div>• Breakfast: Greek yogurt + whey (30g)</div>
                <div>• Lunch: Chicken breast + quinoa (40g)</div>
                <div>• Dinner: Salmon + vegetables (35g)</div>
                <div>• Snacks: Protein shake + nuts (25g)</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...timingCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clock"></i> Timing & Recommendations</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Critical Timing Strategies:</strong></div>
                  {results.timingRecommendations.map((rec, index) => (
                    <div key={index} style={{
                      padding: '5px 0',
                      borderBottom: index < results.timingRecommendations.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontSize: '0.85rem' }}>• {rec}</span>
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
                    <strong>Risk Management:</strong>
                    {results.riskRecommendations.map((rec, index) => (
                      <div key={index} style={{ marginTop: '5px' }}>• {rec}</div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Additional Recommendations:</strong></div>
                {results.additionalRecommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>• {rec}</div>
                ))}
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium protein supplement bundle</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Protein Intake Analysis: Advanced Nutritional Biochemistry & Metabolic Optimization Protocol</h3>
          <p style={paragraphStyle}><strong>Protein intake calculation methodologies</strong> represent <strong>essential nutritional biochemistry assessment tools</strong> for determining <strong>precise amino acid requirements, optimal anabolic response timing, and evidence-based muscle protein synthesis optimization strategies</strong>. These advanced calculations integrate <strong>sophisticated metabolic analysis, comprehensive physiological data parameters, and validated sports nutrition research models</strong> to provide <strong>individualized nutritional optimization approaches</strong> that maximize <strong>muscle hypertrophy effectiveness, metabolic health enhancement, and informed dietary decision-making processes</strong> across diverse physiological scenarios requiring <strong>precision protein requirement stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Protein Requirement Algorithms - Comprehensive Nutritional Biochemistry Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated protein requirement calculation equations</strong> exist for <strong>comprehensive nutritional optimization protocols</strong>, each demonstrating specific <strong>physiological applications and variable metabolic response profiles</strong> influencing <strong>dietary intervention decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Lean Body Mass Protocol:</strong> Protein (g/day) = LBM (kg) × Activity Factor × Goal Factor<br/>
            <strong>Muscle Protein Synthesis Optimization:</strong> MPS Max = 0.4 × LBM per meal, requires 2.5g+ leucine<br/>
            <strong>Nitrogen Balance Calculation:</strong> N Balance = (Protein Intake / 6.25) - (UUN + 4)<br/>
            <strong>Protein Digestibility Correction:</strong> PDCAAS-Adjusted = Intake × Digestibility × Amino Acid Score<br/>
            <strong>Anabolic Response Formula:</strong> Response = Leucine Content × Timing Factor × Insulin Response<br/>
            <strong>Clinical Requirement Stratification:</strong> Maintenance (0.8-1.0g/kg), Hypertrophy (1.6-2.2g/kg), Fat Loss (1.6-2.4g/kg), Elderly (1.2-1.5g/kg)
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Protein Intake Optimization - Comprehensive Nutritional Biochemistry Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>protein intake optimization methodology implementation</strong> serves critical functions across multiple <strong>nutritional biochemistry specialties and metabolic health areas</strong> requiring <strong>precise amino acid delivery</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Sports Nutrition Protocol:</strong> Essential for <strong>muscle hypertrophy maximization, athletic performance enhancement, and recovery acceleration optimization</strong> in competitive and recreational athletes</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Nutrition Management:</strong> Guides <strong>sarcopenia prevention strategies, wound healing acceleration protocols, and immune function optimization approaches</strong> in hospitalized and outpatient populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Health Optimization:</strong> Determines <strong>weight management effectiveness enhancement, insulin sensitivity improvement, and metabolic rate elevation strategies</strong> for metabolic syndrome management</li>
            <li style={{ marginBottom: '10px' }}><strong>Geriatric Nutrition Support:</strong> Essential for <strong>age-related muscle loss mitigation, functional capacity preservation, and frailty prevention interventions</strong> in aging populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Bariatric Surgery Nutrition:</strong> Manages <strong>post-surgical protein sufficiency maintenance, lean mass preservation optimization, and metabolic adaptation support requirements</strong> following weight loss surgery</li>
            <li style={{ marginBottom: '10px' }}><strong>Renal Disease Nutrition:</strong> Coordinates <strong>protein restriction protocols, nitrogen waste minimization strategies, and nutritional status preservation approaches</strong> in chronic kidney disease management</li>
            <li><strong>Vegetarian/Vegan Nutrition Planning:</strong> Facilitates <strong>plant-based protein sufficiency achievement, amino acid complementation implementation, and nutritional adequacy verification methods</strong> for ethical and religious dietary patterns</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Factors in Protein Requirement Determination - Comprehensive Nutritional Biochemistry Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and lifestyle factors</strong> influence <strong>protein requirement parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Body Composition Variables:</strong> Lean body mass percentage, fat-free mass distribution, muscle fiber type composition, and metabolic tissue proportions significantly affect <strong>amino acid utilization efficiency and nitrogen retention capacity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Training Status Impacts:</strong> Resistance training volume and intensity, endurance exercise duration and frequency, training adaptation phase, and recovery status dramatically alter <strong>muscle protein turnover rates and anabolic signaling sensitivity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Status Elements:</strong> Energy balance status (deficit, maintenance, surplus), carbohydrate availability levels, micronutrient sufficiency patterns, and hydration status create <strong>specific protein utilization efficiency profiles requiring targeted interventions</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Regulation Factors:</strong> Insulin sensitivity status, growth hormone pulsatility patterns, IGF-1 circulating levels, testosterone/cortisol balance, and thyroid function demonstrate <strong>integrated protein metabolism regulation patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Changes:</strong> Anabolic resistance development, muscle protein synthesis blunting, digestive efficiency reduction, and hormonal profile alterations affect <strong>protein requirement elevation needs and timing sensitivity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic and Ethnic Variations:</strong> Amino acid transporter polymorphisms, muscle protein synthesis genetic predispositions, metabolic rate heritability factors, and ethnic dietary adaptation patterns create <strong>individualized protein response variations requiring personalized approaches</strong></li>
            <li><strong>Health Status Considerations:</strong> Inflammatory condition presence, renal function capacity, liver metabolic capability, gastrointestinal absorption efficiency, and medication interactions significantly impact <strong>protein tolerance thresholds and utilization pathways</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Protein Requirement Calculations - Advanced Nutritional Biochemistry Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>protein requirement calculation methodologies</strong> provide valuable <strong>nutritional planning tools</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive metabolic evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Physiological States:</strong> Critical illness with hypermetabolism, major trauma with protein catabolism, severe burns with massive nitrogen losses, and cachexia with anorexia require <strong>specialized nutritional support beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Renal Impairment Contexts:</strong> Chronic kidney disease stages 3-5, acute kidney injury, nephrotic syndrome, and dialysis dependence demonstrating <strong>protein tolerance limitations requiring medical nutrition therapy</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hepatic Dysfunction Scenarios:</strong> Liver cirrhosis with protein intolerance, hepatic encephalopathy risk, and acute liver failure showing <strong>amino acid metabolism alterations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Disorder Considerations:</strong> Phenylketonuria with phenylalanine restriction, maple syrup urine disease with branched-chain amino acid limitations, and homocystinuria with methionine control requiring <strong>specific amino acid management</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Athletic Populations:</strong> Elite endurance athletes with extreme training volumes, professional bodybuilders in contest preparation, and strength athletes during peaking phases demonstrating <strong>unique protein metabolism patterns</strong></li>
            <li><strong>Precision Nutrition Applications:</strong> Genetic testing for protein metabolism variants, metabolic typing for optimal macronutrient ratios, and biomarker monitoring for protein status assessment for <strong>enhanced individualized protein prescription</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Protein Nutrition Science - Evolution of Nutritional Biochemistry Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>protein requirement assessment and optimization methodologies</strong> reflects <strong>centuries of nutritional research advancement</strong> and <strong>scientific practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Protein Discovery Era:</strong> Recognition of <strong>protein as essential nutrient, nitrogen balance concept development, and amino acid identification</strong> establishing foundational nutritional biochemistry knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Nitrogen Balance Studies Period:</strong> Development of <strong>protein requirement estimation methods, essential amino acid determination, and protein quality assessment systems</strong> revolutionizing nutritional science</li>
            <li style={{ marginBottom: '10px' }}><strong>Amino Acid Metabolism Phase:</strong> Introduction of <strong>stable isotope tracer techniques, protein turnover measurement methods, and muscle protein synthesis quantification approaches</strong> for advanced metabolic understanding</li>
            <li style={{ marginBottom: '10px' }}><strong>Sports Nutrition Revolution:</strong> Creation of <strong>anabolic response timing concepts, leucine threshold theories, and muscle protein synthesis optimization strategies</strong> demonstrating athletic performance enhancement</li>
            <li style={{ marginBottom: '10px' }}><strong>Molecular Nutrition Advancements:</strong> Identification of <strong>mTOR signaling pathways, amino acid sensing mechanisms, and genetic polymorphisms affecting protein metabolism</strong> for precision nutrition applications</li>
            <li><strong>Digital Health Integration:</strong> Implementation of <strong>nutrition tracking applications, wearable metabolic monitors, artificial intelligence dietary algorithms, and personalized meal planning systems</strong> for scalable nutritional optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Nutritional Biochemistry Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>protein intake optimization implementation</strong> in contemporary clinical and athletic practice environments and <strong>evidence-based nutritional biochemistry protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Assessment Protocol:</strong> Implement <strong>comprehensive body composition analysis, activity pattern evaluation, health status consideration, and dietary preference integration</strong> before protein prescription development</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Calculation Methods:</strong> Utilize <strong>lean body mass-based algorithms, activity-adjusted requirement equations, goal-specific modification factors, and digestibility-corrected intake targets</strong> for accurate protein requirement determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Strategic Distribution Planning:</strong> Develop <strong>meal frequency optimization strategies, protein portion sizing guidelines, timing-sensitive distribution approaches, and source variety implementation plans</strong> for enhanced anabolic response</li>
            <li style={{ marginBottom: '10px' }}><strong>Quality Optimization Procedures:</strong> Establish <strong>protein source selection criteria, amino acid profile evaluation methods, digestibility assessment protocols, and bioavailability enhancement techniques</strong> for optimal protein utilization</li>
            <li style={{ marginBottom: '10px' }}><strong>Monitoring and Adjustment Systems:</strong> Implement <strong>progress tracking methodologies, metabolic response assessment tools, tolerance evaluation procedures, and requirement adjustment algorithms</strong> for dynamic nutritional management</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>nutritionist-athlete communication, medical provider consultation, exercise specialist collaboration, and behavioral psychology integration</strong> for comprehensive nutritional care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Protein Nutrition - Emerging Nutritional Biochemistry Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>protein nutrition research initiatives</strong> continue refining <strong>requirement assessment and optimization approaches</strong> with promising technological developments and <strong>innovative nutritional methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Metabolic Monitoring:</strong> Continuous amino acid level tracking, real-time muscle protein synthesis measurement, and dynamic nitrogen balance assessment tools for precise protein status management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized protein requirement prediction models</strong> incorporating genetic data, metabolic biomarkers, and lifestyle patterns</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Supplementation Systems:</strong> Individualized amino acid formulation delivery, timed-release protein technologies, and targeted anabolic compound combinations for enhanced muscle protein synthesis optimization</li>
            <li style={{ marginBottom: '10px' }}><strong>Novel Protein Sources:</strong> Cultured meat production technologies, insect-based protein formulations, algae-derived complete proteins, and precision-fermented amino acids for sustainable high-quality protein provision</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Nutrition Integration:</strong> Polymorphism-specific protein requirement algorithms, pharmacogenetic nutrition response prediction, and personalized amino acid supplementation based on <strong>individual genetic profiles</strong></li>
            <li><strong>Integrated Health Platforms:</strong> Development of <strong>comprehensive nutritional optimization systems, metabolic health management approaches, and precision wellness delivery models</strong> for optimal protein nutrition outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>protein nutrition methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare and sports professionals</strong> across multiple nutritional biochemistry disciplines. Comprehensive training curricula should systematically include <strong>amino acid metabolism principles, protein requirement calculation methods, anabolic response optimization strategies, and dietary counseling techniques</strong>. Continuing professional education programs must consistently address <strong>evolving nutritional research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient and athlete outcomes and evidence-based practice implementation across diverse healthcare, sports, and wellness delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent nutritional biochemistry management practices</strong> across diverse professional settings. These protocols encompass <strong>requirement calculation standardization methodologies, dietary intervention fidelity monitoring, outcome measurement systems, and clinical guideline implementation requirements</strong> that directly impact <strong>nutritional status outcomes and protein optimization effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse professional delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based nutritional biochemistry management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Protein Intake Optimization</h2>
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
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>nutritional biochemistry calculation tools and wellness monitoring calculators</strong> for protein optimization and overall health management:</p>
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
          <p style={paragraphStyle}><strong>This protein intake calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical models and nutritional guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Medical Conditions Warning:</strong> Individuals with pre-existing kidney disease, liver disease, metabolic disorders (PKU, MSUD), or gout should consult with a healthcare provider before increasing protein intake. High protein diets may exacerbate these conditions and require medical supervision.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, sports nutritionist, or other qualified healthcare provider with any questions regarding protein intake, nutritional planning, or dietary changes. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Kidney Function Considerations:</strong> While high protein intake is generally safe for healthy individuals, those with impaired kidney function should limit protein to 0.6-0.8g/kg body weight as recommended by a healthcare provider. Regular monitoring of kidney function (BUN, creatinine, eGFR) is advisable with high protein diets.</p>
          <p style={paragraphStyle}><strong>Hydration Requirements:</strong> High protein diets increase water requirements. Aim for 30-40ml per kg body weight daily, and more during exercise or in hot environments. Dehydration can increase kidney strain with high protein intake.</p>
          <p style={paragraphStyle}><strong>Balanced Nutrition:</strong> Protein should be part of a balanced diet including adequate carbohydrates, healthy fats, fiber, vitamins, and minerals. Do not neglect other essential nutrients while focusing on protein intake.</p>
          <p style={paragraphStyle}><strong>Individual Variation:</strong> Protein requirements vary significantly based on genetics, metabolism, health status, and individual response. Use these calculations as starting points and adjust based on personal progress, tolerance, and professional guidance.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium protein supplement line</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Muscle building nutrition guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete protein optimization program</p>
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
                <i className="fas fa-mobile-alt"></i> Mobile Nutrition Offer
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Get 25% off on premium protein supplements
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
              Shop Now
            </button>
          </div>
        </div>
      )}
    </main>
  );
}