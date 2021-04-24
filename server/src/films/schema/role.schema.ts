import { Prop, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Film } from 'src/films/schema/film.schema'
import { Acter } from './acter.schema'
import { Serial } from './serial/serial.schema'
import { Document } from 'mongoose'

export type RoleDocument = Role & Document

export class Role {
  @Prop()
  name: string

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
    { type: mongoose.Schema.Types.ObjectId, ref: 'Serial' },
  ])
  film_and_serials: Film[] | Serial[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Acter' }] })
  actor: Acter
}

export const RoleSchema = SchemaFactory.createForClass(Role)
