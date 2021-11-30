import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  totalCost: number;
  paymentMethod: string;
  userId: string;
}

export async function confirmPayments({ totalCost, paymentMethod, userId }: Props) {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ totalCost: totalCost, paymentMethod: paymentMethod }),
    credentials: 'include',
  };

  return await fetch(`/request/` + userId + `/checkout-with-created-intent`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
