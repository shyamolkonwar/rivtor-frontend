/**
 * Stripe API Client
 * Handles Stripe checkout sessions and subscription management.
 */

import { api } from './index';

export interface CreateCheckoutRequest {
  price_id: string;
  success_url?: string;
  cancel_url?: string;
}

export interface CheckoutSessionResponse {
  session_id: string;
  url: string;
}

export interface SubscriptionStatusResponse {
  subscription_id: string | null;
  status: string | null;
  plan: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export interface PortalSessionResponse {
  url: string;
}

export interface PricesResponse {
  standard: {
    id: string;
    price: string;
    interval: string;
  };
  growth: {
    id: string;
    price: string;
    interval: string;
  };
  enterprise: {
    id: string;
    price: string;
    interval: string;
  };
}

export interface StripeConfigResponse {
  payment_enabled: boolean;
  stripe_configured: boolean;
}

export async function createCheckoutSession(
  data: CreateCheckoutRequest
): Promise<CheckoutSessionResponse> {
  return api.post<CheckoutSessionResponse>('/api/v1/stripe/checkout', data);
}

export async function createPortalSession(): Promise<PortalSessionResponse> {
  return api.post<PortalSessionResponse>('/api/v1/stripe/portal');
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatusResponse> {
  return api.get<SubscriptionStatusResponse>('/api/v1/stripe/subscription');
}

export async function getAvailablePrices(): Promise<PricesResponse> {
  return api.get<PricesResponse>('/api/v1/stripe/prices');
}

export async function getStripeConfig(): Promise<StripeConfigResponse> {
  return api.get<StripeConfigResponse>('/api/v1/stripe/config');
}
