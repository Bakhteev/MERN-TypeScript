import { Prop, Schema } from '@nestjs/mongoose'

@Schema()
export abstract class TimeStamps {
  @Prop({ timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } })
  createdAt: number
  @Prop({ timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } })
  updatedAt: number
}
