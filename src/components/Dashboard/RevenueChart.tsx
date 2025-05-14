
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps 
} from 'recharts';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';

// Mock data for the chart
const monthlyData = [
  { name: 'Jan', receita: 4000 },
  { name: 'Fev', receita: 4200 },
  { name: 'Mar', receita: 5800 },
  { name: 'Abr', receita: 5500 },
  { name: 'Mai', receita: 6800 },
  { name: 'Jun', receita: 7200 },
  { name: 'Jul', receita: 7500 },
  { name: 'Ago', receita: 8000 },
  { name: 'Set', receita: 8300 },
  { name: 'Out', receita: 8500 },
  { name: 'Nov', receita: 8700 },
  { name: 'Dez', receita: 9000 }
];

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

export function RevenueChart() {
  const [year, setYear] = useState('2023');

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Receita Mensal</CardTitle>
          <CardDescription>
            Receita acumulada por mês
          </CardDescription>
        </div>
        <Select defaultValue={year} onValueChange={setYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 5,
              }}
              barSize={30}
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
                tickFormatter={(value) => `R$ ${value}`}
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
  );
}
