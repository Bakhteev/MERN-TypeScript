import { Module } from '@nestjs/common';
import { ActerService } from './acter.service';

@Module({
  providers: [ActerService]
})
export class ActerModule {}
