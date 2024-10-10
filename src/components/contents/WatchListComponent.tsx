import { useEffect, useState } from "react";
import { getWatchList, putWatch, deleteWatch } from "../../api/watchListAPI.ts"; // deleteWatch 추가
import { getContentList } from "../../api/contentAPI.ts";
import { IPageResponse } from "../../types/content.ts";
import { IWatch } from "../../types/watch.ts";
import { CheckIcon, TrashIcon } from "@heroicons/react/solid";

function WatchListComponent() {
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredContents, setFilteredContents] = useState<IPageResponse["dtoList"]>([]);
    const [watchList, setWatchList] = useState<IWatch[]>([]);
    const [filterType, setFilterType] = useState<string>("전체");

    const loadAllData = async () => {
        setLoading(true);

        // bad code
        const allWatchData = await getWatchList(1, 1000);
        const writerNumbers = allWatchData.dtoList.map((item) => Number(item.writer));

        setWatchList(allWatchData.dtoList); // 전체 Watch 리스트 저장

        // bad code
        const allContentData = await getContentList(1, 1000);
        const matchedContents = allContentData.dtoList.filter((content) =>
            writerNumbers.includes(content.pno)
        );

        setFilteredContents(matchedContents); // 필터링된 콘텐츠 저장
        setLoading(false);
    };

    const handleComplete = async (pno) => {
        const targetWatch = watchList.find((watch) => Number(watch.writer) === pno);

        if (targetWatch) {
            const updatedWatch = { ...targetWatch, complete: true };
            await putWatch(updatedWatch);

            setWatchList((prevList) =>
                prevList.map((watch) =>
                    Number(watch.writer) === pno ? { ...watch, complete: true } : watch
                )
            );
        }
    };

    const handleDelete = async (pno) => {
        const targetWatch = watchList.find((watch) => Number(watch.writer) === pno);

        if (targetWatch) {
            await deleteWatch(targetWatch.tno);

            // 삭제된 항목을 watchList에서 제거
            setWatchList((prevList) =>
                prevList.filter((watch) => Number(watch.writer) !== pno)
            );
            await loadAllData();
        }
    };

    const filterContents = () => {
        if (filterType === "전체") {
            return filteredContents;
        } else if (filterType === "시청중") {
            return filteredContents.filter(content => {
                const associatedWatch = watchList.find((watch) =>
                    Number(watch.writer) === content.pno
                );
                return associatedWatch && !associatedWatch.complete;
            });
        } else if (filterType === "시청완료") {
            return filteredContents.filter(content => {
                const associatedWatch = watchList.find((watch) =>
                    Number(watch.writer) === content.pno
                );
                return associatedWatch && associatedWatch.complete;
            });
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    return (
        <div className="px-36 bg-gray-100 flex justify-center min-h-screen">
            <div className="space-y-4 w-full">
                <div className="flex space-x-2 mb-10 mt-6">
                    <button
                        onClick={() => setFilterType("전체")}
                        className={`text-sm px-3 py-2 rounded hover:bg-gray-300 transition 
                            ${filterType === "전체" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => setFilterType("시청중")}
                        className={`text-sm px-3 py-2 rounded hover:bg-gray-300 transition 
                            ${filterType === "시청중" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
                    >
                        시청중
                    </button>
                    <button
                        onClick={() => setFilterType("시청완료")}
                        className={`text-sm px-3 py-2 rounded hover:bg-gray-300 transition 
                            ${filterType === "시청완료" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
                    >
                        시청완료
                    </button>
                </div>

                {filterContents().map((content) => {
                    const associatedWatch = watchList.find((watch) => Number(watch.writer) === content.pno);

                    return (
                        <div key={content.pno} className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
                            <img
                                src={`http://localhost:8091/api/products/view/${content.uploadFileNames}`}
                                alt={content.pname}
                                className="w-28 rounded mr-4"
                            />

                            <div className="flex-1 text-md font-semibold text-gray-900">{content.pname}</div>

                            <div className="flex space-x-2">
                                {associatedWatch && !associatedWatch.complete && (
                                    <button
                                        onClick={() => handleComplete(content.pno)}
                                        className="text-white px-2 bg-blue-800 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        <CheckIcon className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(content.pno)}
                                    className="text-blue-800 hover:text-white px-2 py-2 rounded border border-blue-800 hover:bg-blue-800 transition"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {loading && (
                <p className="mt-4 text-center text-blue-600">로딩 중...</p>
            )}
        </div>
    );
}

export default WatchListComponent;
