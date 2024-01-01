import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { UsuarioService } from '../usuario.service'
import { Injectable } from '@nestjs/common'

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(value: any): Promise<boolean> {
    return (await this.usuarioService.usuario(value)) === undefined
  }

  defaultMessage?(): string {
    return 'User already exists.'
  }
}

export const UniqueEmail = (validationOptions?: ValidationOptions) => {
  return (objeto: any, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    })
  }
}
