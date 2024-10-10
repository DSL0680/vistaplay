export interface IContent {

    pno: number,
    del_flag: boolean,
    pdesc: string,
    pname: string,
    price: number,
    keyword: string,
}

export interface IPageReseponse {
    dtoList: IContent[],
    number: number,
    pageNumList: number[],
    size: number,
    prev: boolean,
    next: boolean,
    current: number,
    totalPages: number,
    keyword: string,
}