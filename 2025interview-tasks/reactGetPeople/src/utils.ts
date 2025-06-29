import type {Issue} from "./models.ts";

export const convertResponseToStructure: (data: any[]) => Issue[] = (data) => {
    return data.map(item => {
        return {
            url: item.url,
            title: item.title.substring(0, 50) + (item.title.length > 50 ? "..." : ""),
            user: item.user.login
        }
    });
}

export const timeout = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export type VoidFunc = (...args: any[]) => void;

export function debounce<T extends VoidFunc>(callback: T, ms: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args)
        }, ms);
    };
}