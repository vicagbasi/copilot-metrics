

export const ENTERPRISE = import.meta.env.VITE_ENTERPRISE ?? "test-enterprise";
export const API_URL = window.location.origin + (import.meta.env.VITE_API_BASE_PATH ?? '');


export const getCopilotUsageForEnterprise = async (enterprise: string = ENTERPRISE) => {
    const response = await fetch(`${API_URL}/enterprises/${enterprise}/copilot/usage`);
    console.log(response); 
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
    let requestPath = `${API_URL}/enterprises/${enterprise}/copilot/billing/seats`;
    if (queryParams.toString()) requestPath += `?${queryParams.toString()}`;
    const response = await fetch(requestPath);
    return response.json();
};

export const getOrganizations = async () => {
    const response = await fetch(`${API_URL}/user/orgs`);
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
