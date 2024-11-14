//

export type Cookie = {
    name: string;
    value: string;
    days: number;
}


export const setCookie = ({name, value, days}: Cookie) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
    
}

export const getCookie = (name: string) => {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}=([^;]*)`)
    return cookieValue ? cookieValue[2] : null
}