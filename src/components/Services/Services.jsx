import React from 'react'
import styles from './Services.module.css'

export default function Services() {
  const services = [
    {
      id: 1,
      icon: 'fa-code',
      title: 'Front-End Development',
      description: 'Building responsive, performant web applications using modern frameworks and best practices.',
      features: ['React & Next.js', 'TypeScript', 'State Management', 'API Integration']
    },
    {
      id: 2,
      icon: 'fa-palette',
      title: 'Responsive Design',
      description: 'Creating beautiful, accessible interfaces that work seamlessly across all devices and screen sizes.',
      features: ['Mobile-First', 'Cross-Browser', 'Accessibility', 'Modern CSS']
    },
    {
      id: 3,
      icon: 'fa-mobile-alt',
      title: 'Landing Pages',
      description: 'Crafting high-converting landing pages with engaging animations and optimized user flows.',
      features: ['SEO Optimized', 'Fast Loading', 'Conversion Focused', 'Analytics Ready']
    },
    {
      id: 4,
      icon: 'fa-atom',
      title: 'React Applications',
      description: 'Developing scalable single-page applications with complex state management and routing.',
      features: ['Redux/Zustand', 'React Router', 'Code Splitting', 'Testing']
    },
    {
      id: 5,
      icon: 'fa-bolt',
      title: 'UI Implementation',
      description: 'Translating designs from Figma, Sketch, or Adobe XD into pixel-perfect, interactive interfaces.',
      features: ['Figma to Code', 'Design Systems', 'Component Libraries', 'Animations']
    },
    {
      id: 6,
      icon: 'fa-tachometer-alt',
      title: 'Performance Optimization',
      description: 'Enhancing application speed and efficiency through code optimization and best practices.',
      features: ['Bundle Size', 'Lazy Loading', 'Caching', 'Lighthouse Scores']
    }
  ]

  return (
    <section id="services" className={styles.services}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.label}>SERVICES</span>
          <h2 className={styles.title}>
            What I Can Do <span className={styles.gradient}>For You</span>
          </h2>
          <p className={styles.subtitle}>
            Comprehensive web development services tailored to bring your ideas to life
          </p>
        </div>
        <div className={`${styles.grid} row g-4`}>
          {services.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className={styles.card}>
                <div className={styles.iconWrapper}>
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <ul className={styles.features}>
                  {service.features.map((feature) => (
                    <li key={feature} className={styles.feature}>
                      <span className={styles.dot}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}