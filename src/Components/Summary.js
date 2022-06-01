import * as React from 'react';
import {useEffect, useState} from "react";

import APICommands from "../utils/APICommands";
import axios from 'axios';
import Field from "./Field";
import SelectField from "./SelectField";

/**
 * this component serves a Summary of all the data gathered.
 * It displays a table of all the users.
 * One can filter by city name or by dates, and also download the data as Excel file
 * it contains the next components:
 * Field
 * SelectField
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Summary(props) {

    // as got from the server side
    const [data, setData] = useState({});

    // start and end (from and till)
    const [dates, setDates] = useState({});

    // name of the city
    const [city, setCity] = useState("");

    /************************/
    /**
     * a function which handles changes in the form and stores the new data
     * @param event
     */
    const handleDatesChange = (event) => {
        const name = event.target.name;
        const userInput = event.target.value;
        setDates(values => ({...values, [name]: userInput}));
    };

    /************************/

    /**
     * a function to handle the filter by dates requests
     * @param event
     * @returns {Promise<void>}
     */
    const submitDates = async (event) => {
        event.preventDefault(); // no page refresh
        const result = await axios.get(APICommands.getUsersByDateURL(dates.from, dates.till))
        setData(result.data);
    }
    /************************/

    /**
     * a function to handle the filter by city requests
     * @param event
     * @returns {Promise<void>}
     */
    const submitCity = async (event) => {
        event.preventDefault(); // no page refresh
        const result = await axios.get(APICommands.getUsersByCityURL(city))
        setData(result.data);
    }
    /************************/

    /**
     * effect which run in the first time the user enters the page, to display former data
     */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(APICommands.userDbApiURL);
            setData(result.data);
        };
        fetchData();
    }, []);
    /************************/


    return (
        <>
            <div className="row">
                <div className="col-5">
                    <form onSubmit={submitDates}>
                        <Field name={"from"} title={"Enter the starting date"} type={"date"} isRequired={true}
                               data={dates.from} handleChange={handleDatesChange}/>
                        <Field name={"till"} title={"Enter the ending date"} type={"date"} isRequired={true}
                               data={dates.till} handleChange={handleDatesChange}/>
                        <button type="submit" className="btn btn-primary">Filter by dates</button>
                    </form>
                </div>

                <div className="col-1">OR</div>

                <div className="col-3">
                    <form onSubmit={submitCity}>
                        <SelectField defaultValueID={''} defaultValueText="Choose a city" disableDefault={true}
                                     name='city' onChange={event => setCity(event.target.value)} value={city}
                                     options={[
                                         {value: "Jerusalem", name: "Jerusalem"},
                                         {value: "Tel Aviv", name: "Tel Aviv"},
                                         {value: "Tiberias", name: "Tiberias"},
                                     ]}
                        />
                        <br/>
                        <button type="submit" className="btn btn-primary">Filter by City</button>
                    </form>
                </div>
                <div className="col-1">OR</div>

                <div className="col">
                    <a className="btn btn-primary" href={APICommands.exportToExcelURL} role="button">Export
                        to Excel</a>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Birth Date</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">Zip Code</th>
                    <th scope="col">Landline</th>
                    <th scope="col">Cellular Phone</th>
                    <th scope="col">Is Covid 19 Infected</th>
                    <th scope="col">Have Diabetes</th>
                    <th scope="col">Have Cardio Problems</th>
                    <th scope="col">Have Allergies</th>
                    <th scope="col">Have Other Medical Conditions</th>

                </tr>
                </thead>
                <tbody>
                {
                    /**
                     * for each person, add the data to the table
                     */
                    Object.values(data).map((person) => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            <td>{person.birth_date}</td>
                            <td>{person.address}</td>
                            <td>{person.city}</td>
                            <td>{person.zip_code}</td>
                            <td>{person.landline}</td>
                            <td>{person.cellular_phone}</td>

                            <td className={person.is_covid_19_infected ? "text-danger" : "text-success"}>
                                {person.is_covid_19_infected ? "V" : "X"}</td>

                            <td className={person.have_diabetes ? "text-danger" : "text-success"}>
                                {person.have_diabetes ? "V" : "X"}</td>

                            <td className={person.have_cardio_problems ? "text-danger" : "text-success"}>
                                {person.have_cardio_problems ? "V" : "X"}</td>

                            <td className={person.have_allergies ? "text-danger" : "text-success"}>
                                {person.have_allergies ? "V" : "X"}</td>

                            <td>{person.have_other_medical_conditions}</td>

                            <td/>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </>);
}

export default Summary;