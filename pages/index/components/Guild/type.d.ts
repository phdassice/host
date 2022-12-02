export interface GuildType{
    children?: ReactNode
    title: string
    dangerouslySetInnerHTML?: {
      __html: string;
    }
  }