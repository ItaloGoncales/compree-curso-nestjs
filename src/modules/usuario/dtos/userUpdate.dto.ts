import { UserCreateDto } from './userCreate.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UserUpdateDto extends PartialType(UserCreateDto) {}
