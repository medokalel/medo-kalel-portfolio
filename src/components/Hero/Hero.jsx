import React from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={`${styles.container} container-fluid`}>
          <div className={styles.codeSnippetLeft}>
            <pre className={styles.codeBlock}>
              <code>
                {`const app = () => {
    return <UI />
  }`}
              </code>
            </pre>
          </div>
          <div className={styles.codeSnippetRightTop}>
            <pre className={styles.codeBlock}>
              <code>
                {`function build() {
    deploy();
  }`}
              </code>
            </pre>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.badge}>
              <span className={styles.dot}></span>
              Available for Work
            </div>
            <h1 className={styles.title}>
              Building Digital
              <br />
              <span className={styles.gradient}>Experiences</span>
              <br />
              That Matter
            </h1>
            <p className={styles.subtitle}>
              Front-End Developer specializing in React, TypeScript & Modern UI
            </p>
            <div className={styles.buttons}>
              <a href="#projects" className={styles.primaryBtn}>
                View My Work
                <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#contact" className={styles.secondaryBtn}>
                Contact Me
              </a>
            </div>
            <div className={styles.socials}>
              <a href="https://github.com/medokalel" target='_blank' className={styles.socialLink}>
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/mohamed-khalel1" target='_blank' className={styles.socialLink}>
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.facebook.com/mohamedkhalel4" target='_blank' className={styles.socialLink}>
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
          <div className={styles.codeSnippetLeftBottom}>
            <pre className={styles.codeBlock}>
              <code>
                {`.container {
    display: flex;
  }`}
              </code>
            </pre>
          </div>
          <div className={styles.codeSnippetRightBottom}>
            <pre className={styles.codeBlock}>
              <code>
                {`git commit -m
    "✨ feature"`}
              </code>
            </pre>
          </div>
        </div>
        <a href='#about' className={`${styles.scrollIndicator} text-decoration-none`}>
          <span className={styles.scrollText}>Scroll to explore</span>
          <i className={`${styles.scrollIcon} fas fa-chevron-down`}></i>
        </a>
      </div>
      <div className={styles.bg1}></div>
      <div className={styles.bg2}></div>

    </section>
  )
}