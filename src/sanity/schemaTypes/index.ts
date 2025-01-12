import { type SchemaTypeDefinition } from 'sanity'
import postType from './blog'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, author],
}
