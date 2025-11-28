import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = styled.section`
  padding: 100px 0;
  background: radial-gradient(circle at 50% 50%, rgba(30, 47, 76, 0.4) 0%, rgba(12, 20, 33, 0.7) 100%);
  position: relative;
  overflow: hidden;
`;

const BgBlur = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(0, 168, 255, 0.1), rgba(126, 87, 194, 0.1));
  filter: blur(120px);
  top: -200px;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
    
    .project-image {
      transform: scale(1.1);
    }
  }
`;

const ProjectImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(12, 20, 33, 0.7) 0%, rgba(12, 20, 33, 0) 100%);
    z-index: 1;
    opacity: 0.7;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ProjectContent = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 15px;
  font-size: 1rem;
  flex: 1;
`;

const ProjectTechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const TechTag = styled.span`
  background: rgba(0, 168, 255, 0.15);
  color: var(--primary-color);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: ${props => props.active ? '0 5px 15px rgba(0, 168, 255, 0.3)' : 'none'};
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  margin-top: 20px;
  
  h3 {
    margin-bottom: 10px;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
  }
`;

const Projects = () => {
  const [filter, setFilter] = React.useState('all');
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Filter değiştiğinde animasyon kontrollerini sıfırlayıp yeniden çalıştır
  useEffect(() => {
    controls.start('hidden').then(() => {
      controls.start('visible');
    });
  }, [filter, controls]);
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const projects = [
    {
      id: 1,
      title: "E-Ticaret Platformu",
      description: "Modern ve kullanıcı dostu bir e-ticaret platformu. Ürün listesi, sepet, ödeme sistemi ve admin paneli içerir.",
      image: "https://via.placeholder.com/400x300/1e2f4c/ffffff?text=E-Commerce+Platform",
      techStack: ["React", "Node.js", "MongoDB", "Express.js"],
      liveLink: "#",
      githubLink: "#",
      category: "web"
    },
    {
      id: 2,
      title: "Task Yönetim Uygulaması",
      description: "Görevlerinizi organize etmenizi sağlayan, drag-and-drop özellikli bir task yönetim uygulaması.",
      image: "https://via.placeholder.com/400x300/1e2f4c/ffffff?text=Task+Manager",
      techStack: ["React", "Firebase", "CSS3", "Context API"],
      liveLink: "#",
      githubLink: "#",
      category: "web"
    },
    {
      id: 3,
      title: "Hava Durumu Uygulaması",
      description: "Gerçek zamanlı hava durumu verileri sağlayan, konum bazlı bir hava durumu uygulaması.",
      image: "https://via.placeholder.com/400x300/1e2f4c/ffffff?text=Weather+App",
      techStack: ["JavaScript", "HTML5", "CSS3", "Weather API"],
      liveLink: "#",
      githubLink: "#",
      category: "web"
    },
    {
      id: 4,
      title: "Sosyal Medya Mobil Uygulaması",
      description: "Fotoğraf paylaşımı, mesajlaşma ve profil yönetimi özelliklerine sahip bir sosyal medya uygulaması.",
      image: "https://via.placeholder.com/400x300/1e2f4c/ffffff?text=Social+Media+App",
      techStack: ["React Native", "Firebase", "Redux", "Expo"],
      liveLink: "#",
      githubLink: "#",
      category: "mobile"
    },
    {
      id: 5,
      title: "Blog CMS",
      description: "İçerik yönetim sistemi ile blog yazılarını yönetmeyi sağlayan bir platform.",
      image: "https://via.placeholder.com/400x300/1e2f4c/ffffff?text=Blog+CMS",
      techStack: ["PHP", "MySQL", "Bootstrap", "jQuery"],
      liveLink: "#",
      githubLink: "#",
      category: "backend"
    },
    {
      id: 6,
      title: "Fitness Takip Uygulaması",
      description: "Egzersiz rutinlerini ve beslenme alışkanlıklarını takip etmenizi sağlayan bir uygulama.",
      image: "https://via.placeholder.com/400x300/1e2f4c/ffffff?text=Fitness+Tracker",
      techStack: ["Flutter", "Dart", "Firebase", "Provider"],
      liveLink: "#",
      githubLink: "#",
      category: "mobile"
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <ProjectsSection id="projects">
      <BgBlur />
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Projelerim</Title>
          <Subtitle>Son zamanlarda geliştirdiğim bazı projeler</Subtitle>
        </SectionHeading>
        
        <FilterButtons>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => handleFilterChange('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tümü
          </FilterButton>
          <FilterButton 
            active={filter === 'web'} 
            onClick={() => handleFilterChange('web')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Web
          </FilterButton>
          <FilterButton 
            active={filter === 'mobile'} 
            onClick={() => handleFilterChange('mobile')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mobil
          </FilterButton>
          <FilterButton 
            active={filter === 'backend'} 
            onClick={() => handleFilterChange('backend')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Backend
          </FilterButton>
        </FilterButtons>
        
        {filteredProjects.length > 0 ? (
          <ProjectsGrid ref={ref}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate={controls}
              >
                <ProjectImageContainer>
                  <ProjectImage src={project.image} alt={project.title} className="project-image" />
                </ProjectImageContainer>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTechStack>
                    {project.techStack.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </ProjectTechStack>
                  <ProjectLinks>
                    <ProjectLink 
                      href={project.liveLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt /> Demo
                    </ProjectLink>
                    <ProjectLink 
                      href={project.githubLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub /> GitHub
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        ) : (
          <EmptyState
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            <h3>Bu kategoride henüz proje bulunmuyor</h3>
            <p>Başka bir kategori seçin veya daha sonra tekrar kontrol edin.</p>
          </EmptyState>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 