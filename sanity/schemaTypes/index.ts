import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {productType} from './productType'
import { ageRangeType } from './ageRangeType'
import { genderType } from './genderType'
import { interestType } from './interestType'
import { relationType } from './relationType'
import { occasionType } from './occasionType'
import { priceRangeType } from './priceRangeType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, productType, ageRangeType,genderType, interestType, relationType, occasionType, priceRangeType],
}
