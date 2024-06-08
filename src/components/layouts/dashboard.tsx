import { PropsWithChildren } from 'hono/jsx'
import MainLayout from './main'

type Props = {
  title: string
  selectedSidebarItem?: 'home' | 'transactions' | 'menu' | 'staffs' | 'customers'
}

interface NavigationMenuItemProps {
  selected?: boolean
  href?: string
}

function NavigationMenuItem({ children, selected, href }: PropsWithChildren<NavigationMenuItemProps>) {
  return (
    <li>
      <a href={href} class={`flex rounded items-center hover:border-neutral-300/20 dark:hover:bg-neutral-700/20 py-1 pr-3 ${selected ? 'pl-0' : 'pl-2'}`}>
        {selected && (
          <div class="w-0.5 h-4 bg-orange-600 rounded mr-1.5" />
        )}
        {children}
      </a>
    </li>
  )
}

export default function DashboardLayout({ children, title = 'Le Bistro', selectedSidebarItem }: PropsWithChildren<Props>) {
  return (
    <MainLayout title={title}>
      <header class="flex items-center h-12 py-1 px-4">
        <span><b>Le Bistro</b></span>
      </header>
      <div class="flex flex-1">
        <nav class="w-60">
          <ul class="px-2 flex flex-col gap-1">
            <NavigationMenuItem selected={selectedSidebarItem === 'home'} href="/">Beranda</NavigationMenuItem>
            <NavigationMenuItem selected={selectedSidebarItem === 'transactions'} href="/transactions">Transaksi</NavigationMenuItem>
            <NavigationMenuItem selected={selectedSidebarItem === 'menu'} href="/menu">Menu</NavigationMenuItem>
            <NavigationMenuItem selected={selectedSidebarItem === 'staffs'} href="/staffs">Karyawan</NavigationMenuItem>
            <NavigationMenuItem selected={selectedSidebarItem === 'customers'} href="/customers">Pelanggan</NavigationMenuItem>
          </ul>
        </nav>
        <main class="bg-neutral-200 dark:bg-neutral-800 rounded-tl-md flex-1 border-t-2 border-l-2 border-neutral-300/40 dark:border-neutral-700/40">
          {children}
        </main>
      </div>
    </MainLayout>
  )
}
