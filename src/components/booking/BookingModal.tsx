
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Scissors, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Barber {
  id: string;
  name: string;
  specialties: string[];
  avatar: string;
  rating: number;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: string;
  description: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const barbers: Barber[] = [
  {
    id: '1',
    name: 'Julin',
    specialties: ['Cortes Clássicos', 'Barbas', 'Navalha'],
    avatar: 'J',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Marquinho',
    specialties: ['Cortes Modernos', 'Degradê', 'Barbas'],
    avatar: 'M',
    rating: 4.8
  }
];

const services: Service[] = [
  {
    id: '1',
    name: 'Corte Tradicional',
    duration: 30,
    price: 'R$ 25,00',
    description: 'Corte clássico com acabamento perfeito'
  },
  {
    id: '2',
    name: 'Corte + Barba',
    duration: 45,
    price: 'R$ 40,00',
    description: 'Corte completo com aparar barba'
  },
  {
    id: '3',
    name: 'Apenas Barba',
    duration: 20,
    price: 'R$ 15,00',
    description: 'Aparar e modelar barba'
  }
];

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8;
  const endHour = 18;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        time,
        available: Math.random() > 0.3 // 70% chance de estar disponível
      });
    }
  }
  
  return slots;
};

export const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmBooking = () => {
    const selectedBarberData = barbers.find(b => b.id === selectedBarber);
    const selectedServiceData = services.find(s => s.id === selectedService);
    
    toast({
      title: "Agendamento confirmado!",
      description: `${selectedServiceData?.name} com ${selectedBarberData?.name} em ${new Date(selectedDate).toLocaleDateString('pt-BR')} às ${selectedTime}`,
    });
    
    onOpenChange(false);
    // Reset form
    setStep(1);
    setSelectedBarber('');
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedBarber !== '';
      case 2: return selectedService !== '';
      case 3: return selectedDate !== '';
      case 4: return selectedTime !== '';
      default: return false;
    }
  };

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Scissors className="mr-2 h-6 w-6 text-accent" />
            Agendar Corte - Passo {step} de 4
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Escolha seu barbeiro preferido"}
            {step === 2 && "Selecione o serviço desejado"}
            {step === 3 && "Escolha a data"}
            {step === 4 && "Selecione o horário"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Choose Barber */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Escolha seu Barbeiro</h3>
              <div className="grid gap-4">
                {barbers.map((barber) => (
                  <Card
                    key={barber.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedBarber === barber.id ? 'ring-2 ring-accent bg-accent/5' : ''
                    }`}
                    onClick={() => setSelectedBarber(barber.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-black font-bold text-lg">
                          {barber.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{barber.name}</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {barber.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            ⭐ {barber.rating}/5.0
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Service */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Selecione o Serviço</h3>
              <div className="grid gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedService === service.id ? 'ring-2 ring-accent bg-accent/5' : ''
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{service.duration} min</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-accent">{service.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Choose Date */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Escolha a Data</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {getNextAvailableDates().map((date) => {
                  const dateObj = new Date(date);
                  const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                  const dayName = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' });
                  const dayNumber = dateObj.getDate();
                  const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' });
                  
                  return (
                    <Card
                      key={date}
                      className={`cursor-pointer transition-all hover:shadow-md text-center ${
                        selectedDate === date ? 'ring-2 ring-accent bg-accent/5' : ''
                      } ${isWeekend ? 'opacity-50' : ''}`}
                      onClick={() => !isWeekend && setSelectedDate(date)}
                    >
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground capitalize">{dayName}</p>
                        <p className="text-xl font-bold">{dayNumber}</p>
                        <p className="text-sm text-muted-foreground capitalize">{month}</p>
                        {isWeekend && <p className="text-xs text-red-500 mt-1">Fechado</p>}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Choose Time */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Selecione o Horário</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className={`h-12 ${
                      !slot.available ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      selectedTime === slot.time ? 'bg-accent text-black hover:bg-accent/90' : ''
                    }`}
                    disabled={!slot.available}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Horários em cinza não estão disponíveis
              </p>
            </div>
          )}

          {/* Summary */}
          {step === 4 && selectedBarber && selectedService && selectedDate && selectedTime && (
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Agendamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Barbeiro:</strong> {barbers.find(b => b.id === selectedBarber)?.name}</p>
                  <p><strong>Serviço:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                  <p><strong>Data:</strong> {new Date(selectedDate).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Horário:</strong> {selectedTime}</p>
                  <p><strong>Preço:</strong> {services.find(s => s.id === selectedService)?.price}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          
          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="golden-gradient text-black font-semibold"
            >
              Próximo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleConfirmBooking}
              disabled={!canProceed()}
              className="golden-gradient text-black font-semibold"
            >
              Confirmar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
