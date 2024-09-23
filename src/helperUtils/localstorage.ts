
export function saveAccessTokenInLocalStorage(token: string) {
    console.log(token);

    localStorage.setItem('accessToken', token);
}

export function getAccessTokenFromLocalStorage(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null; // Return null if not in the browser
}


export function removeAccessTokenFromLocalStorage() {
    localStorage.removeItem('accessToken');
}