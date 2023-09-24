export type Mods = Record<string, boolean | string | undefined>

export const classNames = (cls?:string, mods:Mods = {}, additional: Array<string | undefined> = []):string => {
    const result = [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([ _, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');

    return result;
};
