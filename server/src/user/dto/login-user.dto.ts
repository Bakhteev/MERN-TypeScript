import { ApiProperty } from '@nestjs/swagger'

export class LogInUserDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Электронная почта пользователя',
  })
  readonly email: string
  @ApiProperty({
    example: '1234567',
    description: 'Пароль пользователя',
  })
  readonly password: string
}
