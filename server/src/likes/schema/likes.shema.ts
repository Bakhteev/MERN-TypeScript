import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { Film } from 'src/films/schema/film.schema'
import { User } from 'src/user/schema/user.schema'

export type LikeDocument = Like & Document

@Schema()
export class Like {
  @Prop()
  number: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Film' })
  film_id: Film

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  users_id: User[]
}

export const LikeSchema = SchemaFactory.createForClass(Like)
