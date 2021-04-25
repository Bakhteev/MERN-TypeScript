import { Module } from '@nestjs/common';
import { SerialController } from './serial.controller';
import { SerialService } from './serial.service';

@Module({
  controllers: [SerialController],
  providers: [SerialService]
})
export class SerialModule {}
