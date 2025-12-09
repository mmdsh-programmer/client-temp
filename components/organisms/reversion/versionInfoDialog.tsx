import React from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import useGetVersionInfo from "@hooks/version/reversion/useGetVersionInfo";
import { useVersionStore } from "@store/version";
import { useDocumentStore } from "@store/document";
import { useEditorStore } from "@store/editor";
import { RenderClientSideContent, RenderServerSideContent } from "clasor-content-preview";
import { IGetSpecificVersion } from "clasor-content-preview/dist/interface/contentPreview.interface";
import { Spinner } from "@components/atoms/spinner";
import useRepoId from "@hooks/custom/useRepoId";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionInfoDialog = ({ setOpen }: IProps) => {
  const currentPath = usePathname();
  const repoId = useRepoId();
  const { selectedDocument } = useDocumentStore();
  const { selectedVersion } = useVersionStore();
  const { versionIndex } = useEditorStore();

  const { data: userInfo } = useGetUser();
  const { data: getVersionInfo, isLoading } = useGetVersionInfo(
    repoId!,
    selectedDocument!.id,
    selectedVersion!.id,
    versionIndex!,
    false,
    currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== selectedDocument?.repoId),
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <InfoDialog
      setOpen={handleClose}
      dialogHeader="اطلاعات نسخه"
      className="join-to-repo-requests__dialog h-full w-full xs:!min-h-[500px] xs:!min-w-[550px] xs:!max-w-[550px]"
      backToMain
    >
      <DialogBody
        {...({} as React.ComponentProps<typeof DialogBody>)}
        className="h-[200px] flex-grow overflow-auto"
      >
        {isLoading ? (
          <div className="flex h-full w-full justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <>
            <RenderClientSideContent podSpaceServer={`${process.env.NEXT_PUBLIC_PODSPACE_API}/`} />
            <RenderServerSideContent
              versionData={{ content: getVersionInfo?.content } as unknown as IGetSpecificVersion}
              className="!p-0"
              displayOutline={false}
            />
          </>
        )}
      </DialogBody>
    </InfoDialog>
  );
};

export default VersionInfoDialog;
