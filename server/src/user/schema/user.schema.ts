import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Review } from './rewiew.schema'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

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
}

export const UserSchema = SchemaFactory.createForClass(User)
