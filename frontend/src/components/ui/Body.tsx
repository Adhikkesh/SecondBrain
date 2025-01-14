import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Button } from "./Button";
import ContentContainer from "./ContentContainer";

export default function Body() {
  return (
    <div className="p-8">
      <div className="flex justify-between w-full items-center">
        <div className="text-4xl font-bold">
            All Notes
        </div>
        <div className="p-8 flex gap-4 ">
          <Button
            content="Share Brain"
            variant="secondary"
            icon={<ShareIcon size="md" color="purple-100" />}
            size="md"
          />
          <Button
            content="Add Content"
            variant="primary"
            icon={<PlusIcon size="md" color="gray-50"/>}
            size="md"
          />
        </div>
      </div>

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
