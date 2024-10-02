import { IContent, IPageReseponse } from "../../types/content.ts";
import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {deleteContentOne, getContentList} from "../../api/contentAPI.ts";
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";

const initialState: IPageReseponse = {
    dtoList: [],
    number: 0,
    pageNumList: [],
    size: 0,
    prev: false,
    next: false,
    totalPages: 0,
};

function AdminContentListComponent() {
    const [query] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);

    const [pageResponse, setPageResponse] = useState<IPageReseponse>(initialState);

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const fetchContentList = () => {
        setLoading(true);
        getContentList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    };

    useEffect(() => {
        fetchContentList();
    }, [query, location.key]);

    const moveToModify = (pno: number | undefined) => {
        navigate({
            pathname: `/admin/modify/${pno}`,
            search: `?${queryStr}`,
        });
    };

    const contentsTable = pageResponse.dtoList.length > 0 ? (
        pageResponse.dtoList.map((content: IContent) => {
            const { pno, pname, uploadFileNames } = content;

            const handleClickDelete = () => {
                setLoading(true);
                deleteContentOne(Number(pno)).then((data) => {
                    console.log(data.result);

                    fetchContentList();
                }).catch((error) => {
                    console.error("Error deleting content: ", error);
                    setLoading(false);
                });
            };

            return (
                <tr key={pno} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="border border-gray-300 px-4 py-2 w-2/12 text-center">
                        <img src={`http://localhost:8091/api/products/view/${uploadFileNames}`} alt={pname} className="w-32 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 w-6/12">{pname}</td>
                    <td className="border border-gray-300 px-4 py-2 w-2/12 text-center">
                        <div className="flex justify-center space-x-2">
                            {/*수정 버튼*/}
                            <button
                                onClick={() => moveToModify(pno)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors duration-200"
                            >
                                <PencilIcon className="h-5 w-4" />
                            </button>
                            {/*삭제 버튼*/}
                            <button
                                onClick={handleClickDelete}
                                className="bg-rose-400 hover:bg-rose-500 text-white px-2 py-1 rounded transition-colors duration-200"
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
            <div className="flex justify-center mt-10">
                <table className="table-auto border-collapse border border-gray-300 w-full text-left shadow-md">
                    <thead>
                    <tr className="bg-indigo-950 text-white">
                        <th className="border border-gray-400 px-4 py-3 w-2/12 text-center">대표이미지</th>
                        <th className="border border-gray-400 px-4 py-3 w-7/12">영화제목</th>
                        <th className="border border-gray-400 px-4 py-3 w-1/12 text-center">수정</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading && <span>Loading...</span>}
                    {contentsTable}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminContentListComponent;
