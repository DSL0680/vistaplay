import axios from "axios";
import {IWatch} from "../types/watch.ts";
import {IPageReseponse} from "../types/content.ts";


const host: string = 'http://localhost:8091/api/todo';

// 감상 목록 조회 (GET)
export const getWatchList = async (page?: number, size?: number): Promise<IPageReseponse> => {
    const pageValue: number = page || 1;
    const sizeValue: number = size || 10;

    const res = await axios.get(`${host}/todo?page=${pageValue}&size=${sizeValue}`);
    return res.data;
};

// 감상 목록 추가 (POST)
export const postWatch = async (watch: IWatch): Promise<number> => {
    const res = await axios.post(`${host}/`, watch);
    return res.data.mno; // 감상 목록 항목의 ID 반환
};

// 특정 감상 목록 가져오기 (GET)
export const getOneWatch = async (tno: number): Promise<IWatch> => {
    const res = await axios.get(`${host}/todo/${tno}`);
    return res.data;
};

// 감상 목록 수정 (PUT)
export const putWatch = async (watch: IWatch): Promise<IWatch> => {
    const res = await axios.put(`${host}/todo/${watch.tno}`, watch);
    return res.data;
};

// 감상 목록 삭제 (DELETE)
export const deleteWatch = async (mno: number): Promise<{ result: string }> => {
    const res = await axios.delete(`${host}/todo/${mno}`);
    return res.data;
};