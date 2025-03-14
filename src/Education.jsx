import { useState } from "react";

const initial_list = [
    {id: crypto.randomUUID(),  schoolName: "Uni Melbourne", titleOfStudy: "Master IT", dateStarted:"2023-03-20", dateCompleted:"2024-12-01"},
    {id: crypto.randomUUID(),  schoolName: "UMN", titleOfStudy: "Master Physics", dateStarted:"2020-08-16", dateCompleted:"2022-07-25"},
    {id: crypto.randomUUID(),  schoolName: "SUNY Poly", titleOfStudy: "BS ECE, Applied Math", dateStarted:"2012-09-08", dateCompleted:"2016-05-02"},   
];


export default function Education() {
    const [items, setItems] = useState(initial_list);
    const [showAdd, setShowAdd] = useState(false);
    const [editMode, setEditMode] = useState(false)

    // save general details to local storage
    localStorage.setItem('education_details', JSON.stringify(items)); 

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
        // console.log(`Changing item ${updated_item.schoolName}, field: ${field}`)
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
        <section className="education">
            <h3>Your Education Details</h3>
            <EducationList items={items} displayStyle={!editMode && !showAdd} />
            <EducationListEdit items={items} onDeleteItem={handleDeleteItem} onChangeItem={handleChangeItem} onSave={onSave} displayStyle={editMode  && !showAdd} />
            <div className="education-buttons">
                <button onClick={clickAddHandle} style={{display: (!editMode && !showAdd)?'block':'none'}}>Add Education</button>
                <button onClick={clickEditHandle} style={{display: (!editMode && !showAdd)?'block':'none'}} >Edit</button>
            </div>
            <AddEducation onAdd={handleAddItem} show={showAdd} />
        </section>
    );
}


function EducationList({ items, displayStyle }) {
    return (
        <ul style={{display: displayStyle?'block':'none'}}>
            {items.map((item) => (
                <li key={item.id}>
                    <div className="education-item">
                        <p>School Name - {item.schoolName}</p>
                        <p>Title of Study - {item.titleOfStudy}</p>
                        <p>Date Started - {item.dateStarted}</p>
                        <p>Date Completed - {item.dateCompleted}</p>
                    </div>               
                </li>    
            ))}
        </ul>   
    );
}


function EducationListEdit({ items, onDeleteItem, onChangeItem, onSave, displayStyle }) {
    return (
        <>
            <ul style={{display: displayStyle?'block':'none'}}>
                {items.map((item) => (
                    <li key={item.id}>
                        <div className="education-item">
                            <p>School Name - <input type="text" value={item.schoolName} onChange={(e) => onChangeItem(e, item, 'schoolName')}/></p>
                            <p>Title of Study - <input type="text" value={item.titleOfStudy} onChange={(e) => onChangeItem(e, item, 'titleOfStudy')}/></p>
                            <p>Date Started - <input type="date" value={item.dateStarted} onChange={(e) => onChangeItem(e, item, 'dateStarted')}/></p>
                            <p>Date Completed - <input type="date" value={item.dateCompleted} onChange={(e) => onChangeItem(e, item, 'dateCompleted')}/></p>
                            <button onClick={() => onDeleteItem(item.id)}>Delete</button>               
                        </div>               
                    </li>    
                ))}
            </ul>
            <button onClick={onSave} style={{display: displayStyle?'block':'none'}}>Save</button>   
        </>
    );
}


function AddEducation({ onAdd, show }) {

    const [details, setDetails] = useState({schoolName: "", titleOfStudy: "", dateStarted: "", dateCompleted: ""})

    if (!show) {
        return null;
    }

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

    const saveHandler = () => {
        const new_item = {...details, id: crypto.randomUUID()};        
        setDetails({schoolName: "", titleOfStudy: "", dateStarted: "", dateCompleted: ""});
        onAdd(new_item);
        console.log("Clicked save.");
    }

    const cancelHandler = () => {
        onAdd(null);
        console.log("Clicked cancel.");
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
            <div className="education-buttons">
                <button onClick={saveHandler}>Save</button>
                <button onClick={cancelHandler}>Cancel</button>
            </div>
        </div>

    );

}
