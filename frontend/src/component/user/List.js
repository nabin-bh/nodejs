function UserList({ users, setUserForm }) {
    const deleteUser = (id) => {
        var result = window.confirm("Want to delete?");
        if (result) {
            fetch(`http://localhost:3001/api/users/${id}`, {
                method: 'delete'
            })
                .then()
                .then(() => {
                    setUserForm(() => ({
                        name: "",
                        email: "",
                        submit: true,
                    }))
                })
        }
    }

    return (<>
        <h3>User List</h3>
        <table border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <button>edit</button>
                                    <button onClick={() => { deleteUser(data.id) }}>delete</button>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    </>
    )
}

export default UserList