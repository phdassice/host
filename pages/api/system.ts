import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from "child_process"

import functions from '../../data/module/functions'

const { consoleTextColor } = functions


let nowPassword = ""
const password = "Ldokdlidk_YT"

const Prefix = "-"
const getdataPrefix = "?"

function Reply(res: NextApiResponse, type: string, message: string, code: string) {
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
}

export default function hendler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.startsWith(Prefix) || req.body.startsWith(getdataPrefix)) {

    if (req.body.startsWith(Prefix)) {
      let command = req.body.slice(Prefix.length)

      //login
      if (command.startsWith("login")) {

        nowPassword = command.slice(("login ").length)

        if (nowPassword == password) {
          Reply(res, "login", "oh yeh you login!", "Login")
          return
        }

        Reply(res, "login", "password not correct", "!Login")
      } else
        //logout
        if (command.startsWith("logout")) {
          nowPassword = ""
          Reply(res, "logout", "ok done", "isLogout")
        } else {
          Reply(res, "error", "unknow-commsnd", "unkcmd")
        }
    } else if (req.body.startsWith(getdataPrefix)) {
      let command = req.body.slice(getdataPrefix.length)

      //isLogin
      if (command.startsWith("isLogin")) {
        if (nowPassword == password) {
          Reply(res, "isLogin?", "yes, you login", "isLogin")
          return
        }
        Reply(res, "isLogin?", "no, you not login", "!isLogin")
      } else {
        Reply(res, "error", "unknow-commsnd", "unkcmd")
      }
    }
  } else {
    if (nowPassword == password) {
      exec("powershell " + req.body)
      Reply(res, "commandline", req.body, "isOk")
      return
    }
    Reply(res, "commandline", "you don`t have a permissions", "notPermissions")
  }
}