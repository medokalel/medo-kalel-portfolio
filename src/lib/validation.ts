export interface ContactFields {
  from_name: string
  from_email: string
  subject: string
  message: string
}

/** Keys into the locale files: t(`contact.errors.${key}`). */
export type ContactErrorKey =
  | 'nameRequired'
  | 'nameShort'
  | 'emailRequired'
  | 'emailInvalid'
  | 'subjectRequired'
  | 'subjectShort'
  | 'messageRequired'
  | 'messageShort'

export type ContactErrors = Partial<Record<keyof ContactFields, ContactErrorKey>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Returns an error key per invalid field (empty object = valid). */
export function validateContact(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.from_name.trim()
  const email = values.from_email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.from_name = 'nameRequired'
  else if (name.length < 2) errors.from_name = 'nameShort'

  if (!email) errors.from_email = 'emailRequired'
  else if (!EMAIL_RE.test(email)) errors.from_email = 'emailInvalid'

  if (!subject) errors.subject = 'subjectRequired'
  else if (subject.length < 3) errors.subject = 'subjectShort'

  if (!message) errors.message = 'messageRequired'
  else if (message.length < 10) errors.message = 'messageShort'

  return errors
}
