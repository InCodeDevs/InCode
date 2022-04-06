export function existsUser(username: any): boolean;
export function createUser(username: any, password: any): {
    error: boolean;
    message: string;
};
export function deleteUser(username: any, password: any): {
    error: boolean;
    message: string;
};
export function login(username: any, password: any): {
    error: boolean;
    message: string;
};
export function updateUsername(old: any, username: any, password: any): {
    error: boolean;
    message: string;
};
export function updatePassword(username: any, old: any, password: any): {
    error: boolean;
    message: string;
};
export function storeData(username: any, password: any, dataName: any, data: any): {
    error: boolean;
    message: string;
};
export function getData(username: any, password: any, dataName: any): {
    error: boolean;
    message: any;
};
export function getAllData(username: any, password: any): {
    error: boolean;
    message: any;
};
export function createToken(username: any, password: any): {
    error: boolean;
    message: string;
};
export function isTokenValid(username: any, token: any): {
    error: boolean;
    message: string;
};
export function reload(): void;
export function save(): void;
