import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipping, postShipping } from "../../redux/ShippingSlice";
import Navbar from "../navbar/Navbar";
import "./createShipping.css";
import { AuthContext } from "../../context/AuthContext";
import ModalLogout from "../modal/ModalLogout";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import CardLetter from "../cardLetter/CardLetter";
import ModalReceiver from "../modal/ModalRequest";
import { useEffect } from "react";
import Notification from "../notification/Notification";

const CreateShipping = () => {
  const dispatching = useDispatch();
  const { shipping, loading, error } = useSelector((state) => ({
    ...state.shipping,
  }));
  const [cycle, setCycle] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    dispatching(fetchShipping());
    setCycle(false);
    console.log("cycle");
  }, [cycle]);

  const items = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModalRequest(false);
  };
  const [modalRequest, setModalRequest] = useState(false);
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
    account: items._id,
  });
  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatching(postShipping(shippingValue));
      setCycle(true);
      setModalRequest(false);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    } catch (err) {
      console.log("error cuk");
    }
  };

  return (
    <div className="shippingContainer">
      <Notification notify={notify} setNotify={setNotify} />
      <ModalLogout
        open={open}
        handleClose={handleClose}
        logout={() => dispatch({ type: "LOGOUT" })}
      />
      <ModalReceiver
        handleClose={handleClose}
        handleClick={handleClick}
        modalRequest={modalRequest}
      />
      <Navbar handleOpen={handleOpen} />
      <div className="homeContainer">
        <div className="trackCard">
          {[...shipping]
            .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
            .map((item) => (
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
              <Button
                variant="contained"
                color="warning"
                onClick={() => setModalRequest(true)}
              >
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
