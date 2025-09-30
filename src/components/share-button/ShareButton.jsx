
import { BsSend } from "react-icons/bs";
import { toast } from "react-toastify";

const ShareButton = ({ url, title, text }) => {
  const handleShare = async () => {
    if (navigator.share) {
      // ✅ Native Web Share API
      try {
        await navigator.share({ title, text, url });
        console.log("Content shared successfully!");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else if (navigator.clipboard) {
      // ✅ Clipboard fallback
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    } else {
      // ❌ No support at all
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <button onClick={handleShare} title="Share">
      <BsSend />
    </button>
  );
};

export default ShareButton;
