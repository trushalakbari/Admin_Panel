import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import apiHelper from '../../Comman/ApiHelper';
import Validation from '../../Comman/Validation';
import { FormControl, FormHelperText } from '@mui/material';



export default function ManageUser(props) {
    const { open, setopen, setuserDetails, userDetails, GetUsers, UpadteUser } = props

    const [Error, setError] = useState([])
    const [isSubmited, setisSubmited] = useState(false)

    const handleClose = () => {
        setopen(false);
        setuserDetails({
            fullName: "",
            email: "",
            password: "",
            role: "0",
        })
        setError([])
    };
    const AddUSer = async () => {
        try {
            setisSubmited(true)
            const Validationresult = Validation(userDetails, "AdminUser")
            if (Validationresult.length > 0) {
                return setError(Validationresult)
            }
            // eslint-disable-next-line no-unused-vars
            const result = await apiHelper.InsertUser(userDetails)
            setisSubmited(false)
            GetUsers()
            setopen(false)
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                role: "0",
            })

        } catch (error) {
            console.log(error)
        }
    }





    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <center>
                    <DialogTitle>{userDetails._id ? "Update User" : "Add User"}</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="FullName"
                        type="text"
                        helperText={Error?.find(x => x.key === "fullName")?.message}
                        error={Error.find((x) => x.key === "fullName")}
                        value={userDetails.fullName}
                        onChange={(e) => {
                            setuserDetails(
                                { ...userDetails, fullName: e.target.value })
                            if (isSubmited) {
                                const ValidationResult = Validation({ ...userDetails, fullName: e.target.value }, "AdminUser")
                                setError(ValidationResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        helperText={Error?.find(x => x.key === "email")?.message}
                        error={Error.find((x) => x.key === "email")}
                        value={userDetails.email}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, email: e.target.value })
                            if (isSubmited) {
                                const ValidationResult = Validation({ ...userDetails, email: e.target.value }, "AdminUser")
                                setError(ValidationResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />

                    <FormControl sx={{ mt: 1, minWidth: 120 }} fullWidth>
                        <Select
                            onChange={(e) => {
                                setuserDetails({ ...userDetails, role: e.target.value })
                                if (isSubmited) {
                                    const ValidationResult = Validation({ ...userDetails, role: e.target.value }, "AdminUser")
                                    setError(ValidationResult)
                                }
                            }}
                            value={userDetails.role}
                            error={Error.find((x) => x.key === "role")}
                            className='mt-1' fullWidth>
                            <MenuItem value={"0"}><i>---Select Role---</i></MenuItem>
                            <MenuItem value={"editor"}>Editor</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"sco"}>Sco</MenuItem>
                        </Select>
                        <FormHelperText error={Error?.find((x) => x.key === "role")}>{Error.find(x => x.key === "role")?.message}</FormHelperText>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        disabled={userDetails._id}
                        helperText={Error?.find(x => x.key === "password")?.message}
                        error={Error.find((x) => x.key === "password")}
                        value={userDetails.password}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, password: e.target.value })
                            if (isSubmited) {
                                const ValidationResult = Validation({ ...userDetails, password: e.target.value }, "AdminUser")
                                setError(ValidationResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={userDetails._id ? UpadteUser : AddUSer}>  {userDetails._id ? "Upadte" : "Add "}  </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
