import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = '#E63946', bgGlow }) => {
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <span style={styles.title}>{title}</span>
        <h3 style={styles.value}>{value}</h3>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      {Icon && (
        <div style={{ ...styles.iconWrapper, backgroundColor: bgGlow || 'rgba(230, 57, 70, 0.1)', color: color }}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '32px',
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: '12.5px',
    color: '#94A3B8',
    marginTop: '4px',
  },
  iconWrapper: {
    width: '52px',
    height: '52px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default StatCard;
