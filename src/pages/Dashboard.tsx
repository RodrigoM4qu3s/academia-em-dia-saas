
import { BarChart3, User, CreditCard, Clock } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { CardKPI } from '../components/Dashboard/CardKPI';
import { RevenueChart } from '../components/Dashboard/RevenueChart';
import { PaymentStatusChart } from '../components/Dashboard/PaymentStatusChart';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold mb-2">Visão Geral</h1>
          <p className="text-gray-500">
            Acompanhe os principais indicadores da sua academia
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardKPI 
            title="Receita do Mês"
            value="R$ 32.450,00"
            icon={<BarChart3 size={18} />}
            change={{ value: 12, isPositive: true }}
          />
          
          <CardKPI 
            title="Receita Prevista"
            value="R$ 35.200,00"
            icon={<CreditCard size={18} />}
            change={{ value: 8, isPositive: true }}
          />
          
          <CardKPI 
            title="Inadimplência"
            value="R$ 2.750,00"
            icon={<Clock size={18} />}
            change={{ value: 2, isPositive: false }}
          />
          
          <CardKPI 
            title="Alunos Ativos"
            value="187"
            icon={<User size={18} />}
            change={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <RevenueChart />
          </div>
          <div className="lg:col-span-2">
            <PaymentStatusChart />
          </div>
        </div>

        {/* Recent Activities - Optional component */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="font-medium mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <User size={16} />
              </div>
              <div>
                <p className="font-medium">Novo aluno cadastrado</p>
                <p className="text-sm text-gray-500">Ricardo Silva foi adicionado ao plano mensal</p>
                <p className="text-xs text-gray-400 mt-1">Hoje, 14:32</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <CreditCard size={16} />
              </div>
              <div>
                <p className="font-medium">Pagamento recebido</p>
                <p className="text-sm text-gray-500">Maria Oliveira - R$ 120,00</p>
                <p className="text-xs text-gray-400 mt-1">Hoje, 11:15</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Clock size={16} />
              </div>
              <div>
                <p className="font-medium">Contrato prestes a vencer</p>
                <p className="text-sm text-gray-500">3 contratos vencem nos próximos 7 dias</p>
                <p className="text-xs text-gray-400 mt-1">Ontem, 08:45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
