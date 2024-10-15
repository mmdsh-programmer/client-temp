/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import { selectedDocumentAtom, tempDocTagAtom } from "@atom/document";
import { useRecoilState, useRecoilValue } from "recoil";

import DocumentTagList from "@components/organisms/document/documentTagList";
import LoadingButton from "@components/molecules/loadingButton";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import TagCreateDialog from "../dialogs/tag/tagCreateDialog";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import useGetTags from "@hooks/tag/useGetTags";

const EditorTags = () => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const [getTempDocTag, setTempDocTag] = useRecoilState(tempDocTagAtom);
  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false);
  const [tagName, setTagName] = useState<string | number>("");

  const repoId = getRepo!.id;
  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

  const { data: getTags, isLoading } = useGetTags(repoId, 30, true);

  const editDocument = useEditDocument();

  const updatedAvailableTags = getTags?.pages[0].list
    .filter((repoTag) => {
      return getTempDocTag.every((tag) => {
        return tag !== +repoTag.id;
      });
    })
    .map((tag) => {
      return {
        label: tag.name,
        value: tag.id,
      };
    });

  const documentTags = getTags?.pages[0].list.filter((repoTag) => {
    return getTempDocTag.includes(+repoTag.id);
  });

  const handleSubmit = async () => {
    if (!getRepo || !document) return;
    if (!getTempDocTag) return;
    editDocument.mutate({
      repoId: getRepo.id,
      documentId: document.id,
      categoryId: document.categoryId,
      title: document.name,
      contentType: document.contentType,
      tagIds: getTempDocTag,
      callBack: () => {
        toast.success("تگ‌ها با موفقیت به سند اضافه شدند.");
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full justify-between gap-5 px-6 py-4"
    >
      {isLoading ? (
        <Spinner className="h-5 w-5" color="deep-purple" />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex-grow">
            <SearchableDropdown
              options={updatedAvailableTags}
              background="bg-gray-50"
              handleChange={(val) => {
                setTagName(val.value);
                return setTempDocTag((oldValue: number[]) => {
                  return [...oldValue, val.value as number];
                });
              }}
              setOpen={setOpenCreateTagDialog}
            />
          </div>
          <DocumentTagList tagList={documentTags} />
        </div>
      )}
      {adminRole ? (
        <LoadingButton
          className="!w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSubmit}
          loading={editDocument.isPending}
        >
          <Typography className="text__label__button text-white">
            ارسال
          </Typography>
        </LoadingButton>
      ) : null}
      {openCreateTagDialog ? (
        <TagCreateDialog
          name={tagName}
          setOpen={() => {
            return setOpenCreateTagDialog(false);
          }}
        />
      ) : null}
    </form>
  );
};

export default EditorTags;
