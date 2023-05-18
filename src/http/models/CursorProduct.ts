/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from './Product'

export type CursorProduct = {
  cursor: string
  finished: boolean
  data: Product[]
}
