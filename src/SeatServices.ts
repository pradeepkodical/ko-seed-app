export interface SeatSelectionDTO {
    imageUrl: string;
    sections: Array<SeatSectionDTO>;
    eventId: string;
    sessionId: string;
}


export interface SeatSectionDTO {
    title: string;
    seats: Array<SeatDTO>;
    points: Array<{ x: number, y: number }>
    footNote?: string;
}

export interface SeatDTO {
    number: string;
    row: number;
    column: number;
    available?: boolean;
}

export interface ReserveSeatRequestDTO {
    eventId: string;
    sessionId: string;
    seatNo: string;
}

export interface ReserveSeatResponseDTO {
    seatReservationId: string;
}

export interface ReleaseSeatRequestDTO {
    seatReservationId: string;
}

export interface ReleaseSeatResponseDTO {
    seatReservationId: string;
}

export class SeatServices {

    static getSeatSelection(): Promise<SeatSelectionDTO> {
        return new Promise<SeatSelectionDTO>((resolve) => {
            const strJson = localStorage.getItem('seat-selection');
            if (strJson) {
                resolve(JSON.parse(strJson));
            }
        })
    }

    static saveSeatSelection(model: SeatSelectionDTO): Promise<SeatSelectionDTO> {
        return new Promise<SeatSelectionDTO>((resolve) => {
            localStorage.setItem('seat-selection', JSON.stringify(model));
            resolve(model);
        })

    }

    static reserveSeat(seat: ReserveSeatRequestDTO): Promise<ReserveSeatResponseDTO> {
        return new Promise<ReserveSeatResponseDTO>((resolve) => {
            setTimeout(() => {
                resolve({ seatReservationId: 'seat' });
            }, 1000);
        });
    }

    static releaseSeat(seat: ReleaseSeatRequestDTO): Promise<ReleaseSeatResponseDTO> {
        return new Promise<ReleaseSeatResponseDTO>((resolve) => {
            setTimeout(() => {
                resolve({ seatReservationId: 'seat' });
            }, 1000);
        });
    }
}