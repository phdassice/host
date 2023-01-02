
export interface Search {
    type: "Search"
    max: number
}
export interface SearchFirstVideo {
    type: "SearchFirstVideo"
}

export interface SearchReq {
    keyWord: string
    options: Search | SearchFirstVideo
}