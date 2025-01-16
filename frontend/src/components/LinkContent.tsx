import { useState } from "react";
import CopyIcon from "./icons/CopyIcon";
import { Button } from "./ui/Button";

interface LinkContentType {
  link: string;
  onClose: () => void;
}

export default function LinkContent({ link, onClose }: LinkContentType) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    if (!link.trim()) return;
    try {
      await navigator.clipboard.writeText(link.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex w-full justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-3xl font-bold">Share Link</p>
          <button
            onClick={() => {
              onClose();
            }}
          >
            <img src="/images/close.png" className="max-w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 bg-gray-50 overflow-x-auto">
              <p className="text-gray-700">{link}</p>
            </div>
            <Button
              icon={<CopyIcon size="sm" />}
              variant="secondary"
              content={copied ? "Copied!" : "Copy"}
              size="sm"
              onClick={handleCopy}
            />
          </div>
          <p className="text-sm text-gray-500">
            Share this link with others to give them access to your content
          </p>
        </div>
      </div>
    </div>
  );
}
