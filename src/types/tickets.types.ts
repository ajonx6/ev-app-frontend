export interface Ticket {
  type: string;
  area: string;
  pricePaid: number;
  purchaseDate: string;
  ticketCode: string;
}

export interface PurchaseTicketRequest {
  eventId: number;
  type: string;
  area: string;
  quantity: number;
}

export interface PurchaseTicketResponse {
  status: string;
  totalPrice: number;
}
