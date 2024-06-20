import { vValidator } from '@hono/valibot-validator'
import { lucia } from 'auth'
import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { login } from 'models/user'
import { object, pipe, required, string, trim } from 'valibot'
import Login from 'views/login'

const app = new Hono()

const loginSchema = required(object({
  usernameOrEmail: pipe(string(), trim()),
  password: string(),
}))

app.get('/login', (c) => {
  return c.html(<Login />)
})

app.post('/login', vValidator('form', loginSchema), async (c) => {
  const data = c.req.valid('form')
  const sessionCookie = await login(data.usernameOrEmail, data.password)
  if (!sessionCookie) {
    return c.redirect('/login')
  }
  setCookie(c, lucia.sessionCookieName, sessionCookie.value)
  return c.redirect('/')
})

app.get('/logout', async (c) => {
  const session = c.var.session
  if (session) {
    await lucia.invalidateSession(session.id)
  }

  return c.redirect('/login')
})

export default app
