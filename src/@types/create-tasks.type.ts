export type TResponseFindUser = {
  message: string;
  success: boolean;
  status: number;
  data?: {
    name: string;
    email: string;
    role: string;
  };
};
