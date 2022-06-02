import * as React from 'react';
import {useState} from "react";
import Field from "./Field";
import SelectField from "./SelectField";
import APICommands from "../utils/APICommands";


/**
 * this component serves as a Registration Form
 * it contains the next components:
 * Field
 * SelectField
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function RegistrationForm(props) {

    const [inputs, setInputs] = useState({city: ''});
    // a reducer to hold all the inputs

    /************************/
    const [checkedState, setCheckedState] = useState({
        is_covid_19_infected: {
            checked: false, title: "Been infected by COVID-19 before?"
        }, have_diabetes: {
            checked: false, title: "Have Diabetes?"
        }, have_cardio_problems: {
            checked: false, title: "Have Cardio-Vascular problems?"
        }, have_allergies: {
            checked: false, title: "Have Allergies?"
        },
    })
    // a reducer to hold all the checkable inputs
    /************************/

    /**
     * a function which handles changes in the form and stores the new data
     * @param event
     */
    const handleChange = (event) => {
        const name = event.target.name;
        const userInput = event.target.value;
        setInputs(values => ({...values, [name]: userInput}));
    };
    /************************/
    /**
     * a simple function which is used to trim the input
     */
    const trimInputs = () => {
        let returnedObject = {};

        for (const property in inputs) {
            if (typeof inputs[property]) // !== null
                returnedObject[property] = inputs[property].trim();
        }
        setInputs(returnedObject)
    }

    /************************/
    /**
     * a simple function to clear the form after submitting
     */
    const clearForm = () => {
        // clear fields
        let returnedObject = {};
        for (const property in inputs) {
            if (typeof inputs[property]) // !== null, for example the other medical conditions which is optional
                returnedObject[property] = "";
        }
        setInputs(returnedObject)

        // clear checkboxes
        const returnedTarget = Object.assign({}, checkedState);
        Object.entries(checkedState).map((checked) => {
            const condition = checked[0]
            returnedTarget[condition]["checked"] = false
        })
        setCheckedState(returnedTarget)

    }
    /************************/

    /**
     * a function to handle the submitting of the form
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault(); // no page refresh
        trimInputs();

        // as other medical conditions is optional, it may not be created, so create now
        if (!Object.keys(inputs).includes("have_other_medical_conditions")) {
            inputs["have_other_medical_conditions"] = null;
        }

        // this data will be fetched
        const data = Object.assign({}, inputs);

        // add to data the checkboxes
        Object.entries(checkedState).map((name) => {
            const condition = name[0]
            const isSick = name[1]["checked"]
            data[condition] = isSick;
        })

        const url = APICommands.userDbApiURL;
        await fetch(url, {method: "POST", body: JSON.stringify(data)})
            .then(APICommands.status) // succeed
            .then(clearForm)
            .catch(() => {
            })
            .finally(() => {
            });
    };

    /************************/
    /**
     * a simple function to handle the check on checkboxes
     * @param condition
     */
    const handleCheck = (condition) => {
        const returnedTarget = Object.assign({}, checkedState);
        returnedTarget[condition]["checked"] = !returnedTarget[condition]["checked"]
        setCheckedState(returnedTarget)
    }
    /************************/

    return (<>
        <div className='row'>
            <div className='d-flex justify-content-center'>
                <div>
                    <form className="border p-3" onSubmit={handleSubmit}>
                        <h5>Registration Form</h5>
                        <Field name={"first_name"} title={"Enter your first name:"} type={"text"} isRequired={true}
                               data={inputs.first_name} handleChange={handleChange}/>

                        <Field name={"last_name"} title={"Enter your last name:"} type={"text"} isRequired={true}
                               data={inputs.last_name} handleChange={handleChange}/>

                        <Field name={"birth_date"} title={"Enter your date of birth:"} type={"date"} isRequired={true}
                               data={inputs.birth_date} handleChange={handleChange}/>

                        <Field name={"address"} title={"Enter your address:"} type={"text"} isRequired={true}
                               data={inputs.address} handleChange={handleChange}/>

                        <label htmlFor="city" className="form-label">Enter your city:</label>
                        <SelectField defaultValueID={''} defaultValueText="Choose a city" disableDefault={true}
                                     name='city' onChange={handleChange} value={inputs["city"]}
                                     options={[
                                         {value: "Jerusalem", name: "Jerusalem"},
                                         {value: "Tel Aviv", name: "Tel Aviv"},
                                         {value: "Tiberias", name: "Tiberias"},
                                     ]}
                        />

                        <Field name={"zip_code"} title={"Enter your zip code:"} type={"number"} min={0}
                               isRequired={false} data={inputs.zip_code} value={inputs["city"]}
                               handleChange={handleChange}/>


                        <Field name={"landline"} title={"Enter your landline:"} type={"text"} isRequired={true}
                               data={inputs.landline} handleChange={handleChange}/>

                        <Field name={"cellular_phone"} title={"Enter your cellular phone:"} type={"text"}
                               isRequired={true} data={inputs.cellular_phone} handleChange={handleChange}/>

                        <ul className="list-unstyled">
                            {Object.entries(checkedState).map((condition) => {
                                return (<li key={condition[0]}>
                                    <div className="conditions-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${condition[0]}`}
                                                name={condition[0]}
                                                value={condition[0]}
                                                checked={condition[1]["checked"]}
                                                onChange={() => handleCheck(condition[0])}
                                            />
                                            <label
                                                htmlFor={`custom-checkbox-${condition[0]}`}>{condition[1]["title"]}</label>
                                        </div>

                                    </div>
                                </li>);
                            })}

                        </ul>

                        <Field name={"have_other_medical_conditions"} title={"Do you have other medical conditions?"}
                               type={"text"} isRequired={false} value="" data={inputs.have_other_medical_conditions}
                               handleChange={handleChange}/>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default RegistrationForm;