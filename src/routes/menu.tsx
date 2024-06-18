import { vValidator } from '@hono/valibot-validator'
import { Hono } from 'hono'
import { NewMenu, createMenu, getAllMenu } from 'models/menu'
import { number, object, pipe, required, string, transform, trim } from 'valibot'
import MenuForm from 'views/menu-form'
import MenuList from 'views/menu-list'
import slugify from '@sindresorhus/slugify'

const app = new Hono()

const menuSchema = required(object({
  name: pipe(string(), trim()),
  price: pipe(string(), transform(input => parseInt(input)), number()),
}))

app.get('/', async (c) => {
  const menus = await getAllMenu()
  return c.html(<MenuList menus={menus} />)
})

app.get('/new', (c) => {
  return c.html(<MenuForm />)
})

app.post('/new', vValidator('form', menuSchema), async (c) => {
  const data = c.req.valid('form')
  const newMenu: NewMenu = {
    ...data,
    slug: slugify(data.name),
  }

  await createMenu(newMenu)

  return c.redirect('/menu')
})

export default app
