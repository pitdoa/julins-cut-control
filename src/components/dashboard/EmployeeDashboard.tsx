import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  User, 
  LogOut, 
  CheckCircle, 
  XCircle,
  FileText,
  Scissors,
  MessageSquare,
  Edit
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/hooks/use-toast';

export const EmployeeDashboard = () => {
  const { user, logout } = useAuthStore();
  const [notes, setNotes] = useState('');

  // Dados mockados para demonstração
  const todaySchedule = [
    {
      id: '1',
      time: '09:00',
      client: 'João Silva',
      service: 'Corte + Barba',
      phone: '(11) 99999-9999',
      status: 'confirmed',
      notes: 'Cliente prefere degradê baixo',
      price: 'R$ 40,00',
      type: 'regular',
      date: undefined as string | undefined
    },
    {
      id: '2',
      time: '10:30',
      client: 'Pedro Santos',
      service: 'Corte Tradicional',
      phone: '(11) 88888-8888',
      status: 'confirmed',
      notes: '',
      price: 'R$ 25,00',
      type: 'regular',
      date: undefined as string | undefined
    },
    {
      id: '3',
      time: '14:00',
      client: 'Carlos Oliveira',
      service: 'Apenas Barba',
      phone: '(11) 77777-7777',
      status: 'completed',
      notes: 'Barba modelada',
      price: 'R$ 15,00',
      type: 'regular',
      date: undefined as string | undefined
    },
    {
      id: '4',
      time: '15:30',
      client: 'Roberto Lima',
      service: 'Corte + Barba',
      phone: '(11) 66666-6666',
      status: 'no_show',
      notes: 'Cliente não compareceu',
      price: 'R$ 40,00',
      type: 'regular',
      date: undefined as string | undefined
    },
    {
      id: '5',
      time: '16:00',
      client: 'Ana Costa',
      service: 'Plano Mensal',
      phone: '(11) 55555-5555',
      status: 'confirmed',
      notes: 'Corte mensal incluído',
      price: 'Plano R$ 80,00',
      type: 'plan',
      date: undefined as string | undefined
    }
  ];

  // Todos os agendamentos (incluindo outros dias)
  const allAppointments = [
    ...todaySchedule,
    {
      id: '6',
      time: '09:30',
      client: 'Maria Santos',
      service: 'Corte Feminino',
      phone: '(11) 44444-4444',
      status: 'confirmed',
      notes: '',
      price: 'R$ 35,00',
      type: 'regular',
      date: '2024-06-16'
    },
    {
      id: '7',
      time: '11:00',
      client: 'José Silva',
      service: 'Plano Mensal',
      phone: '(11) 33333-3333',
      status: 'confirmed',
      notes: 'Cliente do plano mensal',
      price: 'Plano R$ 80,00',
      type: 'plan',
      date: '2024-06-16'
    }
  ];

  // Lista de clientes
  const clients = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      lastVisit: '2024-06-10',
      totalVisits: 15,
      hasPlan: false,
      preferredService: 'Corte + Barba',
      notes: 'Prefere degradê baixo'
    },
    {
      id: '2',
      name: 'Pedro Santos',
      email: 'pedro@email.com',
      phone: '(11) 88888-8888',
      lastVisit: '2024-06-08',
      totalVisits: 8,
      hasPlan: false,
      preferredService: 'Corte Tradicional',
      notes: 'Cliente pontual'
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 55555-5555',
      lastVisit: '2024-06-12',
      totalVisits: 12,
      hasPlan: true,
      preferredService: 'Corte Mensal',
      notes: 'Assinante do plano mensal'
    }
  ];

  const weekStats = {
    totalAppointments: 32,
    completed: 28,
    noShows: 4,
    revenue: 840,
    planClients: 6
  };

  const handleConfirmAppointment = (appointmentId: string) => {
    toast({
      title: "Presença confirmada",
      description: "Cliente marcado como presente",
    });
  };

  const handleNoShow = (appointmentId: string) => {
    toast({
      title: "Ausência registrada",
      description: "Cliente marcado como falta",
      variant: "destructive",
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Anotações salvas",
      description: "Suas observações foram registradas",
    });
  };

  const handleSendSms = (clientPhone: string) => {
    toast({
      title: "SMS enviado!",
      description: `Mensagem enviada para ${clientPhone}`,
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
              <h1 className="text-xl font-bold">Painel do Funcionário</h1>
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
        <Tabs defaultValue="today" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="today">Agenda de Hoje</TabsTrigger>
            <TabsTrigger value="all-appointments">Todos Agendamentos</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="notes">Anotações</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-accent">{todaySchedule.length}</div>
                  <p className="text-sm text-muted-foreground">Agendamentos Hoje</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {todaySchedule.filter(a => a.status === 'completed').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Concluídos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {todaySchedule.filter(a => a.status === 'confirmed').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Confirmados</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-red-600">
                    {todaySchedule.filter(a => a.status === 'no_show').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Faltas</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {todaySchedule.filter(a => a.type === 'plan').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Planos</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agenda de Hoje - {new Date().toLocaleDateString('pt-BR')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          appointment.type === 'plan' ? 'bg-purple-100' : 'bg-accent/10'
                        }`}>
                          <Clock className={`h-6 w-6 ${
                            appointment.type === 'plan' ? 'text-purple-600' : 'text-accent'
                          }`} />
                        </div>
                        <div>
                          <p className="font-semibold">{appointment.time} - {appointment.client}</p>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                          <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                          <p className="text-sm font-medium text-green-600">{appointment.price}</p>
                          {appointment.notes && (
                            <p className="text-sm text-blue-600 italic">💡 {appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            appointment.status === 'completed' ? 'default' :
                            appointment.status === 'no_show' ? 'destructive' : 
                            appointment.type === 'plan' ? 'secondary' : 'secondary'
                          }
                          className={appointment.type === 'plan' ? 'bg-purple-100 text-purple-800' : ''}
                        >
                          {appointment.status === 'completed' ? 'Concluído' :
                           appointment.status === 'no_show' ? 'Falta' : 
                           appointment.type === 'plan' ? 'Plano' : 'Confirmado'}
                        </Badge>
                        
                        <Button
                          size="sm"
                          onClick={() => handleSendSms(appointment.phone)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>

                        {appointment.status === 'confirmed' && (
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              onClick={() => handleConfirmAppointment(appointment.id)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleNoShow(appointment.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all-appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Agendamentos</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          appointment.type === 'plan' ? 'bg-purple-100' : 'bg-accent/10'
                        }`}>
                          <Calendar className={`h-5 w-5 ${
                            appointment.type === 'plan' ? 'text-purple-600' : 'text-accent'
                          }`} />
                        </div>
                        <div>
                          <p className="font-semibold">{appointment.client}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.service} - {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date ? new Date(appointment.date).toLocaleDateString('pt-BR') : 'Hoje'}
                          </p>
                          <p className="text-sm font-medium text-green-600">{appointment.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                          className={appointment.type === 'plan' ? 'bg-purple-100 text-purple-800' : ''}
                        >
                          {appointment.status === 'completed' ? 'Concluído' : 'Agendado'}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => handleSendSms(appointment.phone)}
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

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Clientes</CardTitle>
                <CardDescription>
                  Visualize informações dos seus clientes
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
                              <Badge className="bg-purple-100 text-purple-800">Plano Ativo</Badge>
                            )}
                          </div>
                          <p className="text-sm text-blue-600 italic">Preferência: {client.preferredService}</p>
                          {client.notes && (
                            <p className="text-sm text-gray-600">💡 {client.notes}</p>
                          )}
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

          <TabsContent value="week" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas da Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">{weekStats.totalAppointments}</div>
                    <p className="text-sm text-muted-foreground">Total de Atendimentos</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{weekStats.completed}</div>
                    <p className="text-sm text-muted-foreground">Concluídos</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{weekStats.noShows}</div>
                    <p className="text-sm text-muted-foreground">Faltas</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">R$ {weekStats.revenue}</div>
                    <p className="text-sm text-muted-foreground">Receita Gerada</p>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{weekStats.planClients}</div>
                    <p className="text-sm text-muted-foreground">Clientes Plano</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Anotações do Dia
                </CardTitle>
                <CardDescription>
                  Registre observações importantes sobre os atendimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Digite suas anotações aqui... (preferências dos clientes, observações especiais, etc.)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                  />
                  <Button onClick={handleSaveNotes}>
                    Salvar Anotações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
