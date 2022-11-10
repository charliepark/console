import cn from 'classnames'
import type { MouseEventHandler } from 'react'
import { forwardRef } from 'react'

import { Spinner, Tooltip, Wrap } from '@oxide/ui'

import './button.css'

export const buttonSizes = ['sm', 'icon', 'base'] as const
export const variants = ['primary', 'secondary', 'ghost', 'danger'] as const

export type ButtonSize = typeof buttonSizes[number]
export type Variant = typeof variants[number]

const sizeStyle: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-mono-sm svg:w-4',
  // meant for buttons that only contain a single icon
  icon: 'h-8 w-8 text-mono-sm svg:w-4',
  base: 'h-10 px-3 text-mono-md svg:w-5',
}

type ButtonStyleProps = {
  size?: ButtonSize
  variant?: Variant
}

export const buttonStyle = ({
  size = 'base',
  variant = 'primary',
}: ButtonStyleProps = {}) => {
  return cn(
    'ox-button rounded inline-flex items-center justify-center align-top disabled:cursor-not-allowed focus:ring-2',
    `btn-${variant}`,
    sizeStyle[size],
    variant === 'danger'
      ? 'focus:ring-destructive-secondary'
      : 'focus:ring-accent-secondary'
  )
}

/**
 * When the `disabled` prop is passed to the button we put it in a visually disabled state.
 * In that case we want to override the default mouse down and click behavior to simulate a
 * disabled state.
 */
const noop: MouseEventHandler<HTMLButtonElement> = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

export interface ButtonProps
  extends React.ComponentPropsWithRef<'button'>,
    ButtonStyleProps {
  innerClassName?: string
  loading?: boolean
  disabledReason?: string
}

// Use `forwardRef` so the ref points to the DOM element (not the React Component)
// so it can be focused using the DOM API (eg. this.buttonRef.current.focus())
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      children,
      size,
      variant,
      className,
      loading,
      innerClassName,
      disabled,
      onClick,
      'aria-disabled': ariaDisabled,
      disabledReason,
      // needs to be a spread because we pass this component to Reach
      // <MenuButton> with the `as` prop and get passed arbitrary <button> props
      ...rest
    },
    ref
  ) => {
    return (
      <Wrap when={disabled && disabledReason} with={<Tooltip content={disabledReason!} />}>
        <button
          className={cn(buttonStyle({ size, variant }), className, {
            'visually-disabled': disabled,
          })}
          ref={ref}
          type={type}
          onMouseDown={disabled ? noop : undefined}
          onClick={disabled ? noop : onClick}
          aria-disabled={disabled || ariaDisabled}
          {...rest}
        >
          {loading && <Spinner className="absolute" />}
          <span className={cn('flex items-center', innerClassName, { invisible: loading })}>
            {children}
          </span>
        </button>
      </Wrap>
    )
  }
)
