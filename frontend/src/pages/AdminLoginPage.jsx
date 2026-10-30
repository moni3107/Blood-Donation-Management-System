import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/client';
import { Shield, Lock, User, AlertCircle, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
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
    if (!formData.username.trim() || !formData.password) {
      setErrorMsg('Please enter both admin username and password');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await authApi.adminLogin({
        username: formData.username.trim(),
        password: formData.password,
      });

      const { token, username } = response.data.data;
      loginAdmin(token, username);
      navigate('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Invalid administrator credentials';
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
              <Shield size={28} color="#FFFFFF" fill="#E63946" />
            </div>
            <h2 style={styles.title}>Admin Portal</h2>
            <p style={styles.subtitle}>Secure authentication for Blood Bank system administration</p>
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
            <div className="form-group">
              <label className="form-label">
                <User size={14} style={styles.labelIcon} /> Administrator Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. admin"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={14} style={styles.labelIcon} /> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Hint Box for Presentation / Demo Evaluators */}
            <div style={styles.demoHint}>
              <ShieldAlert size={14} color="#D97706" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: '#B45309' }}>
                Default Seed: Username <code>admin</code> | Password <code>admin123</code>
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ marginTop: '14px' }}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  <span>Verifying Administrator...</span>
                </>
              ) : (
                <>
                  <Shield size={18} />
                  <span>Access Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div style={styles.cardFooter}>
            <Link to="/" style={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Return to Public Website</span>
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
    backgroundColor: '#0B0F19',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    maxWidth: '440px',
  },
  card: {
    padding: '38px',
    borderRadius: '20px',
    backgroundColor: '#111827',
    border: '1px solid #1F2937',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(230, 57, 70, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '26px',
  },
  iconCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#1E293B',
    border: '1.5px solid #E63946',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
    boxShadow: '0 0 20px rgba(230, 57, 70, 0.3)',
  },
  title: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '24px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: '13.5px',
    color: '#94A3B8',
    marginTop: '4px',
  },
  labelIcon: {
    marginRight: '4px',
    verticalAlign: 'text-top',
    color: '#E63946',
  },
  demoHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  cardFooter: {
    marginTop: '24px',
    textAlign: 'center',
    borderTop: '1px solid #1F2937',
    paddingTop: '18px',
  },
  backLink: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
};

export default AdminLoginPage;
