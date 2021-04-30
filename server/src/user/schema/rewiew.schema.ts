import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from './user.schema'
import { Document } from 'mongoose'

export type ReviewDocument = Review & Document

@Schema()
export class Review {
  @Prop()
  text: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
