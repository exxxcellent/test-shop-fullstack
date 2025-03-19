import { User } from '@entities/user';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router';
import { fetcher } from '@shared/utils/fetcher';

const entities = [
    {
        label: 'Items',
        icon: <CategoryIcon />,
        link: 'items',
    },
    {
        label: 'Categories',
        icon: <CategoryIcon />,
        link: '/categories',
    },
    {
        label: 'Orders',
        icon: <LocalShippingIcon />,
        link: '/orders',
    },
    {
        label: 'Users',
        icon: <PersonIcon />,
        link: '/users',
    },
];

export default function DashboardPage() {
    const user: User = JSON.parse(localStorage.getItem('user') as string);
    const router = useNavigate();

    const onLogoutHandler = async () => {
        await fetcher('auth/admin/logout');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        router('/auth');
    };

    return (
        <Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ width: '100%' }}>
                <Typography variant="h5">Welcome to Dashboard!</Typography>
                <Stack
                    alignItems="center"
                    gap={2}>
                    <Avatar sx={{ height: 64, width: 64 }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                        }}>
                        {user ? user.email : null}
                    </Typography>
                    <Button onClick={onLogoutHandler}>Logout</Button>
                </Stack>
            </Stack>
            <Typography
                variant="h4"
                gutterBottom>
                Entities
            </Typography>
            <Stack
                gap={2}
                direction="row"
                flexWrap="wrap">
                {entities.map((item) => (
                    <Card
                        sx={{
                            minWidth: '49.3%',
                        }}
                        elevation={3}>
                        <CardContent>
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}>
                                <Box sx={{ color: 'GrayText' }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h5">
                                    {item.label}
                                </Typography>
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => router(item.link)}
                                variant="contained">
                                More
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
}
