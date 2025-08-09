import { User } from '../users/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define el tipo user con todas sus propiedades
    }
  }
}