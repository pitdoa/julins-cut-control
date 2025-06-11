
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Clock, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName?: string;
  planPrice?: string;
  isSubscription?: boolean;
}

export const PaymentModal = ({ open, onOpenChange, planName, planPrice, isSubscription = false }: PaymentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    
    // Simular integração com Mercado Pago
    setTimeout(() => {
      toast({
        title: "Pagamento processado!",
        description: isSubscription 
          ? "Seu plano foi ativado com sucesso. Agora você pode agendar seus cortes."
          : "Pagamento confirmado. Obrigado pela preferência!",
      });
      
      setIsLoading(false);
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <CreditCard className="mr-2 h-6 w-6 text-accent" />
            Finalizar Pagamento
          </DialogTitle>
          <DialogDescription className="text-center">
            Complete seu pagamento para {isSubscription ? 'ativar seu plano' : 'confirmar o agendamento'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo do Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {planName || 'Serviço'}
                  </span>
                  <span className="font-bold text-accent">
                    {planPrice || 'R$ 25,00'}
                  </span>
                </div>
                
                {isSubscription && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Renovação</span>
                    <span>Mensal</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span className="text-accent">{planPrice || 'R$ 25,00'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opções de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Método de Pagamento</CardTitle>
              <CardDescription>
                Integração com Mercado Pago em desenvolvimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <CreditCard className="h-5 w-5 text-accent" />
                  <div className="flex-1">
                    <p className="font-medium">Cartão de Crédito</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Elo</p>
                  </div>
                  <Badge variant="secondary">Disponível em breve</Badge>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <Star className="h-5 w-5 text-accent" />
                  <div className="flex-1">
                    <p className="font-medium">PIX</p>
                    <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                  </div>
                  <Badge variant="secondary">Disponível em breve</Badge>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                  <div className="flex-1">
                    <p className="font-medium">Boleto Bancário</p>
                    <p className="text-sm text-muted-foreground">Vencimento em 3 dias</p>
                  </div>
                  <Badge variant="secondary">Disponível em breve</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col space-y-3">
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full golden-gradient text-black font-semibold"
              size="lg"
            >
              {isLoading ? "Processando pagamento..." : "Finalizar Pagamento"}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            * API do Mercado Pago será integrada neste componente
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
