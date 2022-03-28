import Carousel from 'react-elastic-carousel';
import ActionAreaCard from './actionAreaCard';
const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 6 },
]
export default function Carousels() {

    const hotelTypes = [
        { title: 'Khách sạn', number: 845.451, image: 'https://t-cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=' },
        { title: 'Căn hộ', number: 762.368, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg' },
        { title: 'Resort', number: 17.560, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg' },
        { title: 'Biệt thự', number: 398.421, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg' },
        { title: 'Nhà gỗ', number: 32.685, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg' },
        { title: 'Nhà nghỉ thôn', number: 135.202, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_cottages/5e1fd9cd716f4825c6c7eac5abe692c52cc64516.jpg' },
        { title: 'Glamping', number: 10.617, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_glamping/6e181b9e942c160f4605239be7ddc1728cbcc4c8.jpg' },
        { title: 'Khách sạn căn hộ', number: 32.003, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_aparthotel/10e092f390b128dcff92727912299eef7824b751.jpg' },
        { title: 'Nhà nghỉ mát', number: 398.421, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-holidayhomes_300/604c7484d34a9e8791c2d5a0e2df4bc8c803dc7c.jpg' },
        { title: 'Nhà khách', number: 97.372, image: 'https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_guest_house/70618d86d515349ce56296a56d2eaaf283fd1542.jpg' },
    ];

    // console.log(hotelTypes)

    return (
        <div>
            <h1 style={{ marginLeft: 70 }}>Tìm theo loại chỗ nghỉ</h1>
            <Carousel breakPoints={breakPoints}>
                {hotelTypes.map((hotel) => <ActionAreaCard key={hotel.image} hotel={hotel} />)}
            </Carousel>
        </div>
    )
}