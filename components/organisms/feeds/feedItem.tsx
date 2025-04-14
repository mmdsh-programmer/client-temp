import React, { useState } from "react";
import { IFeedItem, IFeedItemMetadata } from "@interface/feeds.interface";
import { FaDateFromTimestamp } from "@utils/index";
import ImageComponent from "@components/atoms/image";

interface IProps {
  feed: IFeedItem;
}

const FeedItem = ({ feed }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { image, link } = JSON.parse(feed.metadata) as IFeedItemMetadata;
  const iamgeUrl = image
    ? `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${image}?&checkUserGroupAccess=true&time=${Date.now()})`
    : "/no-image.jpg";

  const Wrapper = link ? "a" : "div";
  const wrapperProps = link
    ? {
        href: link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "block",
      }
    : {};

  return (
    <Wrapper {...wrapperProps}>
      <article className="flex gap-6 p-2 rounded-xl border border-[#eeeeef] hover:bg-gray-50 transition-colors">
        <div className="col w-fit flex-none">
          <ImageComponent
            width={165}
            height={110}
            src={iamgeUrl}
            alt={feed.name}
            className="rounded object-contain w-[165px] h-[110px]"
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
            style={{ whiteSpace: "pre-line" }}
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
    </Wrapper>
  );
};

export default FeedItem;
