import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IContent } from '../../types/content.ts'
import {getContentOne, getImageUrl} from '../../api/contentAPI.ts'
import { HeartIcon, PlayIcon, PlusIcon } from '@heroicons/react/solid'
import useWishlist from '../../hooks/useWishlist' // 커스텀 훅 import

const initialState: IContent = {
    pno: 0,
    pname: '',
    price: 0, // 조회수 필드 (수정 불가)
    pdesc: '',
    keyword: '',
    files: [],
    uploadFileNames: [], // 파일 이름 필드
    del_flag: false,
}

function ContentContextComponent() {
    const { pno } = useParams()
    const [content, setContent] = useState<IContent>(initialState)
    const [loading, setLoading] = useState<boolean>(false)
    const { addToWishlistCookie } = useWishlist() // useWishlist 훅 사용

    useEffect(() => {
        const pnoNum = Number(pno) // 임시 pno
        setLoading(true)
        getContentOne(pnoNum).then((result) => {
            setContent(result)
            setLoading(false)
        })
    }, [pno])

    const pdesc = content.pdesc.split(',')
    const keyword = content.keyword.split(',')
    const genre = keyword.slice(1).join(', ')

    // 찜하기 버튼 클릭 핸들러
    const handleWishlistClick = () => {
        addToWishlistCookie(content.pno) // 위시리스트에 콘텐츠 추가
    }

    return (
        <>
            <div className="relative w-full h-screen bg-[#191b2a] text-white">
                {/* 자식 div: 70% 영역에 배경 이미지와 그라데이션 적용 */}
                <div className="absolute right-0 w-[70%] h-full">
                    {/* 배경 이미지 */}
                    <div
                        className="w-full h-full bg-cover bg-no-repeat"
                        style={{
                            backgroundImage: `url(${getImageUrl(content.uploadFileNames[0])})`,
                            backgroundPosition: 'top right',
                        }}
                    >
                        {/* 그라데이션 위에 덮어씌우기 */}
                        <div className="w-full h-full bg-gradient-to-l from-transparent to-[#191b2a]"></div>
                    </div>
                </div>

                {/* 콘텐츠 섹션 */}
                <div className="relative z-10 h-full flex flex-col md:flex-row justify-between p-6 lg:pl-8 lg:pr-8 max-w-7xl mx-auto">
                    {/* 왼쪽 콘텐츠 */}
                    <div className="flex flex-col justify-start md:w-2/3 space-y-4 mt-32">
                        <h1 className="text-5xl font-bold text-gray-200">{content.pname}</h1>
                        <div className="text-sm text-gray-400">
                            {keyword[0]} | {genre}
                        </div>
                        <div className="text-xs text-gray-400 md:w-1/2">
                            {pdesc[0]}
                        </div>
                        <div className="flex items-center space-x-4 pt-4">
                            <button className="flex items-center rounded-lg mr-14">
                                <PlayIcon className="h-20 w-20 mr-2 text-gray-200" />
                                <span className="text-lg text-gray-300">예고편 재생</span>
                            </button>
                            <button className="flex flex-col items-center text-white rounded-lg">
                                <PlusIcon className="h-8 w-8 mb-1 text-gray-200" />
                                <div className="text-sm text-gray-400">재생목록 추가</div>
                            </button>
                            <button
                                className="flex flex-col items-center text-white rounded-lg"
                                onClick={handleWishlistClick} // 찜하기 클릭 핸들러 연결
                            >
                                <HeartIcon className="h-8 w-8 mb-1 text-gray-200" />
                                <div className="text-sm text-gray-400">찜하기</div>
                            </button>
                        </div>
                    </div>

                    {/* 오른쪽 작은 이미지 */}
                    <div className="hidden md:block md:w-1/4 h-auto mt-10">
                        <img
                            className="w-full h-auto object-cover rounded-lg"
                            src={`${getImageUrl(content.uploadFileNames[0])}`}
                            alt={content.pname}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentContextComponent