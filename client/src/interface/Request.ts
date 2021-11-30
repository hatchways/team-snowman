import { Profile } from './Profile';

export default interface Request {
  accepted: boolean | null;
  totalCost: boolean;
  paid: boolean;
  completed: boolean;
  rating: boolean;
  notes: string;
  viewed: boolean;
  _id: string;
  owner: { username: string; email: string; _id: string; profile: Profile };
  sitter: { username: string; email: string; _id: string };
  duration: {
    _id: string;
    start: string;
    end: string;
  };
  __v: number;
}

export default interface RequestData {
  after: [Request];
  before: [Request];
  nextRequest: Request;
}
