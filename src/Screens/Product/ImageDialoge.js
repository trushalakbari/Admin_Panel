/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react';
import apiHelper from '../../Comman/ApiHelper';


export default function ImageDialog(props) {

    const { setfuturingImage } = props;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [images, setImages] = useState([])
    const [tempSelecting, settempSelecting] = useState({})

    const handleClickOpen = async () => {
        try {
            setOpen(true);
            const result = await apiHelper.fetchMedia()
            if (result.status === 200) {
                setImages(result.data.result)
            }

        } catch (error) {
            console.log(error);
            return
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };


    return (
        <>
            <React.Fragment>
                <Button variant="contained" className='w-100' onClick={handleClickOpen}>
                    ADD FEATURE IMAGE
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    sx={{ zIndex: "10000" }}
                >
                    <DialogTitle className='fw-bold'>Upload Image</DialogTitle>
                    <DialogContent className='row justify-content-center m-0'>

                        <label
                            htmlFor="file"
                            className="col-12 mb-3 col-sm-6 overflow-hidden col-md-6 d-flex align-items-center justify-content-center"
                            style={{
                                height: "15rem",
                                border: "2px dashed #1976d2",
                            }}
                        >
                            <>
                                <AddAPhotoIcon className="fs-1" color="primary" />
                                <input
                                    // onChange={(e) => setFiles(e.target.files[0])}
                                    type="file"
                                    id="file"
                                    hidden
                                />
                            </>
                        </label>
                        {images.map((image, index) => (
                            <div className='col-12 mb-3 col-sm-6 overflow-hidden col-md-6' key={index} style={{ minWidth: "50%", flex: "0 0 auto" }}>
                                {image.mimetype === "image" ? (
                                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: "100%", height: "100%", objectFit: "cover", border: `${tempSelecting._id === image._id ? "2px solid red" : ""}` }}
                                        onClick={() => {
                                            if (tempSelecting._id !== image._id) {
                                                settempSelecting(image)
                                            } else {
                                                settempSelecting({})
                                            }
                                        }} />
                                ) : (
                                    <video src={image.url} key={index} alt={`video ${index}`} muted={true} style={{ width: "100%", height: "100%", objectFit: "cover" }} onMouseEnter={(e) => {
                                        e.target.play()
                                    }} onMouseLeave={(e) => {
                                        e.target.pause()
                                    }}></video>
                                )}
                            </div>
                        ))}

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={(image) => {
                            setOpen(false);
                            if (tempSelecting._id === image._id) {
                                return alert("Please select Image")
                            }
                            setfuturingImage(tempSelecting)
                        }}>Save</Button>
                    </DialogActions>
                </Dialog>


            </React.Fragment>
        </>
    )
}