import type { JSX, PropsWithChildren } from 'hono/jsx'

type Props = JSX.IntrinsicElements['button']

export default function Button({ class: className, children, ...restProps }: PropsWithChildren<Props>) {
  return (
    <button class={`p-2 bg-orange-600 rounded font-bold dark:text-slate-900 text-slate-50 ${className}`} {...restProps}>
      {children}
    </button>
  )
}
