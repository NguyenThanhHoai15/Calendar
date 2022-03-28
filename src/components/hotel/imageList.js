import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const srcset = (image, size, rows = 1, cols = 1) => {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function QuiltedImageList() {
    return (
        <ImageList
            sx={{ width: '100%', height: 400 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {itemData.map((item, index) => (
                <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1} onClick={() => console.log(item)}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                    <h2 style={{ position: 'absolute', top: 8, left: 16, color: 'white' }}>{item.title}</h2>
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: 'https://o.rada.vn/data/image/2020/05/19/ta-canh-bien-vung-tau.jpg',
        title: 'Vũng tàu',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://statics.vntrip.vn/data-v2/data-guide/img_content/1462760305_canh-dep-tu-dinh-nui-nha-trang-2.jpg',
        title: 'Nha Trang',
    },
    {
        img: 'http://divui.com/blog/wp-content/uploads/2018/10/111111.jpg',
        title: 'Đà Nẵng',
    },
    {
        img: 'https://quynhonme.vn/wp-content/uploads/2019/12/phong-canh-phu-yen-co-gi.jpg',
        title: 'Phú Yên',
        cols: 2,
    },
    {
        img: 'https://sayhi.vn/blog/wp-content/uploads/2020/09/C%C3%B9-Lao-C%C3%A2u-b%C3%ACnh-thu%E1%BA%ADn-min.jpg',
        title: 'Bình Thuận',
        cols: 2,
    },
    {
        img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/01/3-22.png',
        title: 'Phú Quốc',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbLswoUO58iG5tujBEhwBJpDpaAgqXwVZt09sEuakIWjWx_R7e98PN0WQi3xE0THwQ_70&usqp=CAU',
        title: 'Hà Nội',
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQLyPkdmbzxgeMeU1AHLIuMNa30ZSfFbYg80RixYc6wLdpt2_w7--VAKm3X1pjKUvFGQ&usqp=CAU',
        title: 'Sapa',
    },
    {
        img: 'https://bcp.cdnchinhphu.vn/Uploaded_VGP/buikieulien/20170709/TPHCM.jpg',
        title: 'Hồ Chí Minh',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://bcp.cdnchinhphu.vn/Uploaded_VGP/buikieulien/20170709/TPHCM.jpg',
        title: 'Hạ Long',
    },
    {
        img: 'https://dulichkhampha24.com/wp-content/uploads/2020/08/dai-diem-du-lich-hue.jpg',
        title: 'Huế',
    },
    {
        img: 'https://danangaz.com/wp-content/uploads/2019/07/khu-du-l%E1%BB%8Bch-long-%C4%91i%E1%BB%81n-min.jpg',
        title: 'Tây Ninh',
        cols: 2,
    },
];
