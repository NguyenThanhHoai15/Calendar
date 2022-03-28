import Carousels from "../components/hotel/carousels";
import HomeSearch from "../components/hotel/homeSearch";
import QuiltedImageList from "../components/hotel/imageList";
import '../css/home.css'

export default function Home() {

    return (
        <div className="home">
            <div className="home__search">
                <div className="home-search__title">
                    <p style={{
                        fontWeight: 700,
                        fontSize: 48
                    }}
                    >Tìm chỗ nghĩ tiếp theo</p>
                    <p style={{
                        fontWeight: 400,
                        fontSize: 24,
                        marginTop: -25
                    }}>Tìm ưu đãi khách sạn, chỗ nghĩ dạng nhà và nhiều hơn nữa ...</p>
                </div>

                <div className="home-search__content">
                    <HomeSearch />
                </div>
            </div>

            <div className="home__body">
                <div className="home-body__carousel">
                    <Carousels />
                </div>

                <div className="home-body__imageList">
                    <QuiltedImageList />
                </div>
            </div>
        </div>
    )
}