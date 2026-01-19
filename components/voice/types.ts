// Voice Assistant Types

export type SafetyFlag = 'none' | 'caution' | 'stop_driving';
export type BookingIntent = 'low' | 'medium' | 'high';
export type SuggestedCTA = 'book' | 'whatsapp' | 'none';
export type AssistantStatus = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error' | 'booking_confirmed';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface LeadCapture {
  consent_requested: boolean;
  consent_granted: boolean;
  name?: string;
  phone?: string;
  email?: string;
  email_consent_requested?: boolean;
  email_consent_granted?: boolean;
}

export interface ContactPrefill {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  page?: string;
}

export interface BookingConfirmation {
  confirmed: boolean;
  requested_time?: string;
  service_type?: string;
  vehicle?: string;
  notes?: string;
}

export interface VoiceAgentRequest {
  sessionId: string;
  text: string;
  pageContext: string;
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface VoiceAgentResponse {
  spoken_response: string;
  follow_up_question: string;
  booking_intent: BookingIntent;
  safety_flag: SafetyFlag;
  suggested_cta: SuggestedCTA;
  lead_capture: LeadCapture;
  contact_prefill: ContactPrefill;
  booking_confirmation?: BookingConfirmation;
}

export interface VoiceAssistantState {
  isOpen: boolean;
  status: AssistantStatus;
  messages: Message[];
  safetyFlag: SafetyFlag;
  bookingIntent: BookingIntent;
  leadCapture: LeadCapture;
  contactPrefill: ContactPrefill;
  bookingConfirmation?: BookingConfirmation;
  currentTranscript: string;
  error: string | null;
  speechSupported: boolean;
}
