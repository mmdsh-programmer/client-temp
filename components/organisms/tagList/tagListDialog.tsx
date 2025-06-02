import { Button, DialogBody, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { deleteTagAtom, editTagAtom, tagDrawerAtom } from "@atom/tag";
import { useRecoilState, useRecoilValue } from "recoil";
import { Spinner } from "@components/atoms/spinner";
import ChipMolecule from "@components/molecules/chip";
import InfoDialog from "@components/templates/dialog/infoDialog";
import TagCreateDialog from "../dialogs/tag/tagCreateDialog";
import TagDeleteDialog from "../dialogs/tag/tagDeleteDialog";
import TagEditDialog from "../dialogs/tag/tagEditDialog";
import TagMenu from "@components/molecules/tagMenu/tagMenu";
import { repoAtom } from "@atom/repository";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";
import useGetTags from "@hooks/tag/useGetTags";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  repoId: number;
}

const TagListDialog = ({ setOpen, repoId }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [getEditTagModal, setEditTagModal] = useRecoilState(editTagAtom);
  const [getDeleteTagModal, setDeleteTagModal] = useRecoilState(deleteTagAtom);
  const openTagActionDrawer = useRecoilValue(tagDrawerAtom);

  const [openTagCreateModal, setOpenTagCreateModal] = useState(false);

  const { data: userInfo } = useGetUser();
  const { data: getDomainTags, isLoading: isLoadingDomainTags } = useGetDomainTags(
    20,
    !!userInfo?.domainConfig.useDomainTag,
  );

  const { data: getTags, isLoading: isLoadingRepoTags } = useGetTags(
    repoId,
    undefined,
    20,
    !userInfo?.domainConfig.useDomainTag,
  );

  const handleClose = () => {
    setOpen(false);
  };

  const adminRole = getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

  const isLoading = isLoadingRepoTags || isLoadingDomainTags;
  const tags = userInfo?.domainConfig.useDomainTag ? getDomainTags : getTags;

  if (openTagCreateModal) {
    return <TagCreateDialog setOpen={setOpenTagCreateModal} />;
  }
  if (getEditTagModal) {
    return <TagEditDialog setOpen={setEditTagModal} />;
  }
  if (getDeleteTagModal) {
    return <TagDeleteDialog setOpen={setDeleteTagModal} />;
  }

  return (
    <InfoDialog dialogHeader="لیست تگ‌ها" setOpen={handleClose} className="tag-list-dialog">
      <DialogBody placeholder="dialog body" className="dialog-body h-full p-0">
        <div className="h-full px-5 py-3 xs:p-6">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner className="text-primary h-6 w-6" />
            </div>
          ) : (
            <>
              <div className="tag-list hidden flex-wrap gap-2 xs:flex">
                {!userInfo?.domainConfig.useDomainTag && adminRole ? (
                  <div
                    onClick={() => {
                      setOpenTagCreateModal(true);
                    }}
                  >
                    <ChipMolecule
                      value="افزودن تگ"
                      className="create-tag h-6 border-[1px] border-dashed border-normal bg-primary px-2 text-placeholder"
                    />
                  </div>
                ) : null}
                {tags?.pages.map((page) => {
                  return page.list.map((tag) => {
                    return (
                      <div key={tag.id}>
                        <ChipMolecule
                          value={tag.name}
                          key={tag.id}
                          className="tag-item h-6 max-w-[150px] bg-gray-50 px-2 text-primary_normal"
                          actionIcon={
                            !userInfo?.domainConfig.useDomainTag && adminRole ? (
                              <TagMenu tag={tag} />
                            ) : null
                          }
                        />
                      </div>
                    );
                  });
                })}
              </div>
              <div className="tag-list flex h-full flex-col justify-between xs:hidden">
                <ul className="flex h-full flex-col gap-y-2">
                  {tags?.pages.map((page) => {
                    return page.list.map((tag) => {
                      return (
                        <li
                          key={tag.id}
                          className="tag-item flex items-center justify-between rounded-lg px-2 py-1  hover:bg-gray-50"
                        >
                          <Typography className="label_l2 cursor-default lowercase text-primary_normal">
                            {tag.name}
                          </Typography>
                          {!userInfo?.domainConfig.useDomainTag && adminRole ? (
                            <TagMenu tag={tag} />
                          ) : null}
                        </li>
                      );
                    });
                  })}
                </ul>
                {!userInfo?.domainConfig.useDomainTag && adminRole ? (
                  <div className="w-full self-end">
                    <Button
                      className="create-tag w-full bg-secondary hover:bg-secondary active:bg-secondary"
                      onClick={() => {
                        setOpenTagCreateModal(true);
                      }}
                    >
                      <Typography className="text__label__button text-white">افزودن تگ</Typography>
                    </Button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </DialogBody>
      {openTagActionDrawer ? <TagMenu showDrawer /> : null}
    </InfoDialog>
  );
};

export default TagListDialog;
