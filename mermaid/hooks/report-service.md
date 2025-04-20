```mermaid
%% Report Service
%% This diagram shows all hooks related to report functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    class IGetReportInput {
        +repoId: number
    }

    class IPlan {
        +title: string
        +hash: string
        +description: string
        +type: string
        +size: number
        +bandwidth: number
        +connections: number
        +versions: number
    }

    class IPodSpaceStatus {
        +bandwidthLimit: number
        +plan: IPlan
        +storageLimit: number
        +storageUsage: number
    }

    class IReport {
        +categories: number
        +documents: number
        +drafts: number
        +pendingDrafts: number
        +pendingVersions: number
        +podSpaceStatus: IPodSpaceStatus
    }

    class GetReportHook {
        <<hook>>
        useGetReport(repoId)
    }

    GetReportHook --> IReport : returns
    IGetReportInput --> GetReportHook : input
    IReport --> IPodSpaceStatus : contains
    IPodSpaceStatus --> IPlan : contains
``` 