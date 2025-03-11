import { Prop } from '@shared/types';

export const displayPropsFromArray = (
    data: Record<string, any>,
    prefix = '',
): Prop[] => {
    let content: Prop[] = [];

    for (const key of Object.keys(data)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = data[key];

        if (typeof value === 'object' && value !== null) {
            content = [...content, ...displayPropsFromArray(value, fullKey)];
        } else {
            content.push({ key: fullKey, value });
        }
    }

    return content;
};
