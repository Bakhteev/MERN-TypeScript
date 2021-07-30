import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  readonly name: string

  @ApiProperty({ example: 'test@gmai;.com', description: 'Электронная почта пользователя' })
  readonly email: string

  @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
  readonly password: string
}
