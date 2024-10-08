import { API_URL, ENTERPRISE } from './environment';


export const getCopilotUsageForEnterprise = async (enterprise: string = ENTERPRISE) => {
    const response = await fetch(`${API_URL}/enterprises/${enterprise}/copilot/usage`);
    return response.json();
};

export const getCopilotUsageForTeam = async (teamSlug: string, enterprise: string = ENTERPRISE) => {
    const response = await fetch(`${API_URL}/enterprises/${enterprise}/copilot/team/${teamSlug}/usage`);
    return response.json();
};

export const getCopilotUsageForOrg = async (org: string) => {
    const response = await fetch(`${API_URL}/orgs/${org}/copilot/usage`);
    return response.json();
};

export const getCopilotUsageForOrgTeam = async (org: string, teamSlug: string) => {
    const response = await fetch(`${API_URL}/orgs/${org}/teams/${teamSlug}/copilot/usage`);
    return response.json();
};

export const getCopilotSeatsForEnterprise = async (enterprise: string = ENTERPRISE, page?: number, perPage?: number) => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (perPage) queryParams.append('per_page', perPage.toString());
    
    const response = await fetch(`${API_URL}/enterprises/${enterprise}/copilot/billing/seats?${queryParams.toString()}`);
    return response.json();
};

export const getOrganizations = async () => {
    const response = await fetch(`${API_URL}/organizations`);
    return response.json();
};

export const getTeamsForOrg = async (org: string) => {
    const response = await fetch(`${API_URL}/orgs/${org}/teams`);
    return response.json();
};

export interface UsageQueryParams {
    startDate?: string;
    endDate?: string;
    page?: number;
    perPage?: number;
}
