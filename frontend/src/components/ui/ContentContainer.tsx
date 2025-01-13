import { ReactElement, useEffect, useState } from "react";
import ArticleIcon from "../icons/ArticleIcon";
import VideoIcon from "../icons/VideoIcon";
import TweetIcon from "../icons/TweetIcon";
import AudioIcon from "../icons/AudioIcon";
import ShareIcon from "../icons/ShareIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Tag from "./Tag";
import Youtube from "./Youtube";
import Twitter from "./Twitter";

type TypesOfContents = "document" | "video" | "tweet" | "audio";
interface ContentType {
  link?: string;
  type: TypesOfContents;
  title: string;
  tags?: string[];
  body?: string;
  date: Date;
}

interface ContentContainerType {
  Content: ContentType;
}

function todayDate(date: Date): string {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let m: string;
  if (month < 9) m = "0" + month;
  else m = "" + month;
  let year = date.getFullYear();
  return `${day}/${m}/${year}`;
}

const iconLibrary: Record<TypesOfContents, ReactElement> = {
  document: <ArticleIcon />,
  video: <VideoIcon />,
  tweet: <TweetIcon />,
  audio: <AudioIcon />,
};
export default function ContentContainer(props: ContentContainerType) {
  const { Content } = props;
  const { title, type, body, date } = Content;
  const [toDate,setDate] = useState("");
  useEffect(() => {
    setDate(todayDate(date));
  },[])
  return (
    <div className="max-w-80 border-2 p-4 flex flex-col gap-4 rounded-xl">
      <div className="flex justify-between">
        {iconLibrary[type]}
        <div className="text-xl font-bold tracking-tight "><a className="hover:underline hover:underline-offset-2" href={props.Content.link ? props.Content.link : undefined}>{title}</a></div>
        {<ShareIcon />}
        {<DeleteIcon />}
      </div>
      <div>
        {type == "document" && body && <p className="text-gray-200">{body}</p>}
        {type == "video" && <Youtube link={props.Content.link}/>}
        {type == "tweet" && <Twitter link={props.Content.link}/>}
      </div>
      <div className="flex gap-4">
        {props.Content.tags
          ? props.Content.tags.map((e) => <div>{<Tag tag={e} />}</div>)
          : null}
      </div>
      <div>
        <p className="text-gray-100 text-sm">Added on {toDate}</p>
      </div>
    </div>
  );
}

// link is optional
// add date in database
