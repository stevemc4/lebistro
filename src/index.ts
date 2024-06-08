import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

import auth from 'routes/auth'
import home from 'routes/home'
import menu from 'routes/menu'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.route('/', home)
app.route('/', auth)
app.route('/menu', menu)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
