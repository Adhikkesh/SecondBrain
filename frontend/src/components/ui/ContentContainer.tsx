import { ReactElement } from "react";
import ArticleIcon from "../icons/ArticleIcon";
import VideoIcon from "../icons/VideoIcon";
import TweetIcon from "../icons/TweetIcon";
import AudioIcon from "../icons/AudioIcon";

type TypesOfContents = "document" | "video" | "tweet" | "audio"
interface ContentType{
    link: string;
    type: TypesOfContents;
    title: string;
    tags?: string[];
    body?: string;
}

interface ContentContainerType{
    Content: ContentType;
}

const iconLibrary : Record<TypesOfContents,ReactElement> = {
    document: <ArticleIcon/>,
    video: <VideoIcon/>,
    tweet: <TweetIcon/>,
    audio: <AudioIcon/>
}
export default function ContentContainer(props: ContentContainerType){
    return (
        <div>
            <div>

            </div>
        </div>
    )
}