import { Response } from 'express';

export class CreatedSuccessResponse {
    metadata : any;

    constructor(metadata: number[]) {
        this.metadata = metadata;
    }

    send(res: Response) {
        res.status(201).json({
            success: true,
            metadata: this.metadata
        });
    }
}
