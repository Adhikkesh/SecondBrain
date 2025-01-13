interface TwitterType {
  link?: string;
}

export default function Twitter(props: TwitterType) {
  const link = props.link;
  const rem = link ? link.split("x.com/")[1] : " ";
  if(rem === " "){
    return <p>Invalid Twitter URL</p>;
  }
  const l = `https://twitter.com/${rem}`;
  return (
    <div>
      <blockquote className="twitter-tweet">
        <a href={l}></a>
      </blockquote>
    </div>
  );
}
