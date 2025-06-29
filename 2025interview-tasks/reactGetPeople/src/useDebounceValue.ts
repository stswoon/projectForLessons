import {useEffect, useState} from "react";

export function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log(`useDebounceValue: ${value}`)
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debouncedValue;
}