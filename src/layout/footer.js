import { Alert, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import '../css/footer.css'
import { useState } from 'react';

const schema = yup.object().shape({
    email: yup.string().email().required()
});

export default function Footer() {
    const [send, setSend] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        setSend(true);
        console.log(data);
        reset();
        setTimeout(() => {
            setSend(false);
        }, 3000);
    }


    console.log(send);
    return (
        <div className='footer'>
            {send ?
                <Stack style={{ position: 'absolute', marginLeft: -950, marginTop: -100 }} sx={{ width: '30%' }} spacing={2}>
                    <Alert onClose={() => { setSend(false) }}>sent successfully!</Alert>
                </Stack> :
                <></>}
            <div className='footer__title'>
                <h2>Tiết kiệm thời gian và tiền bạc!</h2>
                <p style={{ marginTop: -15 }}>Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn</p>
            </div>
            <div className='footer__content'>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <input type="text" {...register("email")} placeholder='Địa chỉ e-mail của bạn' required />
                    <Button style={{ height: 50, marginTop: -5 }} type="submit" variant="contained" color="success">Đăng ký</Button>
                    <p style={{ color: 'yellow', marginTop: -2 }}>{errors.email?.message}</p>
                </form>
            </div>
        </div >
    )
}