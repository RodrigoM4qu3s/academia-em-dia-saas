
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PlusCircle, 
  Upload, 
  Download, 
  Search, 
  Eye, 
  AlertTriangle 
} from "lucide-react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Mock data for contracts
const mockContratos = [
  {
    id: 1,
    aluno: 'Ana Silva',
    inicio: '15/01/2023',
    fim: '15/01/2024',
    status: 'Ativo',
    diasRestantes: 240,
  },
  {
    id: 2,
    aluno: 'Carlos Oliveira',
    inicio: '22/02/2023',
    fim: '22/05/2023',
    status: 'Expirado',
    diasRestantes: -5,
  },
  {
    id: 3,
    aluno: 'Mariana Costa',
    inicio: '10/03/2023',
    fim: '10/03/2024',
    status: 'Ativo',
    diasRestantes: 294,
  },
  {
    id: 4,
    aluno: 'Roberto Alves',
    inicio: '05/04/2023',
    fim: '05/05/2023',
    status: 'Expirado',
    diasRestantes: -22,
  },
  {
    id: 5,
    aluno: 'Patricia Mendes',
    inicio: '20/04/2023',
    fim: '20/05/2023',
    status: 'Prestes a vencer',
    diasRestantes: 6,
  }
];

const Contratos = () => {
  const [filter, setFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Filter and search
  const filteredContratos = mockContratos
    .filter((contrato) => {
      if (filter === "todos") return true;
      return contrato.status.toLowerCase() === filter.toLowerCase();
    })
    .filter((contrato) =>
      contrato.aluno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUploadContract = () => {
    // This would call your API to upload the contract
    setIsDialogOpen(false);
    setSelectedFile(null);
    
    toast({
      title: "Contrato enviado",
      description: "O contrato foi enviado com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Contratos</h1>
            <p className="text-gray-500">
              Gerencie os contratos dos alunos da sua academia
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Contrato
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
              variant={filter === "ativo" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("ativo")}
            >
              Ativos
            </Button>
            <Button
              variant={filter === "prestes a vencer" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("prestes a vencer")}
            >
              Prestes a Vencer
            </Button>
            <Button
              variant={filter === "expirado" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("expirado")}
            >
              Expirados
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
                <TableHead>Data de Início</TableHead>
                <TableHead>Data de Término</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContratos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    Nenhum contrato encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredContratos.map((contrato) => (
                  <TableRow key={contrato.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {contrato.status === 'Prestes a vencer' && (
                          <AlertTriangle size={16} className="mr-2 text-amber-500" />
                        )}
                        {contrato.aluno}
                      </div>
                    </TableCell>
                    <TableCell>{contrato.inicio}</TableCell>
                    <TableCell>{contrato.fim}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "px-2 py-0.5",
                          {
                            "bg-green-100 text-green-800 border-green-200": contrato.status === "Ativo",
                            "bg-red-100 text-red-800 border-red-200": contrato.status === "Expirado",
                            "bg-amber-100 text-amber-800 border-amber-200": contrato.status === "Prestes a vencer"
                          }
                        )}
                      >
                        {contrato.status}
                        {contrato.status === "Prestes a vencer" && ` (${contrato.diasRestantes} dias)`}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-1">
                        <Eye size={16} />
                        <span className="sr-only">Visualizar</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                        <span className="sr-only">Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Upload Contract Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Contrato</DialogTitle>
              <DialogDescription>
                Faça o upload de um contrato para um aluno.
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
                  <Label htmlFor="inicio">Data de Início</Label>
                  <Input id="inicio" type="date" />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fim">Data de Término</Label>
                  <Input id="fim" type="date" />
                </div>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="arquivo">Arquivo do Contrato (PDF)</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedFile 
                      ? `Arquivo selecionado: ${selectedFile.name}`
                      : 'Clique para fazer upload ou arraste o arquivo aqui'}
                  </p>
                  <input
                    id="arquivo"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
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
                onClick={handleUploadContract}
              >
                <Upload size={16} className="mr-2" />
                Enviar Contrato
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Contratos;
