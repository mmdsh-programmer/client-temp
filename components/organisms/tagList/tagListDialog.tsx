import React, { useState } from "react";
import {
  Button,
  DialogBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { deleteTagAtom, editTagAtom, tagDrawerAtom } from "@atom/tag";
import { useRecoilState, useRecoilValue } from "recoil";
import ChipMolecule from "@components/molecules/chip";
import InfoDialog from "@components/templates/dialog/infoDialog";
import TagCreateDialog from "../dialogs/tag/tagCreateDialog";
import TagDeleteDialog from "../dialogs/tag/tagDeleteDialog";
import TagEditDialog from "../dialogs/tag/tagEditDialog";
import TagMenu from "@components/molecules/tagMenu/tagMenu";
import { repoAtom } from "@atom/repository";
import useGetTags from "@hooks/tag/useGetTags";
import useGetUser from "@hooks/auth/useGetUser";
import useGetDomainTags from "@hooks/domainTags/useGetDomainTags";

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
  const { data: getDomainTags, isLoading: isLoadingDomainTags } =
    useGetDomainTags(20, !!userInfo?.domainConfig.useDomainTag);

  const { data: getTags, isLoading: isLoadingRepoTags } = useGetTags(
    repoId,
    undefined,
    20,
    !userInfo?.domainConfig.useDomainTag
  );

  const handleClose = () => {
    setOpen(false);
  };

  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

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
    <InfoDialog dialogHeader="لیست تگ‌ها" setOpen={handleClose}>
      <DialogBody placeholder="dialog body" className="p-0 h-full">
        <div className="h-full px-5 py-3 xs:p-6">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner color="purple" className="" />
            </div>
          ) : (
            <>
                <div className="hidden xs:flex flex-wrap gap-2">
                  {(!!userInfo?.domainConfig.useDomainTag && userInfo?.domainRole === "owner")
                    || (!userInfo?.domainConfig.useDomainTag && adminRole) ? <div
                      onClick={() => {
                        setOpenTagCreateModal(true);
                      }}
                    >
                    <ChipMolecule
                      value="افزودن تگ"
                      className="border-[1px] h-6 px-2 border-dashed border-normal bg-primary text-placeholder"
                    />
                  </div> : null}
                {tags?.pages.map((page) => {
                  return page.list.map((tag) => {
                    return (
                      <div key={tag.id}>
                        <ChipMolecule
                          value={tag.name}
                          key={tag.id}
                          className="bg-gray-50 h-6 px-2 text-primary max-w-[150px]"
                          actionIcon={adminRole ? <TagMenu tag={tag} /> : null}
                        />
                      </div>
                    );
                  });
                })}
              </div>
              <div className="xs:hidden flex flex-col h-full justify-between">
                <ul className="h-full flex flex-col gap-y-2">
                  {tags?.pages.map((page) => {
                    return page.list.map((tag) => {
                      return (
                        <li
                          key={tag.id}
                          className="flex py-1 px-2 rounded-lg justify-between items-center  hover:bg-gray-50"
                        >
                          <Typography className="label_l2 text-primary cursor-default lowercase">
                            {tag.name}
                          </Typography>
                          {adminRole ? <TagMenu tag={tag} /> : null}
                        </li>
                      );
                    });
                  })}
                </ul>
                <div className="w-full self-end">
                  <Button
                    className="w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
                    onClick={() => {
                      setOpenTagCreateModal(true);
                    }}
                  >
                    <Typography className="text__label__button text-white">
                      افزودن تگ
                    </Typography>
                  </Button>
                </div>
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
