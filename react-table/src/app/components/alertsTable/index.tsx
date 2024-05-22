import { Alert } from "@/shared/types";
import { useEffect, useMemo, useState } from "react";
import { getTableColumns } from "./utils";
import Table from "@/shared/table";
import { LoadingSkeleton } from "@/shared/skeleton";
import FiltersRow from "../filtersRow";

interface AlertsTableProps {
    alertData?: Alert["cloudtrail_logs"]
    isFilterRowOpen: boolean
}

const AlertsTable = ({ alertData, isFilterRowOpen }: AlertsTableProps) => {
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});

    const {columns, filterOptions} = useMemo(() => {
        return getTableColumns(alertData)
    }, [alertData])

    useEffect(() => {
        setFilterValues({});
    }, [alertData])

    const handleFilterChange = (filters: Record<string, string>) => {
        setFilterValues(filters);
    }

    return (
        <>
            <FiltersRow disabled={!!alertData} isOpen={isFilterRowOpen} onFilterChange={handleFilterChange} filters={filterOptions} />
            <Table data={alertData || []} columns={columns} filterValues={filterValues} />

        </>
    )
};

export default AlertsTable; 