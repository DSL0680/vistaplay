import axios from "axios";
import { IContent, IPageResponse } from "../types/content.ts";

const host = 'http://localhost:8091/api/products'

const header = {
    headers: {
        'content-type': 'multipart/form-data', // 전송 형식 지정
    }
}

// 콘텐츠 추가 (POST)
export const postAdd = async (formData: FormData): Promise<number> => {
    const res = await axios.post(`${host}/`, formData, header)
    return Number(res.data.result)
}

// 콘텐츠 리스트 조회 (GET)
export const getContentList = async (page?: number, size?: number): Promise<IPageResponse> => {
    const pageValue: number = page || 1 // 기본값 1
    const sizeValue: number = size || 10 // 기본값 10

    const res = await axios.get<IPageResponse>(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return res.data;
}

// 특정 콘텐츠 조회 (GET)
export const getContentOne = async (pno: number): Promise<IContent> => {
    const res = await axios.get<IContent>(`${host}/${pno}`);
    return res.data;
}

// 특정 콘텐츠 삭제 (DELETE)
export const deleteContentOne = async (pno: number): Promise<{ result: string }> => {
    // 삭제 요청을 위한 formData 생성
    const formData = new FormData()
    formData.append('del_flag', 'true'); // del_flag 값을 true로 설정하여 소프트 삭제

    // PUT 요청을 통해 콘텐츠를 소프트 삭제
    const res = await axios.put(`${host}/${pno}`, formData, header)

    return res.data // 서버에서 응답받은 데이터를 그대로 반환
}

// 콘텐츠 수정 (PUT)
export const putContentOne = async (pno: number, formData: FormData): Promise<IContent> => {
    const res = await axios.put(`${host}/${pno}`, formData, header);
    return res.data;
}

export const getImageUrl = (fileName: string): string => {
    if (!fileName) return '' // 파일 이름이 없을 경우 빈 문자열 반환

    return `${host}/view/${fileName}`
}