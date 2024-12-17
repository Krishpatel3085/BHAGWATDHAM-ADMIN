export interface AuthFormData {
    name?: string;
    email: string;
    password: string;
}

export interface SocialAuthProvider {
    name: string;
    icon: string;
}