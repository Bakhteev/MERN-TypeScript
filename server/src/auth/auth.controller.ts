import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LogInUserDto } from 'src/user/dto/login-user.dto'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() userDto: LogInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, user } = await this.authService.login(userDto)
    res.cookie('userId', JSON.stringify(user._id))
    return { token }
  }

  @Post('/registration')
  registration(@Body() user: CreateUserDto) {
    return this.authService.registration(user)
  }
}
