import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session' // sessionStorage 사용
import wishlistReducer from './slices/wishlistSlice' // 위시리스트 리듀서

// persist 설정
const persistConfig = {
    key: 'wishlist', // 저장할 키
    storage: storageSession, // sessionStorage 사용
    whitelist: ['wishlist'], // 저장할 리듀서 지정 (여기서는 wishlist만)
}

// wishlist 리듀서를 persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, wishlistReducer)

// 스토어 생성
export const store = configureStore({
    reducer: {
        wishlist: persistedReducer, // 세션 스토리지에 저장되는 reducer 사용
    },
})

// persistor 생성
export const persistor = persistStore(store)
// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState> // 스토어의 전체 상태 타입을 자동으로 추론
export type AppDispatch = typeof store.dispatch // dispatch 입 추론