import { Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";

type CookiesType<T extends string | number | symbol> = {
    [K in T]: string;
};

type setCookiesType = (cookie: string, value: string) => void
export default function useThemeCookies () {
    const [cookies, setCookies] = useCookies(["theme"])
    return [cookies, setCookies] as [CookiesType<string>, setCookiesType]
}