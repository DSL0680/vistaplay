import {Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>

const contentRouter = {
    path: "/contents",
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}></Suspense>
        },
        {
            path: "context",
            element: <Suspense fallback={Loading}></Suspense>
        },
        {
            path: "watch",
            element: <Suspense fallback={Loading}></Suspense>
        },
        {
            path: "wish",
            element: <Suspense fallback={Loading}></Suspense>
        },
    ]
}
export default contentRouter