import React from "react";
import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import { IVersion, IVersionView } from "@interface/version.interface";
import { Typography } from "@material-tailwind/react";
import { EDocumentTypes } from "@interface/enums";
import EmptyList from "@components/molecules/emptyList";
import { LastVersionIcon } from "@components/atoms/icons";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import TableCell from "@components/molecules/tableCell";
import TableHead from "@components/molecules/tableHead";
import VersionMenu from "@components/molecules/versionMenu";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { useEditorStore } from "@store/editor";
import useCollaborateFormVersion from "@hooks/formVersion/useCollaborateFormVersion";
import { useRepositoryStore } from "@store/repository";
import useAutoLoginCode from "@hooks/autoLogin/useAutoLoginCode";


const VersionTableView = ({
  isLoading,
  getVersionList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  lastVersion,
  type,
}: IVersionView) => {
  const { repo } = useRepositoryStore();
  const getSelectedDocument = useDocumentStore((state) => {
    return state.selectedDocument;
  });
  const { setVersionModalList, setSelectedVersion } = useVersionStore();
  const { setEditorData, setEditorMode, setEditorModal } = useEditorStore();
  const collaborateFrom = useCollaborateFormVersion();
  const autoLogin = useAutoLoginCode();

  const listLength = getVersionList?.[0].length;

  const handleOpenEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    setSelectedVersion(value);
    setEditorData(null);
    setEditorMode("preview");
    setEditorModal(true);
    setVersionModalList(false);
  };

  const handleOpenBoardEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    window.open(`http://localhost:8080/board/${value.id}`);
  };

  const handleOpenFormEditor = (value: IVersion) => {
    if (isLoading) {
      return;
    }
    collaborateFrom.mutate({
      repoId: repo!.id,
      documentId: getSelectedDocument!.id,
      versionId: value.id,
      callBack: () => {
        autoLogin.mutate({
          callBack: (code) => {
            // const redirectUri = decodeURIComponent(`${process.env.NEXT_PUBLIC_PODFORM_URL}/app/form/build/${value.formId}`);
            // const redirectUri = `https://podform.sandpod.ir/app/validate`;
            // const loginUrl = `${process.env.NEXT_PUBLIC_ACCOUNTS}/oauth2/authorize/?client_id=18168453xfe98412ea0a164708f9c9288&redirect_uri=${redirectUri}&response_type=code&scope=profile&auto_login_code=${code}`;
            
            const url = `${process.env.NEXT_PUBLIC_PODFORM_URL}/auto-login?form_hash=${value.formHash}&auto_login_code=${code}&embed=false`;
            window.open(url);
          },
        });
      },
    });
  };

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <Spinner className="h-8 w-8 text-primary" />
        </div>
      ) : listLength ? (
        <div className="version-list-table h-[calc(100vh-200px)] w-full overflow-auto rounded-lg border-[0.5px] border-normal">
          <table className="w-full min-w-max overflow-hidden">
            <TableHead
              tableHead={[
                { key: "name", value: "نام نسخه" },
                {
                  key: "creator",
                  value: "ایجاد کننده",
                  className: "hidden md:table-cell",
                },
                { key: "createDate", value: "تاریخ ایجاد" },
                {
                  key: "editDate",
                  value: "تاریخ ویرایش",
                  className: "hidden xl:table-cell",
                },
                { key: "status", value: "وضعیت", className: "version-status" },
                {
                  key: "action",
                  value: "عملیات",
                  className: "version-action flex !justify-end ml-4 ",
                },
              ]}
            />
            <tbody>
              {getVersionList.map((list) => {
                return list.map((version) => {
                  return (
                    <TableCell
                      key={`version-table-item-${version.id}`}
                      className="version-table-item"
                      onClick={() => {
                        if (getSelectedDocument?.contentType === EDocumentTypes.form) {
                          handleOpenFormEditor(version);
                        } else if (getSelectedDocument?.contentType === EDocumentTypes.board) {
                          handleOpenBoardEditor(version);
                        } else {
                          handleOpenEditor(version);
                        }
                      }}
                      tableCell={[
                        {
                          data: version.versionNumber,
                          className: "max-w-[200px] truncate",
                        },
                        {
                          data: version.creator?.name,
                          className: "hidden md:table-cell",
                        },
                        {
                          data: FaDateFromTimestamp(+new Date(version.createDate)),
                        },
                        {
                          data: version.updateDate
                            ? FaDateFromTimestamp(+new Date(version.updateDate))
                            : "_",
                          className: "hidden xl:table-cell",
                        },
                        {
                          data: (
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex flex-wrap gap-1">
                                <div
                                  className={`flex h-6 items-center justify-center rounded-full !px-2 ${
                                    translateVersionStatus(version.status, version.state).className
                                  }`}
                                >
                                  {translateVersionStatus(version.status, version.state).translated}
                                </div>
                                <RenderIf isTrue={version.status === "accepted"}>
                                  <Typography
                                    {...({} as React.ComponentProps<typeof Typography>)}
                                    className="label text-info flex h-6 items-center justify-center rounded-full bg-blue-50 !px-2"
                                  >
                                    عمومی
                                  </Typography>
                                </RenderIf>
                              </div>
                              <RenderIf
                                isTrue={
                                  version.state === "version" &&
                                  lastVersion?.id === version.id &&
                                  (version.status === "private" || version.status === "accepted")
                                }
                              >
                                <>
                                  <LastVersionIcon className="h-5 w-5 fill-green-400" />
                                  <Typography
                                    {...({} as React.ComponentProps<typeof Typography>)}
                                    className="label text-green-400"
                                  >
                                    آخرین نسخه
                                  </Typography>
                                </>
                              </RenderIf>
                            </div>
                          ),
                        },
                        {
                          data: <VersionMenu version={version} lastVersion={lastVersion} />,
                          stopPropagation: true,
                          className: "justify-end",
                        },
                      ]}
                      active={!!version.newOne}
                    />
                  );
                });
              })}
              <RenderIf isTrue={!!hasNextPage}>
                <tr>
                  <td colSpan={6} className="py-4 !text-center">
                    <div className="flex items-center justify-center">
                      <LoadMore
                        className="self-center text-[10px] !font-normal text-primary_normal underline !shadow-none"
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                      />
                    </div>
                  </td>
                </tr>
              </RenderIf>
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyList type={type} />
      )}
    </>
  );
};

export default VersionTableView;
