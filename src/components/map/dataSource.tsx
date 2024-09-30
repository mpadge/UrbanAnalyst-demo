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

    const [data, setData] = useState(props.dataSource);
    useEffect(() => {
        if (props.dataSource) {
            setData(props.dataSource);
        }
    }, [props.dataSource]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData((event.target as HTMLInputElement).value);
    }

    const { handleDataSourceChange } = props;
    useEffect(() => {
        if (data) {
            handleDataSourceChange(data);
        }
    }, [data, handleDataSourceChange]);

    return (
        <>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={data}
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
