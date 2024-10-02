import axios from "axios";
import {IContent, IPageReeponse} from "../types/content.ts";

const host = 'http://localhost:8091/api/products'

const header ={
    headers: {
        'content-type': 'multipart/form-data',//전송 형식 지정
    }
}

export const postAdd = async (formData: FormData): Promise<number> => {

    const res = await axios.post(`${host}/`, formData, header)

    return Number(res.data.result)
}

export const getContentList = async (page?: number, size?: number): Promise<IPageReeponse> => {
    const pageValue: number = page || 1; // 기본값 1
    const sizeValue: number = size || 10; // 기본값 10

    const res = await axios.get<IPageReeponse>(`${host}/list?page=${pageValue}&size=${sizeValue}`);
    return res.data;
}

export const getContentOne = async (pno: number): Promise<IContent> => {
    const res = await axios.get<IContent>(`${host}/${pno}`);
    return res.data;
};


export const deleteContentOne = async (pno: number): Promise<{result:string}> => {
    const res = await axios.delete(`${host}/${pno}`);

    return res.data
};