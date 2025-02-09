import './App.css'

function App() {
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
        <h1>John Doe</h1>
        <h2>Développeur Web</h2>
      </section>

      <section id="about" className="about">
        <h2>À propos</h2>
        <p>Passionné par le développement web et les nouvelles technologies.</p>
      </section>

      <section id="projects" className="projects">
        <h2>Mes Projets</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>Projet 1</h3>
            <p>Description du projet</p>
          </div>
          <div className="project-card">
            <h3>Projet 2</h3>
            <p>Description du projet</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>Email: contact@example.com</p>
        <p>LinkedIn: linkedin.com/in/johndoe</p>
        <p>GitHub: github.com/johndoe</p>
      </section>
    </div>
  )
}

export default App
