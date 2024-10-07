import { IContent, IPageResponse } from "../../types/content.ts";
import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {deleteContentOne, getContentList} from "../../api/contentAPI.ts";
import {PencilIcon, SearchIcon, TrashIcon, XIcon} from "@heroicons/react/solid";
import PageComponent from "../common/PageComponent.tsx";

const initialState: IPageResponse = {
    dtoList: [],
    number: 0,
    pageNumList: [],
    size: 0,
    prev: false,
    next: false,
    totalPages: 0,
    current: 0,
    keyword: '',
};

function AdminContentListComponent() {
    const [query, setQuery] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;
    const keyword: string = query.get("keyword") || "";

    const [loading, setLoading] = useState<boolean>(false);

    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);

    const queryStr = createSearchParams({ page: String(page), size: String(size), keyword: keyword });

    const [search, setSearch] = useState(keyword);
    const [filterdContent, setFilterdContent] = useState<IContent[]>([]);

    // 데이터 가져오기
    const fetchContentList = () => {
        setLoading(true);
        getContentList(page, size, keyword).then((data) => {
            setPageResponse(data);
            setFilterdContent(data.dtoList)
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    };

    useEffect(() => {
        fetchContentList();
    }, [query, location.key]);

    // 검색 처리
    const handleSearchClick = () => {
        if (search.trim() === '') {
            setFilterdContent(pageResponse.dtoList);
        } else {
            setFilterdContent(
                pageResponse.dtoList.filter(content =>
                    content.pname.toLowerCase().includes(search.toLowerCase())
                )
            );
            setQuery({
                page: "1", // 검색 시 첫 페이지로 이동
                size: String(size),
                keyword: search.trim(),
            });
        }
    }

    // 검색창 초기화
    const handleClearSearch = () => {
        setSearch('');
        setFilterdContent(pageResponse.dtoList);
        setQuery({
            page: "1", // 검색 초기화 시 첫 페이지로 이동
            size: String(size),
        });
    };

    // 수정 버튼 클릭 시 modify 페이지로 이동
    const moveToModify = (pno: number | undefined) => {
        navigate({
            pathname: `/admin/modify/${pno}`,
            search: `?${queryStr}`,
        });
    };

    // 등록 버튼 클릭 시 add 페이지로 이동
    const moveToAdd = () => {
        navigate({
            pathname: "/admin/add"
        });
    };

    const contentsTable = filterdContent.length > 0 ? (
        filterdContent.map((content: IContent) => {
            const { pno, pname, uploadFileNames } = content;

            // 컨텐츠 삭제
            const handleClickDelete = () => {
                setLoading(true);
                deleteContentOne(Number(pno)).then((data) => {
                    console.log(data.result);

                    fetchContentList();
                })
            };

            return (
                <tr key={pno} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="border border-gray-200 px-4 py-2 w-2/12 text-center">
                        <img src={`http://localhost:8091/api/products/view/${uploadFileNames}`} alt={pname}
                             className="w-16 mx-auto"/>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 w-6/12">{pname}</td>
                    <td className="border border-gray-200 px-4 py-2 w-2/12 text-center">
                        <div className="flex justify-center space-x-2">
                            {/*수정 버튼*/}
                            <button
                                onClick={() => moveToModify(pno)}
                                className="bg-white text-blue-400 hover:bg-blue-400 hover:text-white px-2 py-1 rounded transition-colors duration-200"
                            >
                                <PencilIcon className="h-5 w-4" />
                            </button>
                            {/*삭제 버튼*/}
                            <button
                                onClick={handleClickDelete}
                                className="bg-white text-rose-400 hover:bg-rose-400 hover:text-white px-2 py-1 rounded transition-colors duration-200"
                            >
                                <TrashIcon className="h-5 w-4" />
                            </button>
                        </div>
                    </td>
                </tr>
            );
        })
    ) : (
        <tr>
            <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center">
                데이터가 없습니다.
            </td>
        </tr>
    );

    return (
        <>
            {/* 검색창 */}
            <div className="flex items-center mt-10 mb-3">
                <div className="flex items-center">
                    <div className="relative w-64 mr-2">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="w-full px-4 py-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent pr-10"
                            placeholder="검색어를 입력하세요"
                        />
                        <XIcon
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                        />
                    </div>
                    <button
                        onClick={handleSearchClick}
                        className="px-2 py-2 bg-gray-300 text-white rounded-3xl hover:bg-blue-400 focus:outline-none text-sm"
                    >
                        <SearchIcon className="h-5 w-5"/>
                    </button>
                </div>

                {/* 등록 버튼 */}
                <button
                    onClick={moveToAdd}
                    className="ml-auto px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    등록
                </button>
            </div>
            <div className="flex justify-center">
                {/* 테이블 */}
                <table className="table-auto border-collapse border border-gray-300 w-full text-left shadow-md">
                    <thead>
                    <tr className="bg-gray-200 text-gray-800">
                        <th className="border border-t-gray-200 border-l-gray-200 border-r-white px-4 py-3 w-2/12 text-center">대표이미지</th>
                        <th className="border border-t-gray-200 border-r-white px-4 py-3 w-7/12">영화제목</th>
                        <th className="border border-t-gray-200 border-r-gray-200 px-4 py-3 w-1/12 text-center">수정</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ?
                        <>
                            <tr>
                                <td colSpan={3} className="p-4 text-gray-600 text-center">
                                    Loading.....
                                </td>
                            </tr>
                        </>

                        :
                        <>
                            {contentsTable}
                        </>


                    }
                    </tbody>
                </table>
            </div>

            <PageComponent pageResponse={pageResponse} />
        </>
    );
}

export default AdminContentListComponent;
