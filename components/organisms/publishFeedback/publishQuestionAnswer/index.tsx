import React, { useState } from "react";
import CreateQuestion from "./createQuestion";
import { usePublishStore } from "@store/publish";
import QuestionList from "./questionList";
import { Button, Typography } from "@material-tailwind/react";
import { AddIcon } from "@components/atoms/icons";
import PublishForceLogin from "../publishForceLogin";
import useGetUser from "@hooks/auth/useGetUser";

const PublishQuestionAnswer = () => {
  const [createQuestion, setCreateQuestion] = useState(false);

  const getPublishVersion = usePublishStore();

  const { data: userInfo } = useGetUser();

  if (!userInfo) {
    return (
      <div className="mt-8">
        <PublishForceLogin />
      </div>
    );
  }

  return getPublishVersion ? (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex w-full justify-end px-4">
        <Button
          className="items-center gap-2 self-end rounded-lg bg-primary-normal px-4"
          onClick={() => {
            setCreateQuestion(true);
          }}
          {...({} as React.ComponentProps<typeof Button>)}
        >
          <AddIcon className="h-5 w-5 stroke-white" />
          <Typography
            {...({} as React.ComponentProps<typeof Typography>)}
            className="text-xs text-gray-800 text-white"
          >
            ایجاد پرسش جدید
          </Typography>
        </Button>
      </div>

      <hr className="h-[2px] w-full bg-blue-gray-50" />
      <QuestionList />
      {createQuestion ? <CreateQuestion setOpen={setCreateQuestion} /> : null}
    </div>
  ) : null;
};

export default PublishQuestionAnswer;
