import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store' // Redux 스토어 및 persistor import
import contentRouter from './router/contentRouter'
import { PersistGate } from 'redux-persist/integration/react' // redux-persist와 관련된 설정

createRoot(document.getElementById('root')!).render(
    <Provider store={store}> {/* Redux 스토어 제공 */}
        <PersistGate loading={null} persistor={persistor}> {/* 상태 복원 시 로딩 처리 */}
            <RouterProvider router={contentRouter} /> {/* 라우터 적용 */}
        </PersistGate>
    </Provider>
)
