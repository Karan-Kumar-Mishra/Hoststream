import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import set_user from '../Redux/Actions/SetUser';
import { create_ec2 } from '../Redux/Actions/CreateEC2';
export default function Ec2() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [showpage,setshowpage]=React.useState(true);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const store_data = useSelector((state) => state.Data);
  const [ec2_input, setec2_input] = React.useState({
    name: '',
    username: '',
    password: ''
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setec2_input(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    setshowpage(false)
    event.preventDefault();
    createVM();
  };

  function createVM() {
    console.log('Creating VM with:', ec2_input);
    dispatch(create_ec2(ec2_input));

    if (store_data.ComponentData.nvgt_to_vm) {
      nevigate("/vmpage");
    }
    else {

    }

  }
  React.useEffect(() => {
    console.log("vm_nviagete in effect => ", store_data.ComponentData.nvgt_to_vm)
    if (store_data.ComponentData.nvgt_to_vm) {
      nevigate("/vmpage");
    }
  }, [store_data.ComponentData.nvgt_to_vm])

  return (

    <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 6 }}>
      {
        showpage ? (<form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              label="Name"
              value={ec2_input.name}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              id="username"
              label="Username"
              value={ec2_input.username}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={ec2_input.password}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>
          <Button
            fullWidth
            sx={{ m: 1 }}
            variant="contained"
            size="large"
            type="submit"
          >
            Create
          </Button>
        </form>) : (<CircularProgress color="inherit" />)
      }


    </Box>
  );
}