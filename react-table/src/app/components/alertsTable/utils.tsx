import { Alert, CloudtrailLog } from "@/shared/types";
import { ensureArray, formatDate } from "@/shared/utils";
import { ColumnDef } from "@tanstack/react-table";
import { RequestParametersCell, ResponseElementsCell, SortingCell } from "./cells";
import { CellsMap, DataKeyToHeaderMap, PlaceHolderColumn } from "./consts";
import { Typography } from "@mui/material";


export const getTableColumns = (alertData: Alert["cloudtrail_logs"] | undefined): { columns: ColumnDef<CloudtrailLog>[], filterOptions: Record<string, string[]> } => {
    const networkColumns: ColumnDef<CloudtrailLog>[] = []

    const filterValues = {
        eventName: new Set<string>(),
        userIdentity: new Set<string>()
    }

    alertData?.forEach(log => {
        const requestParameters = log.request_parameters;
        const responseElements = log.response_elements;

        if (log.event_name) {
            filterValues.eventName.add(log.event_name);
        }
        if (log.user_identity?.userName) {
            filterValues.userIdentity.add(log.user_identity.userName);
        }


        if (requestParameters) {
            Object.keys(requestParameters).forEach(key => {
                if (!networkColumns.find(column => column.id === `request_parameters.${key}`)) {
                    networkColumns.push({
                        header: DataKeyToHeaderMap[key],
                        accessorKey: `request_parameters.${key}`,
                        id: `request_parameters.${key}`,
                        cell: (info) => <RequestParametersCell dataKey={key} data={info.row.original.request_parameters?.[key]} />
                    })
                }
            })
        }
        if (responseElements) {
            Object.keys(responseElements).forEach(key => {
                if (!networkColumns.find(column => column.id === `response_elements.${key}`)) {
                    networkColumns.push({
                        header: DataKeyToHeaderMap[key],
                        accessorKey: `response_elements.${key}`,
                        id: `response_elements.${key}`,
                        cell: (info) => <ResponseElementsCell dataKey={key} data={info.row.original.response_elements?.[key]} />
                    })
                }
            })
        }
    })

    if (!networkColumns.length) networkColumns.push(PlaceHolderColumn);

    const columns: ColumnDef<CloudtrailLog>[] = [
        {
            id: 'alert_info',
            header: () => <Typography align="center" variant="subtitle2" >Alert Info</Typography>,
            meta: {
                borderRight: true,
            },
            columns: [
                {
                    header: (info) => <SortingCell text="Timestamp" header={info} />,
                    accessorKey: 'timestamp',
                    cell: (info) => <Typography variant="body2"> {formatDate(info.row.original.timestamp)}</Typography>,
                    meta: {
                        constWidth: '190px',
                    },
                    sortingFn: (a, b) => {
                        console.log('a', a);
                        return new Date(b.original.timestamp).getTime() - new Date(a.original.timestamp).getTime()
                    },
                },
                {
                    header: 'Event Name',
                    accessorKey: 'event_name',
                    cell: (info) => <Typography variant="body2"> {info.row.original.event_name}</Typography>,
                    meta: {
                        constWidth: '280px'
                    }

                },
                {
                    header: 'User Identity',
                    accessorKey: 'user_identity.userName',
                    id: 'user_identity.userName',
                    cell: (info) => (
                        <Typography variant="body2">
                            <strong>{info.row.original.user_identity.type}: </strong> {info.row.original.user_identity.userName}
                        </Typography>),
                    meta: {
                        constWidth: '170px'
                    }
                },
                {
                    header: 'Source IP',
                    accessorKey: 'source_ip',
                    cell: (info) => <Typography variant="body2">{info.row.original.source_ip}</Typography>,
                    meta: {
                        constWidth: '150px',
                        borderRight: true,
                    }
                },
            ]
        },

        {
            header: () => <Typography align="center" variant="subtitle2" >API/Network Parameters</Typography>,
            id: 'network',
            columns: [...networkColumns],

        }
    ];

    const eventNameValues = Array.from(filterValues.eventName);
    const userIdentityValues = Array.from(filterValues.userIdentity);

    return { columns, filterOptions: { event_name: eventNameValues, ["user_identity.userName"]: userIdentityValues } }
}