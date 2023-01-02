import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from "child_process"
import functions from '../../data/module/functions'
import type { SystemCommand, Command, GetData } from './type/system'

const { consoleTextColor } = functions

let nowPassword = ""
const password = "uwu"

function Reply(res: NextApiResponse, type: string, message: any, code: string | number) {
  let colorList:
    "Black"
    | "Red"
    | "Green"
    | "Yellow"
    | "Blue"
    | "Magenta"
    | "Cyan"
    | "White"

  const TimeColor: typeof colorList = "Green"

  const TypeColor: typeof colorList = "Yellow"

  const CodeColor: typeof colorList = "Blue"

  console.log(
    `${consoleTextColor(TimeColor, `[ ${consoleTextColor("Blue", Date(), TimeColor)} / ${consoleTextColor("Red", new Date().getTime(), TimeColor)} ]`)}`,
    `${consoleTextColor(TypeColor, `( ${consoleTextColor('Green', type, TypeColor)} )`)}`,
    `${message}`,
    `${consoleTextColor(CodeColor, `( ${consoleTextColor('Red', code, CodeColor)} )`)}`
  )

  res.status(200).json({ type: type, message: message, code: code })
  res.end()
}

export default function hendler(req: NextApiRequest, res: NextApiResponse) {
  const command: SystemCommand | Command | GetData = JSON.parse(req.body)

  if (command.type == "Command") {

    if (command.cmd.type == "login") {
      nowPassword = command.cmd.password

      if (nowPassword == password) {
        Reply(res, "login", "oh yeh you login!", "Login")
        return
      }

      Reply(res, "login", "password not correct", "!Login")
    }

    else if (command.cmd.type == "logout") {
      nowPassword = ""
      Reply(res, "logout", "ok done", "isLogout")
    }

    else {
      Reply(res, "error", "unknow-commsnd", "unkcmd")
    }

  } else if (command.type == "GetData") {

    if (command.cmd.type == "isLogin") {
      if (nowPassword == password) {
        Reply(res, "isLogin?", "yes, you login", "isLogin")
        return
      }
      Reply(res, "isLogin?", "no, you not login", "!isLogin")
    }

    else {
      Reply(res, "error", "unknow-commsnd", "unkcmd")
    }

  } else if (command.type == "SystemCommand") {
    if (nowPassword == password) {
      exec(command.cmd)
      Reply(res, "commandline", command.cmd, "isOk")
      return
    }
    Reply(res, "commandline", "you don`t have a permissions", "notPermissions")
  }
}