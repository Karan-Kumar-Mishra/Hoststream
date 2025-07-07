
import React, { useEffect, useRef, useState } from "react";
import PowerButton from "./PowerButton";
import { useNavigate } from "react-router-dom";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";

import '../css/Vmpage.css'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { delete_vm } from "../Redux/Actions/deletevm";


const style = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'green',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function Vmpage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const dispatch = useDispatch();
    const store_data = useSelector((state) => state.Data);
    const navigate = useNavigate();
    const Dispatch = useDispatch();
    const URL_ref = useRef(null);
    const [resposn,setresposn]=useState(store_data.UserInfo.other_info.crvmsrpgif.vm_state)

    const [open, setOpen] = React.useState(false);
    function handleOpen() {
        Dispatch(delete_vm(store_data.UserInfo.other_info.crvmsrpgif.vm_id));
        setOpen(true);
        setalretmsg("Deleteing your EC2 cluster !")
        navigate("/dashboard");
    }
    const handleClose = () => setOpen(false);
    function handstop_cluster(msg) {
        setOpen(true);
        setalretmsg(msg)
    }
    useEffect(() => {
        console.log("state ->>>>", resposn)
    }, [resposn])
    const [alretmsg, setalretmsg] = useState("Some thing went worng !");

    useEffect(() => {
        dispatch({ type: 'NVGT_TO_VM', payload: false })
        if (store_data.UserInfo.other_info.crvmsrpgif.vm_name == null || store_data.UserInfo.other_info.crvmsrpgif.vm_url === null) {
            navigate("/dashboard");
        }

        Dispatch({ type: 'NVGT_TO_SITE', payload: false })
        if (isLoaded) {
            console.log("user => ", user);
            if (isSignedIn) {
                console.log("User is logged in");
            } else {
                console.log("User is not logged in");
                navigate("/");
            }
        }
    }, [isLoaded, isSignedIn, user, navigate]);
    useEffect(() => {
        if (store_data.UserInfo.other_info.crvmsrpgif.vm_state === 'off') {
            setOpen(false);
        }

    }, [store_data.UserInfo.other_info.crvmsrpgif.vm_state, open, setOpen, handleClose, handstop_cluster, alretmsg, setalretmsg, handleOpen
        , store_data.UserInfo.other_info.crvmsrpgif
    ])

    return (
        <div className="h-screen w-screen flex items-center flex-col overflow-y-scroll p-4">
            <div className="bg-transparent w-full max-w-6xl flex flex-col gap-5 md:flex-row justify-between items-center p-6">
                <div className="name text-white text-center md:text-left">
                    <h1 className="text-4xl font-bold">
                        {store_data.UserInfo.other_info.crvmsrpgif.vm_name}
                    </h1>
                    <a href={store_data.UserInfo.other_info.crvmsrpgif.vm_url} target='_blank' className="text-lg">
                        {store_data.UserInfo.other_info.crvmsrpgif.vm_url}
                    </a>
                    <p>{store_data.UserInfo.other_info.crvmsrpgif.vm_id}</p>
                </div>

            </div>

            <div className="h-150 site-preview bg-transparent w-full max-w-6xl flex flex-col md:flex-row justify-center items-center shadow-2xl shadow-gray-300 rounded-lg overflow-hidden"

            >
                {/* Left Section */}
                <div className="p-2 h-60 md:h-96 w-full md:w-1/2 shadow-2xl flex flex-row  shadow-blue-400 text-white"
                    onClick={() => {
                        window.open(store_data.UserInfo.other_info.crvmsrpgif.vm_url, '_blank')
                    }
                    }
                >
                    <span className="text-green-500 font-bold" >user@root</span>
                    <span className="font-bold"> $</span>
                    <span className="terminal_cursor"></span>
                    <span className="pl-5 font-serif">  Connect with your terminal !</span>
                </div>

                {/* Right Section */}
                <div className="h-64 md:h-96 w-full md:w-1/2 flex items-center justify-between text-white text-2xl font-bold flex-col p-4">
                    {/* <h3>{store_data.UserInfo.other_info.crsrpgif.id}</h3> */}
                    <div className="flex flex-row gap-2">
                        <h1 className="text-green-500" >URL:</h1>
                        <a className="overflow-x-scroll hidescroll" href={store_data.UserInfo.other_info.crvmsrpgif.vm_url} target="_blanck">{store_data.UserInfo.other_info.crvmsrpgif.vm_url}</a>
                    </div>
                    <div className="flex flex-row gap-2">
                        <h1 className="text-green-500" >Hostname: </h1>
                        <h3 className="overflow-x-scroll hidescroll" >{import.meta.env.VITE_EC2_HOST}</h3>
                    </div>
                    <div className="flex flex-row gap-2">
                        <h1 className="text-green-500" >Username: </h1>
                        <h3 className="overflow-x-scroll hidescroll">{store_data.UserInfo.other_info.crvmsrpgif.vm_username}</h3>
                    </div>
                    <div className="flex flex-row gap-2">
                        <h1 className="text-green-500" >Password:</h1>
                        <h3 className="overflow-x-scroll hidescroll" >{store_data.UserInfo.other_info.crvmsrpgif.vm_password}</h3>
                    </div>


                    <div className="flex flex-row gap-4">
                        <PowerButton alertfunction={handstop_cluster} closealert={handleClose} />
                        <Button onClick={handleOpen} variant="outlined" color="error">
                            Delete
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Alert
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {alretmsg}
                                </Typography>
                            </Box>
                        </Modal>
                    </div>


                </div>
            </div>
        </div>

    );
}
