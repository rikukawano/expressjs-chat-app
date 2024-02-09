import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createChannel } from "../services/chatService";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CreateChannelComponentProps {
  channels: { id: string; name: string }[];
}

export default function CreateChannelComponent({
  channels,
}: CreateChannelComponentProps) {
  const [showInputField, setShowInputField] = useState<boolean>(false);

  // Function to close the input field when clicking outside of the component
  const closeInputField = (event: MouseEvent) => {
    if (!(event.target as Element).closest("#create-channel-component")) {
      setShowInputField(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeInputField);
    return () => window.removeEventListener("click", closeInputField);
  }, []);

  return (
    <div id="create-channel-component">
      {showInputField ? (
        <CreateChannelInputField
          setShowInputField={setShowInputField}
          channels={channels}
        />
      ) : (
        <button
          className="text-indigo-600 hover:bg-indigo-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold mt-2 w-full"
          onClick={(event) => {
            event.stopPropagation(); // Prevent click event from bubbling
            setShowInputField(true);
          }}
        >
          <PlusIcon className="text-indigo-600 h-6 w-6 shrink-0" />
          Create a channel
        </button>
      )}
    </div>
  );
}

interface CreateChannelInputFieldProps {
  setShowInputField: Dispatch<SetStateAction<boolean>>;
  channels: { id: string; name: string }[];
}

function CreateChannelInputField({
  setShowInputField,
  channels,
}: CreateChannelInputFieldProps) {
  const [value, setValue] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isError) setIsError(false);
    const transformedValue = event.target.value.replace(/\s+/g, "-");
    setValue(transformedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value.length !== 0) {
      // Prevent creation of same channel name
      if (channels.some((channel) => channel.name === value)) {
        setIsError(true);
        return;
      }

      createChannel(value);
      setValue("");
      setShowInputField(false);
    }
  };

  return (
    <>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Enter your channel name"
          autoFocus
          className={classNames(
            isError ? "bg-red-50 border border-red-500" : " ring-indigo-600",
            "block w-full rounded-md py-1.5 pl-2 pr-10 text-gray-900 shadow-sm ring-2 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          )}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            Enter
          </kbd>
        </div>
      </div>
      {isError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Too late!</span> Name's already taken.
        </p>
      )}
    </>
  );
}
