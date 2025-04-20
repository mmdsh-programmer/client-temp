```mermaid
%% Document Service
%% This diagram shows all hooks related to document functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    class ICreateDocumentInput {
	    +repoId: number
	    +categoryId: number | null
	    +title: string
	    +contentType: EDocumentTypes
	    +isTemplate: boolean
	    +description?: string
	    +order?: number | null
	    +imageUrl?: string
	    +publicKeyId?: string
	    +error
	    +successCallBack?:(result: IDocument) => void
    }

    class IEditDocumentInput {
	    +repoId: number
	    +documentId: number
	    +categoryId: number | null
	    +title: string
	    +contentType: EDocumentTypes
	    +description?: string
	    +order?: number | null
	    +isHidden?: boolean
	    +tagIds?: number[]
	    +currentParentId?: number | null
	    +isDirectAccess?: boolean
	    +
    }

    class IGetUserDocumentsInput {
	    +repoId: number | undefined
	    +sortParams: ISortProps
	    +size: number
	    +filters: IReportFilter | null
	    +reportType: "myDocuments" | "myAccessDocuments" | null
	    +enabled: boolean
    }

    class ISortProps {
	    +order?: "asc" | "desc"
	    +type?: "asc" | "desc"
	    +name?: "asc" | "desc"
	    +createdAt?: "asc" | "desc"
    }

    class IReportFilter {
	    +default: boolean
	    +type: document: boolean, category: boolean
	    +tagIds: number[]
	    +contentTypes?: EDocumentTypes[]
    }

    class IDocument {
	    +id: number
	    +title: string
	    +content: string
	    +createdAt: string
	    +updatedAt: string
	    +type: string
	    +newOne: boolean
	    +name: string
	    +order: number
	    +isTemplate: boolean
	    +contentType: EDocumentTypes
	    +repoId: number
	    +publicKeyId: string
	    +versions: IVersion[]
	    +isPasswordProtected: boolean
	    +isBookmarked: boolean
	    +isGroupHashEnabled: boolean
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
	    +creator?: ICreator, ssoId: number
	    +fileHash?: fileExtension: string, fileName: string, hash: string
	    +contentType?: string
	    +repoUserGroupHash?: string
	    +categoryUserGroupHash?: string
	    +documentTitle?: string
	    +repoName?: string
	    +newOne?: boolean
    }

    class IUser {
       lastAccessDate: number | null
       userInfo: img: string, name: string, ssoId: number, userName: string
       userRole: ERoles
    }

    class IWhiteList {
	    +blackList: IWhiteListItem[]
	    +whiteList: IWhiteListItem[]
    }

    class IWhiteListItem {
	    +preferred_username: string
	    +given_name: string
	    +family_name: string
	    +id: number
	    +picture: string
    }

    class IBlocklist {
	    +users: IUser[]
    }

    class IPublishLink {
	    +link: string
	    +expiresAt: string
    }

    class IClasorField {
	    +id: number
	    +uniqueId: string
	    +name: string
	    +data: string
    }

    class ICategoryMetadata {
	    +id: number
	    +name: string
	    +description: string
	    +repoId: number
	    +type: "category"
	    +extraDetails: string | null
	    +isHidden: boolean
	    +creator: ICreator | null
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

    class ICreator {
        +img: string
        +name: string
        +ssoId: number
        +userName: string
        +contactId: string | null
    }

    class CreateDocumentHook {
	    Input: ICreateDocumentInput
	    Output: IDocument
	    +useCreateDocument()
    }

    class EditDocumentHook {
	    Input: IEditDocumentInput
	    Output: IDocument
	    +useEditDocument()
    }

    class GetDocumentHook {
	    Input: repoId: number, documentId?: number, isDirectAccess?: boolean, disableVersions?: boolean
	    Output: IDocumentMetadata
	    +useGetDocument()
    }

    class CreateDocumentPasswordHook {
	    Input: repoId: number, documentId: number, password: string,
	    Output: IDocument
	    +useCreateDocumentPassword()
    }

    class DeleteDocumentPasswordHook {
	    Input: repoId: number, documentId: number, password: string,
	    Output: IDocument
	    +useDeleteDocumentPassword()
    }

    class UpdateDocumentPasswordHook {
	    Input: repoId: number, documentId: number, oldPassword: string, newPassword: string,
	    Output: IDocument
	    +useUpdateDocumentPassword()
    }

    class CreateDocumentLinkHook {
	    Output: IDocumentMetadata
	    Input: repoId: number, documentId: number, callBack?:(data: IDocumentMetadata) => void, error
	    +useCreateDocumentLink()
    }

    class CreateDocumentPublishLinkHook {
	    Input: repoId: number, documentId: number, expiresTime?: string,
	    Output: void
	    +useCreateDocumentPublishLink()
    }

    class DeleteDocumentPublishLinkHook {
	    Input: repoId: number, documentId: number,
	    Output: void
	    +useDeleteDocumentPublishLink()
    }

    class GetDocumentPublishLinkHook {
	    Input: documentId: number, getVersions: boolean, size: number
	    Output: IVersion[]
	    +useGetDocumentPublishLink()
    }

    class BlockDocumentHook {
	    Input: repoId: number, documentId: number, username: string, type: "block" | "unblock",
	    Output: void
	    +useBlockDocument()
    }

    class AddWhiteListHook {
	    Input: repoId: number, documentId: number, usernameList: string[],
	    Output: void
	    +useAddWhiteList()
    }

    class AddBlackListHook {
	    Input: repoId: number, documentId: number, usernameList: string[],
	    Output: void
	    +useAddBlackList()
    }

    class GetWhiteBlackListHook {
	    Input: repoId: number, documentId: number
	    Output: IWhiteList
	    +useGetWhiteBlackList()
    }

    class GetDocumentBlocklistHook {
	    Input: repoId: number, documentId: number, size: number
	    Output: IUser[]
	    +useGetDocumentBlocklist()
    }

    class BookmarkDocumentHook {
	    Input: repoId: number, documentId: number, detach: boolean,
	    Output: void
	    +useBookmarkDocument()
    }

    class EnableGroupHashHook {
	    Input: repoId: number, documentId: number, isDirectAccess: boolean,
	    Output: IDocument
	    +useEnableGroupHash()
    }

    class GetClasorFieldHook {
	    Input: repoId: number, documentId: number
	    Output: IClasorField[]
	    +useGetClasorField()
    }

    class GetUserDocumentsHook {
	    Input: IGetUserDocumentsInput
	    Output: ICategoryMetadata[] | IDocumentMetadata[]
	    +useGetUserDocuments()
    }

    class DeleteDocumentHook {
	    Input: repoId: number, documentId: number,
	    Output: void
	    +useDeleteDocument()
    }

    CreateDocumentHook --> ICreateDocumentInput : accepts
    CreateDocumentHook --> IDocument : returns
    EditDocumentHook --> IEditDocumentInput : accepts
    EditDocumentHook --> IDocument : returns
    GetDocumentHook --> IDocumentMetadata : returns
    CreateDocumentPasswordHook --> IDocument : returns
    DeleteDocumentPasswordHook --> IDocument : returns
    UpdateDocumentPasswordHook --> IDocument : returns
    CreateDocumentLinkHook --> IDocumentMetadata : returns
    GetDocumentPublishLinkHook --> IVersion : returns
    GetWhiteBlackListHook --> IWhiteList : returns
    GetDocumentBlocklistHook --> IUser : returns
    EnableGroupHashHook --> IDocument : returns
    GetClasorFieldHook --> IClasorField : returns
    GetUserDocumentsHook --> IGetUserDocumentsInput : accepts
    GetUserDocumentsHook --> ICategoryMetadata : returns
    GetUserDocumentsHook --> IDocumentMetadata : returns
    IWhiteList --> IWhiteListItem : contains
    IBlocklist --> IUser : contains
    IGetUserDocumentsInput --> ISortProps : contains
    IGetUserDocumentsInput --> IReportFilter : contains
    IDocument --> IVersion : contains
    ICategoryMetadata --> ICreator : contains
    IDocumentMetadata --> ICreator : contains
    ```