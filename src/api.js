import BASE_URL from './baseUrl';

/**
 * apiFetch - A wrapper around the native fetch API that automatically handles
 * JWT token attachment and silent token refresh if the access token expires.
 */
const apiFetch = async (url, options = {}) => {
    // 1. Get tokens from localStorage
    let accessToken = localStorage.getItem('access') || localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh');

    // 2. Prepare headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // 3. Make the initial request
    let response = await fetch(url, { ...options, headers });

    // 4. Handle token expiration (401 Unauthorized or 403 Forbidden with specific message)
    if (response.status === 401 || response.status === 403) {
        console.log("Token expired, attempting to refresh...");

        if (refreshToken) {
            try {
                // Attempt to get a new access token using the refresh token
                const refreshResponse = await fetch(`${BASE_URL}/accounts/api/token/refresh/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh: refreshToken }),
                });

                if (refreshResponse.ok) {
                    const refreshData = await refreshResponse.json();
                    const newAccessToken = refreshData.access;

                    // Save the new access token
                    localStorage.setItem('access', newAccessToken);
                    localStorage.setItem('token', newAccessToken);

                    console.log("Token refreshed successfully! Retrying original request...");

                    // Update headers with new token
                    headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // 5. Retry the original request with the new token
                    response = await fetch(url, { ...options, headers });
                } else {
                    console.error("Refresh token expired or invalid. Redirecting to login...");
                    // Optional: Clear tokens and redirect to login if refresh fails
                    // localStorage.clear();
                    // window.location.href = "/Login";
                }
            } catch (error) {
                console.error("Error during token refresh:", error);
            }
        }
    }

    return response;
};

export default apiFetch;
