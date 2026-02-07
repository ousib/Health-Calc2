// app/layout.jsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export const metadata = {
  title: "Health Calculator",
  description: "Know your health in seconds",
  icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧮</text></svg>`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E9W1HQGW35"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E9W1HQGW35');
          `}
        </Script>
      </head>

      <body>
        <Navbar />

        <main className="container">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-main">
              <div className="footer-brand">
                <div className="logo">
                  <i className="fas fa-calculator"></i>
                  <h3>HealthCalculators <span>Online</span></h3>
                </div>
                <p className="tagline">
                  Scientific, research-backed health tools to track fitness and wellness.
                  Your health journey, calculated with precision.
                </p>

                <div className="footer-email">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:healthcalculatorsonline@gmail.com">
                    healthcalculatorsonline@gmail.com
                  </a>
                </div>

                <div className="social-links">
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>

              <div className="footer-links">
                <div className="link-column">
                  <h4><i className="fas fa-heartbeat"></i> Health Tools</h4>
                  <ul>
                    <li><a href="/bmi-calculator">BMI Calculator</a></li>
                    <li><a href="/calorie-calculator">Calorie Calculator</a></li>
                    <li><a href="/body-fat-calculator">Body Fat Calculator</a></li>
                    <li><a href="/ideal-weight-calculator">Ideal Weight</a></li>
                    <li><a href="/heart-rate-calculator">Heart Rate Zones</a></li>
                  </ul>
                </div>

                <div className="link-column">
                  <h4><i className="fas fa-stethoscope"></i> Medical Tools</h4>
                  <ul>
                    <li><a href="/gfr-calculator">GFR Calculator</a></li>
                    <li><a href="/medication-dosage">Medication Dosage</a></li>
                    <li><a href="/blood-pressure-tracker">Blood Pressure Tracker</a></li>
                    <li><a href="/water-intake-calculator">Water Intake</a></li>
                    <li><a href="/pregnancy-calculators">Pregnancy Tools</a></li>
                  </ul>
                </div>

                <div className="link-column">
                  <h4><i className="fas fa-info-circle"></i> Resources</h4>
                  <ul>
                    <li><a href="/blog">Health Blog</a></li>
                    <li><a href="/guides">Health Guides</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/all-calculators">All Calculators</a></li>
                  </ul>
                </div>

                <div className="link-column">
                  <h4><i className="fas fa-shield-alt"></i> Legal & Support</h4>
                  <ul>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/terms-of-service">Terms of Service</a></li>
                    <li><a href="/medical-disclaimer">Medical Disclaimer</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/support">Support Center</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">
              <div className="copyright">
                <p>&copy; {new Date().getFullYear()} HealthCalculatorsOnline. All rights reserved.</p>
                <p className="disclaimer">
                  <i className="fas fa-exclamation-triangle"></i>
                  Educational purposes only. Consult healthcare professionals for medical advice.
                </p>
              </div>

              <div className="badges">
                <span className="badge"><i className="fas fa-lock"></i> Secure SSL</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
