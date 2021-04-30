import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Post('/registration')
  registration(@Body() user: CreateUserDto){
    return this.userService.registration(user)
  }
}
