import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './button-variants'
import { cn } from '@/lib/utils'

type VariantProps_ = VariantProps<typeof buttonVariants>

type LinkButtonProps = VariantProps_ & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type NativeButtonProps = VariantProps_ & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export type ButtonProps = LinkButtonProps | NativeButtonProps

/** Pill button. Renders an <a> when `href` is given, otherwise a <button>. */
export default function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, ...rest } = props
    return <a className={cn(buttonVariants({ variant, size }), className)} {...rest} />
  }

  const { variant, size, className, type = 'button', ...rest } = props
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...rest} />
}