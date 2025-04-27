import { motion } from 'framer-motion';

const LanguageSwitcher = ({ currentLanguage, setLanguage }) => {
  return (
    <motion.div 
      className="language-switcher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        className={`language-btn ${currentLanguage === 'fr' ? 'active' : ''}`}
        onClick={() => setLanguage('fr')}
      >
        FR
      </button>
      <button 
        className={`language-btn ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </motion.div>
  );
};

export default LanguageSwitcher;