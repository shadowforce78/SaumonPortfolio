import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/ProjectCard'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const titles = ["Web", "Back-End", "Front-End", "Full-Stack"]

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
      <header>
        <nav>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="home" className="hero">
        <h1>Adam Planque</h1>
        <div className="typing-container">
          <h2 className="typing-title">
            Développeur <span className="typing-text">{displayText}</span>
            <span className="cursor"></span>
          </h2>
        </div>
      </section>

      <section id="about" className="about">
        <h2>À propos</h2>
        <p>Passionné par le développement et toujours en quête d’apprentissage, je crée des applications web et mobiles en JavaScript, Python et React. 🎯

Actuellement, je travaille sur plusieurs projets allant de bots Discord intelligents à des jeux de simulation, en passant par des applications de gestion et des sites interactifs. J’aime expérimenter avec des technologies modernes comme Electron, Node.js, MongoDB et maintenant React avec Vite pour un rendu fluide et dynamique. 🚀

Mon objectif ? Concevoir des interfaces modernes avec des animations et effets soignés, tout en optimisant les performances. J’ai aussi une expérience en cybersécurité et en hébergement serveur, avec un serveur personnel configuré pour mes projets.</p>
      </section>

      <section id="projects" className="projects">
        <h2>Mes Projets</h2>
        {loading ? (
          <p>Chargement des projets...</p>
        ) : (
          <div className="projects-grid">
            {projects.map(repo => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </section>

      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>Email: planque.adam@gmail.com</p>
        <p>LinkedIn: linkedin.com/in/adam-planque/</p>
        <p>GitHub: github.com/shadowforce78</p>
      </section>
    </div>
  )
}

export default App
