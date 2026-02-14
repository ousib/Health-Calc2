"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [showSidebar, setShowSidebar] = useState(true);

  // Container style
  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
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

  // Handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Blog posts data - just title, date, and link
  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to BMI: Understanding Your Body Mass Index Score",
      date: "March 15, 2024",
      slug: "complete-guide-to-bmi"
    },
    {
      id: 2,
      title: "Body Fat Percentage: Why It Matters More Than Your Weight",
      date: "March 12, 2024",
      slug: "body-fat-percentage-guide"
    },
    {
      id: 3,
      title: "Basal Metabolic Rate: How Many Calories Do You Really Need?",
      date: "March 10, 2024",
      slug: "basal-metabolic-rate-guide"
    },
    {
      id: 4,
      title: "Ideal Weight Calculator: Beyond the Height-Weight Tables",
      date: "March 8, 2024",
      slug: "ideal-weight-calculator-guide"
    },
    {
      id: 5,
      title: "Waist-to-Hip Ratio: The Hidden Indicator of Metabolic Health",
      date: "March 5, 2024",
      slug: "waist-to-hip-ratio-guide"
    },
    {
      id: 6,
      title: "Understanding Your Heart Rate Zones for Optimal Training",
      date: "March 3, 2024",
      slug: "heart-rate-zones-guide"
    },
    {
      id: 7,
      title: "Water Intake Calculator: How Much Water Should You Really Drink?",
      date: "March 1, 2024",
      slug: "water-intake-calculator-guide"
    },
    {
      id: 8,
      title: "TDEE Explained: Your Complete Guide to Total Daily Energy Expenditure",
      date: "February 28, 2024",
      slug: "tdee-complete-guide"
    },
    {
      id: 9,
      title: "Diabetes Risk Assessment: Understanding Your Numbers",
      date: "February 25, 2024",
      slug: "diabetes-risk-assessment"
    },
    {
      id: 10,
      title: "Macro Calculator: Perfecting Your Protein, Carb, and Fat Balance",
      date: "February 22, 2024",
      slug: "macro-calculator-guide"
    },
    {
      id: 11,
      title: "Pregnancy Weight Gain: Healthy Guidelines by Trimester",
      date: "February 20, 2024",
      slug: "pregnancy-weight-gain-guide"
    },
    {
      id: 12,
      title: "Children's BMI: Understanding Percentiles and Growth Patterns",
      date: "February 18, 2024",
      slug: "childrens-bmi-guide"
    },
    {
      id: 13,
      title: "Heart Disease Risk Calculator: What Your Score Means",
      date: "February 15, 2024",
      slug: "heart-disease-risk-guide"
    },
    {
      id: 14,
      title: "Body Type Calculator: Ectomorph, Mesomorph, or Endomorph?",
      date: "February 12, 2024",
      slug: "body-type-calculator-guide"
    },
    {
      id: 15,
      title: "Calorie Calculator: Beyond the 2000-Calorie Standard",
      date: "February 10, 2024",
      slug: "calorie-calculator-guide"
    }
  ];

  return (
    <main style={containerStyle}>
      <section style={contentBoxStyle}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ 
            marginBottom: '15px', 
            color: '#2c3e50', 
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <i className="fas fa-blog" style={{ color: '#27ae60' }}></i> Health Articles
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Evidence-based health information and guides
          </p>
        </div>

        {/* Simple Article List */}
        <div style={{ 
          borderTop: '2px solid #ecf0f1',
          paddingTop: '20px'
        }}>
          {blogPosts.map((post, index) => (
            <div key={post.id}>
              <Link 
                href={`/blog/${post.slug}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 10px',
                  textDecoration: 'none',
                  color: '#2c3e50',
                  borderBottom: '1px solid #ecf0f1',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: '1.1rem' }}>
                  {post.title}
                </span>
                <span style={{ 
                  color: '#7f8c8d', 
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  marginLeft: '20px'
                }}>
                  {post.date}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Article Count */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#666'
        }}>
          <i className="fas fa-newspaper"></i> {blogPosts.length} articles available
        </div>
      </section>

      {/* Simple Sidebar */}
      {showSidebar && (
        <aside style={{ display: 'block', height: 'fit-content' }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '20px'
          }}>
            <h4 style={{
              marginBottom: '20px',
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1.2rem'
            }}>
              <i className="fas fa-clock" style={{ color: '#e74c3c' }}></i> Recent Articles
            </h4>
            {blogPosts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  padding: '10px 0',
                  textDecoration: 'none',
                  color: '#2c3e50',
                  borderBottom: '1px solid #ecf0f1',
                  fontSize: '0.95rem'
                }}
              >
                <div>{post.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginTop: '3px' }}>
                  {post.date}
                </div>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </main>
  );
}