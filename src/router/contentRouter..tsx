import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import {createBrowserRouter} from "react-router-dom";
import AdminRouter from "./adminRouter.tsx";

const Loading = <LoadingPage></LoadingPage>


const ContentIndex = lazy(() => import("../pages/contents/ContentIndex.tsx"))
const ContentList = lazy(() => import("../pages/contents/ContentListPage.tsx"))
const ContentContext = lazy(() => import("../pages/contents/ContentContextPage.tsx"))
const WatchList = lazy(() => import("../pages/contents/WatchListPage.tsx"))
const WishList = lazy(() => import("../pages/contents/WishListPage.tsx"))

const contentRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><ContentIndex/></Suspense>,
        children: [
            {
                path: "list",
                element: <Suspense fallback={Loading}><ContentList/></Suspense>
            },
            {
                path: "context",
                element: <Suspense fallback={Loading}><ContentContext/></Suspense>
            },
            {
                path: "watch",
                element: <Suspense fallback={Loading}><WatchList/></Suspense>
            },
            {
                path: "wish",
                element: <Suspense fallback={Loading}><WishList/></Suspense>
            },
        ]
    },

    AdminRouter
])
export default contentRouter