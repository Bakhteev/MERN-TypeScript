import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Seria } from './seria.shema'
import { Serial } from './serial.schema'
import { Document } from 'mongoose'

export type SeasonDocument = Season & Document

@Schema()
export class Season {
  @Prop()
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Serial' }] })
  serial_id: Serial

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seria' }] })
  serias: Seria[]
}

export const SeasonSchema = SchemaFactory.createForClass(Season)
