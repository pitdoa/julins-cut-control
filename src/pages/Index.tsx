
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Scissors, Star, Users, MapPin, Phone } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';
import { PlanSelectionModal } from '@/components/plans/PlanSelectionModal';
import { PaymentModal } from '@/components/payment/PaymentModal';
import { useAuthStore } from '@/store/authStore';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { EmployeeDashboard } from '@/components/dashboard/EmployeeDashboard';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user, userType, hasMonthlyPlan } = useAuthStore();

  // Se usuário logado, mostrar o modal de planos primeiro (se não tiver plano)
  const handleUserLogin = () => {
    if (!hasMonthlyPlan) {
      setShowPlanModal(true);
    }
  };

  // Callback para quando um plano é selecionado
  const handlePlanSelected = () => {
    setShowPaymentModal(true);
  };

  // Se usuário logado, mostrar dashboard correspondente
  if (user) {
    // Mostrar modais se necessário
    if (!hasMonthlyPlan && userType === 'client') {
      return (
        <>
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Preparando seu acesso...</h2>
              <p className="text-muted-foreground">Escolha um plano ou continue sem plano</p>
            </div>
          </div>
          <PlanSelectionModal 
            open={showPlanModal} 
            onOpenChange={setShowPlanModal}
            onPlanSelected={handlePlanSelected}
          />
          <PaymentModal
            open={showPaymentModal}
            onOpenChange={setShowPaymentModal}
            planName="Plano Selecionado"
            planPrice="R$ 80,00"
            isSubscription={true}
          />
        </>
      );
    }

    if (userType === 'admin') {
      return <AdminDashboard />;
    }
    if (userType === 'employee') {
      return <EmployeeDashboard />;
    }
    return <ClientDashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-bold">Barbearia do Julinho</h1>
          </div>
          <Button 
            onClick={() => setShowAuthModal(true)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="barbershop-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Tradição e Estilo
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              A melhor barbearia da cidade, agora com agendamento online
            </p>
            <Button 
              onClick={() => setShowAuthModal(true)}
              size="lg" 
              className="golden-gradient text-black font-semibold text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agende seu Corte
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scissors className="mr-2 h-6 w-6 text-accent" />
                  Corte Tradicional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Corte clássico com navalha e acabamento perfeito
                </p>
                <p className="text-2xl font-bold text-accent">R$ 25,00</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-6 w-6 text-accent" />
                  Barba & Bigode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Aparar barba e bigode com produtos premium
                </p>
                <p className="text-2xl font-bold text-accent">R$ 15,00</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-6 w-6 text-accent" />
                  Plano Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  4 cortes por mês com horário fixo garantido
                </p>
                <p className="text-2xl font-bold text-accent">R$ 80,00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 mx-auto bg-accent rounded-full flex items-center justify-center mb-4">
                  <Scissors className="h-12 w-12 text-black" />
                </div>
                <CardTitle>Julinho</CardTitle>
                <CardDescription>Proprietário & Barbeiro Master</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  20 anos de experiência, especialista em cortes clássicos e modernos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center mb-4">
                  <Scissors className="h-12 w-12 text-white" />
                </div>
                <CardTitle>Marquinho</CardTitle>
                <CardDescription>Barbeiro Profissional</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Especialista em barbas e cortes modernos, sempre atualizado nas tendências
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Onde Estamos</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-6 w-6 text-accent" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Rua das Barbearias, 123
                </p>
                <p className="text-muted-foreground mb-2">
                  Centro - Sua Cidade
                </p>
                <p className="text-muted-foreground">
                  CEP: 12345-678
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-6 w-6 text-accent" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <p>Segunda a Sexta: 8h às 18h</p>
                  <p>Sábado: 8h às 17h</p>
                  <p>Domingo: 8h às 12h</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="barbershop-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Pronto para o seu próximo corte?
          </h3>
          <p className="text-xl mb-8 text-gray-300">
            Agende agora e garanta seu horário com os melhores barbeiros da cidade
          </p>
          <Button 
            onClick={() => setShowAuthModal(true)}
            size="lg" 
            className="golden-gradient text-black font-semibold text-lg px-8 py-6 hover:scale-105 transition-transform"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Agendar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scissors className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold">Barbearia do Julinho</span>
          </div>
          <p className="text-gray-400">
            © 2024 Barbearia do Julinho. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default Index;
