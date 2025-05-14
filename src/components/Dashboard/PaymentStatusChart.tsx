
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  Tooltip,
  TooltipProps
} from 'recharts';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

// Mock data for the chart
const paymentData = [
  { name: 'Pagos', value: 75, color: '#0066FF' },
  { name: 'Em Aberto', value: 20, color: '#FAAD14' },
  { name: 'Atrasados', value: 5, color: '#FF4D4F' }
];

const COLORS = paymentData.map(item => item.color);

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-soft rounded-lg border">
        <p className="font-medium" style={{ color: payload[0].payload.color }}>
          {payload[0].payload.name}
        </p>
        <p>
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <ul className="flex justify-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="h-3 w-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}: {entry.payload.value}%</span>
        </li>
      ))}
    </ul>
  );
};

export function PaymentStatusChart() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Status de Pagamentos</CardTitle>
        <CardDescription>
          Distribuição de pagamentos do mês atual
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
