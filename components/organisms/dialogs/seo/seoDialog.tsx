import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from "@material-tailwind/react";
import TabComponent from "@components/molecules/tab";
import SeoForm, { SeoFormRef } from "./seoForm";
import SeoSocialSharingForm, { SocialSharingFormRef } from "./seoSocialSharingForm";
import SeoIndexingForm, { IndexingFormRef } from "./seoIndexingForm";
import SeoArticleSchemaForm, { ArticleSchemaFormRef } from "./seoArticleSchemaForm";
import { ISeo } from "@interface/social.interface";
import CloseButton from "@components/atoms/button/closeButton";
import LoadingButton from "@components/molecules/loadingButton";
import CancelButton from "@components/atoms/button/cancelButton";
import { EArticleSchemaImageType } from "@interface/enums";

export enum ETabs {
  SEO = "SEO METADATA",
  SOCIAL_SHARING = "OPEN GRAPH",
  SEO_INDEXING = "SEO INDEXING",
  ARTICLE_SCHEMA = "ARTICLE SCHEMA",
}

interface IProps {
  open: boolean;
  handleClose: () => void;
  defaultValues?: ISeo;
  handleSubmit: (seo: ISeo) => Promise<void>;
  isLoading: boolean;
}

const SeoDialog = ({ open, handleClose, defaultValues, handleSubmit, isLoading }: IProps) => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.SEO);
  const [tabWithError, setTabWithError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ISeo>(defaultValues || {
    title: "",
    description: "",
    keywords: "",
    language: "",
    canonicalUrl: "",
    seoIndexing: {
      indexing: "",
      following: "",
      noarchive: false,
      nosnippet: false
    }
  });
  // Flag to track if the dialog has just opened
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  const seoFormRef = useRef<SeoFormRef>(null);
  const socialSharingFormRef = useRef<SocialSharingFormRef>(null);
  const indexingFormRef = useRef<IndexingFormRef>(null);
  const articleSchemaFormRef = useRef<ArticleSchemaFormRef>(null);

  // Reset to initial tab when dialog opens
  useEffect(() => {
    if (open) {
      setActiveTab(ETabs.SEO);
      setIsInitialRender(true);
      
      // Reset form data to default values when dialog opens
      if (defaultValues) {
        setFormData(defaultValues);
      } else {
        setFormData({
          title: "",
          description: "",
          keywords: "",
          language: "",
          canonicalUrl: "",
          seoIndexing: {
            indexing: "",
            following: "",
            noarchive: false,
            nosnippet: false
          }
        });
      }
    }
  }, [open, defaultValues]);

  // Effect to switch tab when an error is found
  useEffect(() => {
    if (tabWithError) {
      // No longer in initial render state when showing errors
      setIsInitialRender(false);
      
      setTimeout(() => {
        setActiveTab(tabWithError);
        setTabWithError(null);
        
        // Trigger validation on the tab with error
        setTimeout(async () => {
          if (tabWithError === ETabs.SEO && seoFormRef.current) {
            await seoFormRef.current.validateForm();
          } else if (tabWithError === ETabs.SOCIAL_SHARING && socialSharingFormRef.current) {
            await socialSharingFormRef.current.validateForm();
          } else if (tabWithError === ETabs.SEO_INDEXING && indexingFormRef.current) {
            await indexingFormRef.current.validateForm();
          } else if (tabWithError === ETabs.ARTICLE_SCHEMA && articleSchemaFormRef.current) {
            await articleSchemaFormRef.current.validateForm();
          }
        }, 100);
      }, 0);
    }
  }, [tabWithError]);

  // Store form data when changing tabs to prevent data loss
  const handleTabChange = async (newTab: string) => {
    // If this is the first tab change after opening the dialog, don't validate
    if (isInitialRender) {
      setIsInitialRender(false);
      setActiveTab(newTab);
      return;
    }

    // Save current tab data before switching
    if (activeTab === ETabs.SEO && seoFormRef.current) {
      const seoData = seoFormRef.current.getFormValues();
      setFormData((prev) => {
        return { ...prev, ...seoData };
      });
      
      // Trigger validation on the current form to show errors
      await seoFormRef.current.validateForm();
    } else if (activeTab === ETabs.SOCIAL_SHARING && socialSharingFormRef.current) {
      const socialData = socialSharingFormRef.current.getFormValues();
      setFormData((prev) => {
        return { ...prev, openGraph: socialData?.openGraph };
      });
      
      // Trigger validation on the current form to show errors
      await socialSharingFormRef.current.validateForm();
    } else if (activeTab === ETabs.SEO_INDEXING && indexingFormRef.current) {
      const indexingData = indexingFormRef.current.getFormValues();
      setFormData((prev) => {
        return { 
          ...prev, 
          seoIndexing: {
            indexing: indexingData?.indexing || "",
            following: indexingData?.following || "",
            noarchive: indexingData?.noarchive || false,
            nosnippet: indexingData?.nosnippet || false,
          }
        };
      });
      
      // Trigger validation on the current form to show errors
      await indexingFormRef.current.validateForm();
    } else if (activeTab === ETabs.ARTICLE_SCHEMA && articleSchemaFormRef.current) {
      const schemaData = articleSchemaFormRef.current.getFormValues();
      if (schemaData) {
        setFormData((prev) => {
          return { 
            ...prev, 
            articleSchema: {
              "@context": "https://schema.org",
              "@type": schemaData["@type"],
              headline: schemaData.headline,
              description: schemaData.description,
              image: {
                "@type": EArticleSchemaImageType.IMAGE_OBJECT,
                url: schemaData.image.url,
                width: schemaData.image.width,
                height: schemaData.image.height,
              },
              author: {
                "@type": schemaData.author["@type"],
                name: schemaData.author.name,
              },
              publisher: {
                "@type": schemaData.publisher["@type"],
                name: schemaData.publisher.name,
                logo: {
                  "@type": EArticleSchemaImageType.IMAGE_OBJECT,
                  url: schemaData.publisher.logo.url,
                  width: schemaData.publisher.logo.width,
                  height: schemaData.publisher.logo.height,
                },
              },
              datePublished: schemaData.datePublished,
              dateModified: schemaData.dateModified,
            }
          };
        });
        
        // Trigger validation on the current form to show errors
        await articleSchemaFormRef.current.validateForm();
      }
    }
    
    // Switch to new tab
    setActiveTab(newTab);
  };

  const onSubmitAll = async () => {
    // No longer in initial render state when submitting
    setIsInitialRender(false);
    
    // Save current tab data before validation
    if (activeTab === ETabs.SEO && seoFormRef.current) {
      const seoData = seoFormRef.current.getFormValues();
      setFormData((prev) => {
        return { ...prev, ...seoData };
      });
    } else if (activeTab === ETabs.SOCIAL_SHARING && socialSharingFormRef.current) {
      const socialData = socialSharingFormRef.current.getFormValues();
      setFormData((prev) => {
        return { ...prev, openGraph: socialData?.openGraph };
      });
    } else if (activeTab === ETabs.SEO_INDEXING && indexingFormRef.current) {
      const indexingData = indexingFormRef.current.getFormValues();
      setFormData((prev) => {
        return {
          ...prev,
          seoIndexing: {
            indexing: indexingData?.indexing || "",
            following: indexingData?.following || "",
            noarchive: indexingData?.noarchive || false,
            nosnippet: indexingData?.nosnippet || false,
          }
        };
      });
    }
    
    const validationResults = {
      [ETabs.SEO]: await seoFormRef.current?.validateForm() || false,
      [ETabs.SOCIAL_SHARING]: await socialSharingFormRef.current?.validateForm() || false,
      [ETabs.SEO_INDEXING]: await indexingFormRef.current?.validateForm() || false,
      [ETabs.ARTICLE_SCHEMA]: await articleSchemaFormRef.current?.validateForm() || false,
    };
    
    const hasErrors = Object.values(validationResults).some((isValid) => {
      return !isValid;
    });
    
    if (hasErrors) {
      const tabsInOrder = [ETabs.SEO, ETabs.SOCIAL_SHARING, ETabs.SEO_INDEXING, ETabs.ARTICLE_SCHEMA];
      for (const tab of tabsInOrder) {
        if (!validationResults[tab]) {
          setTabWithError(tab);
          return;
        }
      }
      return;
    }
    
    await handleSubmit(formData);
  };

  const tabList = [
    {
      tabTitle: ETabs.SEO,
      tabContent: (
        <SeoForm
          ref={seoFormRef}
          defaultValues={formData}
        />
      ),
    },
    {
      tabTitle: ETabs.SOCIAL_SHARING,
      tabContent: (
        <SeoSocialSharingForm
          ref={socialSharingFormRef}
          defaultValues={formData}
        />
      ),
    },
    {
      tabTitle: ETabs.SEO_INDEXING,
      tabContent: (
        <SeoIndexingForm
          ref={indexingFormRef}
          defaultValues={formData}
        />
      ),
    },
    {
      tabTitle: ETabs.ARTICLE_SCHEMA,
      tabContent: (
        <SeoArticleSchemaForm
          ref={articleSchemaFormRef}
          defaultValues={formData}
        />
      ),
    },
  ];

  return (
    <Dialog open={open} handler={handleClose} size="lg">
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header bg-white flex items-center justify-between gap-[10px] xs:gap-0 pr-1 pl-4 xs:px-6 py-[6px] xs:py-5 border-b-[0.5px] border-normal rounded-t-lg"
      >
        <div className="flex items-center">
          <Typography className="form__title">تنظیمات بهینه‌سازی موتور جستجو (SEO)</Typography>
        </div>
        <CloseButton onClose={handleClose} />
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <DialogBody className="dialog-body h-[70vh] overflow-y-auto">
        <TabComponent
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={(value: React.SetStateAction<string>) => {
            if (typeof value === "function") {
              const newTab = value(activeTab);
              handleTabChange(newTab);
            } else {
              handleTabChange(value);
            }
          }}
          tabPanelClassName="overflow-y-auto"
          key={`tab-component-${activeTab}`}
        />
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="dialog-footer p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose} disabled={isLoading}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="dialog-footer__submit-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={onSubmitAll}
          loading={isLoading}
          disabled={isLoading}
        >
          <Typography className="text__label__button text-white">
            تایید
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default SeoDialog; 