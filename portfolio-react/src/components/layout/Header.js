import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${props => props.scrolled ? 'rgba(12, 20, 33, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'};
  padding: ${props => props.scrolled ? '15px 0' : '25px 0'};
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;

const NavContainer = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  
  span {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const MenuToggle = styled.div`
  display: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled(motion.nav)`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 250px;
    height: 100vh;
    background: var(--bg-secondary);
    padding: 80px 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
    transition: right 0.3s ease-in-out;
    z-index: 1000;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavItem = styled.li`
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-bottom: 25px;
    
    &:after {
      bottom: -10px;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--text-primary)'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 10px 0;
    font-size: 1.1rem;
  }
`;

const ContactButton = styled(motion.a)`
  background: linear-gradient(90deg, var(--primary-color), #0091e0);
  color: white;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(0, 168, 255, 0.3);
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 168, 255, 0.5);
    color: white;
  }
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 999;
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
    
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, location]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <HeaderContainer scrolled={scrolled}>
      <NavContainer>
        <Logo 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
           M.Şahin<span> Yıldırım</span>
          </Link>
        </Logo>
        
        <MenuToggle onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
        
        <Overlay 
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
        />
        
        <NavMenu isOpen={isMenuOpen}>
          <NavList>
            <NavItem isActive={isActive('/')}>
              <NavLink to="/" isActive={isActive('/')}>Ana Sayfa</NavLink>
            </NavItem>
            <NavItem isActive={isActive('/about')}>
              <NavLink to="/about" isActive={isActive('/about')}>Hakkımda</NavLink>
            </NavItem>
            <NavItem isActive={isActive('/education')}>
              <NavLink to="/education" isActive={isActive('/education')}>Eğitim</NavLink>
            </NavItem>
            <NavItem isActive={isActive('/skills')}>
              <NavLink to="/skills" isActive={isActive('/skills')}>Yetenekler</NavLink>
            </NavItem>
            <NavItem isActive={isActive('/projects')}>
              <NavLink to="/projects" isActive={isActive('/projects')}>Projeler</NavLink>
            </NavItem>
            <ContactButton 
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              İletişim
            </ContactButton>
          </NavList>
        </NavMenu>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 