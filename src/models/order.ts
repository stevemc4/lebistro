import { db } from 'db'
import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'
import { nanoid } from 'utils/nanoid'

export type OrderStates = 'open' | 'closed' | 'cancelled' | 'void'

export interface OrderTable {
  id: Generated<number>
  number: ColumnType<string, string, never>
  cashierId: ColumnType<string, string, never>
  status: ColumnType<OrderStates, OrderStates | undefined, OrderStates>
  notes: ColumnType<string | undefined, string | undefined, never>
  tableNumber: string
  createdAt: ColumnType<number, number | undefined, never>
  updatedAt: ColumnType<number, number | undefined, number | undefined>
}

export interface OrderItemTable {
  id: Generated<number>
  orderId: ColumnType<number, number, never>
  menuId: ColumnType<number, number, never>
  quantity: number
  notes: ColumnType<string | undefined, string | undefined, never>
}

export type Order = Selectable<OrderTable>
export type NewOrder = Insertable<OrderTable>
export type UpdatingOrder = Updateable<OrderTable>

export type OrderItem = Selectable<OrderItemTable>
export type NewOrderItem = Insertable<OrderItemTable>

export async function createOrder(cashierId: string, notes: string, tableNumber: string, items: Omit<NewOrderItem, 'orderId'>[]) {
  try {
    return await db.transaction().execute(async (tx) => {
      const newOrder: NewOrder = {
        number: nanoid(),
        cashierId,
        tableNumber,
        notes,
      }
      const createdOrder = await tx.insertInto('order').values(newOrder).returningAll().executeTakeFirstOrThrow()
      const orderItems: NewOrderItem[] = items.map(item => ({ ...item, orderId: createdOrder.id }))
      await tx.insertInto('orderItem').values(orderItems).execute()
      return createdOrder
    })
  } catch (e) {
    return null
  }
}
