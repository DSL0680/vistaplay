import {lazy, Suspense} from "react";
import LoadingPage from "../../LoadingPage.tsx";
import {createBrowserRouter} from "react-router-dom";
import AdminRouter from "./adminRouter.tsx";

const Loading = <LoadingPage></LoadingPage>


const ContentIndex = lazy(() => import("../ContentIndex.tsx"))
const ContentList = lazy(() => import("../ContentListPage.tsx"))
const ContentContext = lazy(() => import("../ContentContextPage.tsx"))
const WatchList = lazy(() => import("../WatchListPage.tsx"))
const WishList = lazy(() => import("../WishListPage.tsx"))

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