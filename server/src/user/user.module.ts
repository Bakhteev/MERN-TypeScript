import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schema'
import { AuthModule } from 'src/auth/auth.module'
import { RolesModule } from 'src/roles/roles.module'

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
