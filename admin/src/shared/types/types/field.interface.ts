export type Field<T extends string> = {
    name: T;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'file';
};
