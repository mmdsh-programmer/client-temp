import React from "react";
import { Spinner } from "@components/atoms/spinner";
import useGetVersionHistory from "@hooks/version/reversion/useGetVersionHistory";
import { Typography } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import { FaDate } from "@utils/index";
import RevertVersion from "./revertVersion";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import useRepoId from "@hooks/custom/useRepoId";

const VersionHistoryList = () => {
  const repoId = useRepoId();
  const { selectedDocument } = useDocumentStore();
  const { selectedVersion } = useVersionStore();
  const { setVersionInfoDialog, setVersionIndex } = useEditorStore();

  const { data: versionHistory, isLoading } = useGetVersionHistory(
    repoId!,
    selectedDocument!.id,
    selectedVersion!.id,
  );

  const historyLength = versionHistory?.versionHistory.length;

  const renderList = () => {
    if (historyLength) {
      return (
        <div className="flex h-[calc(100vh-260px)] flex-col gap-2 overflow-auto">
          {versionHistory.versionHistory.map((item) => {
            return (
              <div
                key={item.versionIndex}
                className="flex w-full cursor-pointer items-center justify-between rounded-md border-[2px] border-normal px-2 py-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setVersionInfoDialog(true);
                  setVersionIndex(item.versionIndex);
                }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Typography
                        className="body_b3 text-primary_normal"
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        تغییر
                      </Typography>
                      <Typography
                        className="title_t2 text-primary_normal"
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        {item.versionIndex}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-1">
                      <Typography
                        className="body_b3 text-primary_normal"
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        توسط
                      </Typography>
                      <Typography
                        className="title_t2 text-primary_normal"
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        {item.username}
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    className="caption_c2 text-blue-600"
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    {FaDate(item.date)}
                  </Typography>
                </div>
                <RevertVersion versionIndex={item.versionIndex} />
              </div>
            );
          })}
        </div>
      );
    }
    return <EmptyList type={EEmptyList.VERSION_HISTORY} />;
  };

  return (
    <div className="px-2 py-4">
      {isLoading ? (
        <div className="flex h-full justify-center">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      ) : (
        renderList()
      )}
    </div>
  );
};

export default VersionHistoryList;
