import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaMobileAlt, FaPaintBrush, FaServer } from 'react-icons/fa';

const AboutSection = styled.section`
  padding: 100px 0;
  background: radial-gradient(circle at 50% 50%, rgba(30, 47, 76, 0.7) 0%, rgba(12, 20, 33, 0.9) 100%);
  position: relative;
  overflow: hidden;
`;

const BgBlur = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(0, 168, 255, 0.1), rgba(255, 107, 107, 0.1));
  filter: blur(150px);
  bottom: -300px;
  left: -300px;
  z-index: 0;
`;

const Container = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`;

const SectionHeading = styled(motion.div)`
  text-align: center;
  margin-bottom: 70px;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 15px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: var(--box-shadow);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    width: 50%;
    height: 50%;
    border-top: 4px solid var(--primary-color);
    border-left: 4px solid var(--primary-color);
    border-radius: 20px 0 0 0;
    z-index: -1;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    right: -15px;
    width: 50%;
    height: 50%;
    border-bottom: 4px solid var(--secondary-color);
    border-right: 4px solid var(--secondary-color);
    border-radius: 0 0 20px 0;
    z-index: -1;
  }
  
  @media (max-width: 992px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const ExperienceBadge = styled(motion.div)`
  position: absolute;
  top: -30px;
  right: 30px;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 15px 25px;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 168, 255, 0.4);
  
  span {
    display: block;
    font-size: 0.9rem;
    font-weight: 400;
    opacity: 0.8;
  }
`;

const AboutInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AboutTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const AboutDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const AboutPoint = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
  
  svg {
    color: var(--primary-color);
    font-size: 1.2rem;
    min-width: 20px;
    margin-top: 5px;
  }
  
  p {
    margin-bottom: 0;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
`;

const TechBadge = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  color: var(--text-primary);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition);
  
  &:hover {
    background: rgba(0, 168, 255, 0.1);
    border-color: var(--primary-color);
    transform: translateY(-5px);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-10px);
    
    .icon-container {
      background: var(--primary-color);
      color: white;
    }
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
  transition: var(--transition);
  transform: rotate(-10deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const ServiceTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
`;

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const techStack = [
    "HTML5", "CSS3", "JavaScript", "React", "Node.js", 
    "Express", "MongoDB", "Git", "Responsive Design", "UI/UX"
  ];
  
  return (
    <AboutSection id="about">
      <BgBlur />
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Hakkımda</Title>
          <Subtitle>Ben kimim ve neler yapıyorum?</Subtitle>
        </SectionHeading>
        
        <AboutContent ref={ref}>
          <AboutImage
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.img 
              src="/image/A.jpg" 
              alt="Muhammet Şahin Yıldırım" 
              variants={itemVariants}
            />
            <ExperienceBadge
              initial={{ opacity: 0, y: -20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Jr. Developer <span></span>
            </ExperienceBadge>
          </AboutImage>
          
          <AboutInfo
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div>
              <AboutTitle>Yaratıcı Web Uygulamaları Geliştiriyorum</AboutTitle>
              <AboutDescription>
                Merhaba! Ben Muhammet Şahin Yıldırım, Doğuş Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim. Modern web teknolojileri kullanarak etkileyici ve kullanıcı dostu dijital deneyimler oluşturuyorum.
              </AboutDescription>
              <AboutDescription>
                Kendimi sürekli geliştirmeye ve teknoloji dünyasındaki en son trendleri takip etmeye özen gösteriyorum. Projelerimde şunlara odaklanıyorum:
              </AboutDescription>
            </div>
            
            <div>
              <AboutPoint>
                <FaCode />
                <p>Clean ve modüler kod yazımı</p>
              </AboutPoint>
              <AboutPoint>
                <FaMobileAlt />
                <p>Responsive ve mobil öncelikli tasarım</p>
              </AboutPoint>
              <AboutPoint>
                <FaPaintBrush />
                <p>Modern ve kullanıcı dostu arayüzler</p>
              </AboutPoint>
              <AboutPoint>
                <FaServer />
                <p>Hızlı ve optimize edilmiş uygulamalar</p>
              </AboutPoint>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>Teknoloji Yığınım</h4>
              <TechStack>
                {techStack.map((tech, index) => (
                  <TechBadge
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    {tech}
                  </TechBadge>
                ))}
              </TechStack>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Sunduğum Hizmetler</h4>
              <ServicesGrid>
                <ServiceCard
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <ServiceIcon className="icon-container">
                    <FaCode />
                  </ServiceIcon>
                  <ServiceTitle>Web Geliştirme</ServiceTitle>
                  <ServiceDescription>
                    Modern teknolojiler kullanarak responsive ve hızlı web siteleri ve uygulamalar geliştiriyorum.
                  </ServiceDescription>
                </ServiceCard>
                
                <ServiceCard
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <ServiceIcon className="icon-container">
                    <FaMobileAlt />
                  </ServiceIcon>
                  <ServiceTitle>Mobil Uygulamalar</ServiceTitle>
                  <ServiceDescription>
                    React Native ile iOS ve Android platformları için native-benzeri uygulamalar geliştiriyorum.
                  </ServiceDescription>
                </ServiceCard>
                
                <ServiceCard
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <ServiceIcon className="icon-container">
                    <FaPaintBrush />
                  </ServiceIcon>
                  <ServiceTitle>UI/UX Tasarım</ServiceTitle>
                  <ServiceDescription>
                    Modern ve kullanıcı dostu arayüzler tasarlıyor, kullanıcı deneyimini en üst düzeye çıkarıyorum.
                  </ServiceDescription>
                </ServiceCard>
                
                <ServiceCard
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <ServiceIcon className="icon-container">
                    <FaServer />
                  </ServiceIcon>
                  <ServiceTitle>Backend Geliştirme</ServiceTitle>
                  <ServiceDescription>
                    Node.js, Express ve MongoDB kullanarak güvenli ve ölçeklenebilir API'lar ve backend sistemleri kuruyorum.
                  </ServiceDescription>
                </ServiceCard>
              </ServicesGrid>
            </div>
          </AboutInfo>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About; 