
import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BarChart3, 
  FileText, 
  Calendar, 
  Settings, 
  CreditCard, 
  Home, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  icon: typeof Home;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const NavItem = ({ to, icon: Icon, label, active, onClick }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 transition-all hover:bg-gray-100",
      active && "bg-primary-50 text-primary font-medium"
    )}
    onClick={onClick}
  >
    <Icon size={18} />
    <span>{label}</span>
  </Link>
);

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleLogout = () => {
    // In a real app, handle logout logic here
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Visão Geral' },
    { to: '/alunos', icon: Users, label: 'Alunos' },
    { to: '/planos', icon: FileText, label: 'Planos' },
    { to: '/cobrancas', icon: CreditCard, label: 'Cobranças' },
    { to: '/contratos', icon: Calendar, label: 'Contratos' },
    { to: '/relatorios', icon: BarChart3, label: 'Relatórios' },
    { to: '/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  // For mobile responsiveness
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-soft transition-transform duration-200 lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-primary rounded-md p-1">
                <span className="text-white font-bold">GF</span>
              </div>
              <h1 className="font-bold text-xl">GymFlow</h1>
            </Link>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleSidebar}>
              <X size={18} />
            </Button>
          </div>
          
          <div className="p-2 flex-1 overflow-y-auto">
            <nav className="space-y-1 mt-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.to}
                  onClick={closeSidebarOnMobile}
                />
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50" 
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="bg-white shadow-soft z-10 h-16">
          <div className="h-full px-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">Admin</p>
                <p className="text-sm text-gray-500">Academia Exemplo</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="font-medium">A</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
