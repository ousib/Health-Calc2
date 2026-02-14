"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { blogPosts } from './data';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const [showSidebar, setShowSidebar] = useState(true);
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

  // Content box style
  const contentBoxStyle = {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    width: '100%'
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

  // Handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Blog posts data (you can move this to a separate file later)
  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to BMI: Understanding Your Body Mass Index Score",
      excerpt: "Learn how to interpret your BMI score, understand its limitations, and discover what it really means for your health.",
      content: `
        <h2>What is Body Mass Index (BMI)?</h2>
        <p>Body Mass Index (BMI) is a screening tool that estimates body fat based on height and weight. Developed by Adolphe Quetelet in the 1830s, this simple calculation has become the standard for population-level obesity screening worldwide. The formula is weight in kilograms divided by height in meters squared (kg/m²).</p>
        
        <h2>How to Calculate Your BMI</h2>
        <p>The BMI calculation is straightforward: BMI = weight (kg) / [height (m)]². For imperial measurements, use BMI = [weight (lbs) / height (in)²] × 703. Our BMI calculator automates this process and provides instant results with category classification.</p>
        
        <h2>Understanding Your BMI Category</h2>
        <p>The World Health Organization classifies BMI into these categories:</p>
        <ul>
          <li><strong>Underweight:</strong> Below 18.5 - May indicate malnutrition, eating disorders, or other health conditions</li>
          <li><strong>Normal weight:</strong> 18.5 to 24.9 - Associated with lowest disease risk</li>
          <li><strong>Overweight:</strong> 25 to 29.9 - Moderate health risks, may benefit from weight management</li>
          <li><strong>Obese:</strong> 30 and above - Significantly increased health risks</li>
        </ul>
        
        <h2>Limitations of BMI</h2>
        <p>While BMI is useful for population screening, it has important limitations at the individual level:</p>
        <ul>
          <li>Doesn't distinguish between muscle and fat mass</li>
          <li>Doesn't account for fat distribution</li>
          <li>May misclassify athletes and muscular individuals</li>
          <li>Doesn't consider age, sex, or ethnic differences</li>
        </ul>
        
        <h2>Beyond BMI: Complementary Assessments</h2>
        <p>For a more complete health picture, consider combining BMI with:</p>
        <ul>
          <li>Waist circumference (visceral fat indicator)</li>
          <li>Body fat percentage</li>
          <li>Blood pressure readings</li>
          <li>Blood glucose and lipid panels</li>
        </ul>
        
        <h2>Using BMI for Health Tracking</h2>
        <p>BMI is most valuable when tracked over time. A gradual increase may indicate unhealthy weight gain, while a decrease could signal successful weight management or, in some cases, underlying illness. Use our BMI calculator monthly to monitor trends rather than daily fluctuations.</p>
      `,
      category: "BMI & Weight",
      author: "Dr. Sarah Johnson",
      authorTitle: "Endocrinologist",
      authorBio: "Dr. Sarah Johnson is a board-certified endocrinologist with 15+ years of experience in metabolic health and weight management. She leads clinical research at the Metabolic Health Institute and has published over 30 peer-reviewed articles on obesity and diabetes prevention.",
      authorImage: "sarah-johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      image: "bmi-guide",
      slug: "complete-guide-to-bmi",
      tags: ["BMI", "weight management", "health screening", "obesity", "body composition"],
      featured: true,
      comments: 24,
      shares: 156,
      relatedCalculators: ["bmi-calculator", "body-fat-calculator", "ideal-weight-calculator"]
    },
    {
      id: 2,
      title: "Body Fat Percentage: Why It Matters More Than Your Weight",
      excerpt: "Discover why body composition is a better health indicator than scale weight and how to improve your body fat percentage.",
      content: `
        <h2>Why Body Fat Percentage Matters</h2>
        <p>Body fat percentage provides a more accurate picture of health than BMI alone. Two people can weigh the same but have dramatically different body compositions, health risks, and metabolic profiles. Understanding your body fat percentage helps differentiate between metabolically healthy and unhealthy weight.</p>
        
        <h2>Healthy Body Fat Percentage Ranges</h2>
        <p>According to the American Council on Exercise (ACE), healthy body fat ranges are:</p>
        <ul>
          <li><strong>Men:</strong> 14-17% (fitness range), 18-24% (acceptable)</li>
          <li><strong>Women:</strong> 21-24% (fitness range), 25-31% (acceptable)</li>
        </ul>
        
        <h2>Methods to Measure Body Fat</h2>
        <p>Several methods exist for measuring body fat percentage:</p>
        <ul>
          <li><strong>U.S. Navy Method:</strong> Uses circumference measurements - ±3-4% accuracy</li>
          <li><strong>DEXA Scan:</strong> Gold standard - ±1-2% accuracy, but expensive</li>
          <li><strong>BodPod:</strong> Air displacement plethysmography - ±2-3% accuracy</li>
          <li><strong>Bioelectrical Impedance:</strong> Smart scales - ±3-5% accuracy</li>
        </ul>
        
        <h2>Visceral vs. Subcutaneous Fat</h2>
        <p>Not all body fat is created equal. Visceral fat surrounds internal organs and is metabolically active, producing inflammatory compounds that increase disease risk. Subcutaneous fat lies beneath the skin and is less harmful. Waist circumference helps estimate visceral fat levels.</p>
        
        <h2>How to Improve Your Body Composition</h2>
        <p>Improving body fat percentage requires a strategic approach:</p>
        <ul>
          <li>Resistance training to build/maintain muscle</li>
          <li>Adequate protein intake (1.6-2.2g per kg body weight)</li>
          <li>Moderate calorie deficit (500 calories daily)</li>
          <li>Quality sleep (7-9 hours) for hormone regulation</li>
        </ul>
      `,
      category: "Body Composition",
      author: "Michael Chen",
      authorTitle: "Health Data Scientist",
      authorBio: "Michael Chen specializes in health analytics and body composition research. With a master's degree in Biostatistics, he develops validation protocols for body fat measurement methods and has consulted for major fitness technology companies.",
      authorImage: "michael-chen",
      date: "March 12, 2024",
      readTime: "10 min read",
      image: "body-fat-guide",
      slug: "body-fat-percentage-guide",
      tags: ["body fat", "body composition", "fitness", "visceral fat", "DEXA scan"],
      featured: true,
      comments: 18,
      shares: 203,
      relatedCalculators: ["body-fat-calculator", "bmi-calculator", "waist-to-height-ratio"]
    },
    // ... rest of your blog posts data
  ];

  // Find the current post
  const post = blogPosts.find(p => p.slug === slug);

  // Get related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.slug !== slug)
    .slice(0, 3);

  // Get recent posts
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Handle 404
  if (!post) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>404 - Article Not Found</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>The article you're looking for doesn't exist or has been moved.</p>
        <a href="/blog" style={{
          padding: '12px 24px',
          background: '#27ae60',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <i className="fas fa-arrow-left"></i> Back to Blog
        </a>
      </div>
    );
  }

  return (
    <main style={containerStyle}>
      <section style={contentBoxStyle}>
        {/* Breadcrumbs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          color: '#666',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <a href="/" style={{ color: '#27ae60', textDecoration: 'none' }}>Home</a>
          <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
          <a href="/blog" style={{ color: '#27ae60', textDecoration: 'none' }}>Blog</a>
          <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
          <span style={{ color: '#7f8c8d' }}>{post.category}</span>
        </div>

        {/* Category Badge */}
        <span style={{
          background: '#e8f5e9',
          color: '#27ae60',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          fontWeight: '600',
          display: 'inline-block',
          marginBottom: '15px'
        }}>
          {post.category}
        </span>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          color: '#2c3e50',
          marginBottom: '20px',
          lineHeight: '1.3',
          fontWeight: '700'
        }}>
          {post.title}
        </h1>

        {/* Author & Meta Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#3498db',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                {post.author}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {post.authorTitle}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', color: '#7f8c8d', fontSize: '0.9rem' }}>
            <span>
              <i className="fas fa-calendar-alt"></i> {post.date}
            </span>
            <span>
              <i className="fas fa-clock"></i> {post.readTime}
            </span>
            <span>
              <i className="fas fa-eye"></i> 1.2k views
            </span>
          </div>
        </div>

        {/* Featured Image Placeholder */}
        <div style={{
          height: '400px',
          background: `linear-gradient(135deg, #3498db, #9b59b6)`,
          borderRadius: '15px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '4rem'
        }}>
          <i className={`fas fa-${post.image}`}></i>
        </div>

        {/* Article Content */}
        <div 
          style={{
            fontSize: '1.05rem',
            color: '#333',
            lineHeight: '1.8',
            marginBottom: '40px'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div style={{
          marginBottom: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #ecf0f1'
        }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '1.1rem' }}>
            <i className="fas fa-tags"></i> Topics:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {post.tags.map((tag, index) => (
              <a
                key={index}
                href={`/blog?tag=${tag}`}
                style={{
                  padding: '8px 15px',
                  background: '#f8f9fa',
                  border: '1px solid #dfe6e9',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  color: '#2c3e50',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#27ae60';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#27ae60';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.color = '#2c3e50';
                  e.currentTarget.style.borderColor = '#dfe6e9';
                }}
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div style={{
          padding: '30px',
          background: '#f8f9fa',
          borderRadius: '12px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <div>
            <h4 style={{ color: '#2c3e50', marginBottom: '5px', fontSize: '1.1rem' }}>
              Share This Article
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Help others discover this health information
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{
              width: '40px',
              height: '40px',
              background: '#4267B2',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button style={{
              width: '40px',
              height: '40px',
              background: '#1DA1F2',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
              <i className="fab fa-twitter"></i>
            </button>
            <button style={{
              width: '40px',
              height: '40px',
              background: '#0077B5',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
              <i className="fab fa-linkedin-in"></i>
            </button>
            <button style={{
              width: '40px',
              height: '40px',
              background: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
              <i className="fab fa-whatsapp"></i>
            </button>
            <button style={{
              width: '40px',
              height: '40px',
              background: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
              <i className="fas fa-link"></i>
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div style={{
          padding: '30px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #ecf0f1',
          marginBottom: '40px',
          display: 'flex',
          gap: '25px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: '#3498db',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {post.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '5px', fontSize: '1.3rem' }}>
              About {post.author}
            </h3>
            <p style={{ color: '#27ae60', marginBottom: '15px', fontSize: '0.95rem' }}>
              {post.authorTitle}
            </p>
            <p style={{ color: '#555', lineHeight: '1.7', fontSize: '0.95rem' }}>
              {post.authorBio}
            </p>
          </div>
        </div>

        {/* Related Calculators */}
        <div style={{
          padding: '30px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)',
          borderRadius: '12px',
          marginBottom: '40px'
        }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '1.2rem' }}>
            <i className="fas fa-calculator"></i> Try Our Related Calculators
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {post.relatedCalculators?.map((calc, index) => (
              <a
                key={index}
                href={`/${calc}`}
                style={{
                  padding: '12px 20px',
                  background: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#2c3e50',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #dfe6e9',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#27ae60';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#27ae60';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#2c3e50';
                  e.currentTarget.style.borderColor = '#dfe6e9';
                }}
              >
                <i className="fas fa-calculator"></i>
                {calc.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </a>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '25px', fontSize: '1.5rem' }}>
              <i className="fas fa-book-open"></i> Related Articles
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  style={{
                    textDecoration: 'none',
                    background: 'white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s',
                    border: '1px solid #ecf0f1'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{
                    height: '120px',
                    background: `linear-gradient(135deg, #3498db, #9b59b6)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem'
                  }}>
                    <i className={`fas fa-${relatedPost.image}`}></i>
                  </div>
                  <div style={{ padding: '15px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#27ae60', marginBottom: '5px' }}>
                      {relatedPost.category}
                    </div>
                    <h4 style={{ fontSize: '1rem', color: '#2c3e50', marginBottom: '5px', lineHeight: '1.4' }}>
                      {relatedPost.title}
                    </h4>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>
                      {relatedPost.date} • {relatedPost.readTime}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/blog"
            style={{
              padding: '12px 24px',
              background: '#27ae60',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#219150'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#27ae60'}
          >
            <i className="fas fa-arrow-left"></i>
            Back to All Articles
          </a>
        </div>
      </section>

      {/* Sidebar */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Health tracking app</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Partner</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Online coaching platform</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Health Service</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Personalized meal plans</p>
            </div>

            {/* Table of Contents */}
            <div style={{
              padding: '25px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
            }}>
              <h4 style={{
                marginBottom: '20px',
                color: '#2c3e50',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.2rem'
              }}>
                <i className="fas fa-list-ul" style={{ color: '#27ae60' }}></i> In This Article
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.95rem' }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem', marginRight: '8px', color: '#27ae60' }}></i>
                    What is BMI?
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.95rem' }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem', marginRight: '8px', color: '#27ae60' }}></i>
                    How to Calculate
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.95rem' }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem', marginRight: '8px', color: '#27ae60' }}></i>
                    BMI Categories
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.95rem' }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem', marginRight: '8px', color: '#27ae60' }}></i>
                    Limitations
                  </a>
                </li>
              </ul>
            </div>

            {/* Recent Posts */}
            <div style={{
              padding: '25px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
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
              {recentPosts.map((recentPost) => (
                <a
                  key={recentPost.id}
                  href={`/blog/${recentPost.slug}`}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px 0',
                    textDecoration: 'none',
                    borderBottom: '1px solid #ecf0f1'
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: `linear-gradient(135deg, #3498db, #9b59b6)`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    <i className={`fas fa-${recentPost.image}`}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2c3e50', marginBottom: '4px' }}>
                      {recentPost.title.length > 50 ? recentPost.title.substring(0, 50) + '...' : recentPost.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>
                      {recentPost.date}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}