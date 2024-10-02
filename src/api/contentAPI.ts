import axios from "axios";
import { IContent, IPageReseponse } from "../types/content.ts";

const host = 'http://localhost:8091/api/products';

const header = {
    headers: {
        'content-type': 'multipart/form-data', // 전송 형식 지정
    }
};

// 콘텐츠 추가 (POST)
export const postAdd = async (formData: FormData): Promise<number> => {
    const res = await axios.post(`${host}/`, formData, header);
    return Number(res.data.result);
};

// 콘텐츠 리스트 조회 (GET)
export const getContentList = async (page?: number, size?: number): Promise<IPageReseponse> => {
    const pageValue: number = page || 1; // 기본값 1
    const sizeValue: number = size || 10; // 기본값 10

    const res = await axios.get<IPageReseponse>(`${host}/list?page=${pageValue}&size=${sizeValue}`);
    return res.data;
};

// 특정 콘텐츠 조회 (GET)
export const getContentOne = async (pno: number): Promise<IContent> => {
    const res = await axios.get<IContent>(`${host}/${pno}`);
    return res.data;
};

// 특정 콘텐츠 삭제 (DELETE)
export const deleteContentOne = async (pno: number): Promise<{ result: string }> => {
    const res = await axios.delete(`${host}/${pno}`);
    return res.data;
};

// 콘텐츠 수정 (PUT)
export const putContentOne = async (pno: number, formData: FormData): Promise<IContent> => {
    const res = await axios.put(`${host}/${pno}`, formData, header);
    return res.data;
};
