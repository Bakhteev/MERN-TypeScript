import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { TimeStamps } from 'src/adstractClasses/TimeStamps'
import { Film } from 'src/films/schema/film.schema'
import { Review } from 'src/review/schema/review.schema'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User extends TimeStamps {
  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop()
  name: string

  @Prop()
  roles: string[]

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  })
  liked: Film[]

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
  })
  history: Film[]
}

export const UserSchema = SchemaFactory.createForClass(User)
