import { Box, CircularProgress } from '@mui/material';

export default function PageLoader() {
    return (
        <Box className="flex-1 flex items-center justify-center">
            <CircularProgress />
        </Box>
    );
}
