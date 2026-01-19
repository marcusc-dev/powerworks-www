// Voice Assistant Types

export type SafetyFlag = 'none' | 'caution' | 'stop_driving';
export type BookingIntent = 'low' | 'medium' | 'high';
export type SuggestedCTA = 'book' | 'whatsapp' | 'none';
export type AssistantStatus = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

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
}

export interface ContactPrefill {
  name?: string;
  phone?: string;
  message?: string;
  page?: string;
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
}

export interface VoiceAssistantState {
  isOpen: boolean;
  status: AssistantStatus;
  messages: Message[];
  safetyFlag: SafetyFlag;
  bookingIntent: BookingIntent;
  leadCapture: LeadCapture;
  contactPrefill: ContactPrefill;
  currentTranscript: string;
  error: string | null;
  speechSupported: boolean;
}
