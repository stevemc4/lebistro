import { Hono } from 'hono'
import Home from 'views/home'

const app = new Hono()

app.get('/', (c) => {
  return c.html(<Home />)
})

export default app
