import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role, RoleDocument } from './schema/role.schema'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleModel.create(dto)
    return role
  }

  async getRoleByValue(value: string) {
    const role = await this.roleModel.findOne({
      value,
    })
    return role
  }
}
