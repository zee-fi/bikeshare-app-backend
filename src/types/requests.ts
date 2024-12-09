import { Request } from "express";


export interface RequestCreateBike extends Request {
    body: {
        title: string, 
        tags: string[],
        description: string,
        price: number,
        deposit?: number,
        image: string, 
        owner: string
    }
}

export interface RequestCreateBooking extends Request {
    body: {
        startDate: string,
        endDate: string, 
        totalPrice: number, 
        bikeId: string
    }
}