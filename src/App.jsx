import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/ProjectCard'
import { motion } from 'framer-motion'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const titles = ["Web", "Back-End", "Front-End", "Full-Stack"]

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentText = titles[titleIndex];
      
      if (!isDeleting && displayText !== currentText) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText !== '') {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((current) => (current + 1) % titles.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, titles]);

  return (
    <div className="portfolio">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}>
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
            <li><a href="#home" onClick={closeMenu}>Accueil</a></li>
            <li><a href="#about" onClick={closeMenu}>À propos</a></li>
            <li><a href="#projects" onClick={closeMenu}>Projets</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        </nav>
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
            Développeur <span className="typing-text">{displayText}</span>
            <span className="cursor"></span>
          </h2>
        </div>
      </motion.section>

      <motion.section 
        id="about" 
        className="about"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}> {/* Ajusté le margin de déclenchement */}
        <motion.h2 {...fadeInUp}>À propos</motion.h2>
        <motion.p {...fadeInUp}>
          Passionné par le développement et toujours en quête d’apprentissage, je crée des applications web et mobiles en JavaScript, Python et React. 🎯

          Actuellement, je travaille sur plusieurs projets allant de bots Discord intelligents à des jeux de simulation, en passant par des applications de gestion et des sites interactifs. J’aime expérimenter avec des technologies modernes comme Electron, Node.js, MongoDB et maintenant React avec Vite pour un rendu fluide et dynamique. 🚀

          Mon objectif ? Concevoir des interfaces modernes avec des animations et effets soignés, tout en optimisant les performances. J’ai aussi une expérience en cybersécurité et en hébergement serveur, avec un serveur personnel configuré pour mes projets.
        </motion.p>
      </motion.section>

      <motion.section 
        id="languages" 
        className="languages"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>Langages & Technologies</motion.h2>
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
        </motion.div>
      </motion.section>

      <motion.section 
        id="projects" 
        className="projects"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>Mes Projets</motion.h2>
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
        id="contact" 
        className="contact"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 {...fadeInUp}>Contact</motion.h2>
        <motion.p variants={fadeInUp}>Email: planque.adam@gmail.com</motion.p>
        <motion.p variants={fadeInUp}>LinkedIn: linkedin.com/in/adam-planque/</motion.p>
        <motion.p variants={fadeInUp}>GitHub: github.com/shadowforce78</motion.p>
      </motion.section>
    </div>
  )
}

export default App
