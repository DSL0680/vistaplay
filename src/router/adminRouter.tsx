import {Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>

const adminRouter = {
    path: "/admin",
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}></Suspense>
        },
        {
            path: "modify/:pno",
            element: <Suspense fallback={Loading}></Suspense>
        },
        {
            path: "chart",
            element: <Suspense fallback={Loading}></Suspense>
        }
    ]
}
export default adminRouter
