import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Response } from 'express'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/registration')
  registration(@Body() user: CreateUserDto, @Res() res: Response) {
    return this.userService
      .registration(user)
      // .then((token) => res.cookie('token', token))
  }
}
