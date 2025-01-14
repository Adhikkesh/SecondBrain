// App.tsx
import SideBar from "./ui/SideBar";
import Body from "./ui/Body";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 p-6 border-r border-gray-100 shrink-0">
        <SideBar />
      </aside>
      <main className="flex-1">
        <Body />
      </main>
    </div>
  );
}

export default App;

// Body.tsx
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Button } from "./Button";
import ContentContainer from "./ContentContainer";

export default function Body() {
  return (
    <div className="p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Notes</h1>
        <div className="flex gap-4">
          <Button
            content="Share Brain"
            variant="secondary"
            icon={<ShareIcon size="md" color="purple-100" />}
            size="md"
          />
          <Button
            content="Add Content"
            variant="primary"
            icon={<PlusIcon size="md" color="gray-50" />}
            size="md"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContentContainer
          Content={{
            type: "document",
            title: "OS Medium Document",
            body: "Medium page for basics of Operating System",
            tags: ["productivity", "ideas"],
            date: new Date("2025-01-13T00:00:00Z"),
          }}
        />
        <ContentContainer
          Content={{
            type: "video",
            title: "Barca vs Real Madrid",
            link: "https://www.youtube.com/watch?v=WxNCZfu64Oo",
            tags: ["Football", "elClassico"],
            date: new Date("2025-01-12T00:00:00Z"),
          }}
        />
        <ContentContainer
          Content={{
            type: "tweet",
            title: "Important Tweet",
            link: "https://x.com/LycaProductions/status/1878686868612723007",
            tags: ["robot", "Twitter"],
            date: new Date("2025-01-10T00:00:00Z"),
          }}
        />
      </div>
    </div>
  );
}

// ContentContainer.tsx
export default function ContentContainer(props: ContentContainerType) {
  const { Content } = props;
  const { title, type, body, date } = Content;
  const [toDate, setDate] = useState("");

  useEffect(() => {
    setDate(todayDate(date));
  }, [date]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border rounded-xl hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {iconLibrary[type]}
          <h2 className="text-lg font-semibold line-clamp-2">
            {Content.link ? (
              <a
                href={Content.link}
                className="hover:text-purple-600 hover:underline hover:underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
            <ShareIcon />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
            <DeleteIcon />
          </button>
        </div>
      </div>

      <div className="flex-1">
        {type === "document" && body && (
          <p className="text-gray-600 line-clamp-3">{body}</p>
        )}
        {type === "video" && <Youtube link={Content.link} />}
        {type === "tweet" && <Twitter link={Content.link} />}
      </div>

      {Content.tags && Content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Content.tags.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
      )}

      <div>
        <p className="text-sm text-gray-400">Added on {toDate}</p>
      </div>
    </div>
  );
}