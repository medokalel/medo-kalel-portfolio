export interface ContactFields {
  from_name: string
  from_email: string
  subject: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Returns an error message per invalid field (empty object = valid). */
export function validateContact(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.from_name.trim()
  const email = values.from_email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.from_name = 'Please enter your name.'
  else if (name.length < 2) errors.from_name = 'Name must be at least 2 characters.'

  if (!email) errors.from_email = 'Please enter your email.'
  else if (!EMAIL_RE.test(email)) errors.from_email = 'Please enter a valid email address.'

  if (!subject) errors.subject = 'Please enter a subject.'
  else if (subject.length < 3) errors.subject = 'Subject must be at least 3 characters.'

  if (!message) errors.message = 'Please write a message.'
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.'

  return errors
}