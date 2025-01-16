import { useState } from "react";
import ArticleIcon from "./icons/ArticleIcon";
import AudioIcon from "./icons/AudioIcon";
import TweetIcon from "./icons/TweetIcon";
import VideoIcon from "./icons/VideoIcon";
import Logo from "./ui/Logo";
import Comp from "./ui/sidebarcomp";

interface SideBarType {
  handleFilter: (e: string) => void;
}
export default function SideBar(props: SideBarType) {
  const [activeType, setActiveType] = useState<string>("");

  const handleClick = (type: string) => {
    console.log("Click on:", type);
    if (activeType === type && props.handleFilter) {
      setActiveType("");
      props.handleFilter("");
    } else {
      if (props.handleFilter) {
        setActiveType(type);
        props.handleFilter(type);
      }
    }
  };

  return (
    <div className="hidden md:flex flex-col gap-8 w-60 lg:w-72 flex-shrink-0 ">
      <Logo />
      <div className="flex flex-col gap-8">
        <Comp
          icon={<TweetIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="tweet"
          onClick={handleClick}
        />
        <Comp
          icon={<VideoIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="video"
          onClick={handleClick}
        />
        <Comp
          icon={<ArticleIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="document"
          onClick={handleClick}
        />
        <Comp
          icon={<AudioIcon size="lg" color="gray-300" />}
          color="gray-300"
          text="audio"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
