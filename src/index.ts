import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { lucia } from 'auth'
import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { csrf } from 'hono/csrf'
import { Session, User } from 'lucia'

import auth from 'routes/auth'
import home from 'routes/home'
import menu from 'routes/menu'
const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use(csrf())
app.use('*', async (c, next) => {
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null
  if (!sessionId) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (session && session.fresh) {
    c.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    })
  }

  if (!session) {
    c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), {
      append: true,
    })
  }
  c.set('user', user)
  c.set('session', session)
  return next()
})

app.route('/', home)
app.route('/', auth)
app.route('/menu', menu)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

export interface EnvVariables extends Record<string, unknown> {
  user: User | null
  session: Session | null
}

export interface Env {
  Variables: EnvVariables
}

declare module 'hono' {
  interface ContextVariableMap extends EnvVariables {}
}
