
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from '../guards/SupabaseAuthGuard';
import { SupabaseAuthService } from '../services/SupabaseAuthService';

@Controller('usuarios')
export class UsuarioController {
  constructor(private authService: SupabaseAuthService) {}

  @UseGuards(SupabaseAuthGuard)
  @Get('perfil')
  async obterPerfil(@Req() req) {
    // req.user foi adicionado pelo SupabaseAuthGuard
    const userId = req.user.id;
    return this.authService.obterPerfilUsuario(userId);
  }

  @Post('registrar')
  async registrarUsuario(@Body() dados: { email: string; senha: string; nome: string }) {
    try {
      // Em um caso real, você precisaria implementar o registro via Supabase
      // Aqui estamos simulando o processo, já que o registro principal
      // ocorre no frontend diretamente com o Supabase
      
      return {
        mensagem: 'Usuário registrado com sucesso. Verifique seu e-mail para confirmar o cadastro!'
      };
    } catch (error) {
      throw new Error('Erro ao registrar usuário');
    }
  }
}

