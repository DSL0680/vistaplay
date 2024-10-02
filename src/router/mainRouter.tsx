import {createBrowserRouter} from "react-router-dom";
import {Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import ContentIndex from "../pages/contents/ContentIndex.tsx";
import ContentRouter from "./contentRouter..tsx";
import AdminRouter from "./adminRouter.tsx";

const Loading = <LoadingPage />



const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><ContentIndex /></Suspense>,
    },
    ContentRouter,
    AdminRouter,
])

export default mainRouter;