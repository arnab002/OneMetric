const baseApiURL = (): string => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
    }

    return apiUrl;
};

export default baseApiURL;
