import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Box, Button, Drawer, Grid, IconButton, Stack, TextField } from '@mui/material';
import './card.css';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useForm } from 'react-hook-form';

const formStyle = {
    padding: '20px 30px 30px 30px',
    display: 'block'
}

export default function TemporaryDrawer() {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        reset();
    }

    const [open, setOpen] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleToggle = () => setOpen(!open);

    const list = () => (
        <Box
            sx={{
                width: 650
            }}
        >
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <div className='group'>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                    <Button type='submit' style={{ float: "right" }} variant="contained">SAVE</Button>
                </div>
                <div className='group'>
                    <label>Details</label> <br />
                    <input id='title' type='text' placeholder='Title' {...register("title")} />
                </div>
                <div className='group'>
                    <Grid container>
                        <Grid item xs={5.5}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} {...register("startDate")} />}
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={1}>
                            <p style={{ textAlign: 'center' }}>-</p>
                        </Grid>
                        <Grid item xs={5.5}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} {...register("endDate")} />}
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </div>
                <div className='group'>
                    <label>More Information</label> <br />
                    <textarea rows='6' {...register("description")} />
                </div>
            </form>
        </Box>
    );

    return (
        <div>
            <Button onClick={handleToggle}>button</Button>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={handleToggle}
            >
                {list()}
            </Drawer>
        </div>
    );
}
