import { useState } from "react";
import { userAPI } from "../rest-api/subscribers";

function UserCard (props) {

    const {fullName, joined, subscriber} = props.user;

    const [updatedName, setUpdatedName] = useState('');
    const [updatedSubStatus, setUpdatedSubStatus] = useState('')

    const getDate = (date) => {
        const dateObj = new Date(date);

        const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
        });

        return formattedDate;
    };
    
    //UPDATE
    const updateUser = async (event, input, prevName) =>{
        event.preventDefault();
        try{
            const newSubStat = updatedSubStatus === "true"? true : false;
            const noNameUpdate = updatedName === ""? prevName : updatedName;
            const updatedUser = {
                ...props.user,
                fullName: noNameUpdate,
                subscriber: newSubStat
            }
            await userAPI.put(updatedUser);
            props.change(true);
            // getUsers();

            //clean up Inputs
            document.getElementById('name.input').value = "";
            setUpdatedName('')
        }
        catch{
            console.log('No response from updateUser function of userAPI')
        }
    };

    //DELETE
    const deleteUser = async (event) => {
        event.preventDefault();
        try{
            await userAPI.delete(props.user.id);
            props.change(true);
            // getUsers();
        }
        catch{
            console.log('No response from deleteUser function of userAPI')
        }
    };

    return (
        <div className="row row-cols-3 p-2" id="user-divs">
            <div className="card col p-1">
                <div className="card-header">
                    <b>Client Name:</b> {fullName}<br></br>
                    <b>Joined On:</b> {getDate(joined)}<br></br>
                    <b>Subscriber:</b> {subscriber ? 'Paid Subscriber' : 'Not a Paid Subscriber'}<br></br>
                    <button className="btn btn-outline-danger" onClick={(event) => deleteUser(event)}>Delete</button>
                </div>
                <form className="update-form card-body">
                    <label className="form-label">Update Client Name: </label>
                    <input className="form-control" id="name-input" onChange={(event) => event.target.value === ''? setUpdatedName(fullName) : setUpdatedName(event.target.value)}></input><br></br>
                    <label className="form-label">Update Subscriber Status: </label>
                    <select className="form-select" onChange={(event) => setUpdatedSubStatus(event.target.value)}>
                        <option>No Change to Subscription</option>
                        <option value={'true'}>Currently a Subscriber</option>
                        <option value={'false'}>Not Currently a Subscriber</option>
                    </select><br></br>
                    <button className="btn btn-warning" onClick={(event) => updateUser(event, fullName)}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UserCard