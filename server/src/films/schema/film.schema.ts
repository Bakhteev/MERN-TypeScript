import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { Category } from './category.schema'
import { Review } from 'src/user/schema/rewiew.schema'
import { Author } from './author.schema'
import { Role } from './role.schema'

export type FilmDocument = Film & Document

@Schema()
export class Film {
  @Prop()
  name: string

  @Prop()
  language: string

  @Prop()
  poster: string

  @Prop()
  film: string

  @Prop()
  description: string

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
}

export const FilmSchema = SchemaFactory.createForClass(Film)
