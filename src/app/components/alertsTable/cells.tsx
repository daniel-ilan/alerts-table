import { CloudtrailLog, IamInstanceProfile, InstancesSet } from "@/shared/types"
import { Button, IconButton, Snackbar, Tooltip, Typography, styled } from "@mui/material";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import SortIcon from '@mui/icons-material/Sort';
import { Column, HeaderContext } from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";

interface ResponseElementsCellProps {
    data?: InstancesSet | string
    dataKey: string

}
export const ResponseElementsCell = ({ data, dataKey }: ResponseElementsCellProps) => {


    if (!data) return null;

    if (typeof data === 'string') return data;

    if (dataKey === 'instancesSet' && data.items) {
        return (
            <div>
                {data.items.map(item => (
                    <div key={item.instanceId}>
                        <strong>Instance ID</strong>: {item.instanceId}
                        <br />
                        <strong>Current State</strong>: {item.currentState}
                    </div>
                )
                )}

            </div>
        )
    }

    return null;


}

interface RequestParametersCellProps {
    data?: string | IamInstanceProfile
    dataKey: string

}

export const RequestParametersCell = ({ data, dataKey }: RequestParametersCellProps) => {

    if (!data) return null;

    if (dataKey === "policy") return <EllipsysedCell data={data as string} />

    if (typeof data === 'string') return data;

    if (dataKey === "iamInstanceProfile") return data.arn;


    return null;
}

const EllipsysedCell = ({ data }: { data: string }) => {

    const [isOpen, setIsOpen] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(data);
        setIsOpen(true);
    }

    return (<>
        <Tooltip title={data} arrow>
            <span>{data.slice(0, 10)}... <IconButton size="small" onClick={copyToClipboard}><ContentCopyOutlinedIcon /></IconButton>
            </span>
        </Tooltip>
        <Snackbar
            open={isOpen}
            autoHideDuration={2000}
            onClose={() => setIsOpen(false)}
            message="value copied to clipbaord"
        />
    </>
    )
}

interface SortingCellProps {
    text: ReactNode | JSX.Element
    header: HeaderContext<CloudtrailLog, any>
}


const RotationIcon = styled(SortIcon, {
    shouldForwardProp: (prop) => prop !== "$isDesc"
  }) <{ $isDesc?: boolean }>`
    transition: transform 0.3s;
    transform: ${({ $isDesc }) => $isDesc ? 'scale(1, -1)' : 'scale(-1, 1)'};
  `;

export const SortingCell = ({ text, header }: SortingCellProps) => {

    const sorrtedState = header.column.getIsSorted();

    const handleSort = () => {
        if (header.table.getRowCount()) {
            header.column.toggleSorting();
        }
    }

    useEffect(() => {
        if (!header.table.getRowCount() && sorrtedState) {
            header.column.clearSorting();
        }
    }, [sorrtedState])

    if (!header.table.getRowCount()) {
        return (
            <Typography component="span" variant="subtitle2" style={{ display: 'flex', gap: 8 }}>
                {text}
            </Typography>
        )
    }

    return (
        <Button color="inherit" size="small" onClick={handleSort} sx={{textTransform: 'unset'}}>
            <Typography component="span" variant="subtitle2" style={{ display: 'flex', gap: 8 }}>
                {text}
                {sorrtedState &&
                    <RotationIcon fontSize="small" color="inherit" $isDesc={sorrtedState === "desc"} />
                }
            </Typography>
        </Button>
    )
}