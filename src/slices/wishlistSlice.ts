import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// pno 값만 저장
interface WishlistState {
    wishlist: number[] // pno 값만 저장
}

const initialState: WishlistState = {
    wishlist: [], // 초기 상태
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // pno 추가 (중복 체크)
        addToWishlistRedux: (state, action: PayloadAction<number>) => {
            const pno = action.payload
            if (!state.wishlist.includes(pno)) {
                state.wishlist.push(pno) // 중복되지 않으면 추가
                console.log("현재 wishlist에 저장된 pno 값들:", pno)
            }else{
                console.log("값이 중복됨")
            }
        },
        // pno 제거
        removeFromWishlistRedux: (state, action: PayloadAction<number>) => {
            state.wishlist = state.wishlist.filter(pno => pno !== action.payload)
        },
        // 전체 삭제
        clearWishlistRedux: (state) => {
            state.wishlist = []
        },
    },
})

// 액션과 리듀서 export
export const { addToWishlistRedux, removeFromWishlistRedux, clearWishlistRedux } = wishlistSlice.actions
export default wishlistSlice.reducer
