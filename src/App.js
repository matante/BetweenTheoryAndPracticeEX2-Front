import * as React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SiteTitle from "./Components/SiteTitle";
import Menu from "./Components/Menu";
import NoPage from "./Components/NoPage";
import Summary from "./Components/Summary";
import RegistrationForm from "./Components/RegistrationForm";

/**
 * This is the main component of this website. it contains the next components:
 * SiteTitle
 * Menu
 * HomePage
 * Summary
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    return (
        <div>
            <SiteTitle/>
            <BrowserRouter>
                <Menu/>
                <hr/>
                {/* a separating line */}
                <Routes>
                    {/* landing page */}
                    <Route path="/" element={<RegistrationForm/>}/>

                    {/* handles /summary */}
                    <Route path="summary" element={<Summary/>}/>

                    {/* handles other addresses */}
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}