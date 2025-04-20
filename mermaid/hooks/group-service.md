```mermaid
%% Group Service
%% This diagram shows all hooks related to group functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreateGroupInput {
        +repoId: number
        +title: string
        +description?: string
        +members?: string[]
        +callBack?: () => void
    }

    class IEditGroupInput {
        +repoId: number
        +title: string
        +description?: string
        +newTitle?: string
        +members?: string[]
        +callBack?: () => void
    }

    class IDeleteGroupInput {
        +repoId: number
        +title: string
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IGetGroups {
        +path: string
        +title: string
        +description: string
    }
    
    class IGetGroup {
        +groupParentId: string
        +groupId: string
        +title: string
        +description: string
        +path: string
        +members: IGroupMembers
        +cascadeGroupAccess: boolean
    }
    
    class IGroupMembers {
        +list: IGroupMember[]
        +offset: number
        +size: number
        +total: number
    }
    
    class IGroupMember {
        +preferred_username: string
        +given_name: string
        +family_name: string
        +id: number
        +picture: string
        +phone_number_verified: boolean
        +email_verified: boolean
        +nationalcode_verified: boolean
    }
    
    class ICreateGroup {
        +groupParentId: string
        +groupId: string
        +name: string
        +title: string
        +description: string
        +path: string
        +members: IGroupMember[]
        +cascadeGroupAccess: boolean
    }

    %% Hooks
    class GetGroupsHook {
        Input: repoId: number, size: number
        Output: IGetGroups[]
        +useGetGroups()
    }

    class GetGroupInfoHook {
        Input: repoId: number, title: string
        Output: IGetGroup
        +useGetGroupInfo()
    }

    class CreateGroupHook {
        Input: ICreateGroupInput
        Output: ICreateGroup
        +useCreateGroup()
    }

    class EditGroupHook {
        Input: IEditGroupInput
        Output: void
        +useEditGroup()
    }

    class DeleteGroupHook {
        Input: IDeleteGroupInput
        Output: void
        +useDeleteGroup()
    }

    %% Relationships
    GetGroupsHook --> IGetGroups : returns
    GetGroupInfoHook --> IGetGroup : returns
    CreateGroupHook --> ICreateGroupInput : accepts
    CreateGroupHook --> ICreateGroup : returns
    EditGroupHook --> IEditGroupInput : accepts
    DeleteGroupHook --> IDeleteGroupInput : accepts
    IGetGroup --> IGroupMembers : contains
    IGroupMembers --> IGroupMember : contains
    ICreateGroup --> IGroupMember : contains
``` 