import { customAlphabet } from 'nanoid'

const alphanums = '6789BCDFGHJKLMNPQRTW'

export const nanoid = customAlphabet(alphanums, 8)
