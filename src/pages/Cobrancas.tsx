
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, CreditCard, Search, FileText } from "lucide-react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Mock data for billing
const mockCobrancas = [
  {
    id: 1,
    aluno: 'Ana Silva',
    valor: 120.00,
    vencimento: '15/05/2023',
    status: 'Pago',
    plano: 'Mensal',
    metodoPagamento: 'Pix',
  },
  {
    id: 2,
    aluno: 'Carlos Oliveira',
    valor: 320.00,
    vencimento: '22/05/2023',
    status: 'Aguardando',
    plano: 'Trimestral',
    metodoPagamento: 'Boleto',
  },
  {
    id: 3,
    aluno: 'Mariana Costa',
    valor: 999.00,
    vencimento: '10/05/2023',
    status: 'Pago',
    plano: 'Anual',
    metodoPagamento: 'Cartão',
  },
  {
    id: 4,
    aluno: 'Roberto Alves',
    valor: 120.00,
    vencimento: '05/05/2023',
    status: 'Atrasado',
    plano: 'Mensal',
    metodoPagamento: 'Boleto',
  },
  {
    id: 5,
    aluno: 'Patricia Mendes',
    valor: 570.00,
    vencimento: '20/05/2023',
    status: 'Aguardando',
    plano: 'Semestral',
    metodoPagamento: 'Pix',
  }
];

const Cobrancas = () => {
  const [filter, setFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter and search
  const filteredCobrancas = mockCobrancas
    .filter((cobranca) => {
      if (filter === "todos") return true;
      return cobranca.status.toLowerCase() === filter;
    })
    .filter((cobranca) =>
      cobranca.aluno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  const handleGenerateBill = () => {
    // This would call your API to generate a new bill
    setIsDialogOpen(false);
    
    toast({
      title: "Cobrança gerada",
      description: "A cobrança foi gerada e notificada ao aluno com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Cobranças</h1>
            <p className="text-gray-500">
              Gerencie as cobranças da sua academia
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Gerar Cobrança Manual
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("todos")}
            >
              Todos
            </Button>
            <Button
              variant={filter === "pago" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pago")}
            >
              Pagos
            </Button>
            <Button
              variant={filter === "aguardando" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("aguardando")}
            >
              Aguardando
            </Button>
            <Button
              variant={filter === "atrasado" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("atrasado")}
            >
              Atrasados
            </Button>
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar por aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCobrancas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    Nenhuma cobrança encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredCobrancas.map((cobranca) => (
                  <TableRow key={cobranca.id}>
                    <TableCell className="font-medium">{cobranca.aluno}</TableCell>
                    <TableCell>{cobranca.plano}</TableCell>
                    <TableCell>R$ {cobranca.valor.toFixed(2)}</TableCell>
                    <TableCell>{cobranca.vencimento}</TableCell>
                    <TableCell>{cobranca.metodoPagamento}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "px-2 py-0.5",
                          {
                            "bg-green-100 text-green-800 border-green-200": cobranca.status === "Pago",
                            "bg-red-100 text-red-800 border-red-200": cobranca.status === "Atrasado",
                            "bg-yellow-100 text-yellow-800 border-yellow-200": cobranca.status === "Aguardando"
                          }
                        )}
                      >
                        {cobranca.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText size={16} />
                        <span className="sr-only">Detalhes</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Generate Manual Bill Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Gerar Cobrança Manual</DialogTitle>
              <DialogDescription>
                Crie uma nova cobrança para um aluno específico.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="aluno">Aluno</Label>
                <Select>
                  <SelectTrigger id="aluno">
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ana Silva</SelectItem>
                    <SelectItem value="2">Carlos Oliveira</SelectItem>
                    <SelectItem value="3">Mariana Costa</SelectItem>
                    <SelectItem value="4">Roberto Alves</SelectItem>
                    <SelectItem value="5">Patricia Mendes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="valor">Valor (R$)</Label>
                  <Input
                    id="valor"
                    type="number"
                    min="0.01"
                    step="0.01"
                    defaultValue="120.00"
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="vencimento">Data de Vencimento</Label>
                  <Input id="vencimento" type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="metodo">Método de Pagamento</Label>
                  <Select defaultValue="pix">
                    <SelectTrigger id="metodo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">Pix</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                      <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="descricao">Descrição (opcional)</Label>
                  <Input id="descricao" placeholder="Ex: Mensalidade de Junho" />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="button" 
                onClick={handleGenerateBill}
              >
                <CreditCard size={16} className="mr-2" />
                Gerar Cobrança
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Cobrancas;
