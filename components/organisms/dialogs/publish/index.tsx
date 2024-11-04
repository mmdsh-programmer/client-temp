import React, { useState } from "react";
import FormInput from "@components/atoms/input/formInput";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishSearchContentSchema } from "./validation.yup";
import { SearchIcon } from "@components/atoms/icons";
import PublishSearchResult from "@components/organisms/publish/publishSearchResult";
import { useSetRecoilState } from "recoil";
import { openPublishPageSearchContent } from "@atom/publish";

interface IForm {
  searchText: string;
}

const PublishSearchContent = () => {
  const setOpen = useSetRecoilState(openPublishPageSearchContent);
  const [showResult, setShowResult] = useState(false);
  const [searchText, setSearchText] = useState("");

  const form = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(publishSearchContentSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { isDirty, isValid, errors } = formState;

  const onSubmit = (formData: IForm) => {
    setSearchText(formData.searchText);
    setShowResult(true);
  };

  return (
    <InfoDialog dialogHeader="جست و جو در محتوا" setOpen={setOpen}>
      <div className="w-full flex flex-wrap h-full xs:h-auto justify-between">
        <div className="w-full flex flex-wrap gap-5 py-4 px-5 items-start">
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography className="label">متن جست و جو</Typography>
            <div className="flex items-center gap-2">
              <FormInput
                className="w-fit"
                id="repo-key-name"
                placeholder="متن جست و جو"
                register={{ ...register("searchText") }}
              />
              <Button
                disabled={!isDirty || !isValid}
                className="border-blue-gray-200 w-fit max-h-12"
                variant="outlined"
                type="submit"
              >
                <SearchIcon className="stroke-gray-700 w-6 h-6" />
              </Button>
            </div>

            {errors.searchText ? (
              <Typography className="warning_text">
                {errors.searchText?.message}
              </Typography>
            ) : null}
          </form>

          {showResult ? <PublishSearchResult searchText={searchText} /> : null}
        </div>
      </div>
    </InfoDialog>
  );
};

export default PublishSearchContent;
