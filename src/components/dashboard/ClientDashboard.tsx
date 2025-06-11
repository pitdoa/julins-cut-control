
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Scissors, User, LogOut, Plus, CreditCard } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { BookingModal } from '../booking/BookingModal';
import { toast } from '@/hooks/use-toast';

export const ClientDashboard = () => {
  const { user, logout } = useAuthStore();
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Dados mockados - em produção vir do Supabase
  const upcomingAppointments = [
    {
      id: '1',
      date: '2024-06-15',
      time: '14:30',
      barber: 'Julin',
      service: 'Corte + Barba',
      price: 'R$ 40,00',
      status: 'confirmed'
    },
    {
      id: '2',
      date: '2024-06-22',
      time: '15:00',
      barber: 'Marquinho',
      service: 'Corte Tradicional',
      price: 'R$ 25,00',
      status: 'confirmed'
    }
  ];

  const appointmentHistory = [
    {
      id: '3',
      date: '2024-06-01',
      time: '16:00',
      barber: 'Julin',
      service: 'Corte + Barba',
      price: 'R$ 40,00',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-05-25',
      time: '14:00',
      barber: 'Marquinho',
      service: 'Corte Tradicional',
      price: 'R$ 25,00',
      status: 'completed'
    }
  ];

  const monthlyPlan = {
    active: true,
    cutsRemaining: 2,
    totalCuts: 4,
    renewalDate: '2024-07-01',
    fixedTime: 'Quinta, 15:00h'
  };

  const handleCancelAppointment = (appointmentId: string) => {
    toast({
      title: "Agendamento cancelado",
      description: "Seu horário foi liberado com sucesso",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Scissors className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">Barbearia do Julin</h1>
              <p className="text-sm text-muted-foreground">Bem-vindo, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setShowBookingModal(true)}
              className="golden-gradient text-black font-semibold hover:scale-105 transition-transform"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Plan */}
            {monthlyPlan.active && (
              <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-accent" />
                    Plano Mensal Ativo
                  </CardTitle>
                  <CardDescription>
                    Aproveite seus cortes com desconto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Cortes Restantes</p>
                      <p className="text-2xl font-bold text-accent">{monthlyPlan.cutsRemaining}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total no Plano</p>
                      <p className="text-2xl font-bold">{monthlyPlan.totalCuts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Renovação</p>
                      <p className="text-sm font-semibold">{new Date(monthlyPlan.renewalDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Horário Fixo</p>
                      <p className="text-sm font-semibold">{monthlyPlan.fixedTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Próximos Agendamentos
                </CardTitle>
                <CardDescription>
                  Seus cortes agendados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                            <Scissors className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <p className="font-semibold">{appointment.service}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Barbeiro: {appointment.barber}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-semibold">{appointment.price}</p>
                          <Badge variant="secondary">Confirmado</Badge>
                          <div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum agendamento próximo</p>
                    <Button
                      onClick={() => setShowBookingModal(true)}
                      className="mt-4"
                    >
                      Agendar Agora
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Histórico de Cortes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointmentHistory.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Scissors className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{appointment.service}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(appointment.date).toLocaleDateString('pt-BR')} - {appointment.barber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{appointment.price}</p>
                        <Badge variant="outline" className="text-xs">Concluído</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Meu Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{user?.phone}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Editar Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Agendamento
                </Button>
                <Button
                  className="w-full golden-gradient text-black font-semibold"
                  variant="outline"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Assinar Plano Mensal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal
        open={showBookingModal}
        onOpenChange={setShowBookingModal}
      />
    </div>
  );
};
