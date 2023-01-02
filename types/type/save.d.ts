export interface Music {
    name: string
    cover?: string
    link: string
}

export interface MusicAuthor {
    name: string
    avatar?:string
    link:string
    list: Array<Music>
}

export default interface Save {
    Music?: Array<MusicAuthor>
}