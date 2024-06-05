import { PropsWithChildren } from 'hono/jsx'

type Props = {
  title?: string
}

export default function Layout({ children, title = 'Le Bistro' }: PropsWithChildren<Props>) {
  return (
    <html lang="id-ID">
      <head>
        <title>{title}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body class="bg-neutral-100 text-slate-900 dark:bg-neutral-900 dark:text-slate-50 flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  )
}
