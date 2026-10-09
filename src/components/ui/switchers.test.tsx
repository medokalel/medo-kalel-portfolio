import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import i18n from '@/i18n'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('toggles the theme and updates its accessible name', async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })
})

describe('LanguageSwitcher', () => {
  it('switches to Arabic: lang, dir and title follow', async () => {
    await i18n.changeLanguage('en')
    render(<LanguageSwitcher />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch language to Arabic' }))

    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.title).toBe('محمد خليل | مطوّر واجهات أمامية')

    await i18n.changeLanguage('en')
    expect(document.documentElement.dir).toBe('ltr')
  })
})