
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type NovoAlunoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  initialData?: {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    plano: string;
    dataContrato: string;
  };
};

export function NovoAlunoModal({
  isOpen,
  onClose,
  isEditing = false,
  initialData = {
    nome: "",
    email: "",
    cpf: "",
    plano: "",
    dataContrato: "",
  },
}: NovoAlunoModalProps) {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format CPF
    if (name === 'cpf') {
      const formattedCPF = formatCPF(value);
      setFormData((prev) => ({ ...prev, [name]: formattedCPF }));
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCPF = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Apply the mask
    let result = "";
    for (let i = 0; i < digits.length && i < 11; i++) {
      if (i === 3 || i === 6) result += ".";
      if (i === 9) result += "-";
      result += digits[i];
    }
    
    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.nome || !formData.email || !formData.cpf || !formData.plano) {
      toast({
        title: "Campos incompletos",
        description: "Por favor preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isEditing ? "Aluno atualizado" : "Aluno cadastrado",
        description: isEditing
          ? `Os dados de ${formData.nome} foram atualizados com sucesso.`
          : `${formData.nome} foi cadastrado com sucesso.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Aluno" : "Novo Aluno"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os dados do aluno no formulário abaixo."
              : "Preencha os dados do novo aluno no formulário abaixo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nome">Nome Completo*</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome completo do aluno"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cpf">CPF*</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="plano">Plano*</Label>
                <Select
                  name="plano"
                  value={formData.plano}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, plano: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensal">Mensal</SelectItem>
                    <SelectItem value="Trimestral">Trimestral</SelectItem>
                    <SelectItem value="Semestral">Semestral</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dataContrato">Data do Contrato</Label>
                <Input
                  id="dataContrato"
                  name="dataContrato"
                  type="date"
                  value={formData.dataContrato}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processando..." : isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
