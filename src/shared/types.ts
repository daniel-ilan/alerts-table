import '@tanstack/react-table'
import { RowData } from '@tanstack/react-table'


export interface Alert {
    alert_name: string
    cloudtrail_logs: CloudtrailLog[]
}

export interface CloudtrailLog {
    timestamp: string
    event_name: string
    user_identity: UserIdentity
    response_elements?: ResponseElements
    source_ip: string
    request_parameters?: RequestParameters
}

export interface UserIdentity {
    type: string
    userName: string
}

export interface ResponseElements extends Record<string, string | InstancesSet | undefined>{
    securityGroup?: string
    ConsoleLogin?: string
    instancesSet?: InstancesSet
}

export interface InstancesSet {
    items: Item[]
}

export interface Item {
    instanceId: string
    currentState: string
}

export interface RequestParameters extends Record<string, string | IamInstanceProfile | undefined>{
    instanceId?: string
    iamInstanceProfile?: IamInstanceProfile
    bucketName?: string
    AccessControlPolicy?: string
    policy?: string
}

export interface IamInstanceProfile {
    arn: string
}


declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    constWidth?: string,
    canSort?: boolean,
    borderRight?: boolean
  }
}