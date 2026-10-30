import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '../api/client';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, ArrowLeft, Clock } from 'lucide-react';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    identifier: location.state?.identifier || '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown (300s)
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      setErrorMsg('Identifier (phone or email) is required');
      return;
    }
    if (!formData.otp.trim() || formData.otp.trim().length !== 6) {
      setErrorMsg('Please enter the 6-digit OTP received');
      return;
    }
    if (!formData.newPassword || formData.newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMsg('New password and confirm password do not match');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // Step 1: Verify OTP
      await authApi.verifyOtp({
        identifier: formData.identifier.trim(),
        otp: formData.otp.trim(),
      });

      // Step 2: Reset Password
      const resetRes = await authApi.resetPassword({
        identifier: formData.identifier.trim(),
        otp: formData.otp.trim(),
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setSuccessMsg(resetRes.data?.message || 'Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', { state: { phone: formData.identifier } });
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'OTP verification or password update failed';
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
              <ShieldCheck size={28} color="#10B981" />
            </div>
            <h2 style={styles.title}>Reset Password</h2>
            <p style={styles.subtitle}>Enter the 6-digit OTP sent to your registered email and set a new password.</p>
          </div>

          {/* Expiry Countdown Timer */}
          <div style={{ ...styles.timerBanner, backgroundColor: timeLeft > 60 ? '#EFF6FF' : '#FEF2F2' }}>
            <Clock size={16} color={timeLeft > 60 ? '#2563EB' : '#EF4444'} />
            <span style={{ color: timeLeft > 60 ? '#1E40AF' : '#991B1B', fontWeight: '600', fontSize: '13.5px' }}>
              OTP expires in: {formatTimer(timeLeft)}
            </span>
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
            {/* Identifier */}
            <div className="form-group">
              <label className="form-label">Phone Number or Email</label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 9876543210"
                required
              />
            </div>

            {/* OTP */}
            <div className="form-group">
              <label className="form-label">6-Digit OTP Code</label>
              <input
                type="text"
                name="otp"
                maxLength="6"
                value={formData.otp}
                onChange={handleChange}
                className="form-control"
                placeholder="123456"
                style={styles.otpInput}
                required
              />
              <span className="form-hint">Maximum 3 verification attempts permitted.</span>
            </div>

            {/* New Password */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={14} style={styles.labelIcon} /> New Password (Min. 6 chars)
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter new password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={14} style={styles.labelIcon} /> Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Re-enter new password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading || timeLeft <= 0}
              style={{ marginTop: '10px' }}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Reset Password & Proceed to Login</span>
              )}
            </button>
          </form>

          <div style={styles.cardFooter}>
            <Link to="/forgot-password" style={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Request a New OTP</span>
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
    maxWidth: '480px',
  },
  card: {
    padding: '38px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.06)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  iconCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#ECFDF5',
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
    fontSize: '13.5px',
    color: '#64748B',
    marginTop: '4px',
    lineHeight: 1.5,
  },
  timerBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  labelIcon: {
    marginRight: '4px',
    verticalAlign: 'text-top',
    color: '#E63946',
  },
  otpInput: {
    letterSpacing: '6px',
    fontSize: '20px',
    fontWeight: '700',
    textAlign: 'center',
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

export default ResetPasswordPage;
