import { ResponseElementsCell } from "./cells";

export const PlaceHolderColumn = {
    header: '',
    accessorKey: 'placeholder',
}

export const CellsMap: Record<string, any> = {
    instancesSet: ResponseElementsCell,
}


export const DataKeyToHeaderMap: Record<string, string> = {
    securityGroup: 'Security Group',
    ConsoleLogin: 'Console Login',
    instancesSet: 'Instances Set',
    instanceId: 'Instance ID',
    currentState: 'Current State',
    iamInstanceProfile: 'IAM Instance Profile',
    bucketName: 'Bucket Name',
    AccessControlPolicy: 'Access Control Policy',
    policy: 'Policy',
};