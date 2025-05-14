
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call for authentication
    try {
      // In a real implementation, this would be an API call to your auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's just navigate to the dashboard
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique seus dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4 space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">GymFlow Brasil</h1>
          <p className="text-gray-500 mt-2">Sistema de gestão para academias</p>
        </div>
        
        <Card className="shadow-soft-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Acesse sua Academia
            </CardTitle>
            <CardDescription className="text-center">
              Digite seu e-mail e senha para continuar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a 
                    href="#" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Aguarde..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="text-center">
            <p className="text-sm text-gray-500 mt-2 w-full">
              Não tem conta? {" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Fale conosco
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
