import React, { useState } from 'react'
import './Addfirm.css'
import { API_URL } from '../Data/Apipath'

const Addfirm = () => {

    const [FirmName, setfirmName] = useState('')
    const [area, setarea] = useState('')
    const [catagory, setcatagry] = useState([])
    const [Region, setregoin] = useState([])
    const [Offer, setoffer] = useState('')
    const [Image, setiamge] = useState(null)

    const handlechangeCategory = (event) => {
        const value = event.target.value;
        if (catagory.includes(value)) {
            setcatagry(catagory.filter((item) => item !== value))
        } else {
            setcatagry([...catagory, value])
        }
    }


    const handleChangeRegion = (event) => {
        const value = event.target.value;
        if (Region.includes(value)) {
            setregoin(Region.filter((item) => item !== value))
        } else {
            setregoin([...Region, value])
        }

    }

    //Image Upload
    const ImageUpload = async (e) => {
        const selectImage = e.target.files[0]
        setiamge(selectImage)
    }
    const HandlieFirmSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const loginToken = localStorage.getItem("LoginToken");
            if (!loginToken) {
                console.error("User Not Authenticated");
                return; // Exit early if user is not authenticated
            }
    
            const formdata = new FormData();
            formdata.append("FirmName", FirmName);
            formdata.append('area', area);
            formdata.append("Offer", Offer);
            formdata.append('Image', Image);
    
            // Append selected categories to form data
            catagory.forEach((value) => {
                formdata.append('catagory', value);
            });
    
            // Append selected regions to form data
            Region.forEach((value) => {
                formdata.append('Region', value);
            });
    
            // Make the API call to add firm
            const response = await fetch(`${API_URL}/firm/add-firm`, {
                method: "POST",
                headers: {
                    'Token': loginToken
                },
                body: formdata
            });
    
            const data = await response.json();
            console.log('Firm Added:', data);
    
            if (response.ok) {
                alert("Firm Added Successfully");
    
                // Reset form fields
                setfirmName('');
                setarea('');
                setcatagry([]);
                setoffer('');
                setregoin([]);
                setiamge(null);
    
                const firmId = data.firmId;  // Check if `firmId` is returned in the response
                if (firmId) {
                    localStorage.setItem('FirmId', firmId);
                    console.log("Firm ID saved to localStorage:", firmId);
                } else {
                    console.log('FirmId not found in response');
                }
            } else {
                // Handle error cases, for example if the firm already exists
                if (data.message === "vendor can have only one firm") {
                    alert("Firm already exists. Only one firm can be added.");
                } else {
                    alert("Failed to Add Firm. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error adding firm:", error);
            alert("Error occurred while adding the firm. Please try again.");
        }
    };
    
    
    return (
        //FirmName, area, catagory, Region, Offer  ,Image
        <form className='ContainerAddproduct' onSubmit={HandlieFirmSubmit}>

            <h3>Add Firm</h3>
            {/* FirmName */}
            <label htmlFor="">Firm Name</label><br />
            <input type="text" name="FirmName" onChange={(e) => setfirmName(e.target.value)} id="FirmName" placeholder='Enter your Name' /> <br />
            <label htmlFor="">Area</label><br />
            <input type="text" name="area" id="area" onChange={(e) => setarea(e.target.value)} placeholder='Enter your Name' /> <br />
            {/* Cotegory */}

            <div className="checkinp">
                <label >Catagory</label>
                <div className="inboxcheckbox">
                    <div className="checkboxcontiner">
                        <label >Veg</label>
                        <input type="checkbox" checked={catagory.includes('veg')} onChange={handlechangeCategory} name="" id="" value='veg' />
                    </div>
                    <div className="checkboxcontiner">
                        <label>Non-Veg</label>
                        <input type="checkbox" name="" checked={catagory.includes('Non-veg')} onChange={handlechangeCategory} id="" value="Non-veg" />
                    </div>
                </div>
            </div>

            {/* Offer */}
            <label htmlFor="">Offer</label><br />
            <input type="text" name="" id="" onChange={(e) => setoffer(e.target.value)} placeholder='Enter your Name' /> <br />


            {/* Region */}
            <div className="checkinp">
                <label >Region</label>
                <div className="inboxcheckbox">
                    <div className="checkboxcontiner">
                        <label >South Indian</label>
                        <input type="checkbox" name="SothIndia" checked={Region.includes('SothIndia')} onChange={handleChangeRegion} id="" value='SothIndia'
                        />
                    </div>
                    <div className="checkboxcontiner">
                        <label>North-Indian</label>
                        <input type="checkbox" name="NortIndia" id="" checked={Region.includes('NortIndia')} onChange={handleChangeRegion} value='NortIndia' />
                    </div>
                    <div className="checkboxcontiner">
                        <label>Chinese</label>
                        <input type="checkbox" name="Chineis" id="" checked={Region.includes('Chineis')} onChange={handleChangeRegion} value='Chineis' />
                    </div>
                    <div className="checkboxcontiner">
                        <label>Bekery</label>
                        <input type="checkbox" name="Bakery" checked={Region.includes('Bakery')} onChange={handleChangeRegion} id="" value='Bakery' />
                    </div>
                </div>
            </div>
            {/* Image */}
            <label htmlFor="">Firm Image</label><br />
            <input type="file" name="" id="" placeholder='Enter your Name' onChange={ImageUpload} /> <br />


            <button type='Submit'>Add Firm</button>
        </form>

    )
}

export default Addfirm
