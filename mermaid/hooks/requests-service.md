```mermaid
%% Requests Service
%% This diagram shows all hooks related to repository access requests functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    %% Input Interfaces
    class IGetUserJoinRepoRequestsInput {
        +size: number
    }
    
    class IAcceptJoinToRepoRequestInput {
        +requestId: number
        +callBack?: () => void
    }
    
    class IRejectJoinToRepoRequestInput {
        +requestId: number
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IRequestUser {
        +family_name?: string
        +given_name?: string
        +id: number
        +picture?: string
        +preferred_username: string
        +role?: ERoles
    }
    
    class IAccessRequest {
        +createdAt: string
        +id: number
        +repoId: number
        +repoName?: string
        +role: ERoles
        +status: string
        +type: string
        +user: IRequestUser
        +userSSOID: number
    }
    
    class IAccessRequestResponse {
        +list: IAccessRequest[]
        +offset: number
        +size: number
        +total: number
    }
    
    class ERoles {
        <<enumeration>>
        admin
        editor
        owner
        viewer
        writer
        default
    }
    
    %% Hooks
    class GetUserJoinRepoRequestsHook {
        <<hook>>
        Input: IGetUserJoinRepoRequestsInput
        Output: IAccessRequestResponse
        +useGetUserJoinRepoRequests()
    }
    
    class AcceptJoinToRepoRequestHook {
        <<hook>>
        Input: IAcceptJoinToRepoRequestInput
        Output: void
        +useAcceptJoinToRepoRequest()
    }
    
    class RejectJoinToRepoRequestHook {
        <<hook>>
        Input: IRejectJoinToRepoRequestInput
        Output: void
        +useRejectJoinToRepoRequest()
    }
    
    %% Relationships
    IAccessRequest --> IRequestUser : contains
    IAccessRequest --> ERoles : uses
    IAccessRequestResponse --> IAccessRequest : contains
    
    GetUserJoinRepoRequestsHook --> IGetUserJoinRepoRequestsInput : accepts
    GetUserJoinRepoRequestsHook --> IAccessRequestResponse : returns
    
    AcceptJoinToRepoRequestHook --> IAcceptJoinToRepoRequestInput : accepts
    
    RejectJoinToRepoRequestHook --> IRejectJoinToRepoRequestInput : accepts
``` 