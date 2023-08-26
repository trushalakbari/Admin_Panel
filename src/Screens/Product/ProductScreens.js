/* eslint-disable jsx-a11y/alt-text */
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import ImageDialog from './ImageDialoge';
import { useState } from 'react';


export default function ProductScreen() {


    const [futuringImage, setfuturingImage] = useState({})

    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-7">
                    <h2>Add new Post</h2>
                </div>
                <div className="col-12 col-sm-6 col-md-3 d-flex">
                    <Switch />
                    <p className='mt-2'>Published</p>
                </div>
                <div className="col-12 col-sm-6 col-md-2">
                    <Button variant="outlined">Add Product</Button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Product Name</p>
                    <TextField id="outlined-basic" placeholder='Product Name' className='w-100' variant="outlined" />
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Brand</p>
                    <TextField id="outlined-basic" placeholder='Brand' className='w-100' variant="outlined" />
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Alias</p>
                    <TextField id="outlined-basic" placeholder='Alias' className='w-100' variant="outlined" />
                </div>
            </div>

            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-8">
                        <p className='fw-bold mb-1'>Description</p>
                        <Editor
                            // onInit={(evt, editor) => contentRef.current = editor}
                            // initialValue={postData.content}
                            apiKey="0br1siz57qb0y7dwnxtzccahui7x0el1mj2ygoziavfnzohu"
                            init={{
                                selector: 'textarea',
                                height: 500,
                                mobile: {
                                    theme: 'mobile',
                                    plugins: 'autosave lists autolink',
                                    toolbar: 'undo bold italic styleselect'
                                },
                                menubar: true,
                                plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                                images_upload_handler: async (blobInfo, success, failure, _) => {
                                    const file = blobInfo.blob()
                                    let formdata = new FormData()
                                    formdata.append("file", file)
                                    const body = formdata
                                    const data = await axios.post("http://localhost:5001/admin/upload", body)
                                    console.log(data)
                                    if (data.status === 200) {
                                        success(data.data.media.url)
                                    }
                                }
                            }}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <p className='fw-bold mb-1'>Upload Media</p>
                        <div htmlFor='file' className='mb-2' style={{ width: "100%", height: "180px", border: "1px solid gray" }}>
                            {
                                futuringImage._id && (
                                    <img src={futuringImage.url} width={"100%"} height={"100%"} ></img>
                                )
                            }
                        </div>
                        <ImageDialog setfuturingImage={setfuturingImage} />

                        {/* <Button variant="contained" className='w-100'>ADD FEATURE IMAGE</Button> */}

                        <TextField id="outlined-basic" className='w-100 mt-3' label="Price" variant="outlined" />
                        <TextField id="outlined-basic" className='w-100 mt-3' label="Rating" variant="outlined" />
                        <TextField id="outlined-basic" className='w-100 mt-3' label="countInstock" variant="outlined" />


                        <FormControl className='mt-3' fullWidth>
                            <InputLabel>Numreviews</InputLabel>
                            <Select label="Select Product">
                                <MenuItem>One</MenuItem>
                                <MenuItem>Two</MenuItem>
                                <MenuItem>Three</MenuItem>
                                <MenuItem>Four</MenuItem>
                                <MenuItem>Five</MenuItem>
                                <MenuItem>Six</MenuItem>
                                <MenuItem>Seven</MenuItem>
                                <MenuItem>Eight</MenuItem>
                                <MenuItem>Nine</MenuItem>
                            </Select>
                        </FormControl>

                    </div>
                </div>
            </div>

        </>
    )
}