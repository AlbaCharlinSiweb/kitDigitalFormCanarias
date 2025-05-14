const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

interface ContractPayload {
  tax_id: string;
  product: string;
}

export const createContract = async (payload: ContractPayload): Promise<Response> => {
  const response = await fetch(`${API_URL_BASE}/create-contract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};