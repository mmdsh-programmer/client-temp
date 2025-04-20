```mermaid
%% QuestionAnswer Service
%% This diagram shows all hooks related to questionAnswer functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreateQuestionAnswerInput {
        +name: string
        +content: string
        +repliedPostId?: number
        +metadata?: string
        +callBack?: () => void
    }

    class IUpdateQuestionAnswerInput {
        +name: string
        +content: string
        +entityId: number
        +canComment: boolean
        +canLike: boolean
        +enable: boolean
        +repliedPostId?: number
        +metadata?: string
        +callBack?: () => void
    }

    class IDeleteQuestionAnswerInput {
        +postIds: number[]
        +repliedPostId?: number
        +callBack?: () => void
    }
    
    class IGetQuestionAnswerListInput {
        +size: number
        +parentPostId?: number
    }
    
    %% Output Interfaces
    class IQAResponse {
        +id: number
        +version: number
        +timelineId: number
        +entityId: number
        +forwardedId: number
        +numOfLikes: number
        +numOfDisLikes: number
        +numOfSaved: number
        +numOfShare: number
        +numOfFavorites: number
        +numOfComments: number
        +timestamp: number
        +enable: boolean
        +hide: boolean
        +replyPostConfirmation: boolean
        +userSrv: IQAUserSrv
        +rate: IQARate
        +userPostInfo: IQAUserPostInfo
        +latitude: number
        +longitude: number
        +canComment: boolean
        +canLike: boolean
        +canRate: boolean
        +tags: string[]
        +tagTrees: string[]
        +name: string
        +content: string
    }
    
    class IQAList {
        +id: number
        +version: number
        +timelineId: number
        +entityId: number
        +forwardedId: number
        +numOfLikes: number
        +numOfDisLikes: number
        +numOfSaved: number
        +numOfShare: number
        +numOfFavorites: number
        +numOfComments: number
        +timestamp: number
        +enable: boolean
        +hide: boolean
        +replyPostConfirmation: boolean
        +business: IQABusiness
        +userSrv: IQAUserSrv
        +rate: IQARate
        +userPostInfo: IQAUserPostInfo
        +metadata: string
        +lgContent: string
        +latitude: number
        +longitude: number
        +uniqueId: string
        +canComment: boolean
        +canLike: boolean
        +canRate: boolean
        +tags: string[]
        +tagTrees: IQATagTree[]
        +repliedItemSrv: IQARepliedItemSrv
        +attributeValues: IQAAttributeValue[]
        +templateCode: string
        +name: string
        +content: string
        +repliedPostId: number
        +forwardedDescription: string
        +forwardedPostOwner: IQAUserSrv
        +mentionedUserIds: number[]
    }
    
    class IQAUserSrv {
        +id: number
        +name: string
        +ssoId: string
        +ssoIssuerCode: number
        +profileImage: string
    }
    
    class IQARate {
        +myRate: number
        +rate: number
        +rateCount: number
    }
    
    class IQAUserPostInfo {
        +postId: number
        +liked: boolean
        +disliked: boolean
        +favorite: boolean
    }
    
    class IQABusiness {
        +id: number
        +name: string
        +imageInfo: IQAImageInfo
        +image: string
        +numOfProducts: number
        +rate: IQARate
        +sheba: string
        +phone: string
        +serviceCallName: string
        +ssoId: string
    }
    
    class IQAImageInfo {
        +id: number
        +name: string
        +hashCode: string
        +description: string
        +actualWidth: number
        +actualHeight: number
        +width: number
        +height: number
    }
    
    class IQATagTree {
        +id: number
        +name: string
        +code: string
    }
    
    class IQARepliedItemSrv {
        +id: number
        +version: number
        +timelineId: number
        +entityId: number
        +forwardedId: number
        +numOfLikes: number
        +numOfDisLikes: number
        +numOfSaved: number
        +numOfShare: number
        +numOfFavorites: number
        +numOfComments: number
        +timestamp: number
        +enable: boolean
        +hide: boolean
        +replyPostConfirmation: boolean
        +business: IQABusiness
        +userSrv: IQAUserSrv
        +rate: IQARate
        +userPostInfo: IQAUserPostInfo
        +metadata: string
        +lgContent: string
        +latitude: number
        +longitude: number
        +uniqueId: string
        +canComment: boolean
        +canLike: boolean
        +canRate: boolean
        +tags: string[]
        +tagTrees: IQATagTree[]
        +attributeValues: IQAAttributeValue[]
        +templateCode: string
    }
    
    class IQAAttributeValue {
        +code: string
        +name: string
        +value: string
    }

    %% Hooks
    class GetQuestionAnswerListHook {
        Input: IGetQuestionAnswerListInput
        Output: IQAList[]
        +useGetQuestionAnswerList()
    }

    class CreateQuestionAnswerHook {
        Input: ICreateQuestionAnswerInput
        Output: IQAResponse
        +useCreateQuestionAnswer()
    }

    class UpdateQuestionAnswerHook {
        Input: IUpdateQuestionAnswerInput
        Output: IQAResponse
        +useUpdateQuestionAnswer()
    }

    class DeleteQuestionAnswerHook {
        Input: IDeleteQuestionAnswerInput
        Output: boolean
        +useDeleteQuestionAnswer()
    }

    %% Relationships
    GetQuestionAnswerListHook --> IGetQuestionAnswerListInput : accepts
    GetQuestionAnswerListHook --> IQAList : returns
    CreateQuestionAnswerHook --> ICreateQuestionAnswerInput : accepts
    CreateQuestionAnswerHook --> IQAResponse : returns
    UpdateQuestionAnswerHook --> IUpdateQuestionAnswerInput : accepts
    UpdateQuestionAnswerHook --> IQAResponse : returns
    DeleteQuestionAnswerHook --> IDeleteQuestionAnswerInput : accepts
    IQAResponse --> IQAUserSrv : contains
    IQAResponse --> IQARate : contains
    IQAResponse --> IQAUserPostInfo : contains
    IQAList --> IQABusiness : contains
    IQAList --> IQAUserSrv : contains
    IQAList --> IQARate : contains
    IQAList --> IQAUserPostInfo : contains
    IQAList --> IQATagTree : contains
    IQAList --> IQARepliedItemSrv : contains
    IQAList --> IQAAttributeValue : contains
    IQAList --> IQAUserSrv : contains as forwardedPostOwner
    IQABusiness --> IQAImageInfo : contains
    IQABusiness --> IQARate : contains
    IQARepliedItemSrv --> IQABusiness : contains
    IQARepliedItemSrv --> IQAUserSrv : contains
    IQARepliedItemSrv --> IQARate : contains
    IQARepliedItemSrv --> IQAUserPostInfo : contains
    IQARepliedItemSrv --> IQATagTree : contains
    IQARepliedItemSrv --> IQAAttributeValue : contains
``` 