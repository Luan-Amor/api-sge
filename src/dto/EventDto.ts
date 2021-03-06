import { Video } from '../models/Video'; 

export interface CreateEventRequest {
    name: string;
    description: string;
    speaker?: string;
    ticket_price?: number;
    spots?: number;
    owner_id: string;
    videos?: Video[];
    start_event_date?: Date;
    end_event_date?: Date;
}

export interface UpdateEventRequest {
    id: number;
    name: string;
    description: string;
    speaker: string;
    ticket_price: number;
    spots: number;
    start_event_date: Date;
    end_event_date: Date;
}

export interface EventDto {
    id: number;
    name: string;
    description: string;
    speaker: string;
    ticket_price: number;
    spots: number;
    videos: Video[];
    start_event_date: Date;
    end_event_date: Date;
}

export interface AddVideoDto {
    idEvent: number,
    name: string,
    description: string,
    url: string;
}


