import { Button } from "./ui/Button";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";
import ContentContainer from "./ui/ContentContainer";

const content = {};

function App() {
  return (
    <div className="p-8 ">
      <div className="">

      </div>
      <div className="flex flex-col gap-8">
        <div className="p-8 flex gap-4">
          <Button
            content="Share Brain"
            variant="secondary"
            icon={<ShareIcon size="md" />}
            size="md"
          />
          <Button
            content="Add Content"
            variant="primary"
            icon={<PlusIcon size="md" />}
            size="md"
          />
        </div>

        <div className="flex flex-col gap-4">
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
    </div>
  );
}

export default App;
