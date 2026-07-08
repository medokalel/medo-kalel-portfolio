import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectsPage.module.css'
import { projectsData, getAllProjectsSorted, formatDate } from '../../components/projectsData/projectsData'

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { key: 'all', label: 'All Projects', icon: 'fa-layer-group' },
    { key: 'Portfolio', label: 'Portfolio', icon: 'fa-briefcase' },
    { key: 'Landing Page', label: 'Landing Page', icon: 'fa-rocket' },
    { key: 'E-Commerce', label: 'E-Commerce', icon: 'fa-cart-shopping' }
  ]

  const allProjects = getAllProjectsSorted()

  const filteredProjects = allProjects.filter((project) => {
    if (activeFilter === 'all') return true
    return project.category === activeFilter
  })

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className="container">
          <Link to="/" className={styles.backLink}>
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
          <h1 className={styles.heroTitle}>
            All <span className={styles.gradient}>Projects</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Explore my complete collection of work across different categories
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <section className={styles.projectsSection}>
        <div className="container">
          {/* Filter Buttons */}
          <div className={styles.filterContainer}>
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={`${styles.filterBtn} ${activeFilter === filter.key ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                <i className={`fas ${filter.icon}`}></i>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className={styles.resultsCount}>
            Showing <span>{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
          </div>

          {/* Projects Grid */}
          <div className={`${styles.grid} row g-4`}>
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="col-lg-4 col-md-6">
                <div className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
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
        </div>
      </section>
    </div>
  )
}