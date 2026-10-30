import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../api/client';
import StatCard from '../components/StatCard';
import AlertModal from '../components/AlertModal';
import { Shield, Users, UserCheck, UserX, Droplet, Search, Trash2, LogOut, CheckCircle2, AlertCircle, RefreshCw, Filter, Phone, Mail } from 'lucide-react';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [donors, setDonors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tableSearch, setTableSearch] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');
  const [availFilter, setAvailFilter] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [alertSuccess, setAlertSuccess] = useState('');
  const [alertError, setAlertError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setAlertError('');
    try {
      const [donorsRes, statsRes] = await Promise.all([
        adminApi.getDonors(),
        adminApi.getStatistics(),
      ]);

      setDonors(donorsRes.data?.data || []);
      setStats(statsRes.data?.data || null);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load administrator data';
      setAlertError(msg);
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (donor) => {
    setSelectedDonor(donor);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDonor) return;
    setDeleteLoading(true);
    setAlertSuccess('');
    setAlertError('');

    try {
      await adminApi.deleteDonor(selectedDonor.id);
      setAlertSuccess(`Donor "${selectedDonor.name}" was successfully deleted from MongoDB.`);
      setDeleteModalOpen(false);
      setSelectedDonor(null);
      // Refresh list and stats
      loadDashboardData();
    } catch (err) {
      setAlertError(err.response?.data?.message || 'Failed to delete donor record');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Filter donors for table
  const filteredDonors = donors.filter((d) => {
    const matchesSearch =
      !tableSearch ||
      d.name?.toLowerCase().includes(tableSearch.toLowerCase()) ||
      d.city?.toLowerCase().includes(tableSearch.toLowerCase()) ||
      d.phone?.includes(tableSearch) ||
      d.email?.toLowerCase().includes(tableSearch.toLowerCase());

    const matchesBlood = !bloodFilter || d.bloodGroup === bloodFilter;
    const matchesAvail = !availFilter || d.availability === availFilter;

    return matchesSearch && matchesBlood && matchesAvail;
  });

  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        {/* Dashboard Top Header */}
        <div style={styles.dashboardHeader}>
          <div style={styles.headerLeft}>
            <div style={styles.adminIcon}>
              <Shield size={28} color="#FFFFFF" />
            </div>
            <div>
              <div style={styles.badgeRow}>
                <span style={styles.superBadge}>SYSTEM ADMINISTRATION</span>
                <span style={styles.onlineDot} />
                <span style={{ fontSize: '13px', color: '#10B981', fontWeight: '600' }}>Live MongoDB sync</span>
              </div>
              <h1 style={styles.headerTitle}>Blood Bank Admin Dashboard</h1>
              <p style={styles.headerSub}>Manage registered donors, monitor blood group inventories, and review statistics.</p>
            </div>
          </div>

          <div style={styles.headerActions}>
            <button onClick={loadDashboardData} className="btn btn-secondary" title="Refresh Database Data">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button onClick={handleLogout} className="btn btn-outline-red">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
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

        {/* Top Metric Cards */}
        <div style={styles.statsGrid}>
          <StatCard
            title="Total Registered Donors"
            value={stats?.totalDonors ?? donors.length}
            subtitle="All verified records in blood_db"
            icon={Users}
            color="#E63946"
            bgGlow="rgba(230, 57, 70, 0.12)"
          />

          <StatCard
            title="Available Donors"
            value={stats?.availableDonors ?? 0}
            subtitle="Actively available for emergency calls"
            icon={UserCheck}
            color="#10B981"
            bgGlow="rgba(16, 185, 129, 0.12)"
          />

          <StatCard
            title="Unavailable Donors"
            value={stats?.unavailableDonors ?? 0}
            subtitle="Status set to NO by donor"
            icon={UserX}
            color="#EF4444"
            bgGlow="rgba(239, 68, 68, 0.12)"
          />

          <StatCard
            title="Active Blood Types"
            value={stats?.bloodGroupCounts ? Object.values(stats.bloodGroupCounts).filter((c) => c > 0).length : 8}
            subtitle="Types represented in database"
            icon={Droplet}
            color="#8B5CF6"
            bgGlow="rgba(139, 92, 246, 0.12)"
          />
        </div>

        {/* Blood Group Inventory Breakdown */}
        <div className="card" style={{ marginTop: '28px' }}>
          <div style={styles.cardHeader}>
            <div>
              <h3 className="card-title">Blood-Group-Wise Donor Distribution</h3>
              <p className="card-subtitle">Real-time counts stored in MongoDB collection 'donors'</p>
            </div>
          </div>

          <div style={styles.bloodGroupGrid}>
            {bloodGroups.map((bg) => {
              const count = stats?.bloodGroupCounts?.[bg] ?? 0;
              const percent = stats?.totalDonors ? Math.round((count / stats.totalDonors) * 100) : 0;
              return (
                <div key={bg} style={styles.bgCard}>
                  <div style={styles.bgHeader}>
                    <span style={styles.bgBadge}>{bg}</span>
                    <span style={styles.bgCount}>{count}</span>
                  </div>
                  <div style={styles.progressBarBg}>
                    <div style={{ ...styles.progressBarFill, width: `${Math.max(percent, 8)}%` }} />
                  </div>
                  <span style={styles.bgPercent}>{percent}% of total registry</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* View Donors Table Card */}
        <div className="card" style={{ marginTop: '28px' }}>
          <div style={styles.cardHeaderFlex}>
            <div>
              <h3 className="card-title">Registered Donors Management</h3>
              <p className="card-subtitle">
                Showing {filteredDonors.length} of {donors.length} registered donors
              </p>
            </div>

            {/* Filter Bar */}
            <div style={styles.filterControls}>
              {/* Text Search */}
              <div style={styles.searchInputWrapper}>
                <Search size={15} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Filter by name, city, phone..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  style={styles.tableSearchInput}
                />
              </div>

              {/* Blood Group Filter */}
              <select
                value={bloodFilter}
                onChange={(e) => setBloodFilter(e.target.value)}
                style={styles.tableSelect}
              >
                <option value="">All Blood</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>

              {/* Availability Filter */}
              <select
                value={availFilter}
                onChange={(e) => setAvailFilter(e.target.value)}
                style={styles.tableSelect}
              >
                <option value="">All Status</option>
                <option value="YES">Available (YES)</option>
                <option value="NO">Unavailable (NO)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <div className="spinner spinner-dark" />
              <p style={{ marginTop: '12px', color: '#64748B' }}>Fetching donors from MongoDB...</p>
            </div>
          ) : filteredDonors.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748B' }}>
              <p style={{ fontSize: '15px', fontWeight: '500' }}>No donors match the current filters.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Donor Name</th>
                    <th>Age</th>
                    <th>Blood Group</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Availability</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <strong>{d.name}</strong>
                      </td>
                      <td>{d.age} yrs</td>
                      <td>
                        <span className="badge badge-blood">{d.bloodGroup}</span>
                      </td>
                      <td>{d.city}</td>
                      <td>
                        <code style={styles.codePill}>{d.phone}</code>
                      </td>
                      <td>
                        <span style={{ fontSize: '13px', color: '#475569' }}>{d.email}</span>
                      </td>
                      <td>
                        <span className={`badge ${d.availability === 'YES' ? 'badge-available' : 'badge-unavailable'}`}>
                          <span className="badge-dot" /> {d.availability}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenDelete(d)}
                          className="btn btn-danger btn-sm"
                          title="Delete Donor Record"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Delete Donor */}
      <AlertModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedDonor(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Donor Deletion"
        message={`Are you sure you want to permanently delete donor "${selectedDonor?.name}" (${selectedDonor?.phone})? This will remove their record from MongoDB collection 'donors'. This action cannot be reversed.`}
        confirmText="Yes, Delete Record"
        confirmVariant="danger"
        loading={deleteLoading}
      />
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
    maxWidth: '1240px',
  },
  dashboardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 32px',
    backgroundColor: '#0B0F19',
    borderRadius: '20px',
    border: '1px solid #1F2937',
    color: '#FFFFFF',
    flexWrap: 'wrap',
    gap: '20px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  adminIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundColor: '#E63946',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(230, 57, 70, 0.4)',
  },
  badgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  superBadge: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#E63946',
    backgroundColor: 'rgba(230, 57, 70, 0.15)',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  onlineDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
  },
  headerTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '26px',
    fontWeight: '800',
    color: '#FFFFFF',
    margin: 0,
  },
  headerSub: {
    fontSize: '13.5px',
    color: '#94A3B8',
    marginTop: '4px',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginTop: '28px',
  },
  cardHeader: {
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: '16px',
    marginBottom: '20px',
  },
  cardHeaderFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    borderBottom: '1px solid #F1F5F9',
    paddingBottom: '18px',
    marginBottom: '20px',
  },
  bloodGroupGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '14px',
  },
  bgCard: {
    backgroundColor: '#F8FAFC',
    border: '1.5px solid #E2E8F0',
    borderRadius: '12px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bgHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bgBadge: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '16px',
    fontWeight: '800',
    color: '#BA181B',
  },
  bgCount: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '20px',
    fontWeight: '800',
    color: '#0F172A',
  },
  progressBarBg: {
    height: '6px',
    backgroundColor: '#E2E8F0',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E63946',
    borderRadius: '3px',
  },
  bgPercent: {
    fontSize: '11px',
    color: '#64748B',
  },
  filterControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  searchInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#F8FAFC',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    padding: '8px 12px',
  },
  tableSearchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '13.5px',
    fontFamily: 'inherit',
    minWidth: '200px',
  },
  tableSelect: {
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    padding: '8px 12px',
    backgroundColor: '#F8FAFC',
    fontSize: '13.5px',
    fontFamily: 'inherit',
    outline: 'none',
    cursor: 'pointer',
  },
  codePill: {
    backgroundColor: '#F1F5F9',
    padding: '3px 7px',
    borderRadius: '5px',
    fontSize: '13px',
    color: '#334155',
  },
};

export default AdminDashboardPage;
