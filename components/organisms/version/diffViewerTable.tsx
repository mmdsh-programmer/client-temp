import React from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import { translateVersionStatus } from "utils";
import { useRecoilValue } from "recoil";
import { compareVersionAtom } from "atom/version";

const newStyles = {
  variables: {
    light: {
      diffViewerTitleBackground: "#f7f7f7",
      diffViewerTitleColor: "#570df8",
      diffViewerTitleBorderColor: "#e8e8e8",
    },
  },
  line: {
    ".css-o1u8iu-content-text": {
      fontFamily: "yekan",
      fontSize: "14px",
    },

  },
  titleBlock: {
    borderTop: "1px solid #e8e8e8",
    borderRight: "1px solid #e8e8e8",
  },
};

declare interface IProps {
  oldValue: string;
  newValue: string;
}

const DiffViewerTable = ({ oldValue, newValue }: IProps) => {
  const compareVersionValue = useRecoilValue(compareVersionAtom);

  return (
    <div className="compare-version__diff-viewer modal-box__form my-2 hover:none overflow-auto flex-grow ">
      {compareVersionValue?.compare && compareVersionValue?.version ? (
        <div className="cursor-default">
          <ReactDiffViewer
            oldValue={oldValue}
            newValue={newValue}
            compareMethod={DiffMethod.WORDS}
            splitView
            styles={newStyles}
            leftTitle={
              <h3 className="text-purple-normal text-[13px] ">
                {`${compareVersionValue.version.repo.name} > ${compareVersionValue.version.document.name} > نسخه ${compareVersionValue?.version?.data?.versionNumber} - ${compareVersionValue?.version && translateVersionStatus(compareVersionValue?.version.data.status, compareVersionValue?.version.data.state).translated}`}
              </h3>
            }
            rightTitle={
              <h3 className="text-purple-normal text-[13px]">
                {`${compareVersionValue.compare.repo.name} > ${compareVersionValue.compare.document.name} > نسخه ${compareVersionValue?.compare?.data?.versionNumber} - ${compareVersionValue?.compare && translateVersionStatus(compareVersionValue?.compare.data.status, compareVersionValue?.compare.data.state).translated}`}
              </h3>
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default DiffViewerTable;
