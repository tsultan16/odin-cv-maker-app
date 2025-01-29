import { useState } from "react";

export default function General() {
    const [generalDetails, setGeneralDetails] = useState({firstName: "", lastName: "", email: "", phone: ""})

    const handleFirstNameChange = (e) => {
        setGeneralDetails({ ...generalDetails, firstName: e.target.value });
    };
    
    const handleLastNameChange = (e) => {
        setGeneralDetails({ ...generalDetails, lastName: e.target.value  });
    };

    const handleEmailChange = (e) => {
        setGeneralDetails({ ...generalDetails, email: e.target.value  });
    };

    const handlePhoneChange = (e) => {
        setGeneralDetails({ ...generalDetails, phone: e.target.value  });
    };

    const saveInfo = (e) => {
        localStorage.setItem("general_details", JSON.stringify(generalDetails));
        alert("Saved General Info!");
        console.log(JSON.parse(localStorage.getItem("general_details")));
    }

    return (
        <section className="general">
            <h5>General</h5>

            <div className="inputs">
                <input value={generalDetails.firstName} placeholder="First Name" onChange={handleFirstNameChange}/>
                <input value={generalDetails.lastName} placeholder="Last Name" onChange={handleLastNameChange}/>
                <input value={generalDetails.email} placeholder="Email" onChange={handleEmailChange}/>
                <input value={generalDetails.phone} placeholder="Phone" onChange={handlePhoneChange}/>
            </div>

            <button onClick={saveInfo}>Save</button>


        </section>
    );
}










