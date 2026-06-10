import React from 'react'
import styles from './Journey.module.css'

export default function Journey() {
const experiences = [
  {
    id: 3,
    title: 'Front-End Developer Intern',
    company: 'CASCO',
    period: '2026 - present',
    description: 'Working on real product UI at one of the world\'s leading testing and certification companies, focusing on building and improving web interfaces while spending a lot of time in Figma.',
    achievements: ['Working on real product UI', 'Collaborating with design in Figma', 'Applying React & modern CSS'],
    side: 'right'
  },
  {
    id: 2,
    title: 'React Front-End Developer Trainee',
    company: 'Digital Egypt Pioneers Initiative (DEPI)',
    period: '2025 - 2026',
    description: 'Currently enrolled in an intensive React Front-End Development track focused on building modern, responsive web applications and applying industry best practices.',
    achievements: ['Completed HTML5, CSS3 & Responsive Design modules', 'Building real-world React projects', 'Improving problem-solving & UI skills'],
    side: 'left'
  },
  {
    id: 1,
    title: 'Web Development Journey Started',
    company: 'Self-Taught Learning',
    period: '2023 - 2025',
    description: 'Started learning web development fundamentals including HTML, CSS, and JavaScript while building small projects to practice and improve skills.',
    achievements: ['Built first responsive websites', 'Completed core web development fundamentals', 'Started GitHub portfolio'],
    side: 'right'
  }
]

  return (
    <section id="journey" className={styles.journey}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.label}>MY JOURNEY</span>
          <h2 className={styles.title}>
            The Path <span className={styles.gradient}>So Far</span>
          </h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.line}></div>
          {experiences.map((exp) => (
            <div key={exp.id} className={`${styles.item} ${styles[exp.side]}`}>
              <div className={styles.dotWrapper}>
                <div className={styles.dot}></div>
              </div>
              <div className={styles.period}>{exp.period}</div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{exp.title}</h3>
                <p className={styles.company}>{exp.company}</p>
                <p className={styles.description}>{exp.description}</p>
                <div className={styles.achievements}>
                  {exp.achievements.map((achievement) => (
                    <span key={achievement} className={styles.achievement}>{achievement}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}