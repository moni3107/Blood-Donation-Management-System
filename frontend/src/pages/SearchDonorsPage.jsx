import React, { useState, useEffect } from 'react';
import { donorApi } from '../api/client';
import DonorCard from '../components/DonorCard';
import { Search, RotateCcw, Droplet, MapPin, AlertCircle, HeartHandshake, Phone, CheckCircle2, LayoutGrid, List } from 'lucide-react';

const SearchDonorsPage = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Initial load: fetch available donors
  useEffect(() => {
    fetchDonors('', '');
  }, []);

  const fetchDonors = async (bg, c) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const params = {};
      if (bg && bg !== 'ALL') params.bloodGroup = bg;
      if (c && c.trim()) params.city = c.trim();

      const response = await donorApi.search(params);
      setDonors(response.data?.data || []);
      setHasSearched(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch blood donors. Please check connection.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDonors(bloodGroup, city);
  };

  const handleReset = () => {
    setBloodGroup('');
    setCity('');
    fetchDonors('', '');
  };

  return (
    <div style={styles.page}>
      {/* Top Banner */}
      <div style={styles.topBanner}>
        <div className="container">
          <div style={styles.bannerContent}>
            <div style={styles.badgePill}>
              <Droplet size={14} color="#E63946" fill="#E63946" />
              <span>Public Search Directory</span>
            </div>
            <h1 style={styles.bannerTitle}>Find Available Blood Donors</h1>
            <p style={styles.bannerSubtitle}>
              Connect with registered voluntary donors who are actively available for donation.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-40px' }}>
        {/* Search & Filter Form Card */}
        <div className="card" style={styles.searchCard}>
          <form onSubmit={handleSearch} style={styles.formGrid}>
            {/* Blood Group */}
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="form-label">
                <Droplet size={14} style={{ color: '#E63946', marginRight: '4px' }} /> Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="form-control"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="form-group" style={{ marginBottom: 0, flex: 1.2 }}>
              <label className="form-label">
                <MapPin size={14} style={{ color: '#E63946', marginRight: '4px' }} /> City (Optional)
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
                placeholder="e.g. Chennai, Bangalore, Mumbai"
              />
            </div>

            {/* Buttons */}
            <div style={styles.btnRow}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1.5 }}>
                {loading ? <span className="spinner" /> : <Search size={16} />}
                <span>Search Donors</span>
              </button>

              <button type="button" onClick={handleReset} className="btn btn-secondary" disabled={loading} style={{ flex: 1 }}>
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            </div>
          </form>
        </div>

        {/* Status / Error Message */}
        {errorMsg && (
          <div className="alert alert-danger" style={{ marginTop: '24px' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Results Bar */}
        <div style={styles.resultsBar}>
          <div>
            <h3 style={styles.resultsCount}>
              {loading ? 'Searching database...' : `${donors.length} Available Donor${donors.length === 1 ? '' : 's'} Found`}
            </h3>
            <p style={styles.resultsNote}>
              Only verified donors with current availability status 'YES' are listed.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div style={styles.viewToggle}>
            <button
              onClick={() => setViewMode('grid')}
              style={{ ...styles.toggleBtn, ...(viewMode === 'grid' ? styles.toggleBtnActive : {}) }}
              title="Card View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{ ...styles.toggleBtn, ...(viewMode === 'table' ? styles.toggleBtnActive : {}) }}
              title="Table View"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div className="spinner spinner-dark" style={{ width: '40px', height: '40px' }} />
            <p style={styles.loadingText}>Fetching available donors from blood_db...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && donors.length === 0 && hasSearched && (
          <div className="card" style={styles.emptyCard}>
            <div style={styles.emptyIconCircle}>
              <HeartHandshake size={36} color="#94A3B8" />
            </div>
            <h3 style={styles.emptyTitle}>No Matching Donors Available Right Now</h3>
            <p style={styles.emptyText}>
              We couldn't find any donors currently available for {bloodGroup || 'all blood groups'} {city ? `in ${city}` : ''}.
              Try broadening your search or resetting filters to view all donors across nearby cities.
            </p>
            <button onClick={handleReset} className="btn btn-outline-red" style={{ marginTop: '16px' }}>
              <RotateCcw size={16} />
              <span>Show All Available Donors</span>
            </button>
          </div>
        )}

        {/* Results List: Grid View */}
        {!loading && donors.length > 0 && viewMode === 'grid' && (
          <div style={styles.grid}>
            {donors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
            ))}
          </div>
        )}

        {/* Results List: Table View */}
        {!loading && donors.length > 0 && viewMode === 'table' && (
          <div className="table-responsive" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Blood Group</th>
                  <th>City</th>
                  <th>Phone Number</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <strong>{d.name}</strong>
                    </td>
                    <td>
                      <span className="badge badge-blood">{d.bloodGroup}</span>
                    </td>
                    <td>{d.city}</td>
                    <td>
                      <code>{d.phone}</code>
                    </td>
                    <td>
                      <span className="badge badge-available">
                        <span className="badge-dot" /> Available
                      </span>
                    </td>
                    <td>
                      <a href={`tel:${d.phone}`} className="btn btn-primary btn-sm">
                        <Phone size={13} />
                        <span>Call</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    paddingBottom: '80px',
    backgroundColor: '#F8FAFC',
    minHeight: '85vh',
  },
  topBanner: {
    backgroundColor: '#0B0F19',
    color: '#FFFFFF',
    padding: '50px 0 70px 0',
    borderBottom: '1px solid #1E293B',
  },
  bannerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '10px',
  },
  badgePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 14px',
    backgroundColor: 'rgba(230, 57, 70, 0.15)',
    border: '1px solid rgba(230, 57, 70, 0.3)',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#FF6B6B',
  },
  bannerTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '34px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: '15.5px',
    color: '#94A3B8',
    maxWidth: '560px',
  },
  searchCard: {
    padding: '24px 28px',
    borderRadius: '18px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    border: '1px solid #E2E8F0',
  },
  formGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
  },
  btnRow: {
    display: 'flex',
    gap: '10px',
    flex: 1.5,
  },
  resultsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '36px 0 20px 0',
    flexWrap: 'wrap',
    gap: '16px',
  },
  resultsCount: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0F172A',
  },
  resultsNote: {
    fontSize: '13px',
    color: '#64748B',
    marginTop: '2px',
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    padding: '4px',
    gap: '4px',
  },
  toggleBtn: {
    background: 'transparent',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#64748B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  toggleBtnActive: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
  },
  loadingContainer: {
    padding: '60px 0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  loadingText: {
    fontSize: '14px',
    color: '#64748B',
  },
  emptyCard: {
    textAlign: 'center',
    padding: '50px 20px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyIconCircle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#F1F5F9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14.5px',
    color: '#64748B',
    maxWidth: '520px',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
};

export default SearchDonorsPage;
