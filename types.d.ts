export type Transaction = {
    id: number;
    user_id: string; 
    title: string;
    description: string;
    date: Date;
    updated_at: Date;
    total_amount: number;
  };