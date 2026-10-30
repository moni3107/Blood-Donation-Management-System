import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { donorApi } from '../api/client';
import { User, Phone, Mail, MapPin, Droplet, Calendar, CheckCircle2, AlertCircle, Edit3, Save, X, Power, LogOut, Heart, Shield } from 'lucide-react';

const DonorDashboardPage = () => {
  const { user, token, updateDonorUser, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    city: '',
    email: '',
  });

  const [saveLoading, setSaveLoading] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState('');
  const [alertError, setAlertError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setAlertError('');
    try {
      const response = await donorApi.getProfile();
      const data = response.data?.data;
      setProfile(data);
      updateDonorUser(data);
      setEditForm({
        name: data.name || '',
        age: data.age || '',
        bloodGroup: data.bloodGroup || '',
        city: data.city || '',
        email: data.email || '',
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch donor profile';
      setAlertError(msg);
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    if (!profile) return;
    const newStatus = profile.availability === 'YES' ? 'NO' : 'YES';
    setUpdatingAvailability(true);
    setAlertSuccess('');
    setAlertError('');

    try {
      const response = await donorApi.updateAvailability({ availability: newStatus });
      const updated = response.data?.data;
      setProfile(updated);
      updateDonorUser(updated);
      setAlertSuccess(`Availability status changed to ${newStatus}`);
    } catch (err) {
      setAlertError(err.response?.data?.message || 'Failed to update availability status');
    } finally {
      setUpdatingAvailability(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setAlertSuccess('');
    setAlertError('');

    try {
      const payload = {
        name: editForm.name.trim(),
        age: parseInt(editForm.age, 10),
        bloodGroup: editForm.bloodGroup,
        city: editForm.city.trim(),
        email: editForm.email.trim(),
      };

      const response = await donorApi.updateProfile(payload);
      const updated = response.data?.data;
      setProfile(updated);
      updateDonorUser(updated);
      setIsEditing(false);
      setAlertSuccess('Profile information updated successfully!');
    } catch (err) {
      setAlertError(err.response?.data?.message || 'Failed to save profile changes');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div className="spinner spinner-dark" style={{ width: '44px', height: '44px' }} />
        <p style={{ marginTop: '16px', color: '#64748B', fontWeight: '500' }}>Loading your donor dashboard...</p>
      </div>
    );
  }

  const isAvailable = profile?.availability === 'YES';

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        {/* Top Header Card */}
        <div className="card" style={styles.heroCard}>
          <div style={styles.heroLeft}>
            <div style={styles.donorAvatar}>
              <Droplet size={34} color="#FFFFFF" fill="#E63946" />
            </div>
            <div>
              <div style={styles.heroBadgeRow}>
                <span className="badge badge-blood">{profile?.bloodGroup}</span>
                <span className={`badge ${isAvailable ? 'badge-available' : 'badge-unavailable'}`}>
                  <span className="badge-dot" /> {isAvailable ? 'Available for Donation' : 'Currently Unavailable'}
                </span>
              </div>
              <h1 style={styles.heroName}>{profile?.name}</h1>
              <p style={styles.heroPhone}>
                <Phone size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                {profile?.phone} &bull; <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {profile?.city}
              </p>
            </div>
          </div>

          <div style={styles.heroActions}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-secondary"
            >
              <Edit3 size={16} />
              <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
            </button>
            <button onClick={handleLogout} className="btn btn-outline-red">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {alertSuccess && (
          <div className="alert alert-success" style={{ marginTop: '20px' }}>
            <CheckCircle2 size={18} />
            <span>{alertSuccess}</span>
          </div>
        )}

        {alertError && (
          <div className="alert alert-danger" style={{ marginTop: '20px' }}>
            <AlertCircle size={18} />
            <span>{alertError}</span>
          </div>
        )}

        {/* Main Grid */}
        <div style={styles.contentGrid}>
          {/* Left Column: Profile Details / Edit Form */}
          <div style={{ flex: 1.5 }}>
            <div className="card" style={styles.detailsCard}>
              <div style={styles.cardHeaderFlex}>
                <div>
                  <h3 style={styles.cardTitle}>
                    {isEditing ? 'Edit Profile Details' : 'Donor Profile Overview'}
                  </h3>
                  <p style={styles.cardSub}>
                    {isEditing ? 'Update your personal and contact details' : 'Your registered blood donor record'}
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                /* Edit Form */
                <form onSubmit={handleSaveProfile} style={{ marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div style={styles.row2}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        name="age"
                        min="18"
                        max="100"
                        value={editForm.age}
                        onChange={handleEditChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Blood Group</label>
                      <select
                        name="bloodGroup"
                        value={editForm.bloodGroup}
                        onChange={handleEditChange}
                        className="form-control"
                        required
                      >
                        {bloodGroups.map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={styles.row2}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        name="city"
                        value={editForm.city}
                        onChange={handleEditChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div style={styles.formBtnRow}>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-secondary"
                      disabled={saveLoading}
                    >
                      <X size={16} /> Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saveLoading}
                    >
                      {saveLoading ? <span className="spinner" /> : <Save size={16} />}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Profile Display Grid */
                <div style={styles.displayGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Full Name</span>
                    <span style={styles.detailValue}>{profile?.name}</span>
                  </div>

                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Age</span>
                    <span style={styles.detailValue}>{profile?.age} Years</span>
                  </div>

                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Blood Group</span>
                    <span style={{ ...styles.detailValue, color: '#E63946', fontWeight: '800' }}>
                      {profile?.bloodGroup}
                    </span>
                  </div>

                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>City</span>
                    <span style={styles.detailValue}>{profile?.city}</span>
                  </div>

                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Registered Phone</span>
                    <span style={styles.detailValue}>{profile?.phone}</span>
                  </div>

                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Registered Email</span>
                    <span style={styles.detailValue}>{profile?.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Availability & Status Card */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Availability Control Card */}
            <div className="card" style={styles.controlCard}>
              <h3 style={styles.cardTitle}>Donation Availability</h3>
              <p style={styles.cardSub}>
                Controls whether your contact details appear in public emergency donor searches.
              </p>

              <div style={{ ...styles.statusBox, backgroundColor: isAvailable ? '#ECFDF5' : '#FEF2F2', borderColor: isAvailable ? '#A7F3D0' : '#FECACA' }}>
                <div style={styles.statusBoxContent}>
                  <span style={styles.statusLabel}>Current Status:</span>
                  <h4 style={{ ...styles.statusValue, color: isAvailable ? '#059669' : '#DC2626' }}>
                    {profile?.availability}
                  </h4>
                  <p style={{ ...styles.statusDesc, color: isAvailable ? '#065F46' : '#991B1B' }}>
                    {isAvailable
                      ? 'You are actively visible to patients and hospitals in emergency search.'
                      : 'You are currently hidden from public searches.'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleToggleAvailability}
                disabled={updatingAvailability}
                className={`btn btn-block ${isAvailable ? 'btn-danger' : 'btn-success'}`}
                style={{ marginTop: '16px' }}
              >
                {updatingAvailability ? (
                  <>
                    <span className="spinner" />
                    <span>Updating Status...</span>
                  </>
                ) : (
                  <>
                    <Power size={18} />
                    <span>Switch Availability to {isAvailable ? 'NO' : 'YES'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Blood Compatibility Card */}
            <div className="card" style={styles.compatQuickCard}>
              <div style={styles.compatHeader}>
                <Heart size={20} color="#E63946" />
                <h4 style={styles.compatTitle}>Your Donation Impact</h4>
              </div>
              <p style={styles.compatText}>
                As an <strong>{profile?.bloodGroup}</strong> donor, you play a pivotal role in maintaining regional healthcare reserves. Keeping your availability updated saves crucial minutes in critical emergencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '40px 0 80px 0',
    backgroundColor: '#F8FAFC',
    minHeight: '85vh',
  },
  container: {
    maxWidth: '1050px',
  },
  loadingPage: {
    padding: '120px 0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '30px 36px',
    borderRadius: '20px',
    backgroundColor: '#0B0F19',
    color: '#FFFFFF',
    border: '1px solid #1F2937',
    flexWrap: 'wrap',
    gap: '24px',
  },
  heroLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  donorAvatar: {
    width: '68px',
    height: '68px',
    borderRadius: '18px',
    backgroundColor: '#1E293B',
    border: '1.5px solid #E63946',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(230, 57, 70, 0.3)',
  },
  heroBadgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  heroName: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '26px',
    fontWeight: '800',
    color: '#FFFFFF',
    margin: 0,
  },
  heroPhone: {
    fontSize: '14px',
    color: '#94A3B8',
    marginTop: '4px',
  },
  heroActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  contentGrid: {
    display: 'flex',
    gap: '24px',
    marginTop: '24px',
    flexWrap: 'wrap',
  },
  detailsCard: {
    borderRadius: '18px',
    padding: '32px',
  },
  cardHeaderFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: '14px',
  },
  cardTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '20px',
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: '13px',
    color: '#64748B',
    marginTop: '2px',
  },
  displayGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  detailItem: {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  detailLabel: {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#94A3B8',
  },
  detailValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0F172A',
  },
  row2: {
    display: 'flex',
    gap: '16px',
  },
  formBtnRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '20px',
  },
  controlCard: {
    borderRadius: '18px',
    padding: '28px',
  },
  statusBox: {
    border: '1.5px solid',
    borderRadius: '14px',
    padding: '20px',
    marginTop: '16px',
  },
  statusBoxContent: {
    textAlign: 'center',
  },
  statusLabel: {
    fontSize: '12.5px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#64748B',
  },
  statusValue: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '34px',
    fontWeight: '900',
    margin: '4px 0',
  },
  statusDesc: {
    fontSize: '13px',
    lineHeight: 1.4,
  },
  compatQuickCard: {
    borderRadius: '18px',
    padding: '24px',
    backgroundColor: '#FFF5F5',
    border: '1px solid #FECACA',
  },
  compatHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  compatTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '800',
    color: '#991B1B',
  },
  compatText: {
    fontSize: '13.5px',
    color: '#7F1D1D',
    lineHeight: 1.5,
  },
};

export default DonorDashboardPage;
