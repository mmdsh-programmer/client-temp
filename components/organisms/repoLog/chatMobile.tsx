import React from "react";
import { Card, Drawer } from "@material-tailwind/react";
import { RepoLogProps } from "./index";
import ChatActivation from "./chatActivation";
import ChatPermissionError from "./chatPermissionError";
import ChatFeedContent from "./chatFeedContent";

const ChatMobileRepoLog = ({
  showRepoActivity,
  selectedRepo,
  userCanAccessChat,
  permissionError,
  enableChatHook,
  enableChat,
  loadChatData,
  chatState,
  chatRef,
  containerRef,
  renderCustomChatBubble,
  handleClose,
  isCheckingAccess,
  handleScroll,
  isLoadingMore,
}: RepoLogProps) => {
  // Content to render inside the drawer
  const renderContent = () => {
    // Show loading while checking access
    if (isCheckingAccess) {
      return (
        <ChatActivation
          handleClose={handleClose}
          enableChat={enableChat}
          isLoading
          message="در حال بررسی دسترسی..."
        />
      );
    }

    if (!selectedRepo?.chatThreadId || !userCanAccessChat) {
      return (
        <ChatActivation
          handleClose={handleClose}
          enableChat={enableChat}
          isLoading={enableChatHook.isPending}
        />
      );
    }

    if (permissionError) {
      return (
        <ChatPermissionError
          handleClose={handleClose}
          retryLoad={loadChatData}
          isLoading={enableChatHook.isPending}
        />
      );
    }

    return (
      <ChatFeedContent
        handleClose={handleClose}
        chatState={chatState}
        chatRef={chatRef}
        containerRef={containerRef}
        renderCustomChatBubble={renderCustomChatBubble}
        isMobile
        handleScroll={handleScroll}
        isLoadingMore={isLoadingMore}
      />
    );
  };

  return (
    <Drawer
      placement="bottom"
      open={showRepoActivity}
      onClose={handleClose}
      className="!h-[75vh] max-h-[75vh] !overflow-hidden p-0"
      overlayProps={{
        className: "fixed inset-0 bg-black/60 z-[9999]",
      }}
    >
      <Card className="repo-log flex h-full w-full flex-col !rounded-b-none !rounded-t-xl bg-primary shadow-small">
        {renderContent()}
      </Card>
    </Drawer>
  );
};

export default ChatMobileRepoLog;
