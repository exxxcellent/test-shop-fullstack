import {
    AuthProvider,
    SignInPage,
    SupportedAuthProvider,
    AuthResponse,
} from '@toolpad/core/SignInPage';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { fetcher } from '@shared/utils/fetcher';
import { ApiResponse, AuthResponseLogin, REQUEST_METHOD } from '@shared/types';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const providers: { id: SupportedAuthProvider; name: string }[] = [
    { id: 'nodemailer', name: 'Email' },
];

export default function AuthPage() {
    const theme = useTheme();
    const router = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) router('/');
    });

    const signIn: (
        provider: AuthProvider,
        formData: FormData,
    ) => Promise<AuthResponse> = async (_, formData) => {
        const { data } = await fetcher<ApiResponse<AuthResponseLogin>>(
            '/auth/admin',
            REQUEST_METHOD.POST,
            {
                email: formData.get('email'),
            },
        );
        if (data) {
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            setTimeout(() => router('/'), 3000);
        }
        return new Promise((resolve) => {
            resolve({
                success: 'You will be redirected in 3s.',
            });
        });
    };

    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{
                    emailField: { autoFocus: false },
                }}
            />
        </AppProvider>
    );
}
