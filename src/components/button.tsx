import type { JSX, PropsWithChildren } from 'hono/jsx'

type Props = JSX.IntrinsicElements['button']

export default function Button({ class: className, children, ...restProps }: PropsWithChildren<Props>) {
  return (
    <button class={`p-2 bg-orange-600 rounded font-bold ${className}`} {...restProps}>
      {children}
    </button>
  )
}
