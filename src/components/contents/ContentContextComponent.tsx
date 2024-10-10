import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IContent} from "../../types/content.ts";
import {getContentOne} from "../../api/contentAPI.ts";
import {EyeIcon, HeartIcon, PlayIcon, PlusIcon} from '@heroicons/react/solid';
import {postWatch} from "../../api/watchListAPI.ts";
import {IWatch} from "../../types/watch.ts";
import useWishlist from '../../hooks/useWishlist' // 커스텀 훅 import

const contentInit: IContent = {
    pno: 0,
    del_flag: false,
    pdesc: '',
    pname: '',
    price: 0,
    keyword: '',
    uploadFileNames: [],
}

const watchInit: IWatch = {
    tno: 0,
    dueData: '',
    title: '',
    writer: '',
}

function ContentContextComponent() {

    const {pno} = useParams()

    const [content, setContent] = useState<IContent>(contentInit)
    const [watch, setWatch] = useState<IWatch>({...watchInit})

    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
    const [isWishDuplicate, setIsWishDuplicate] = useState<boolean>(false);
    const [isWatchAdd, setIsWatchAdd] = useState<boolean>(false);

    const { addToWishlistCookie } = useWishlist() // useWishlist 훅 사용

    // dueDate용 날짜 데이터
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {

        const pnoNum = Number(pno)
        setLoading(true);
        getContentOne(pnoNum).then(result => {
            setContent(result);
            setWatch({
                dueDate: formattedDate,
                title: result.pname,
                writer: result.pno.toString()
            });
            setLoading(false);
        })

    }, [pno]);

    const pdesc = content.pdesc.split(',');
    const keyword = content.keyword.split(',');
    const gangre = keyword.slice(1).join(', ');

    // 예고편 재생
    const openVideo = () => {
        setIsVideoOpen(true)
    }
    const closeVideo = () => {
        setIsVideoOpen(false)
    }

    // 재생목록 추가
    const addWatch = () => {
        setLoading(true)
        postWatch(watch).then((mno: number) => {
            setResult(mno + "등록 완료")
            setIsWatchAdd(true);
            setLoading(false);
        })
    }

    // 찜하기 버튼 클릭 핸들러
    const handleWishlistClick = () => {
        addToWishlistCookie(content.pno) // 위시리스트에 콘텐츠 추가
    }



    return (
        <>

            <div className="relative w-full h-screen bg-[#191b2a] text-white">
                <div className="absolute right-0 w-[70%] h-full">
                    {/* 배경 이미지 */}
                    <div
                        className="w-full h-full bg-cover bg-no-repeat"
                        style={{
                            backgroundImage: `url(http://localhost:8091/api/products/view/${content.uploadFileNames[0]})`,
                            backgroundPosition: 'top right',
                        }}
                    >
                        <div className="w-full h-full bg-gradient-to-l from-transparent to-[#191b2a]"></div>
                    </div>
                </div>

                {/* 콘텐츠 섹션 */}
                <div
                    className="relative z-10 h-full flex flex-col md:flex-row justify-between p-6 lg:pl-8 lg:pr-8 max-w-7xl mx-auto">
                    {/* 왼쪽 콘텐츠 */}
                    <div className="flex flex-col justify-start md:w-2/3 space-y-4 mt-10">
                        <div className="flex items-center w-16 h-6 bg-white/20 justify-center rounded-md">
                            <EyeIcon className="w-4 h-4 mr-2 text-gray-200"/>
                            <span className="text-xs">{content.price}</span>

                        </div>
                        <h1 className="text-5xl font-bold text-gray-200">{content.pname}</h1>
                        <div className="text-sm text-gray-400">
                            {keyword[0]} | {gangre}
                        </div>
                        <div className="text-xs text-gray-400 md:w-1/2">
                            {pdesc[0]}
                        </div>
                        <div className="flex items-center space-x-4 pt-4">
                            <button
                                onClick={openVideo}
                                className="flex items-center rounded-lg mr-14">
                                <PlayIcon className="h-20 w-20 mr-2 text-gray-200"/>
                                <span className="text-lg text-gray-300">예고편 재생</span>
                            </button>
                            <button
                                onClick={addWatch}
                                className="flex flex-col items-center text-white rounded-lg">
                                <PlusIcon className="h-8 w-8 mb-1 text-gray-200"/>
                                <div className="text-sm text-gray-400">재생목록 추가</div>
                            </button>
                            <button
                                onClick={handleWishlistClick}
                                className="flex flex-col items-center text-white rounded-lg">
                                <HeartIcon className="h-8 w-8 mb-1 text-gray-200"/>
                                <div className="text-sm text-gray-400">찜하기</div>
                            </button>
                        </div>

                        {/* 이미지 목록 */}
                        <div className="flex flex-wrap gap-2 mt-4 ml-2">
                            {content.uploadFileNames.slice(1).map((fileName, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8091/api/products/view/${fileName}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* 우측 포스터 이미지 */}
                    <div className="hidden md:block md:w-1/4 h-auto mt-10">
                        <img
                            className="w-full h-auto object-cover rounded-lg"
                            src={`http://localhost:8091/api/products/view/${content.uploadFileNames[0]}`}
                            alt={content.pname}
                        />
                    </div>
                </div>
            </div>
            {/* 예고편 모달 */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <div className="relative bg-gray-950 text-white rounded-lg w-full max-w-3xl overflow-hidden">
                        <button
                            onClick={closeVideo}
                            className="text-2xl absolute top-1 right-3 text-gray-300 hover:text-white"
                        >
                            <span className="sr-only">Close</span>
                            &#x2715;
                        </button>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe width="100%" height="450"
                                    src={pdesc[1]}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* 찜하기 중복 시 모달 */}
            {isWishDuplicate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">이미 추가된 항목</h2>
                        <p className="mb-6">이미 찜 목록에 있는 항목입니다.</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsWishDuplicate(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 재생목록 추가 후 모달 */}
            {isWatchAdd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black rounded-lg p-8 shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">재생목록 추가</h2>
                        <p className="mb-6">성공적으로 재생목록에 추가되었습니다.</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsWatchAdd(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}

export default ContentContextComponent;