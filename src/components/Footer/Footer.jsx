import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <p className={styles.copyright}>
            &copy; 2026 Mohamed Khalel. All rights reserved.
          </p>
          <div className={styles.links}>
            <a href="#" className={styles.link}>Privacy</a>
            <a href="#" className={styles.link}>Terms</a>
            <button className={styles.backToTop} onClick={scrollToTop}>
              Back to Top
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
          <p className={styles.builtWith}>
            Built with
            <i className={`${styles.heart} fas fa-heart`}></i>
            using React & Bootstrap
          </p>
        </div>
      </div>
    </footer>
  )
}