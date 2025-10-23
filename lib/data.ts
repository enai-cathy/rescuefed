export type RequestStatus = "Pending" | "Accepted" | "Completed";

export type Request = {
  id: number;
  userEmail: string;
  service: string;
  date: string;
  status: RequestStatus;
};

export const initialRequests: Request[] = [];
