import Layout from 'components/layouts/dashboard'
import { Menu } from 'models/menu'

export default function MenuList({ menus }: { menus: Menu[] }) {
  return (
    <Layout title="Daftar Menu - Le Bistro" selectedSidebarItem="menu">
      <h1 class="p-8 pb-0 font-bold text-4xl">Daftar Menu</h1>
      <ul class="px-8 mt-8 grid max-w-screen-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {menus.map(menu => (
          <li key={menu.slug} class="">
            <a href={`/menu/${menu.slug}`} class="border border-neutral-400 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700 rounded p-2 w-full flex flex-col shadow-sm">
              <span>{menu.name}</span>
              <span><b>{menu.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</b></span>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
