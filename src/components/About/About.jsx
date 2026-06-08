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
              I'm Mohamed Khalel, a front-end developer from Egypt. I build with React, JavaScript, TypeScript, and CSS. Most of my focus goes into making interfaces that work well on any screen and don't get in the user's way.
            </p>
            <p className={styles.text}>
              I completed the DEPI React Front-End Developer track and built several projects along the way: an e-commerce app, a weather app, and DevFolio. Honestly, I learned more from debugging those than from any course.
            </p>
            <p className={styles.text}>
              Currently interning at CASCO, one of the world's leading testing and certification companies, working on real product UI and spending a lot of time in Figma.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>1+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>0</span>
                <span className={styles.statLabel}>Clients</span>
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