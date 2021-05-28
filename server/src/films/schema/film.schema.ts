import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { Category } from '../../category/schema/category.schema'
import { Author } from './author.schema'
import { Genre } from 'src/genre/schema/genre.schema'
import { Acter } from 'src/acter/schema/acter.schema'
import { Review } from 'src/review/schema/review.schema'

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genre: Genre[]

  @Prop()
  time: string

  @Prop()
  publish_date: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Acter' }] })
  acters: Acter[]

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
  tags: string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[]
}

export const FilmSchema = SchemaFactory.createForClass(Film)
