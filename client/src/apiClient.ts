import { API_URL } from './environment';

export const usageByEnterprise = async (enterprise: string, startDate?: string, endDate?: string) => {
  const queryParams = new URLSearchParams();
  
  if (startDate) {
    queryParams.append('startDate', startDate);
  }
  
  if (endDate) {
    queryParams.append('endDate', endDate);
  }

  const response = await fetch(`${API_URL}/api/enterprises/${enterprise}/copilot/usage${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
  return response.json();
};
