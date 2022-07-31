import React, { useContext, useState } from "react";
import ModalLogout from "../../components/modal/ModalLogout";
import Navbar from "../../components/navbar/Navbar";
import Tableshipping from "../../components/tableShipping/Tableshipping";
import { AuthContext } from "../../context/AuthContext";
import "./shippingTable.css";

const ShippingTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="containerTable">
      <ModalLogout
        open={open}
        handleClose={handleClose}
        logout={() => dispatch({ type: "LOGOUT" })}
      />
      <div className="containerTableshiping">
        <Navbar handleOpen={handleOpen} />
        <Tableshipping />
      </div>
    </div>
  );
};

export default ShippingTable;
