import { FaFacebook } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="w-screen h-screen center bg-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <FaFacebook className="text-6xl text-blue-600 animate-pulse" />
        <div className="flex gap-2">
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
