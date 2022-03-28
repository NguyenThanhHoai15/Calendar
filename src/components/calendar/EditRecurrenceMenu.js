import * as React from 'react';
import Menu from '@mui/material/Menu';
import { IconButton } from '@mui/material';
import { AccessTime, Circle, Close, Delete, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeAppointment } from '../../features/calendar/caledarSlice';

export default function EditRecurrenceMenu(props) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        setAnchorEl(props.anchor);
    }, [props.anchor])

    const __delete = id => dispatch(removeAppointment(id));

    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <div style={{ width: 400 }}>
                    <div style={{ width: "100%", marginBottom: 10 }}>
                        <div style={{ paddingLeft: 260 }}>
                            <IconButton onClick={() => { props.handleItem(props.task); props.onSubmit(); }}>
                                <Edit />
                            </IconButton>|
                            <IconButton onClick={() => __delete(props.task.id)}>
                                <Delete />
                            </IconButton>|
                            <IconButton onClick={() => setAnchorEl(null)}>
                                <Close />
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ display: 'block', paddingLeft: 15, marginBottom: 15 }}>
                        <Circle color='primary' fontSize="large" style={{ float: 'left' }} />
                        <div style={{ marginLeft: 50 }}>
                            <span style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.6)', fontWeight: 700 }}>{props.task.title}</span><br />
                            <span>{props.task.startDate}</span>
                        </div>
                    </div>
                    <div style={{ display: 'block', paddingLeft: 15, marginBottom: 15 }}>
                        <AccessTime style={{ float: 'left' }} />
                        <div style={{ marginLeft: 50 }}>
                            <span>8:30 AM - 6:00 PM</span>
                        </div>
                    </div>
                </div>
            </Menu >
        </div >
    );
}
