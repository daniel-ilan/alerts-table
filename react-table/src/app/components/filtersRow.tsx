import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';


const StyledFiltersRow = styled('div', {
    shouldForwardProp: (prop) => prop !== "isOpen"
})<{ isOpen?: boolean }>(({ theme, isOpen }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    height: isOpen ? 40 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'height 0.3s',
    marginTop: theme.spacing(2)
}));

interface FiltersRowProps {
    isOpen: boolean
    filters?: Record<string, string[]>
    onFilterChange: (filters: Record<string, string>) => void
    disabled?: boolean
}

const DataKeyToPlaceholder: Record<string, string> = {
    event_name: 'Event Name',
    'user_identity.userName': 'User name'
}

const FiltersRow = ({ isOpen, filters, onFilterChange, disabled}: FiltersRowProps) => {

    const [selectedValues, setSelectedValues] = useState< Record<string, string>>({});

    useEffect(() => {        
        onFilterChange(selectedValues);
    }, [selectedValues])

    useEffect(() => {
        setSelectedValues({});
    }, [disabled])


    const handleChange = (e: SelectChangeEvent<unknown>, key: string) => {

        if (e.target.value === 'clear') {
            setSelectedValues(prevState => {
                const newState = {...prevState};
                delete newState[key];
                return newState;
            })
            return;
        }

        setSelectedValues(prevState => {
            return {
                ...prevState,
                [key]: e.target.value as string
            }
        })

    }

    const filtersEntries = Object.entries(filters || {});
    
    if (!filtersEntries.length) return null;


    return (
        <StyledFiltersRow isOpen={isOpen}>
            {
                filtersEntries.map(([key, values]) => {
                    return (
                        <FormControl sx={{ width: 120 }} key={key}>
                            <Select
                                placeholder={key}
                                value={selectedValues[key] || ""}
                                displayEmpty
                                variant='standard'
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                onChange={(e) => handleChange(e, key)}
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <Typography variant='caption'>{DataKeyToPlaceholder[key]}</Typography>;
                                    }
                                    return selected
                                }}
                            >
                                <MenuItem value="clear">Clear selection</MenuItem>
                                {
                                    values.map((value) => (
                                        <MenuItem dense value={value} key={value}>{value}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    )
                })
            }
            
        </StyledFiltersRow>
    )
};

export default FiltersRow;



//<FormControl sx={{ width: 120 }}>
            //     <Select
            //         placeholder='Event Name'
            //         value={eventNameValue}
            //         displayEmpty
            //         variant='standard'
            //         size='small'
            //         labelId="demo-simple-select-label"
            //         id="demo-simple-select"
            //         label="Age"
            //         onChange={(e) => handleEventNameChange(e)}
            //         renderValue={(selected) => {
            //             if (!selected) {
            //                 return <Typography variant='caption'>Placeholder</Typography>;
            //             }
            //             return selected
            //         }}
            //     >
            //         <MenuItem value="clear">Clear selection</MenuItem>
            //         <MenuItem value={10}>Ten</MenuItem>
            //         <MenuItem value={20}>Twenty</MenuItem>
            //         <MenuItem value={30}>Thirty</MenuItem>
            //     </Select>
            // </FormControl>