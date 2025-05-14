
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, MoreHorizontal, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for students
const mockAlunos = [
  {
    id: 1,
    nome: 'Ana Silva',
    plano: 'Mensal',
    statusPagamento: 'Pago',
    contratoVenceEm: '15/06/2023',
    diasRestantes: 28
  },
  {
    id: 2,
    nome: 'Carlos Oliveira',
    plano: 'Trimestral',
    statusPagamento: 'Pago',
    contratoVenceEm: '22/08/2023',
    diasRestantes: 96
  },
  {
    id: 3,
    nome: 'Mariana Costa',
    plano: 'Anual',
    statusPagamento: 'Pago',
    contratoVenceEm: '10/03/2024',
    diasRestantes: 297
  },
  {
    id: 4,
    nome: 'Roberto Alves',
    plano: 'Mensal',
    statusPagamento: 'Em atraso',
    contratoVenceEm: '05/05/2023',
    diasRestantes: -13 // Negative days means it's expired
  },
  {
    id: 5,
    nome: 'Patricia Mendes',
    plano: 'Semestral',
    statusPagamento: 'A vencer',
    contratoVenceEm: '20/10/2023',
    diasRestantes: 155
  }
];

type AlunoType = typeof mockAlunos[0];

type AlunosTableProps = {
  onEdit: (aluno: AlunoType) => void;
  onDelete: (alunoId: number) => void;
  onViewContract: (alunoId: number) => void;
};

export function AlunosTable({ onEdit, onDelete, onViewContract }: AlunosTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [alunos] = useState<AlunoType[]>(mockAlunos);
  
  // Filter students based on search term
  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Buscar alunos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status Pagamento</TableHead>
                <TableHead>Contrato Vence em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlunos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    Nenhum aluno encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlunos.map((aluno) => (
                  <TableRow key={aluno.id}>
                    <TableCell className="font-medium">{aluno.nome}</TableCell>
                    <TableCell>{aluno.plano}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "px-2 py-0.5",
                          {
                            "bg-green-100 text-green-800 border-green-200": aluno.statusPagamento === "Pago",
                            "bg-red-100 text-red-800 border-red-200": aluno.statusPagamento === "Em atraso",
                            "bg-yellow-100 text-yellow-800 border-yellow-200": aluno.statusPagamento === "A vencer"
                          }
                        )}
                      >
                        {aluno.statusPagamento}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{aluno.contratoVenceEm}</span>
                        {aluno.diasRestantes < 0 ? (
                          <span className="text-xs text-red-600">Vencido há {Math.abs(aluno.diasRestantes)} dias</span>
                        ) : aluno.diasRestantes <= 30 ? (
                          <span className="text-xs text-yellow-600">Vence em {aluno.diasRestantes} dias</span>
                        ) : (
                          <span className="text-xs text-gray-500">Em {aluno.diasRestantes} dias</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(aluno)}>
                            <Edit size={14} className="mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onViewContract(aluno.id)}>
                            <FileText size={14} className="mr-2" />
                            Ver contrato
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDelete(aluno.id)}
                            className="text-red-600 focus:text-red-500"
                          >
                            <Trash2 size={14} className="mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
