
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { SupabaseAuthService } from '../services/SupabaseAuthService';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private authService: SupabaseAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token de autenticação não fornecido');
    }

    // Formato esperado: "Bearer token"
    const [type, token] = authHeader.split(' ');
    
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Formato de token inválido');
    }

    try {
      // Verifica o token e obtém o usuário
      const user = await this.authService.verificarToken(token);
      
      // Adiciona o usuário ao objeto de requisição
      request.user = user;
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}

