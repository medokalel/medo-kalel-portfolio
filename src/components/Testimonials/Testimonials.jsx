import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: 'Incredible work! The developer transformed our outdated website into a modern, responsive platform. Performance improved dramatically, and our users love the new interface.',
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCo',
      initials: 'MC',
      rating: 5
    },
    {
      id: 2,
      quote: 'Professional, skilled, and easy to communicate with. The React application built for us is robust, scalable, and perfectly matches our requirements. Highly recommended!',
      name: 'Emily Rodriguez',
      role: 'CTO, Digital Solutions',
      initials: 'ER',
      rating: 5
    },
    {
      id: 3,
      quote: 'Outstanding developer with deep knowledge of modern web technologies. Delivered a complex e-commerce platform that handles thousands of transactions seamlessly.',
      name: 'David Park',
      role: 'Founder, ShopFlow',
      initials: 'DP',
      rating: 5
    },
    {
      id: 4,
      quote: 'Exceptional attention to detail and great problem-solving skills. The landing page conversion rate increased by 40% after the redesign. Truly impressive work!',
      name: 'Sarah Johnson',
      role: 'Marketing Director, GrowthLabs',
      initials: 'SJ',
      rating: 5
    },
    {
      id: 5,
      quote: 'A pleasure to work with! Delivered the project ahead of schedule with clean, well-documented code. The component library built has saved our team countless hours.',
      name: 'Alex Thompson',
      role: 'Lead Developer, TechStart',
      initials: 'AT',
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.label}>TESTIMONIALS</span>
          <h2 className={styles.title}>
            What People <span className={styles.gradient}>Say</span>
          </h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides={true}
          navigation={{
            prevEl: '.swiper-prev',
            nextEl: '.swiper-next'
          }}
          pagination={{
            clickable: true,
            el: `.${styles.pagination}`,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
              centeredSlides: false
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 24,
              centeredSlides: true
            }
          }}
          className={styles.swiper}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className={styles.slide}>
              <div className={styles.card}>
                <div className={styles.quoteIcon}>
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{testimonial.initials}</div>
                  <div className={styles.info}>
                    <h4 className={styles.name}>{testimonial.name}</h4>
                    <p className={styles.role}>{testimonial.role}</p>
                    <div className={styles.stars}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.navWrapper}>
          <button className={`swiper-prev ${styles.navBtn}`}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className={styles.pagination}></div>
          <button className={`swiper-next ${styles.navBtn}`}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}