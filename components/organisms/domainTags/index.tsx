import { deleteTagAtom, editTagAtom } from "@atom/tag";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import TagCreate from "../dialogs/tag/tagCreateDialog";
import TagDelete from "../dialogs/tag/tagDeleteDialog";
import TagEdit from "../dialogs/tag/tagEditDialog";
import ChipMolecule from "@components/molecules/chip";
import TagMenu from "@components/molecules/tagMenu/tagMenu";
import { Spinner } from "@components/atoms/spinner";

const DomainTags = () => {
  const [openTagCreateModal, setOpenTagCreateModal] = useState(false);
  const [getEditTagModal, setEditTagModal] = useRecoilState(editTagAtom);
  const [getDeleteTagModal, setDeleteTagModal] = useRecoilState(deleteTagAtom);
  const { data: getDomainTags, isLoading: isLoadingDomainTags } = useGetDomainTags(20, true);

  const renderDialogs = () => {
    if (getDeleteTagModal) {
      return <TagDelete setOpen={setDeleteTagModal} />;
    }
    if (getEditTagModal) {
      return <TagEdit setOpen={setEditTagModal} />;
    }
    return null;
  };

  const isLoading = isLoadingDomainTags;
  const tags = getDomainTags;

  return (
    <div className="p-5">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Spinner className="text-primary" />
        </div>
      ) : (
        <div className="tag-list flex flex-wrap gap-2">
          {tags?.pages.map((page) => {
            return page.list.map((tag) => {
              return (
                <ChipMolecule
                  value={tag.name}
                  key={tag.id}
                  className="tag-item h-6 max-w-[150px] bg-gray-50 px-2 text-primary_normal "
                  actionIcon={<TagMenu tag={tag} />}
                />
              );
            });
          })}
          <div
            onClick={() => {
              setOpenTagCreateModal(true);
            }}
          >
            <ChipMolecule
              value="افزودن تگ"
              className="createTag h-6 border-[1px] border-dashed border-normal bg-primary px-2 text-placeholder"
            />
          </div>
        </div>
      )}
      {renderDialogs()}
      {openTagCreateModal && <TagCreate setOpen={setOpenTagCreateModal} />}
    </div>
  );
};

export default DomainTags;
