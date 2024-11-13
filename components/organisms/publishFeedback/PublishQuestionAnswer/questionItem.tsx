import { ChevronLeftIcon } from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import AnswerDialog from "@components/organisms/dialogs/publish/answerDialog";
import LikeAndDislike from "@components/organisms/like&dislike";
import { IQAList } from "@interface/qa.interface";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import React, { useState } from "react";
import QuestionAnswerLikeAndDislike from "./questionAnswerLikeAndDislike";

interface IProps {
  questionItem: IQAList;
  children?: JSX.Element;
  isAnwer?: boolean;
}

const QuestionItem = ({ questionItem, children, isAnwer }: IProps) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);

  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const handleOpenAnswer = () => {
    setOpenAnswer(true);
  };

  return (
    <>
      <Card
        shadow={false}
        className={`w-full pt-[30px] pb-5 px-5 flex flex-col gap-2.5 border-b-2 border-solid border-gray-200 rounded-none ${isAnwer ? "border-r-4 border-r-gray-200 bg-secondary" : "bg-white"}`}
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="flex items-center justify-between gap-2 pt-0 mt-0 mx-0"
        >
          <div className="flex items-center gap-2">
            <h6 className="text-sm text-gray-800 font-bold">
              {questionItem.userSrv.name}
            </h6>
            <span className="text-lg text-gray-500">{"\u2022"}</span>
            <time
              className="text-xs text-gray-500"
              dateTime={FaDateFromTimestamp(questionItem.timestamp)}
            >
              {FaDateFromTimestamp(questionItem.timestamp)}
            </time>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-base text-gray-500 border-l border-solid border-gray-500 pl-2">
              {questionItem.rate.rateCount}
            </span>
            <Rating dir="ltr" value={questionItem.rate.rateCount} readonly />
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <Typography className="text-[13px] leading-7 text-right text-gray-800">
            {questionItem.content}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center p-0 gap-2 justify-between">
          <RenderIf isTrue={!isAnwer}>
            <div className="flex items-center gap-2">
              <Button
                ripple={false}
                variant="text"
                className="border-none !p-0 flex gap-1 items-center"
                onClick={handleOpenCollapse}
              >
                <span className="text-[13px] leading-5 text-gray-500">
                  مشاهده بیشتر
                </span>

                <ChevronLeftIcon
                  className={`align-middle w-2.5 h-2.5 stroke-gray-500 transition-all duration-200 ${openCollapse ? "rotate-90" : "-rotate-90"}`}
                />
              </Button>
              <span className="text-lg text-gray-500">{"\u2022"}</span>
              <Button
                variant="text"
                className="border-none !p-0 text-[13px] leading-5 text-link"
                onClick={handleOpenAnswer}
              >
                پاسخ به پرسش
              </Button>
            </div>
          </RenderIf>

          <QuestionAnswerLikeAndDislike
            wrapperClassName="gap-5 mr-auto"
            likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            iconClassName="w-7 h-7 !stroke-gray-500"
            counterClassName="ml-1 text-base text-gray-500"
            showCounter
            item={questionItem}
          />
        </CardFooter>
      </Card>

      <RenderIf isTrue={!isAnwer}>
        <Collapse open={openCollapse}>
          <div className="pr-3 sm:pr-12">{openCollapse ? children : null}</div>
        </Collapse>
      </RenderIf>

      <RenderIf isTrue={!isAnwer && openAnswer}>
        <AnswerDialog
          setOpen={() => {
            return setOpenAnswer(!openAnswer);
          }}
        />
      </RenderIf>
    </>
  );
};

export default QuestionItem;
