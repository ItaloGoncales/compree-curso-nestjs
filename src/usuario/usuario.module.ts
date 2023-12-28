import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UniqueEmailValidator } from './validators/uniqueEmail.validator';

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, UniqueEmailValidator],
})
export class UsuarioModule { }
