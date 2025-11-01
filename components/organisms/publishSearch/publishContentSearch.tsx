import React, { useState } from "react";
import { toEnglishDigit } from "@utils/index";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishSearchContentSchema } from "./validation.yup";
import { Button, Input, Typography } from "@material-tailwind/react";
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
        <form className="flex w-full flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label !text-[11px]">
            متن جست و جو
          </Typography>
          <div className="flex items-center gap-2">
            <Input
              {...({} as React.ComponentProps<typeof Input>)}
              labelProps={{ className: "before:content-none after:content-none" }}
              containerProps={{ className: "!min-w-0 !h-8" }}
              className="flex !h-full !min-w-full !max-w-full items-center gap-2 border-[1px] !border-none !border-normal !bg-gray-50 !py-0 pl-2 pr-3 text-right !font-iranYekan text-[11px] font-normal text-primary_normal placeholder:font-iranYekan placeholder:text-[11px] placeholder:!text-placeholder placeholder:!opacity-100 focus:!border-normal focus:font-iranYekan"
              id="repo-key-name"
              placeholder="متن جست و جو"
              {...register("searchText")}
            />
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              disabled={!isDirty || !isValid}
              className="h-8 w-10 !p-0 border-blue-gray-200"
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
