import React from 'react';
import { Phone, MapPin, CheckCircle, Droplet } from 'lucide-react';

const DonorCard = ({ donor }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.donorInfo}>
          <div style={styles.avatar}>
            <Droplet size={20} color="#E63946" fill="#E63946" />
          </div>
          <div>
            <h4 style={styles.name}>{donor.name}</h4>
            <div style={styles.cityRow}>
              <MapPin size={13} color="#64748B" />
              <span style={styles.city}>{donor.city}</span>
            </div>
          </div>
        </div>
        <div style={styles.bloodBadge}>
          {donor.bloodGroup}
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.availability}>
          <span style={styles.greenDot} />
          <span style={styles.availText}>Available to Donate</span>
        </div>
        <a href={`tel:${donor.phone}`} style={styles.phoneBtn}>
          <Phone size={14} />
          <span>{donor.phone}</span>
        </a>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '14px',
    border: '1.5px solid #E2E8F0',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.2s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  donorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  name: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '17px',
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 1.2,
  },
  cityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '3px',
  },
  city: {
    fontSize: '13px',
    color: '#64748B',
  },
  bloodBadge: {
    backgroundColor: '#FEE2E2',
    color: '#BA181B',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '18px',
    fontWeight: '800',
    padding: '6px 14px',
    borderRadius: '10px',
    border: '1.5px solid #FECACA',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 4px rgba(230, 57, 70, 0.1)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '14px',
    gap: '10px',
  },
  availability: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  greenDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
  },
  availText: {
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#059669',
  },
  phoneBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
};

export default DonorCard;
