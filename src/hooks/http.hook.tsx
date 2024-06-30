import { useCallback, useState } from 'react';

const useHttp = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      url: string,
      method = 'GET',
      body = null,
      headers = { 'content-Type': 'application/json' }
    ) => {
      try {
        setLoading(true);
        const response = await fetch(url, { method, body, headers });
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);

        if (error instanceof Error) {
          setError(error.message);
        }
        throw error;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  return { error, loading, request, clearError };
};

export default useHttp;
