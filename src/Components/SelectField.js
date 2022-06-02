import * as React from 'react';


/**
 * a component to hold a list of selectable items.  contains no other components
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SelectField(props) {

    return (
        <>
            <select required className="form-select"
                    name={props.name} onChange={props.onChange} value={props.value}>

                <option value={props.defaultValueID} disabled={props.disableDefault}>
                    {props.defaultValueText}
                </option>

                {props.options.map(option => {
                    return (<option key={option.value} value={option.value}>{option.name} </option>)
                })}
            </select>
        </>
    );
}

export default SelectField;