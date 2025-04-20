```mermaid
%% Repository Service
%% This diagram shows all hooks related to repository functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    %% Enums
    class ERoles {
        <<enumeration>>
        admin
        editor
        owner
        viewer
        writer
        default
    }
    
    %% Input Interfaces
    class IGetRepoInput {
        +repoId: number
        +setRepo: (repo: IRepo) => void
        +setRepositoryId: (repoId: null | number) => void
    }
    
    class ICreateRepoInput {
        +name: string
        +description?: string
        +callBack?: (result: IRepo) => void
    }
    
    class IEditRepoInput {
        +repoId: number
        +name: string
        +description: string
        +callBack?: () => void
    }
    
    class IDeleteRepoInput {
        +repoId: number
        +callBack?: () => void
    }
    
    class IArchiveRepoInput {
        +repoId: number
        +callBack?: () => void
    }
    
    class IRestoreRepoInput {
        +repoId: number
        +callBack?: () => void
    }
    
    class ILeaveRepoInput {
        +repoId: number
        +callBack?: () => void
    }
    
    class IGetMyRepoListInput {
        +size: number
        +archived: boolean
        +name?: string
        +isPublished?: boolean
    }
    
    class IGetAllRepositoriesInput {
        +size: number
        +name: string | undefined
        +enabled: boolean
    }
    
    class IGetBookmarkListInput {
        +size: number
        +name?: string
    }
    
    class IGetAccessListInput {
        +size: number
        +name?: string
    }
    
    class IBookmarkRepoInput {
        +repoId: number
        +detach?: boolean
        +callBack?: () => void
    }
    
    class IAddImageToRepoInput {
        +repoId: number
        +fileHash: string | null
        +callBack?: () => void
    }
    
    class IGetRepoPublicKeysInput {
        +repoId: number
        +size: number
    }
    
    class ICreateRepoPublicKeyInput {
        +repoId: number
        +name: string
        +key: string
        +callBack?: () => void
    }
    
    class IDeleteRepoPublicKeyInput {
        +repoId: number
        +keyId: number
        +callBack?: () => void
    }
    
    class IGetKeyInput {
        +id?: number
        +keyId?: number
    }
    
    class ISubscribeRepoInput {
        +repoId: number
        +ssoId: number
        +callBack?: () => void
    }
    
    class IUnsubscribeRepoInput {
        +repoId: number
        +callBack?: () => void
    }
    
    class IGetRepoSubscriptionStatusInput {
        +repoId: number
        +ssoId?: number
    }
    
    class IGetPublishRepositoriesInput {
        +size: number
    }
    
    class ITransferOwnershipInput {
        +repoId: number
        +userName: string
        +callBack?: () => void
    }
    
    class IHandleRepoChangeInput {
        +repo: IRepo
        +selectedRepoId: number | null
        +onChange?: (repo: IRepo) => void
    }
    
    %% Output Interfaces
    class IRepo {
        +id: number
        +name: string
        +description: string
        +bookmark: boolean
        +createDate: string
        +lastAccessDate: string
        +imageFileHash: string
        +roleName: ERoles
        +updatedAt: string
        +userGroupHash: string
        +chatThreadId?: number
        +owner?: IRepoOwner
        +unreadCount?: number
        +isPublish: boolean
        +isArchived: boolean
        +publishExpireTime: number
        +adminPublicLink: IPublicLink | null
        +viewerPublicLink: IPublicLink | null
        +writerPublicLink: IPublicLink | null
        +editorPublicLink: IPublicLink | null
        +metadata?: null
    }
    
    class IRepoOwner {
        +userName: string
        +name: string
        +ssoId: number
        +img: string
    }
    
    class IPublicLink {
        +hasPassword: boolean | null
        +expireTime: number
        +link: string
    }
    
    class IPublicKey {
        +id: number
        +name: string
        +key: string
        +createdAt: string
        +updatedAt: string | null
        +repoId: number
        +creatorSSOID: number
    }
    
    class IRepoSubscriptionStatus {
        +status: ERepoSubscriptionStatus
    }
    
    class ERepoSubscriptionStatus {
        <<enumeration>>
        PENDING
        ACCEPTED
        REJECTED
        NOT_FOLLOWED
    }
    
    %% Hooks
    class GetRepoHook {
        <<hook>>
        Input: IGetRepoInput
        Output: IRepo
        +useGetRepo()
    }
    
    class CreateRepoHook {
        <<hook>>
        Input: ICreateRepoInput
        Output: IRepo
        +useCreateRepo()
    }
    
    class EditRepoHook {
        <<hook>>
        Input: IEditRepoInput
        Output: void
        +useEditRepo()
    }
    
    class DeleteRepoHook {
        <<hook>>
        Input: IDeleteRepoInput
        Output: void
        +useDeleteRepo()
    }
    
    class ArchiveRepoHook {
        <<hook>>
        Input: IArchiveRepoInput
        Output: void
        +useArchiveRepo()
    }
    
    class RestoreRepoHook {
        <<hook>>
        Input: IRestoreRepoInput
        Output: void
        +useRestoreRepo()
    }
    
    class LeaveRepoHook {
        <<hook>>
        Input: ILeaveRepoInput
        Output: void
        +useLeaveRepo()
    }
    
    class GetMyRepoListHook {
        <<hook>>
        Input: IGetMyRepoListInput
        Output: IRepo[]
        +useGetMyRepoList()
    }
    
    class GetAllRepositoriesHook {
        <<hook>>
        Input: IGetAllRepositoriesInput
        Output: IRepo[]
        +useGetAllRepositories()
    }
    
    class GetBookmarkListHook {
        <<hook>>
        Input: IGetBookmarkListInput
        Output: IRepo[]
        +useGetBookmarkList()
    }
    
    class GetAccessListHook {
        <<hook>>
        Input: IGetAccessListInput
        Output: IRepo[]
        +useGetAccessList()
    }
    
    class BookmarkRepoHook {
        <<hook>>
        Input: IBookmarkRepoInput
        Output: void
        +useBookmarkRepo()
    }
    
    class AddImageToRepoHook {
        <<hook>>
        Input: IAddImageToRepoInput
        Output: void
        +useAddImageToRepo()
    }
    
    class GetRepoPublicKeysHook {
        <<hook>>
        Input: IGetRepoPublicKeysInput
        Output: IPublicKey[]
        +useGetRepoPublicKeys()
    }
    
    class CreateRepoPublicKeyHook {
        <<hook>>
        Input: ICreateRepoPublicKeyInput
        Output: IPublicKey
        +useCreateRepoPublicKey()
    }
    
    class DeleteRepoPublicKeyHook {
        <<hook>>
        Input: IDeleteRepoPublicKeyInput
        Output: void
        +useDeleteRepoPublicKey()
    }
    
    class GetKeyHook {
        <<hook>>
        Input: IGetKeyInput
        Output: IPublicKey
        +useGetKey()
    }
    
    class SubscribeRepoHook {
        <<hook>>
        Input: ISubscribeRepoInput
        Output: void
        +useSubscribeRepo()
    }
    
    class UnsubscribeRepoHook {
        <<hook>>
        Input: IUnsubscribeRepoInput
        Output: void
        +useUnsubscribeRepo()
    }
    
    class GetRepoSubscriptionStatusHook {
        <<hook>>
        Input: IGetRepoSubscriptionStatusInput
        Output: IRepoSubscriptionStatus
        +useGetRepoSubscriptionStatus()
    }
    
    class GetPublishRepositoriesHook {
        <<hook>>
        Input: IGetPublishRepositoriesInput
        Output: IRepo[]
        +useGetPublishRepositories()
    }
    
    class TransferOwnershipRepositoryHook {
        <<hook>>
        Input: ITransferOwnershipInput
        Output: void
        +useTransferOwnershipRepository()
    }
    
    class HandleRepoChangeHook {
        <<hook>>
        Input: IHandleRepoChangeInput
        Output: void
        +useHandleRepoChange()
    }
    
    %% Relationships
    IRepo --> IRepoOwner : contains
    IRepo --> IPublicLink : contains
    IRepo --> ERoles : uses
    IRepoSubscriptionStatus --> ERepoSubscriptionStatus : uses
    
    GetRepoHook --> IGetRepoInput : accepts
    GetRepoHook --> IRepo : returns
    
    CreateRepoHook --> ICreateRepoInput : accepts
    CreateRepoHook --> IRepo : returns
    
    EditRepoHook --> IEditRepoInput : accepts
    DeleteRepoHook --> IDeleteRepoInput : accepts
    ArchiveRepoHook --> IArchiveRepoInput : accepts
    RestoreRepoHook --> IRestoreRepoInput : accepts
    LeaveRepoHook --> ILeaveRepoInput : accepts
    
    GetMyRepoListHook --> IGetMyRepoListInput : accepts
    GetMyRepoListHook --> IRepo : returns
    
    GetAllRepositoriesHook --> IGetAllRepositoriesInput : accepts
    GetAllRepositoriesHook --> IRepo : returns
    
    GetBookmarkListHook --> IGetBookmarkListInput : accepts
    GetBookmarkListHook --> IRepo : returns
    
    GetAccessListHook --> IGetAccessListInput : accepts
    GetAccessListHook --> IRepo : returns
    
    BookmarkRepoHook --> IBookmarkRepoInput : accepts
    AddImageToRepoHook --> IAddImageToRepoInput : accepts
    
    GetRepoPublicKeysHook --> IGetRepoPublicKeysInput : accepts
    GetRepoPublicKeysHook --> IPublicKey : returns
    
    CreateRepoPublicKeyHook --> ICreateRepoPublicKeyInput : accepts
    CreateRepoPublicKeyHook --> IPublicKey : returns
    
    DeleteRepoPublicKeyHook --> IDeleteRepoPublicKeyInput : accepts
    
    GetKeyHook --> IGetKeyInput : accepts
    GetKeyHook --> IPublicKey : returns
    
    SubscribeRepoHook --> ISubscribeRepoInput : accepts
    UnsubscribeRepoHook --> IUnsubscribeRepoInput : accepts
    
    GetRepoSubscriptionStatusHook --> IGetRepoSubscriptionStatusInput : accepts
    GetRepoSubscriptionStatusHook --> IRepoSubscriptionStatus : returns
    
    GetPublishRepositoriesHook --> IGetPublishRepositoriesInput : accepts
    GetPublishRepositoriesHook --> IRepo : returns
    
    TransferOwnershipRepositoryHook --> ITransferOwnershipInput : accepts
    HandleRepoChangeHook --> IHandleRepoChangeInput : accepts
``` 