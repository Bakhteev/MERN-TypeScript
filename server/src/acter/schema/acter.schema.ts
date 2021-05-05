import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Film } from 'src/films/schema/film.schema'
import { Serial } from 'src/serial/schema/serial.schema'

export type ActerDocument = Acter & Document

@Schema()
export class Acter {
  @Prop()
  name: string

  @Prop()
  pictures: string

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
    { type: mongoose.Schema.Types.ObjectId, ref: 'Serial'},
  ])
  film_or_serial_id: Film[] | Serial[]
}

export const ActerSchema = SchemaFactory.createForClass(Acter)
