
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  popular: boolean;
  active: boolean;
  servicesCount: number;
  serviceType: 'cortes' | 'cortes-barba' | 'completo';
}

interface PlansState {
  plans: Plan[];
  addPlan: (plan: Omit<Plan, 'id'>) => void;
  updatePlan: (id: string, plan: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
  togglePlanStatus: (id: string) => void;
}

const defaultPlans: Plan[] = [
  {
    id: 'basic',
    name: 'Plano Básico',
    price: 80,
    originalPrice: 100,
    description: '4 cortes por mês',
    features: [
      '4 cortes tradicionais por mês',
      'Horário fixo semanal',
      'Desconto de 20%',
      'Prioridade no agendamento'
    ],
    popular: false,
    active: true,
    servicesCount: 4,
    serviceType: 'cortes'
  },
  {
    id: 'premium',
    name: 'Plano Premium',
    price: 140,
    originalPrice: 180,
    description: '4 cortes + barba por mês',
    features: [
      '4 cortes + barba por mês',
      'Horário fixo semanal',
      'Desconto de 22%',
      'Prioridade no agendamento',
      'Produtos premium inclusos'
    ],
    popular: true,
    active: true,
    servicesCount: 4,
    serviceType: 'cortes-barba'
  },
  {
    id: 'vip',
    name: 'Plano VIP',
    price: 200,
    originalPrice: 260,
    description: '6 serviços premium por mês',
    features: [
      '6 serviços completos por mês',
      'Horário fixo semanal',
      'Desconto de 25%',
      'Prioridade máxima',
      'Produtos premium inclusos',
      'Atendimento personalizado'
    ],
    popular: false,
    active: true,
    servicesCount: 6,
    serviceType: 'completo'
  },
  {
    id: 'student',
    name: 'Plano Estudante',
    price: 60,
    originalPrice: 80,
    description: '3 cortes por mês',
    features: [
      '3 cortes tradicionais por mês',
      'Desconto estudantil de 25%',
      'Horário flexível',
      'Válido com carteirinha'
    ],
    popular: false,
    active: true,
    servicesCount: 3,
    serviceType: 'cortes'
  },
  {
    id: 'family',
    name: 'Plano Família',
    price: 300,
    originalPrice: 400,
    description: '8 cortes para família',
    features: [
      '8 cortes por mês para família',
      'Compartilhar entre membros',
      'Desconto de 25%',
      'Agendamento prioritário',
      'Válido para até 4 pessoas'
    ],
    popular: false,
    active: true,
    servicesCount: 8,
    serviceType: 'cortes'
  }
];

export const usePlansStore = create<PlansState>()(
  persist(
    (set, get) => ({
      plans: defaultPlans,
      addPlan: (planData) => {
        const newPlan = {
          ...planData,
          id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        set((state) => ({
          plans: [...state.plans, newPlan]
        }));
      },
      updatePlan: (id, updates) => {
        set((state) => ({
          plans: state.plans.map(plan => 
            plan.id === id ? { ...plan, ...updates } : plan
          )
        }));
      },
      deletePlan: (id) => {
        set((state) => ({
          plans: state.plans.filter(plan => plan.id !== id)
        }));
      },
      togglePlanStatus: (id) => {
        set((state) => ({
          plans: state.plans.map(plan => 
            plan.id === id ? { ...plan, active: !plan.active } : plan
          )
        }));
      }
    }),
    {
      name: 'barbershop-plans',
    }
  )
);
