import React from "react";
import DocumentIcon from "../documentIcon";
import DocumentMenu from "../documentMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { IDocumentMetadata } from "@interface/document.interface";
import TableCell, { ITableCell } from "../tableCell";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import Checkbox from "@components/atoms/checkbox";
import { useBulkStore } from "@store/bulk";
import { useCategoryStore } from "@store/category";
import { EDocumentTypes } from "@interface/enums";
import useCollaborateFormVersion from "@hooks/formVersion/useCollaborateFormVersion";
import useAutoLoginCode from "@hooks/autoLogin/useAutoLoginCode";
import useRepoId from "@hooks/custom/useRepoId";
import { useRepositoryStore } from "@store/repository";
import useCreateLastVersionLink from "@hooks/version/useCreateLastVersionLink";

interface IProps {
  document: IDocumentMetadata;
}

const DocumentTableRow = ({ document }: IProps) => {
  const currentPath = usePathname();
  const { repo: getRepo } = useRepositoryStore();
  const { setBulkItems, bulkItems: getBulkItems } = useBulkStore();
  const { category: selectedCat } = useCategoryStore();

  const repoId = useRepoId();

  const { data: userInfo } = useGetUser();
  const createLastVersionLink = useCreateLastVersionLink();
  const collaborateFrom = useCollaborateFormVersion();
  const autoLogin = useAutoLoginCode();

  const repoUserGroupHash =
    currentPath === "/admin/myDocuments" ||
    (currentPath === "/admin/dashboard" && document?.repoId === userInfo?.repository.id)
      ? userInfo?.repository.userGroupHash
      : getRepo?.userGroupHash;

  const handleRowClick = () => {
    window.metrics?.track("document:open_in_new_tab");
    if (document.contentType === EDocumentTypes.form) {
      if (!repoId) {
        console.error("شناسه مخزن وجود ندارد.");
        return;
      }
      createLastVersionLink.mutate({
        repoId,
        documentId: document.id,
        isDirectAccess:
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" && userInfo?.repository.id !== document?.repoId),
        callBack: (lastVersion) => {
          if (!lastVersion) {
            toast.error("این سند فاقد آخرین نسخه است.");
            return;
          }
          collaborateFrom.mutate({
            repoId,
            documentId: document!.id,
            versionId: lastVersion!.id,
            callBack: () => {
              autoLogin.mutate({
                callBack: (code) => {
                  const url = `${process.env.NEXT_PUBLIC_PODFORM_URL}/app/auto-login?form_Id=${lastVersion!.formId}&auto_login_code=${code}&embed=false`;
                  window.open(url);
                },
              });
            },
          });
        },
      });
    } else {
      const path = selectedCat
        ? `edit?repoId=${document.repoId}&categoryId=${
            selectedCat.id
          }&documentId=${document.id}&repoGroupHash=${
            repoUserGroupHash
          }&catGroupHash=${selectedCat.userGroupHash}&type=${document?.contentType}${
            document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
          }`
        : `edit?repoId=${document.repoId}&documentId=${
            document.id
          }&repoGroupHash=${repoUserGroupHash}&type=${document?.contentType}${
            document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
          }${
            currentPath === "/admin/sharedDocuments" ||
            (currentPath === "/admin/dashboard" && document?.repoId !== userInfo?.repository.id)
              ? "&sharedDocuments=true"
              : ""
          }`;
      window.open(path, "_blank");
    }
  };

  const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked && (getBulkItems as IDocumentMetadata[]).length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمی‌توانید بیش از 10 آیتم را انتخاب کنید");
      return;
    }
    setBulkItems(
      isChecked
        ? [...getBulkItems, document]
        : getBulkItems.filter((item) => {
            return item.id !== document.id;
          }),
    );
  };

  return (
    <TableCell
      key={`document-table-item-${document.id}`}
      onClick={handleRowClick}
      className="document-table-row"
      tableCell={
        [
          currentPath === "/admin/sharedDocuments" || currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <Checkbox
                    onChange={handleCheckItem}
                    checked={getBulkItems.some((bulkItem) => {
                      return bulkItem.id === document.id;
                    })}
                  />
                ),
                stopPropagation: true,
                className: "!pl-0 !pr-3",
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <div className="!h-full !w-[50px] !max-w-[50px] text-center">
                    {document.order || document.order === 0 ? document.order : "--"}
                  </div>
                ),
                title: String(document.order) || "--",
                className: "hidden xl:table-cell !w-[60px] !max-w-[60px] ",
              },
          {
            data: (
              <div className="flex gap-2">
                <div className="!h-5 !w-5">
                  <DocumentIcon document={document} />
                </div>
                <span
                  className="w-auto overflow-hidden truncate text-ellipsis"
                  title={document.name}
                >
                  {document.name}
                </span>
              </div>
            ),
            className: "w-auto max-w-[100px] xs:max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[150px] xl:max-w-[200px] 2xl:max-w-[400px]",
          },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <div className="!h-full !w-[150px] !max-w-[150px] text-center">
                    {document.createdAt ? FaDateFromTimestamp(+document.createdAt) : "--"}
                  </div>
                ),
                title: document.createdAt ? FaDateFromTimestamp(+document.createdAt) : "--",
                className: "!w-[160px] !max-w-[160px] px-0",
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <div className="!h-full !w-[150px] !max-w-[150px] text-center">
                    {document.updatedAt ? FaDateFromTimestamp(+document.updatedAt) : "--"}
                  </div>
                ),
                title: document.updatedAt ? FaDateFromTimestamp(+document.updatedAt) : "--",
                className: "hidden xl:table-cell !w-[160px] !max-w-[160px] px-0",
              },
          {
            data: (
              <div className="!h-full !w-[150px] !max-w-[150px] text-center">
                {document.creator?.name || "--"}
              </div>
            ),
            title: document.creator?.name || "--",
            className: "hidden lg:table-cell !w-[160px] !max-w-[160px] px-0 ",
          },
          {
            data: <DocumentMenu document={document} />,
            stopPropagation: true,
            className: "!px-2",
          },
        ].filter(Boolean) as ITableCell[]
      }
      active={!!document.newOne}
    />
  );
};

export default DocumentTableRow;
