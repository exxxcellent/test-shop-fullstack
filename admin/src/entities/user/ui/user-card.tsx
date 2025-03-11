import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import { User } from '../types/user.interface';

interface UserCardProps {
    data: User;
}

export default function UserCard({ data: { id, email, role } }: UserCardProps) {
    const router = useNavigate();

    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                        User
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        gutterBottom>
                        {email}
                    </Typography>
                    <Typography variant="body1">
                        <Typography>Role: {role}</Typography>
                    </Typography>
                </CardContent>
                <CardActions className="flex justify-start">
                    <Button
                        onClick={() => router(`/users/${id}`)}
                        size="medium"
                        variant="contained">
                        More
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}
