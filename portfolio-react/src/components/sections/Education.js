import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGraduationCap,
  FaBriefcase,
  FaMedal,
  FaCertificate,
  FaExternalLinkAlt,
  FaHtml5,
  FaDatabase, // SQL için
  FaGithub,
  FaPython, // Link ikonu için bunu ekleyin
} from "react-icons/fa";

const EducationSection = styled.section`
  padding: 100px 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(12, 20, 33, 0.7) 0%,
    rgba(12, 20, 33, 0.9) 100%
  );
  position: relative;
  overflow: hidden;
`;

const BgBlur = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    rgba(126, 87, 194, 0.1),
    rgba(0, 168, 255, 0.1)
  );
  filter: blur(120px);
  bottom: -200px;
  right: -200px;
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
  background: linear-gradient(
    90deg,
    var(--primary-color),
    var(--secondary-color)
  );
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

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const TabButton = styled(motion.button)`
  background: ${(props) =>
    props.active ? "var(--primary-color)" : "rgba(255, 255, 255, 0.05)"};
  color: ${(props) => (props.active ? "white" : "var(--text-secondary)")};
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  font-size: 1rem;
  margin: 0 10px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: ${(props) =>
    props.active ? "0 5px 15px rgba(0, 168, 255, 0.3)" : "none"};

  &:hover {
    background: ${(props) =>
      props.active ? "var(--primary-color)" : "rgba(255, 255, 255, 0.1)"};
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: 10px 15px;
    margin: 0 5px;
  }
`;

const TimelineContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      var(--primary-color),
      rgba(0, 168, 255, 0.3)
    );
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;
const CertificateLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 50px;
  width: 100%;

  &:nth-child(even) {
    justify-content: flex-end;

    .timeline-content {
      text-align: right;
      padding-right: 40px;
      padding-left: 0;

      &:before {
        left: auto;
        right: -10px;
        border-width: 10px 0 10px 10px;
        border-color: transparent transparent transparent
          rgba(255, 255, 255, 0.05);
      }
    }

    .timeline-dot {
      left: auto;
      right: -16px;
    }

    @media (max-width: 768px) {
      justify-content: flex-start;

      .timeline-content {
        text-align: left;
        padding-right: 0;
        padding-left: 40px;

        &:before {
          left: -10px;
          right: auto;
          border-width: 10px 10px 10px 0;
          border-color: transparent rgba(255, 255, 255, 0.05) transparent
            transparent;
        }
      }

      .timeline-dot {
        left: -16px;
        right: auto;
      }
    }
  }

  @media (max-width: 768px) {
    padding-left: 40px;
  }
`;

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 25px;
  width: calc(50% - 30px);
  position: relative;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-5px);
  }

  &:before {
    content: "";
    position: absolute;
    top: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 10px 0;
    border-color: transparent rgba(255, 255, 255, 0.05) transparent transparent;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TimelineDot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  position: absolute;
  top: 20px;
  left: -16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  box-shadow: 0 0 10px rgba(0, 168, 255, 0.5);
  z-index: 10;
`;

const TimelineDate = styled.div`
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0, 168, 255, 0.3);
`;

const TimelineTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.3rem;
`;

const TimelineSubtitle = styled.h4`
  color: var(--text-accent);
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 500;
`;

const TimelineDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0;
`;

const TimelineAchievements = styled.ul`
  margin-top: 15px;
  padding-left: 20px;
`;

const TimelineAchievement = styled.li`
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 5px;
  position: relative;

  &:before {
    content: "•";
    color: var(--primary-color);
    position: absolute;
    left: -15px;
  }
`;

