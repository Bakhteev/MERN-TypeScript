import { Module } from '@nestjs/common'
import { DislikesService } from './dislikes.service'

@Module({
  providers: [DislikesService],
  exports: [DislikesService],
})
export class DislikesModule {}
