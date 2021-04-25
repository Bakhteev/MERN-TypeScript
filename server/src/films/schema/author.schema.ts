import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Film } from './film.schema'
import { Document } from 'mongoose'
import { Serial } from 'src/serial/schema/serial.schema'

export type AuthorDocument = Author & Document

@Schema()
export class Author {
  @Prop()
  name: string

  @Prop()
  picture: string

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
    { type: mongoose.Schema.Types.ObjectId, ref: 'Serial' },
  ])
  film_and_serials: Film[] | Serial[]
}

export const AuthorSchema = SchemaFactory.createForClass(Author)
