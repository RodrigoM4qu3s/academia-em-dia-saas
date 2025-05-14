
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { AlunosTable } from "../components/Alunos/AlunosTable";
import { NovoAlunoModal } from "../components/Alunos/NovoAlunoModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

// Define um tipo para o aluno para evitar problemas de tipagem
type Aluno = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  plano: string;
  dataContrato: string;
};

const Alunos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const handleOpenNewModal = () => {
    setIsEditing(false);
    setSelectedAluno(null);
    setIsModalOpen(true);
  };

  const handleEditAluno = (aluno: any) => {
    // Verificar se o aluno existe antes de tentar acessar suas propriedades
    if (!aluno) return;
    
    setSelectedAluno({
      id: aluno.id,
      nome: aluno.nome || "",
      email: aluno.email || "email@exemplo.com", // Mock data
      cpf: aluno.cpf || "123.456.789-00", // Mock data
      plano: aluno.plano || "",
      dataContrato: aluno.dataContrato || "2023-01-01", // Mock data
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteAluno = (alunoId: number) => {
    if (alunoId) {
      setDeleteId(alunoId);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    // Verificar se há um ID para excluir
    if (deleteId) {
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Aluno excluído",
          description: "O aluno foi excluído com sucesso.",
        });
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }, 500);
    } else {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleViewContract = (alunoId: number) => {
    // Verificar se o ID é válido
    if (!alunoId) return;
    
    // Simulate opening a contract
    toast({
      title: "Visualizando contrato",
      description: `Visualizando contrato do aluno #${alunoId}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Alunos</h1>
            <p className="text-gray-500">
              Gerencie os alunos da sua academia
            </p>
          </div>
          <Button onClick={handleOpenNewModal}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Aluno
          </Button>
        </div>

        <AlunosTable
          onEdit={handleEditAluno}
          onDelete={handleDeleteAluno}
          onViewContract={handleViewContract}
        />

        {/* New/Edit Aluno Modal */}
        <NovoAlunoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isEditing={isEditing}
          initialData={selectedAluno || undefined}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog 
          open={isDeleteDialogOpen} 
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você tem certeza?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o
                aluno e todas as informações associadas a ele.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Alunos;
