import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from 'src/user/schema/user.schema'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'

export type RoleDocument = Role & Document

@Schema()
export class Role {
  @Prop()
  value: string

  @Prop()
  description: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[]
}

export const RoleSchema = SchemaFactory.createForClass(Role)

