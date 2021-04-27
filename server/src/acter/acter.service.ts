import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateActerDto } from './dto/create-acter.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Acter, ActerDocument } from './schema/acter.schema'
import { Model } from 'mongoose'
import { FilesService, FileType } from 'src/files/files.service'

@Injectable()
export class ActerService {
  constructor(
    @InjectModel(Acter.name) private acterModel: Model<ActerDocument>,
    private filesService: FilesService
  ) {}

  async createActer(dto: CreateActerDto, file: Express.Multer.File) {
    try {
      const acter = await this.acterModel.findOne({ name: dto.name })
      if (acter) {
        acter.role.push(dto.role)
        acter.save()
        return acter
      }
      console.log(file)
      const picture = this.filesService.createFile(FileType.POSTER, file)
      const newActer = this.acterModel.create({ ...dto, picture })
      return newActer
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
