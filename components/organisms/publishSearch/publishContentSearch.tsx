"use client";

import React, { useState } from "react";
import { toEnglishDigit } from "@utils/index";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishSearchContentSchema } from "@components/organisms/publishSearch/validation.yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchIcon } from "@components/atoms/icons";
import { cn } from "@/utils/cn";
import PublishSearchResult from "@components/organisms/publishSearch/publishContentSearchResult";

interface IForm {
  searchText: string;
}

const PublishContentSearch = () => {
  const params = useParams();
  const idParam = params?.id;
  const decodeId = toEnglishDigit(
    decodeURIComponent(Array.isArray(idParam) ? idParam[0] : idParam ?? "")
  );

  const [showResult, setShowResult] = useState(false);
  const [searchText, setSearchText] = useState("");

  const form = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(publishSearchContentSchema),
  });

  const onSubmit = (formData: IForm) => {
    setSearchText(formData.searchText);
    setShowResult(true);
  };

  return (
    <div className="flex h-full w-full flex-wrap justify-between xs:h-auto">
      <div className="flex w-full flex-wrap items-start gap-5 py-4">
        <Form {...form}>
          <form
            className="flex w-full flex-col gap-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="searchText"
              render={({ field }) => {return (
                <FormItem className="w-full">
                  <FormLabel className="label !text-[11px]">
                    متن جست و جو
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder="متن جست و جو"
                        className={cn(
                          "flex h-8 w-full items-center gap-2 py-0 pl-2 pr-3 placeholder:text-[11px]",
                          "text-right font-iranYekan text-[11px] font-normal text-primary_normal",
                          "border-none bg-gray-50 placeholder:text-placeholder",
                          "focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-normal focus:font-iranYekan"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      variant="outline"
                      size="icon"
                      type="submit"
                      disabled={!form.formState.isDirty || !form.formState.isValid}
                      className="h-8 w-10 border-blue-gray-200 p-0 hover:bg-gray-100"
                    >
                      <SearchIcon className="h-6 w-6 stroke-gray-700" />
                    </Button>
                  </div>
                  <FormMessage className="warning_text" />
                </FormItem>
              );}}
            />
          </form>
        </Form>

        {showResult ? (
          <PublishSearchResult searchText={searchText} id={+decodeId} />
        ) : null}
      </div>
    </div>
  );
};

export default PublishContentSearch;