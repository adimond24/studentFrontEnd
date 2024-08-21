import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        currentCollege: ""
    });
    const navigate = useNavigate();

    // Update form state
    function updateForm(value) {
        setForm(prev => ({
            ...prev,
            ...value
        }));
    }

    // Handle form submission
    async function onSubmit(e) {
        e.preventDefault();

        const newPerson = { ...form };

        try {
            await fetch("http://localhost:3001/students", { // Replace with your API URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            });
            setForm({
                firstName: "",
                lastName: "",
                email: "",
                age: "",
                currentCollege: "",
            });
            navigate("/");
        } catch (error) {
            window.alert(error);
        }
    }

    // Render form
    return (
        <div>
            <h3>Create New Contact</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={form.firstName} // Fixed: Use the value from state
                        onChange={(e) => updateForm({ firstName: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={form.lastName} // Fixed: Use the value from state
                        onChange={(e) => updateForm({ lastName: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={form.email} // Fixed: Use the value from state
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={form.age} // Fixed: Use the value from state
                        onChange={(e) => updateForm({ age: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currentCollege">Current College</label>
                    <input
                        type="text"
                        className="form-control"
                        id="currentCollege"
                        value={form.currentCollege} // Fixed: Use the value from state
                        onChange={(e) => updateForm({ currentCollege: e.target.value })}
                    />
                </div>

                <div className="form-group" style={{ marginTop: "10px" }}>
                    <input
                        type="submit"
                        value="Create Contact"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default Create;
