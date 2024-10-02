import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContentOne, putContentOne, deleteContentOne } from "../../api/contentAPI";
import { IContent } from "../../types/content";
import LoadingComponent from "../common/LoadingComponent";
import ResultModal from "../common/ResultModal";

const initialState: IContent = {
    pno: 0,
    del_flag: false,
    pdesc: "",
    pname: "",
    price: 0,
    keyword: "",
    files: [] as File[], // 파일 객체 배열로 명시적 타입 지정
    uploadFileNames: [] as string[] // 파일 이름 배열로 명시적 타입 지정
};

const AdminContentModifyComponent = () => {
    const { pno } = useParams<{ pno: string }>();
    const [content, setContent] = useState<IContent>(initialState);
    const [file, setFile] = useState<File | null>(null); // 파일 상태 추가
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>('');
    const navigate = useNavigate();

    // 콘텐츠 데이터 불러오기
    useEffect(() => {
        if (pno) {
            const pnoNum = Number(pno);
            setLoading(true);
            getContentOne(pnoNum).then(result => {
                setContent(result); // 콘텐츠 데이터 설정
                setLoading(false);
            }).catch(() => {
                alert("오류가 발생했습니다.");
                setLoading(false);
            });
        }
    }, [pno]);

    // 입력 값 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContent(prevState => ({ ...prevState, [name]: value }));
    };

    // 파일 입력 핸들러
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]); // 첫 번째 파일 선택
        }
    };

    // 수정 처리
    const handleClickModify = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("pname", content.pname);
        formData.append("pdesc", content.pdesc);
        formData.append("price", content.price.toString());
        formData.append("keyword", content.keyword);

        if (file) {
            formData.append("files", file); // 파일 데이터 추가
        }

        putContentOne(Number(pno), formData).then(() => {
            setResult(`${pno} 수정되었습니다.`);
            setLoading(false);
        }).catch(() => {
            alert("수정 중 오류가 발생했습니다.");
            setLoading(false);
        });
    };

    // 삭제 처리
    const handleClickDelete = () => {
        setLoading(true);
        deleteContentOne(Number(pno)).then(data => {
            if (data.result === 'success') {
                setResult(`${pno} 삭제되었습니다.`);
            }
            setLoading(false);
        }).catch(() => {
            alert("삭제 중 오류가 발생했습니다.");
            setLoading(false);
        });
    };

    // 결과 모달 닫기 핸들러
    const closeCallback = () => {
        setResult('');
        navigate("/admin/content/list"); // 수정 후 목록 페이지로 이동
    };

    return (
        <div className="flex flex-col space-y-4 w-96 mx-auto">
            {loading && <LoadingComponent />}
            {result && <ResultModal msg={result} callback={closeCallback} />}

            <label className="text-sm font-semibold text-gray-700">Pname</label>
            <input
                type="text"
                name="pname"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                value={content.pname}
                onChange={handleChange}
            />

            <label className="text-sm font-semibold text-gray-700">Price</label>
            <input
                type="number"
                name="price"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                value={content.price}
                onChange={handleChange}
            />

            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
                name="pdesc"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                value={content.pdesc}
                onChange={handleChange}
            />

            <label className="text-sm font-semibold text-gray-700">Keyword</label>
            <input
                type="text"
                name="keyword"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                value={content.keyword}
                onChange={handleChange}
            />

            {/* 업로드된 파일 이름 및 이미지 출력 */}
            <label className="text-sm font-semibold text-gray-700">Uploaded Files</label>
            <ul>
                {content.uploadFileNames.length > 0 ? (
                    content.uploadFileNames.map((fileName, index) => (
                        <li key={index}>
                            <img
                                src={`http://localhost:8091/api/products/view/${fileName}`}
                                alt={fileName}
                                style={{ width: '100px', height: 'auto' }}
                            />
                            {fileName}
                        </li>
                    ))
                ) : (
                    <li>No files uploaded</li>
                )}
            </ul>

            {/* 이미지 파일 입력 추가 */}
            <label className="text-sm font-semibold text-gray-700">Upload New Image</label>
            <input
                type="file"
                accept="image/*"
                className="border border-gray-300 rounded-lg p-3"
                onChange={handleFileChange}
            />

            {/* 수정, 삭제, 리스트로 이동 버튼 */}
            <div className="flex justify-center gap-2">
                <button
                    type="button"
                    className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    onClick={() => navigate("/admin/content/list")}
                >
                    LIST
                </button>

                <button
                    type="button"
                    className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    onClick={handleClickModify}
                >
                    MODIFY
                </button>

                <button
                    type="button"
                    className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    onClick={handleClickDelete}
                >
                    DELETE
                </button>
            </div>
        </div>
    );
};

export default AdminContentModifyComponent;
