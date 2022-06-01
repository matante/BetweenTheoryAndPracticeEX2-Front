import * as React from 'react';

/**
 * a component to hold a Field in a form.  contains no other components
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Field(props) {

    return (<>
        <div className="mb-3 col">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <input type={props.type}
                   name={props.name}
                   className="form-control"
                   id={props.name}
                   onChange={props.handleChange}
                   required={props.isRequired}
                   value={props.data ? props.data : ""}
            />
        </div>
    </>);
}

export default Field;