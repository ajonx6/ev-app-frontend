export interface Event {
  id: number;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;

  venueId: number;
  venueName: string;
  venueCity: string;

  startFromPrice: number;
  totalAvailableTickets: number;
  isSoldOut: boolean;

  ticketTiers: TicketTier[];
}

export interface TicketTier {
  type: string;
  area: string;
  numSeats: number;
  seatsSold: number;
  price: number;
}

export interface CreateEventRequest {
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  venueId: number;
  ticketTiers: CreateTicketTierRequest[];
}

export interface CreateTicketTierRequest {
  type: string;
  area: string;
  numSeats: number;
  price: number;
}
