import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplet, Menu, X, User, Shield, LogOut, Search, UserPlus, LogIn, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, isDonor, isAdmin, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.navContainer}>
        {/* Brand Logo */}
        <Link to="/" style={styles.brand} onClick={() => setMobileMenuOpen(false)}>
          <div style={styles.logoIconWrapper}>
            <Droplet size={24} color="#FFFFFF" fill="#E63946" />
          </div>
          <div style={styles.brandTextWrapper}>
            <span style={styles.brandTitle}>BLOOD BANK</span>
            <span style={styles.brandSubtitle}>MANAGEMENT SYSTEM</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={styles.desktopLinks}>
          <Link to="/" style={{ ...styles.navLink, ...(isActive('/') ? styles.navLinkActive : {}) }}>
            Home
          </Link>

          <Link to="/search" style={{ ...styles.navLink, ...(isActive('/search') ? styles.navLinkActive : {}) }}>
            <Search size={16} />
            Search Donors
          </Link>

          {!isAuthenticated && (
            <>
              <Link to="/register" style={{ ...styles.navLink, ...(isActive('/register') ? styles.navLinkActive : {}) }}>
                <UserPlus size={16} />
                Donor Registration
              </Link>

              <Link to="/login" style={{ ...styles.navLink, ...(isActive('/login') ? styles.navLinkActive : {}) }}>
                <LogIn size={16} />
                Donor Login
              </Link>

              <Link to="/admin/login" style={{ ...styles.adminLink, ...(isActive('/admin/login') ? styles.adminLinkActive : {}) }}>
                <Shield size={16} />
                Admin
              </Link>
            </>
          )}

          {isDonor && (
            <>
              <Link to="/donor/dashboard" style={{ ...styles.navLink, ...(isActive('/donor/dashboard') ? styles.navLinkActive : {}) }}>
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <div style={styles.userBadge}>
                <User size={14} color="#E63946" />
                <span>{user?.name || 'Donor'}</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin/dashboard" style={{ ...styles.navLink, ...(isActive('/admin/dashboard') ? styles.navLinkActive : {}) }}>
                <LayoutDashboard size={16} />
                Admin Dashboard
              </Link>
              <div style={styles.adminBadge}>
                <Shield size={14} color="#E63946" />
                <span>Admin</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          style={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} color="#FFFFFF" /> : <Menu size={26} color="#FFFFFF" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={styles.mobileDrawer}>
          <Link to="/" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/search" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            <Search size={18} /> Search Donors
          </Link>

          {!isAuthenticated && (
            <>
              <Link to="/register" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <UserPlus size={18} /> Donor Registration
              </Link>
              <Link to="/login" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <LogIn size={18} /> Donor Login
              </Link>
              <Link to="/admin/login" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <Shield size={18} /> Admin Login
              </Link>
            </>
          )}

          {isDonor && (
            <>
              <Link to="/donor/dashboard" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard size={18} /> Donor Dashboard
              </Link>
              <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
                <LogOut size={18} /> Logout ({user?.name || 'Donor'})
              </button>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin/dashboard" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard size={18} /> Admin Dashboard
              </Link>
              <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
                <LogOut size={18} /> Logout (Admin)
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#0B0F19',
    borderBottom: '1px solid #1F2937',
    position: 'sticky',
    top: 0,
    zIndex: 900,
    backdropFilter: 'blur(10px)',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '74px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logoIconWrapper: {
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    backgroundColor: '#1E293B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #334155',
    boxShadow: '0 0 15px rgba(230, 57, 70, 0.3)',
  },
  brandTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '19px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#FFFFFF',
    lineHeight: 1.1,
  },
  brandSubtitle: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: '#E63946',
    lineHeight: 1.2,
  },
  desktopLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#CBD5E1',
    fontSize: '14.5px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  navLinkActive: {
    color: '#FFFFFF',
    backgroundColor: '#1E293B',
  },
  adminLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#94A3B8',
    fontSize: '13.5px',
    fontWeight: '600',
    padding: '7px 14px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#111827',
    transition: 'all 0.2s ease',
  },
  adminLinkActive: {
    color: '#FFFFFF',
    borderColor: '#E63946',
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#1E293B',
    borderRadius: '20px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#F8FAFC',
    border: '1px solid #334155',
  },
  adminBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#1E293B',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#F8FAFC',
    border: '1px solid #E63946',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'transparent',
    border: '1px solid #374151',
    color: '#F87171',
    padding: '7px 14px',
    borderRadius: '8px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  hamburger: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
  },
  mobileDrawer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
    backgroundColor: '#0F172A',
    borderTop: '1px solid #1E293B',
  },
  mobileNavLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#F1F5F9',
    fontSize: '15px',
    fontWeight: '500',
    padding: '10px 14px',
    borderRadius: '8px',
    backgroundColor: '#1E293B',
  },
  mobileLogoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    textAlign: 'left',
    padding: '12px 14px',
    borderRadius: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#EF4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '15px',
  },
};

// CSS injection for responsive navbar media query
const mediaStyle = document.createElement('style');
mediaStyle.innerHTML = `
  @media (max-width: 900px) {
    nav .container > div:nth-child(2) { display: none !important; }
    nav .container > button { display: block !important; }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(mediaStyle);
}

export default Navbar;
