export interface IWatch {
    complete: boolean;
    tno: number
    dueData: string,
    title: string,
    writer: string,
}

export interface IWatchPageReseponse {
    dtoList: IWatch[],
    number: number,
    pageNumList: number[],
    size: number,
    prev: boolean,
    next: boolean,
    current: number,
    totalPages: number,
    keyword: string,
}