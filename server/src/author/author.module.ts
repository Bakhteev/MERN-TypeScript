import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';

@Module({
  providers: [AuthorService]
})
export class AuthorModule {}
