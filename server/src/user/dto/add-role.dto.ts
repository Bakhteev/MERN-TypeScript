import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя' })
  readonly value: string
  @ApiProperty({
    example: '6103c95757a2a04e7f52d53c',
    description: 'Id пользователя',
  })
  readonly userId: string
}
