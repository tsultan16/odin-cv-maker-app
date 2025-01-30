import { useState } from "react";

const initial_list = [
    {id: crypto.randomUUID(),  schoolName: "Uni Melbourne", titleOfStudy: "Master IT", dateStarted:"20-2-2023", dateCompleted:"1-12-2024"},
    {id: crypto.randomUUID(),  schoolName: "UMN", titleOfStudy: "Master Physics", dateStarted:"16-8-2020", dateCompleted:"25-7-2022"},
    {id: crypto.randomUUID(),  schoolName: "SUNY Poly", titleOfStudy: "BS ECE, Applied Math", dateStarted:"8-9-2012", dateCompleted:"2-5-2016"},   
];


export default function Education() {
    const [items, setItems] = useState(initial_list);
    const [showAdd, setShowAdd] = useState(false);

    console.log("items: ", items);
    console.log("showAdd: ", showAdd);
    
    const clickHandle = (e) => {
        setShowAdd(true);
    };

    const handleAddItem = (new_item) => {
        console.log("Adding item with id: ", new_item.id);
        // record new item
        setItems([...items, new_item])     
        // hide add form
        setShowAdd(false);
        console.log("Added new education item.");
    }

    const handleDeleteItem = (delete_item_id) => {
        console.log("Deleting item with id: ", delete_item_id);
        setItems(items.filter(item => item.id != delete_item_id));
    }

    const handleChangeItem = (event, updated_item, field) => {
        console.log(`Changing item ${updated_item.schoolName}, field: ${field}`)
        // update item details
        updated_item[field] = event.target.value;
        let items_filtered = items.filter(item => item.id !== updated_item.id);
        setItems([...items_filtered, updated_item]);
    };


    return (
        <section className="education">
            <h5>Your Education Details</h5>
            <EducationList items={items} onDeleteItem={handleDeleteItem} onChangeItem={handleChangeItem} />
            <button onClick={clickHandle}>Add Education</button>
            <AddEducation onAdd={handleAddItem} show={showAdd}/>
        </section>
    );
}



function EducationList({ items, onDeleteItem, onChangeItem }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    <div className="education-item">
                        <p>School Name - <input type="text" value={item.schoolName} onChange={(e) => onChangeItem(e, item, 'schoolName')}/></p>
                        <p>Title of Study - {item.titleOfStudy}</p>
                        <p>Date Started - {item.dateStarted}</p>
                        <p>Date Completed - {item.dateCompleted}</p>
                        <button onClick={() => onDeleteItem(item.id)}>Delete</button>
                    </div>               
                </li>    
            ))}
        </ul>
        
    );

}


function EducationListItem( {item, onDelete} ) {
    console.log("list item:", item);
    return (
        <div className="education-item">
            <p>School Name - {item.schoolName}</p>
            <p>Title of Study - {item.titleOfStudy}</p>
            <p>Date Started - {item.dateStarted}</p>
            <p>Date Completed - {item.dateCompleted}</p>
            <button onClick={onDelete}>Delete</button>
        </div>
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

    const saveInfo = () => {
        const new_item = {...details};        
        setDetails({id: crypto.randomUUID(), schoolName: "", titleOfStudy: "", dateStarted: "", dateCompleted: ""});
        onAdd(new_item);
        console.log("Clicked save.");
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

