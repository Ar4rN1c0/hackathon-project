export function useGetCookies () {
    const cookiesStored = Object.fromEntries(document.cookie.split(";").map(cookie => {
        const [name, value] = cookie.replaceAll(" ", "").split("=")
        
        return [name, value]
    }))
    return cookiesStored
}