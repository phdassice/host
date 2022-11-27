export default {
    fetch: function (type: "system", body: string, onRes?: (res: any) => void) {
      fetch("api/" + type, {
        method: "POST",
        body: body
      }).then(
        async res => {
          if (onRes) {
            onRes(await res.json())
          }
        }
      )
    },
    consoleTextColor: function (type:
      | "Black"
      | "Red"
      | "Green"
      | "Yellow"
      | "Blue"
      | "Magenta"
      | "Cyan"
      | "White"
      ,
      text: string | number,
      end?:
        | "Black"
        | "Red"
        | "Green"
        | "Yellow"
        | "Blue"
        | "Magenta"
        | "Cyan"
        | "White"
    ) {
      const list = {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m"
      }
      return `${list[type]}${text}${list[end || "White"]}`
    },
    consoleBgColor: function (type:
      | "Black"
      | "Red"
      | "Green"
      | "Yellow"
      | "Blue"
      | "Magenta"
      | "Cyan"
      | "White"
      ,
      text: string | number,
      end:
        | "Black"
        | "Red"
        | "Green"
        | "Yellow"
        | "Blue"
        | "Magenta"
        | "Cyan"
        | "White"
    ) {
      const list = {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m"
      }
      return `${list[type]}${text}${list[end || "Black"]}`
    },
    consoleTextStyle: function (type:
      | "Reset"
      | "Bright"
      | "Dim"
      | "Underscore"
      | "Blink"
      | "Reverse"
      | "Hidden"
      ,
      text: string | number,
      end:
        | "Reset"
        | "Bright"
        | "Dim"
        | "Underscore"
        | "Blink"
        | "Reverse"
        | "Hidden"
    ) {
      const list = {
        Reset: "\x1b[0m",
        Bright: "\x1b[1m",
        Dim: "\x1b[2m",
        Underscore: "\x1b[4m",
        Blink: "\x1b[5m",
        Reverse: "\x1b[7m",
        Hidden: "\x1b[8m"
      }
      return `${list[type]}${text}${list[end || "Reset"]}`
    }
  }
  