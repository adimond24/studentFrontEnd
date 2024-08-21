
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";

const Record = (props) => (
    <tr>
        <td>{props.record.firstName}</td>
        <td>{props.record.lastName}</td>
        <td>{props.record.email}</td>
        <td>{props.record.age}</td>
        <td>{props.record.currentCollege}</td>
        <td>
            <Link className="btn btn-link" to={`/edits/${props.record._id}`}>
              Edit
            </Link>
            |
            <button 
              className="btn btn-link"
              onClick={() => props.deleteRecord(props.record._id)}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);

    // Fetch records from the database
    useEffect(() => {
        async function getRecords() {
            try {
                const response = await fetch(`http://localhost:3001/students`);
                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.statusText}`);
                }
                const records = await response.json();
                setRecords(records);
            } catch (error) {
                window.alert(error.message);
            } finally {
                setLoading(false);
            }
        }

        getRecords();
    }, []);

    // Delete a record
    async function deleteRecord(id) {
        try {
            await fetch(`http://localhost:3001/students/${id}`, {
                method: "DELETE",
            });
            setRecords(records.filter((record) => record._id !== id));
        } catch (error) {
            window.alert(error.message);
        }
    }

    // Render the list of records
    function recordList() {
        return records.map((record) => (
            <Record
              record={record}
              deleteRecord={() => deleteRecord(record._id)}
              key={record._id}
            />
        ));
    }

    // Render the component
    return (
        <div className="container">
            <h3 className="contact-title">Contact List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Current College</th>
                        <th>Modify Student</th>
                    </tr>
                </thead>
                <tbody>{loading ? <Loader /> : recordList()}</tbody>
            </table>
        </div>
    );
}
