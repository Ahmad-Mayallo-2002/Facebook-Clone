import { mainEndPoint } from "@/assets/assets";
import { emotionList } from "@/enums/emotions";
import type { React } from "@/interface/react";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

export default function EmotionsDialog({ reacts }: { reacts: React[] }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="emotions-dialog">
        {/* Trigger */}
        <button
          onClick={() => {
            setShow(!show);
            document.body.style.overflow = "hidden";
          }}
          className="trigger flex w-fit cursor-pointer"
        >
          {emotionList.map((e, i) => (
            <img src={e.icon} key={i} className={i ? "-ml-[5px]" : ""} />
          ))}
        </button>
        {/* Backdrop */}
        <div
          hidden={!show}
          className="backdrop"
          onClick={() => {
            setShow(false);
            document.body.style.overflow = "initial";
          }}
        ></div>
        {/* Content */}
        <div
          hidden={!show}
          className="content dialog-content rounded-lg center-absolute"
        >
          <header className="center-y justify-between p-3">
            <h4 className="text-black">All Emotions</h4>
            <button
              onClick={() => setShow(false)}
              className="rounded-full p-3 cursor-pointer hover:bg-gray-100 text-black"
            >
              <FaX />
            </button>
          </header>

          <hr className="py-2 h-[1px]" />

          <ul className="p-4 pt-0 space-y-2 max-h-[300px] overflow-y-auto">
            {reacts.map((react) => (
              <li key={react.id} className="center-y justify-between">
                <div className="user">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={
                      react.user?.image.public_id
                        ? react.user?.image.url
                        : mainEndPoint + react.user?.image.url
                    }
                    alt="asd"
                  />
                </div>
                <span>
                  {emotionList.map(
                    ({ name, icon }, i) =>
                      react.value === name && <img key={i} src={icon} />,
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
