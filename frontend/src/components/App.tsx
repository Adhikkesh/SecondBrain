import { Button } from "./ui/Button";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

function App() {
  return (
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
  );
}

export default App;
