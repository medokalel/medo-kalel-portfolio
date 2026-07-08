import React, { useState } from 'react'
import styles from './Projects.module.css'
import ecommerce from '../../assets/images/ProductService Landing Page Website in Black Blue Techflux Style.png'
import landingPage from '../../assets/images/ProductService Landing Page Website in Black Blue Techflu Style.png'
import portfolio from '../../assets/images/Screenshot 2026-05-14 210051.png'
import qrLandingPage from '../../assets/images/Screenshot 2026-05-14 210400.png'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('latest')

  const projects = [
    {
      id: 1,
      category: 'E-Commerce',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory, payment integration, and advanced product filtering.',
      image: ecommerce,
      tags: ['React', 'JavaScript', 'Bootstrap', 'CSS3'],
      liveUrl: 'https://react-ecommerce-app-sigma.vercel.app/',
      codeUrl: 'https://github.com/medokalel/react-ecommerce-app',
      date: '2026-06-15'
    },
    {
      id: 2,
      category: 'Landing Page',
      title: 'Landing Page',
      description: 'A modern and responsive coffee website featuring smooth animations, interactive sections, and a visually engaging user experience.',
      image: landingPage,
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      liveUrl: 'https://medokalel.github.io/velora-coffee/',
      codeUrl: 'https://github.com/medokalel/velora-coffee',
      date: '2026-05-28'
    },
    {
      id: 3,
      category: 'Landing Page',
      title: 'Qr Landing Page',
      description: 'A modern QR code landing page featuring responsive design, clean UI, smooth interactions, and a scrolling logo marquee showcasing trusted brands for a more engaging user experience.',
      image: qrLandingPage,
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      liveUrl: 'https://qr-landing-page-nine.vercel.app/',
      codeUrl: 'https://github.com/medokalel/qr-landing-page',
      date: '2026-05-20'
    },
    {
      id: 4,
      category: 'Portfolio',
      title: 'Portfolio WebSite',
      description: 'My personal portfolio built with React and CSS Modules, featuring smooth animations, a responsive design, and sections for projects, services, and journey to showcase my skills as a front-end developer.',
      image: portfolio,
      tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
      liveUrl: 'https://medo-kalel-portfolio.vercel.app/',
      codeUrl: '#',
      date: '2026-04-10'
    }
  ]

  const filters = [
    { key: 'latest', label: 'Latest', icon: 'fa-clock' },
    { key: 'all', label: 'All', icon: 'fa-layer-group' },
    { key: 'Portfolio', label: 'Portfolio', icon: 'fa-briefcase' },
    { key: 'Landing Page', label: 'Landing Page', icon: 'fa-rocket' },
    { key: 'E-Commerce', label: 'E-Commerce', icon: 'fa-cart-shopping' }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'latest') return true
    return project.category === activeFilter
  }).sort((a, b) => {
    if (activeFilter === 'latest') {
      return new Date(b.date) - new Date(a.date)
    }
    return new Date(b.date) - new Date(a.date)
  })

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

        <div className={`${styles.grid} row g-4`}>
          {filteredProjects.map((project) => (
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
      </div>
    </section>
  )
}