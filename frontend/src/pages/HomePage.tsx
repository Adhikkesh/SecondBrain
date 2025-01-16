import SideBar from "../components/SideBar";
import Body from "../components/Body";
import { useState } from "react";

export default function HomePage() {
  const [contentArray, setContentArray] = useState<any[]>([]);
  const [filterdArray, setFilteredArray] = useState<any[]>([]);


  function handleFilter(type: string) {
    console.log(type);
    if (!type) {
      setFilteredArray(contentArray);
      return;
    }
    const filtered = contentArray.filter((content) => content.type === type);
    setFilteredArray(filtered);
  }

  function getContentArray(newArray: any[]) {
    console.log("New Array: ",newArray);
    setContentArray(newArray);
    setFilteredArray(newArray);
  }

  return (
    <div className="flex min-h-screen gap-8 bg-gray-50">
      <div className="p-6 border-r-2 border-gray-100">
        <SideBar handleFilter={handleFilter} />
      </div>
      <div className="flex-1">
        <Body
          getContentArray={getContentArray}
          contentArray={filterdArray}
          setContentArray={setContentArray}
        />
      </div>
    </div>
  );
}
