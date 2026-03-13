export const parseJwt = (token) => {
    try {
        if (!token) return null;
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = parseJwt(token);
    return decoded ? decoded.role : null;
};

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const decoded = parseJwt(token);

    return !!decoded;
};
