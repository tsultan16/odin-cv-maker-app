import { useState } from "react";


export default function Education() {
    const [showAdd, setShowAdd] = useState(false);
    console.log("showAdd: ", showAdd);
    
    const clickHandle = (e) => {
        setShowAdd(true);
    };

    const onSave = () => {
        setShowAdd(false);
    }

    return (
        <section className="education">
            <h5>Your Education Details</h5>
            <EducationList />
            <button onClick={clickHandle}>Add Education</button>
            <AddEducation onSave={onSave} show={showAdd}/>

        </section>
    );
}


function EducationList() {
    let education_list = JSON.parse(localStorage.getItem("education_list")) || null;
    if (education_list) {
        console.log("Found Education list: ");
        console.log(education_list);
        
        // create list of education components
        return (
            <>
                {education_list.map((info) => <EducationListItem key={info.dateStarted} {...info}/> )}
            </>
        );

    } else {
        console.log("Not Found");
        return null;
    }
}


function EducationListItem(props) {
    console.log("props", props);
    return (
        <div className="education-item">
            <p>School Name - {props.schoolName}</p>
            <p>Title of Study - {props.titleOfStudy}</p>
            <p>Date Started - {props.dateStarted}</p>
            <p>Date Completed - {props.dateCompleted}</p>
        </div>
    );
}


function AddEducation({ onSave, show }) {

    if (!show) {
        return null;
    }

    const [details, setDetails] = useState({schoolName: "", titleOfStudy: "", dateStarted: "", dateCompleted: ""})

    const handleSchoolNameChange = (e) => {
        setDetails({ ...details, schoolName: e.target.value });
    };
    
    const handleTitleChange = (e) => {
        setDetails({ ...details, titleOfStudy: e.target.value  });
    };

    const handleDateStartedChange = (e) => {
        setDetails({ ...details, dateStarted: e.target.value  });
    };

    const handleDateCompletedChange = (e) => {
        setDetails({ ...details, dateCompleted: e.target.value  });
    };

    const saveInfo = (e) => {
        let education_list = JSON.parse(localStorage.getItem("education_list")) || null;
        if (education_list) {
            console.log("Found");             
        } else {
            console.log("Not Found");
            education_list = [];
        }

        education_list.push(details);
        console.log("Created New Education List", education_list);
        localStorage.setItem("education_list", JSON.stringify(education_list));
        alert("Saved Education Info!");
        console.log("From Local Storage:", JSON.parse(localStorage.getItem("education_list")));
        
        setDetails({schoolName: "", titleOfStudy: "", dateStarted: "", dateCompleted: ""});
        
        // remove form after saving
        onSave();
    }

    return (
        <div className="add-education">
            <div className="inputs">
                <input value={details.schoolName} placeholder="School Name" onChange={handleSchoolNameChange}/>
                <input value={details.titleOfStudy} placeholder="Title of Study" onChange={handleTitleChange}/>
                <label>
                    Date Started <input value={details.dateStarted} type="date" onChange={handleDateStartedChange}/>
                </label>
                <label>
                    Date Completed <input value={details.dateCompleted} type="date" onChange={handleDateCompletedChange}/>
                </label>
                
            </div>
            <button onClick={saveInfo}>Save</button>

        </div>

    );

}

