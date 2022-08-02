import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({
    idnumber: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <>
      <div className="loginContainer">
        <div className="bg-image"></div>
        <Container component="main" maxWidth="xs" className="containerLogin">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="imgLogo">
              <img
                src="https://3.bp.blogspot.com/-Q19VtQTNMqg/XIyjxnXQ3rI/AAAAAAAASKY/xkUqkWsVcSEr5l_w2kYaoUS-WqrNUuR1ACLcBGAs/s1600/GMF%2BAero%2BAsia.png"
                alt="GMF-AEROASIA"
                width="200px"
                height="150px"
              />
            </div>
            <Box
              component="form"
              onSubmit={handleClick}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="ID Number"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    idnumber: e.target.value,
                  }))
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
        </Container>
      </div>
    </>
  );
}
