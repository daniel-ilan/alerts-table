"use client"
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert } from "@/shared/types";
import { CircularProgress, Divider, IconButton, Paper, Typography, styled } from "@mui/material";
import Table from "@/shared/table";
import AlertsTable from "./components/alertsTable";
import FiltersRow from "./components/filtersRow";
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const AlertOptions = [
  {
    label: 'Alert 1',
    value: 'ALERT1',
  },
  {
    label: 'Alert 2',
    value: 'ALERT2',
  },
  {
    label: 'Alert 3',
    value: 'ALERT3',
  },
  {
    label: 'Alert 4',
    value: 'ALERT4',
  }
]

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

const AlertNameWrapper = styled('div')`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
`;


export default function Home() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [data, setData] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFilterRowOpen, setIsFilterRowOpen] = useState(false);


  useEffect(() => {
    setIsFilterRowOpen(false);
    if (selectedAlert) {
      getData();
    }
  }, [selectedAlert]);

  const getData = async () => {
    try {
      setLoading(true);
      setData(null);
      const response = await fetch('/api/alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alert_id: selectedAlert }),
      });
      const data = await response.json();
      setData(data)
    } catch (error) {
      setData(null);
      console.error('Error:', error);
    } finally {
      setLoading(false);

    }

  }

  const handleAlertChange = (newValue?: string) => {
    if (!newValue) {
      setData(null);
    }
    setSelectedAlert(newValue || null);
  }


  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Wrapper>
        <Autocomplete

          onChange={(event, newValue) => handleAlertChange(newValue?.value)}
          disablePortal
          id="alert-select"
          size="small"
          options={AlertOptions}
          sx={{ width: 200, fontSize: 14 }}
          renderInput={(params) => <TextField  {...params} InputLabelProps={{shrink: false}} size="small" label={selectedAlert? null : 'Select Alert'} variant="filled" />}
        />
        <AlertNameWrapper>
          {loading && (
            <>
              <Divider orientation="vertical" variant="middle" flexItem />
              <CircularProgress size={20} color="inherit" />
            </>
          )}

          {data?.alert_name && (
            <>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography variant="h6">{data?.alert_name ?? ""}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <IconButton onClick={() => setIsFilterRowOpen(prevState => !prevState)}>
                <FilterAltIcon />
              </IconButton>
            </>)
          }
        </AlertNameWrapper>
      </Wrapper>
      

      <AlertsTable alertData={data?.cloudtrail_logs} isFilterRowOpen={isFilterRowOpen}/>
    </Paper>
  );
}
