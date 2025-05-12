import { VscBellSlash } from "react-icons/vsc";

function Notifications() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 pt-12">
      <VscBellSlash className="text-gray-400 w-10 h-10 mb-3" />
      <h2 className="text-base font-semibold text-gray-700 mb-1">
        No notifications yet
      </h2>
      <p className="text-xs text-gray-500">
        You’ll see updates here when they arrive.
      </p>
    </div>
  );
}

export default Notifications;
