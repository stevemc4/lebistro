import { createMiddleware } from 'hono/factory'
import { Env } from 'index'

const requireSession = createMiddleware<Env>(async (c, next) => {
  if (!c.var.user) {
    console.log(c.req.url)
    return c.redirect('/login')
  }

  return next()
})

export default requireSession
