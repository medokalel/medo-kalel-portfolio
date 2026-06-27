import React from 'react'
import styles from './Projects.module.css'
import ecommerce from '../../assets/images/ProductService Landing Page Website in Black Blue Techflux Style.png'
import landingPage from '../../assets/images/ProductService Landing Page Website in Black Blue Techflu Style.png'
import portfolio from '../../assets/images/Screenshot 2026-05-14 210051.png'
import qrLandingPage from '../../assets/images/Screenshot 2026-05-14 210400.png'

export default function Projects() {
  const projects = [
    {
      id: 1,
      category: 'React',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory, payment integration, and advanced product filtering.',
      image: ecommerce,
      tags: ['React', 'JavaScript', 'Bootstrap', 'CSS3'],
      liveUrl: 'https://react-ecommerce-app-sigma.vercel.app/',
      codeUrl: 'https://github.com/medokalel/react-ecommerce-app'
    },
    {
      id: 2,
      category: 'JavaScript',
      title: 'Landing Page',
      description: 'A modern and responsive coffee website featuring smooth animations, interactive sections, and a visually engaging user experience.',
      image: landingPage,
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      liveUrl: 'https://medokalel.github.io/velora-coffee/',
      codeUrl: 'https://github.com/medokalel/velora-coffee'
    },
    {
      id: 3,
      category: 'JavaScript',
      title: 'Qr Landing Page',
      description: 'A modern QR code landing page featuring responsive design, clean UI, smooth interactions, and a scrolling logo marquee showcasing trusted brands for a more engaging user experience.',
      image: qrLandingPage,
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      liveUrl: 'https://stately-rolypoly-069223.netlify.app/',
      codeUrl: 'https://github.com/medokalel/qr-landing-page'
    },
    {
      id: 4,
      category: 'React',
      title: 'Portfolio WebSite',
      description: 'No-code portfolio builder with customizable templates, drag-and-drop editor, and instant deployment.',
      image: portfolio,
      tags: ['React', 'JavaScript', 'CSS3', 'Bootstrap'],
      liveUrl: 'https://medo-kalel-portfolio.vercel.app/',
      codeUrl: '#'
    }
  ]

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
          {projects.map((project) => (
            <div key={project.id} className="col-md-6">
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={project.image} alt={project.title} className={styles.image} />
                  <div className={styles.overlay}>
                    <a href={project.liveUrl} target='_blank' className={styles.overlayBtn}>
                      <i className="fas fa-external-link-alt"></i>
                      Live Demo
                    </a>
                    <a href={project.codeUrl} target='_blank' className={styles.overlayBtn}>
                      <i className="fas fa-code"></i>
                      Code
                    </a>
                  </div>
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{project.category}</span>
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