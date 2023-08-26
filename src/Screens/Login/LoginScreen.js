import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Validation from '../../Comman/Validation';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Path from '../../Comman/Paths';
import apiHelper from '../../Comman/ApiHelper';
import SendIcon from '@mui/icons-material/Send';



export default function LoginScreen({ Auth, setAuth }) {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = React.useState(true);
    const [isSubmited, setIsSubmited] = useState(false)
    const [loginError, SetLoginError] = useState([])
    const [token, settoken] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
        otp: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("TOKAN")
        if (token) {
            navigate(Path.dashboard)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const LoginHandler = async () => {
        try {
            setIsSubmited(true)
            const ValidatioResult = Validation(user, "login")

            if (ValidatioResult.length > 0) {
                SetLoginError(ValidatioResult)
                return
            }

            const result = await apiHelper.AdminLogin(user)

            if (result) {
                const Token = result.data.user.token
                settoken(Token)
            }

        } catch (error) {
            setAuth(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "Validation Error") {
                    SetLoginError(error.response.data.validationResult)
                    return
                }
            }
        }
    }

    const OtpVerify = async () => {
        try {
            setIsSubmited(true)
            const ValidatioResult = Validation(user, "OtpVerify")

            if (ValidatioResult.length > 0) {
                SetLoginError(ValidatioResult)
                return
            }

            const result = await apiHelper.VerifyOtp(user)

            if (result) {
                localStorage.setItem("TOKAN", JSON.stringify(token))
                navigate(Path.dashboard)
                setAuth(true)
            }

        } catch (error) {
            setAuth(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "Validation Error") {
                    SetLoginError(error.response.data.validationResult)
                    return
                }
            }
        }
    }

    return (
        <div>


            <div>
                <Dialog open={open}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent className='d-flex flex-column'>
                        <FormControl sx={{ m: 2, width: '40ch' }} variant="outlined">
                            <TextField
                                error={loginError.find(x => x.key === "email")}
                                id="outlined-adornment-password"
                                type={"email"}
                                label="Email"
                                helperText={loginError.find(x => x.key === "email")?.message}
                                onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                    if (isSubmited) {
                                        const ValidatioResult = Validation({ ...user, email: e.target.value })
                                        SetLoginError(ValidatioResult)
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '40ch' }} variant="outlined">
                            <TextField
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                label="Password"
                                helperText={loginError?.find(x => x.key === "password" ? true : false)?.message}
                                error={loginError.find(x => x.key === "password")}
                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value })
                                    if (isSubmited) {
                                        const ValidatioResult = Validation({ ...user, password: e.target.value }, "login")
                                        SetLoginError(ValidatioResult)
                                    }
                                }}
                            />
                            <div className='d-flex gap-3 align-items-center mt-2'>

                                <FormControl className='d-flex m-0' sx={{ mt: 1, width: 220 }}>
                                    <TextField id="outlined-basic"
                                        helperText={loginError?.find(x => x.key === "otp" ? true : false)?.message}
                                        error={loginError?.find(x => x.key === "otp")}
                                        onChange={(e) => {
                                            setUser({ ...user, otp: e.target.value })
                                            if (isSubmited) {
                                                const ValidatioResult = Validation({ ...user, otp: e.target.value }, "OtpVerify")
                                                SetLoginError(ValidatioResult)
                                            }
                                        }}
                                        label="OTP" variant="outlined" />
                                </FormControl>
                                <Button onClick={LoginHandler} variant="contained" sx={{ width: "10vw" }} endIcon={<SendIcon />}>
                                    Send
                                </Button>
                            </div>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button >Cancel</Button>
                        <Button onClick={OtpVerify} >Login</Button>
                    </DialogActions>
                </Dialog>
            </div>



        </div>
    )
}