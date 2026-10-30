import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/client';
import { LogIn, Phone, Lock, AlertCircle, Droplet, ArrowRight, KeyRound } from 'lucide-react';

const DonorLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginDonor } = useAuth();

  const [formData, setFormData] = useState({
    phone: location.state?.phone || '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone.trim() || !formData.password) {
      setErrorMsg('Please enter both your registered phone number and password');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await authApi.donorLogin({
        phone: formData.phone.trim(),
        password: formData.password,
      });

      const { token, donor } = response.data.data;
      loginDonor(token, donor);
      navigate('/donor/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Invalid phone number or password';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <div className="card" style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.iconCircle}>
              <Droplet size={28} color="#FFFFFF" fill="#E63946" />
            </div>
            <h2 style={styles.title}>Donor Login</h2>
            <p style={styles.subtitle}>Sign in to manage your donor profile & availability</p>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                <Phone size={14} style={styles.labelIcon} /> Registered Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 9876543210"
                autoComplete="tel"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <div style={styles.passwordLabelRow}>
                <label className="form-label" style={{ marginBottom: 0 }}>
                  <Lock size={14} style={styles.labelIcon} /> Password
                </label>
                <Link to="/forgot-password" style={styles.forgotLink}>
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your account password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ marginTop: '10px' }}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In as Donor</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={styles.cardFooter}>
            <p style={styles.footerText}>
              Not registered as a donor yet?{' '}
              <Link to="/register" style={styles.registerLink}>
                Register now <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
              </Link>
            </p>
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
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    boxShadow: '0 4px 15px rgba(230, 57, 70, 0.25)',
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
    marginTop: '4px',
  },
  labelIcon: {
    marginRight: '4px',
    verticalAlign: 'text-top',
    color: '#E63946',
  },
  passwordLabelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  forgotLink: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#E63946',
    textDecoration: 'none',
  },
  cardFooter: {
    marginTop: '26px',
    textAlign: 'center',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '20px',
  },
  footerText: {
    fontSize: '14px',
    color: '#64748B',
  },
  registerLink: {
    color: '#E63946',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
  },
};

export default DonorLoginPage;
