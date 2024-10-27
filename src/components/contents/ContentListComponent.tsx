import { useEffect, useState, useRef } from "react";
import { IContent, IPageResponse } from "../../types/content.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getContentList } from "../../api/contentAPI.ts";
import InfiniteScrollComponent from "./InfiniteScrollComponent.tsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlayIcon
} from "@heroicons/react/solid";

const initialState: IPageResponse = {
    dtoList: [],
    number: 0,
    pageNumList: [],
    size: 0,
    prev: false,
    next: false,
    totalPages: 0,
    current: 0,
    keyword: ''
};

function ContentListComponent() {
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState(initialState);
    const [recentContents, setRecentContents] = useState<IContent[]>([]);
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [hasMore, setHasMore] = useState(true);

    // @ts-ignore
    const swiperRef = useRef<Swiper | null>(null);

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const fetchContentList = async (page: number) => {
        setLoading(true);
        try {
            const data = await getContentList(page, size);

            // 기존 데이터를 유지하면서 새로 불러온 데이터를 추가
            setPageResponse((prev) => ({
                ...data,
                dtoList: [...prev.dtoList, ...data.dtoList]
            }));

            // 페이지가 1일 경우, 최근 콘텐츠 목록을 설정
            if (page === 1) {
                const newContents = data.dtoList.slice(0, 5);
                setRecentContents(newContents);
            }

            // 가져온 데이터의 길이가 size보다 작다면 더 이상 불러올 데이터가 없음
            if (data.dtoList.length < size) {
                setHasMore(false);  // 더 이상 불러올 데이터가 없음을 설정
            }
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchContentList(page);
    }, [page]);

    const moveToRead = (pno: number | undefined) => {
        navigate({
            pathname: `/context/${pno}`,
            search: `?${queryStr}`,
        });
    };

    const filteredList = pageResponse.dtoList.filter(content =>
        content.pname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const listLI = filteredList.map((content: IContent) => {
        const { pno, pname } = content;

        return (
            <div
                key={pno}
                onClick={() => moveToRead(pno)}
                className="group hover:scale-125 hover:z-30 hover:border transition-transform transform-gpu duration-300 cursor-pointer hover:bg-white hover:shadow-lg hover:rounded-md overflow-hidden flex flex-col items-center"
                style={{
                    width: '100%',
                    maxWidth: '300px',
                }}
            >
                {/* 이미지 배경 */}
                <div
                    className="relative w-full h-32 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(http://localhost:8091/api/products/view/${content.uploadFileNames[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                    }}
                >
                    {/* 오버레이 */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-40 z-10 transition-opacity duration-300 hover:bg-opacity-20"
                    ></div>
                    <div className="absolute flex text-white hidden group-hover:block group-hover:z-20 bottom-1 right-1">
                        <PlayIcon className="h-10 w-10"/>
                    </div>
                </div>

                {/* 이미지 아래 텍스트 박스 */}
                <div
                    className="group-hover:pl-2 pb-4 mt-2 text-gray-900 text-md group-hover:font-semibold w-full"
                >
                    {pname}
                </div>
            </div>


        );
    });

    const fetchMoreContent = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            {loading && <LoadingComponent/>}

            <div className="relative w-full h-500 bg-[#191b2a] text-white">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 1,
                        }
                    }}
                    className="relative"
                >
                    {recentContents.slice(0, 5).map((content) => (
                        <SwiperSlide key={content.pno}>
                            <div
                                onClick={() => moveToRead(content.pno)}
                                className="relative h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `linear-gradient(to left, transparent, #191b2a), url(http://localhost:8091/api/products/view/${content.uploadFileNames[0]})`,
                                    backgroundSize: '70%',
                                    backgroundPosition: 'right top',
                                    backgroundRepeat: 'no-repeat',
                                    height: '500px',
                                    width: '100%',
                                }}
                            >
                                <div className="w-[80vw] mx-auto h-full relative pt-40">
                                    <div className="text-white text-5xl font-bold p-2 max-w-[40%]">
                                        {content.pname}
                                    </div>
                                    <button
                                        className="mt-10 rounded-md bg-white text-gray-900 text-lg flex items-center py-2 px-3 font-bold hover:bg-gray-300">
                                        보러가기
                                        <ChevronRightIcon className="w-6 h-6 ml-1"/>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* 좌우 버튼 */}
                <div
                    className="absolute top-1/2 left-0 w-full flex justify-between px-6 transform -translate-y-1/2 z-10">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="flex items-center justify-center w-16 h-16 bg-black bg-opacity-20 text-white rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none transition-transform transform hover:scale-110"
                    >
                        <ChevronLeftIcon className="h-10 w-10"/>
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="flex items-center justify-center w-16 h-16 bg-black bg-opacity-20 text-white rounded-full shadow-lg hover:bg-opacity-75 focus:outline-none transition-transform transform hover:scale-110"
                    >
                        <ChevronRightIcon className="h-10 w-10"/>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between w-[80%] mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-800">전체</h2>
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="제목 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-blue-500 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                </div>
            </div>

            <div className="grid grid-cols-5 gap-6 w-[80%] mx-auto">
                {listLI}
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={fetchMoreContent}
                    className="py-4 bg-gray-200 text-gray-900 w-full"
                >
                    더보기
                    <ChevronDownIcon className="w-4 h-4 mx-auto pt-1" />
                </button>
            </div>
            <InfiniteScrollComponent loading={loading} fetchMore={fetchMoreContent} hasMore={hasMore}/>
        </div>

    );
}

export default ContentListComponent;
