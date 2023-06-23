function CreateUser({ userForm, setUserForm }) {

    const handleSubmit = () => {
        fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        }).then(res => res.json())
            .then(res => setUserForm(() => ({
                submit: true,
            })));
    }

    const handleChange = (e) => {
        setUserForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            <h4>Create New User</h4>
            <form  >
                <div >
                    <label>Name</label> <br />
                    <input type="text" name="name" value={userForm.name} onChange={handleChange} placeholder="Name" />
                </div>
                <div >
                    <label>Email</label> <br />
                    <input name="email" type="email" value={userForm.email} onChange={handleChange} placeholder="email@domain.com" />
                </div>
                <br />
                <button type="button" onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default CreateUser