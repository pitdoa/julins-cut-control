
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Scissors, 
  LogOut, 
  TrendingUp, 
  Clock,
  Star,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const AdminDashboard = () => {
  const { user, logout } = useAuthStore();

  // Dados mockados para demonstração
  const todayAppointments = [
    {
      id: '1',
      time: '09:00',
      client: 'João Silva',
      service: 'Corte + Barba',
      barber: 'Julin',
      price: 'R$ 40,00',
      status: 'confirmed'
    },
    {
      id: '2',
      time: '10:30',
      client: 'Pedro Santos',
      service: 'Corte Tradicional',
      barber: 'Marquinho',
      price: 'R$ 25,00',
      status: 'confirmed'
    },
    {
      id: '3',
      time: '14:00',
      client: 'Carlos Oliveira',
      service: 'Apenas Barba',
      barber: 'Julin',
      price: 'R$ 15,00',
      status: 'completed'
    },
    {
      id: '4',
      time: '15:30',
      client: 'Roberto Lima',
      service: 'Corte + Barba',
      barber: 'Marquinho',
      price: 'R$ 40,00',
      status: 'confirmed'
    }
  ];

  const monthlyStats = {
    revenue: 2450,
    appointments: 98,
    newClients: 12,
    planSubscriptions: 8
  };

  const weeklyReport = [
    { day: 'Seg', appointments: 12, revenue: 380 },
    { day: 'Ter', appointments: 15, revenue: 470 },
    { day: 'Qua', appointments: 18, revenue: 565 },
    { day: 'Qui', appointments: 14, revenue: 420 },
    { day: 'Sex', apartments: 16, revenue: 510 },
    { day: 'Sáb', appointments: 20, revenue: 630 },
    { day: 'Dom', appointments: 8, revenue: 240 }
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
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
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-semibold">{appointment.price}</p>
                        <Badge 
                          variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                        >
                          {appointment.status === 'completed' ? 'Concluído' : 'Confirmado'}
                        </Badge>
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
                <CardTitle>Gerenciar Agendamentos</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Funcionalidade de calendário completo em desenvolvimento
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Clientes</CardTitle>
                <CardDescription>
                  Visualize informações dos clientes e histórico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Lista de clientes e histórico em desenvolvimento
                  </p>
                </div>
              </CardContent>
            </Card>
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

            <Card>
              <CardHeader>
                <CardTitle>Relatório Semanal</CardTitle>
                <CardDescription>
                  Performance dos últimos 7 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyReport.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{day.day}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{day.appointments} agendamentos</p>
                        </div>
                      </div>
                      <p className="font-semibold">R$ {day.revenue}</p>
                    </div>
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
