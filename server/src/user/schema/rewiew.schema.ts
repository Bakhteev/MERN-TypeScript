import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from './user.schema'
import { Document } from 'mongoose'
import { Film } from 'src/films/schema/film.schema'
import { Serial } from 'src/serial/schema/serial.schema'

export type ReviewDocument = Review & Document

@Schema()
export class Review {
  @Prop()
  text: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
      { type: mongoose.Schema.Types.ObjectId, ref: 'Serial' },
    ],
  })
  film_id: Film | Serial
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
