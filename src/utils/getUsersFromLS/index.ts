export const getUsersFromLS = () => {
    const data = localStorage.getItem("users")
    return data ? JSON.parse(data) : [];
};
