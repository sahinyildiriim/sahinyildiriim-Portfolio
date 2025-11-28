import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const ContactSection = styled.section`
  padding: 100px 0;
  background: radial-gradient(circle at 50% 50%, rgba(12, 20, 33, 0.8) 0%, rgba(12, 20, 33, 0.95) 100%);
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
  top: -300px;
  right: -300px;
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const InfoDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
`;

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-color), rgba(0, 168, 255, 0.7));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 168, 255, 0.3);
`;

const ContactText = styled.div`
  h4 {
    color: var(--text-primary);
    margin-bottom: 5px;
    font-size: 1.1rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
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

const ContactFormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--border-radius);
  padding: 40px;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 576px) {
    padding: 30px 20px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--text-primary);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormTextarea = styled.textarea`
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
  resize: vertical;
  min-height: 150px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 10px;
  padding: 14px 28px;
  background: linear-gradient(90deg, var(--primary-color), #0091e0);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 168, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const AlertMessage = styled(motion.div)`
  padding: 15px;
  margin-top: 20px;
  border-radius: 8px;
  text-align: center;
  background: ${props => props.type === 'success' ? 'rgba(76, 217, 100, 0.15)' : 'rgba(252, 56, 80, 0.15)'};
  color: ${props => props.type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
  border: 1px solid ${props => props.type === 'success' ? 'rgba(76, 217, 100, 0.3)' : 'rgba(252, 56, 80, 0.3)'};
`;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  
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
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setAlert({
        type: 'success',
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.'
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear alert after 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }, 1500);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
  
  return (
    <ContactSection id="contact">
      <BgBlur />
      <Container>
        <SectionHeading
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>İletişim</Title>
          <Subtitle>Projeleriniz veya iş fırsatları için benimle iletişime geçebilirsiniz</Subtitle>
        </SectionHeading>
        
        <ContactContainer ref={ref}>
          <ContactInfo
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants}>
              <InfoTitle>Bana Ulaşın</InfoTitle>
              <InfoDescription>
                Projelerinizde yardıma ihtiyacınız mı var? Size yardımcı olmaktan memnuniyet duyarım. Aşağıdaki iletişim bilgileri üzerinden benimle iletişime geçebilirsiniz.
              </InfoDescription>
            </motion.div>
            
            <ContactItems>
              <ContactItem variants={itemVariants}>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactText>
                  <h4>Konum</h4>
                  <p>İstanbul, Türkiye</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem variants={itemVariants}>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactText>
                  <h4>Email</h4>
                  <p>muhammetsahinyildirim@gmail.com</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem variants={itemVariants}>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <ContactText>
                  <h4>Telefon</h4>
                  <p>+90 506 700 27 39</p>
                </ContactText>
              </ContactItem>
            </ContactItems>
            
            <motion.div variants={itemVariants}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>Sosyal Medya</h4>
              <SocialLinks>
                <SocialLink 
                  href="https://www.linkedin.com/in/muhammetsahinyildirim/" 
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
                <SocialLink 
                  href="https://instagram.com/sahinyldriimm" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <FaInstagram />
                </SocialLink>
              </SocialLinks>
            </motion.div>
          </ContactInfo>
          
          <ContactFormContainer
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants}>
              <FormTitle>Mesaj Gönderin</FormTitle>
            </motion.div>
            
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup as={motion.div} variants={itemVariants}>
                <FormLabel>İsim</FormLabel>
                <FormInput 
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="İsminizi giriniz"
                  required
                />
              </FormGroup>
              
              <FormGroup as={motion.div} variants={itemVariants}>
                <FormLabel>Email</FormLabel>
                <FormInput 
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Email adresinizi giriniz"
                  required
                />
              </FormGroup>
              
              <FormGroup as={motion.div} variants={itemVariants}>
                <FormLabel>Konu</FormLabel>
                <FormInput 
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Mesajınızın konusunu giriniz"
                  required
                />
              </FormGroup>
              
              <FormGroup as={motion.div} variants={itemVariants}>
                <FormLabel>Mesaj</FormLabel>
                <FormTextarea 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Mesajınızı buraya yazabilirsiniz..."
                  required
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit"
                disabled={isSubmitting}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </SubmitButton>
              
              {alert && (
                <AlertMessage 
                  type={alert.type}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {alert.message}
                </AlertMessage>
              )}
            </ContactForm>
          </ContactFormContainer>
        </ContactContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact; 