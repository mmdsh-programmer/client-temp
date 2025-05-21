import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import React, { useEffect } from "react";
import { editorModalAtom, editorModeAtom } from "@atom/editor";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import DraftRequestMenu from "@components/molecules/draftRequestMenu";
import { FaDateFromTimestamp, translateVersionStatus } from "@utils/index";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import RequestMobileView from "../versionRequestsView/requestMobileView";
import RequestTableView from "../versionRequestsView/requestTableView";
import { Spinner } from "@material-tailwind/react";
import TableCell from "@components/molecules/tableCell";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import { toast } from "react-toastify";
import useGetDocument from "@hooks/document/useGetDocument";
import useGetPendingDraft from "@hooks/release/useGetPendingDraft";

const DraftRequests = () => {
  const getRepo = useRecoilValue(repoAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);
  const [getSelectedVersion, setSelectedVersion] = useRecoilState(selectedVersionAtom);

  const {
    data: getDraftRequest,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPendingDraft(getRepo!.id, 10);

  const {
    data: getDocument,
    isSuccess,
    isError,
  } = useGetDocument(
    getRepo!.id,
    getSelectedVersion ? getSelectedVersion!.documentId : undefined,
    !!getSelectedVersion?.id,
    true,
    undefined,
  );

  const listLength = getDraftRequest?.pages[0].total;

  useEffect(() => {
    if (isSuccess && getDocument) {
      setDocument(getDocument);
      setEditorMode("preview");
      setEditorModal(true);
    }
    if (isError) {
      toast.error("خطا در دریافت اطلاعات سند");
    }
  }, [isSuccess]);

  const renderDraftRequests = () => {
    if (isLoading) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      );
    }
    if (listLength) {
      return (
        <>
          <div className="repo-draft-request-table mt-4 hidden h-full min-h-[calc(100vh-200px)] overflow-y-auto xs:block">
            <RequestTableView>
              {getDraftRequest?.pages.map((page) => {
                return page.list.map((request) => {
                  return (
                    <TableCell
                      key={`draft-request-table-item-${request.id}`}
                      onClick={() => {
                        return setSelectedVersion(request);
                      }}
                      tableCell={[
                        { data: request.versionNumber },
                        { data: request.documentTitle },
                        {
                          data: FaDateFromTimestamp(+request.createDate),
                          className: "hidden md:table-cell",
                        },
                        {
                          data: FaDateFromTimestamp(+request.updateDate),
                          className: "hidden xl:table-cell",
                        },
                        {
                          data: (
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex flex-wrap gap-1">
                                <div
                                  className={`${
                                    translateVersionStatus(request.status, request.state).className
                                  }`}
                                >
                                  {translateVersionStatus(request.status, request.state).translated}
                                </div>
                              </div>
                            </div>
                          ),
                        },
                        {
                          data: request.creator?.name,
                          className: "hidden sm:table-cell",
                        },
                        {
                          data: <DraftRequestMenu request={request} />,
                          stopPropagation: true,
                        },
                      ]}
                    />
                  );
                });
              })}
            </RequestTableView>
          </div>
          <div className="repo-draft-request-mobile flex h-[calc(100vh-20px)] flex-col gap-3 overflow-auto rounded-lg">
            {getDraftRequest?.pages.map((page) => {
              return page.list.map((request) => {
                return (
                  <RequestMobileView
                    request={request}
                    onClick={() => {
                      return setSelectedVersion(request);
                    }}
                  />
                );
              });
            })}
          </div>
        </>
      );
    }
    return <EmptyList type={EEmptyList.DRAFT_REQUESTS} />;
  };

  return (
    <div className="flex h-full flex-col gap-4">
      {renderDraftRequests()}
      <RenderIf isTrue={!!hasNextPage}>
        <div className="m-auto">
          <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
        </div>
      </RenderIf>
    </div>
  );
};

export default DraftRequests;
