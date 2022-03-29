import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Box, Button, Drawer, Grid, IconButton, Stack, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useForm } from 'react-hook-form';
import { addAppointment, updateAppointment } from '../../features/calendar/caledarSlice';
import moment from 'moment'
import './css/calendarForm.css';
import { useDispatch } from 'react-redux';
import { propsToClassKey } from '@mui/styles';
import { Controller } from "react-hook-form";

const formStyle = {
    padding: '20px 30px 30px 30px',
    display: 'block'
}

export default function CalendarForm(props) {

    const dispatch = useDispatch();

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: props.item === null ? "" : props.item.title,
            description: props.item?.description,
        }
    });

    const onSubmit = data => {
        props.item === null ?
            data.id = props.appointments.length :
            data.id = props.item.id;
        handleSubmitAppointment(data);
        props.handleToggle();
        reset();
    }

    const handleSubmitAppointment = (data) => {
        let action = null;
        props.item === null ?
            action = addAppointment(data) :
            action = updateAppointment(data);
        dispatch(action);
        console.log(action)
    }

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        setStartDate(props.dateChoice);
        setEndDate(props.dateChoice);
    }, [props.dateChoice])



    const list = () => (
        <Box
            sx={{
                width: 650
            }}
        >
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <div className='group'>
                    <IconButton onClick={props.handleToggle}>
                        <CloseIcon />
                    </IconButton>
                    <Button type='submit' style={{ float: "right" }} variant="contained">SAVE</Button>
                </div>
                <div className='group'>
                    <label>Details</label> <br />
                    <input id='title' name="title" type='text' placeholder='Title' {...register("title")} />
                </div>
                <div className='group'>
                    <Grid container>
                        <Grid item xs={5.5}>
                            <Controller
                                name={"startDate"}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <TextField
                                            {...field}
                                            fullWidth
                                            // label="startDate"
                                            {...register("startDate")}
                                            type="datetime-local"
                                            defaultValue={moment(startDate).format("YYYY-MM-DDThh:mm")}                                            // sx={{ width: 250 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            style={{ marginBottom: '30px' }}
                                        />
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <p style={{ textAlign: 'center' }}>-</p>
                        </Grid>
                        <Grid item xs={5.5}>
                            <Controller
                                name={"endDate"}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <TextField
                                            {...field}
                                            fullWidth
                                            // label="endDate"
                                            {...register("endDate")}
                                            type="datetime-local"
                                            defaultValue={moment(endDate).format("YYYY-MM-DDThh:mm")}                                            // sx={{ width: 250 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            style={{ marginBottom: '30px' }}
                                        />
                                    </>
                                )}
                            />
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
            <Drawer
                anchor={'left'}
                open={props.open}
                onClose={props.handleToggle}
            >
                {list()}
            </Drawer>
        </div>
    );
}
