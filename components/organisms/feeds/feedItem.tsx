import React, { useState } from "react";
import { IFeedItem } from "@interface/feeds.interface";
import Image from "next/image";
import { FaDateFromTimestamp } from "@utils/index";

interface IProps {
  feed: IFeedItem;
}

const FeedItem = ({ feed }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const iamgeUrl = feed?.imageUrl || "/no-image.jpg";

  return (
    <a 
      href={feed?.link || "#"} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block"
    >
      <article className="flex gap-6 p-2 rounded-xl border border-[#eeeeef] hover:bg-gray-50 transition-colors">
        <div className="col w-fit flex-none">
          <Image
            width={165}
            height={110}
            src={iamgeUrl}
            alt={feed.name}
            objectFit="cover"
            className="rounded"
          />
        </div>
        <div className="col flex-1">
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <h6 className="text-lg font-medium font-iranYekan leading-[27px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap w-[36vw]">
              {feed.name}
            </h6>


            <time
              dateTime={FaDateFromTimestamp(feed.timestamp)}
              className="min-w-fit text-[#b4b4b9] text-xs font-normal font-iranYekan leading-tight"
            >
              {FaDateFromTimestamp(feed.timestamp)}
            </time>

          </div>

          <p
            className={`text-[#5d5f69] text-[13px] font-normal mt-2 font-iranYekan leading-snug transition-all duration-300 break-all ${
              isExpanded ? "line-clamp-none" : "line-clamp-1"
            }`}
          >
            {feed.content}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent link navigation when clicking the button
              setIsExpanded(!isExpanded);
            }}
            className="text-xs font-medium font-iranYekan leading-[18px] mt-4 text-purple-normal"
          >
            {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
          </button>
        </div>
      </article>
    </a>
  );
};

export default FeedItem;
