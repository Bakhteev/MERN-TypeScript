import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { Review } from 'src/user/schema/rewiew.schema'
import { Season } from './season.schema'
import { Role } from '../role.schema'

export type SeriaDocument = Seria & Document

@Schema()
export class Seria {
  @Prop()
  name: string

  @Prop()
  language: string

  @Prop()
  description: string

  @Prop()
  serial: string

  @Prop()
  time: string

  @Prop()
  publish_date: Date

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  cast: Role[]

  @Prop()
  rating: number

  @Prop()
  viewers: number

  @Prop()
  likes: number

  @Prop()
  dislikes: number

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  rewiews: Review[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }] })
  seasons_id: Season
}

export const SeriaSchema = SchemaFactory.createForClass(Seria)
