import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Grid } from '@mui/material';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../css/login.css'
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
});

export default function FormDialog(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data) => {
        console.log({ data });
        props.handleChangeLogin();
        reset();
    };


    return (
        <div className='login'>
            <Dialog open={props.login} onClose={props.handleChangeLogin}>
                <DialogTitle style={{
                    textAlign: 'center',
                    color: 'rgb(25, 118, 210)',
                    fontSize: 22,
                    fontWeight: 'bold'
                }}>
                    ĐĂNG NHẬP
                </DialogTitle>
                <Divider />
                <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
                    <DialogContent
                        style={{ width: 500 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <h3 style={{ marginTop: 10 }}>Email:</h3>
                            </Grid>
                            <Grid item xs={9}>
                                <input type="text" {...register("email")} placeholder="Nhập e-mail của bạn" />
                                <p style={{ color: 'red' }}>{errors.email?.message}</p>
                            </Grid>

                            <Grid item xs={3}>
                                <h3 style={{ marginTop: 10 }}>Password:</h3>
                            </Grid>
                            <Grid item xs={9}>
                                <input type="password" {...register("password")} placeholder="Nhập password của bạn" />
                                <p style={{ color: 'red' }}>{errors.password?.message}</p>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={props.handleChangeLogin} variant="outlined">Hủy</Button>
                        <Button type="submit" variant="contained">Đăng Nhập</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );
}
