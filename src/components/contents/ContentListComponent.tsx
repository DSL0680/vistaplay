import { useEffect, useState } from "react";
import { IContent, IPageResponse } from "../../types/content.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getContentList } from "../../api/contentAPI.ts";
import InfiniteScrollComponent from "./InfiniteScrollComponent.tsx";

const initialState: IPageResponse = {
    dtoList: [],
    number: 0,
    pageNumList: [],
    size: 0,
    prev: false,
    next: false,
    totalPages: 0,
};

function ContentListComponent() {
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState(initialState);
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const fetchContentList = async (page: number) => {
        setLoading(true);
        try {
            const data = await getContentList(page, size);
            setPageResponse((prev) => ({
                ...data,
                dtoList: [...prev.dtoList, ...data.dtoList],  // 이전 데이터에 새 데이터를 추가
            }));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContentList(page);  // 페이지가 변경될 때마다 새로운 콘텐츠를 가져옴
    }, [page]);

    const moveToRead = (pno: number | undefined) => {
        navigate({
            pathname: `/context/${pno}`,
            search: `?${queryStr}`,
        });
    };

    const listLI = pageResponse.dtoList.map((content: IContent) => {
        const { pno, pname, price } = content;

        return (
            <div
                key={pno}
                onClick={() => moveToRead(pno)}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer bg-white flex flex-col justify-between"
            >

                <div className="flex justify-center items-center mb-4">
                    <img
                        src={`http://localhost:8091/api/products/view/${content.uploadFileNames[0]}`}
                        alt={pname}
                        className="w-24 h-24 object-cover rounded-md"
                    />
                </div>
                <div className="text-lg font-semibold text-center">{pname}</div>
                <div className="text-center text-sm text-gray-600 mt-2">조회수: {price}</div>
            </div>
        );
    });

    const fetchMoreContent = () => {
        setPage((prev) => prev + 1);  // 페이지 증가
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {loading && <LoadingComponent />}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Content List</h2>
            <div className="grid grid-cols-5 gap-4">
                {listLI}
            </div>
            <div className="text-center mt-6">
                <button
                    onClick={fetchMoreContent}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                    더보기
                </button>
            </div>
            <InfiniteScrollComponent loading={loading} fetchMore={fetchMoreContent} />
        </div>
    );
}

export default ContentListComponent;
