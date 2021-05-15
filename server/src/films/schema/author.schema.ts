import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Film } from './film.schema'
import { Document } from 'mongoose'

export type AuthorDocument = Author & Document

@Schema()
export class Author {
  @Prop()
  name: string

  @Prop()
  picture: string

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }])
  film_and_serials: Film[]
}

export const AuthorSchema = SchemaFactory.createForClass(Author)
