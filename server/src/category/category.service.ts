import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category, CategoryDocument } from './schema/category.schema'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.findOne({
        name: { $regex: new RegExp(dto.name) },
      })
      if (category) {
        throw new HttpException(
          'Такая категория уже существует',
          HttpStatus.BAD_REQUEST
        )
      }
      const newCategory = await this.categoryModel.create({ ...dto })
      return newCategory
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getCategories() {
    try {
      const categories = await this.categoryModel.find()
      return categories
    } catch (e) {
      throw new HttpException(
        { message: 'Что-то пошло не так', error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
