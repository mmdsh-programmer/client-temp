```mermaid
%% User Service
%% This diagram shows all hooks related to user management functionality

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
    
    class IGetRepoUsersInput {
        +repoId: number
        +size: number
        +enabled: boolean
    }
    
    class IAddUserInput {
        +repoId: number
        +username: string
        +accesName: string
        +callBack?: () => void
    }
    
    class IEditUserRoleInput {
        +repoId: number
        +userName: string
        +roleName: string
        +callBack?: () => void
    }
    
    class IDeleteUserInput {
        +repoId: number
        +userName: string
        +callBack?: () => void
    }
    
    class IGetInviteRequestsByOwnerInput {
        +repoId: number
        +size: number
    }
    
    class IDeleteInviteRequestInput {
        +repoId: number
        +userId: number
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IRoles {
        +id: number
        +name: ERoles
    }
    
    class IUser {
        +lastAccessDate: number | null
        +userInfo: IUserInfo
        +userRole: ERoles
    }
    
    class IUserInfo {
        +img: string
        +name: string
        +ssoId: number
        +userName: string
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
    
    class IRequestUser {
        +family_name?: string
        +given_name?: string
        +id: number
        +picture?: string
        +preferred_username: string
        +role?: ERoles
    }
    
    class IListResponse~T~ {
        +list: T[]
        +offset: number
        +size: number
        +total: number
    }
    
    %% Hooks
    class GetRolesHook {
        <<hook>>
        Input
        Output: IRoles[]
        +useGetRoles()
    }
    
    class GetRepoUsersHook {
        <<hook>>
        Input: IGetRepoUsersInput
        Output: IListResponse~IUser~
        +useGetRepoUsers()
    }
    
    class AddUserHook {
        <<hook>>
        Input: IAddUserInput
        Output: void
        +useAddUser()
    }
    
    class EditUserRoleHook {
        <<hook>>
        Input: IEditUserRoleInput
        Output: void
        +useEditUserRole()
    }
    
    class DeleteUserHook {
        <<hook>>
        Input: IDeleteUserInput
        Output: void
        +useDeleteUser()
    }
    
    class GetInviteRequestsByOwnerHook {
        <<hook>>
        Input: IGetInviteRequestsByOwnerInput
        Output: IListResponse~IAccessRequest~
        +useGetInviteRequestsByOwner()
    }
    
    class DeleteInviteRequestHook {
        <<hook>>
        Input: IDeleteInviteRequestInput
        Output: void
        +useDeleteInviteRequest()
    }
    
    %% Relationships
    IRoles --> ERoles : uses
    IUser --> IUserInfo : contains
    IUser --> ERoles : uses
    IAccessRequest --> IRequestUser : contains
    IAccessRequest --> ERoles : uses
    IRequestUser --> ERoles : uses
    IListResponse~IUser~ --> IUser : contains
    IListResponse~IAccessRequest~ --> IAccessRequest : contains
    
    GetRolesHook --> IRoles : returns
    
    GetRepoUsersHook --> IGetRepoUsersInput : accepts
    GetRepoUsersHook --> IListResponse~IUser~ : returns
    
    AddUserHook --> IAddUserInput : accepts
    
    EditUserRoleHook --> IEditUserRoleInput : accepts
    
    DeleteUserHook --> IDeleteUserInput : accepts
    
    GetInviteRequestsByOwnerHook --> IGetInviteRequestsByOwnerInput : accepts
    GetInviteRequestsByOwnerHook --> IListResponse~IAccessRequest~ : returns
    
    DeleteInviteRequestHook --> IDeleteInviteRequestInput : accepts
``` 