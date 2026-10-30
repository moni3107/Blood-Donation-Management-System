import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { donorApi } from '../api/client';
import { UserPlus, User, Mail, Phone, MapPin, Lock, Droplet, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

const DonorRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      newErrors.age = 'Age must be between 18 and 100 years';
    }

    if (!formData.bloodGroup) newErrors.bloodGroup = 'Please select a blood group';

    if (!formData.city.trim()) newErrors.city = 'City is required';

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number (10 to 15 digits)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    setSuccessMsg('');

    try {
      const payload = {
        name: formData.name.trim(),
        age: parseInt(formData.age, 10),
        bloodGroup: formData.bloodGroup,
        city: formData.city.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await donorApi.register(payload);
      setSuccessMsg(response.data?.message || 'Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', { state: { phone: formData.phone } });
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed. Please check your inputs.';
      setServerError(msg);
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
              <UserPlus size={26} color="#E63946" />
            </div>
            <div>
              <h2 style={styles.title}>Register as Blood Donor</h2>
              <p style={styles.subtitle}>Join our life-saving community. Every registration counts.</p>
            </div>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {serverError && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{serverError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div style={styles.grid2}>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">
                  <User size={14} style={styles.labelIcon} /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Rahul Sharma"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Age */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={14} style={styles.labelIcon} /> Age (18 - 100) *
                </label>
                <input
                  type="number"
                  name="age"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. 25"
                />
                {errors.age && <span className="form-error">{errors.age}</span>}
              </div>
            </div>

            <div style={styles.grid2}>
              {/* Blood Group */}
              <div className="form-group">
                <label className="form-label">
                  <Droplet size={14} style={styles.labelIcon} /> Blood Group *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">-- Select Blood Group --</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                {errors.bloodGroup && <span className="form-error">{errors.bloodGroup}</span>}
              </div>

              {/* City */}
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={14} style={styles.labelIcon} /> City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Chennai, Bangalore"
                />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>
            </div>

            <div style={styles.grid2}>
              {/* Phone */}
              <div className="form-group">
                <label className="form-label">
                  <Phone size={14} style={styles.labelIcon} /> Phone Number (Used for Login) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. 9876543210"
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  <Mail size={14} style={styles.labelIcon} /> Email Address (For OTP Recovery) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. rahul@example.com"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div style={styles.grid2}>
              {/* Password */}
              <div className="form-group">
                <label className="form-label">
                  <Lock size={14} style={styles.labelIcon} /> Password (Min. 6 chars) *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Create a strong password"
                />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label">
                  <Lock size={14} style={styles.labelIcon} /> Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Re-type password"
                />
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Availability Notice */}
            <div style={styles.noticeBox}>
              <span style={styles.noticeDot} />
              <p style={styles.noticeText}>
                Your donation availability will be set to <strong>YES</strong> by default. You can adjust this anytime from your private dashboard.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ marginTop: '12px' }}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  <span>Registering Donor Profile...</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Complete Donor Registration</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div style={styles.cardFooter}>
            <p style={styles.footerText}>
              Already registered as a donor?{' '}
              <Link to="/login" style={styles.footerLink}>
                Login to your account
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
    padding: '50px 0 80px 0',
    backgroundColor: '#F8FAFC',
    minHeight: '80vh',
  },
  container: {
    maxWidth: '720px',
  },
  card: {
    padding: '36px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1px solid #F1F5F9',
  },
  iconCircle: {
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    backgroundColor: '#FEE2E2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
    marginTop: '2px',
  },
  labelIcon: {
    marginRight: '4px',
    verticalAlign: 'text-top',
    color: '#E63946',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px',
  },
  noticeBox: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: '10px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '12px 0 20px 0',
  },
  noticeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    flexShrink: 0,
  },
  noticeText: {
    fontSize: '13px',
    color: '#1E40AF',
    lineHeight: 1.5,
  },
  cardFooter: {
    marginTop: '24px',
    textAlign: 'center',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '20px',
  },
  footerText: {
    fontSize: '14px',
    color: '#64748B',
  },
  footerLink: {
    color: '#E63946',
    fontWeight: '700',
    textDecoration: 'none',
  },
};

export default DonorRegistrationPage;
