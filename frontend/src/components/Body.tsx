import { useEffect, useMemo, useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";
import { Button } from "./ui/Button";
import ContentContainer from "./ContentContainer";
import CreateContent from "./createContent";
import axios from "axios";
import LinkContent from "./LinkContent";

interface BodyType{
  getContentArray: (arr: any[]) => void; 
  contentArray: any[];
  setContentArray: React.Dispatch<React.SetStateAction<any[]>>
}

export default function Body({getContentArray,contentArray,setContentArray}: BodyType) {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isLinkPopUp, setIsLinkPopUp] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openPopUp = () => {
    setIsPopUp(true);
  };

  const handleClose = () => {
    setIsPopUp(false);
    setError("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found");
      return;
    }
    setIsLoading(true);
    console.log("Hello");
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
        getContentArray(response.data.content)
        console.log(response.data.content);
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
      } finally {
        setIsLoading(false);
      }
    }
    getContent();
  }, []);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    let obj = {
      contentId: id,
    };
    async function getContent() {
      try {
        await axios.delete("http://localhost:3000/api/v1/content", {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: obj,
        });

        setContentArray((prev) => prev.filter((item: any) => item._id !== id));
        setError("");
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
  };

  const handleShare = async () => {
    setIsLinkPopUp(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/brain/share",
        { share: "true" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const hash = response.data.link;
      const ModifiedLink = `http://localhost:5173/share/${hash}`;
      setLink(ModifiedLink);
      setIsLinkPopUp(true);
      setError("");
    } catch (err: any) {
      console.log(err);
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
  };

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
            onClick={handleShare}
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

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700" />
        </div>
      ) : (
        <div className="ml-[80px]  grid grid-cols-1 md:grid-cols-1 gap-4 xl:grid-cols-3 ">
          {contentArray && contentArray.length > 0 ? 
            (contentArray.map((e: any) => {
              return (
                <div key={e._id}>
                  <ContentContainer
                    Content={e}
                    handleDelete={handleDelete}
                    id={e._id}
                  />
                </div>
              );
            })) : (<div className="text-gray-300 text-sm"> No Contents Available</div>)}
            
        </div>
      )}

      {isPopUp && <CreateContent onClose={handleClose} />}
      {isLinkPopUp && (
        <LinkContent
          link={link}
          onClose={() => {
            setIsLinkPopUp(false);
            setLink("");
            setError("");
          }}
        />
      )}
    </div>
  );
}
