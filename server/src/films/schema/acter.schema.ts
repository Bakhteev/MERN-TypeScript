import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Film } from './film.schema'
import { Serial } from './serial/serial.schema'
import { Document } from 'mongoose'

export type ActerDocument = Acter & Document

@Schema()
export class Acter {
  @Prop()
  name: string

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
    { type: mongoose.Schema.Types.ObjectId, ref: 'Serial' },
  ])
  film_and_serials: Film[] | Serial[]
}

export const ActerSchema = SchemaFactory.createForClass(Acter)
