import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addToWishlistRedux} from '../slices/wishlistSlice'

function useWishlist() {
    const [cookies, setCookie, removeCookie] = useCookies(['wishlist'])
    const dispatch = useDispatch()
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlist)

    // 쿠키에서 'wishlist' 값 확인 및 상태 설정
    useEffect(() => {
        const cookieValue = cookies.wishlist
        if (typeof cookieValue === 'string') {
            const wishlistFromCookies = cookieValue.split(',').map(Number)
            wishlistFromCookies.forEach(pno => {
                if (!wishlist.includes(pno)) {
                    dispatch(addToWishlistRedux(pno))
                }
            })
        }
    }, [cookies.wishlist, dispatch, wishlist])

    // 위시리스트에 pno 추가
    const addToWishlistCookie = (pno: number) => {
        if (!wishlist.includes(pno)) {
            dispatch(addToWishlistRedux(pno))
            const updatedWishlist = [...wishlist, pno]
            setCookie('wishlist', updatedWishlist, { path: '/', maxAge: 3600 }) // 쿠키에 1시간 유지
        }
    }

    // 위시리스트에서 pno 제거
    const removeFromWishlistCookie = (pno: number) => {

        const updatedWishlist = wishlist.filter((id) => id !== pno)
        setCookie('wishlist', updatedWishlist, { path: '/', maxAge: 3600 }) // 쿠키에 1시간 유지
    }

    // 위시리스트 전체 삭제
    const clearWishlistCookie = () => {

        removeCookie('wishlist', { path: '/' })
    }

    return { wishlist, addToWishlistCookie, removeFromWishlistCookie, clearWishlistCookie }
}

export default useWishlist
