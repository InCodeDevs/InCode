export function createBox(username: any, password: any, name: any): {
    error: boolean;
    message: string;
};
export function deleteBox(username: any, password: any, name: any): {
    error: boolean;
    message: string;
};
export function addToBox(username: any, password: any, name: any, owner: any, entry: any): {
    error: boolean;
    message: string;
};
export function removeFromBox(username: any, password: any, name: any, timestamp: any): {
    error: boolean;
    message: string;
};
export function readBox(username: any, password: any, name: any): {
    error: boolean;
    message: any;
};
export function clearBox(username: any, password: any, name: any): {
    error: boolean;
    message: string;
};
export function existsBox(owner: any, name: any): {
    error: boolean;
    message: string;
};
export function reload(): void;
export function save(): void;
