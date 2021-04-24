import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { Review } from 'src/user/schema/rewiew.schema'
import { Seria } from './seria.shema'
import { Season } from './season.schema'
import { Author } from '../author.schema'
import { Role } from '../role.schema'
import { Category } from '../category.schema'

export type SerialDocument = Serial & Document

@Schema()
export class Serial {
  @Prop()
  name: string

  @Prop()
  language: string

  @Prop()
  description: string

  @Prop()
  poster: string

  @Prop()
  genre: string

  @Prop()
  time: string

  @Prop()
  publish_date: Date

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }] })
  author: Author

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  cast: Role[]

  @Prop()
  price: number

  @Prop()
  rating: number

  @Prop()
  viewers: number

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  category: Category[]

  @Prop()
  likes: number

  @Prop()
  dislikes: number

  @Prop()
  tags: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  rewiews: Review[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }] })
  seasons: Season[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seria' }] })
  serias: Seria[]

  @Prop({ type: [{ type: mongoose.Schema.Types.String, ref: 'Seria' }] })
  time_of_seria: Seria['time']
}

export const SerialSchema = SchemaFactory.createForClass(Serial)
