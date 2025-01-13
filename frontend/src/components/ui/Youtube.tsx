interface YoutubeType {
  link?: string;
}

export default function Youtube(props: YoutubeType) {
  const link = props.link;
  const videoId = link ? link.split("v=")[1] : " ";
  if (videoId === " ") {
    return <p>Invalid Youtube URL</p>;
  }
  const iframesrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
  return (
    <iframe
      src={iframesrc}
      title="YouTube video player"
      //@ts-ignore
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      className="w-72 h-40"
    ></iframe>
  );
}
