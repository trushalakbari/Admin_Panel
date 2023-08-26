import { Button, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from 'react'
import apiHelper from '../../Comman/ApiHelper.js'
import ManageUser from './ManageUser.js';



export default function UserScreen() {

    const [users, setUsers] = useState([])
    const user = {
        fullName: "",
        email: "",
        password: "",
        role: "0",
    }
    const [userDetails, setuserDetails] = useState(user)
    const [open, setopen] = useState(false)

    const columns = [
        { field: "_id", headerName: "ID", flex: 1 },
        { field: "fullName", headerName: "FullName", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", width: 100 },
        {
            field: "actions", headerName: "Actions", width: 150, renderCell: (cell) => {

                return <>
                    <IconButton color='primary' onClick={() => {
                        setuserDetails(cell.row)
                        setopen(true)
                    }}  >
                        <ModeEditIcon />
                    </IconButton>
                    <IconButton color='error' onClick={() => RemoveUsers(cell.row._id)}>
                        <DeleteSweepIcon />
                    </IconButton>
                </>
            }
        },
    ]


    const GetUsers = async () => {
        try {
            const result = await apiHelper.fetchUser()
            if (result.status === 200) {
                setUsers(result.data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetUsers()
        // esli.nt-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const RemoveUsers = async (id) => {
        try {
            const result = await apiHelper.DeleteUser(id)

            if (result.status === 200) {
                GetUsers()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const UpadteUser = async () => {
        try {

            // eslint-disable-next-line no-unused-vars
            const result = await apiHelper.UpdateUser(userDetails._id, userDetails)

            setopen(false)
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                role: "0",
            })
            GetUsers()

        } catch (error) {
            console.log(error)
        }
    }






    return (
        <>
            <ManageUser UpadteUser={UpadteUser} GetUsers={GetUsers} open={open} setopen={setopen} userDetails={userDetails} setuserDetails={setuserDetails} />
            <div className="row">
                <div className="col-12 mb-3 d-flex justify-content-between">
                    <h3>Show And Manage Users</h3>
                    <Button variant='outlined' onClick={() => {
                        setopen(true)
                    }}>{userDetails._id ? "Update User" : "Add User"}</Button>
                </div>
                <div className="col-12">
                    <DataGrid rows={users} autoHeight={true} columns={columns} pageSizeOptions={[5, 10]} getRowId={(e) => e._id} />
                </div>
            </div>
        </>
    )
}
