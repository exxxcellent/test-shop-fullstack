import { Box, Tab, Tabs } from '@mui/material';
import TabPanel from '@shared/ui/tab-panel';
import { a11yProps } from '@shared/utils/a11-props';
import { CategoriesAll } from '@widgets/categories';
import CreateCategoryForm from '@widgets/categories/ui/create-form';
import { useState } from 'react';

export default function CategoriesPage() {
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
                    aria-label="Categories tabs">
                    <Tab
                        label="List"
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="Create"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <TabPanel
                value={tab}
                index={0}>
                <CategoriesAll />
            </TabPanel>
            <TabPanel
                value={tab}
                index={1}>
                <CreateCategoryForm />
            </TabPanel>
        </Box>
    );
}
