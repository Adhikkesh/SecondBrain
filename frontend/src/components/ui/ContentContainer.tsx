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
  date: string | Date;
}

interface ContentContainerType {
  Content: ContentType;
}

function todayDate(dateInput: Date | string): string {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const m = month < 10 ? `0${month}` : `${month}`;
    const year = date.getFullYear();
    return `${day}/${m}/${year}`;
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid Date";
  }
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
  const [toDate, setDate] = useState("");
  useEffect(() => {
    setDate(todayDate(date));
  }, [date]);
  return (
    <div className=" border-2 p-4 flex flex-col gap-4 rounded-xl bg-white hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        {iconLibrary[type]}
        <div className="text-lg font-semibold line-clamp-2">
          {Content.link ? (
            <a
              className="hover:underline hover:underline-offset-2"
              href={props.Content.link ? props.Content.link : undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </div>
        <div className="flex gap-2">
          {<ShareIcon />}
          {<DeleteIcon />}
        </div>
      </div>
      <div className="flex-1">
        {type == "document" && body && <p className="text-gray-200">{body}</p>}
        {type == "video" && <Youtube link={props.Content.link} />}
        {type == "tweet" && <Twitter link={props.Content.link} />}
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
