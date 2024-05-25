import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, TextField, Checkbox, Button, Paper, Typography, CssBaseline, Grid, Link, Box, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

import BASE_API from '../constants/api';

const defaultTheme = createTheme();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordVisibilityToggle = ()  => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
        username,
        password,
    };

    try {
        if (!username || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        const response = await axios.post(`${BASE_API}/users/login/`, data);

        if (response.status === 200) {
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);

            toast.success('Login successful.');

            if (rememberMe) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7);
                localStorage.setItem('rememberedExpirationDate', expirationDate.toISOString());
                localStorage.setItem('rememberedUsername', username);
            }

            navigate('');
        } else {
            toast.error('Login failed. Please try again.');
        }
    } catch (error: any) {
        if (error.response?.status === 401) {
            toast.error('Login failed. Please check your username and password.');
        } else if (error.response?.status === 403) {
            toast.error('Login failed. User is not an admin. Please try again.');
        } else if (error.response?.status === 410) {
            toast.error('Login failed. User is not active. Please contact the administrator.');
        } else {
            toast.error('Login failed. Please try again.');
        }
    }
  };

  const getStoredCredentials = () => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    const expirationDate = localStorage.getItem('rememberedExpirationDate');
    const now = new Date();
    
    if (storedUsername && expirationDate && new Date(expirationDate) > now) {
      setUsername(storedUsername);
      setRememberMe(true);
    } 
  };

  useEffect(() => {
    getStoredCredentials();
  }, []);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/800x600/?courier)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          
          <Box
            sx={{
              my: '25%',
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h3" variant="h5" color="primary.main" sx={{ marginY: '1rem', fontWeight: '700' }}>
              Welcome to the login page
            </Typography>
            <Typography component="h4" variant="h6" color="primary.light">
              Please Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
            <TextField
              margin="normal"
              required
              InputLabelProps={{ required: false }}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextField
              margin="normal"
              required
              InputLabelProps={{ required: false }}
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibilityToggle} 
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Button>
                  </InputAdornment>
                ),
              }}
              value={password}
            />
            <Grid container>
              <Grid item xs={12} sm={8}>
                <FormControlLabel
                  control={<Checkbox value={rememberMe} color="primary" onChange={handleRememberMeChange}/>}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
};

export default Login;
