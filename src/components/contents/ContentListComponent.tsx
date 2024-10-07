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
    const [searchTerm, setSearchTerm] = useState<string>("");

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const fetchContentList = async (page: number) => {
        setLoading(true);
        try {
            const data = await getContentList(page, size);
            setPageResponse((prev) => ({
                ...data,
                dtoList: [...prev.dtoList, ...data.dtoList]
            }));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContentList(page);
    }, [page]);

    const moveToRead = (pno: number | undefined) => {
        navigate({
            pathname: `/context/${pno}`,
            search: `?${queryStr}`,
        });
    };

    // 제목 검색 필터링
    const filteredList = pageResponse.dtoList.filter(content =>
        content.pname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const listLI = filteredList.map((content: IContent) => {
        const { pno, pname } = content;

        return (
            <div
                key={pno}
                onClick={() => moveToRead(pno)}
                className="relative border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer bg-white flex flex-col justify-end bg-cover bg-center"
                style={{
                    backgroundImage: `url(http://localhost:8091/api/products/view/${content.uploadFileNames[0]})`,
                    height: '280px', // 항목 높이 설정
                }}
            >
                {/* 어두운 오버레이 추가 */}
                <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>

                {/* 텍스트를 오버레이 위에 배치 */}
                <div
                    className="relative text-lg font-semibold text-white text-center z-10 bg-black bg-opacity-75 rounded-md p-2">
                    {pname}
                </div>

            </div>
        );
    });

    const fetchMoreContent = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {loading && <LoadingComponent/>}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Content List</h2>
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="제목 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-blue-500 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                </div>
            </div>


                <div className="grid grid-cols-5 gap-6">
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
                <InfiniteScrollComponent loading={loading} fetchMore={fetchMoreContent}/>
            </div>
            );
            }

            export default ContentListComponent;
