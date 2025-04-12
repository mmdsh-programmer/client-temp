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
import useGetUser from "@hooks/auth/useGetUser";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";

const TagList = ({ repoId }: { repoId: number }) => {
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const [openTagCreateModal, setOpenTagCreateModal] = useState(false);
  const [getEditTagModal, setEditTagModal] = useRecoilState(editTagAtom);
  const [getDeleteTagModal, setDeleteTagModal] = useRecoilState(deleteTagAtom);
  const getRepo = useRecoilValue(repoAtom);

  
  const { data: userInfo } = useGetUser();
  const { data: getDomainTags, isLoading: isLoadingDomainTags } =
    useGetDomainTags(2, !!userInfo?.domainConfig.useDomainTag);
  
    const { data: getTags, isLoading: isLoadingRepoTags } = useGetTags(
    repoId,
    undefined,
    2,
    !userInfo?.domainConfig.useDomainTag
  );

  const adminRole =
    getRepo?.roleName === "owner" ||
    getRepo?.roleName === "admin" ||
    getRepo?.roleName === "editor";

  const tagCount = userInfo?.domainConfig.useDomainTag
    ? getDomainTags?.pages[0].total
    : getTags?.pages[0].total;

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

  const isLoading = isLoadingRepoTags || isLoadingDomainTags;
  const tags = userInfo?.domainConfig.useDomainTag ? getDomainTags : getTags;

  return (
    <div className="">
      {isLoading ? (
        <Spinner color="deep-purple" className="" />
      ) : (
        <div className="tag-list flex flex-wrap gap-2">
          {tags?.pages.map((page) => {
            return page.list.map((tag) => {
              return (
                <ChipMolecule
                  value={tag.name}
                  key={tag.id}
                  className="tag-item bg-gray-50 h-6 px-2 text-primary max-w-[150px] "
                  actionIcon={adminRole ? <TagMenu tag={tag} /> : null}
                />
              );
            });
          })}
          {(!!userInfo?.domainConfig.useDomainTag)
          || (!userInfo?.domainConfig.useDomainTag && adminRole) ? (
            <div
              onClick={() => {
                setOpenTagCreateModal(true);
              }}
            >
              <ChipMolecule
                value="افزودن تگ"
                className="createTag border-[1px] h-6 px-2 border-dashed border-normal bg-primary text-placeholder"
              />
            </div>
          ) : null}
          {tagCount && tagCount > 2 ? (
            <Button
              onClick={() => {
                setOpenTagsModal(true);
              }}
              placeholder=""
              className="all-tags__button shadow-none hover:shadow-none p-0 font-iranYekan bg-transparent text-gray-400 text-[10px]"
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
