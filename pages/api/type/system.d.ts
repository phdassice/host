/* Command */
import type login from "./system/command/login"
import type logout from "./system/command/logout"

/* GetData */
import type isLogin from "./system/getdata/isLogin"

export interface GetData {
    type: "GetData"
    cmd: isLogin
}

export interface Command {
    type: "Command"
    cmd: login | logout
}

export interface SystemCommand {
    type: "SystemCommand"
    cmd:string
}