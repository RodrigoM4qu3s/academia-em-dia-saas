
import { Module } from '@nestjs/common';
import { UsuarioController } from '../controllers/UsuarioController';
import { SupabaseAuthService } from '../services/SupabaseAuthService';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [SupabaseAuthService],
})
export class AppModule {}

