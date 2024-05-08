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

// Using custom types to organize what endpoints we have available in the API and what data to send
// Here, E is a type with all the endpoints, where the key is the endpoint and the value is another type (M)
// M is a type with all the available methods for a given endpoint, where the key is the method and the value is an
// interface that says what the body of the request should have.
// B is the request body interface
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
