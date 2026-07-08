import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Projects.module.css'
import { getLatestProjects, formatDate } from '../../components/projectsData/projectsData'

export default function Projects() {
  const latestProjects = getLatestProjects(4)

  return (
    <section id="projects" className={styles.projects}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.label}>FEATURED WORK</span>
          <h2 className={styles.title}>
            Projects That <span className={styles.gradient}>Define Me</span>
          </h2>
          <p className={styles.subtitle}>
            A showcase of my recent work, demonstrating expertise in modern web development
            and problem-solving
          </p>
        </div>

        <div className={`${styles.grid} row g-4`}>
          {latestProjects.map((project) => (
            <div key={project.id} className="col-md-6">
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={project.image} alt={project.title} className={styles.image} />
                  <div className={styles.overlay}>
                    <a href={project.liveUrl} target='_blank' rel='noopener noreferrer' className={styles.overlayBtn}>
                      <i className="fas fa-external-link-alt"></i>
                      Live Demo
                    </a>
                    <a href={project.codeUrl} target='_blank' rel='noopener noreferrer' className={styles.overlayBtn}>
                      <i className="fas fa-code"></i>
                      Code
                    </a>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <span className={styles.category}>{project.category}</span>
                    <span className={styles.date}>
                      <i className="far fa-calendar-alt"></i>
                      {formatDate(project.date)}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAllContainer}>
          <Link to="/projectspage" className={styles.viewAllBtn}>
            <span>View All Projects</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}