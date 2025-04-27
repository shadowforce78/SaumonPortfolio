import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulation d'envoi d'email (à remplacer par un vrai service d'email)
    setTimeout(() => {
      console.log('Form data:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
    
    // Dans une implémentation réelle, vous utiliseriez un service comme EmailJS, FormSpree, etc.
    // Par exemple avec EmailJS :
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
    //  .then(() => setStatus('success'))
    //  .catch(() => setStatus('error'));
  };

  const texts = {
    fr: {
      title: 'Me contacter',
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'Votre email',
      messagePlaceholder: 'Votre message',
      submitButton: 'Envoyer',
      sending: 'Envoi en cours...',
      success: 'Message envoyé !',
      error: 'Erreur lors de l\'envoi'
    },
    en: {
      title: 'Contact Me',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email',
      messagePlaceholder: 'Your message',
      submitButton: 'Send',
      sending: 'Sending...',
      success: 'Message sent!',
      error: 'Error sending message'
    }
  };

  const t = texts[language] || texts.fr;

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div className="contact-form-container" {...fadeInUp}>
      <h3>{t.title}</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <motion.div className="form-group" variants={fadeInUp}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            required
          />
        </motion.div>
        <motion.div className="form-group" variants={fadeInUp}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            required
          />
        </motion.div>
        <motion.div className="form-group" variants={fadeInUp}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.messagePlaceholder}
            required
            rows="5"
          />
        </motion.div>
        <motion.button
          type="submit"
          className="submit-btn"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {status === 'sending' ? t.sending : t.submitButton}
        </motion.button>
        
        {status === 'success' && (
          <motion.div 
            className="form-status success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {t.success}
          </motion.div>
        )}
        
        {status === 'error' && (
          <motion.div 
            className="form-status error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {t.error}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;