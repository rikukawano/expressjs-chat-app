import { useUser } from "@clerk/clerk-react";

interface MessageProps {
  senderId: string;
  senderUsername: string;
  content: string;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({
  senderId,
  senderUsername,
  content,
  timestamp,
}) => {
  const { user } = useUser();
  const isCurrentUser = user?.id === senderId;

  const messageClassNames = isCurrentUser
    ? "flex items-start gap-2.5 justify-end"
    : "flex items-start gap-2.5";

  const messageBubbleClassNames = isCurrentUser
    ? "flex flex-col gap-1 max-w-[320px] items-end"
    : "flex flex-col gap-1 max-w-[320px]";

  const messageContentClassNames = isCurrentUser
    ? "flex flex-col leading-1.5 p-4 border-indigo-200 bg-indigo-100 rounded-b-xl rounded-tl-xl rounded-bl-xl"
    : "flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl";

  const usernameClassNames = isCurrentUser
    ? "text-sm font-semibold text-indigo-900"
    : "text-sm font-semibold text-gray-900";

  return (
    <div className={messageClassNames}>
      <div className={messageBubbleClassNames}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className={usernameClassNames}>
            {senderUsername}
          </span>
          <span className="text-xs font-normal text-gray-500">
            {timestamp.toString()}
          </span>
        </div>
        <div className={messageContentClassNames}>
          <p className="text-sm font-normal text-gray-900"> {content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
