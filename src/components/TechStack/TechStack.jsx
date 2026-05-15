import React from 'react'
import styles from './TechStack.module.css'

export default function TechStack() {
  const techs = [
    { name: 'Redux', color: '#764abc' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'HTML5', color: '#e34f26' },
    { name: 'CSS3', color: '#1572b6' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Tailwind CSS', color: '#38bdf8' },
    { name: 'REST API', color: '#6366f1' },
    { name: 'Figma', color: '#f24e1e' },
    { name: 'Git', color: '#f05032' },
    { name: 'GitHub', color: '#ffffff' },
    { name: 'Redux', color: '#764abc' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'HTML5', color: '#e34f26' },
    { name: 'CSS3', color: '#1572b6' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Tailwind CSS', color: '#38bdf8' },
    { name: 'REST API', color: '#6366f1' },
    { name: 'Figma', color: '#f24e1e' },
    { name: 'Git', color: '#f05032' },
    { name: 'GitHub', color: '#ffffff' },
  ]

  const firstRow = techs.slice(0, 8)
  const secondRow = techs.slice(8)

  return (
    <section id="techstack" className={styles.techstack}>
      <div className={`${styles.container}`}>
        <div className={styles.header}>
          <span className={styles.label}>TECH STACK</span>
          <h2 className={styles.title}>
            Tools I Use to <span className={styles.gradient}>Build</span>
          </h2>
          <p className={styles.subtitle}>
            A curated collection of modern technologies and frameworks I leverage to create
            exceptional digital experiences
          </p>
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee}>
            <div className={styles.track}>
              {firstRow.map((tech, index) => (
                <div key={`first-${index}`} className={styles.card}>
                  <div className={styles.iconWrapper} style={{ '--glow-color': tech.color }}>
                    <div className={styles.icon} style={{ backgroundColor: tech.color }}></div>
                  </div>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
              {firstRow.map((tech, index) => (
                <div key={`first-dup-${index}`} className={styles.card}>
                  <div className={styles.iconWrapper} style={{ '--glow-color': tech.color }}>
                    <div className={styles.icon} style={{ backgroundColor: tech.color }}></div>
                  </div>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.marquee} ${styles.reverse}`}>
            <div className={styles.track}>
              {secondRow.map((tech, index) => (
                <div key={`second-${index}`} className={styles.card}>
                  <div className={styles.iconWrapper} style={{ '--glow-color': tech.color }}>
                    <div className={styles.icon} style={{ backgroundColor: tech.color }}></div>
                  </div>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
              {secondRow.map((tech, index) => (
                <div key={`second-dup-${index}`} className={styles.card}>
                  <div className={styles.iconWrapper} style={{ '--glow-color': tech.color }}>
                    <div className={styles.icon} style={{ backgroundColor: tech.color }}></div>
                  </div>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}