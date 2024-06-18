import { Menu } from 'models/menu'
import Layout from 'components/layouts/dashboard'

export default function MenuDetail({ menu }: { menu: Menu }) {
  return (
    <Layout title={`${menu.name} - Le Bistro`} selectedSidebarItem="menu">
      <h1 class="p-8 pb-0 font-bold text-4xl">{ menu.name }</h1>
      <div class="flex items-center mt-2 px-8">
        <a href={`/menu/${menu.slug}/edit`} class="text-orange-600">Ubah Menu</a>
      </div>
      <div class="flex flex-col px-8 mt-8 max-w-lg">
        <span class="block font-bold">Nama Menu</span>
        <span class="block text-xl">{menu.name}</span>
        <span class="block mt-2 font-bold">Harga</span>
        <span class="block text-xl">
          {`Rp${menu.price.toLocaleString('id-ID')}`}
        </span>
      </div>
    </Layout>
  )
}
