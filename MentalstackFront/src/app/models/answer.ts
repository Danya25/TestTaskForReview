export interface Answer<T> {
    errors: Array<string>;
    exceptionMessage: string;
    message: string;
    success: boolean;
    value: T;
}
