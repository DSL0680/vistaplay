import {IContent, IPageReseponse} from "../../types/content.ts";
import {useEffect, useState} from "react";
import {createSearchParams, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {getContentList} from "../../api/contentAPI.ts";
import {data} from "autoprefixer";

const initialState:IPageReseponse = {
    dtoList: [],
    number: 0,
    pageNumList: [],
    size: 0,
    prev: false,
    next: false,
    totalPages: 0,
}

function AdminContentListComponent() {

    const [query] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10

    const [loading, setLoading] = useState<boolean>(false)

    const [pageResponse, setPageResponse] = useState<IPageReseponse>(initialState);

    const queryStr = createSearchParams({page:String(page),size:String(size)})

    useEffect(() => {
        setLoading(true)
        getContentList(page, size).then(data => {
            setPageResponse(data);
            setTimeout(()=> {
                setLoading(false)
            }, 300)
        });
    }, [query, location.key])

    const moveToModify = (pno: number | undefined) => {
        navigate({
            pathname: `/admin/modify/${pno}`,
            search: `?${queryStr}`
        })
    }

    const contentsTable = pageResponse.dtoList.map((content: IContent) => {

    })

    return (
        <></>
    );
}

export default AdminContentListComponent;