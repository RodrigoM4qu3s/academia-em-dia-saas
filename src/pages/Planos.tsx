
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { toast } from "@/hooks/use-toast";

// Mock data for plans
const mockPlanos = [
  { id: 1, nome: 'Mensal Standard', valor: 120, periodicidade: 1 },
  { id: 2, nome: 'Trimestral Premium', valor: 320, periodicidade: 3 },
  { id: 3, nome: 'Semestral', valor: 570, periodicidade: 6 },
  { id: 4, nome: 'Anual', valor: 999, periodicidade: 12 },
];

type Plano = typeof mockPlanos[0];

const Planos = () => {
  const [planos, setPlanos] = useState<Plano[]>(mockPlanos);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlano, setCurrentPlano] = useState<Plano>({
    id: 0,
    nome: "",
    valor: 0,
    periodicidade: 1,
  });

  const handleOpenDialog = (isEdit = false, plano?: Plano) => {
    if (isEdit && plano) {
      setIsEditing(true);
      setCurrentPlano(plano);
    } else {
      setIsEditing(false);
      setCurrentPlano({
        id: 0,
        nome: "",
        valor: 0,
        periodicidade: 1,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPlano((prev) => ({ ...prev, [name]: name === 'valor' ? parseFloat(value) : value }));
  };

  const handleSelectChange = (value: string) => {
    setCurrentPlano((prev) => ({ ...prev, periodicidade: parseInt(value) }));
  };

  const handleDelete = (id: number) => {
    // In a real app, you would call an API to delete the plan
    setPlanos(planos.filter((plano) => plano.id !== id));
    toast({
      title: "Plano excluído",
      description: "O plano foi excluído com sucesso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPlano.nome || currentPlano.valor <= 0) {
      toast({
        title: "Campos incompletos",
        description: "Por favor preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would call an API to save the plan
    if (isEditing) {
      setPlanos(
        planos.map((plano) =>
          plano.id === currentPlano.id ? currentPlano : plano
        )
      );
      toast({
        title: "Plano atualizado",
        description: `O plano ${currentPlano.nome} foi atualizado com sucesso.`,
      });
    } else {
      const newPlano = {
        ...currentPlano,
        id: Math.max(...planos.map((p) => p.id)) + 1,
      };
      setPlanos([...planos, newPlano]);
      toast({
        title: "Plano criado",
        description: `O plano ${currentPlano.nome} foi criado com sucesso.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Planos</h1>
            <p className="text-gray-500">
              Gerencie os planos oferecidos pela sua academia
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Plano
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Plano</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Periodicidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    Nenhum plano cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                planos.map((plano) => (
                  <TableRow key={plano.id}>
                    <TableCell className="font-medium">{plano.nome}</TableCell>
                    <TableCell>R$ {plano.valor.toFixed(2)}</TableCell>
                    <TableCell>
                      {plano.periodicidade === 1
                        ? "Mensal"
                        : plano.periodicidade === 3
                        ? "Trimestral"
                        : plano.periodicidade === 6
                        ? "Semestral"
                        : "Anual"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(true, plano)}
                        className="mr-1"
                      >
                        <Edit size={16} />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(plano.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Editar Plano" : "Novo Plano"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Atualize os detalhes do plano abaixo."
                  : "Preencha os detalhes do novo plano abaixo."}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="nome">Nome do Plano*</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={currentPlano.nome}
                    onChange={handleInputChange}
                    placeholder="Ex: Mensal Premium"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="valor">Valor (R$)*</Label>
                    <Input
                      id="valor"
                      name="valor"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={currentPlano.valor || ""}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="periodicidade">Periodicidade*</Label>
                    <Select
                      value={currentPlano.periodicidade.toString()}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="periodicidade">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Mensal</SelectItem>
                        <SelectItem value="3">Trimestral</SelectItem>
                        <SelectItem value="6">Semestral</SelectItem>
                        <SelectItem value="12">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {isEditing ? "Atualizar" : "Cadastrar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Planos;
