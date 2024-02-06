import Message from "./Message";

const MessageList: React.FC = () => {
  // listen to database updates here

  return (
    <div className="flex flex-col h-full overflow-auto">
      <ul className="space-y-5 mt-auto">
        <Message />
      </ul>
    </div>
  );
};

export default MessageList;
