
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/hooks/use-toast';
import { Scissors, User, Shield, Briefcase } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleClientLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validação das credenciais do cliente
    if (email === 'usuario@julin.com' && password === 'usuario123') {
      setTimeout(() => {
        login({
          id: 'user1',
          name: 'João Silva',
          email: email,
          phone: '(11) 99999-9999'
        }, 'client');
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo à Barbearia do Julinho",
        });
        
        setIsLoading(false);
        onOpenChange(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Erro no login",
          description: "Credenciais inválidas",
          variant: "destructive",
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleClientRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Simulação de cadastro
    setTimeout(() => {
      login({
        id: 'new_user',
        name: name,
        email: email,
        phone: phone
      }, 'client');
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora você pode agendar seus cortes",
      });
      
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Login admin
    if (email === 'admin@julin.com' && password === 'admin123') {
      setTimeout(() => {
        login({
          id: 'admin1',
          name: 'Julinho',
          email: email,
        }, 'admin');
        
        toast({
          title: "Login administrativo realizado!",
          description: "Bem-vindo ao painel de controle",
        });
        
        setIsLoading(false);
        onOpenChange(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Erro no login",
          description: "Credenciais inválidas",
          variant: "destructive",
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleEmployeeLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Login funcionário (credenciais de exemplo)
    if (email === 'funcionario@julin.com' && password === 'func123') {
      setTimeout(() => {
        login({
          id: 'emp1',
          name: 'Marquinho',
          email: email,
        }, 'employee');
        
        toast({
          title: "Login realizado!",
          description: "Bem-vindo ao painel do funcionário",
        });
        
        setIsLoading(false);
        onOpenChange(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Erro no login",
          description: "Credenciais inválidas",
          variant: "destructive",
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <Scissors className="h-8 w-8 text-accent" />
          </div>
          <DialogTitle className="text-center">Barbearia do Julinho</DialogTitle>
          <DialogDescription className="text-center">
            Entre ou cadastre-se para acessar o sistema
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="login">Cliente</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
            <TabsTrigger value="employee">Funcionário</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Login Cliente
                </CardTitle>
                <CardDescription>
                  Entre com suas credenciais para agendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleClientLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="usuario@julin.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Demo: usuario@julin.com / usuario123
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Cadastro Cliente
                </CardTitle>
                <CardDescription>
                  Crie sua conta para começar a agendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleClientRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="João Silva"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employee">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Login Funcionário
                </CardTitle>
                <CardDescription>
                  Acesso para barbeiros e funcionários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmployeeLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="emp-email">Email</Label>
                    <Input
                      id="emp-email"
                      name="email"
                      type="email"
                      placeholder="funcionario@julin.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="emp-password">Senha</Label>
                    <Input
                      id="emp-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar como Funcionário"}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Demo: funcionario@julin.com / func123
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Login Administrativo
                </CardTitle>
                <CardDescription>
                  Acesso restrito para administradores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      name="email"
                      type="email"
                      placeholder="admin@julin.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Senha</Label>
                    <Input
                      id="admin-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar como Admin"}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Demo: admin@julin.com / admin123
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
