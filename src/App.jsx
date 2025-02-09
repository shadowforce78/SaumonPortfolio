import { useState, useEffect } from 'react'
import './App.css'
import ProjectCard from './components/ProjectCard'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

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
        <h2>Développeur Full-Stack</h2>
      </section>

      <section id="about" className="about">
        <h2>À propos</h2>
        <p>Passionné par le développement web et les nouvelles technologies.</p>
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
