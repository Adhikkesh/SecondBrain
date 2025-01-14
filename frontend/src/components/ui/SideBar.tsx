import ArticleIcon from "../icons/ArticleIcon";
import AudioIcon from "../icons/AudioIcon";
import TweetIcon from "../icons/TweetIcon";
import VideoIcon from "../icons/VideoIcon";
import Comp from "./sidebarcomp";

export default function SideBar() {
  return (
    <div className="hidden md:flex flex-col gap-8 w-60 lg:w-72 flex-shrink-0 ">
      <div className="flex items-center gap-4">
        {<img src="/images/brain.svg" />}
        <p className="font-bold text-3xl tracking-tighter">Second Brain</p>
      </div>
      <div className="flex flex-col gap-8">
        <Comp
          icon={<TweetIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="twitter"
        />
        <Comp
          icon={<VideoIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="video"
        />
        <Comp
          icon={<ArticleIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="document"
        />
        <Comp
          icon={<AudioIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="audio"
        />
      </div>
    </div>
  );
}

//w-32 sm:w-40 md:w-60 lg:w-72
