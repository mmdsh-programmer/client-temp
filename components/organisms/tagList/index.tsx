import React, { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { deleteTagAtom, editTagAtom } from "@atom/tag";
import { useRecoilState, useRecoilValue } from "recoil";
import ChipMolecule from "@components/molecules/chip";
import TagCreate from "../dialogs/tag/tagCreateDialog";
import TagDelete from "../dialogs/tag/tagDeleteDialog";
import TagEdit from "../dialogs/tag/tagEditDialog";
import TagListDialog from "./tagListDialog";
import TagMenu from "@components/molecules/tagMenu/tagMenu";
import { repoAtom } from "@atom/repository";
import useGetTags from "@hooks/tag/useGetTags";

const TagList = ({ repoId }: { repoId: number }) => {
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const [openTagCreateModal, setOpenTagCreateModal] = useState(false);
  const [getEditTagModal, setEditTagModal] = useRecoilState(editTagAtom);
  const [getDeleteTagModal, setDeleteTagModal] = useRecoilState(deleteTagAtom);
  const getRepo = useRecoilValue(repoAtom);
  const { data: getTags, isLoading, isFetching } = useGetTags(repoId, 2, true);

  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin" || getRepo.roleName === "editor";

  const tagCount = getTags?.pages[0].total;

  const renderDialogs = () => {
    if (openTagsModal && getRepo) {
      return <TagListDialog setOpen={setOpenTagsModal} repoId={getRepo.id} />;
    }
    if (getDeleteTagModal && !openTagsModal) {
      return <TagDelete setOpen={setDeleteTagModal} />;
    }
    if (getEditTagModal && !openTagsModal) {
      return <TagEdit setOpen={setEditTagModal} />;
    }
    return null;
  };

  return (
    <div className="">
      {isLoading || isFetching ? (
        <Spinner color="deep-purple" className="" />
      ) : (
        <div className="flex flex-wrap gap-2">
          {getTags?.pages.map((page) => {
            return page.list.map((tag) => {
              return (
                <ChipMolecule
                  value={tag.name}
                  key={tag.id}
                  className="bg-gray-50 h-6 px-2 text-primary max-w-[150px] "
                  actionIcon={adminRole ? <TagMenu tag={tag} /> : null}
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
                className="repoTags border-[1px] h-6 px-2 border-dashed border-normal bg-primary text-placeholder"
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
      {renderDialogs()}
      {!openTagsModal ? <TagMenu showDrawer /> : null}
      {openTagCreateModal && <TagCreate setOpen={setOpenTagCreateModal} />}
    </div>
  );
};

export default TagList;
