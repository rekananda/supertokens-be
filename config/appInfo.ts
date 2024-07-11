const port = process.env.APP_PORT || 3000;

const apiBasePath = "/api/auth/";

export const websiteDomain = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${port}`;

export const appInfo = {
    appName: "Profilo",
    websiteDomain,
    apiDomain: websiteDomain,
    apiBasePath,
};

export const profiloService = {
    domain : process.env.PROFILO_API_DOMAIN || 'http://127.0.0.1:4000/api/v1/',
    apikey: process.env.PROFILO_APIKEY || 'secretKey'
};
