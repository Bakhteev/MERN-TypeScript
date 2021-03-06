import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { TimeStamps } from 'src/adstractClasses/TimeStamps'
import { Film } from 'src/films/schema/film.schema'
import { User } from 'src/user/schema/user.schema'

export type ReviewDocument = Review & Document

@Schema()
export class Review extends TimeStamps {
  @Prop()
  text: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
  })
  film_id: Film
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
