```mermaid
%% Info Service
%% This diagram shows hooks related to user info functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    %% Input Interface (empty for this hook)
    
    %% Output Interface
    class IMyInfo {
        +owner: number
        +bookmark: number
        +access: number
        +archived: number
    }
    
    %% Hook
    class GetMyInfoHook {
        <<hook>>
        Input: None
        Output: IMyInfo
        +useGetMyInfo()
    }
    
    %% Relationships
    GetMyInfoHook --> IMyInfo : returns
``` 