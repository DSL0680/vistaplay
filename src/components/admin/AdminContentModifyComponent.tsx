import { useEffect, useState, ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getContentOne, putContentOne} from "../../api/contentAPI"
import { IContent } from "../../types/content"
import LoadingComponent from "../common/LoadingComponent"
import ResultModal from "../common/ResultModal"

const initialState: IContent = {
    pno: 0,
    pname: "",
    price: 0, // 조회수 필드 (수정 불가)
    pdesc: "",
    keyword: "",
    files: [],
    uploadFileNames: [], // 파일 이름 필드
    del_flag: false
}

function AdminContentModifyComponent() {
    const { pno } = useParams<{ pno: string }>()
    const [content, setContent] = useState<IContent>(initialState)
    const [file, setFile] = useState<File | null>(null) // 새로 선택한 파일 상태
    const [filePreview, setFilePreview] = useState<string | null>(null) // 파일 미리보기 상태
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<string>('') // 수정 결과 메시지 상태
    const navigate = useNavigate()

    // 콘텐츠 데이터 불러오기
    useEffect(() => {
        if (pno) {
            const pnoNum = Number(pno)
            setLoading(true)
            getContentOne(pnoNum).then(result => {
                setContent(result) // 콘텐츠 데이터 설정
                setLoading(false)
            }).catch(() => {
                alert("오류가 발생했습니다.")
                setLoading(false)
            })
        }
    }, [pno])

    // 입력 값 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
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
    }

    // 파일 입력 핸들러 - 파일을 선택하면 미리보기로 보여줍니다.
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile) // 새로 선택된 파일 상태 저장
            setFilePreview(URL.createObjectURL(selectedFile)) // 미리보기 URL 설정
        }
    }

    // 수정 처리
    const handleClickModify = () => {
        setLoading(true)
        const formData = new FormData()

        // 텍스트 데이터 추가
        formData.append("pname", content.pname)
        formData.append("pdesc", content.pdesc)
        formData.append("keyword", content.keyword)

        // 새로 선택된 파일이 없으면 기존 파일 전송
        if (!file) {
            // 파일이 새로 선택되지 않았을 때는 기존 파일 이름을 전송
            if (content.uploadFileNames.length > 0) {
                content.uploadFileNames.forEach((fileName) => {
                    formData.append(`uploadFileNames`, fileName) // 기존 파일 이름 전송
                })
            }
        } else {
            // 새로 선택된 파일이 있을 때만 파일 전송
            formData.append("files", file) // 새 파일만 업로드
        }
        // API 호출
        putContentOne(Number(pno), formData).then(() => {
            setResult(`${pno} 수정되었습니다.`)
            setLoading(false)
        }).catch(() => {
            alert("수정 중 오류가 발생했습니다.")
            setLoading(false)
        })
    }


    // 결과 모달 닫기 핸들러
    const closeCallback = () => {
        setResult('') // 모달 닫기 후 메시지 초기화
        navigate("/admin/list") // 수정 후 목록 페이지로 이동
    }

    return (
        <div className="flex flex-col space-y-4 w-full max-w-2xl mx-auto p-4">
            {loading && <LoadingComponent />} {/* 로딩 컴포넌트 */}
            {result && <ResultModal msg={result} callback={closeCallback} />} {/* 결과 모달 */}

            <div className="flex items-center space-x-4">
                <label className="w-1/5 text-sm font-semibold text-gray-700">작품 제목</label>
                <input
                    type="text"
                    name="pname"
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    value={content.pname}
                    onChange={handleChange}
                />
            </div>

            {/* 조회수 (price 필드) - 수정 불가, 읽기 전용 */}
            <div className="flex items-center space-x-4">
                <label className="w-1/5 text-sm font-semibold text-gray-700">조회수</label>
                <input
                    type="number"
                    name="price"
                    className="flex-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:outline-none transition duration-300"
                    value={content.price}
                    readOnly
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/5 text-sm font-semibold text-gray-700">작품 설명 & 예고편 링크</label>
                <textarea
                    name="pdesc"
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    value={content.pdesc}
                    onChange={handleChange}
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="text-sm font-semibold text-gray-700 mt-4">장르 태그 추가</label>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        name="keyword"
                        className="flex-1 border border-gray-300 rounded-lg p-3 bg-gray-100 focus:outline-none transition duration-300"
                        value={content.keyword}
                        readOnly
                    />
                </div>
            </div>

            {/* 이미지 파일 미리보기 및 파일 입력 */}
            <div className="flex items-center space-x-4">
                <label className="w-1/5 text-sm font-semibold text-gray-700">Uploaded Files</label>
                <ul className="flex flex-wrap">
                    {/* 새 파일이 선택되면 새로운 미리보기 이미지 표시 */}
                    {filePreview ? (
                        <li className="m-2">
                            <img
                                src={filePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                        </li>
                    ) : (
                        content.uploadFileNames.length > 0 ? (
                            content.uploadFileNames.map((fileName, index) => (
                                <li key={index} className="m-2">
                                    <img
                                        src={`http://localhost:8091/api/products/view/${content.uploadFileNames[0]}`}
                                        alt={fileName}
                                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                                    />
                                    <p className="text-xs text-gray-500">{fileName}</p>
                                </li>
                            ))
                        ) : (
                            <li>No files uploaded</li>
                        )
                    )}
                </ul>
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/5 text-sm font-semibold text-gray-700">Upload New Image</label>
                <input
                    type="file"
                    accept="image/*"
                    className="flex-1 border border-gray-300 rounded-lg p-3"
                    onChange={handleFileChange}
                />
            </div>

            {/* 수정, 삭제, 리스트로 이동 버튼 */}
            <div className="flex justify-center gap-2">
                <button
                    type="button"
                    className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    onClick={() => navigate("/admin/list")}
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
            </div>
        </div>
    )
}

export default AdminContentModifyComponent