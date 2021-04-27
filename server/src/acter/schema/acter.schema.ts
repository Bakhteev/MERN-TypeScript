import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ActerDocument = Acter & Document

@Schema()
export class Acter {
  @Prop()
  name: string

  @Prop()
  pictures: string

  @Prop()
  role: string[]
}

export const ActerSchema = SchemaFactory.createForClass(Acter)
