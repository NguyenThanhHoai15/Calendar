import { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Popover, TextField } from "@mui/material";
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function HomeSearch() {
    const [address, setAddress] = useState('');
    const [time, setTime] = useState([null, null]);
    const [rent, setRent] = useState({ 0: 3, 1: 0, 2: 1 });
    // const [rent, setRent] = useState([2, 0, 1]);
    const [childrenAge, setChildrenAge] = useState([]);

    const handleChangeRent = (index, state) => {
        if (state === 'increase')
            setRent({ ...rent, [index]: rent[index] + 1 })
        // rent[index] += 1;
        else if (rent[index] > 0) {
            setRent({ ...rent, [index]: rent[index] - 1 })
            // rent[index] -= 1;
            if (index === 1)
                childrenAge.splice(childrenAge.length - 1, 1);
        }
        // console.log(rent)
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
        console.log(address);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    // console.log(anchorEl);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSubmit = () => {
        const search = {
            address,
            checkin: time[0],
            checkout: time[1],
            oldPerson: rent[0],
            childrenPerson: rent[1],
            childrenAge,
            room: rent[2]
        }
        console.log(search);
    }
    const handleChangeChildren = (event) => {
        if (event.target.id < childrenAge.length)
            childrenAge[event.target.id].value = event.target.value;
        else
            setChildrenAge([...childrenAge, { id: event.target.id, value: event.target.value }])
    }

    const childrenAgeComponent = Array.from(new Array(rent[1])).map((item, index) => <div key={index}>
        <select
            style={select}
            id={index}
            defaultValue={childrenAge[index] ? childrenAge[index].value : ""}
            onChange={handleChangeChildren}
        >
            <option value="" disabled hidden>Độ tuổi (bắt buộc)</option>
            {Array.from(new Array(18)).map((item, index) =>
                <option key={index} value={index}>
                    {index} tuổi
                </option>
            )}
        </select>
    </div >)



    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Chọn chi nhánh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Chọn chi nhánh"
                                value={address}
                                onChange={handleChangeAddress}
                            >
                                <MenuItem value="Tp. Hồ Chí Minh">Tp. Hồ Chí Minh</MenuItem>
                                <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
                                <MenuItem value="Nha Trang">Nha Trang</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Check-in"
                            endText="Check-out"
                            value={time}
                            onChange={(newValue) => {
                                setTime(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField {...startProps} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField {...endProps} />
                                    </Grid>
                                </Grid>
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                        style={{
                            background: 'white',
                            color: 'grey',
                            border: '1px solid #CECED3',
                            height: '55px',
                        }}
                    >
                        {rent[0]} người lớn . {rent[1]} trẻ em . {rent[2]} phòng
                    </Button>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <div style={popover}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <p style={{ marginTop: 7, marginBottom: 'auto' }}>Người lớn</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <Button variant="outlined"
                                        onClick={() => handleChangeRent(0, 'decrease')}
                                        style={rent[0] > 0 ? allowed : not_allowed}
                                    >-</Button>
                                    <span style={{ marginLeft: 20, marginRight: 20 }}>{rent[0]}</span>
                                    <Button variant="outlined" onClick={() => handleChangeRent(0, 'increase')} style={{ minWidth: 2 }}>+</Button>
                                </Grid>

                                <Grid item xs={5}>
                                    <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>Trẻ em <br />
                                        <span style={{ color: 'gray' }}>0 - 17 tuổi</span>
                                    </p>
                                </Grid>
                                <Grid item xs={7}>
                                    <Button variant="outlined"
                                        onClick={() => handleChangeRent(1, 'decrease')}
                                        style={rent[1] > 0 ? allowed : not_allowed}
                                    >-</Button>
                                    <span style={{ marginLeft: 20, marginRight: 20 }}>{rent[1]}</span>
                                    <Button variant="outlined" onClick={() => handleChangeRent(1, 'increase')} style={{ minWidth: 2 }}>+</Button>
                                </Grid>

                                <Grid item xs={12}>
                                    {childrenAgeComponent}
                                    {rent[1] > 0 ? (<span style={{ color: 'gray', fontSize: 13 }}>Để tìm chỗ nghỉ phù hợp với cả nhóm của bạn cùng mức giá chính xác, chúng tôi cần biết tuổi của trẻ em tại thời điểm trả phòng</span>) : <></>}
                                </Grid>

                                <Grid item xs={5}>
                                    <p style={{ marginTop: 7, marginBottom: 'auto' }}>phòng</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <Button variant="outlined"
                                        onClick={() => handleChangeRent(2, 'decrease')}
                                        style={rent[2] > 0 ? allowed : not_allowed}
                                    >-</Button>
                                    <span style={{ marginLeft: 20, marginRight: 20 }}>{rent[2]}</span>
                                    <Button variant="outlined" onClick={() => handleChangeRent(2, 'increase')} style={allowed}>+</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Popover>
                </Grid>
                <Grid item xs={1}>
                    <Button onClick={onSubmit} variant="contained" style={{ height: 55, minWidth: 90, marginLeft: -30 }}>tìm</Button>
                </Grid>
            </Grid >

        </div >
    )
}

const allowed = {
    minWidth: 2
}

const not_allowed = {
    minWidth: 2,
    cursor: 'not-allowed'
}

const popover = {
    width: 300,
    padding: "30px 0px 30px 30px",
}

const select = {
    width: 150,
    height: 40,
    borderRadius: '5px 5px 5px 5px',
    fontSize: 15,
    marginTop: 5
}