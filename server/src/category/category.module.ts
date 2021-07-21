import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryService } from './category.service'
import { Category, CategorySchema } from './schema/category.schema'
import { CategoryController } from './category.controller'

@Module({
  providers: [CategoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
