import { Hono } from 'hono'
import Login from 'views/login'

const app = new Hono()

app.get('/login', (c) => {
  return c.html(<Login />)
})

export default app
