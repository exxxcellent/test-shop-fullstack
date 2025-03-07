import { Box, Tab, Tabs } from '@mui/material';
import TabPanel from '@shared/ui/tab-panel';
import { a11yProps } from '@shared/utils/a11-props';
import UsersAll from '@widgets/users/ui/users-all';
import { useState } from 'react';

export default function UsersPage() {
    const [tab, setTab] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box className="flex-1 flex flex-col">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="Users tabs">
                    <Tab
                        label="List"
                        {...a11yProps(0)}
                    />
                </Tabs>
            </Box>
            <TabPanel
                value={tab}
                index={0}>
                <UsersAll />
            </TabPanel>
        </Box>
    );
}
