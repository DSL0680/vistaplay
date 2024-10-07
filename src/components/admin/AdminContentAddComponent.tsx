import { IContent } from "../../types/content.ts";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postAdd } from "../../api/contentAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import ResultModal from "../common/ResultModal.tsx";

const initState: IContent = {
    pdesc: '',
    pname: '',
    keyword: '',
    files: [] as File[],
    uploadFileNames: [] as string[]
};

function AdminContentAddComponent() {
    const [content, setContent] = useState<IContent>({ ...initState });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();

    const queryString = location.search;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'keyword') {
            const [type, genre] = value.split('-');
            setContent(prevContent => ({
                ...prevContent,
                type,
                genre,
                keyword: value
            }));
        } else if (name === 'pdesc') {
            const [ex, link] = value.split(',');
            setContent(prevContent => ({
                ...prevContent,
                ex,
                link,
                pdesc: value
            }));
        } else {
            setContent(prevContent => ({
                ...prevContent,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setContent(prevContent => ({
                ...prevContent,
                files: [...prevContent.files, ...filesArray],
            }));
        }
    };

    const handleClick = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("pname", content.pname);
        formData.append("pdesc", content.pdesc);
        formData.append("keyword", content.keyword);

        content.files.forEach(file => {
            formData.append("files", file);
        });

        postAdd(formData)
            .then((pno: number) => {
                setResult(`${pno} 등록되었습니다.`);
                setLoading(false);
            })
            .catch(() => {
                alert("등록 중 오류가 발생했습니다.");
                setLoading(false);
            });
    };

    const closeCallback = () => {
        setResult('');
        setContent({ ...initState });
        navigate("/admin/list" + queryString);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full p-8 bg-gray-50 rounded-lg shadow-lg">
                {loading && <LoadingComponent />}
                {result && <ResultModal msg={result} callback={closeCallback} />}

                <div className="mb-6 text-3xl font-bold text-center text-gray-800">작품 등록</div>

                <div className="grid grid-cols-2 gap-6">
                    {/* 왼쪽 칸 */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700">제목</label>
                        <input
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                            type='text'
                            name='pname'
                            value={content.pname}
                            placeholder="작품 제목"
                            onChange={handleChange}
                        />

                        <label className="text-sm font-semibold text-gray-700 mt-4">작품 설명 & 예고편 링크</label>
                        <textarea
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                            name='pdesc'
                            placeholder="작품 설명 & 예고편 링크"
                            value={content.pdesc}
                            onChange={handleChange}
                            rows={10} // 행 수를 늘려서 높이를 조절
                        />
                    </div>

                    {/* 오른쪽 칸 */}
                    <div>
                        <label className="text-sm font-semibold text-gray-700">이미지 첨부</label>
                        <input
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />

                        <label className="text-sm font-semibold text-gray-700 mt-4">장르 태그 추가</label>
                        <div className="flex space-x-4">
                            <select
                                className="border border-gray-300 rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                                name="keyword"
                                value={content.keyword}
                                onChange={handleChange}
                            >
                                <option value="">선택</option>
                                <option value="영화 - 액션">영화 - 액션</option>
                                <option value="영화 - 코미디">영화 - 코미디</option>
                                <option value="영화 - 공포">영화 - 공포</option>
                                <option value="영화 - 가족">영화 - 가족</option>
                                <option value="드라마 - 로맨스">드라마 - 로맨스</option>
                                <option value="드라마 - 모험">드라마 - 모험</option>
                                <option value="드라마 - 범죄">드라마 - 범죄</option>
                                <option value="예능 - 음악">예능 - 음악</option>
                                <option value="예능 - 스릴러">예능 - 스릴러</option>
                                <option value="애니메이션 - 공상과학">애니메이션 - 공상과학</option>
                                <option value="애니메이션 - 판타지">애니메이션 - 판타지</option>
                                <option value="애니메이션 - 전쟁">애니메이션 - 전쟁</option>
                                <option value="다큐멘터리 - 액션">다큐멘터리 - 액션</option>
                                <option value="다큐멘터리 - 코미디">다큐멘터리 - 코미디</option>
                                <option value="다큐멘터리 - 스릴러">다큐멘터리 - 스릴러</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onClick={handleClick}
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminContentAddComponent;
