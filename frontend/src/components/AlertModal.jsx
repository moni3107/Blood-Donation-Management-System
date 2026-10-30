import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const AlertModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmVariant = 'danger', loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.titleWrapper}>
            <div style={{ ...styles.iconBadge, backgroundColor: confirmVariant === 'danger' ? '#FEE2E2' : '#FEF3C7' }}>
              <AlertTriangle size={22} color={confirmVariant === 'danger' ? '#DC2626' : '#D97706'} />
            </div>
            <h3 style={styles.title}>{title}</h3>
          </div>
          <button style={styles.closeBtn} onClick={onClose} disabled={loading}>
            <X size={20} />
          </button>
        </div>

        <p style={styles.message}>{message}</p>

        <div style={styles.actions}>
          <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className={`btn ${confirmVariant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0F172A',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#94A3B8',
    padding: '4px',
  },
  message: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: '24px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
  },
};

export default AlertModal;
