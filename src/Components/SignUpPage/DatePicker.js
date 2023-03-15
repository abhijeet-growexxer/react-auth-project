import { useState } from "react"
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import "./DatePicker.css"

const DatePicker = () => { 
    const [currentDate, setNewDate] = useState(null);
    const onChange = (event, data) => setNewDate(data.value);

    return <SemanticDatepicker sideValue={currentDate } onChange={onChange} className="width"  />;
}

export default DatePicker