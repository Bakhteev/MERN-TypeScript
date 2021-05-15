import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { Film } from 'src/films/schema/film.schema'
import { Review } from 'src/review/schema/review.schema'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop()
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[]

  @Prop()
  roles: string[]

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
      { type: mongoose.Schema.Types.ObjectId, ref: 'Serial' },
    ],
  })
  liked: Film[]

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  })
  disliked: Film[]
}

export const UserSchema = SchemaFactory.createForClass(User)
