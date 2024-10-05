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
                keyword: value,
                type,
                genre
            }));
        } else if (name === 'pdesc') {
            const [ex, link] = value.split(',');
            setContent(prevContent => ({
                ...prevContent,
                pdesc: value,
                ex,
                link
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

            console.log("Selected files:", filesArray);
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
        console.log("Form data to be sent:", {
            pname: content.pname,
            pdesc: content.pdesc,
            keyword: content.keyword,
            files: content.files
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
        <div className='flex flex-col space-y-4 w-96 mx-auto'>
            {loading && <LoadingComponent />}
            {result && <ResultModal msg={result} callback={closeCallback} />}

            <div>Admin Content Add</div>

            <label className="text-sm font-semibold text-gray-700">작품 제목</label>
            <input
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                type='text'
                name='pname'
                value={content.pname}
                placeholder="작품 제목"
                onChange={handleChange}
            />

            <label className="text-sm font-semibold text-gray-700">작품 설명 & 예고편 링크</label>
            <textarea
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                name='pdesc'
                placeholder="작품 설명 & 예고편 링크"
                value={content.pdesc}
                onChange={handleChange}
            />

            <label className="text-sm font-semibold text-gray-700">타입 & 장르</label>
            <select
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                name="keyword"
                value={content.keyword}
                onChange={handleChange}
            >
                <option value="">선택</option>
                <option value="movie-action">영화 - 액션</option>
                <option value="movie-comedy">영화 - 코미디</option>
                <option value="movie-horror">영화 - 공포</option>
                <option value="movie-family">영화 - 가족</option>
                <option value="drama-romance">드라마 - 로맨스</option>
                <option value="drama-adventure">드라마 - 모험</option>
                <option value="drama-crime">드라마 - 범죄</option>
                <option value="variety-music">예능 - 음악</option>
                <option value="variety-thriller">예능 - 스릴러</option>
                <option value="anime-sci-fi">애니메이션 - 공상과학</option>
                <option value="anime-fantasy">애니메이션 - 판타지</option>
                <option value="anime-war">애니메이션 - 전쟁</option>
                <option value="documentary-action">다큐멘터리 - 액션</option>
                <option value="documentary-comedy">다큐멘터리 - 코미디</option>
                <option value="documentary-thriller">다큐멘터리 - 스릴러</option>
            </select>

            <label className="text-sm font-semibold text-gray-700">Upload Image</label>
            <input
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                onClick={handleClick}
            >
                등록
            </button>
        </div>
    );
}

export default AdminContentAddComponent;
