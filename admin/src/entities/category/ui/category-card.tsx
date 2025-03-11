import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Category } from '../types/category.interface';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router';

interface CategoryCardProps {
    data: Category;
}

export default function CategoryCard({
    data: { id, popularity, title, _count },
}: CategoryCardProps) {
    const router = useNavigate();

    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: '100%' }}>
                <CardContent>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Category
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        gutterBottom
                        sx={{ textTransform: 'capitalize' }}>
                        {title}
                    </Typography>
                    <Typography variant="body1">
                        <Typography>Popularity: {popularity}</Typography>
                        <Typography>
                            Subcategories: {_count?.subcategories}
                        </Typography>
                    </Typography>
                </CardContent>
                <CardActions className="flex justify-start">
                    <Button
                        onClick={() => router(`/categories/${id}`)}
                        size="medium"
                        variant="contained">
                        More
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
}
