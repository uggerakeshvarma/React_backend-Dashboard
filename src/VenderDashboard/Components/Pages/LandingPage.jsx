import React from 'react'

import './LandingPage.css';
import Sidbar from '../Components/Sidbar';
import NavBar from '../Components/NavBar';
import Login from '../Forms/Login';
import RegFirm from '../Forms/RegFirm';
import AddFirm from '../Forms/AddFirm';



const LandingPage = () => {
    return (
        <>
            <section className='landingsection'>
                <NavBar />
                <div className="Collectionsection">

                    <Sidbar />
                    <Login />
                 
                 
                    
                    
                 

                </div>


                <RegFirm />

                <AddFirm />

            </section>
        </>
    )
}

export default LandingPage
