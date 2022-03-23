export function setData(username: any, password: any, key: any, value: any): {
    error: boolean;
    message: string;
};
export function getData(username: any, password: any, key: any): {
    error: boolean;
    message: any;
};
export function allow(username: any, password: any, key: any, newUser: any): {
    error: boolean;
    message: string;
};
export function disallow(username: any, password: any, key: any, newUser: any): {
    error: boolean;
    message: string;
};
