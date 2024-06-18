import { Menu } from 'models/menu'
import Input from 'components/input'
import Layout from 'components/layouts/dashboard'
import Button from 'components/button'

export default function MenuForm({ menu }: { menu?: Menu }) {
  return (
    <Layout title="Daftar Menu - Le Bistro" selectedSidebarItem="menu">
      <h1 class="p-8 pb-0 font-bold text-4xl">{ menu ? 'Edit Menu' : 'Tambah Menu Baru'}</h1>
      <form method="POST" class="flex flex-col px-8 mt-8 max-w-lg">
        <label class="block" for="name">Nama Menu</label>
        <Input class="mt-1" type="text" id="name" name="name" value={menu ? menu.name : undefined} required />
        <label class="block mt-2">Harga</label>
        <Input prefix="Rp" class="mt-1" type="number" id="name" name="price" value={menu ? menu.price : undefined} required />
        <Button type="submit" class="mt-4">Simpan</Button>
      </form>
    </Layout>
  )
}
