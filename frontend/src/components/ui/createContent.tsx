import { useState } from "react";
import InputBox from "./inputBox";
import { Button } from "./Button";
import crossIcon from "../icons/crossIcon";
import SelectBox from "./SelectBox";
import TextArea from "./TextArea";
import TagInput from "./TagInput";
import Tag from "./Tag";
import axios from "axios";

interface CreateContentType {
  onClose: () => void;
}

export default function CreateContent(props: CreateContentType) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState("document");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    setValue(v);
  }

  function handleBodyChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setBody(v);
  }

  function handleTag(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setTagValue(v);
  }

  function handleTagSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (tagValue.trim()) {
      setTags((prev) => [...prev, tagValue.trim()]);
      setTagValue("");
    }
  }

  function handleCrossTag(id: number | undefined) {
    setTags(tags.filter((_, ind) => ind !== id));
  }

  async function handleSubmit() {
    let obj = {};
    const token = localStorage.getItem("token");
    try {
      if (value === "video" || value === "audio" || value === "tweet") {
        obj = {
          title: title,
          type: value,
          link: link,
        };
        if (tags) {
          obj = {
            ...obj,
            tags: tags,
          };
        }
      } else {
        obj = {
          title: title,
          type: value,
          body: body,
        };
        if (link.trim()) {
          obj = {
            ...obj,
            link: link,
          };
        }
        if (tags) {
          obj = {
            ...obj,
            tags: tags,
          };
        }
      }
      console.log(obj);
      console.log(value);
      const response = await axios.post(
        "http://localhost:3000/api/v1/content",
        obj,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "Sucessfull") {
        props.onClose();
      }
    } catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
          case 411:
            console.error("Invalid input:", err.response.data.error);
            // Handle validation error
            break;
          case 401:
            console.error("Unauthorized - invalid or expired token");
            // Maybe redirect to login
            break;
          default:
            console.error("Server error:", err.response.data.error);
        }
      } else if (err.request) {
        console.error("No response from server. Check your connection.");
      } else {
        console.error("Error:", err.message);
      }
    }
  }
  return (
    <div className="fixed inset-0 bg-opacity-50 flex w-full justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-3xl font-bold">Add Content</p>
          <Button
            icon={crossIcon}
            onClick={props.onClose}
            content="x close"
            variant="secondary"
            size="sm"
          />
        </div>
        <div>
          <form className="flex flex-col gap-4">
            <SelectBox onChange={handleChange} value={value} />
            {value === "document" && (
              <>
                <InputBox
                  placeholder="Enter the title"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <InputBox
                  placeholder="Enter the Link"
                  label="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <TextArea
                  value={body}
                  onChange={handleBodyChange}
                  placeholder="Enter your content"
                  label="Body"
                />
              </>
            )}

            {(value === "video" || value === "audio" || value === "tweet") && (
              <>
                <InputBox
                  placeholder="Enter the title"
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <InputBox
                  placeholder="Enter the Link"
                  label="Link"
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
              </>
            )}

            <TagInput
              handleTag={handleTag}
              handleSubmit={handleTagSubmit}
              value={tagValue}
            />
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 &&
                tags.map((e, ind) => (
                  <Tag
                    key={ind}
                    cross={true}
                    tag={e}
                    id={ind}
                    size="sm"
                    onClick={handleCrossTag}
                  />
                ))}
            </div>

            <Button onClick={handleSubmit} variant="primary" content="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
