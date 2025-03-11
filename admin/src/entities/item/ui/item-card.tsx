import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import { Item } from '../types/item.interface';

interface ItemCardProps {
    data: Item;
}

export default function ItemCard({ data: { id, title } }: ItemCardProps) {
    const router = useNavigate();

    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Item
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        gutterBottom
                        sx={{ textTransform: 'capitalize' }}>
                        {title}
                    </Typography>
                </CardContent>
                <CardActions className="flex justify-start">
                    <Button
                        onClick={() => router(`/items/${id}`)}
                        size="medium"
                        variant="contained">
                        More
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}
