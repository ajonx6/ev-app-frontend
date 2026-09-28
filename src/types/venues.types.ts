export interface Venue {
  id: number;
  name: string;
  city: string;
  events: EventSummary[];
}

export interface EventSummary {
  id: number;
  name: string;
  startDateTime: string;
  endDateTime: string;
}
