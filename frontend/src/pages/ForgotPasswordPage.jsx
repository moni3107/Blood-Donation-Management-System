import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';
import { KeyRound, Mail, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your registered phone number or email address');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await authApi.forgotPassword({ identifier: identifier.trim() });
      setSuccessMsg(response.data?.message || 'OTP has been dispatched to your registered email address.');
      setTimeout(() => {
        navigate('/reset-password', { state: { identifier: identifier.trim() } });
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Account not found with provided identifier';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <div className="card" style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconCircle}>
              <KeyRound size={28} color="#E63946" />
            </div>
            <h2 style={styles.title}>Forgot Password</h2>
            <p style={styles.subtitle}>
              Enter your registered phone number or email to receive a secure 6-digit verification OTP.
            </p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <Mail size={14} style={styles.labelIcon} /> Phone Number or Email Address
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setErrorMsg('');
                }}
                className="form-control"
                placeholder="e.g. 9876543210 or rahul@example.com"
                required
              />
              <span className="form-hint">
                A 6-digit OTP valid for 5 minutes will be dispatched to your registered email.
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ marginTop: '10px' }}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  <span>Generating OTP...</span>
                </>
              ) : (
                <>
                  <span>Send Verification OTP</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div style={styles.cardFooter}>
            <Link to="/login" style={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Back to Donor Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '60px 0 90px 0',
    backgroundColor: '#F8FAFC',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    maxWidth: '460px',
  },
  card: {
    padding: '38px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.06)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '26px',
  },
  iconCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#FEE2E2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
  },
  title: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '24px',
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748B',
    marginTop: '6px',
    lineHeight: 1.5,
  },
  labelIcon: {
    marginRight: '4px',
    verticalAlign: 'text-top',
    color: '#E63946',
  },
  cardFooter: {
    marginTop: '24px',
    textAlign: 'center',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '18px',
  },
  backLink: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
};

export default ForgotPasswordPage;
