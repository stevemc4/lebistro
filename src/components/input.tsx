import type { Child, JSX } from 'hono/jsx'

type Props = JSX.IntrinsicElements['input'] & {
  prefix?: Child
}

export default function Input({ class: className, prefix, ...restProps }: Props) {
  return (
    <label class={`bg-transparent border rounded border-neutral-500 outline-neutral-600 flex ${className}`}>
      {prefix && (
        <span class="p-2 border-r border-neutral-500">
          { prefix }
        </span>
      )}
      <input class="bg-transparent outline-none flex-1 p-2" {...restProps} />
    </label>
  )
}
