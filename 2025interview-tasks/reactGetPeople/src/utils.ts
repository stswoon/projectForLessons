import type {Issue} from "./models.ts";

export const convertResponseToStructure: (data: any[]) => Issue[] = (data) => {
    return data.map(item => {
        return {
            url: item.url,
            title: item.title.substring(1, 50) + (item.title.length > 50 ? "..." : ""),
            user: item.user.login
        }
    });
}

export const timeout = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export type DebounceType<T extends Function> = (callback: T, ms: number) => T;

// export type DebounceType<T extends (...args: any[]) => any> = (...args: Parameters<T>): ReturnType<T> | void;

//TODO: typyzation
export const debounce: DebounceType<any> = (callback: Function, ms: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args)
        }, ms);
    };
}