const Education = () => {
  const [activeTab, setActiveTab] = React.useState("education");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  useEffect(() => {
    // Tab değişince animasyonu yeniden tetikle
    controls.start("visible");

    // Sayfayı en üste kaydır
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const education = [
    {
      id: 1,
      type: "education",
      icon: <FaGraduationCap />,
      date: "2021 - Devam Ediyor",
      title: "Bilgisayar Mühendisliği",
      institution: "Doğuş Üniversitesi",
      description:
        "Bilgisayar Mühendisliği bölümünde lisans eğitimi almaktayım. Eğitimim süresince, algoritma tasarımı, veri yapıları, yazılım mühendisliği ve web geliştirme konularında derinlemesine bilgi edindim.",
      achievements: [
        "GPA: 2.5/4.00",
        "Mühendis Beyinler Kulübü Başkanı",
        "Loop Yazılım ve fikir geliştirme takımında görev aldım.",
      ],
    },
    {
      id: 2,
      type: "education",
      icon: <FaGraduationCap />,
      date: "2017 - 2021",
      title: "Lise Eğitimi",
      institution: "Nesibe Aydın Okulları",
      description: "Yks 40.000 sıralamada mezun oldum.",
      achievements: ["Mezuniyet derecesi: 95/100"],
    },
    {
      id: 3,
      type: "experience",
      icon: <FaGraduationCap />,
      date: "2022 - Devam Ediyor",
      title: "Kulüp Başkanı",
      institution: "Mühendis Beyinler Kulübü",
      description:
        "Üyesi olarak başladığım kulüpte başkanlık görevini yürütüyorum.",
      achievements: [
        "Proje yönetimi, takım çalışması, liderlik ve proje geliştirme becerilerimi geliştiriyorum.",
      ],
    },
    {
      id: 4,
      type: "experience",
      icon: <FaGraduationCap />,
      date: "2022 - Devam Ediyor",
      title: "Yazılım Geliştirici",
      institution: "Loop Yazılım ve Fikir Geliştirme Takımı",
      description: "Hackathon ekibinde görev alıyorum.",
      achievements: [
        "Proje yönetimi, takım çalışması, liderlik, agile metodolojisi, scrum.",
      ],
    },
    {
      id: 5,
      type: "certification",
      icon: <FaHtml5 />, // HTML İkonu
      date: "2024",
      title: "HTML5 Web Geliştirme",
      institution: "BTK Akademi", // Örnek Kurum
      description:
        "Modern web standartları, semantik yapı ve SEO uyumlu kodlama eğitimi.",
      achievements: [
        "Semantik Etiket Yapısı",
        "Form Validasyonları",
        "Web Erişilebilirliği (A11y)",
      ],
      link: "https://www.btkakademi.gov.tr",
    },
    {
      id: 6,
      type: "certification",
      icon: <FaDatabase />, // SQL için Veritabanı İkonu
      date: "2024",
      title: "SQL ve Veritabanı Yönetimi",
      institution: "Udemy / Patika.dev",
      description:
        "İlişkisel veritabanı tasarımı ve karmaşık sorgu yazma yetkinlikleri.",
      achievements: [
        "Veritabanı Normalizasyonu",
        "JOIN İşlemleri ve Alt Sorgular",
        "Stored Procedures",
      ],
      link: "#",
    },
    {
      id: 7,
      type: "certification",
      icon: <FaGithub />, // Git/GitHub İkonu
      date: "2023",
      title: "Versiyon Kontrol Sistemleri: Git & GitHub",
      institution: "Coursera / BTK",
      description: "Takım çalışması süreçleri ve kod versiyonlama yönetimi.",
      achievements: [
        "Branch Yönetimi ve Merging",
        "Pull Request Süreçleri",
        "Conflict Çözümü",
      ],
      link: "#",
    },
    {
      id: 8,
      type: "certification",
      icon: <FaPython />, // Python İkonu
      date: "2023",
      title: "Python Programlama",
      institution: "Global AI Hub / BTK",
      description:
        "Python dili ile nesne tabanlı programlama ve algoritma geliştirme.",
      achievements: [
        "OOP (Nesne Yönelimli Programlama)",
        "Veri Yapıları",
        "Kütüphane Yönetimi (Pip)",
      ],
      link: "#",
    },
  ];

  const filteredItems = education.filter((item) => item.type === activeTab);

  return (
    <EducationSection id="education">
      <BgBlur />
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Eğitim & Deneyim</Title>
          <Subtitle>
            Akademik geçmişim, iş deneyimlerim, sertifikalarım ve ödüllerim
          </Subtitle>
        </SectionHeading>

        <TabsContainer>
          <TabButton
            active={activeTab === "education"}
            onClick={() => setActiveTab("education")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Eğitim
          </TabButton>
          <TabButton
            active={activeTab === "experience"}
            onClick={() => setActiveTab("experience")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Deneyim
          </TabButton>
          <TabButton
            active={activeTab === "certification"}
            onClick={() => setActiveTab("certification")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sertifikalar
          </TabButton>
          <TabButton
            active={activeTab === "award"}
            onClick={() => setActiveTab("award")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ödüller
          </TabButton>
        </TabsContainer>

        <TimelineContainer
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {(filteredItems || []).map((item, index) => (
            <TimelineItem key={item.id} custom={index} variants={itemVariants}>
              <TimelineContent className="timeline-content">
                <TimelineDot className="timeline-dot">{item.icon}</TimelineDot>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineSubtitle>{item.institution}</TimelineSubtitle>
                <TimelineDescription>{item.description}</TimelineDescription>

                <TimelineAchievements>
                  {(item.achievements || []).map((achievement, i) => (
                    <TimelineAchievement key={i}>
                      {achievement}
                    </TimelineAchievement>
                  ))}
                </TimelineAchievements>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </EducationSection>
  );
};

export default Education;
