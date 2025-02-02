import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";

export const ChatCanvas: React.FC = () => {
    return (
      <div>
        <ChatHistory />
        <ChatInput />
      </div>
    );
  };