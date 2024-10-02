import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";

import contentRouter from "./router/contentRouter..tsx";

createRoot(document.getElementById('root')!).render(

    <RouterProvider router={contentRouter}/>
)
