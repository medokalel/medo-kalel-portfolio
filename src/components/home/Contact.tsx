import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { contactInfo } from '@/content/contact'
import { socialLinks } from '@/content/profile'
import { validateContact, type ContactErrors, type ContactFields } from '@/lib/validation'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const emptyValues: ContactFields = { from_name: '', from_email: '', subject: '', message: '' }

const inputClass =
  'w-full rounded-[0.8rem] border border-line bg-field px-4 py-[0.8rem] text-[0.9rem] text-fg transition-colors duration-300 placeholder:text-placeholder focus:border-accent focus:outline-none aria-[invalid=true]:border-red-500'

const infoCardClass =
  'flex cursor-pointer items-center gap-4 rounded-2xl border border-line bg-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-[3px] hover:border-accent/30'

// The Facebook icon in this section uses the "-f" glyph.
const socialIcon = (id: string, icon: string) => (id === 'facebook' ? 'fab fa-facebook-f' : icon)

export default function Contact() {
  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<ContactFields>(emptyValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const sending = status === 'sending'
  const sent = status === 'sent'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked (insecure context / permissions): nothing else to do.
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name as keyof ContactFields]) setErrors(validateContact(next))
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactFields
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateContact(values))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    setTouched({ from_name: true, from_email: true, subject: true, message: true })
    if (Object.keys(found).length > 0) {
      const first = (['from_name', 'from_email', 'subject', 'message'] as const).find((k) => found[k])
      if (first) document.getElementById(`contact-${first}`)?.focus()
      return
    }

    const { VITE_EMAILJS_SERVICE_ID: serviceId, VITE_EMAILJS_TEMPLATE_ID: templateId, VITE_EMAILJS_PUBLIC_KEY: publicKey } =
      import.meta.env
    if (!serviceId || !templateId || !publicKey || !formRef.current) {
      console.error('EmailJS is not configured. Copy .env.example to .env and fill in the values.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      // Loaded on demand: the email SDK is only needed once someone actually sends the form.
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus('sent')
      setValues(emptyValues)
      setTouched({})
      setErrors({})
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      console.error('Failed:', err)
      setStatus('error')
    }
  }

  const field = (name: keyof ContactFields) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] && touched[name] ? true : undefined,
    'aria-describedby': errors[name] && touched[name] ? `contact-${name}-error` : undefined,
    className: inputClass,
  })

  const fieldError = (name: keyof ContactFields) => {
    const key = errors[name]
    if (!key || !touched[name]) return null
    return (
      <p id={`contact-${name}-error`} className="mt-[0.4rem] mb-0 text-[0.8rem] text-red-400">
        {t(`contact.errors.${key}`)}
      </p>
    )
  }

  const labelClass = 'mb-2 block text-[0.85rem] font-medium text-fg-muted'

  return (
    <section id="contact" className="bg-section-alt px-4 py-24">
      <div className="site-container">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-xs font-semibold tracking-widest text-accent-fg uppercase">{t('contact.label')}</span>
          <h2 className="mb-4 text-5xl leading-[1.1] font-extrabold text-fg max-md:text-[2rem]">
            {t('contact.titleStart')}{' '}
            <span className="bg-linear-135/srgb from-brand-from to-brand-to bg-clip-text text-transparent">
              {t('contact.titleHighlight')}
            </span>
          </h2>
          <p className="mb-4 text-base text-fg-muted">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-line bg-card p-8 max-md:p-6"
            >
              <div className="mb-[1.2rem]">
                <label htmlFor="contact-from_name" className={labelClass}>{t('contact.name')}</label>
                <input type="text" autoComplete="name" placeholder={t('contact.namePlaceholder')} {...field('from_name')} />
                {fieldError('from_name')}
              </div>
              <div className="mb-[1.2rem]">
                <label htmlFor="contact-from_email" className={labelClass}>{t('contact.email')}</label>
                <input type="email" autoComplete="email" placeholder={t('contact.emailPlaceholder')} {...field('from_email')} />
                {fieldError('from_email')}
              </div>
              <div className="mb-[1.2rem]">
                <label htmlFor="contact-subject" className={labelClass}>{t('contact.subject')}</label>
                <input type="text" placeholder={t('contact.subjectPlaceholder')} {...field('subject')} />
                {fieldError('subject')}
              </div>
              <div className="mb-[1.2rem]">
                <label htmlFor="contact-message" className={labelClass}>{t('contact.message')}</label>
                <textarea
                  rows={5}
                  placeholder={t('contact.messagePlaceholder')}
                  {...field('message')}
                  className={cn(inputClass, 'min-h-[120px] resize-y')}
                />
                {fieldError('message')}
              </div>

              <button
                type="submit"
                disabled={sending}
                className={cn(
                  'relative w-full cursor-pointer overflow-hidden rounded-full border-0 px-8 py-[0.9rem] text-[0.95rem] font-semibold text-white transition-all duration-400',
                  'hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-90',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  sent
                    ? 'animate-success-pop bg-linear-135/srgb from-success to-[#16a34a] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)]'
                    : 'bg-linear-135/srgb from-brand-from to-brand-to hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)]',
                  'motion-reduce:animate-none motion-reduce:transition-none',
                )}
              >
                {sending ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <i className="fas fa-circle-notch animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    {t('contact.sending')}
                  </span>
                ) : sent ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <i className="fas fa-check animate-check-bounce motion-reduce:animate-none" aria-hidden="true" />
                    {t('contact.sent')}
                  </span>
                ) : (
                  t('contact.send')
                )}
              </button>

              <p role="status" aria-live="polite" className={cn('mt-3 mb-0 text-center text-[0.85rem]', status === 'error' ? 'text-red-400' : 'sr-only')}>
                {status === 'error' && t('contact.failed')}
                {sent && t('contact.sentStatus')}
              </p>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4 max-lg:mt-4">
              <button type="button" onClick={copyEmail} className={cn(infoCardClass, 'w-full text-start')}>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[0.6rem] bg-brand-from/15">
                  <i className="fas fa-envelope text-base text-accent-fg" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-[0.2rem]">
                  <span className="m-0 text-base leading-[1.2] font-semibold text-fg">{t('contact.email')}</span>
                  <span className="m-0 text-[0.85rem] text-fg-muted">{contactInfo.email}</span>
                  <span className="text-xs text-fg-subtle" role="status">
                    {copied ? t('contact.copied') : t('contact.copyHint')}
                  </span>
                </span>
              </button>

              <div className={cn(infoCardClass, 'cursor-default')}>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[0.6rem] bg-brand-from/15">
                  <i className="fas fa-map-marker-alt text-base text-accent-fg" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-[0.2rem]">
                  <p className="m-0 text-base leading-[1.2] font-semibold text-fg">{t('contact.locationLabel')}</p>
                  <p className="m-0 text-[0.85rem] text-fg-muted">{t('contact.location')}</p>
                </div>
              </div>

              <div className={cn(infoCardClass, 'cursor-default')}>
                <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/15 px-[0.8rem] py-[0.4rem] text-[0.8rem] font-medium text-success-fg">
                  <span className="size-2 animate-dot-pulse rounded-full bg-success motion-reduce:animate-none" aria-hidden="true" />
                  {t('contact.availability')}
                </div>
                <div className="flex items-center gap-2 text-[0.85rem] text-fg-subtle">
                  <i className="far fa-clock text-accent-fg" aria-hidden="true" />
                  <span>{t('contact.responseTime')}</span>
                </div>
              </div>

              <div className="mt-2 flex gap-[0.8rem]">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex flex-1 items-center justify-center rounded-[0.8rem] border border-line bg-card p-[0.8rem] text-fg-muted no-underline transition-all duration-300 hover:border-accent/30 hover:bg-accent/15 hover:text-accent-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <i className={cn(socialIcon(s.id, s.icon), 'text-[1.1rem]')} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
