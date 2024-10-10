import { IPageReseponse } from "../../types/content"; // 페이지 응답 타입
import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
    pageResponse: IPageReseponse;
}

function Pagination({ pageResponse }: Props): ReactElement | null {

    const [query, setQuery] = useSearchParams();

    const currentPage = pageResponse.current; // 현재 페이지 번호
    const pageNumList = pageResponse.pageNumList; // 페이지 번호 리스트
    const hasPrev = pageResponse.prev;           // 이전 페이지 여부
    const hasNext = pageResponse.next;           // 다음 페이지 여부

    // 페이지 변경 함수
    const changePage = (pageNum: number) => {
        query.set("page", String(pageNum));
        setQuery(query);
    };

    const pageButtons = pageNumList.map((num) => (
        <li
            key={num}
            className={`px-2 md:px-3 py-1 text-sm md:text-base ${num === currentPage ? 
                "text-blue-500 border border-blue-500" : "text-blue-500 bg-white"} 
                rounded-md hover:bg-blue-600 hover:text-white cursor-pointer`}
            onClick={() => changePage(num)}
        >
            {num}
        </li>
    ));

    return (
        <div>
            <ul className="flex flex-wrap justify-center items-center space-x-2 mt-4 md:mt-6">
                {/* Prev 버튼 */}
                {hasPrev && (
                    <li
                        className="px-2 md:px-3 py-1 text-sm md:text-base text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer"
                        onClick={() => changePage(currentPage - 1)}
                    >
                        Prev
                    </li>
                )}

                {/* 페이지 번호 버튼 */}
                {pageButtons}

                {/* Next 버튼 */}
                {hasNext && (
                    <li
                        className="px-2 md:px-3 py-1 text-sm md:text-base text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer"
                        onClick={() => changePage(currentPage + 1)}
                    >
                        Next
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Pagination;
