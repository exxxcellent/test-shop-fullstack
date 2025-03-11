import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { blue } from '@mui/material/colors';

export default function PageError({ error }: { error?: Error | null }) {
    return (
        <Box className="flex-1 flex flex-col gap-3 items-center justify-center">
            <SentimentVeryDissatisfiedIcon
                className="text-7xl"
                sx={{ fontSize: 100, color: blue[700] }}
            />
            <Typography variant="h4">Ooops! Error :(</Typography>
            <Typography
                variant="h6"
                className="text-center">
                {error?.message}
            </Typography>
        </Box>
    );
}
