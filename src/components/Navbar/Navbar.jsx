import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  let [isOpen, setIsOpen] = useState(false)
  let [scrolled, setScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} fixed-top`}>
        <div className={styles.container}>
          <a href="#" className={styles.logo}>Mohamed Khalel</a>
          <div className={styles.desktopNav}>
            <a href='#about' className={styles.navLink}>About</a>
            <a href='#projects' className={styles.navLink}>Projects</a>
            <a href='#services' className={styles.navLink}>Services</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </div>
          <div className={styles.actions}>
            {/* <button className={styles.themeToggle}>
              <i className="fas fa-sun"></i>
            </button> */}
            <a href="#contact" className={styles.ctaBtn}>Let's Talk</a>
            <button className={styles.burger} onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          <button className={styles.closeBtn} onClick={toggleMenu}>
            <i className="fas fa-times"></i>
          </button>
          <a href="#about" className={styles.sidebarLink} onClick={toggleMenu}>About</a>
          <a href="#projects" className={styles.sidebarLink} onClick={toggleMenu}>Projects</a>
          <a href="#services" className={styles.sidebarLink} onClick={toggleMenu}>Services</a>
          <a href="#contact" className={styles.sidebarLink} onClick={toggleMenu}>Contact</a>
          <a href="#contact" className={styles.sidebarCta} onClick={toggleMenu}>Let's Talk</a>
        </div>
      </div>
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  )
}