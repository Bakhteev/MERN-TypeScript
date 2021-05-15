import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LogInUserDto } from 'src/user/dto/login-user.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() user: LogInUserDto) {
    return this.authService.login(user)
  }

  @Post('/registration')
  registration(@Body() user: CreateUserDto) {
    return this.authService.registration(user)
  }
}
