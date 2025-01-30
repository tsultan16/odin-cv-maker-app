import { useState } from "react";

const initial_list = [
    {id: crypto.randomUUID(),  companyName: "Alphabet Inc.", positionTitle: "Junior IT Specialist", responsibilities:"Assisting customers with setting up and maintaining server OS.", dateStart:"2023-03-20", dateEnd:"2024-12-01"},
    {id: crypto.randomUUID(),  companyName: "UMN", positionTitle: "Lab Instructor", responsibilities:"Teach freshman physics labs for mechanics and electromagnetism.", dateStart:"2020-08-16", dateEnd:"2022-07-25"},
    {id: crypto.randomUUID(),  companyName: "SUNY Poly", positionTitle: "Teaching Assistant", responsibilities:"Conduct recitations for undergrad calculus-based physics subjects, grade homeworks.", dateStart:"2012-09-08", dateEnd:"2016-05-02"},   
];


export default function Experience() {
    const [items, setItems] = useState(initial_list);
    const [showAdd, setShowAdd] = useState(false);
    const [editMode, setEditMode] = useState(false)

    // save general details to local storage
    localStorage.setItem('experience_details', JSON.stringify(items)); 

    console.log("items: ", items);
    console.log("showAdd: ", showAdd);

    const clickAddHandle = (e) => {
        setShowAdd(true);
    };

    const clickEditHandle = (e) => {
        setEditMode(true);
    };

    const onSave = (e) => {
        setEditMode(false);
    }

    const handleAddItem = (new_item) => {
        if (new_item !== null) {
            console.log("Adding item with id: ", new_item.id);
            // record new item
            setItems([...items, new_item])         
            console.log("Added new education item.");
        }
        // hide add form
        setShowAdd(false);
    }

    const handleDeleteItem = (delete_item_id) => {
        console.log("Deleting item with id: ", delete_item_id);
        setItems(items.filter(item => item.id != delete_item_id));
    }

    const handleChangeItem = (event, updated_item, field) => {
        // console.log(`Changing item ${updated_item.companyName}, field: ${field}`)
        // update item details
        const items_updated = items.map(item => {
            if (item.id !== updated_item.id) {
                return item;
            } else {
                item[field] = event.target.value;
                return item;
            }
            
        });
        setItems([...items_updated]);
    };


    return (
        <section className="experience">
            <h3>Your Experience Details</h3>
            <ExperienceList items={items} displayStyle={!editMode && !showAdd} />
            <ExperienceListEdit items={items} onDeleteItem={handleDeleteItem} onChangeItem={handleChangeItem} onSave={onSave} displayStyle={editMode  && !showAdd} />
            <div className="experience-buttons">
                <button onClick={clickAddHandle} style={{display: (!editMode && !showAdd)?'block':'none'}}>Add Experience</button>
                <button onClick={clickEditHandle} style={{display: (!editMode && !showAdd)?'block':'none'}} >Edit</button>
            </div>
            <AddExperience onAdd={handleAddItem} show={showAdd} />
        </section>
    );
}


function ExperienceList({ items, displayStyle }) {
    return (
        <ul style={{display: displayStyle?'block':'none'}}>
            {items.map((item) => (
                <li key={item.id}>
                    <div className="education-item">
                        <div>
                            <p>Company Name - {item.companyName}</p>
                            <p>Position Title - {item.positionTitle}</p>
                            <p>Date Start - {item.dateStart}</p>
                            <p>Date End - {item.dateEnd}</p>
                        </div>
                        <div className="job-responsibilities">
                            <br /> 
                            <p>Job Responsibilities: </p>
                            <p>{item.responsibilities}</p>
                        </div>               
                    </div>
                </li>    
            ))}
        </ul>   
    );
}


function ExperienceListEdit({ items, onDeleteItem, onChangeItem, onSave, displayStyle }) {
    return (
        <>
            <ul style={{display: displayStyle?'block':'none'}}>
                {items.map((item) => (
                    <li key={item.id}>
                        <div className="education-item">
                            <div>
                                <p>School Name - <input type="text" value={item.companyName} onChange={(e) => onChangeItem(e, item, 'companyName')}/></p>
                                <p>Title of Study - <input type="text" value={item.positionTitle} onChange={(e) => onChangeItem(e, item, 'positionTitle')}/></p>
                                <p>Title of Study - <input type="text" value={item.positionTitle} onChange={(e) => onChangeItem(e, item, 'positionTitle')}/></p>
                                <p>Date Start - <input type="date" value={item.dateStart} onChange={(e) => onChangeItem(e, item, 'dateStart')}/></p>
                                <p>Date End - <input type="date" value={item.dateEnd} onChange={(e) => onChangeItem(e, item, 'dateEnd')}/></p>    
                                <br />         
                            </div>               
                            <div className="job-responsibilities">
                                <textarea id="responsibilities" name="responsibilities" rows="5" cols="50" placeholder="Job Responsibilities" onChange={(e) => onChangeItem(e, item, "responsibilities")} value={item.responsibilities}></textarea>
                            </div>
                            <button onClick={() => onDeleteItem(item.id)}>Delete</button>
                        </div>
                    </li>    
                ))}
            </ul>
            <button onClick={onSave} style={{display: displayStyle?'block':'none'}}>Save</button>   
        </>
    );
}


function AddExperience({ onAdd, show }) {

    const [details, setDetails] = useState({companyName: "", positionTitle: "", dateStart: "", dateEnd: ""})

    if (!show) {
        return null;
    }

    const handleCompanyNameChange = (e) => {
        setDetails({ ...details, companyName: e.target.value });
    };
    
    const handleTitleChange = (e) => {
        setDetails({ ...details, positionTitle: e.target.value  });
    };

    const handleDateStartChange = (e) => {
        setDetails({ ...details, dateStart: e.target.value  });
    };

    const handleDateEndChange = (e) => {
        setDetails({ ...details, dateEnd: e.target.value  });
    };

    const handleResponsibilitiesChange = (e) => {
        setDetails({ ...details, responsibilities: e.target.value  });
    };

    const saveHandler = () => {
        const new_item = {...details, id: crypto.randomUUID()};        
        setDetails({companyName: "", positionTitle: "", dateStart: "", dateEnd: ""});
        onAdd(new_item);
        console.log("Clicked save.");
    }

    const cancelHandler = () => {
        onAdd(null);
        console.log("Clicked cancel.");
    }

    return (
        <div className="add-experience">
            <div className="inputs">
                <input value={details.companyName} placeholder="Company Name" onChange={handleCompanyNameChange}/>
                <input value={details.positionTitle} placeholder="Position Title" onChange={handleTitleChange}/>
                <label>
                    Date Start <input value={details.dateStart} type="date" onChange={handleDateStartChange}/>
                </label>
                <label>
                    Date End <input value={details.dateEnd} type="date" onChange={handleDateEndChange}/>
                </label>
            </div>
            <div className="job-responsibilities">
                <textarea id="responsibilities" name="responsibilities" rows="5" cols="50" placeholder="Job Responsibilities" onChange={handleResponsibilitiesChange}>{details.responsibilities}</textarea>
            </div>
            <div className="experience-buttons">
                <button onClick={saveHandler}>Save</button>
                <button onClick={cancelHandler}>Cancel</button>
            </div>
        </div>

    );

}



