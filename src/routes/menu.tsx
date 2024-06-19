import { vValidator } from '@hono/valibot-validator'
import { Hono } from 'hono'
import { NewMenu, UpdatingMenu, createMenu, getAllMenu, getMenuBySlug, updateMenu } from 'models/menu'
import { number, object, pipe, required, string, transform, trim } from 'valibot'
import MenuForm from 'views/menu-form'
import MenuList from 'views/menu-list'
import slugify from '@sindresorhus/slugify'
import MenuDetail from 'views/menu-detail'

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

app.get('/:menu-slug', async (c) => {
  const menuSlug = c.req.param('menu-slug')
  const menu = await getMenuBySlug(menuSlug)
  if (menu === undefined) return c.notFound()

  return c.html(<MenuDetail menu={menu} />)
})

app.get('/:menu-slug/edit', async (c) => {
  const menuSlug = c.req.param('menu-slug')
  const menu = await getMenuBySlug(menuSlug)
  if (menu === undefined) return c.notFound()

  return c.html(<MenuForm menu={menu} />)
})

app.post('/:menu-slug/edit', vValidator('form', menuSchema), async (c) => {
  const menuSlug = c.req.param('menu-slug')
  const menu = await getMenuBySlug(menuSlug)
  if (menu === undefined) return c.notFound()

  const data = c.req.valid('form')
  const updatingMenu: UpdatingMenu = {
    ...data,
    slug: slugify(data.name),
  }

  await updateMenu(menu.id, updatingMenu)

  return c.redirect(`/menu/${updatingMenu.slug}`)
})

export default app
