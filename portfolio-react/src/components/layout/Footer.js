import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background: linear-gradient(
    to top,
    rgba(12, 20, 33, 1),
    rgba(30, 47, 76, 0.8)
  );
  padding: 70px 0 30px;
  position: relative;
`;

const Container = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--text-primary);

  span {
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-size: 1.2rem;
  transition: var(--transition);

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-5px);
  }
`;

const FooterTitle = styled.h4`
  color: var(--text-primary);
  margin-bottom: 25px;
  font-size: 1.3rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 40px;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-radius: 2px;
  }
`;

const FooterLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FooterLink = styled.li`
  transition: var(--transition);

  a {
    color: var(--text-secondary);
    font-size: 1rem;
    transition: var(--transition);

    &:hover {
      color: var(--primary-color);
      padding-left: 5px;
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 15px;

  p {
    color: var(--text-secondary);
    margin-bottom: 5px;
    font-size: 1rem;
  }
`;

const Copyright = styled.div`
  margin-top: 50px;
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-bottom: 0;

    a {
      color: var(--primary-color);
      transition: var(--transition);

      &:hover {
        color: var(--secondary-color);
      }
    }

    svg {
      color: var(--secondary-color);
      margin: 0 3px;
    }
  }
`;

const ScrollToTop = styled(motion.div)`
  position: absolute;
  right: 30px;
  top: -25px;
  width: 50px;
  height: 50px;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 168, 255, 0.4);

  &:hover {
    transform: translateY(-5px);
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterColumn>
            <FooterLogo>
              <br />
              
              Şahin <span> Yıldırım</span>
            </FooterLogo>

          
            
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Linkler</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <Link to="/">Ana Sayfa</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/about">Hakkımda</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/skills">Yetenekler</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/projects">Projeler</Link>
              </FooterLink>
              <FooterLink>
                <Link to="/contact">İletişim</Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>İletişim</FooterTitle>
            <ContactInfo>
              <p>İstanbul, Türkiye</p>
              <p>muhammetsahinyildirim@gmail.com</p>
              <p>+90 506 700 27 39</p>
            </ContactInfo>
          </FooterColumn>
        </FooterContent>

        <Copyright>
          <p>
            © {new Date().getFullYear()} Tüm hakları saklıdır.
            <a href="/" rel="noopener noreferrer">
              {" "}
              Muhammet Şahin Yıldırım
            </a>{" "}
            tarafından tasarlandı.
          </p>
        </Copyright>

        <ScrollToTop
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </ScrollToTop>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
