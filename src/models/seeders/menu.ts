import { NewMenu } from 'models/menu'

export async function runSeeder(): Promise<NewMenu[]> {
  return [
    {
      name: 'Nasi Goreng',
      slug: 'nasi-goreng',
      price: 25000,
    },
    {
      name: 'Nasi Goreng Premier',
      slug: 'nasi-goreng-premier',
      price: 35000,
    },
    {
      name: 'Nasi Goreng Le Bistro',
      slug: 'nasi-goreng-le-bistro',
      price: 40000,
    },
    {
      name: 'Air Putih',
      slug: 'air-putih',
      price: 5000,
    },
    {
      name: 'Es Teh Manis',
      slug: 'es-teh-manis',
      price: 7000,
    },
    {
      name: 'Caffe Latte',
      slug: 'caffe-latte',
      price: 16000,
    },
    {
      name: 'Kopi Susu Le Bistro',
      slug: 'kopi-susu-le-bistro',
      price: 16000,
    },
  ]
}
