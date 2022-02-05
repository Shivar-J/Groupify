export const getCookieValue = (name) => {
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
}

export const deleteCookieValue = (name) => (
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
);

export const setCookieValue = (name, value, maxAge) => (
    document.cookie = `${name}=${value}; max-age=${maxAge}`
);