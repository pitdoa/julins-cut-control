
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Clock, Check, Users, GraduationCap, Home } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { usePlansStore } from '@/store/plansStore';
import { toast } from '@/hooks/use-toast';

interface PlanSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPlanSelected: () => void;
}

export const PlanSelectionModal = ({ open, onOpenChange, onPlanSelected }: PlanSelectionModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { setHasMonthlyPlan } = useAuthStore();
  const { plans } = usePlansStore();

  // Filtrar apenas planos ativos
  const activePlans = plans.filter(plan => plan.active);

  const getIconForPlan = (plan: any) => {
    if (plan.serviceType === 'completo') return Crown;
    if (plan.popular) return Star;
    if (plan.name.toLowerCase().includes('estudante')) return GraduationCap;
    if (plan.name.toLowerCase().includes('família')) return Home;
    return Users;
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) {
      toast({
        title: "Selecione um plano",
        description: "Escolha um dos planos disponíveis para continuar",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular processo de assinatura
    setTimeout(() => {
      const plan = activePlans.find(p => p.id === selectedPlan);
      setHasMonthlyPlan(true);
      
      toast({
        title: "Plano assinado com sucesso!",
        description: `Você agora tem o ${plan?.name}. Redirecionando para pagamento...`,
      });
      
      setIsLoading(false);
      onOpenChange(false);
      onPlanSelected();
    }, 2000);
  };

  const handleSkip = () => {
    onOpenChange(false);
    onPlanSelected();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Escolha seu Plano Mensal</DialogTitle>
          <DialogDescription className="text-center">
            Economize com nossos planos mensais e garanta seu horário fixo
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {activePlans.map((plan) => {
            const IconComponent = getIconForPlan(plan);
            const savings = plan.originalPrice - plan.price;
            
            return (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all hover:shadow-lg relative ${
                  selectedPlan === plan.id ? 'ring-2 ring-accent bg-accent/5' : ''
                } ${
                  plan.popular ? 'border-accent shadow-lg' : ''
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-black px-3 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-accent">
                      R$ {plan.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground line-through">
                      R$ {plan.originalPrice.toFixed(2)}
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      Economize R$ {savings.toFixed(2)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleSkip}
            disabled={isLoading}
          >
            Pular por Agora
          </Button>
          
          <Button
            onClick={handleSubscribe}
            disabled={!selectedPlan || isLoading}
            className="golden-gradient text-black font-semibold"
          >
            {isLoading ? "Processando..." : "Assinar Plano"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Você pode cancelar ou alterar seu plano a qualquer momento
        </p>
      </DialogContent>
    </Dialog>
  );
};
