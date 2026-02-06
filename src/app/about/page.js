"use client";

import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

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

  // Content box style
  const contentBoxStyle = {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    width: '100%'
  };

  // Styles for share buttons
  const actionButtonsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '30px',
    marginBottom: '30px',
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

  // Team member grid
  const teamGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    margin: '30px 0'
  };

  const teamMemberStyle = {
    background: '#f8f9fa',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    borderTop: '5px solid #27ae60',
    transition: 'transform 0.3s, box-shadow 0.3s'
  };

  const hoverTeamMemberStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  };

  // Calculator grid
  const calculatorGridStyle = {
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

  // FAQ styles
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

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Share function for the About page
  const sharePage = (platform) => {
    const shareText = 'Check out Health Calculators Online - Comprehensive health and fitness calculators for accurate health assessments!';
    const shareUrl = window.location.href;
    const hashtags = 'Health,Fitness,Calculators,Wellness';

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
      case 'email':
        shareUrlFull = `mailto:?subject=Health Calculators Online&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'Health Calculators Online',
            text: shareText,
            url: shareUrl,
          });
          return;
        } else {
          navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('Page link copied to clipboard!');
          return;
        }
    }

    window.open(shareUrlFull, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  const faqs = [
    {
      question: "How accurate are your health calculators compared to professional medical assessments?",
      answer: "Our health calculators utilize scientifically validated formulas and algorithms that are widely accepted in medical and fitness communities. For example, our BMI calculator uses the standard World Health Organization formula, and our body fat calculator employs the validated U.S. Navy Method. While these tools provide accurate estimates, they are designed for educational and screening purposes and should not replace professional medical diagnosis or treatment. For clinical decisions, always consult healthcare professionals who can consider your complete medical history and perform comprehensive assessments."
    },
    {
      question: "Are the calculators suitable for all ages and medical conditions?",
      answer: "Most of our calculators are designed for adults aged 18-65. Special considerations apply for children, seniors, pregnant women, and individuals with specific medical conditions. Our BMI calculator includes pediatric growth charts, but interpretation should be done by healthcare providers. Calculators may not be appropriate for individuals with certain conditions like edema, pregnancy, amputations, or metabolic disorders. We provide detailed disclaimers with each calculator and recommend consulting healthcare professionals for personalized assessments, especially if you have pre-existing health conditions or are taking medications."
    },
    {
      question: "How often should I use these calculators to track my health progress?",
      answer: "For general health monitoring, we recommend using calculators like BMI and body fat percentage every 2-4 weeks to track progress. Daily measurements can be misleading due to normal fluctuations in weight and hydration. For calculators assessing risk factors (like diabetes or heart disease risk), quarterly assessments are appropriate unless significant lifestyle changes occur. Remember that these tools provide snapshots of your health status. Consistent tracking over time gives better insights than single measurements. Always measure under similar conditions (time of day, hydration status) for accurate comparisons."
    },
    {
      question: "Do you store or collect personal health data from calculator usage?",
      answer: "We prioritize user privacy and data security. All calculations are performed locally in your browser - we do not store, transmit, or collect any personal health information you enter into our calculators. We use secure HTTPS connections for all data transmission. Our privacy-first approach means you can use our tools confidently without concerns about data privacy. We do use anonymous analytics to improve user experience, but these do not include personal health information. We recommend clearing your browser cache if using shared devices for additional privacy."
    },
    {
      question: "How do you ensure the medical accuracy and reliability of your calculators?",
      answer: "Our team of health professionals and data scientists regularly reviews and updates all calculator algorithms based on the latest medical research and clinical guidelines. We source formulas from authoritative organizations like WHO, CDC, American Heart Association, and peer-reviewed scientific journals. Each calculator undergoes rigorous testing and validation before publication. We also provide comprehensive information about each formula's limitations, accuracy ranges, and appropriate applications. While we strive for scientific accuracy, we emphasize that our tools are for educational purposes and should complement, not replace, professional medical advice."
    },
    {
      question: "Can I use these calculators for medical or fitness professional purposes?",
      answer: "Healthcare and fitness professionals frequently use our calculators as screening tools and educational resources with clients. Many professionals appreciate the detailed explanations, scientific references, and comprehensive results we provide. However, for clinical decision-making, professionals should use validated clinical tools and consider the full context of a patient's health. Our calculators can serve as excellent conversation starters, educational tools, and progress tracking aids in professional settings. We recommend reviewing the scientific basis of each calculator to ensure it aligns with your professional standards and practice guidelines."
    }
  ];

  const teamMembers = [
   
  ];

  const featuredCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator", category: "Basic Health" },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", category: "Body Composition" },
    { name: "BMR Calculator", link: "/bmr-calculator", category: "Metabolism" },
    { name: "TDEE Calculator", link: "/tdee-calculator", category: "Nutrition" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator", category: "Weight Management" },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", category: "Cardiovascular" },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", category: "Hydration" },
    { name: "Macro Calculator", link: "/macro-calculator", category: "Nutrition" },
    { name: "Waist to Height Ratio", link: "/waist-to-height-ratio", category: "Body Composition" },
    { name: "Body Type Calculator", link: "/body-type-calculator", category: "Fitness" },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", category: "Disease Risk" },
    { name: "Heart Disease Risk", link: "/heart-disease-risk-calculator", category: "Cardiovascular" }
  ];

  const sortedCalculators = [...featuredCalculators].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <main style={containerStyle}>
      <section style={contentBoxStyle}>
        <h1 style={{ 
          marginBottom: '15px', 
          color: '#2c3e50', 
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <i className="fas fa-heartbeat" style={{ color: '#e74c3c' }}></i> About Health Calculators Online
        </h1>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          marginBottom: '25px',
          lineHeight: '1.7',
          fontWeight: '500'
        }}>
          Welcome to <strong>Health Calculators Online</strong> - Your comprehensive resource for accurate, evidence-based health and fitness calculations. We empower individuals and professionals with scientifically validated tools for health assessment, monitoring, and optimization.
        </p>

        {/* Share Buttons */}
        <div style={actionButtonsStyle}>
          <div style={{ position: 'relative' }} className="share-button-container">
            <button
              style={shareButtonStyle}
              onClick={() => setShowShareMenu(!showShareMenu)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2980b9'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#3498db'}
            >
              <i className="fas fa-share-alt"></i> Share This Page
            </button>
            
            {showShareMenu && (
              <div style={shareMenuStyle}>
                <button
                  style={{ ...sharePlatformButtonStyle, background: '#4267B2', color: 'white' }}
                  onClick={() => sharePage('facebook')}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <i className="fab fa-facebook-f"></i> Facebook
                </button>
                
                <button
                  style={{ ...sharePlatformButtonStyle, background: '#1DA1F2', color: 'white' }}
                  onClick={() => sharePage('twitter')}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <i className="fab fa-twitter"></i> Twitter
                </button>
                
                <button
                  style={{ ...sharePlatformButtonStyle, background: '#0077B5', color: 'white' }}
                  onClick={() => sharePage('linkedin')}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </button>
                
                <button
                  style={{ ...sharePlatformButtonStyle, background: '#25D366', color: 'white' }}
                  onClick={() => sharePage('whatsapp')}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </button>
                
                <button
                  style={{ ...sharePlatformButtonStyle, background: '#666', color: 'white' }}
                  onClick={() => sharePage('email')}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <i className="fas fa-envelope"></i> Email
                </button>
                
                <button
                  style={{ ...sharePlatformButtonStyle, background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}
                  onClick={() => sharePage('copy')}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                >
                  <i className="fas fa-copy"></i> Copy Link
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mission Section */}
        <div style={{ 
          padding: '30px', 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)',
          borderRadius: '12px',
          marginBottom: '40px',
          borderLeft: '5px solid #27ae60'
        }}>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-bullseye" style={{ color: '#27ae60' }}></i> Our Mission & Vision
          </h2>
          <p style={{ fontSize: '1rem', color: '#555', marginBottom: '15px', lineHeight: '1.7' }}>
            At <strong>Health Calculators Online</strong>, our mission is to democratize access to <strong>scientifically validated health assessment tools</strong> that empower individuals to take control of their health journey. We believe that <strong>accurate health information should be accessible, understandable, and actionable</strong> for everyone, regardless of their medical background or technical expertise.
          </p>
          <p style={{ fontSize: '1rem', color: '#555', marginBottom: '15px', lineHeight: '1.7' }}>
            Our vision is to become the <strong>most trusted online resource for health calculations worldwide</strong>, bridging the gap between complex medical science and practical everyday health decisions. We combine <strong>cutting-edge technology with evidence-based medicine</strong> to create tools that are both sophisticated and user-friendly.
          </p>
        </div>

        
        
        <div style={teamGridStyle}>
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              style={teamMemberStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverTeamMemberStyle)}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: member.imageColor,
                borderRadius: '50%',
                margin: '0 auto 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: 'bold'
              }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 style={{ color: '#2c3e50', marginBottom: '5px', fontSize: '1.2rem' }}>{member.name}</h3>
              <p style={{ color: '#27ae60', fontWeight: '600', marginBottom: '5px', fontSize: '0.9rem' }}>{member.role}</p>
              <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '10px' }}>{member.qualification}</p>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.5' }}>{member.bio}</p>
            </div>
          ))}
        </div>

        

        {/* Featured Calculators */}
        <div style={{ marginTop: '50px' }}>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '20px', 
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-calculator" style={{ color: '#f39c12' }}></i> Featured Health Calculators
          </h2>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '25px', lineHeight: '1.7' }}>
            Explore our comprehensive collection of health assessment tools, each designed with precision and user experience in mind:
          </p>
          
          <div style={calculatorGridStyle}>
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
                <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '5px', textAlign: 'left' }}>
                  {calculator.category}
                </div>
                <i className="fas fa-calculator" style={{ marginRight: '5px' }}></i> {calculator.name}
              </a>
            ))}
          </div>
        </div>

        {/* Enhanced SEO Content */}
        <div style={{ 
          marginTop: '50px', 
          borderTop: '1px solid #eee', 
          paddingTop: '30px' 
        }}>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '20px', 
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-search" style={{ color: '#3498db' }}></i> Comprehensive Health Assessment Platform
          </h2>
          
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '25px'
          }}>
            <i className="fas fa-chart-line"></i> Advanced Health Monitoring and Risk Assessment Solutions
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            <strong>Health Calculators Online</strong> represents a comprehensive <strong>digital health assessment platform</strong> that provides individuals and healthcare professionals with <strong>scientifically validated calculation tools for preventive health monitoring and risk stratification</strong>. Our platform integrates <strong>evidence-based medical algorithms, user-friendly interfaces, and educational resources</strong> to support informed health decision-making across diverse population groups and health conditions. By leveraging <strong>advanced health informatics principles and clinical validation protocols</strong>, we deliver accurate assessment tools that bridge the gap between <strong>complex medical science and practical health management applications</strong>.
          </p>

          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '25px'
          }}>
            <i className="fas fa-user-check"></i> Personalized Health Assessment and Progress Tracking Capabilities
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            Our platform enables <strong>personalized health parameter assessment and longitudinal progress tracking</strong> through sophisticated calculation algorithms that account for individual <strong>demographic characteristics, physiological parameters, and lifestyle factors</strong>. Users can systematically monitor <strong>body composition changes, metabolic health indicators, cardiovascular risk parameters, and nutritional status metrics</strong> over time, facilitating <strong>data-driven health optimization strategies and evidence-based lifestyle modifications</strong>. The integration of <strong>multiple health assessment modalities</strong> provides comprehensive insights into <strong>overall wellness status and disease prevention opportunities</strong>, supporting both <strong>individual health management and professional healthcare delivery</strong>.
          </p>

          

          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '25px'
          }}>
            <i className="fas fa-lock"></i> Privacy-First Health Data Management and Security Infrastructure
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#555', 
            marginBottom: '15px', 
            lineHeight: '1.7'
          }}>
            We employ a <strong>privacy-by-design architecture</strong> that ensures all health calculations occur locally within users' browsers, eliminating <strong>sensitive health data transmission or storage on external servers</strong>. Our <strong>security-first development approach</strong> implements <strong>end-to-end encryption protocols, secure communication channels, and privacy-preserving analytics</strong> that protect user confidentiality while maintaining platform functionality. This <strong>privacy-focused operational model</strong> allows individuals to utilize our health assessment tools with complete confidence regarding <strong>personal health information protection and data security assurance</strong>, addressing growing concerns about <strong>digital health privacy and medical data confidentiality</strong> in online environments.
          </p>

         
        </div>

        {/* FAQ Section */}
        <div style={{ 
          margin: '50px 0',
          padding: '30px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
          borderTop: '5px solid #3498db'
        }}>
          <h2 style={{ 
            color: '#2c3e50',
            marginBottom: '25px',
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-question-circle"></i> Frequently Asked Questions
          </h2>
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

        {/* Contact & Support */}
        <div style={{ 
          padding: '30px', 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ebf5fb 100%)',
          borderRadius: '12px',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            color: '#2c3e50', 
            marginBottom: '15px', 
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-comments" style={{ color: '#3498db' }}></i> Contact & Support
          </h2>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '20px', lineHeight: '1.7' }}>
            Have questions, suggestions, or need technical support? Our team is here to help.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            <button style={{
              padding: '12px 24px',
              background: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600'
            }}>
              <i className="fas fa-envelope"></i> Contact Us
            </button>
            <button style={{
              padding: '12px 24px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600'
            }}>
              <i className="fas fa-question-circle"></i> Help Center
            </button>
          </div>
        </div>
      </section>

      {/* Sidebar with Ads and Quick Links */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Health monitoring devices</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Partner</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Nutrition tracking app</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Health Service</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Personal health coaching</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px sticky ad</p>
            </div>
            
            {/* Quick Links */}
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
                <i className="fas fa-link"></i> Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="/" style={{
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#2c3e50',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-home"></i> Home
                </a>
                <a href="/bmi-calculator" style={{
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#2c3e50',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-calculator"></i> BMI Calculator
                </a>
                <a href="/body-fat-calculator" style={{
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#2c3e50',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-percentage"></i> Body Fat Calculator
                </a>
                <a href="/privacy-policy" style={{
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#2c3e50',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-shield-alt"></i> Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}