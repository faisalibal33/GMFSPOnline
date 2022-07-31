import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./cardLetter.css";
import PushPinIcon from "@mui/icons-material/PushPin";
import DateRangeIcon from "@mui/icons-material/DateRange";

export default function CardLetter({ item }) {
  return (
    <Card sx={{ maxWidth: "30vw" }} className="cardLetter">
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "gray" }}
        >
          {item._id.toString().padStart(7, "0")}
        </Typography>
        {item.receiver ? (
          <>
            <Typography variant="body2" color="text.secondary">
              <PushPinIcon fontSize="small" style={{ marginBottom: "-4px" }} />
              {item.sender} is sending{" "}
              <LocalShippingIcon
                fontSize="small"
                color="warning"
                style={{ marginBottom: "-4px" }}
              />{" "}
              packages to {item.receiverUnit}
            </Typography>
            <small style={{ color: "gray" }}>
              {" "}
              <DateRangeIcon
                fontSize="small"
                style={{ marginBottom: "-4px" }}
                sx={{ color: "gray", marginRight: "3px" }}
              />
              {item.createdAt}
            </small>

            <Typography variant="body2" color="text.secondary">
              <PushPinIcon fontSize="small" style={{ marginBottom: "-4px" }} />
              Package has been received{" "}
              <DoneAllOutlinedIcon
                fontSize="small"
                color="success"
                style={{ marginBottom: "-4px" }}
              />{" "}
              at the tbr unit by faisal / 583174{" "}
            </Typography>
            <small style={{ color: "gray" }}>
              {" "}
              <DateRangeIcon
                fontSize="small"
                style={{ marginBottom: "-4px" }}
                sx={{ color: "gray", marginRight: "3px" }}
              />
              {item.updatedAt}
            </small>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              <PushPinIcon fontSize="small" style={{ marginBottom: "-4px" }} />
              {item.sender} is sending{" "}
              <LocalShippingIcon
                fontSize="small"
                color="warning"
                style={{ marginBottom: "-4px" }}
              />{" "}
              packages to {item.receiverUnit}
            </Typography>
            <small style={{ color: "gray" }}>
              {" "}
              <DateRangeIcon
                fontSize="small"
                style={{ marginBottom: "-4px" }}
                sx={{ color: "gray", marginRight: "3px" }}
              />
              {item.createdAt}
            </small>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">See Detail</Button>
      </CardActions>
    </Card>
  );
}
