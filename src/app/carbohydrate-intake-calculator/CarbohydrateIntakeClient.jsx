"use client";

import { useState, useEffect } from 'react';

export default function CarbohydrateIntakeCalculatorPage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintenance');
  const [exerciseType, setExerciseType] = useState('mixed');
  const [exerciseDuration, setExerciseDuration] = useState('60');
  const [exerciseFrequency, setExerciseFrequency] = useState('3');
  const [metabolicHealth, setMetabolicHealth] = useState('healthy');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [carbHistory, setCarbHistory] = useState([]);

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
    background: '#f39c12',
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
    background: '#e67e22',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(243, 156, 18, 0.2)'
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

  const carbCardStyle = {
    borderTopColor: '#f39c12'
  };

  const distributionCardStyle = {
    borderTopColor: '#3498db'
  };

  const timingCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const glycemicCardStyle = {
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
    borderLeft: '4px solid #f39c12',
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
    background: '#fff9e6',
    border: '2px solid #f39c12',
    boxShadow: '0 4px 12px rgba(243, 156, 18, 0.15)',
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
    borderTop: '2px solid #f39c12',
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
    background: '#f39c12',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(243, 156, 18, 0.2)',
    borderColor: '#f39c12'
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

  // Carbohydrate calculation guidelines
  const carbRecommendations = {
    maintenance: { min: 3.0, max: 5.0 },
    fatLoss: { min: 1.0, max: 2.5 },
    muscleGain: { min: 4.0, max: 7.0 },
    athletic: { min: 5.0, max: 8.0 },
    ketogenic: { min: 0.2, max: 0.5 },
    lowCarb: { min: 0.5, max: 1.5 }
  };

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 0.8,
    lightly_active: 1.0,
    moderate: 1.2,
    active: 1.4,
    very_active: 1.6,
    athlete: 1.8
  };

  // Exercise type multipliers
  const exerciseTypeMultipliers = {
    endurance: 1.5,
    strength: 1.2,
    hiit: 1.4,
    mixed: 1.3,
    none: 1.0
  };

  // Sample data for demo
  useEffect(() => {
    setWeight('75');
    setHeight('175');
    setAge('30');
    setGender('male');
    setActivityLevel('moderate');
    setGoal('maintenance');
    setExerciseType('mixed');
    setExerciseDuration('60');
    setExerciseFrequency('3');
    setMetabolicHealth('healthy');

    // Generate sample carb history
    const historyData = [];
    const goals = ['Maintenance', 'Fat Loss', 'Muscle Gain'];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const carbGrams = Math.floor(Math.random() * 200) + 200;
      const goalType = goals[Math.floor(Math.random() * goals.length)];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        carbs: carbGrams,
        goal: goalType,
        weight: Math.floor(Math.random() * 15) + 70
      });
    }
    setCarbHistory(historyData);
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

  const calculateCarbIntake = () => {
    // Validate inputs
    if (!weight || !height || !age) {
      alert('Please fill in all required fields.');
      return;
    }

    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const ageVal = parseInt(age);
    const exerciseDurationVal = parseInt(exerciseDuration);
    const exerciseFrequencyVal = parseInt(exerciseFrequency);

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

    if (exerciseDurationVal < 0 || exerciseDurationVal > 300) {
      alert('Exercise duration should be between 0 and 300 minutes.');
      return;
    }

    if (exerciseFrequencyVal < 0 || exerciseFrequencyVal > 7) {
      alert('Exercise frequency should be between 0 and 7 days per week.');
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

    // Adjust for exercise volume
    const weeklyExerciseMinutes = exerciseDurationVal * exerciseFrequencyVal;
    const exerciseCalories = weeklyExerciseMinutes * 7; // Approx 7 calories per minute
    tdee += (exerciseCalories / 7); // Add daily average

    // Calculate BMI
    const bmi = weightVal / ((heightVal / 100) ** 2);

    // Base carb needs
    let carbPerKgMin = carbRecommendations[goal].min;
    let carbPerKgMax = carbRecommendations[goal].max;

    // Adjust for activity level
    const activityMultiplier = activityMultipliers[activityLevel];
    carbPerKgMin *= activityMultiplier;
    carbPerKgMax *= activityMultiplier;

    // Adjust for exercise type
    const exerciseMultiplier = exerciseTypeMultipliers[exerciseType];
    carbPerKgMin *= exerciseMultiplier;
    carbPerKgMax *= exerciseMultiplier;

    // Adjust for metabolic health
    if (metabolicHealth === 'prediabetic' || metabolicHealth === 'insulinResistant') {
      carbPerKgMin *= 0.7;
      carbPerKgMax *= 0.8;
    } else if (metabolicHealth === 'diabetic') {
      carbPerKgMin *= 0.5;
      carbPerKgMax *= 0.7;
    }

    // Calculate carbohydrate range
    const minCarbs = Math.round(weightVal * carbPerKgMin);
    const maxCarbs = Math.round(weightVal * carbPerKgMax);
    const optimalCarbs = Math.round((minCarbs + maxCarbs) / 2);

    // Calculate percentage of total calories
    const carbCalories = optimalCarbs * 4; // 4 calories per gram
    const carbPercentage = Math.round((carbCalories / tdee) * 100);

    // Calculate other macronutrients
    const proteinGrams = Math.round(weightVal * 1.6); // Standard protein recommendation
    const proteinCalories = proteinGrams * 4;
    const fatCalories = tdee - (carbCalories + proteinCalories);
    const fatGrams = Math.round(fatCalories / 9);

    // Calculate glycemic load
    const glycemicLoad = Math.round((optimalCarbs * 0.6) / 10); // Assuming 60% medium GI carbs

    // Carbohydrate distribution throughout the day
    const carbDistribution = [
      { meal: 'Breakfast', percentage: 25, grams: Math.round(optimalCarbs * 0.25), timing: 'Pre-activity fuel' },
      { meal: 'Lunch', percentage: 30, grams: Math.round(optimalCarbs * 0.30), timing: 'Sustained energy' },
      { meal: 'Dinner', percentage: 25, grams: Math.round(optimalCarbs * 0.25), timing: 'Recovery support' },
      { meal: 'Snacks', percentage: 10, grams: Math.round(optimalCarbs * 0.10), timing: 'Energy maintenance' },
      { meal: 'Pre/Post Workout', percentage: 10, grams: Math.round(optimalCarbs * 0.10), timing: 'Performance & recovery' }
    ];

    // Carbohydrate source suggestions
    const carbSources = {
      complex: [
        { name: 'Sweet Potato', serving: '200g', carbs: 40, fiber: 6, gi: 'Low' },
        { name: 'Brown Rice', serving: '150g cooked', carbs: 45, fiber: 3, gi: 'Medium' },
        { name: 'Oats', serving: '80g dry', carbs: 50, fiber: 8, gi: 'Low' },
        { name: 'Quinoa', serving: '185g cooked', carbs: 39, fiber: 5, gi: 'Low' },
        { name: 'Whole Wheat Bread', serving: '2 slices', carbs: 30, fiber: 4, gi: 'Medium' },
        { name: 'Lentils', serving: '200g cooked', carbs: 40, fiber: 15, gi: 'Low' }
      ],
      simple: [
        { name: 'Banana', serving: '1 medium', carbs: 27, fiber: 3, gi: 'Medium' },
        { name: 'White Rice', serving: '150g cooked', carbs: 45, fiber: 1, gi: 'High' },
        { name: 'Dates', serving: '60g', carbs: 40, fiber: 4, gi: 'High' },
        { name: 'Sports Drink', serving: '500ml', carbs: 30, fiber: 0, gi: 'High' },
        { name: 'Honey', serving: '30g', carbs: 25, fiber: 0, gi: 'High' },
        { name: 'White Bread', serving: '2 slices', carbs: 30, fiber: 2, gi: 'High' }
      ]
    };

    // Timing recommendations
    const timingRecommendations = [
      'Consume 30-60g fast-acting carbs within 30 minutes post-workout',
      'Space complex carbs evenly throughout the day',
      'Limit simple carbs to pre/post workout windows',
      'Include fiber-rich carbs with every meal',
      'Avoid high glycemic carbs 2-3 hours before bed'
    ];

    // Glycemic management strategies
    const glycemicStrategies = [
      'Combine carbs with protein and healthy fats',
      'Choose whole grain over refined options',
      'Include vinegar or lemon juice with carb meals',
      'Cook and cool starches to increase resistant starch',
      'Eat carbs earlier in the day when insulin sensitivity is higher'
    ];

    // Additional recommendations
    const additionalRecommendations = [
      `Aim for ${minCarbs}-${maxCarbs}g carbohydrates daily`,
      `Carbs should provide ${carbPercentage}% of daily calories`,
      `Target 25-35g fiber daily from carb sources`,
      'Adjust based on energy levels and performance',
      'Cycle carb intake based on activity levels'
    ];

    // Risk assessment
    let riskLevel = 'Low';
    let riskColor = '#2ecc71';
    let riskRecommendations = [];

    if (goal === 'ketogenic' && carbPercentage > 10) {
      riskLevel = 'Moderate';
      riskColor = '#f39c12';
      riskRecommendations.push('For ketosis, reduce carbs to 20-50g daily');
      riskRecommendations.push('Monitor ketone levels if aiming for ketosis');
      riskRecommendations.push('Ensure adequate electrolyte intake');
    } else if (metabolicHealth === 'diabetic' && carbPercentage > 40) {
      riskLevel = 'High';
      riskColor = '#e74c3c';
      riskRecommendations.push('Consult with healthcare provider for diabetes-specific carb targets');
      riskRecommendations.push('Monitor blood glucose levels carefully');
      riskRecommendations.push('Consider lower carb approach (20-40% of calories)');
    }

    // Calculate specific carb targets
    const targets = {
      preWorkout: `${Math.round(weightVal * 0.5)}-${Math.round(weightVal * 1.0)}g 1-3 hours before`,
      postWorkout: `${Math.round(weightVal * 0.8)}-${Math.round(weightVal * 1.2)}g within 2 hours after`,
      dailyFiber: `${Math.round(weightVal * 0.35)}-${Math.round(weightVal * 0.5)}g`,
      glycemicLoad: `${glycemicLoad} per meal (target <10 for low GL)`
    };

    setResults({
      weight: weightVal,
      height: heightVal,
      age: ageVal,
      gender: gender,
      goal: goal,
      activityLevel: activityLevel,
      exerciseType: exerciseType,
      exerciseDuration: exerciseDurationVal,
      exerciseFrequency: exerciseFrequencyVal,
      metabolicHealth: metabolicHealth,
      bmi: bmi.toFixed(1),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      minCarbs: minCarbs,
      maxCarbs: maxCarbs,
      optimalCarbs: optimalCarbs,
      carbPerKgMin: carbPerKgMin.toFixed(2),
      carbPerKgMax: carbPerKgMax.toFixed(2),
      carbCalories: carbCalories,
      carbPercentage: carbPercentage,
      proteinGrams: proteinGrams,
      fatGrams: fatGrams,
      carbDistribution: carbDistribution,
      carbSources: carbSources,
      timingRecommendations: timingRecommendations,
      glycemicStrategies: glycemicStrategies,
      additionalRecommendations: additionalRecommendations,
      riskLevel: riskLevel,
      riskColor: riskColor,
      riskRecommendations: riskRecommendations,
      targets: targets,
      glycemicLoad: glycemicLoad,
      carbHistory: carbHistory
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between net carbs and total carbs? Which should I track?",
      answer: "Total carbs include all carbohydrates: sugars, starches, and fiber. Net carbs = Total carbs - Fiber - Sugar alcohols (some subtract only half of sugar alcohols). Tracking depends on goals: Ketosis/low-carb: Track net carbs (20-50g/day for ketosis). Diabetes management: Many experts recommend tracking total carbs for insulin dosing accuracy. Weight loss: Either works, but net carbs may be more practical for high-fiber diets. Athletic performance: Total carbs matter for glycogen replenishment. Fiber benefits: Counts toward total carbs but doesn't impact blood sugar significantly. Sugar alcohols: Vary in digestion (erythritol: 0g net, maltitol: ~50%). Best practice: Start with total carbs for simplicity, switch to net if following specific low-carb protocols. Always prioritize fiber-rich carbs regardless of counting method."
    },
    {
      question: "How do carbohydrates affect insulin resistance and what's the optimal carb intake for metabolic health?",
      answer: "Carbohydrate impact on insulin resistance: High glycemic load diets increase insulin demand, potentially leading to resistance over time. Optimal carb intake varies: Healthy individuals: 45-65% of calories (ADA recommendation). Prediabetes/insulin resistance: 30-40% of calories, emphasizing low glycemic index carbs. Type 2 diabetes: 20-40% of calories, individualized based on medication and glycemic control. Key factors: 1) Carb quality over quantity (whole foods vs refined), 2) Timing (earlier in day when insulin sensitivity higher), 3) Pairing (with protein/fat/fiber slows absorption), 4) Activity level (exercise improves insulin sensitivity). Monitoring: HbA1c, fasting glucose, postprandial glucose. Approaches: Mediterranean diet (moderate carbs, high fiber), Low-carb diets (effective for diabetes reversal in some), Carb cycling (higher on active days). Individual experimentation with CGM recommended."
    },
    {
      question: "What are the best carbohydrate sources for endurance athletes versus strength athletes?",
      answer: "Endurance athletes (running, cycling, swimming): Need 6-10g/kg/day during heavy training. Emphasis on: 1) High glycemic carbs during events (gels, sports drinks, dates), 2) Moderate-high GI carbs post-training (white rice, potatoes), 3) Complex carbs for daily meals (oats, sweet potatoes, whole grains), 4) Carb loading: 10-12g/kg 1-3 days before event. Timing: 1-4g/kg 1-4 hours pre-event, 30-60g/hour during, 1-1.2g/kg/hour for 4 hours post. Strength athletes (weightlifting, bodybuilding): Need 4-7g/kg/day. Emphasis on: 1) Moderate-low GI carbs for sustained energy (brown rice, quinoa, oats), 2) Fast-acting post-workout (dextrose, white rice), 3) Fiber management (avoid pre-workout bloating). Timing: 30-60g pre-workout (1-2 hours before), 30-90g post-workout (within 2 hours). Both benefit from: Carb cycling (higher on training days), Individual tolerance testing, Periodization (adjusting with training phases)."
    },
    {
      question: "Can you do low-carb or keto as an athlete? How to optimize performance on low carbohydrates?",
      answer: "Low-carb/keto athletic adaptation: Possible but requires careful planning. Fat adaptation takes 2-6 weeks with performance decline initially. Sports where keto may work: Ultra-endurance (body learns to burn fat efficiently), Weight-class sports (weight management). Sports where carbs crucial: High-intensity (sprinting, team sports), Explosive strength (weightlifting). Optimization strategies: 1) Strategic carb timing: Targeted keto (carbs around workouts only), Cyclical keto (carb refeeds 1-2 days/week). 2) Electrolyte management: Sodium 5-7g/day, potassium 3.5-4.7g/day, magnesium 400-600mg/day. 3) Performance expectations: Accept 5-10% performance decrease initially, may recover fully after adaptation. 4) Supplementation: MCT oil, exogenous ketones, creatine. 5) Monitoring: Blood ketones (0.5-3.0 mM optimal), subjective energy. Research: Some studies show maintained endurance performance on keto, but reduced high-intensity performance. Individual response varies greatly - self-experimentation essential."
    },
    {
      question: "What's carb cycling and how do I implement it effectively for fat loss or muscle gain?",
      answer: "Carb cycling: Alternating high, moderate, and low carb days based on activity. Benefits: May enhance fat loss while preserving muscle, improve insulin sensitivity, provide psychological flexibility. Implementation for fat loss: Low carb days (1-1.5g/kg): Rest days, light activity. Moderate carb days (2-3g/kg): Light training days. High carb days (3-5g/kg): Heavy training days. Implementation for muscle gain: Low carb days (2-3g/kg): Rest days. Moderate carb days (3-4g/kg): Light training. High carb days (5-7g/kg): Heavy training, post-workout. Sample weekly schedule: Mon/Wed/Fri (high - strength training), Tue/Thu (moderate - cardio), Sat/Sun (low - rest). Nutrient timing: Carbs concentrated around workouts on high days. Protein: Consistent daily (1.6-2.2g/kg). Fats: Higher on low carb days, lower on high carb days. Monitoring: Adjust based on energy, performance, and progress. Not necessary for beginners - start with consistent intake first."
    },
    {
      question: "How does fiber intake affect carbohydrate metabolism and what's the optimal daily fiber target?",
      answer: "Fiber's metabolic effects: 1) Slows carbohydrate digestion/absorption, reducing glycemic response, 2) Increases satiety, aiding weight management, 3) Feeds beneficial gut bacteria, producing short-chain fatty acids (anti-inflammatory), 4) Improves insulin sensitivity long-term. Optimal fiber intake: General: 25-38g/day (14g/1000 calories). Specific: Men <50: 38g, &gt;50: 30g. Women <50: 25g, &gt;50: 21g. Athletes: 30-50g/day, adjusted for gastrointestinal tolerance. Sources: Soluble fiber (oats, beans, apples) - slows digestion, lowers cholesterol. Insoluble fiber (whole grains, vegetables) - adds bulk, prevents constipation. Resistant starch (cooked & cooled potatoes/rice) - acts like fiber. Implementation: Increase gradually (+5g/week) to avoid bloating. Distribute throughout day. Drink plenty of water (fiber needs water to work). Special populations: IBS sufferers may need low-FODMAP fiber sources. Excessive fiber (&gt;70g/day) can interfere with mineral absorption."
    }
  ];

  const healthCalculators = [
    { name: "Protein Intake Calculator", link: "/protein-intake-calculator" },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator" },
    { name: "Macro Calculator", link: "/macro-calculator" },
    { name: "Calorie Calculator", link: "/calorie-calculator" },
    { name: "Glycemic Load Calculator", link: "/glycemic-load-calculator" },
    { name: "Insulin Index Calculator", link: "/insulin-index-calculator" },
    { name: "Metabolism Calculator", link: "/metabolism-calculator" },
    { name: "Exercise Calorie Burn", link: "/exercise-calorie-burn" },
    { name: "Carb Cycling Planner", link: "/carb-cycling-planner" },
    { name: "Meal Timing Calculator", link: "/meal-timing-calculator" },
    { name: "Fiber Intake Calculator", link: "/fiber-intake-calculator" },
    { name: "Sports Nutrition Planner", link: "/sports-nutrition-planner" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-bread-slice"></i> Carbohydrate Intake Calculator - Comprehensive Carb Requirement Analysis & Metabolic Optimization Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise carbohydrate intake requirements, personalized timing strategies, and evidence-based metabolic optimization recommendations</strong> using <strong>advanced algorithmic analysis, comprehensive physiological data integration, and current sports nutrition science</strong>. Essential for <strong>energy optimization, performance enhancement, and informed nutritional decision-making</strong>.
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
              <option value="lowCarb">Low Carb Lifestyle</option>
              <option value="ketogenic">Ketogenic Diet</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-dumbbell"></i> Exercise Type</label>
            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              style={selectStyle}
            >
              <option value="mixed">Mixed (strength & cardio)</option>
              <option value="endurance">Endurance (running, cycling, swimming)</option>
              <option value="strength">Strength Training (weightlifting)</option>
              <option value="hiit">HIIT / Interval Training</option>
              <option value="none">No Structured Exercise</option>
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
            <label style={inputGroupLabelStyle}><i className="fas fa-clock"></i> Exercise Duration (minutes/session)</label>
            <input
              type="number"
              value={exerciseDuration}
              onChange={(e) => setExerciseDuration(e.target.value)}
              placeholder="60"
              min="0"
              max="300"
              step="5"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Average workout length
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar-alt"></i> Exercise Frequency (days/week)</label>
            <input
              type="number"
              value={exerciseFrequency}
              onChange={(e) => setExerciseFrequency(e.target.value)}
              placeholder="3"
              min="0"
              max="7"
              step="1"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateCarbIntake}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Carbohydrate Requirements
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...carbCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Carbohydrate Requirements</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: '#f39c12' }}>
                  {results.optimalCarbs}g
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px'
                }}>
                  Optimal Daily Carbohydrate Intake
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
                  {results.riskLevel} Risk Level | Range: {results.minCarbs}-{results.maxCarbs}g/day
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Carbs/kg:</strong> {results.carbPerKgMin}-{results.carbPerKgMax}g/kg body weight</div>
                  <div><strong>Percentage:</strong> {results.carbPercentage}% of {results.tdee} calories</div>
                  <div><strong>Glycemic Load:</strong> {results.glycemicLoad} per meal (target &lt;10)</div>
                  <div><strong>Macro Split:</strong> C{results.carbPercentage}/P{Math.round((results.proteinGrams * 4 / results.tdee) * 100)}/F{Math.round((results.fatGrams * 9 / results.tdee) * 100)}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Weight: {results.weight}kg | Height: {results.height}cm | Age: {results.age}</div>
                <div>Goal: {results.goal} | Activity: {results.activityLevel} | Exercise: {results.exerciseType}</div>
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
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Optimal Carbohydrate Distribution:</strong></div>
                  {results.carbDistribution.map((meal, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: index < results.carbDistribution.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontSize: '0.9rem', width: '40%' }}>{meal.meal}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#3498db', width: '20%', textAlign: 'center' }}>
                        {meal.grams}g
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#666', width: '40%', textAlign: 'right' }}>
                        {meal.timing}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>{results.targets.dailyFiber}g</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Daily Fiber Target</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>{results.targets.postWorkout}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Post-Workout Carbs</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f39c12' }}>&lt;10</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Glycemic Load/Meal</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Key Principles:</strong></div>
                <div>• Distribute carbs based on activity patterns</div>
                <div>• Emphasize complex carbs for sustained energy</div>
                <div>• Time simple carbs around workouts</div>
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
                    borderLeft: '4px solid #2ecc71'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                      {rec}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Exercise-Specific Timing:</strong></div>
                <div>• Strength Training: Carbs pre & post workout</div>
                <div>• Endurance: Carb load before, fuel during</div>
                <div>• HIIT: Fast-acting carbs post-workout</div>
                <div>• Rest Days: Lower carb, higher fiber focus</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...glycemicCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Glycemic Management</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Glycemic Control Strategies:</strong></div>
                  {results.glycemicStrategies.map((strategy, index) => (
                    <div key={index} style={{
                      padding: '5px 0',
                      borderBottom: index < results.glycemicStrategies.length - 1 ? '1px solid #eee' : 'none'
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
                <div><strong>Best Carb Sources:</strong></div>
                <div>• Complex: Sweet potatoes, oats, quinoa, legumes</div>
                <div>• Simple (timed): White rice, bananas, dates, honey</div>
                <div>• Fiber-rich: Berries, avocados, chia seeds, broccoli</div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Carb cycling meal plan subscription</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Carbohydrate Intake Analysis: Advanced Metabolic Biochemistry & Performance Optimization Protocol</h3>
          <p style={paragraphStyle}><strong>Carbohydrate intake calculation methodologies</strong> represent <strong>essential metabolic biochemistry assessment tools</strong> for determining <strong>precise glycogen replenishment requirements, optimal glycemic response management, and evidence-based performance enhancement strategies</strong>. These advanced calculations integrate <strong>sophisticated metabolic analysis, comprehensive physiological data parameters, and validated sports nutrition research models</strong> to provide <strong>individualized metabolic optimization approaches</strong> that maximize <strong>energy availability effectiveness, athletic performance enhancement, and informed nutritional decision-making processes</strong> across diverse physiological scenarios requiring <strong>precision carbohydrate requirement stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Carbohydrate Requirement Algorithms - Comprehensive Metabolic Biochemistry Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated carbohydrate requirement calculation equations</strong> exist for <strong>comprehensive metabolic optimization protocols</strong>, each demonstrating specific <strong>physiological applications and variable glycemic response profiles</strong> influencing <strong>dietary intervention decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Glycogen Replenishment Protocol:</strong> Carbs (g/day) = Body Weight (kg) × Activity Factor × Goal Factor<br/>
            <strong>Glycemic Load Calculation:</strong> GL = (GI × Carbs per serving) ÷ 100<br/>
            <strong>Insulin Response Estimation:</strong> Insulin Index = Baseline Response × Carb Quantity × Carb Quality<br/>
            <strong>Carbohydrate Periodization Formula:</strong> Daily Carbs = Base Level × Training Load Factor × Recovery Status<br/>
            <strong>Metabolic Flexibility Assessment:</strong> Flexibility = Fat Oxidation Rate ÷ Carbohydrate Oxidation Rate<br/>
            <strong>Clinical Requirement Stratification:</strong> Maintenance (3-5g/kg), Fat Loss (1-2.5g/kg), Muscle Gain (4-7g/kg), Athletic (5-8g/kg), Ketogenic (0.2-0.5g/kg)
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Carbohydrate Intake Optimization - Comprehensive Metabolic Biochemistry Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>carbohydrate intake optimization methodology implementation</strong> serves critical functions across multiple <strong>metabolic biochemistry specialties and sports nutrition areas</strong> requiring <strong>precise energy substrate delivery</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Sports Performance Protocol:</strong> Essential for <strong>glycogen supercompensation strategies, endurance capacity maximization, and recovery acceleration optimization</strong> in competitive and recreational athletes</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Disease Management:</strong> Guides <strong>glycemic control optimization strategies, insulin sensitivity enhancement approaches, and diabetes complication prevention protocols</strong> in metabolic syndrome populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Weight Management Optimization:</strong> Determines <strong>carbohydrate threshold identification, hunger regulation enhancement, and metabolic rate preservation strategies</strong> for sustainable weight loss</li>
            <li style={{ marginBottom: '10px' }}><strong>Athletic Periodization Planning:</strong> Essential for <strong>training adaptation enhancement, competition performance peaking, and overtraining prevention interventions</strong> in periodized training programs</li>
            <li style={{ marginBottom: '10px' }}><strong>Gastrointestinal Health Management:</strong> Manages <strong>fiber intake optimization, microbiome diversity enhancement, and digestive comfort maintenance requirements</strong> for optimal gut health</li>
            <li style={{ marginBottom: '10px' }}><strong>Neurological Function Support:</strong> Coordinates <strong>brain energy substrate provision, cognitive performance optimization, and mood regulation enhancement approaches</strong> for mental health and cognitive function</li>
            <li><strong>Hormonal Balance Regulation:</strong> Facilitates <strong>cortisol modulation strategies, thyroid function optimization, and sex hormone balance maintenance methods</strong> for comprehensive endocrine health</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Factors in Carbohydrate Requirement Determination - Comprehensive Metabolic Biochemistry Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and lifestyle factors</strong> influence <strong>carbohydrate requirement parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Training Volume and Intensity:</strong> Exercise duration patterns, workout intensity levels, training frequency distributions, and competition schedule demands significantly affect <strong>glycogen depletion rates and carbohydrate oxidation capacities</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Health Status:</strong> Insulin sensitivity levels, pancreatic beta-cell function, liver glucose production rates, and peripheral glucose uptake capabilities dramatically alter <strong>carbohydrate tolerance thresholds and glycemic response patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Body Composition Variables:</strong> Muscle mass percentages, adipocyte distribution patterns, metabolic tissue proportions, and hydration status levels create <strong>specific glycogen storage capacity profiles requiring targeted interventions</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic and Ethnic Variations:</strong> Carbohydrate digestion enzyme polymorphisms, insulin signaling genetic variants, metabolic rate heritability factors, and ethnic dietary adaptation patterns demonstrate <strong>individualized carbohydrate response variations requiring personalized approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Status Elements:</strong> Dietary fiber intake levels, resistant starch consumption patterns, micronutrient sufficiency status, and hydration balance considerations affect <strong>carbohydrate digestion efficiency and metabolic utilization pathways</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lifestyle and Environmental Factors:</strong> Sleep quality and duration, stress management effectiveness, circadian rhythm alignment, and environmental temperature exposures create <strong>carbohydrate metabolism modulation patterns</strong></li>
            <li><strong>Microbiome Composition Influences:</strong> Gut bacteria diversity profiles, short-chain fatty acid production capacities, fermentation efficiency levels, and intestinal barrier integrity status significantly impact <strong>carbohydrate digestion and absorption dynamics</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Carbohydrate Requirement Calculations - Advanced Metabolic Biochemistry Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>carbohydrate requirement calculation methodologies</strong> provide valuable <strong>nutritional planning tools</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive metabolic evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Disorder Contexts:</strong> Type 1 diabetes with insulin therapy requirements, mitochondrial disorders with energy metabolism defects, and glycogen storage diseases with carbohydrate intolerance demonstrating <strong>specialized nutritional management needs beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Athletic Populations:</strong> Ultra-endurance athletes with multi-day events, professional cyclists with grand tour demands, and triathletes with combined discipline requirements showing <strong>unique carbohydrate metabolism patterns requiring specialized approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Gastrointestinal Disease Scenarios:</strong> Inflammatory bowel disease with malabsorption issues, celiac disease with gluten restriction needs, and small intestinal bacterial overgrowth with fermentation limitations creating <strong>carbohydrate digestion challenges</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Imbalance Conditions:</strong> Polycystic ovary syndrome with insulin resistance, hypothyroidism with metabolic rate depression, and Cushing's syndrome with cortisol excess affecting <strong>carbohydrate metabolism regulation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirements:</strong> Continuous glucose monitoring integration, metabolic cart testing for substrate utilization, and muscle biopsy for glycogen measurement providing <strong>enhanced precision beyond calculation estimates</strong></li>
            <li><strong>Precision Nutrition Applications:</strong> Genetic testing for carbohydrate metabolism variants, microbiome analysis for fiber fermentation capacity, and metabolomic profiling for individual metabolic responses enabling <strong>enhanced individualized carbohydrate prescription</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Carbohydrate Nutrition Science - Evolution of Metabolic Biochemistry Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>carbohydrate requirement assessment and optimization methodologies</strong> reflects <strong>centuries of nutritional research advancement</strong> and <strong>scientific practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Carbohydrate Discovery Era:</strong> Recognition of <strong>carbohydrates as energy substrates, glycemic response identification, and fiber importance understanding</strong> establishing foundational nutritional biochemistry knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Glycemic Index Development Period:</strong> Development of <strong>carbohydrate classification systems, glycemic response measurement methods, and insulin index determination approaches</strong> revolutionizing metabolic nutrition science</li>
            <li style={{ marginBottom: '10px' }}><strong>Sports Nutrition Evolution Phase:</strong> Introduction of <strong>carbohydrate loading protocols, glycogen depletion-repletion strategies, and exercise nutrition timing concepts</strong> for enhanced athletic performance</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Syndrome Research:</strong> Creation of <strong>insulin resistance understanding, carbohydrate restriction studies, and low-carbohydrate diet effectiveness demonstrations</strong> for metabolic disease management</li>
            <li style={{ marginBottom: '10px' }}><strong>Microbiome Revolution:</strong> Identification of <strong>fiber fermentation pathways, short-chain fatty acid production mechanisms, and gut-brain axis carbohydrate interactions</strong> for comprehensive metabolic health understanding</li>
            <li><strong>Personalized Nutrition Integration:</strong> Implementation of <strong>continuous glucose monitoring systems, genetic carbohydrate response testing, artificial intelligence dietary algorithms, and real-time metabolic feedback applications</strong> for scalable metabolic optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Metabolic Biochemistry Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>carbohydrate intake optimization implementation</strong> in contemporary clinical and athletic practice environments and <strong>evidence-based metabolic biochemistry protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Assessment Protocol:</strong> Implement <strong>comprehensive metabolic health evaluation, activity pattern analysis, training load consideration, and dietary preference integration</strong> before carbohydrate prescription development</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Calculation Methods:</strong> Utilize <strong>activity-adjusted requirement equations, goal-specific modification factors, metabolic health correction algorithms, and training load compensation formulas</strong> for accurate carbohydrate requirement determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Strategic Timing Planning:</strong> Develop <strong>exercise-nutrition synchronization strategies, circadian carbohydrate distribution approaches, recovery nutrition timing protocols, and competition fueling plans</strong> for enhanced metabolic efficiency</li>
            <li style={{ marginBottom: '10px' }}><strong>Quality Optimization Procedures:</strong> Establish <strong>glycemic index consideration frameworks, fiber intake target systems, resistant starch incorporation methods, and whole food prioritization approaches</strong> for optimal carbohydrate utilization</li>
            <li style={{ marginBottom: '10px' }}><strong>Monitoring and Adjustment Systems:</strong> Implement <strong>performance tracking methodologies, metabolic response assessment tools, tolerance evaluation procedures, and requirement adjustment algorithms</strong> for dynamic nutritional management</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>sports dietitian-athlete communication, endocrinology consultation, exercise physiology collaboration, and psychology integration</strong> for comprehensive metabolic care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Carbohydrate Nutrition - Emerging Metabolic Biochemistry Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>carbohydrate nutrition research initiatives</strong> continue refining <strong>requirement assessment and optimization approaches</strong> with promising technological developments and <strong>innovative nutritional methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Metabolic Monitoring:</strong> Continuous glucose monitoring integration, real-time glycogen measurement technologies, and dynamic insulin response tracking tools for precise carbohydrate status management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized carbohydrate requirement prediction models</strong> incorporating genetic data, microbiome profiles, and metabolic biomarkers</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Supplementation Systems:</strong> Individualized carbohydrate formulation delivery, time-release energy substrate technologies, and targeted glycemic response modulators for enhanced metabolic optimization</li>
            <li style={{ marginBottom: '10px' }}><strong>Novel Carbohydrate Sources:</strong> Resistant starch-enhanced foods, slowly digestible carbohydrate formulations, and microbiome-targeted fiber blends for improved metabolic health outcomes</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Nutrition Integration:</strong> Polymorphism-specific carbohydrate tolerance algorithms, pharmacogenetic nutrition response prediction, and personalized glycemic management based on <strong>individual genetic profiles</strong></li>
            <li><strong>Integrated Metabolic Platforms:</strong> Development of <strong>comprehensive metabolic optimization systems, real-time nutrition feedback applications, and precision wellness delivery models</strong> for optimal carbohydrate nutrition outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>carbohydrate nutrition methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare and sports professionals</strong> across multiple metabolic biochemistry disciplines. Comprehensive training curricula should systematically include <strong>carbohydrate metabolism principles, glycemic response management strategies, exercise nutrition timing techniques, and metabolic health counseling approaches</strong>. Continuing professional education programs must consistently address <strong>evolving metabolic research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient and athlete outcomes and evidence-based practice implementation across diverse healthcare, sports, and wellness delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent metabolic biochemistry management practices</strong> across diverse professional settings. These protocols encompass <strong>requirement calculation standardization methodologies, dietary intervention fidelity monitoring, metabolic outcome measurement systems, and clinical guideline implementation requirements</strong> that directly impact <strong>metabolic health outcomes and carbohydrate optimization effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse professional delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based metabolic biochemistry management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Carbohydrate Intake Optimization</h2>
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
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>metabolic biochemistry calculation tools and wellness monitoring calculators</strong> for carbohydrate optimization and overall health management:</p>
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
          <p style={paragraphStyle}><strong>This carbohydrate intake calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical models and nutritional guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Diabetes and Metabolic Conditions Warning:</strong> Individuals with diabetes, prediabetes, insulin resistance, or other metabolic disorders should consult with a healthcare provider before making significant changes to carbohydrate intake. Medication adjustments (especially insulin) may be necessary with carbohydrate modification.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, certified diabetes educator, or other qualified healthcare provider with any questions regarding carbohydrate intake, glycemic management, or dietary changes. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Ketoacidosis Risk:</strong> Individuals with type 1 diabetes or those on SGLT2 inhibitors should never initiate a ketogenic diet without medical supervision due to risk of diabetic ketoacidosis.</p>
          <p style={paragraphStyle}><strong>Individual Variation:</strong> Carbohydrate tolerance varies significantly based on genetics, activity level, metabolic health, and individual response. These calculations provide starting points that should be adjusted based on personal progress, tolerance, and professional guidance.</p>
          <p style={paragraphStyle}><strong>Exercise Considerations:</strong> Significant increases in carbohydrate intake should be accompanied by appropriate increases in physical activity to prevent unwanted weight gain and metabolic issues.</p>
          <p style={paragraphStyle}><strong>Balanced Nutrition:</strong> Carbohydrates should be part of a balanced diet including adequate protein, healthy fats, fiber, vitamins, and minerals. Do not neglect other essential nutrients while focusing on carbohydrate optimization.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Smart carb cycling meal plans</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Continuous glucose monitor system</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete metabolic optimization program</p>
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
                Get 20% off on metabolic health coaching
              </p>
            </div>
            <button style={{
              background: '#f39c12',
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