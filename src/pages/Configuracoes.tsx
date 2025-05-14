
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, User, Building } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock user data
const mockUsuarios = [
  { id: 1, nome: 'Admin Teste', email: 'admin@exemplo.com.br', papel: 'Administrador' },
  { id: 2, nome: 'Maria Silva', email: 'maria@exemplo.com.br', papel: 'Atendente' },
];

const Configuracoes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    razaoSocial: "Academia Fit Brasil Ltda",
    cnpj: "12.345.678/0001-90",
    endereco: "Av. Paulista, 1000, São Paulo - SP",
    telefone: "(11) 98765-4321",
    email: "contato@fitbrasil.com.br",
    apiToken: "asaas_12345678abcdefghijklmnopqrstuvwxyz",
    webhookUrl: "https://api.fitbrasil.com.br/webhook/payments",
  });
  
  const [novoEmail, setNovoEmail] = useState("");
  const [novoPapel, setNovoPapel] = useState("atendente");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Configurações salvas",
        description: "As suas alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendInvite = () => {
    if (!novoEmail) {
      toast({
        title: "E-mail obrigatório",
        description: "Por favor informe um e-mail válido.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Convite enviado",
      description: `Um e-mail de convite foi enviado para ${novoEmail}.`,
    });
    
    setNovoEmail("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold mb-2">Configurações</h1>
          <p className="text-gray-500">
            Gerencie as configurações da sua academia
          </p>
        </div>

        <Tabs defaultValue="academia" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="academia" className="flex items-center gap-2">
              <Building size={16} />
              Academia
            </TabsTrigger>
            <TabsTrigger value="integracao" className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Integração API
            </TabsTrigger>
            <TabsTrigger value="equipe" className="flex items-center gap-2">
              <User size={16} />
              Equipe
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="academia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dados da Academia</CardTitle>
                <CardDescription>
                  Atualize os dados da sua academia que serão exibidos nos contratos e comprovantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="razaoSocial">Razão Social</Label>
                    <Input
                      id="razaoSocial"
                      name="razaoSocial"
                      value={formData.razaoSocial}
                      onChange={handleChange}
                      placeholder="Razão Social da Empresa"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">E-mail de Contato</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contato@suaacademia.com.br"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      placeholder="Rua, número, cidade - Estado"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="logo">Logotipo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Logo</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Fazer Upload
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Formatos aceitos: PNG, JPG. Tamanho máximo: 1MB. Dimensões ideais: 200x200px.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  <Save size={16} className="mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integracao" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Integração com Asaas
                  <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                    Ativo
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Conecte sua conta Asaas para processar pagamentos automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="apiToken">Token de API</Label>
                    <Input
                      id="apiToken"
                      name="apiToken"
                      value={formData.apiToken}
                      onChange={handleChange}
                      placeholder="Token de API da Asaas"
                      type="password"
                    />
                    <p className="text-xs text-gray-500">
                      Encontre seu token no painel da Asaas em Configurações {'>'} API.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="webhookUrl">URL de Webhook</Label>
                    <Input
                      id="webhookUrl"
                      name="webhookUrl"
                      value={formData.webhookUrl}
                      onChange={handleChange}
                      placeholder="https://sua-url-de-webhook.com"
                    />
                    <p className="text-xs text-gray-500">
                      Configure este endereço no painel da Asaas para receber notificações de pagamentos.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Guia rápido de integração</h4>
                  <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-5">
                    <li>Crie uma conta no Asaas ou faça login</li>
                    <li>Vá em "Configurações" {'>'} "API"</li>
                    <li>Gere um novo token e cole acima</li>
                    <li>Configure o Webhook com a URL fornecida acima</li>
                    <li>Salve as alterações nesta página</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  <Save size={16} className="mr-2" />
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="equipe" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuários e Permissões</CardTitle>
                <CardDescription>
                  Gerencie os usuários que têm acesso ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Papel</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsuarios.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {usuario.nome.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{usuario.nome}</span>
                          </div>
                        </TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
                            {usuario.papel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="pt-4 border-t mt-4">
                  <h3 className="font-medium mb-4">Convidar Novo Usuário</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <Label htmlFor="novoEmail" className="mb-1.5 block">E-mail</Label>
                      <Input
                        id="novoEmail"
                        value={novoEmail}
                        onChange={(e) => setNovoEmail(e.target.value)}
                        placeholder="email@exemplo.com.br"
                        type="email"
                      />
                    </div>
                    <div className="w-40">
                      <Label htmlFor="novoPapel" className="mb-1.5 block">Papel</Label>
                      <Select value={novoPapel} onValueChange={setNovoPapel}>
                        <SelectTrigger id="novoPapel">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="atendente">Atendente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={handleSendInvite}
                        className="mb-0.5"
                      >
                        <Plus size={16} className="mr-2" />
                        Convidar
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Um e-mail será enviado com instruções para criar uma senha de acesso.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Configuracoes;
