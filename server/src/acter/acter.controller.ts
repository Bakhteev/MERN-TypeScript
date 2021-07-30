import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { ActerService } from './acter.service'
import { CreateActerDto } from './dto/create-acter.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Acters')
@Controller('acter')
export class ActerController {
  constructor(private acterService: ActerService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  createActers(
    @UploadedFiles() file,
    @Body() dto: CreateActerDto,
    @Req() req: any
  ) {
    const { picture } = file
    return this.acterService.createActer(dto, picture[0])
  }
}
