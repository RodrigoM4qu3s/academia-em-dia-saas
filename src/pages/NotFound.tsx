
import { Button } from "../components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Rota não encontrada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6 animate-fade-in">
        <div className="text-primary text-8xl font-bold">404</div>
        <h1 className="text-2xl font-bold mt-6 mb-2">Página não encontrada</h1>
        <p className="text-gray-600 mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild>
          <a href="/">Voltar para o Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
