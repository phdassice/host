import type { NextApiRequest, NextApiResponse } from 'next'
import djsmusic from "@kyometori/djsmusic"
import YoutubeVideoData from '@kyometori/djsmusic/dist/Utils/youtube/YoutubeVideoData'

import { SearchReq } from './type/yt'

export default function hendler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200)
    const msg: SearchReq = JSON.parse(req.body)
    if (msg.options.type == "Search") {
        djsmusic.YoutubeUtils.search(req.body, 20).then((owo: Array<YoutubeVideoData>) => res.json(owo))
    }
}