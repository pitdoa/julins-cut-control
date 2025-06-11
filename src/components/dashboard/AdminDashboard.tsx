import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Scissors, 
  LogOut, 
  TrendingUp, 
  Clock,
  Star,
  BarChart3,
  MessageSquare,
  Settings,
  UserPlus,
  Edit,
  Trash
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/hooks/use-toast';
import { PlansManagement } from '@/components/admin/PlansManagement';

export const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const [newBarberName, setNewBarberName] = useState('');
  const [newBarberEmail, setNewBarberEmail] = useState('');

  // Dados mockados para demonstração
  const todayAppointments = [
    {
      id: '1',
      time: '09:00',
      client: 'João Silva',
      service: 'Corte + Barba',
      barber: 'Julinho',
      price: 'R$ 40,00',
      status: 'confirmed',
      phone: '(11) 99999-9999'
    },
    {
      id: '2',
      time: '10:30',
      client: 'Pedro Santos',
      service: 'Corte Tradicional',
      barber: 'Marquinho',
      price: 'R$ 25,00',
      status: 'confirmed',
      phone: '(11) 88888-8888'
    },
    {
      id: '3',
      time: '14:00',
      client: 'Carlos Oliveira',
      service: 'Apenas Barba',
      barber: 'Julinho',
      price: 'R$ 15,00',
      status: 'completed',
      phone: '(11) 77777-7777'
    },
    {
      id: '4',
      time: '15:30',
      client: 'Roberto Lima',
      service: 'Corte + Barba',
      barber: 'Marquinho',
      price: 'R$ 40,00',
      status: 'confirmed',
      phone: '(11) 66666-6666'
    }
  ];

  const monthlyStats = {
    revenue: 2450,
    appointments: 98,
    newClients: 12,
    planSubscriptions: 8
  };

  const barbers = [
    {
      id: '1',
      name: 'Julinho',
      email: 'julinho@barbearia.com',
      appointmentsThisWeek: 25,
      revenue: 800,
      rating: 4.9
    },
    {
      id: '2',
      name: 'Marquinho',
      email: 'marquinho@barbearia.com',
      appointmentsThisWeek: 22,
      revenue: 720,
      rating: 4.8
    }
  ];

  const clients = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      lastVisit: '2024-06-10',
      totalVisits: 15,
      hasPlan: true
    },
    {
      id: '2',
      name: 'Pedro Santos',
      email: 'pedro@email.com',
      phone: '(11) 88888-8888',
      lastVisit: '2024-06-08',
      totalVisits: 8,
      hasPlan: false
    }
  ];

  const aiInsights = [
    {
      title: "Horário Mais Disputado",
      insight: "Sextas-feiras às 15h são os horários mais procurados",
      recommendation: "Considere aumentar preços ou adicionar horários extras",
      type: "opportunity"
    },
    {
      title: "Baixa Ocupação",
      insight: "Segundas de manhã têm apenas 40% de ocupação",
      recommendation: "Lance promoções para manhãs de segunda-feira",
      type: "warning"
    },
    {
      title: "Performance da Equipe",
      insight: "Marquinho teve 25% mais agendamentos esta semana",
      recommendation: "Reconheça o bom desempenho e analise as estratégias",
      type: "success"
    }
  ];

  const handleAddBarber = () => {
    if (!newBarberName || !newBarberEmail) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e email do barbeiro",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Barbeiro adicionado!",
      description: `${newBarberName} foi adicionado à equipe`,
    });
    
    setNewBarberName('');
    setNewBarberEmail('');
  };

  const handleRemoveBarber = (barberId: string) => {
    toast({
      title: "Barbeiro removido",
      description: "O barbeiro foi removido da equipe",
      variant: "destructive",
    });
  };

  const handleSendSms = (clientPhone: string) => {
    toast({
      title: "SMS enviado!",
      description: `Lembrete enviado para ${clientPhone}`,
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
              <h1 className="text-xl font-bold">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Bem-vindo, {user?.name}</p>
            </div>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="barbers">Barbeiros</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="insights">IA Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">R$ {monthlyStats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.appointments}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.newClients}</div>
                  <p className="text-xs text-muted-foreground">
                    +3 novos esta semana
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.planSubscriptions}</div>
                  <p className="text-xs text-muted-foreground">
                    2 novas assinaturas esta semana
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Agenda de Hoje
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold">{appointment.time} - {appointment.client}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.service} com {appointment.barber}
                          </p>
                          <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold">{appointment.price}</p>
                        <Badge 
                          variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                        >
                          {appointment.status === 'completed' ? 'Concluído' : 'Confirmado'}
                        </Badge>
                        <div>
                          <Button
                            size="sm"
                            onClick={() => handleSendSms(appointment.phone)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            SMS
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Agendamentos</CardTitle>
                <CardDescription>
                  Gerencie todos os agendamentos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold">{appointment.client}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.service} - {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Barbeiro: {appointment.barber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{appointment.price}</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="barbers" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Lista de Barbeiros */}
              <Card>
                <CardHeader>
                  <CardTitle>Equipe de Barbeiros</CardTitle>
                  <CardDescription>
                    Gerencie sua equipe e acompanhe a performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {barbers.map((barber) => (
                      <div key={barber.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-black font-bold">
                            {barber.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{barber.name}</p>
                            <p className="text-sm text-muted-foreground">{barber.email}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm">⭐ {barber.rating}</span>
                              <span className="text-sm">{barber.appointmentsThisWeek} cortes</span>
                              <span className="text-sm text-green-600">R$ {barber.revenue}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRemoveBarber(barber.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Adicionar Novo Barbeiro */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Adicionar Barbeiro
                  </CardTitle>
                  <CardDescription>
                    Cadastre um novo membro da equipe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="barber-name">Nome Completo</Label>
                      <Input
                        id="barber-name"
                        value={newBarberName}
                        onChange={(e) => setNewBarberName(e.target.value)}
                        placeholder="Digite o nome do barbeiro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="barber-email">Email</Label>
                      <Input
                        id="barber-email"
                        type="email"
                        value={newBarberEmail}
                        onChange={(e) => setNewBarberEmail(e.target.value)}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <Button
                      onClick={handleAddBarber}
                      className="w-full golden-gradient text-black font-semibold"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Adicionar Barbeiro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Clientes</CardTitle>
                <CardDescription>
                  Visualize e gerencie informações dos clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                          <p className="text-sm text-muted-foreground">{client.phone}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm">Última visita: {new Date(client.lastVisit).toLocaleDateString('pt-BR')}</span>
                            <span className="text-sm">{client.totalVisits} visitas</span>
                            {client.hasPlan && (
                              <Badge className="bg-accent text-black">Plano Ativo</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleSendSms(client.phone)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <PlansManagement />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Insights de IA
                </CardTitle>
                <CardDescription>
                  Análises automáticas e recomendações baseadas em dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <Card key={index} className={`border-l-4 ${
                      insight.type === 'success' ? 'border-l-green-500' :
                      insight.type === 'warning' ? 'border-l-yellow-500' :
                      'border-l-blue-500'
                    }`}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.insight}
                        </p>
                        <p className="text-sm font-medium">
                          💡 {insight.recommendation}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
