import {
    styled, darken, alpha, lighten,
} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
// import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
    Scheduler,
    MonthView,
    // WeekView,
    // DayView,
    Appointments,
    Toolbar,
    DateNavigator,
    // AppointmentTooltip,
    // AppointmentForm,
    // EditRecurrenceMenu,
    // Resources,
    // DragDropProvider,
    CurrentTimeIndicator,
    TodayButton,
    ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
// import WbSunny from '@mui/icons-material/WbSunny';
// import FilterDrama from '@mui/icons-material/FilterDrama';
// import Opacity from '@mui/icons-material/Opacity';
// import ColorLens from '@mui/icons-material/ColorLens';
import { owners } from '../../demo-data/tasks';
import CalendarForm from './calendarForm';
import { useDispatch, useSelector } from 'react-redux';
// import { Button } from '@mui/material';
// import { addAppointment } from '../../features/calendar/caledarSlice';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import EditRecurrenceMenu from './EditRecurrenceMenu';
// import { IconButton, Menu } from '@mui/material';

const PREFIX = 'Demo';

const classes = {
    cell: `${PREFIX}-cell`,
    content: `${PREFIX}-content`,
    text: `${PREFIX}-text`,
    sun: `${PREFIX}-sun`,
    cloud: `${PREFIX}-cloud`,
    rain: `${PREFIX}-rain`,
    sunBack: `${PREFIX}-sunBack`,
    cloudBack: `${PREFIX}-cloudBack`,
    rainBack: `${PREFIX}-rainBack`,
    opacity: `${PREFIX}-opacity`,
    appointment: `${PREFIX}-appointment`,
    apptContent: `${PREFIX}-apptContent`,
    flexibleSpace: `${PREFIX}-flexibleSpace`,
    flexContainer: `${PREFIX}-flexContainer`,
    tooltipContent: `${PREFIX}-tooltipContent`,
    tooltipText: `${PREFIX}-tooltipText`,
    title: `${PREFIX}-title`,
    icon: `${PREFIX}-icon`,
    circle: `${PREFIX}-circle`,
    textCenter: `${PREFIX}-textCenter`,
    dateAndTitle: `${PREFIX}-dateAndTitle`,
    titleContainer: `${PREFIX}-titleContainer`,
    container: `${PREFIX}-container`,
};

const getBorder = theme => (`1px solid ${theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68)
    }`);

const DayScaleCell = props => (
    <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

// const StyledOpacity = styled(Opacity)(() => ({
//     [`&.${classes.rain}`]: {
//         color: '#4FC3F7',
//     },
// }));
// const StyledWbSunny = styled(WbSunny)(() => ({
//     [`&.${classes.sun}`]: {
//         color: '#FFEE58',
//     },
// }));
// const StyledFilterDrama = styled(FilterDrama)(() => ({
//     [`&.${classes.cloud}`]: {
//         color: '#90A4AE',
//     },
// }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${classes.cell}`]: {
        color: '#78909C!important',
        position: 'relative',
        userSelect: 'none',
        verticalAlign: 'top',
        padding: 0,
        height: 100,
        borderLeft: getBorder(theme),
        '&:first-of-type': {
            borderLeft: 'none',
        },
        '&:last-child': {
            paddingRight: 0,
        },
        'tr:last-child &': {
            borderBottom: 'none',
        },
        '&:hover': {
            backgroundColor: 'white',
        },
        '&:focus': {
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            outline: 0,
        },
    },
    [`&.${classes.sunBack}`]: {
        backgroundColor: '#FFFDE7',
    },
    [`&.${classes.cloudBack}`]: {
        backgroundColor: '#ECEFF1',
    },
    [`&.${classes.rainBack}`]: {
        backgroundColor: '#E1F5FE',
    },
    [`&.${classes.opacity}`]: {
        opacity: '0.5',
    },
}));
// const StyledDivText = styled('div')(() => ({
//     [`&.${classes.text}`]: {
//         padding: '0.5em',
//         // textAlign: 'center',
//     },
// }));
const StyledDivContent = styled('div')(() => ({
    [`&.${classes.content}`]: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
}));

const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
    [`&.${classes.appointment}`]: {
        borderRadius: '10px',
        '&:hover': {
            opacity: 0.6,
        },
    },
}));

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
    [`&.${classes.flexibleSpace}`]: {
        flex: 'none',
    },
    [`& .${classes.flexContainer}`]: {
        display: 'flex',
        alignItems: 'center',
    },
}));
const StyledAppointmentsAppointmentContent = styled(Appointments.AppointmentContent)(() => ({
    [`&.${classes.apptContent}`]: {
        '&>div>div': {
            whiteSpace: 'normal !important',
            lineHeight: 1.2,
        },
    },
}));

const appointmentStyle = {
    backgroundColor: 'Khaki',
    marginRight: 5,
    marginBottom: 5,
    width: '100%',
    padding: "2px 2px 2px 5px",
    borderRadius: 8
}

const resources = [{
    fieldName: 'ownerId',
    title: 'Owners',
    instances: owners,
}];

