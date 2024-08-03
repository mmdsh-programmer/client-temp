import {
  documentInfo,
  documentKey,
  documentTemplate,
  documentType,
} from "@atom/document";
import { documentActiveStep } from "@atom/stepper";
import { EDocumentTypes } from "@interface/enums";
import { useRecoilState, useSetRecoilState } from "recoil";

const useStepperNavigate = () => {
  const setActiveStep = useSetRecoilState(documentActiveStep);
  const setDocumentInfo = useSetRecoilState(documentInfo);
  const setDocumentTemplate = useSetRecoilState(documentTemplate);
  const setDocumentKey = useSetRecoilState(documentKey);
  const [getDocumentType, setDocumentType] = useRecoilState(documentType);

  const handleNextStep = () => {
    return setActiveStep((cur) => {
      if (cur === 1 && !getDocumentType?.includes(EDocumentTypes.classic))
        return cur + 2;
      return cur + 1;
    });
  };

  const handlePrevStep = () => {
    return setActiveStep((cur) => {
      if (cur === 3 && !getDocumentType?.includes(EDocumentTypes.classic))
        return cur - 2;
      return cur - 1;
    });
  };

  const goToFirstStep = () => {
    setActiveStep(0);
  };

  const close = () => {
    setActiveStep(0);
    setDocumentType(null);
    setDocumentInfo(null);
    setDocumentTemplate(null);
    setDocumentKey(null);
  };

  return { handleNextStep, handlePrevStep, goToFirstStep, close };
};

export default useStepperNavigate;
