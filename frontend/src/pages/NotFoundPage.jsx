import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <div className="card" style={styles.card}>
          <div style={styles.iconCircle}>
            <AlertCircle size={44} color="#E63946" />
          </div>
          <h1 style={styles.code}>404</h1>
          <h2 style={styles.title}>Page Not Found</h2>
          <p style={styles.text}>
            The page you are looking for does not exist or may have been relocated.
          </p>
          <div style={styles.btnRow}>
            <Link to="/" className="btn btn-primary">
              <Home size={18} />
              <span>Return to Home</span>
            </Link>
            <Link to="/search" className="btn btn-secondary">
              <Search size={18} />
              <span>Search Donors</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '80px 0',
    backgroundColor: '#F8FAFC',
    minHeight: '75vh',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    maxWidth: '520px',
  },
  card: {
    textAlign: 'center',
    padding: '50px 30px',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#FEE2E2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  code: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '64px',
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 1,
    margin: 0,
  },
  title: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '22px',
    fontWeight: '700',
    color: '#334155',
    marginTop: '8px',
  },
  text: {
    fontSize: '14.5px',
    color: '#64748B',
    margin: '12px 0 24px 0',
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
  },
};

export default NotFoundPage;
