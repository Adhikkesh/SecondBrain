import { useEffect, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Button } from "./Button";
import ContentContainer from "./ContentContainer";
import CreateContent from "./createContent";
import axios from "axios";

export default function Body() {
  const [isPopUp, setIsPopUp] = useState(false);
  const [error, setError] = useState("");
  const [tagArray, setTagArray] = useState([]);

  const openPopUp = () => {
    setIsPopUp(true);
  };

  const handleClose = () => {
    setIsPopUp(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function getContent() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/content",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setTagArray(response.data.content);
      } catch (err: any) {
        if (err.response) {
          switch (err.response.status) {
            case 411:
              setError(
                "Invalid input: " +
                  (err.response.data.Zoderror?.issues?.[0]?.message ||
                    "Please check your inputs")
              );
              break;
            case 403:
              setError("Username already exists");
              break;
            case 500:
              setError("Server error. Please try again later");
              break;
            default:
              setError("An error occurred. Please try again");
          }
        } else if (err.request) {
          setError("No response from server. Please check your connection");
        } else {
          setError("An error occurred. Please try again");
        }
      }
    }
    getContent();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between w-full items-center">
        <div className="text-4xl font-bold">All Notes</div>
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
            icon={<PlusIcon size="md" color="gray-50" />}
            size="md"
            onClick={openPopUp}
          />
        </div>
      </div>

      <div className="ml-[80px]  grid grid-cols-1 md:grid-cols-1 gap-4 xl:grid-cols-3 ">
        {tagArray &&
          tagArray.map((e: any, ind) => {
              return (<div key={ind}>
                <ContentContainer Content={e} />
              </div>)
          })}
      </div>

      {isPopUp && <CreateContent onClose={handleClose} />}
    </div>
  );
}

{
  /* <div>
          <ContentContainer
            Content={{
              type: "video",
              title: "Barca vs Real Madrid",
              link: "https://www.youtube.com/watch?v=WxNCZfu64Oo",
              tags: ["Football", "elClassico"],
              date: new Date("2025-01-12T00:00:00Z"),
            }}
          />
        </div>

        <div>
          <ContentContainer
            Content={{
              type: "tweet",
              title: "Important Tweet",
              link: "https://x.com/sunpictures/status/1879047215236415540",
              tags: ["robot", "Twitter"],
              date: new Date("2025-01-10T00:00:00Z"),
            }}
          />
        </div>

        <div>
          <ContentContainer
            Content={{
              type: "document",
              title: "OS Medium Document",

              body: "Medium page for basics of Operating System",
              tags: ["productivity", "ideas"],
              date: new Date("2025-01-13T00:00:00Z"),
            }}
          />
        </div>

        <div>
          <ContentContainer
            Content={{
              type: "document",
              title: "OS Medium Document",

              body: "Medium page for basics of Operating System",
              tags: ["productivity", "ideas"],
              date: new Date("2025-01-13T00:00:00Z"),
            }}
          />
        </div>

        <div>
          <ContentContainer
            Content={{
              type: "document",
              title: "OS Medium Document",

              body: "Medium page for basics of Operating System",
              tags: ["productivity", "ideas"],
              date: new Date("2025-01-13T00:00:00Z"),
            }}
          />
        </div> */
}
