import { ChangeEvent, useEffect, useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import styles from '@/styles/controls.module.css';

interface dataSourceProps {
    dataSource: string,
    handleDataSourceChange: (val: string) => void
}

export default function DataSourceButtons(props: dataSourceProps) {

    const [data, setData] = useState("aggregate");
    useEffect(() => {
        const dataState = props.dataSource
        setData(dataState);
    }, [props.dataSource]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData((event.target as HTMLInputElement).value);
        props.handleDataSourceChange(data);
    }

    return (
        <>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="aggregate"
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    <FormControlLabel value="aggregate" control={<Radio />} label="Aggregate" sx={{ color: 'black' }}/>
                    <FormControlLabel value="transport" control={<Radio />} label="Transport" sx={{ color: 'black' }}/>
                    <FormControlLabel value="detailed" control={<Radio />} label="Detailed" sx={{ color: 'black' }}/>
                </RadioGroup>
            </FormControl>
        </>
    );
};
