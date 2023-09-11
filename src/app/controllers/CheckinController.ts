import { Request, Response } from 'express';
import { makeCheckin } from '../useCases/checkin/makeCheckin';
import { findCheckins } from '../useCases/checkin/findCheckins';
import {
  checkinIndexSchema,
  checkinStoreSchema,
} from '../schemas/checkinSchemas';

class CheckinController {
  async index(req: Request, res: Response) {
    const data = checkinIndexSchema.parse(req.query);
    const checkins = await findCheckins(data);

    return res.json(checkins);
  }

  async store(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const data = checkinStoreSchema.parse(req.body);
    const checkin = await makeCheckin(req.userId, data);

    return res.status(201).json(checkin);
  }
}

export default new CheckinController();
