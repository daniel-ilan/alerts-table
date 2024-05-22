export const ensureArray: <T>(value: T | T[]) => T[] = (value) => {
    return Array.isArray(value) ? value : [value];
};

export const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);

    } catch (e) {
        return dateString;
    }

};