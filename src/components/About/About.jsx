import React from 'react'
import styles from './About.module.css'
import mohamed from '../../assets/images/Mohamed Khalel 1.png'

export default function About() {
  const skills = [
    'React', 'TypeScript', 'Tailwind', 'Bootstrap', 'HTML5', 'CSS3', 'JavaScript' ,'Redux', 'REST APIs', 'Figma', 'Git'
  ]

  return (
    <section id="about" className={styles.about}>
      <div className={`${styles.container} container`}>
        <div className={`${styles.grid} row`}>
          <div className={`${styles.left} col-lg-6`}>
            <span className={styles.label}>ABOUT ME</span>
            <h2 className={styles.title}>
              Crafting Code,
              <br />
              <span className={styles.gradient}>Creating Impact</span>
            </h2>
            <p className={styles.text}>
              I'm a passionate Front-End Developer focused on building modern and interactive web applications using React, JavaScript (ES6+), HTML, and CSS. I enjoy creating responsive user interfaces with clean designs and smooth user experiences that combine both performance and usability.
            </p>
            <p className={styles.text}>
              My journey in web development started with a strong interest in how websites work and how digital experiences are built. Today, I specialize in developing responsive and scalable front-end applications while continuously improving my skills through real-world projects and modern web technologies.
            </p>
            <p className={styles.text}>
              Currently, I'm studying Engineering and participating in the Digital Egypt Pioneers Initiative (DEPI) within the React Front-End Developer track. I'm constantly working on improving my technical and problem-solving skills, with the goal of joining a professional team where I can contribute to building impactful digital products.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Happy Clients</span>
              </div>
            </div>
          </div>
          <div className={`${styles.right} col-lg-6`}>
            <div className={styles.card}>
              <div className={styles.avatar}>
                <img src={mohamed} alt='img for mohamed Khalel' className={styles.avatarText}/>
              </div>
              <h3 className={styles.name}>Mohamed Khalel</h3>
              <p className={styles.role}>Front-End Developer</p>
              <div className={styles.location}>
                <i className="fas fa-map-marker-alt"></i>
                <span>Tanta, Egypt</span>
              </div>
              <div className={styles.divider}></div>
              <h4 className={styles.skillsTitle}>Skills & Technologies</h4>
              <div className={styles.skills}>
                {skills.map((skill) => (
                  <span key={skill} className={styles.skill}>{skill}</span>
                ))}
              </div>
              <div className={styles.badges}>
                <div className={styles.badge}>
                  <i className="fas fa-award"></i>
                  <span>Certified</span>
                </div>
                <div className={styles.badge}>
                  <i className="fas fa-coffee"></i>
                  <span>Coffee Addict</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}