
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash, 
  Crown, 
  Star, 
  Users,
  GraduationCap,
  Home,
  Check,
  X
} from 'lucide-react';
import { usePlansStore, Plan } from '@/store/plansStore';
import { toast } from '@/hooks/use-toast';

export const PlansManagement = () => {
  const { plans, addPlan, updatePlan, deletePlan, togglePlanStatus } = usePlansStore();
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    features: '',
    servicesCount: '',
    serviceType: 'cortes' as 'cortes' | 'cortes-barba' | 'completo',
    popular: false,
    active: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      features: '',
      servicesCount: '',
      serviceType: 'cortes',
      popular: false,
      active: true
    });
    setEditingPlan(null);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      originalPrice: plan.originalPrice.toString(),
      description: plan.description,
      features: plan.features.join('\n'),
      servicesCount: plan.servicesCount.toString(),
      serviceType: plan.serviceType,
      popular: plan.popular,
      active: plan.active
    });
    setShowCreateModal(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.originalPrice) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const planData = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      description: formData.description,
      features: formData.features.split('\n').filter(f => f.trim()),
      servicesCount: parseInt(formData.servicesCount) || 1,
      serviceType: formData.serviceType,
      popular: formData.popular,
      active: formData.active
    };

    if (editingPlan) {
      updatePlan(editingPlan.id, planData);
      toast({
        title: "Plano atualizado!",
        description: `${planData.name} foi atualizado com sucesso`,
      });
    } else {
      addPlan(planData);
      toast({
        title: "Plano criado!",
        description: `${planData.name} foi criado com sucesso`,
      });
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleDelete = (plan: Plan) => {
    deletePlan(plan.id);
    toast({
      title: "Plano removido",
      description: `${plan.name} foi removido`,
      variant: "destructive",
    });
  };

  const getIconForPlan = (plan: Plan) => {
    if (plan.serviceType === 'completo') return Crown;
    if (plan.popular) return Star;
    if (plan.name.toLowerCase().includes('estudante')) return GraduationCap;
    if (plan.name.toLowerCase().includes('família')) return Home;
    return Users;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Gerenciamento de Planos</h3>
          <p className="text-muted-foreground">
            Crie e gerencie os planos mensais da barbearia
          </p>
        </div>
        
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowCreateModal(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? 'Editar Plano' : 'Criar Novo Plano'}
              </DialogTitle>
              <DialogDescription>
                {editingPlan ? 'Atualize as informações do plano' : 'Preencha os dados do novo plano'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Plano*</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Plano Premium"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Ex: 4 cortes + barba por mês"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$)*</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="80.00"
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Preço Original (R$)*</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    placeholder="100.00"
                  />
                </div>
                <div>
                  <Label htmlFor="servicesCount">Nº de Serviços</Label>
                  <Input
                    id="servicesCount"
                    type="number"
                    value={formData.servicesCount}
                    onChange={(e) => setFormData({...formData, servicesCount: e.target.value})}
                    placeholder="4"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="serviceType">Tipo de Serviço</Label>
                <Select 
                  value={formData.serviceType} 
                  onValueChange={(value: 'cortes' | 'cortes-barba' | 'completo') => 
                    setFormData({...formData, serviceType: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cortes">Apenas Cortes</SelectItem>
                    <SelectItem value="cortes-barba">Cortes + Barba</SelectItem>
                    <SelectItem value="completo">Serviço Completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="features">Características (uma por linha)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  placeholder="4 cortes tradicionais por mês&#10;Horário fixo semanal&#10;Desconto de 20%"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => setFormData({...formData, popular: checked})}
                  />
                  <Label htmlFor="popular">Plano Popular</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                  />
                  <Label htmlFor="active">Ativo</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                {editingPlan ? 'Atualizar' : 'Criar'} Plano
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {plans.map((plan) => {
          const IconComponent = getIconForPlan(plan);
          const savings = plan.originalPrice - plan.price;
          const savingsPercent = Math.round((savings / plan.originalPrice) * 100);
          
          return (
            <Card key={plan.id} className={`${!plan.active ? 'opacity-50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold">{plan.name}</h4>
                        {plan.popular && (
                          <Badge className="bg-accent text-black">Popular</Badge>
                        )}
                        {!plan.active && (
                          <Badge variant="secondary">Inativo</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-accent">
                          R$ {plan.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {plan.originalPrice.toFixed(2)}
                        </span>
                        <Badge variant="secondary" className="text-green-600">
                          {savingsPercent}% OFF
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePlanStatus(plan.id)}
                    >
                      {plan.active ? (
                        <>
                          <X className="h-4 w-4 mr-1" />
                          Desativar
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Ativar
                        </>
                      )}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(plan)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
