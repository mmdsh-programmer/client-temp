import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import useGetTags from "@hooks/tag/useGetTags";
import { Button, Spinner } from "@material-tailwind/react";
import ChipMolecule from "@components/molecules/chip";
import TagMenu from "./tagMenu";
import TagCreate from "../dialogs/tag/tagCreateDialog";
import TagListDialog from "./tagListDialog";
import { deleteTagAtom, editTagAtom } from "@atom/tag";
import TagDelete from "../dialogs/tag/tagDeleteDialog";
import TagEdit from "../dialogs/tag/tagEditDialog";

const TagList = () => {
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const [openTagCreateModal, setOpenTagCreateModal] = useState(false);
  const [getEditTagModal, setEditTagModal] = useRecoilState(editTagAtom);
  const [getDeleteTagModal, setDeleteTagModal] = useRecoilState(deleteTagAtom);
  const getRepo = useRecoilValue(repoAtom);
  const {
    data: getTags,
    isLoading,
    isFetching,
  } = useGetTags(getRepo?.id, 2, true);

  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

  const tagCount = getTags?.pages[0].total;

  return (
    <div className="">
      {isLoading || isFetching ? (
        <Spinner color="purple" className="" />
      ) : (
        <div className="flex flex-wrap gap-2">
          {getTags?.pages.map((page) => {
            return page.list.map((tag) => {
              return (
                <ChipMolecule
                  value={tag.name}
                  key={tag.id}
                  className="bg-gray-50 h-6 px-2 text-primary max-w-[150px] "
                  icon={<TagMenu tag={tag} />}
                />
              );
            });
          })}
          {adminRole ? (
            <div
              onClick={() => {
                setOpenTagCreateModal(true);
              }}
            >
              <ChipMolecule
                value="افزودن تگ"
                className="border-[1px] h-6 px-2 border-dashed border-normal bg-primary text-placeholder"
              />
            </div>
          ) : null}
          {tagCount && tagCount > 2 ? (
            <Button
              onClick={() => {
                setOpenTagsModal(true);
              }}
              placeholder=""
              className="shadow-none hover:shadow-none p-0 font-iranYekan bg-transparent text-gray-400 text-[10px]"
            >
              نمایش بیشتر
            </Button>
          ) : null}
        </div>
      )}
      {openTagsModal ? (
        <TagListDialog setOpen={setOpenTagsModal} />
      ) : getDeleteTagModal && !openTagsModal ? (
        <TagDelete setOpen={setDeleteTagModal} />
      ) : (
        getEditTagModal &&
        !openTagsModal && <TagEdit setOpen={setEditTagModal} />
      )}
      {!openTagsModal ? <TagMenu showDrawer={true} /> : null}
      {openTagCreateModal && <TagCreate setOpen={setOpenTagCreateModal} />}
    </div>
  );
};

export default TagList;
