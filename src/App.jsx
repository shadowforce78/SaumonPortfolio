import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/ProjectCard'
import ContactForm from './components/ContactForm'
import LanguageSwitcher from './components/LanguageSwitcher'
import BlogPost from './components/BlogPost'
import { motion } from 'framer-motion'
import cvPDF from './assets/cv.pdf'
import { useAnalytics, exportAnalyticsData } from './services/analytics'

function App() {
  const [projects, setProjects] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('fr')
  
  // Utilisation du hook d'analytics
  const { pageViews, loading: analyticsLoading, error: analyticsError } = useAnalytics();
  
  // Titres dans les deux langues
  const titles = {
    fr: ["Web", "Back-End", "Front-End", "Full-Stack"],
    en: ["Web", "Back-End", "Front-End", "Full-Stack"]
  }
  
  // Content du blog (à remplacer par de vrais contenus)
  const blogPosts = [
    {
      id: 1,
      title: "UVSQ Python EDT - Une application d'emploi du temps",
      titleEN: "UVSQ Python Schedule - A timetable application",
      date: "2023-09-15",
      content: "J'ai développé une application de consultation d'emploi du temps pour l'UVSQ. Cette application permet aux étudiants de consulter leur emploi du temps facilement...",
      contentEN: "I developed a schedule consultation app for UVSQ. This application allows students to easily check their schedule...",
      image: "https://via.placeholder.com/800x400"
    },
    {
      id: 2,
      title: "AiMaze 2.0 - Génération et résolution de labyrinthes",
      titleEN: "AiMaze 2.0 - Maze generation and solving",
      date: "2023-07-22",
      content: "AiMaze 2.0 est une application qui permet de générer des labyrinthes et de les résoudre à l'aide de plusieurs algorithmes...",
      contentEN: "AiMaze 2.0 is an application that generates mazes and solves them using various algorithms...",
      image: "https://via.placeholder.com/800x400"
    }
  ]
  
  // Texte multilingue
  const text = {
    fr: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      blog: "Blog",
      contact: "Contact",
      downloadCV: "Télécharger CV",
      featuredProjects: "Projets à la une",
      githubProjects: "Autres projets GitHub",
      languages: "Langages & Technologies",
      pageViews: "Visites",
      exportAnalytics: "Exporter les données",
      aboutMe: "Passionné par le développement et toujours en quête d'apprentissage, je crée des applications web et mobiles en JavaScript, Python et React. 🎯\n\nActuellement, je travaille sur plusieurs projets allant de bots Discord intelligents à des jeux de simulation, en passant par des applications de gestion et des sites interactifs. J'aime expérimenter avec des technologies modernes comme Electron, Node.js, MongoDB et maintenant React avec Vite pour un rendu fluide et dynamique. 🚀\n\nMon objectif ? Concevoir des interfaces modernes avec des animations et effets soignés, tout en optimisant les performances. J'ai aussi une expérience en cybersécurité et en hébergement serveur, avec un serveur personnel configuré pour mes projets.",
      socialLinks: "Liens Sociaux",
      blogSection: "Mon Blog"
    },
    en: {
      home: "Home",
      about: "About",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      downloadCV: "Download Resume",
      featuredProjects: "Featured Projects",
      githubProjects: "Other GitHub Projects",
      languages: "Languages & Technologies",
      pageViews: "Views",
      exportAnalytics: "Export Data",
      aboutMe: "Passionate about development and always eager to learn, I create web and mobile applications using JavaScript, Python, and React. 🎯\n\nCurrently, I'm working on several projects ranging from intelligent Discord bots to simulation games, management applications, and interactive websites. I enjoy experimenting with modern technologies like Electron, Node.js, MongoDB, and now React with Vite for smooth and dynamic rendering. 🚀\n\nMy goal? Design modern interfaces with polished animations and effects while optimizing performance. I also have experience in cybersecurity and server hosting, with a personal server configured for my projects.",
      socialLinks: "Social Links",
      blogSection: "My Blog"
    }
  }

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Effet pour les projets GitHub
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/shadowforce78/repos?sort=updated&direction=desc')
        const data = await response.json()
        const filteredProjects = data
          .filter(repo => !repo.fork)
          .slice(0, 5) // Prendre uniquement les 5 premiers projets
        setProjects(filteredProjects)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Effet pour les projets mis en avant
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const featuredRepoUrls = [
          'https://api.github.com/repos/shadowforce78/UVSQ-Python-EDT',
          'https://api.github.com/repos/shadowforce78/AiMaze2.0',
          'https://api.github.com/repos/shadowforce78/Rainbow-Icon'
        ];
        
        const responses = await Promise.all(
          featuredRepoUrls.map(url => fetch(url))
        );
        
        const featuredData = await Promise.all(
          responses.map(response => response.json())
        );
        
        setFeaturedProjects(featuredData);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets mis en avant:', error);
      }
    };

    fetchFeaturedProjects();
  }, []);

  // Effet pour l'animation de texte
  useEffect(() => {
    const currentTitles = titles[language];
    const timer = setTimeout(() => {
      const currentText = currentTitles[titleIndex];
      
      if (!isDeleting && displayText !== currentText) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText !== '') {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((current) => (current + 1) % currentTitles.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles, language]);

  return (
    <div className="portfolio">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}>
        <div className="header-content">
          <button 
            className="nav-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav>
            <ul className={isMenuOpen ? 'active' : ''}>
              <li><a href="#home" onClick={closeMenu}>{text[language].home}</a></li>
              <li><a href="#about" onClick={closeMenu}>{text[language].about}</a></li>
              <li><a href="#projects" onClick={closeMenu}>{text[language].projects}</a></li>
              <li><a href="#blog" onClick={closeMenu}>{text[language].blog}</a></li>
              <li><a href="#contact" onClick={closeMenu}>{text[language].contact}</a></li>
              <li>
                <a 
                  href={cvPDF} 
                  download="Adam_Planque_CV.pdf" 
                  className="download-cv-link"
                  onClick={closeMenu}
                >
                  {text[language].downloadCV}
                </a>
              </li>
            </ul>
          </nav>
          <LanguageSwitcher currentLanguage={language} setLanguage={setLanguage} />
        </div>
      </motion.header>

      <motion.section 
        id="home" 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}>
          Adam Planque
        </motion.h1>
        <div className="typing-container">
          <h2 className="typing-title">
            {language === 'fr' ? 'Développeur ' : 'Developer '}
            <span className="typing-text">{displayText}</span>
            <span className="cursor"></span>
          </h2>
        </div>
        <motion.div className="social-links">
          <motion.a 
            href="https://github.com/shadowforce78" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="devicon-github-original"></i>
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/adam-planque/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="devicon-linkedin-plain"></i>
          </motion.a>
        </motion.div>
        <motion.div 
          className="stats-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="stat-item">
            <span className="stat-value">{analyticsLoading ? '...' : pageViews}</span>
            <span className="stat-label">{text[language].pageViews}</span>
          </div>
          {/* <motion.button 
            className="export-analytics-btn"
            onClick={exportAnalyticsData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {text[language].exportAnalytics}
          </motion.button> */}
        </motion.div>
      </motion.section>

      <motion.section 
        id="about" 
        className="about"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>{text[language].about}</motion.h2>
        <motion.div className="about-content" {...fadeInUp}>
          <motion.p>
            {text[language].aboutMe}
          </motion.p>
          <motion.div className="download-cv">
            <motion.a 
              href={cvPDF} 
              download="Adam_Planque_CV.pdf"
              className="download-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {text[language].downloadCV}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        id="languages" 
        className="languages"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>{text[language].languages}</motion.h2>
        <motion.div 
          className="languages-grid"
          variants={staggerContainer}
          initial="initial"
          animate="animate">
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-javascript-plain colored"></i>
            <span>JavaScript</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-python-plain colored"></i>
            <span>Python</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-java-plain colored"></i>
            <span>Java</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-c-plain colored"></i>
            <span>C</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-cplusplus-plain colored"></i>
            <span>C++</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-csharp-plain colored"></i>
            <span>C#</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-react-original colored"></i>
            <span>React</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-html5-plain colored"></i>
            <span>HTML</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-css3-plain colored"></i>
            <span>CSS</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-vitejs-plain colored"></i>
            <span>Vite.js</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-git-plain colored"></i>
            <span>Git</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-php-plain colored"></i>
            <span>PHP</span>
          </motion.div>
          <motion.div className="language-item" variants={fadeInUp}>
            <i className="devicon-mysql-plain colored"></i>
            <span>SQL</span>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section 
        id="projects" 
        className="projects"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>{text[language].featuredProjects}</motion.h2>
        {featuredProjects.length === 0 ? (
          <p>Chargement des projets mis en avant...</p>
        ) : (
          <motion.div 
            className="projects-grid featured"
            variants={staggerContainer}
            initial="initial"
            animate="animate">
            {featuredProjects.map(repo => (
              <motion.div
                key={repo.id}
                variants={fadeInUp}>
                <ProjectCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.h2 {...fadeInUp} style={{ marginTop: '3rem' }}>{text[language].githubProjects}</motion.h2>
        {loading ? (
          <p>Chargement des projets...</p>
        ) : (
          <motion.div 
            className="projects-grid"
            variants={staggerContainer}
            initial="initial"
            animate="animate">
            {projects.map(repo => (
              <motion.div
                key={repo.id}
                variants={fadeInUp}>
                <ProjectCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
      
      <motion.section 
        id="blog" 
        className="blog"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>{text[language].blogSection}</motion.h2>
        <motion.div 
          className="blog-grid"
          variants={staggerContainer}
          initial="initial"
          animate="animate">
          {blogPosts.map(post => (
            <BlogPost key={post.id} post={post} language={language} />
          ))}
        </motion.div>
      </motion.section>

      <motion.section 
        id="contact" 
        className="contact"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>{text[language].contact}</motion.h2>
        <motion.div className="contact-container">
          <div className="contact-info">
            <motion.p variants={fadeInUp}>Email: planque.adam@gmail.com</motion.p>
            <motion.h3 variants={fadeInUp} style={{ marginTop: '2rem' }}>{text[language].socialLinks}</motion.h3>
            <motion.div className="social-links-contact" variants={fadeInUp}>
              <motion.a 
                href="https://github.com/shadowforce78" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="devicon-github-original"></i>
                <span>GitHub</span>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/adam-planque/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="devicon-linkedin-plain"></i>
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>
          </div>
          <ContactForm language={language} />
        </motion.div>
      </motion.section>
      
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p>&copy; {new Date().getFullYear()} Adam Planque. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
      </motion.footer>
    </div>
  )
}

export default App
