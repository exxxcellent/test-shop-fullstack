import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { Balance } from '../types/balance.interface';

interface PaymentCardProps {
    data: Balance;
}

export default function PaymentCard({
    data: { sum, status },
}: PaymentCardProps) {
    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Payment
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        gutterBottom>
                        {sum} RUB
                    </Typography>
                    <Typography variant="body1">
                        <Typography>Status: {status}</Typography>
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
}
