
import { SignInForm } from '@/components/Auth/SignInForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">GymFlow Brasil</h1>
          <p className="text-gray-500 mt-2">Sistema de gestão para academias</p>
        </div>
        
        <SignInForm />
      </div>
    </div>
  );
};

export default Login;
