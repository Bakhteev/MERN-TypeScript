import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { Category } from '../../category/schema/category.schema'
import { Author } from './author.schema'
import { Genre } from 'src/genre/schema/genre.schema'
import { Acter, TimeStamps } from 'src/acter/schema/acter.schema'
import { Review } from 'src/review/schema/review.schema'
import { Like } from 'src/likes/schema/likes.shema'
import { Dislike } from 'src/dislikes/schema/dislikes.shema'

export type FilmDocument = Film & Document

@Schema()
export class Film extends TimeStamps {
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

  @Prop({ default: 0 })
  numberOfVoters: number

  @Prop({ default: 0 })
  rating: number

  @Prop({ default: 0 })
  viewers: number

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  category: Category[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Like' })
  likesShema: Like

  @Prop({ default: 0 })
  likes: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dislike' })
  dislikesShema: Dislike

  @Prop({ default: 0 })
  dislikes: number

  @Prop()
  tags: string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[]
}

export const FilmSchema = SchemaFactory.createForClass(Film)
export const FilmModel = mongoose.model<Film & Document>('Film', FilmSchema)
