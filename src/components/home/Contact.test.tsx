import { fireEvent, render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Contact from './Contact'

const sendForm = vi.fn().mockResolvedValue({ status: 200 })
vi.mock('@emailjs/browser', () => ({ default: { sendForm: (...a: unknown[]) => sendForm(...a) } }))

vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'svc')
vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'tpl')
vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'key')

function fillForm(container: HTMLElement, trap?: string) {
  fireEvent.change(container.querySelector('#contact-from_name')!, { target: { value: 'Ahmed Ali' } })
  fireEvent.change(container.querySelector('#contact-from_email')!, { target: { value: 'ahmed@example.com' } })
  fireEvent.change(container.querySelector('#contact-subject')!, { target: { value: 'Hello there' } })
  fireEvent.change(container.querySelector('#contact-message')!, { target: { value: 'A message long enough to pass validation.' } })
  if (trap) fireEvent.change(container.querySelector('input[name="contact_website"]')!, { target: { value: trap } })
}

describe('Contact form spam protection', () => {
  beforeEach(() => sendForm.mockClear())

  it('sends the email for a normal visitor', async () => {
    const { container } = render(<Contact />)
    fillForm(container)
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => expect(sendForm).toHaveBeenCalledTimes(1))
  })

  it('does not send when the honeypot field is filled (bot)', async () => {
    const { container } = render(<Contact />)
    fillForm(container, 'http://spam.example')
    fireEvent.submit(container.querySelector('form')!)
    // The bot sees a normal "sent" reset, but no email goes out.
    await waitFor(() => expect((container.querySelector('#contact-from_name') as HTMLInputElement).value).toBe(''))
    expect(sendForm).not.toHaveBeenCalled()
  })

  it('keeps the trap out of the accessibility tree and tab order', () => {
    const { container } = render(<Contact />)
    const trap = container.querySelector('input[name="contact_website"]')!
    expect(trap.getAttribute('tabindex')).toBe('-1')
    expect(trap.closest('[aria-hidden="true"]')).not.toBeNull()
  })
})
