import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Review } from './rewiew.schema'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { Film } from 'src/films/schema/film.schema'
import { Serial } from 'src/serial/schema/serial.schema'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  email: string

  @Prop()
  password: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[]

  @Prop()
  role: string

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
      { type: mongoose.Schema.Types.ObjectId, ref: 'Serial' },
    ],
  })
  liked: Film[] | Serial[]

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
      { type: mongoose.Schema.Types.ObjectId, ref: 'Serial' },
    ],
  })
  disliked: Film[] | Serial[]
}

export const UserSchema = SchemaFactory.createForClass(User)
