import React from "react";
import { Card } from "@material-tailwind/react";
import { RepoLogProps } from "./index";
import ChatActivation from "./chatActivation";
import ChatPermissionError from "./chatPermissionError";
import ChatFeedContent from "./chatFeedContent";

const ChatDesktopRepoLog = ({
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
  // Show loading while checking access
  if (isCheckingAccess) {
    return (
      <Card className="repo-log flex w-full rounded-none bg-primary p-4 shadow-small xs:w-80 xs:rounded-lg">
        <ChatActivation
          handleClose={handleClose}
          enableChat={enableChat}
          isLoading
          message="در حال بررسی دسترسی..."
        />
      </Card>
    );
  }

  if (!selectedRepo?.chatThreadId || !userCanAccessChat) {
    return (
      <Card className="repo-log flex w-full rounded-none bg-primary p-4 shadow-small xs:w-80 xs:rounded-lg">
        <ChatActivation
          handleClose={handleClose}
          enableChat={enableChat}
          isLoading={enableChatHook.isPending}
        />
      </Card>
    );
  }

  if (permissionError) {
    return (
      <Card className="repo-log flex w-full rounded-none bg-primary p-4 shadow-small xs:w-80 xs:rounded-lg">
        <ChatPermissionError
          handleClose={handleClose}
          retryLoad={loadChatData}
          isLoading={enableChatHook.isPending}
        />
      </Card>
    );
  }

  return (
    <Card className="repo-log overflow-hidden flex w-full h-full max-h-[calc(100vh-120px)] flex-col rounded-none bg-primary shadow-small xs:w-96 xs:rounded-lg sticky top-0">
      <ChatFeedContent
        handleClose={handleClose}
        chatState={chatState}
        chatRef={chatRef}
        containerRef={containerRef}
        renderCustomChatBubble={renderCustomChatBubble}
        isMobile={false}
        handleScroll={handleScroll}
        isLoadingMore={isLoadingMore}
      />
    </Card>
  );
};

export default ChatDesktopRepoLog; 