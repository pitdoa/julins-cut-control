
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
  Scissors
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
      notes: 'Cliente prefere degradê baixo'
    },
    {
      id: '2',
      time: '10:30',
      client: 'Pedro Santos',
      service: 'Corte Tradicional',
      phone: '(11) 88888-8888',
      status: 'confirmed',
      notes: ''
    },
    {
      id: '3',
      time: '14:00',
      client: 'Carlos Oliveira',
      service: 'Apenas Barba',
      phone: '(11) 77777-7777',
      status: 'completed',
      notes: 'Barba modelada'
    },
    {
      id: '4',
      time: '15:30',
      client: 'Roberto Lima',
      service: 'Corte + Barba',
      phone: '(11) 66666-6666',
      status: 'no_show',
      notes: 'Cliente não compareceu'
    }
  ];

  const weekStats = {
    totalAppointments: 32,
    completed: 28,
    noShows: 4,
    revenue: 840
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Agenda de Hoje</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="notes">Anotações</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold">{appointment.time} - {appointment.client}</p>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                          <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                          {appointment.notes && (
                            <p className="text-sm text-blue-600 italic">💡 {appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            appointment.status === 'completed' ? 'default' :
                            appointment.status === 'no_show' ? 'destructive' : 'secondary'
                          }
                        >
                          {appointment.status === 'completed' ? 'Concluído' :
                           appointment.status === 'no_show' ? 'Falta' : 'Confirmado'}
                        </Badge>
                        
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

          <TabsContent value="week" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas da Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
