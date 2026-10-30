import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Heart, Search, UserPlus, LogIn, Shield, Activity, Users, Clock, Award, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  const bloodGroups = [
    { group: 'O+', give: 'O+, A+, B+, AB+', receive: 'O+, O-' },
    { group: 'O-', give: 'All Blood Types (Universal)', receive: 'O- Only' },
    { group: 'A+', give: 'A+, AB+', receive: 'A+, A-, O+, O-' },
    { group: 'A-', give: 'A+, A-, AB+, AB-', receive: 'A-, O-' },
    { group: 'B+', give: 'B+, AB+', receive: 'B+, B-, O+, O-' },
    { group: 'B-', give: 'B+, B-, AB+, AB-', receive: 'B-, O-' },
    { group: 'AB+', give: 'AB+ Only', receive: 'All Types (Universal)' },
    { group: 'AB-', give: 'AB+, AB-', receive: 'AB-, A-, B-, O-' },
  ];

  return (
    <div style={styles.page}>
      {/* Dark Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroContent}>
            {/* Tagline Pill */}
            <div style={styles.taglinePill}>
              <Heart size={16} color="#E63946" fill="#E63946" />
              <span>Donate Blood | Save Lives</span>
            </div>

            {/* Main Headings */}
            <h1 style={styles.mainHeading}>BLOOD BANK</h1>
            <h2 style={styles.subHeading}>MANAGEMENT SYSTEM</h2>

            {/* Introduction */}
            <p style={styles.heroIntro}>
              Every two seconds, someone in India requires blood for trauma care, major surgeries, cancer therapies, or chronic hematological conditions. Our digital Blood Bank platform connects altruistic donors directly with patients and healthcare centers in real-time, ensuring life-saving blood is never more than a click away.
            </p>

            {/* Navigation & Action Buttons */}
            <div style={styles.actionButtons}>
              <Link to="/register" className="btn btn-primary btn-lg">
                <UserPlus size={20} />
                <span>Donor Registration</span>
              </Link>

              <Link to="/search" className="btn btn-outline-light btn-lg">
                <Search size={20} />
                <span>Search Blood Donors</span>
              </Link>

              <Link to="/login" style={styles.secondaryBtn}>
                <LogIn size={18} />
                <span>Donor Login</span>
              </Link>

              <Link to="/admin/login" style={styles.adminPortalBtn}>
                <Shield size={18} />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div style={styles.heroVisual}>
            <div style={styles.quickStatCard}>
              <div style={styles.pulseIcon}>
                <Droplet size={38} color="#FFFFFF" fill="#E63946" />
              </div>
              <h3 style={styles.statNumber}>1 Donation</h3>
              <p style={styles.statLabel}>Can Save Up To 3 Lives</p>
              <div style={styles.statDivider} />
              <div style={styles.statGrid}>
                <div>
                  <span style={styles.miniStatNum}>350-450 ml</span>
                  <span style={styles.miniStatDesc}>Average Donation</span>
                </div>
                <div>
                  <span style={styles.miniStatNum}>15 Mins</span>
                  <span style={styles.miniStatDesc}>Quick Procedure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Light-gray Feature Highlights */}
      <section style={styles.featuresSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>Why Every Donor Counts</span>
            <h2 style={styles.sectionTitle}>Built for Rapid Emergency Response</h2>
            <p style={styles.sectionDesc}>
              A high-precision healthcare portal ensuring transparency, quick search, and maximum donor convenience.
            </p>
          </div>

          <div style={styles.featureGrid}>
            <div className="card" style={styles.featureCard}>
              <div style={{ ...styles.featureIcon, backgroundColor: '#FEE2E2', color: '#E63946' }}>
                <Search size={24} />
              </div>
              <h3 style={styles.featureTitle}>Instant Public Search</h3>
              <p style={styles.featureText}>
                Filter voluntary donors instantly by blood group and city. Immediately connect with available donors during urgent medical situations.
              </p>
            </div>

            <div className="card" style={styles.featureCard}>
              <div style={{ ...styles.featureIcon, backgroundColor: '#ECFDF5', color: '#10B981' }}>
                <Activity size={24} />
              </div>
              <h3 style={styles.featureTitle}>Real-time Availability</h3>
              <p style={styles.featureText}>
                Donors maintain full control over their availability status. Toggle YES or NO anytime with one click from their private dashboard.
              </p>
            </div>

            <div className="card" style={styles.featureCard}>
              <div style={{ ...styles.featureIcon, backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                <Shield size={24} />
              </div>
              <h3 style={styles.featureTitle}>Privacy & Security</h3>
              <p style={styles.featureText}>
                BCrypt encrypted passwords, stateless JWT authentication, and secure OTP verification for password recovery protect donor identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Compatibility Guide */}
      <section style={styles.compatibilitySection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <span style={styles.sectionBadge}>Medical Compatibility</span>
            <h2 style={styles.sectionTitle}>Blood Type Donation Matrix</h2>
            <p style={styles.sectionDesc}>
              Understand how your blood type connects with those in urgent clinical need.
            </p>
          </div>

          <div style={styles.compatGrid}>
            {bloodGroups.map((b) => (
              <div key={b.group} style={styles.compatCard}>
                <div style={styles.compatBadge}>{b.group}</div>
                <div style={styles.compatDetails}>
                  <div style={styles.compatRow}>
                    <span style={styles.compatLabel}>Can Donate To:</span>
                    <span style={styles.compatVal}>{b.give}</span>
                  </div>
                  <div style={styles.compatRow}>
                    <span style={styles.compatLabel}>Can Receive From:</span>
                    <span style={styles.compatVal}>{b.receive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Checklist */}
      <section style={styles.eligibilitySection}>
        <div className="container" style={styles.eligibilityContainer}>
          <div style={styles.eligibilityCard}>
            <div style={styles.eligibilityHeader}>
              <Award size={32} color="#E63946" />
              <div>
                <h3 style={styles.eligibilityTitle}>Basic Donor Eligibility Criteria</h3>
                <p style={styles.eligibilitySub}>Check if you are ready to be a hero today</p>
              </div>
            </div>
            <div style={styles.checklistGrid}>
              <div style={styles.checkItem}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Age between 18 and 65 years</span>
              </div>
              <div style={styles.checkItem}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Weight minimum 50 kg (110 lbs)</span>
              </div>
              <div style={styles.checkItem}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Hemoglobin level at least 12.5 g/dL</span>
              </div>
              <div style={styles.checkItem}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Good general health condition on donation day</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Call to Action */}
      <section style={styles.ctaSection}>
        <div className="container" style={styles.ctaContainer}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaHeading}>Ready to Save Someone's Life Today?</h2>
            <p style={styles.ctaText}>
              Registration takes less than two minutes. Become part of an emergency life-support network and make a difference when it matters most.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/register" className="btn btn-primary btn-lg">
                <UserPlus size={20} />
                <span>Register as a Blood Donor Now</span>
              </Link>
              <Link to="/search" className="btn btn-outline-light btn-lg">
                <Search size={20} />
                <span>Find Donors Near You</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    backgroundColor: '#0B0F19',
    backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(230, 57, 70, 0.15) 0%, transparent 60%)',
    color: '#FFFFFF',
    padding: '80px 0 90px 0',
    borderBottom: '1px solid #1E293B',
  },
  heroContainer: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '48px',
    alignItems: 'center',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  taglinePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    backgroundColor: 'rgba(230, 57, 70, 0.15)',
    border: '1px solid rgba(230, 57, 70, 0.35)',
    borderRadius: '30px',
    fontSize: '13.5px',
    fontWeight: '700',
    color: '#FF6B6B',
    width: 'fit-content',
    letterSpacing: '0.5px',
  },
  mainHeading: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '54px',
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: '2px',
    lineHeight: 1,
    margin: 0,
  },
  subHeading: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '28px',
    fontWeight: '800',
    color: '#E63946',
    letterSpacing: '3px',
    lineHeight: 1.1,
    margin: 0,
  },
  heroIntro: {
    fontSize: '16px',
    lineHeight: 1.7,
    color: '#CBD5E1',
    maxWidth: '580px',
    marginTop: '6px',
  },
  actionButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    marginTop: '12px',
    alignItems: 'center',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 22px',
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    borderRadius: '10px',
    border: '1px solid #334155',
    fontWeight: '600',
    fontSize: '15px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  adminPortalBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 20px',
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    color: '#94A3B8',
    borderRadius: '10px',
    border: '1px solid #374151',
    fontWeight: '600',
    fontSize: '14.5px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  heroVisual: {
    display: 'flex',
    justifyContent: 'center',
  },
  quickStatCard: {
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '24px',
    padding: '36px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(230, 57, 70, 0.15)',
    textAlign: 'center',
    maxWidth: '380px',
    width: '100%',
  },
  pulseIcon: {
    width: '76px',
    height: '76px',
    borderRadius: '22px',
    backgroundColor: '#1E293B',
    border: '1.5px solid #E63946',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px auto',
    boxShadow: '0 0 25px rgba(230, 57, 70, 0.4)',
  },
  statNumber: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '32px',
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '15px',
    color: '#E63946',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  statDivider: {
    height: '1px',
    backgroundColor: '#1F2937',
    margin: '24px 0',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  miniStatNum: {
    display: 'block',
    fontSize: '18px',
    fontWeight: '700',
    color: '#F8FAFC',
  },
  miniStatDesc: {
    fontSize: '12px',
    color: '#94A3B8',
  },
  featuresSection: {
    padding: '80px 0',
    backgroundColor: '#F8FAFC',
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 50px auto',
  },
  sectionBadge: {
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#E63946',
    marginBottom: '8px',
  },
  sectionTitle: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: '12px',
  },
  sectionDesc: {
    fontSize: '16px',
    color: '#64748B',
    lineHeight: 1.6,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
  },
  featureCard: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
  },
  featureIcon: {
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0F172A',
  },
  featureText: {
    fontSize: '14.5px',
    color: '#64748B',
    lineHeight: 1.6,
  },
  compatibilitySection: {
    padding: '80px 0',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #F1F5F9',
  },
  compatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
  },
  compatCard: {
    border: '1.5px solid #E2E8F0',
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: '#F8FAFC',
    transition: 'all 0.2s ease',
  },
  compatBadge: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '22px',
    fontWeight: '900',
    backgroundColor: '#FEE2E2',
    color: '#BA181B',
    minWidth: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(230, 57, 70, 0.1)',
  },
  compatDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  compatRow: {
    display: 'flex',
    flexDirection: 'column',
  },
  compatLabel: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#94A3B8',
  },
  compatVal: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0F172A',
  },
  eligibilitySection: {
    padding: '40px 0 80px 0',
    backgroundColor: '#FFFFFF',
  },
  eligibilityContainer: {
    maxWidth: '960px',
  },
  eligibilityCard: {
    backgroundColor: '#FFF5F5',
    border: '1.5px solid #FECACA',
    borderRadius: '18px',
    padding: '36px',
  },
  eligibilityHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  eligibilityTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#991B1B',
  },
  eligibilitySub: {
    fontSize: '14px',
    color: '#7F1D1D',
  },
  checklistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1E293B',
    backgroundColor: '#FFFFFF',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #FEE2E2',
  },
  ctaSection: {
    backgroundColor: '#0B0F19',
    color: '#FFFFFF',
    padding: '80px 0',
    textAlign: 'center',
    borderTop: '1px solid #1E293B',
  },
  ctaContainer: {
    maxWidth: '750px',
  },
  ctaContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  ctaHeading: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '36px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  ctaText: {
    fontSize: '16.5px',
    color: '#CBD5E1',
    lineHeight: 1.6,
  },
  ctaButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    marginTop: '10px',
  },
};

// Responsive CSS injection for hero grid
const homeMedia = document.createElement('style');
homeMedia.innerHTML = `
  @media (max-width: 900px) {
    section[style*="padding: 80px"] > .container {
      grid-template-columns: 1fr !important;
    }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(homeMedia);
}

export default HomePage;
