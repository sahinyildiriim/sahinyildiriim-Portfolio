import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { FaArrowRight, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const HomeSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 0;
  overflow: hidden;
`;

const BgAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.5;
`;

const BgGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(126, 87, 194, 0.2),
      transparent 40%
    ),
    radial-gradient(circle at 80% 70%, rgba(0, 168, 255, 0.2), transparent 40%);
  z-index: 0;
`;

const Container = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 50px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled(motion.div)`
  @media (max-width: 992px) {
    order: 2;
    margin-top: 30px;
  }
`;

const SubHeading = styled(motion.p)`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 500;
  background: linear-gradient(
    90deg,
    var(--primary-color),
    var(--secondary-color)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  display: inline-block;
`;

const Heading = styled(motion.h1)`
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 576px) {
    font-size: 2.5rem;
  }
`;

const AnimatedText = styled.span`
  color: var(--text-accent);
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 40px;
  line-height: 1.8;

  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;

  @media (max-width: 992px) {
    justify-content: center;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const PrimaryButton = styled(motion.a)`
  background: linear-gradient(90deg, var(--primary-color), #0091e0);
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(0, 168, 255, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 168, 255, 0.5);
    color: white;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }

  @media (max-width: 576px) {
    width: 100%;
    justify-content: center;
  }
`;

const SecondaryButton = styled(motion.a)`
  background: transparent;
  color: var(--text-primary);
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: inset 0 0 0 2px var(--primary-color);
    color: var(--primary-color);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }

  @media (max-width: 576px) {
    width: 100%;
    justify-content: center;
  }
`;

const SocialContainer = styled(motion.div)`
  display: flex;
  gap: 15px;
  margin-top: 40px;

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 45px;
  height: 45px;
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

const HeroImage = styled(motion.div)`
  position: relative;

  @media (max-width: 992px) {
    order: 1;
    max-width: 450px;
    margin: 0 auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(0, 168, 255, 0.4),
      rgba(126, 87, 194, 0.4)
    );
    mix-blend-mode: overlay;
    z-index: 1;
  }

  img {
    width: 100%;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(0, 168, 255, 0.4),
    transparent 70%
  );
  filter: blur(20px);
  z-index: -1;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: -1;

  &:nth-child(1) {
    top: -20px;
    left: -20px;
    border-radius: 50%;
  }

  &:nth-child(2) {
    bottom: -30px;
    right: -15px;
    width: 120px;
    height: 60px;
  }

  &:nth-child(3) {
    top: 40%;
    right: -40px;
    width: 60px;
    height: 60px;
    transform: rotate(45deg);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ScrollLine = styled(motion.div)`
  width: 2px;
  height: 60px;
  background: linear-gradient(to bottom, var(--primary-color), transparent);
  border-radius: 2px;
`;

const Home = () => {
  const typedTargetRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedTargetRef.current, {
      strings: ["Sorumluluk ", "Öğrenme", "Eğlence"],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <HomeSection id="home">
      <BgGradient />
      <BgAnimation />

      <Container>
        <HeroContent>
          <HeroText>
            <SubHeading
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              HOŞ GELDİNİZ
            </SubHeading>

            <Heading
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <br />
              Muhammet Şahin Yıldırım
              <br />
              <AnimatedText ref={typedTargetRef}></AnimatedText>
            </Heading>

            <Description
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              React ekosistemiyle modern ve ölçeklenebilir web arayüzleri
              geliştiriyorum. Web teknolojilerindeki yetkinliğimi mobil uygulama
              geliştirme süreçleriyle destekliyor; sistem mimarisine bütüncül
              hakim olmak adına mikroservis yapıları ve ileri seviye veritabanı
              yönetimi üzerine yoğunlaşıyorum
            </Description>

            <ButtonContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PrimaryButton
                href="/projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Projelerimi Gör <FaArrowRight />
              </PrimaryButton>

              <SecondaryButton
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                İletişime Geç <FaArrowRight />
              </SecondaryButton>
            </ButtonContainer>

            <SocialContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SocialLink
                href="https://www.linkedin.com/in/muhammetsahinyildirim"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <FaLinkedin />
              </SocialLink>
              <SocialLink
                href="https://github.com/sahinyildiriim"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <FaGithub />
              </SocialLink>
            </SocialContainer>
          </HeroText>

          <HeroImage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <FloatingShape
              animate={{
                y: [0, 15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
            />
            <FloatingShape
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
              }}
            />
            <FloatingShape
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
            />

            <ImageContainer>
              <img src="/image/B.jpg" alt="Muhammet Şahin Yıldırım" />
              <GlowEffect />
            </ImageContainer>
          </HeroImage>
        </HeroContent>
      </Container>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span>Aşağı Kaydır</span>
        <ScrollLine
          animate={{
            height: [40, 60, 40],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </ScrollIndicator>
    </HomeSection>
  );
};

export default Home;
