import {
  Body,
  Controller,
  HttpCode,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LogInUserDto } from 'src/user/dto/login-user.dto'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { ChangePasswordDto } from './dto/change-password.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() userDto: LogInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, user } = await this.authService.login(userDto)
    res.cookie('userId', JSON.stringify(user._id), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    return { token }
  }

  @Post('/registration')
  registration(@Body() user: CreateUserDto) {
    return this.authService.registration(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/changePassword')
  @HttpCode(200)
  async changePassword(@Body() dto: ChangePasswordDto) {
    return await this.authService.changePassword(dto)
  }

  @Post('/forgotPassword')
  forgotPassword(@Body() email: string) {}
}
