import { describe, expect, it } from 'vitest'
import { validateContact, type ContactFields } from './validation'

const valid: ContactFields = {
  from_name: 'Mohamed',
  from_email: 'me@example.com',
  subject: 'Hello',
  message: 'I would like to work with you.',
}

describe('validateContact', () => {
  it('accepts valid values', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('requires every field', () => {
    expect(validateContact({ from_name: '', from_email: '', subject: '', message: '' })).toEqual({
      from_name: 'nameRequired',
      from_email: 'emailRequired',
      subject: 'subjectRequired',
      message: 'messageRequired',
    })
  })

  it('treats whitespace-only input as empty', () => {
    expect(validateContact({ ...valid, from_name: '   ' }).from_name).toBe('nameRequired')
  })

  it('flags too-short values', () => {
    const errors = validateContact({ ...valid, from_name: 'M', subject: 'Hi', message: 'short' })
    expect(errors).toEqual({ from_name: 'nameShort', subject: 'subjectShort', message: 'messageShort' })
  })

  it.each(['plain', 'a@b', 'a b@c.com', '@example.com'])('rejects invalid email %s', (email) => {
    expect(validateContact({ ...valid, from_email: email }).from_email).toBe('emailInvalid')
  })
})