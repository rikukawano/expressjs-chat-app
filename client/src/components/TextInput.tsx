export default function TextInput() {
  return (
    <div className="flex items-center justify-between bg-white border-t border-gray-200 p-4 rounded-lg shadow-lg">
      <textarea
        placeholder="Type your message..."
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none h-12 p-1"
      />
      <button className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Send
      </button>
    </div>
  );
}
