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
      <Card
        {...({} as React.ComponentProps<typeof Card>)}
        className="repo-log flex w-full rounded-none bg-primary p-4 shadow-small xs:w-80 xs:rounded-lg"
      >
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
      <Card
        {...({} as React.ComponentProps<typeof Card>)}
        className="repo-log flex w-full rounded-none bg-primary p-4 shadow-small xs:w-80 xs:rounded-lg"
      >
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
      <Card
        {...({} as React.ComponentProps<typeof Card>)}
        className="repo-log flex w-full rounded-none bg-primary p-4 shadow-small xs:w-80 xs:rounded-lg"
      >
        <ChatPermissionError
          handleClose={handleClose}
          retryLoad={loadChatData}
          isLoading={enableChatHook.isPending}
        />
      </Card>
    );
  }

  return (
    <Card
      {...({} as React.ComponentProps<typeof Card>)}
      className="repo-log sticky top-0 flex h-full max-h-[calc(100vh-120px)] w-full flex-col overflow-hidden rounded-none bg-primary shadow-small xs:w-96 xs:rounded-lg"
    >
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
