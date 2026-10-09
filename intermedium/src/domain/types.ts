export type UserRole = 'manager' | 'provider' | 'admin';
export type RegistrationStatus = 'draft' | 'under_review' | 'approved' | 'rejected' | 'inactive';
export type SubscriptionStatus = 'not_contracted' | 'pending' | 'active' | 'delinquent' | 'cancelled';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  entityId?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: 'droplets' | 'zap' | 'paintbrush' | 'wrench' | 'snowflake' | 'shield';
  active: boolean;
}

export interface ProviderDocument {
  id: string;
  type: string;
  name: string;
  status: 'selected' | 'sent' | 'validated';
}

export interface Provider {
  id: string;
  accountEmail: string;
  fullName: string;
  cpf: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  state: string;
  professionalName: string;
  description: string;
  categoryIds: string[];
  regions: string[];
  urgent: boolean;
  registrationStatus: RegistrationStatus;
  rejectionReason?: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionActivatedAt?: string;
  nextPaymentAt?: string;
  blocked: boolean;
  avatar: string;
  portfolio: string[];
  documents: ProviderDocument[];
  createdAt: string;
}

export interface Condominium {
  id: string;
  accountEmail: string;
  responsibleName: string;
  phone: string;
  name: string;
  address: string;
  region: string;
  createdAt: string;
}

export interface PaymentEvent {
  id: string;
  providerId: string;
  type: 'confirmed' | 'pending' | 'failed' | 'cancelled' | 'reactivated';
  description: string;
  createdAt: string;
}

export interface DemoNotification {
  id: string;
  recipient: string;
  subject: string;
  createdAt: string;
}

export interface DemoState {
  version: 1;
  currentUser: CurrentUser | null;
  providers: Provider[];
  condominiums: Condominium[];
  categories: Category[];
  paymentEvents: PaymentEvent[];
  notifications: DemoNotification[];
}

export interface ProviderFilters {
  query: string;
  categoryId: string;
  region: string;
  urgentOnly: boolean;
}
