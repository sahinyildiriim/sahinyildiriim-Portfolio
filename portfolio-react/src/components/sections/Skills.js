import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaPython, FaGitAlt, FaDatabase, FaMobile, FaFigma 
} from 'react-icons/fa';

const SkillsSection = styled.section`
  padding: 100px 0;
  background: radial-gradient(circle at 50% 50%, rgba(12, 20, 33, 0.7) 0%, rgba(12, 20, 33, 0.9) 100%);
  position: relative;
  overflow: hidden;
`;

const BgBlur = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(126, 87, 194, 0.1), rgba(255, 107, 107, 0.1));
  filter: blur(120px);
  bottom: -200px;
  left: -200px;
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
  margin-bottom: 60px;
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

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 70px;
`;

const SkillCategoryBlock = styled(motion.div)`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const CategoryTitle = styled(motion.h3)`
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  font-size: 1.8rem;
  color: var(--text-primary);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 70%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), transparent);
    border-radius: 2px;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: ${props => props.color || 'var(--primary-color)'};
`;

const SkillName = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  width: ${props => props.width}%;
`;

const Rating = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 12px;
`;

const Star = styled.div`
  color: ${props => props.filled ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.2)'};
  font-size: 1rem;
`;

const Skills = () => {
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
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: {
        duration: 1,
        ease: "easeOut",
      }
    })
  };
  
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating}>★</Star>
      );
    }
    return stars;
  };
  
  const frontendSkills = [
    { name: "HTML5", icon: <FaHtml5 />, rating: 5, progress: 95, color: "#E44D26" },
    { name: "CSS3", icon: <FaCss3Alt />, rating: 5, progress: 90, color: "#1572B6" },
    { name: "JavaScript", icon: <FaJs />, rating: 4, progress: 85, color: "#F7DF1E" },
    { name: "React", icon: <FaReact />, rating: 4, progress: 85, color: "#61DAFB" },
  ];
  
  const backendSkills = [
    { name: "Node.js", icon: <FaNodeJs />, rating: 4, progress: 80, color: "#68A063" },
    { name: "Python", icon: <FaPython />, rating: 3, progress: 75, color: "#3776AB" },
    { name: "Database", icon: <FaDatabase />, rating: 4, progress: 85, color: "#F29111" },
    { name: "Git", icon: <FaGitAlt />, rating: 4, progress: 85, color: "#F05032" },
  ];
  
  const otherSkills = [
    { name: "UI/UX Design", icon: <FaFigma />, rating: 4, progress: 80, color: "#F24E1E" },
    { name: "Mobile Dev", icon: <FaMobile />, rating: 3, progress: 70, color: "#A4C639" },
    { name: "RESTful API", icon: <FaNodeJs />, rating: 4, progress: 80, color: "#68A063" },
    { name: "Problem Solving", icon: <FaGitAlt />, rating: 5, progress: 90, color: "#F05032" },
  ];
  
  return (
    <SkillsSection id="skills">
      <BgBlur />
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Yeteneklerim</Title>
          <Subtitle>Yazılım geliştirme sürecinde kullandığım teknolojiler ve araçlar</Subtitle>
        </SectionHeading>
        
        <SkillsContainer ref={ref}>
          <SkillCategoryBlock
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <CategoryTitle
              variants={itemVariants}
            >
              Frontend Teknolojileri
            </CategoryTitle>
            
            <SkillsGrid>
              {frontendSkills.map((skill, index) => (
                <SkillCard
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <SkillIcon color={skill.color}>{skill.icon}</SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <ProgressBar>
                    <ProgressFill
                      variants={progressVariants}
                      custom={skill.progress}
                      initial="hidden"
                      animate={controls}
                    />
                  </ProgressBar>
                  <Rating>
                    {renderStars(skill.rating)}
                  </Rating>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillCategoryBlock>
          
          <SkillCategoryBlock
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <CategoryTitle
              variants={itemVariants}
            >
              Backend Teknolojileri
            </CategoryTitle>
            
            <SkillsGrid>
              {backendSkills.map((skill, index) => (
                <SkillCard
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <SkillIcon color={skill.color}>{skill.icon}</SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <ProgressBar>
                    <ProgressFill 
                      variants={progressVariants}
                      custom={skill.progress}
                      initial="hidden"
                      animate={controls}
                    />
                  </ProgressBar>
                  <Rating>
                    {renderStars(skill.rating)}
                  </Rating>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillCategoryBlock>
          
          <SkillCategoryBlock
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <CategoryTitle
              variants={itemVariants}
            >
              Diğer Yetenekler
            </CategoryTitle>
            
            <SkillsGrid>
              {otherSkills.map((skill, index) => (
                <SkillCard
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <SkillIcon color={skill.color}>{skill.icon}</SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <ProgressBar>
                    <ProgressFill 
                      variants={progressVariants}
                      custom={skill.progress}
                      initial="hidden"
                      animate={controls}
                    />
                  </ProgressBar>
                  <Rating>
                    {renderStars(skill.rating)}
                  </Rating>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillCategoryBlock>
        </SkillsContainer>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 