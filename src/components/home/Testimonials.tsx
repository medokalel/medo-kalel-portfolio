import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { testimonials } from '@/content/testimonials'

const navBtn =
  'flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-fg-muted transition-all duration-300 hover:border-accent hover:bg-accent/20 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-0 bg-section-alt px-4 py-24">
      <div className="site-container">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-xs font-semibold tracking-widest text-accent uppercase">Testimonials</span>
          <h2 className="m-0 text-5xl leading-[1.1] font-extrabold text-fg max-md:text-[2rem]">
            What People{' '}
            <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">Say</span>
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides
          navigation={{ prevEl: '.tm-prev', nextEl: '.tm-next' }}
          pagination={{
            clickable: true,
            el: '.tm-pagination',
            bulletClass: 'tm-bullet',
            bulletActiveClass: 'tm-bullet-active',
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
            992: { slidesPerView: 3, spaceBetween: 24, centeredSlides: true },
          }}
          className="relative z-[1] pt-8 pb-16"
        >
          {testimonials.map((t) => (
            <SwiperSlide
              key={t.id}
              className="group h-auto scale-90 transition-all duration-400 [&.swiper-slide-active]:z-10 [&.swiper-slide-active]:scale-105"
            >
              <figure className="m-0 flex h-full flex-col rounded-3xl border border-line bg-card p-10 transition-[border-color,box-shadow] duration-300 group-[.swiper-slide-active]:border-accent/30 group-[.swiper-slide-active]:shadow-[0_20px_60px_rgba(99,102,241,0.15)] max-md:p-6">
                <i className="fas fa-quote-left mb-6 text-[2.5rem] text-accent/30" aria-hidden="true" />
                <blockquote className="m-0 mb-8 flex-1 text-base leading-[1.8] text-fg-muted group-[.swiper-slide-active]:text-[1.1rem] group-[.swiper-slide-active]:text-[#d1d5db]">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <div
                    className="flex size-[52px] items-center justify-center rounded-full bg-linear-135/srgb from-brand-from to-brand-to text-[1.1rem] font-bold text-white"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className="flex flex-col gap-[0.2rem]">
                    <p className="m-0 text-base leading-[1.2] font-semibold text-fg">{t.name}</p>
                    <p className="m-0 text-[0.8rem] text-fg-subtle">{t.role}</p>
                    <div className="mt-[0.3rem] flex gap-[0.2rem]" role="img" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <i key={i} className="fas fa-star text-xs text-accent" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 flex items-center justify-center gap-6 max-md:gap-4">
          <button type="button" className={`tm-prev ${navBtn}`} aria-label="Previous testimonial">
            <i className="fas fa-chevron-left rtl:rotate-180" aria-hidden="true" />
          </button>
          <div className="tm-pagination flex items-center gap-2" />
          <button type="button" className={`tm-next ${navBtn}`} aria-label="Next testimonial">
            <i className="fas fa-chevron-right rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}