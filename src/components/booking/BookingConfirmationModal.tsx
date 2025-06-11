
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, CreditCard, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BookingConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingDetails: {
    barber: string;
    service: string;
    date: string;
    time: string;
    price: string;
  };
  onPaymentSelect: (payNow: boolean) => void;
}

export const BookingConfirmationModal = ({ 
  open, 
  onOpenChange, 
  bookingDetails, 
  onPaymentSelect 
}: BookingConfirmationModalProps) => {
  const [paymentChoice, setPaymentChoice] = useState<'now' | 'later' | null>(null);

  const handlePaymentChoice = (choice: 'now' | 'later') => {
    setPaymentChoice(choice);
    
    if (choice === 'now') {
      onPaymentSelect(true);
    } else {
      // Confirmar agendamento para pagar na hora
      toast({
        title: "Agendamento confirmado!",
        description: "Você poderá pagar na hora do atendimento. Até breve!",
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <Check className="mr-2 h-6 w-6 text-green-500" />
            Agendamento Realizado!
          </DialogTitle>
          <DialogDescription className="text-center">
            Seu horário foi reservado. Escolha como deseja efetuar o pagamento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo do Agendamento */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Detalhes do Agendamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Barbeiro</p>
                  <p className="text-sm text-muted-foreground">{bookingDetails.barber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Data e Horário</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(bookingDetails.date).toLocaleDateString('pt-BR')} às {bookingDetails.time}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Serviço</p>
                  <p className="text-sm text-muted-foreground">{bookingDetails.service}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-green-200">
                <span className="font-bold">Total:</span>
                <span className="text-xl font-bold text-accent">{bookingDetails.price}</span>
              </div>
            </CardContent>
          </Card>

          {/* Opções de Pagamento */}
          <div className="space-y-4">
            <h3 className="font-semibold text-center">Como deseja pagar?</h3>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                paymentChoice === 'now' ? 'ring-2 ring-accent bg-accent/5' : ''
              }`}
              onClick={() => setPaymentChoice('now')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-accent" />
                  <div className="flex-1">
                    <h4 className="font-semibold">Pagar Agora</h4>
                    <p className="text-sm text-muted-foreground">
                      Finalize o pagamento online e garanta seu horário
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Recomendado
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                paymentChoice === 'later' ? 'ring-2 ring-accent bg-accent/5' : ''
              }`}
              onClick={() => setPaymentChoice('later')}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-accent" />
                  <div className="flex-1">
                    <h4 className="font-semibold">Pagar na Hora</h4>
                    <p className="text-sm text-muted-foreground">
                      Efetue o pagamento no momento do atendimento
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-3">
            {paymentChoice === 'now' && (
              <Button
                onClick={() => handlePaymentChoice('now')}
                className="flex-1 golden-gradient text-black font-semibold"
              >
                Ir para Pagamento
              </Button>
            )}
            
            {paymentChoice === 'later' && (
              <Button
                onClick={() => handlePaymentChoice('later')}
                className="flex-1 golden-gradient text-black font-semibold"
              >
                Confirmar Agendamento
              </Button>
            )}
            
            {paymentChoice && (
              <Button
                variant="outline"
                onClick={() => setPaymentChoice(null)}
                className="flex-1"
              >
                Voltar
              </Button>
            )}
          </div>

          {!paymentChoice && (
            <p className="text-sm text-muted-foreground text-center">
              Selecione uma opção de pagamento para continuar
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
