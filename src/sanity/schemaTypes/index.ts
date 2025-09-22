import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { productType } from './productType'
import { orderType } from './orderType'
import { salesType } from './salesType'

//First we need to import sanity typegen #sanity schema extract, sanity typegen generate. create a custom run script "typegen in package.json"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, orderType, salesType],
}
