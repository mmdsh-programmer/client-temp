```mermaid
%% Release Service
%% This diagram shows all hooks related to release functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class IGetPendingVersionInput {
        +repoId: number
        +size: number
    }

    class IGetPendingDraftInput {
        +repoId: number
        +size: number
    }

    class IAcceptVersionInput {
        +repoId: number
        +docId: number
        +versionId: number
        +callBack?: () => void
    }

    class IAcceptDraftInput {
        +repoId: number
        +docId: number
        +draftId: number
        +callBack?: () => void
    }

    class IRejectVersionInput {
        +repoId: number
        +versionId: number
        +callBack?: () => void
    }

    class IRejectDraftInput {
        +repoId: number
        +docId: number
        +draftId: number
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IVersion {
        +createDate: number
        +updateDate: number
        +id: number
        +chatThreadId?: number
        +versionNumber: string
        +status: EDraftStatus | EVersionStatus
        +state: "draft" | "version" | "public"
        +content?: string
        +outline?: string
        +postId: number
        +repoId: number
        +categoryId: number
        +documentId: number
        +dislikeCount: number
        +likeCount: number
        +hash: string
        +shareCount: number
        +metadata: string
        +favoriteCount: number
        +commentCount: number
        +changeLog: string
        +draftId: number
        +message?: string
        +creator?: IVersionCreator
        +fileHash?: IFileHash
        +contentType?: string
        +repoUserGroupHash?: string
        +categoryUserGroupHash?: string
        +documentTitle?: string
        +repoName?: string
        +newOne?: boolean
    }
    
    class IVersionCreator {
        +name: string
        +userName: string
        +ssoId: number
    }
    
    class IFileHash {
        +fileExtension: string
        +fileName: string
        +hash: string
    }
    
    class EDraftStatus {
        <<enumeration>>
        editing
        pending
        rejected
        accepted
    }
    
    class EVersionStatus {
        <<enumeration>>
        public
        private
        pending
        rejected
    }

    %% Hooks
    class GetPendingVersionHook {
        Input: IGetPendingVersionInput
        Output: IVersion[]
        +useGetPendingVersion()
    }

    class GetPendingDraftHook {
        Input: IGetPendingDraftInput
        Output: IVersion[]
        +useGetPendingDraft()
    }

    class AcceptVersionHook {
        Input: IAcceptVersionInput
        Output: void
        +useAcceptVersion()
    }

    class AcceptDraftHook {
        Input: IAcceptDraftInput
        Output: void
        +useAcceptDraft()
    }

    class RejectVersionHook {
        Input: IRejectVersionInput
        Output: void
        +useRejectVersion()
    }

    class RejectDraftHook {
        Input: IRejectDraftInput
        Output: void
        +useRejectDraft()
    }

    %% Relationships
    GetPendingVersionHook --> IGetPendingVersionInput : accepts
    GetPendingVersionHook --> IVersion : returns
    GetPendingDraftHook --> IGetPendingDraftInput : accepts
    GetPendingDraftHook --> IVersion : returns
    AcceptVersionHook --> IAcceptVersionInput : accepts
    AcceptDraftHook --> IAcceptDraftInput : accepts
    RejectVersionHook --> IRejectVersionInput : accepts
    RejectDraftHook --> IRejectDraftInput : accepts
    IVersion --> IVersionCreator : contains
    IVersion --> IFileHash : contains
    IVersion --> EDraftStatus : contains
    IVersion --> EVersionStatus : contains
``` 