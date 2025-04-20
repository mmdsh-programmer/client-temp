```mermaid
%% Version Service
%% This diagram shows all hooks related to version management functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    %% Enums
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
    
    %% Input Interfaces
    class IGetVersionInput {
        +repoId: number
        +documentId: number
        +versionId: number | undefined
        +state?: "draft" | "version" | "public"
        +innerDocument?: boolean
        +innerOutline?: boolean
        +isDirectAccess?: boolean
        +enabled?: boolean
    }
    
    class IGetLastVersionInput {
        +repoId: number
        +documentId: number
        +enabled?: boolean
    }
    
    class ICreateVersionInput {
        +repoId: number
        +documentId: number
        +versionNumber: string
        +content: string
        +outline: string
        +isDirectAccess?: boolean
        +onSuccessHandler?: () => void
    }
    
    class ICreateFileVersionInput {
        +repoId: number
        +documentId: number
        +versionNumber: string
        +fileHash?: IFileVersion
        +isDirectAccess?: boolean
        +onSuccessHandler?: () => void
    }
    
    class IGetVersionListInput {
        +repoId: number
        +documentId: number
        +isDirectAccess: boolean | undefined
        +size: number
    }
    
    class IConfirmVersionInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    class IDeleteVersionInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +state: string
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    class IPublicVersionInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    class ICancelPublicVersionInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    class ICancelConfirmVersionInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    class ISetLastVersionInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +isDirectAccess?: boolean
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
    
    class IAddVersion {
        +content: string
        +hash: string
        +id: number
        +outline: string
        +versionNumber: string
    }
    
    class IVersionMetadata {
        +list: IVersion[]
        +offset: number
        +size: number
        +total: number
    }
    
    class IFileVersion {
        +hash: string
        +fileName: string
        +fileExtension: string
    }
    
    %% Hooks
    class GetVersionHook {
        <<hook>>
        Input: IGetVersionInput
        Output: IVersion
        +useGetVersion()
    }
    
    class GetLastVersionHook {
        <<hook>>
        Input: IGetLastVersionInput
        Output: IVersion
        +useGetLastVersion()
    }
    
    class CreateVersionHook {
        <<hook>>
        Input: ICreateVersionInput
        Output: IAddVersion
        +useCreateVersion()
    }
    
    class CreateFileVersionHook {
        <<hook>>
        Input: ICreateFileVersionInput
        Output: IAddVersion
        +useCreateFileVersion()
    }
    
    class GetVersionListHook {
        <<hook>>
        Input: IGetVersionListInput
        Output: IVersionMetadata
        +useGetVersionList()
    }
    
    class ConfirmVersionHook {
        <<hook>>
        Input: IConfirmVersionInput
        Output: IAddVersion
        +useConfirmVersion()
    }
    
    class DeleteVersionHook {
        <<hook>>
        Input: IDeleteVersionInput
        Output: void
        +useDeleteVersion()
    }
    
    class PublicVersionHook {
        <<hook>>
        Input: IPublicVersionInput
        Output: IAddVersion
        +usePublicVersion()
    }
    
    class CancelPublicVersionHook {
        <<hook>>
        Input: ICancelPublicVersionInput
        Output: IAddVersion
        +useCancelPublicVersion()
    }
    
    class CancelConfirmVersionHook {
        <<hook>>
        Input: ICancelConfirmVersionInput
        Output: IAddVersion
        +useCancelConfirmVersion()
    }
    
    class SetLastVersionHook {
        <<hook>>
        Input: ISetLastVersionInput
        Output: void
        +useSetLastVersion()
    }
    
    %% Relationships
    IVersion --> EDraftStatus : uses
    IVersion --> EVersionStatus : uses
    IVersion --> IVersionCreator : contains
    IVersion --> IFileHash : contains
    IVersionMetadata --> IVersion : contains
    ICreateFileVersionInput --> IFileVersion : uses
    
    GetVersionHook --> IGetVersionInput : accepts
    GetVersionHook --> IVersion : returns
    
    GetLastVersionHook --> IGetLastVersionInput : accepts
    GetLastVersionHook --> IVersion : returns
    
    CreateVersionHook --> ICreateVersionInput : accepts
    CreateVersionHook --> IAddVersion : returns
    
    CreateFileVersionHook --> ICreateFileVersionInput : accepts
    CreateFileVersionHook --> IAddVersion : returns
    
    GetVersionListHook --> IGetVersionListInput : accepts
    GetVersionListHook --> IVersionMetadata : returns
    
    ConfirmVersionHook --> IConfirmVersionInput : accepts
    ConfirmVersionHook --> IAddVersion : returns
    
    DeleteVersionHook --> IDeleteVersionInput : accepts
    
    PublicVersionHook --> IPublicVersionInput : accepts
    PublicVersionHook --> IAddVersion : returns
    
    CancelPublicVersionHook --> ICancelPublicVersionInput : accepts
    CancelPublicVersionHook --> IAddVersion : returns
    
    CancelConfirmVersionHook --> ICancelConfirmVersionInput : accepts
    CancelConfirmVersionHook --> IAddVersion : returns
    
    SetLastVersionHook --> ISetLastVersionInput : accepts
``` 