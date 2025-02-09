const ProjectCard = ({ repo }) => {
  return (
    <div className="project-card">
      <h3>{repo.name}</h3>
      <p>{repo.description || "Pas de description disponible"}</p>
      <div className="project-links">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          Voir sur GitHub
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
            Demo
          </a>
        )}
      </div>
      <div className="project-stats">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
      </div>
    </div>
  )
}

export default ProjectCard
