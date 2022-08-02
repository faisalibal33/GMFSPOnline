import React from "react";
import "./page.css";
import gmflogo from "../../images/GMF-Aeroasia.png";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import { Button, ListItem } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const location = useLocation();
  const { id } = location.state;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    ducumentTitle: "SP-Online",
    onafterprint: () => alert("print succes"),
  });
  const [data, setData] = useState();

  useEffect(() => {
    const getId = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/shipping/find/${id}`
      );
      setData(res.data);
    };
    getId();
  }, []);

  let date = new Date(data?.createdAt);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const viewDate = day + " " + month + " " + year;

  let dateReceiver = new Date(data?.updatedAt);
  const dayReceiver = dateReceiver.toLocaleString("default", {
    day: "2-digit",
  });
  const monthReceiver = dateReceiver.toLocaleString("default", {
    month: "short",
  });
  const yearReceiver = dateReceiver.toLocaleString("default", {
    year: "numeric",
  });
  const viewDateReceiver =
    dayReceiver + " " + monthReceiver + " " + yearReceiver;

  return (
    <div
      style={{
        backgroundColor: "#cccccc",
        margin: 0,
        minHeight: "100vh",
        padding: "20px",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "30px",
        }}
      >
        <Button variant="contained" onClick={handlePrint}>
          print <PrintIcon />
        </Button>
      </div>
      <div className=" page A4" ref={componentRef}>
        <div className="SPletter">
          <span className="spNumber">
            NO. SP.{" \u00a0\u00a0"}
            <span className="noSp">
              {data?._id.toString().padStart(7, "0")}
            </span>
          </span>
          <div className="headerLetter">
            <img
              src={gmflogo}
              alt="GMF-AEROASIA"
              width="200px"
              style={{ marginTop: "-10px" }}
            />
            <div className="spTitle">
              <span className="titleSp">SURAT PENGIRIMAN</span>
              <small>Shipping Document</small>
            </div>
          </div>
          <div className="track">
            <div className="fromTrack">
              <div>
                <span className="kepada">Kepada</span>
                <span>
                  {
                    "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"
                  }
                  :{" "}
                  <span style={{ fontWeight: 500 }}>
                    {"\u00a0"} {data?.receiverUnit}
                  </span>
                </span>
              </div>
              <small>To</small>
            </div>
            <div className="fromTracksent">
              <div>
                <span className="kepada">Dikirim oleh</span>
                <span>
                  {"\u00a0\u00a0"} :{" "}
                  <span style={{ fontWeight: 500 }}>
                    {"\u00a0"} {data?.senderUnit}
                  </span>
                </span>
              </div>
              <small>Sent by</small>
            </div>
          </div>
          <div className="tableTrack">
            <table className="tableDocument">
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "100px" }}>
                    <p className="tanggal">Tanggal</p>
                    <hr width="60px" style={{ margin: "auto" }} />
                    <small>Date</small>
                  </th>
                  <th style={{ textAlign: "center", width: "100px" }}>
                    <p className="tanggal">Banyaknya</p>
                    <hr width="90px" style={{ margin: "auto" }} />
                    <small>Quantity</small>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <p className="tanggal">Macam dari barang barang</p>
                    <hr width="210px" style={{ margin: "auto" }} />
                    <small>Description of goods</small>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <p>Keterangan</p>
                    <hr width="90px" style={{ margin: "auto" }} />
                    <small>Remarks</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{viewDate}</td>
                  <td>1 EA</td>
                  <td>{data?.description}</td>
                  <td>{data?.remark}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <div
                      style={{
                        textAlign: "start",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "600" }}>
                          Dikirim oleh <span>: {data?.sender}</span>
                        </p>
                        <hr width="90px" />
                        <small>
                          Packed by{" "}
                          {
                            "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"
                          }{" "}
                          {data?.senderIdNumber}
                        </small>
                      </div>
                      <Barcode
                        value={data?.senderIdNumber}
                        height="40px"
                        displayValue="false"
                      />
                    </div>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="footer">
            <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
              <div>
                <p style={{ fontWeight: "600" }}>Penerima</p>
                <hr width="70px" />
                <small>Received</small>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {data?.receiverIdNumber.length > 1 ? (
                  <>
                    <Barcode
                      value={data?.receiverIdNumber}
                      height="40px"
                      displayValue="false"
                    />
                    <div style={{ textAlign: "center" }}>
                      {data?.receiver} / {data?.receiverIdNumber}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <p style={{ fontWeight: "600" }}>
                Tanggal{" "}
                <span>
                  : {data?.receiverIdNumber > 1 ? viewDateReceiver : ""}
                </span>
              </p>
              <hr width="60px" />
              <small>Date</small>
            </div>
          </div>
        </div>
        <div style={{ padding: "50px" }}>GMF/A-111</div>
      </div>
      {/* <page className="page landScape">test</page> */}
    </div>
  );
};

export default Page;
