import { Outlet, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useEffect } from 'react';

export default function Layout() {
    const router = useNavigate();

    useEffect(() => {
        const isLogin = localStorage.getItem('accessToken');
        if (!isLogin) router('/auth');
    });

    return (
        <DashboardLayout>
            <PageContainer>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}
