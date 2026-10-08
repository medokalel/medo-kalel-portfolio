import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline',
    'transition-[transform,box-shadow,color,border-color] duration-300',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-0 bg-linear-135/srgb from-brand-from to-brand-to text-white',
          'hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.4)]',
        ],
        secondary: [
          'border border-fg-muted/30 bg-transparent text-fg-muted',
          'hover:border-accent hover:text-accent',
        ],
      },
      size: {
        sm: 'px-[1.4rem] py-[0.55rem] text-[0.9rem]',
        md: 'px-[1.8rem] py-[0.8rem] text-[0.95rem]',
        lg: 'px-6 py-[0.8rem] text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

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