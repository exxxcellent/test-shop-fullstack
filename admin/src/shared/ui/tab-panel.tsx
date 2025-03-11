import { Box } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPanel({
    children,
    value,
    index,
    ...other
}: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className="flex-1"
            {...other}>
            {value === index && (
                <Box
                    className="flex-1 h-full w-full flex"
                    sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
