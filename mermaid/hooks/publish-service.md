```mermaid
%% Publish Service
%% This diagram shows all hooks related to publish functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreatePublishLinkInput {
        +repoId: number
        +expireTime?: number
        +password?: string
        +callBack?: () => void
    }

    class IDeletePublishLinkInput {
        +repoId: number
        +callBack?: () => void
    }

    class IGetPublishChildrenInput {
        +repoId: number
        +size: number
        +categoryId?: number
    }

    class IGetAllPublishChildrenInput {
        +repoId: number
        +size: number
        +categoryId?: number
        +title?: string
    }

    class IGetPublishDocumentVersionsInput {
        +repoId: number
        +documentId: number
        +size: number
    }

    class ISetPublishDocumentPasswordInput {
        +documentId: number
        +password: string
        +handleSuccess?: () => void
        +handleError?: () => void
    }

    class ISearchPublishContentInput {
        +repoId: number
        +searchText: string
        +size: number
    }

    class ICreatePublishCommentInput {
        +postId: number
        +text: string
        +shouldConfirm?: boolean
        +callBack?: () => void
    }
    
    class IGetPublishCommentListInput {
        +postId: number
        +size: number
    }
    
    %% Output Interfaces
    class ICategoryMetadata {
        +id: number
        +name: string
        +description: string
        +repoId: number
        +type: "category"
        +extraDetails: string | null
        +isHidden: boolean
        +creator?: ICategoryCreator
        +order?: number | null
        +createdAt: string | null
        +updatedAt: string | null
        +deletedAt: string | null
        +parentId: number | null
        +active: boolean
        +isTemplate: boolean
        +userGroupHash: string | null
        +newOne?: boolean
    }
    
    class ICategoryCreator {
        +img: string
        +name: string
        +ssoId: number
        +userName: string
        +contactId: string | null
    }
    
    class IDocumentMetadata {
        +id: number
        +name: string
        +description: string
        +type: "document"
        +repoId: number
        +repoName: string
        +categoryId: number
        +categoryName: string
        +extraDetails: string | null
        +createdAt: string
        +updatedAt: string | null
        +deletedAt: string | null
        +creatorSSOID: number
        +isHidden: boolean
        +isBookmarked: boolean
        +hasPassword: boolean
        +creator: ICreator | null
        +order?: number | null
        +tags: name: string, id: number [] | number[]
        +contentType: EDocumentTypes
        +lastVersionId: number | null
        +isTemplate: boolean
        +chatThreadId: number | null
        +isPublish: boolean
        +publishLinkPassword: string | null
        +publishExpireTime: number | null
        +versions?: IVersionMetadata
        +publicKeyId?: string
        +userGroupHash: string | null
        +attachmentUserGroup: string | null
        +hasWhiteList: boolean
        +hasBlackList: boolean
        +hasDirectAccess: boolean
        +newOne?: boolean
        +accesses?: string[]
        +createDate: number
        +customPostEntityId: number
        +customPostId: number
        +deleteDate: number | null
        +domainTags: any[]
        +imageAlt: string | null
        +imageUrl: string | null
        +isCommitted: boolean
        +isPublished: boolean
        +parentId: number | null
        +participants: string[]
        +participantsRoles: { [participantId: string]: ParticipantRole }
        +readTime: number | null
        +repoTypeId: number
        +sharedArray: any[]
        +updateDate: number
    }
    
    class IDocumentCreator {
        +img: string
        +name: string
        +ssoId: number
        +userName: string
        +contactId: string | null
    }
    
    class ITag {
        +name: string
        +id: number
    }
    
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
    
    class IComment {
        +id: number
        +text: string
        +timestamp: number
        +user: ICommentUser
        +confirmed: boolean
        +numOfLikes: number
        +numOfDislikes: number
        +numOfComments: number
        +liked: boolean
        +disliked: boolean
    }
    
    class ICommentUser {
        +id: number
        +name: string
        +ssoId: string
        +ssoIssuerCode: number
        +profileImage: string
    }
    
    class IContentSearchListItem {
        +versionId: number
        +versionName: string
        +repoId: number
        +repoName: string
        +documentId: number
        +documentName: string
    }

    %% Hooks
    class CreatePublishLinkHook {
        Input: ICreatePublishLinkInput
        Output: void
        +useCreatePublishLink()
    }

    class DeletePublishLinkHook {
        Input: IDeletePublishLinkInput
        Output: void
        +useDeletePublishLink()
    }

    class GetPublishChildrenHook {
        Input: IGetPublishChildrenInput
        Output: (ICategoryMetadata | IDocumentMetadata)[]
        +useGetPublishChildren()
    }

    class GetAllPublishChildrenHook {
        Input: IGetAllPublishChildrenInput
        Output: (ICategoryMetadata | IDocumentMetadata)[]
        +useGetAllPublishChildren()
    }

    class GetPublishDocumentVersionsHook {
        Input: IGetPublishDocumentVersionsInput
        Output: IVersion[]
        +useGetPublishDocumentVersions()
    }

    class SetPublishDocumentPasswordHook {
        Input: ISetPublishDocumentPasswordInput
        Output: void
        +useSetPublishDocumentPassword()
    }

    class SearchPublishContentHook {
        Input: ISearchPublishContentInput
        Output: IContentSearchListItem[]
        +useSearchPublishContent()
    }

    class CreatePublishCommentHook {
        Input: ICreatePublishCommentInput
        Output: number
        +useCreatePublishComment()
    }
    
    class GetPublishCommentListHook {
        Input: IGetPublishCommentListInput
        Output: IComment[]
        +useGetPublishCommentList()
    }

    %% Relationships
    CreatePublishLinkHook --> ICreatePublishLinkInput : accepts
    DeletePublishLinkHook --> IDeletePublishLinkInput : accepts
    GetPublishChildrenHook --> IGetPublishChildrenInput : accepts
    GetPublishChildrenHook --> ICategoryMetadata : returns
    GetPublishChildrenHook --> IDocumentMetadata : returns
    GetAllPublishChildrenHook --> IGetAllPublishChildrenInput : accepts
    GetAllPublishChildrenHook --> ICategoryMetadata : returns
    GetAllPublishChildrenHook --> IDocumentMetadata : returns
    GetPublishDocumentVersionsHook --> IGetPublishDocumentVersionsInput : accepts
    GetPublishDocumentVersionsHook --> IVersion : returns
    SetPublishDocumentPasswordHook --> ISetPublishDocumentPasswordInput : accepts
    SearchPublishContentHook --> ISearchPublishContentInput : accepts
    SearchPublishContentHook --> IContentSearchListItem : returns
    CreatePublishCommentHook --> ICreatePublishCommentInput : accepts
    GetPublishCommentListHook --> IGetPublishCommentListInput : accepts
    GetPublishCommentListHook --> IComment : returns
    ICategoryMetadata --> ICategoryCreator : contains
    IDocumentMetadata --> IDocumentCreator : contains
    IDocumentMetadata --> ITag : contains
    IVersion --> IVersionCreator : contains
    IVersion --> IFileHash : contains
    IComment --> ICommentUser : contains
``` 