import { useState } from "react";

export default function General() {
    const [generalDetails, setGeneralDetails] = useState({firstName: "", lastName: "", email: "", phone: "", opening:""})
    const [editMode, setEditMode] = useState(true);

    // save general details to local storage
    localStorage.setItem('general_details', JSON.stringify(generalDetails)); 

    const handleChange = (event, field) => {
        let updated_details = {...generalDetails};
        updated_details[field] = event.target.value; 
        setGeneralDetails(updated_details);
    };

    const handleSave = (e) => {
        // alert("Saved General Info!");
        setEditMode(false);        
    }

    const handleEdit = (e) => {
        setEditMode(true);
        console.log("Editing General details.");
    }

    
    return (
        <>
            <DetailsEdit info={generalDetails} onChange={handleChange} onSave={handleSave} displayStyle={editMode?'block':'none'} />
            <Details info={generalDetails} onEdit={handleEdit} displayStyle={editMode?'none':'block'} />
        </>
    ); 
}

function DetailsEdit({ info, onChange, onSave, displayStyle }) {
    return (
        <section className="general" style={{display: displayStyle}}>
            <h3>General</h3>

            <div className="inputs">
                <input value={info.firstName} placeholder="First Name" onChange={(e) => onChange(e, "firstName")}/>
                <input value={info.lastName} placeholder="Last Name" onChange={(e) => onChange(e, "lastName")}/>
                <input value={info.email} placeholder="Email" onChange={(e) => onChange(e, "email")}/>
                <input value={info.phone} placeholder="Phone" onChange={(e) => onChange(e, "phone")}/>
            </div>
            <div className="opening">
                <textarea id="opening" name="opening" rows="5" cols="50" placeholder="Opening Statement (Optional)" onChange={(e) => onChange(e, "opening")} value={info.opening}></textarea>
            </div>
            <button onClick={onSave}>Save</button>

        </section>
    );
}

function Details({ info, onEdit, displayStyle }) {
    return (
        <section className="general" style={{display: displayStyle}}>
            <h5>General</h5>

            <div className="inputs">
                <p>{info.firstName + " " + info.lastName}</p>
                <p>{info.email}</p>
                <p>{info.phone}</p>
            </div>
            <div className="opening">
                <p>{info.opening}</p>
            </div>
            <button onClick={onEdit}>Edit</button>

        </section>
    );
}








