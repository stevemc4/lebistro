import { Hono } from 'hono'
import { getAllMenu } from 'models/menu'
import MenuList from 'views/menu-list'

const app = new Hono()

app.get('/', async (c) => {
  const menus = await getAllMenu()
  return c.html(<MenuList menus={menus} />)
})

export default app
