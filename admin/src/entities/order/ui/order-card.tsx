import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import { Order } from '../types/order.interface';

interface OrderCardProps {
    data: Order;
}

export default function OrderCard({ data }: OrderCardProps) {
    const router = useNavigate();

    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Order
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        sx={{ textTransform: 'capitalize' }}>
                        {data.id}
                    </Typography>
                    <Typography variant="body1">
                        <Typography>Status: {data.status}</Typography>
                        <Typography>Sum: {data.sum}</Typography>
                        <Typography>
                            Message: <br /> {data.message}
                        </Typography>
                    </Typography>
                </CardContent>
                <CardActions className="flex justify-start">
                    <Button
                        onClick={() => router(`/orders/${data.id}`)}
                        size="medium"
                        variant="contained">
                        More
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}
