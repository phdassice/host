import type { SearchReq } from "../../../pages/api/type/yt"
import type system from "../../../pages/api/type/system"
import type getblog from "../../../pages/api/type/getblog"

export interface FetchYtType {
    type: "yt"
    options: SearchReq
}

export interface FetchSystemType {
    type: "system"
    options: system.Command | system.GetData | system.SystemCommand
}

export interface FetchKiloType {
    type: "kilo"
    options?:string
}

export interface FetchGetLogType {
    type: "getblog"
    options?:getblog.GetBlog
}