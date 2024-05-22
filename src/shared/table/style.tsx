import { styled } from "@mui/material/styles";
import { TableCell as MuiTableCell } from "@mui/material";

export const TableCell = styled(MuiTableCell)<{ width?: string, showBorder?: boolean }>`
    width: ${({ width }) => width || 'unset'};
    max-width: ${({ width }) => width || 'unset'};
    min-width: ${({ width }) => width || 'unset'};
    border-right: ${({ showBorder }) => showBorder ? '1px solid rgba(224, 224, 224, 1)' : 'none'};
`;
