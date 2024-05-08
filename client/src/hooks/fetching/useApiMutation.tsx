import { useMutation } from '@tanstack/react-query';
import { Endpoints } from '../../interfaces/backend-fetches/requests/Endpoints.ts';

async function fetchData(endpoint: string, method: string, body?: any) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL!}/${endpoint}`,
      {
        method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      return res;
    }

    return await res.json();
  } catch (e) {
    throw e;
  }
}

export default function useApiMutate<
  E extends keyof Endpoints,
  M extends keyof Endpoints[E],
  B = Endpoints[E][M],
>(options: {
  mutationKey: string[];
  endpoint: E;
  method: M;
  onError?: (error: Error | Response) => void;
  onSuccess?: (res: Response) => void;
}) {
  const { mutationKey, endpoint, method, onError, onSuccess } = options;

  return useMutation({
    mutationKey,
    mutationFn: async (body: B) =>
      await fetchData(endpoint, method as string, body),
    onError,
    onSuccess,
  });
}
