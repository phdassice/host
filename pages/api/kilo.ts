import type { NextApiRequest, NextApiResponse } from 'next'
export default function hendler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200)
    res.send("早上好 KILO\n現在我有 XMLHttpRequest\n我最喜歡 XMLHttpRequest\n但 fetch 比 XMLHttpRequest\nfatch\nfit\nfetch\n我最喜歡\n所以 現在是 fetch 時間\n1 2 3\n兩個禮拜以後\nfetch(\"https//localhost:3000/api/kilo\")");
}