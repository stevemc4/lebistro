import { Hono } from 'hono'
import requireSession from 'middlewares/requireSession'
import Home from 'views/home'

const app = new Hono()

app.get('/', requireSession, (c) => {
  return c.html(<Home />)
})

export default app
