import { useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import BASE_API from '../constants/api';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeUserData, setUserData } from '../redux/authentication/userSlice';

// types and interfaces
import { UserState } from '../redux/authentication/userSlice';
import { Token } from '../models/authentication/tokenInterface';
import { useNavigate } from 'react-router-dom';

export default function useAuthentication() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state : RootState) => state.user.accessToken);
    const localStorageData = useSelector((state : RootState) => state.user.accessToken);

    useEffect(() => {
        let interval = setInterval(() => {
            if (token) {
                updateToken();
            }
        }, 9 * 60 * 1000)
        return () => clearInterval(interval)
        // eslint-disable-next-line
    }, [token, dispatch])

    const checkTokenExpired = (token : string) : boolean => {
        const tokenData = jwtDecode(token) as Token;
        const expirationTime = tokenData.exp * 6000;
        const currentTime = Date.now();

        return expirationTime < currentTime;
    }

    const updateToken = () => {
        const localStorageData = localStorage.getItem('refresh_token');
        if (localStorageData) {
            try {
                const apiUrlParams = new URLSearchParams();
                apiUrlParams.append('refresh', localStorageData)

                axios.post(`${BASE_API}/users/token/refresh/`, apiUrlParams).then(res => {
                    if (res.status !== 200) return
                    setUserDataToSlice(res.data.access, res.data.refresh, res.data.user_id)

                    // dispatch(setUserData(userState));
                    localStorage.setItem('refresh_token', res.data.refresh);
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem("user_id", res.data.user_id);
                    localStorage.setItem("username", res.data.username);
                    localStorage.setItem("email", res.data.email);

                }).catch(e => {
                    console.log(e)
                });
            } catch(err) {
                console.log("Error parsing local storage data:", err)
            }
        } else {
            console.log("No local storage data")
        }
    };

    const isLoggedIn = async () : Promise<boolean> => {
        if (token && !checkTokenExpired(token)) return true 
        if (!localStorageData) return false

        const apiUrlParams = new URLSearchParams();
        apiUrlParams.append('refresh', localStorageData)

        try {
            const res = await axios.post(`${BASE_API}/users/token/refresh/`, apiUrlParams);
            if (res.status !== 200) return false;
            setUserDataToSlice(res.data.access, res.data.refresh, res.data.user_id);
            return true;
            
        } catch(err) {
            alert(err)
            console.log(err);
            return false;
        }
    }

    const setUserDataToSlice = (token : string, refresh : string, user_id : string) => {
        const decodedToken : Token = jwtDecode(token);
        console.log(decodedToken)
        const userData : UserState = {
            userId : user_id,
            username : decodedToken.username,
            email : decodedToken.email,
            accessToken : token,
        }
        dispatch(setUserData(userData))

        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('access_token', token);
        localStorage.setItem("username", decodedToken.username);
        localStorage.setItem("userId", user_id);
        localStorage.setItem("email", decodedToken.email);
    }

    const logout = () => {
        axios.post(`${BASE_API}/users/logout/`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            localStorage.clear();
            navigate("/login");
            dispatch(removeUserData());
        }).catch(err => {
            console.error('Failed to logout:', err);
        });
    }

    return {
        isLoggedIn,
        setUserDataToSlice,
        logout
    }
}