const CellBase = memo(({
    startDate,
    formatDate,
    onSubmit,
    handleDate,
    handleItem,
    data
}) => {
    const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
    const isFirstMonthDay = startDate.getDate() === 1;
    const currentDate = new Date();
    const dateActive = currentDate.getDate() === startDate.getDate() && currentDate.getMonth() === startDate.getMonth() ? true : false;
    const formatOptions = isFirstMonthDay
        ? { day: 'numeric', month: 'long' }
        : { day: 'numeric' };
    // console.log('>>', data);
    const rs = data.filter(item => moment(item.startDate).format("YYYY-MM-DD") <= moment(startDate).format("YYYY-MM-DD") && moment(item.endDate).format("YYYY-MM-DD") >= moment(startDate).format("YYYY-MM-DD"))

    const handleSubmit = () => {
        handleDate(startDate);
        handleItem(null);
        onSubmit();
    }
    const [anchor, setAnchor] = useState(null);
    const [task, setTask] = useState({});
    const handleAnchor = (event) => {
        event.stopPropagation();
        setAnchor(event.target);
    };

    return (
        <StyledTableCell
            onDoubleClick={handleSubmit}
            // onClick={() => alert(startDate)}
            tabIndex={0}
            className={classNames({
                [classes.cell]: true,
            })}
        >

            {/* <StyledDivText className={classes.text}> */}

            <div style={dateActive ? dateTitle_active : dateTitle}>
                {formatDate(startDate, formatOptions)}
            </div>
            <div className={classes.content}>
                {
                    rs.map((item) =>
                        <label style={{ display: 'flex' }} key={item.id} onClick={(event) => { handleAnchor(event); setTask(item); }}>
                            <input type="radio" name="appointmentItem" value={item.title} />
                            <div style={appointmentStyle}>
                                <span>{item.title}</span>
                            </div>
                        </label>)
                }
                <EditRecurrenceMenu
                    anchor={anchor}
                    handleAnchor={handleAnchor}
                    task={task}
                    handleItem={handleItem}
                    onSubmit={onSubmit}
                />
            </div>
            {/* </StyledDivText> */}
        </StyledTableCell >
    );
});

// const TimeTableCell = (CellBase);

const Appointment = (({ ...restProps }) => (
    <StyledAppointmentsAppointment
        {...restProps}
        className={classes.appointment}
    // onClick={() => console.log(restProps.data)}
    />
));

const AppointmentContent = (({ ...restProps }) => (
    <StyledAppointmentsAppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = (({ ...restProps }) => (
    <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
        <div className={classes.flexContainer}>
            {/* <ColorLens fontSize="large" htmlColor="#FF7043" />
            <Typography variant="h5" style={{ marginLeft: '10px' }}>Art School</Typography> */}
            {/* <div style={{
                marginLeft: 10,
                width: 120,
                height: 40,
                borderRadius: '5px 5px 5px 5px',
                border: '1px solid Silver',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                color: 'DodgerBlue'
            }}>
                <SystemUpdateAltIcon color="primary" /> Export
            </div> */}
        </div>
    </StyledToolbarFlexibleSpace>
));

export default function CalendarContent(props) {


    const appointmentList = useSelector(state => state.appointments);
    const [dateChoice, setDateChoice] = useState(null);
    const [formState, setFormState] = useState(false);
    const [item, setItem] = useState({});

    const handleFormState = () => setFormState(!formState);
    const handleDate = (time) => setDateChoice(time);
    const handleItem = item => setItem(item);

    // console.log('>>', item);
    return (
        <div>
            <Paper>
                {/* <Button onClick={handleSubmit} variant="contained">abc</Button> */}
                <Scheduler
                    data={appointmentList}
                    height={700}
                >

                    {/* Manages the current view's state */}
                    <ViewState
                        defaultCurrentDate={new Date()}
                    />

                    {/* Renders Scheduler data for a month */}
                    <MonthView
                        onSubmit={handleFormState}
                        timeTableCellComponent={(props) =>
                            <CellBase
                                onSubmit={handleFormState}
                                handleDate={handleDate}
                                handleItem={handleItem}
                                data={appointmentList}
                                {...props}
                            />}
                        dayScaleCellComponent={DayScaleCell}
                    />

                    {/* Renders the Toolbar */}
                    <Toolbar
                        flexibleSpaceComponent={FlexibleSpace}
                    />

                    {/* allows a user to switch between views at runtime. */}
                    <ViewSwitcher />

                    {/* Renders the Scheduler's button that is used to navigate to the today's date */}
                    <TodayButton />

                    {/* Renders Scheduler's date navigator */}
                    <DateNavigator />

                    {/* Display a current time indicator and shade appointments and cell up to the current time */}
                    <CurrentTimeIndicator
                        shadePreviousCells={true}
                        shadePreviousAppointments={true}
                        updateInterval={10000}
                    />
                </Scheduler>
            </Paper>
            <CalendarForm
                open={formState}
                handleToggle={handleFormState}
                appointments={appointmentList}
                dateChoice={dateChoice}
                item={item}
            />
        </div>
    );
}


const dateTitle = {
    padding: '0.5em'
}

const dateTitle_active = {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: 25,
    height: 25,
    margin: '0.2em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}