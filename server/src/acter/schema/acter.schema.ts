import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ActerDocument = Acter & Document

export  abstract class TimeStamps {
  public createdAt?: Date
  public updatedAt?: Date
}

@Schema({ timestamps: true })
export class Acter  {
  @Prop()
  name: string

  @Prop()
  picture: string

  @Prop()
  role: string[]
}

export const ActerSchema = SchemaFactory.createForClass(Acter)
