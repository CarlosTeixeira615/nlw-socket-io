import { Request, Response } from "express";
import { AuthenticatedUserService } from "../services/AuthenticatedUserService";

class AuthenticatedUserController {
  async handle(req: Request, res: Response) {
    try {
      const { code } = req.body;
      const service = new AuthenticatedUserService();
      const result = await service.execute(code);
      return res.json(result);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export { AuthenticatedUserController };
