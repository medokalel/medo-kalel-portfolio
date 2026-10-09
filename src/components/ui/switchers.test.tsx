import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import i18n from '@/i18n'
import { readStoredLanguage } from '@/i18n/config'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

function Path() {
  return <output data-testid="path">{useLocation().pathname}</output>
}

describe('ThemeToggle', () => {
  it('toggles the theme and updates its accessible name', async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })
})

describe('LanguageSwitcher', () => {
  it('moves to the Arabic URL of the same page; lang, dir and title follow', async () => {
    await i18n.changeLanguage('en')
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <LanguageSwitcher />
        <Path />
      </MemoryRouter>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Switch language to Arabic' }))

    expect(screen.getByTestId('path')).toHaveTextContent('/ar/projects')
    expect(readStoredLanguage()).toBe('ar')
    expect(document.documentElement.lang).toBe('ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.title).toBe('محمد خليل | مطوّر واجهات أمامية')

    await userEvent.click(screen.getByRole('button', { name: 'تغيير اللغة إلى English' }))
    expect(screen.getByTestId('path')).toHaveTextContent(/^\/projects$/)
    expect(document.documentElement.dir).toBe('ltr')
  })
})
