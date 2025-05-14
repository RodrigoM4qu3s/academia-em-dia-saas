
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Download, FileText } from "lucide-react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for the revenue report
const revenueData = {
  "2023": [
    { name: "Jan", receita: 12500 },
    { name: "Fev", receita: 13200 },
    { name: "Mar", receita: 15100 },
    { name: "Abr", receita: 14800 },
    { name: "Mai", receita: 16300 },
    { name: "Jun", receita: 17500 },
    { name: "Jul", receita: 18200 },
    { name: "Ago", receita: 19100 },
    { name: "Set", receita: 20500 },
    { name: "Out", receita: 21300 },
    { name: "Nov", receita: 22100 },
    { name: "Dez", receita: 23400 }
  ],
  "2022": [
    { name: "Jan", receita: 8200 },
    { name: "Fev", receita: 8500 },
    { name: "Mar", receita: 9300 },
    { name: "Abr", receita: 10100 },
    { name: "Mai", receita: 10800 },
    { name: "Jun", receita: 11200 },
    { name: "Jul", receita: 11900 },
    { name: "Ago", receita: 12500 },
    { name: "Set", receita: 13100 },
    { name: "Out", receita: 13800 },
    { name: "Nov", receita: 14200 },
    { name: "Dez", receita: 14900 }
  ],
};

// Mock data for KPIs
const kpiData = {
  "2023": {
    totalReceita: 194500,
    mediaAlunos: 175,
    taxaCrescimento: 28.4,
    mediaMensal: 16208.33,
  },
  "2022": {
    totalReceita: 138500,
    mediaAlunos: 132,
    taxaCrescimento: 15.2,
    mediaMensal: 11541.67,
  },
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-soft rounded-lg border">
        <p className="font-medium">
          {payload[0].payload.name}
        </p>
        <p>
          R$ {payload[0].value?.toLocaleString('pt-BR')}
        </p>
      </div>
    );
  }
  return null;
};

const Relatorios = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  
  const handleExport = (format: string) => {
    toast({
      title: `Relatório exportado como ${format.toUpperCase()}`,
      description: `O relatório de receitas de ${selectedYear} foi exportado com sucesso.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Relatórios</h1>
            <p className="text-gray-500">
              Visualize e exporte relatórios da sua academia
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleExport('csv')}
              className="flex items-center"
            >
              <FileText size={16} className="mr-2" />
              Exportar CSV
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExport('pdf')}
              className="flex items-center"
            >
              <Download size={16} className="mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Receita Anual</CardTitle>
              <CardDescription>
                Visualize a receita mês a mês do período selecionado
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData[selectedYear as keyof typeof revenueData]}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                  barSize={36}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="receita" 
                    fill="#0066FF" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={cn("shadow-soft")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Receita Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {kpiData[selectedYear as keyof typeof kpiData].totalReceita.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs flex items-center mt-1">
                <span className="font-medium mr-1 text-green-600">
                  +{kpiData[selectedYear as keyof typeof kpiData].taxaCrescimento}%
                </span>
                <span className="text-gray-500">
                  vs. ano anterior
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className={cn("shadow-soft")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Média Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {kpiData[selectedYear as keyof typeof kpiData].mediaMensal.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Média calculada nos 12 meses
              </p>
            </CardContent>
          </Card>

          <Card className={cn("shadow-soft")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Média de Alunos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpiData[selectedYear as keyof typeof kpiData].mediaAlunos}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Média de alunos ativos por mês
              </p>
            </CardContent>
          </Card>

          <Card className={cn("shadow-soft")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Taxa de Crescimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{kpiData[selectedYear as keyof typeof kpiData].taxaCrescimento}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Em comparação ao ano anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Relatórios Disponíveis</CardTitle>
            <CardDescription>
              Selecione um relatório para visualizar ou exportar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <h3 className="font-medium">Relatório de Faturamento</h3>
                  <p className="text-sm text-gray-500">Detalhamento de todas as receitas do período</p>
                </div>
                <Button size="sm">Visualizar</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <h3 className="font-medium">Relatório de Alunos</h3>
                  <p className="text-sm text-gray-500">Entradas, saídas e status dos alunos</p>
                </div>
                <Button size="sm">Visualizar</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <h3 className="font-medium">Relatório de Inadimplência</h3>
                  <p className="text-sm text-gray-500">Análise de pagamentos atrasados e pendentes</p>
                </div>
                <Button size="sm">Visualizar</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <h3 className="font-medium">Relatório de Contratos</h3>
                  <p className="text-sm text-gray-500">Status e vencimentos de contratos</p>
                </div>
                <Button size="sm">Visualizar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Relatorios;
