import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>

const AdminIndex = lazy(() => import("../pages/admin/AdminIndex.tsx"))
const AdminContentList = lazy(() => import('../pages/admin/AdminContentListPage.tsx'))
const AdminContentAdd = lazy(() => import('../pages/admin/AdminContentAddPage.tsx'))
const AdminContentModify = lazy(() => import('../pages/admin/AdminContentModifyPage.tsx'))
const AdminChart = lazy(() => import('../pages/admin/AdminChartPage.tsx'))

const adminRouter = {
    path: "/admin",
    element: <Suspense fallback={Loading}><AdminIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><AdminContentList/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><AdminContentAdd/></Suspense>
        },
        {
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><AdminContentModify/></Suspense>
        },
        {
            path: "chart",
            element: <Suspense fallback={Loading}><AdminChart/></Suspense>
        }
    ]
}
export default adminRouter
