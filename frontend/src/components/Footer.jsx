import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Heart, Phone, ShieldCheck, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <div style={styles.brand}>
              <div style={styles.logoIcon}>
                <Droplet size={20} color="#FFFFFF" fill="#E63946" />
              </div>
              <span style={styles.brandText}>BLOOD BANK</span>
            </div>
            <p style={styles.tagline}>
              Dedicated to saving lives by bridging compassionate blood donors with patients and hospitals in critical need.
            </p>
            <div style={styles.mottoBadge}>
              <Heart size={14} color="#E63946" fill="#E63946" />
              <span>Donate Blood | Save Lives</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Quick Navigation</h4>
            <ul style={styles.linkList}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/search" style={styles.link}>Search Blood Donors</Link></li>
              <li><Link to="/register" style={styles.link}>Donor Registration</Link></li>
              <li><Link to="/login" style={styles.link}>Donor Login</Link></li>
              <li><Link to="/admin/login" style={styles.link}>Admin Portal</Link></li>
            </ul>
          </div>

          {/* Blood Compatibility Info */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Universal Donors & Recipients</h4>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoBadge}>O-</span>
                <span style={styles.infoText}>Universal Red Cell Donor</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoBadge}>AB+</span>
                <span style={styles.infoText}>Universal Red Cell Recipient</span>
              </div>
              <p style={styles.smallNote}>
                One single whole blood donation can save up to 3 individual lives.
              </p>
            </div>
          </div>

          {/* Emergency & Support */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>24/7 Blood Helpline</h4>
            <ul style={styles.contactList}>
              <li style={styles.contactItem}>
                <Phone size={16} color="#E63946" />
                <span>+91 1800-111-999 (Toll Free)</span>
              </li>
              <li style={styles.contactItem}>
                <Mail size={16} color="#E63946" />
                <span>support@bloodbank.org</span>
              </li>
              <li style={styles.contactItem}>
                <MapPin size={16} color="#E63946" />
                <span>Central Blood Services, India</span>
              </li>
              <li style={styles.contactItem}>
                <ShieldCheck size={16} color="#10B981" />
                <span>ISO 9001 Certified Blood Bank</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={styles.bottomBar}>
          <p style={styles.motto}>
            Every Drop Counts. Every Donor Matters.
          </p>
          <p style={styles.copyright}>
            &copy; {new Date().getFullYear()} Blood Bank Management System. Academic Project — Web Technology and Application Development.
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#070A10',
    color: '#94A3B8',
    borderTop: '1px solid #1F2937',
    paddingTop: '50px',
    paddingBottom: '25px',
    marginTop: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '32px',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#1E293B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: '0.8px',
  },
  tagline: {
    fontSize: '13.5px',
    lineHeight: 1.6,
    color: '#94A3B8',
  },
  mottoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '20px',
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#E63946',
    width: 'fit-content',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  colTitle: {
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  linkList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '9px',
    padding: 0,
  },
  link: {
    color: '#94A3B8',
    fontSize: '13.5px',
    transition: 'color 0.2s ease',
  },
  infoCard: {
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '10px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  infoBadge: {
    backgroundColor: 'rgba(230, 57, 70, 0.2)',
    color: '#E63946',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    fontSize: '13px',
    padding: '3px 8px',
    borderRadius: '6px',
    minWidth: '38px',
    textAlign: 'center',
  },
  infoText: {
    fontSize: '12.5px',
    color: '#E2E8F0',
    fontWeight: '500',
  },
  smallNote: {
    fontSize: '12px',
    color: '#64748B',
    marginTop: '4px',
    borderTop: '1px solid #1F2937',
    paddingTop: '8px',
  },
  contactList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: 0,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    color: '#CBD5E1',
  },
  bottomBar: {
    borderTop: '1px solid #1F2937',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    textAlign: 'center',
  },
  motto: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '700',
    color: '#E63946',
    letterSpacing: '0.8px',
  },
  copyright: {
    fontSize: '12.5px',
    color: '#64748B',
  },
};

export default Footer;
