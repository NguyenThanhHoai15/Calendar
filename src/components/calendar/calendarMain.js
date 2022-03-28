import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CalendarContent from './calendarContent';

// function handleClick(event) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

export default function CalendarMain() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" style={{ color: 'DeepSkyBlue' }}>
            Task
        </Link>,
        <Typography key="2" color="text.primary">
            Calendar Task
        </Typography>,
    ];

    return (
        <div style={{ paddingTop: 10 }}>
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>

            <div style={{ marginTop: 20 }}>
                <CalendarContent />
            </div>
        </div>
    );
}
