import React, { useState } from "react";
import { toEnglishDigit } from "@utils/index";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishSearchContentSchema } from "./validation.yup";
import { Button, Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import { SearchIcon } from "@components/atoms/icons";
import PublishSearchResult from "./publishContentSearchResult";

interface IForm {
  searchText: string;
}

const PublishContentSearch = () => {
  const params = useParams();
  const idParam = params?.id;
  const decodeId = toEnglishDigit(
    decodeURIComponent(Array.isArray(idParam) ? idParam[0] : (idParam ?? "")),
  );

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
    <div className="flex h-full w-full flex-wrap justify-between xs:h-auto">
      <div className="flex w-full flex-wrap items-start gap-5 py-4">
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">
            متن جست و جو
          </Typography>
          <div className="flex items-center gap-2">
            <FormInput
              className="w-fit"
              id="repo-key-name"
              placeholder="متن جست و جو"
              register={{ ...register("searchText") }}
            />
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              disabled={!isDirty || !isValid}
              className="max-h-12 w-fit border-blue-gray-200"
              variant="outlined"
              type="submit"
            >
              <SearchIcon className="h-6 w-6 stroke-gray-700" />
            </Button>
          </div>

          {errors.searchText ? (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.searchText?.message}
            </Typography>
          ) : null}
        </form>

        {showResult ? <PublishSearchResult searchText={searchText} id={+decodeId} /> : null}
      </div>
    </div>
  );
};

export default PublishContentSearch;
