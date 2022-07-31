import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postShipping } from "../../redux/ShippingSlice";
import Navbar from "../navbar/Navbar";
import "./createShipping.css";
import { AuthContext } from "../../context/AuthContext";
import ModalLogout from "../modal/ModalLogout";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import CardLetter from "../cardLetter/CardLetter";

const CreateShipping = () => {
  const { shipping, loading, error } = useSelector((state) => ({
    ...state.shipping,
  }));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [shippingValue, setShippingValue] = useState({
    aircraftReg: undefined,
    sender: undefined,
    senderIdNumber: undefined,
    senderUnit: undefined,
    receiver: "",
    receiverIdNumber: undefined,
    receiverUnit: undefined,
    description: undefined,
    remark: undefined,
  });
  const { dispatch } = useContext(AuthContext);
  const dispatching = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatching(postShipping(shippingValue));
    } catch (err) {
      console.log("error cuk");
    }
  };

  return (
    <div className="shippingContainer">
      <ModalLogout
        open={open}
        handleClose={handleClose}
        logout={() => dispatch({ type: "LOGOUT" })}
      />
      <Navbar handleOpen={handleOpen} />
      <div className="homeContainer">
        <div className="trackCard">
          {shipping?.map((item) => (
            <CardLetter key={item._id} item={item} />
          ))}
        </div>
        <div className="shippingBox">
          <div className="shippingTitle">
            <DocumentScannerIcon color="gray" />
            <h3>Create Letter</h3>
          </div>
          <Box>
            <TextField
              label="Aircraft Registration"
              size="small"
              sx={{
                m: 1,
                width: "97%",
                boxShadow: 2,
              }}
              onChange={(e) =>
                setShippingValue((prev) => ({
                  ...prev,
                  aircraftReg: e.target.value,
                }))
              }
            />
            <TextField
              label="From"
              size="small"
              sx={{
                m: 1,
                width: "97%",
                boxShadow: 2,
              }}
              onChange={(e) =>
                setShippingValue((prev) => ({
                  ...prev,
                  senderUnit: e.target.value,
                }))
              }
            />
            <TextField
              label="To"
              size="small"
              sx={{
                m: 1,
                width: "97%",
                boxShadow: 2,
              }}
              onChange={(e) =>
                setShippingValue((prev) => ({
                  ...prev,
                  receiverUnit: e.target.value,
                }))
              }
            />
            <TextField
              label="Sender"
              size="small"
              sx={{
                m: 1,
                width: "97%",
                boxShadow: 2,
              }}
              onChange={(e) =>
                setShippingValue((prev) => ({
                  ...prev,
                  sender: e.target.value,
                }))
              }
            />
            <TextField
              label="Sender ID number"
              size="small"
              sx={{
                m: 1,
                width: "97%",
                boxShadow: 2,
              }}
              onChange={(e) =>
                setShippingValue((prev) => ({
                  ...prev,
                  senderIdNumber: e.target.value,
                }))
              }
            />
            <TextField
              label="Description"
              multiline={true}
              sx={{
                m: 1,
                width: "97%",
                boxShadow: 2,
              }}
              onChange={(e) =>
                setShippingValue((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <TextField
              label="Remark"
              sx={{
                m: 1,
                width: "97%",
                boxShadow: 2,
              }}
              multiline={true}
              onChange={(e) =>
                setShippingValue((prev) => ({
                  ...prev,
                  remark: e.target.value,
                }))
              }
            />
            <div className="buttonCreate">
              <Button variant="contained" onClick={handleClick}>
                Submit
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CreateShipping;
