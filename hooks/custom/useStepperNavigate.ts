import { useDocumentStore } from "@store/document";

import { EDocumentTypes } from "@interface/enums";
import { useDocumentStepperStore } from "@store/stepper";

const useStepperNavigate = () => {
  const setActiveStep = useDocumentStepperStore((s) => {
    return s.setDocumentActiveStep;
  });
  const setDocumentInfo = useDocumentStore((s) => {
    return s.setDocumentInfo;
  });
  const setDocumentTemplate = useDocumentStore((s) => {
    return s.setDocumentTemplate;
  });
  const setDocumentKey = useDocumentStore((s) => {
    return s.setDocumentKey;
  });
  const getDocumentType = useDocumentStore((s) => {
    return s.documentType;
  });
  const setDocumentType = useDocumentStore((s) => {
    return s.setDocumentType;
  });

  const handleNextStep = () => {
    return setActiveStep((cur) => {
      if (cur === 1 && !getDocumentType?.includes(EDocumentTypes.classic)) return cur + 2;
      return cur + 1;
    });
  };

  const handlePrevStep = () => {
    return setActiveStep((cur) => {
      if (cur === 3 && !getDocumentType?.includes(EDocumentTypes.classic)) return cur - 2;
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
