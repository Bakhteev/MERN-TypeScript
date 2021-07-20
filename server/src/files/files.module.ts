import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FilesService } from './files.service'

@Module({
  providers: [FilesService],
  // imports: [ConfigModule],
})
export class FilesModule {}
