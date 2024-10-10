import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { IContent } from "../../types/content"
import useWishlist from "../../hooks/useWishlist.tsx"
import { getContentOne, getImageUrl } from "../../api/contentAPI"
import { clearWishlistRedux, removeFromWishlistRedux } from "../../slices/wishlistSlice.ts"

function WishListComponent() {
    const dispatch: AppDispatch = useDispatch()
    const { wishlist } = useSelector((state: RootState) => state.wishlist)
    const [contentList, setContentList] = useState<IContent[]>([]) // API로 가져온 콘텐츠 정보
    const { removeFromWishlistCookie, clearWishlistCookie } = useWishlist()

    // pno에 따라 콘텐츠 정보를 불러옴
    useEffect(() => {
        const fetchContent = async () => {
            const contents: IContent[] = []
            for (const pno of wishlist) {
                const content = await getContentOne(pno) // pno 사용
                contents.push(content)
            }
            setContentList(contents)
        }
        fetchContent()
    }, [wishlist])

    const handleRemoveClick = (pno: number) => {
        dispatch(removeFromWishlistRedux(pno)) // 항목 제거
        removeFromWishlistCookie(pno)
    }

    const handleClearWishlist = () => {
        dispatch(clearWishlistRedux()) // 전체 위시리스트 초기화
        clearWishlistCookie()
    }

    return (
        <div className="wishlist-items py-10 px-4 md:px-8 lg:px-12">
            <div className="wishlist-header flex justify-between items-center pb-6 border-b border-gray-600">
                <h2 className="text-3xl font-semibold text-white">내 찜목록</h2>
                {contentList.length > 0 && (
                    <button
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow-lg transition-all duration-200"
                        onClick={handleClearWishlist}
                    >
                        전체 삭제
                    </button>
                )}
            </div>

            {contentList.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">찜한 항목이 없습니다.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {contentList.map((content) => (
                        <div
                            key={content.pno}
                            className="wishlist-item bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative group"
                        >
                            <Link to={`/context/${content.pno}`} className="block relative">
                                <img
                                    src={`${getImageUrl(`s_${content.uploadFileNames[0]}`)}`}
                                    alt={content.pname}
                                    className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-100 group-hover:text-yellow-500 transition-colors duration-300">
                                    {content.pname}
                                </h3>
                            </div>
                            <button
                                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                                onClick={() => handleRemoveClick(content.pno)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default WishListComponent
