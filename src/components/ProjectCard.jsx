import { motion } from 'framer-motion'

const ProjectCard = ({ repo }) => {
  return (
    <motion.div 
      className="project-card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}>
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {repo.name}
      </motion.h3>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}>
        {repo.description || "Pas de description disponible"}
      </motion.p>
      <motion.div 
        className="project-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        <motion.a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Voir sur GitHub
        </motion.a>
        {repo.homepage && (
          <motion.a 
            href={repo.homepage} 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Demo
          </motion.a>
        )}
      </motion.div>
      <motion.div 
        className="project-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}>
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
