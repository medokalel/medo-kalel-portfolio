import React, { useState, useRef } from 'react'
import styles from './Contact.module.css'
import emailjs from '@emailjs/browser'

export default function Contact() {
  let [copied, setCopied] = useState(false)
  let [sending, setSending] = useState(false)
  let [sent, setSent] = useState(false)
  let formRef = useRef()

  let copyEmail = () => {
    navigator.clipboard.writeText('mohamedkhalel852@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    emailjs.sendForm(
      'service_1vuai0j',
      'template_dz5nngd',
      formRef.current,
      'Yae1rjnNqq1a6DpwP'
    ).then(() => {
      setSending(false)
      setSent(true)
      formRef.current.reset()
      setTimeout(() => setSent(false), 3000)
    }).catch((err) => {
      setSending(false)
      console.error('Failed:', err)
    })
  }

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={`${styles.contactContainer} container`}>
        <div className={styles.contactHeader}>
          <span className={styles.contactLabel}>GET IN TOUCH</span>
          <h2 className={styles.contactTitle}>
            Let's Work <span className={styles.contactGradient}>Together</span>
          </h2>
          <p className={styles.contactSubtitle}>
            Have a project in mind? Let's talk and make it happen
          </p>
        </div>
        <div className={`${styles.contactGrid} row g-4`}>
          <div className="col-lg-7">
            <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label className={styles.labelText}>Name</label>
                <input
                  type="text"
                  name="from_name"
                  className={styles.input}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.labelText}>Email</label>
                <input
                  type="email"
                  name="from_email"
                  className={styles.input}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.labelText}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  className={styles.input}
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.labelText}>Message</label>
                <textarea
                  className={styles.textarea}
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`${styles.submitBtn} ${sent ? styles.sent : ''} ${sending ? styles.sending : ''}`}
                disabled={sending}
              >
                {sending ? (
                  <span className={styles.btnContent}>
                    <i className={`${styles.spinner} fas fa-circle-notch`}></i>
                    Sending...
                  </span>
                ) : sent ? (
                  <span className={styles.btnContent}>
                    <i className={`${styles.checkIcon} fas fa-check`}></i>
                    Message Sent!
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
          <div className="col-lg-5">
            <div className={styles.infoCards}>
              <div className={styles.infoCard} onClick={copyEmail}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.infoContent}>
                  <h4 className={styles.infoTitle}>Email</h4>
                  <p className={styles.infoValue}>mohamedkhalel852@gmail.com</p>
                  <span className={styles.infoHint}>
                    {copied ? 'Copied!' : 'Click to copy'}
                  </span>
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.infoContent}>
                  <h4 className={styles.infoTitle}>Location</h4>
                  <p className={styles.infoValue}>Marsa Matrouh, Egypt</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.statusBadge}>
                  <span className={styles.statusDot}></span>
                  Available for Work
                </div>
                <div className={styles.responseTime}>
                  <i className="far fa-clock"></i>
                  <span>Usually responds in 24h</span>
                </div>
              </div>
              <div className={styles.socials}>
                <a href="https://github.com/medokalel" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/mohamed-khalel1" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.facebook.com/mohamedkhalel4" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}