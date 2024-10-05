import { useEffect, useState } from "react";
import { IContent, IPageResponse } from "../../types/content.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getContentList } from "../../api/contentAPI.ts";

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
    const location = useLocation();
    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const fetchContentList = () => {
        setLoading(true);
        getContentList(page, size).then((data) => {
            console.log(data);
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 600);
        });
    };

    useEffect(() => {
        console.log("Fetching content list...");
        fetchContentList();
    }, [query, location.key]);

    const moveToRead = (pno: number | undefined) => {
        navigate({
            pathname: `/context/${pno}`,
            search: `?${queryStr}`,
        });
    };

    const listLI = pageResponse.dtoList.map((content: IContent) => {
        const { pno, pdesc, pname, price, keyword, uploadFileNames } = content;

        return (
            <li
                key={pno}
                onClick={() => moveToRead(pno)}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer bg-white"
            >
                <div className="text-lg font-semibold text-gray-800">{pname}</div>
                <div className="text-sm text-gray-600">{pdesc}</div>
                <div className="text-sm text-gray-600 mt-2">조회수: {price}</div>
                <div className="text-sm text-gray-600">타입 - 장르: {keyword}</div>

                <div className="flex flex-wrap mt-4">
                    {content.uploadFileNames.length > 0 ? (
                        content.uploadFileNames.map((fileName, index) => (
                            <div key={index} className="m-2">
                                <img
                                    src={`http://localhost:8091/api/products/view/${fileName}`}
                                    alt={fileName}
                                    className="w-24 h-24 object-cover rounded-md shadow-sm"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500">No files uploaded</div>
                    )}
                </div>

                <div className="mt-2">
                    {uploadFileNames && uploadFileNames.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {uploadFileNames.map((fileName, index) => (
                                <li key={index}>{fileName}</li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-sm text-gray-500">No uploaded file names</div>
                    )}
                </div>
            </li>
        );
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {loading && <LoadingComponent />}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Content List</h2>
            <ul className="space-y-4">
                {listLI}
            </ul>
        </div>
    );
}

export default ContentListComponent;
