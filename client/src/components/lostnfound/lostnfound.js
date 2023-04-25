import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "./lostnfound.css";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";
const get = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
export default function Lostnfound() {
  let navigate = useNavigate();
  let Lostnfound;

  const [lostnfound, setlostnfound] = useState([]);
  // get all list of current couriers when page is loaded
  document.onreadystatechange = async function () {
    Lostnfound = (await fetch("http://localhost:5000/lostnfound")).json();

    Lostnfound.then(async (data) => {
      // console.log(data);
      await setlostnfound(data);
    });
    // console.log(lostnfound);
    // console.log("Loaded data");
  };

  // form inputs; will be integrated with backend using post and get methods later
  const [itemname, setName] = useState("");
  const [studentid, setStudentid] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("lost");
  const Newitem = {
    itemname: "",
    studentid: "",
    contact: "",
    description: "",
    status: "lost",
  };

  const handleRedirecting = async (e) => {
    e.preventDefault();
    console.log("Redirecting");
    Newitem.itemname = itemname;
    Newitem.studentid = studentid;
    Newitem.contact = contact;
    Newitem.description = description;
    Newitem.status = status;
    alert(
      `New ${Newitem.status} item named: ${Newitem.itemname} added to the list`
    );

    await Adding(Newitem);
    window.location.reload();
  };

  const handleDelete = async (f) => {
    console.log("Deleting");
    const res = await fetch(`http://localhost:5000/lostnfound/${f}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    },{mode: 'no-cors'});
    console.log(res);
    window.location.reload();
  };
  const updateStatus = async (f) => {
    console.log("Updating");
    const res = await fetch(`http://localhost:5000/lostnfound/${f}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    },{mode: 'no-cors'});
    console.log(res);
    window.location.reload();
  };

  const Adding = async (Newitem) => {
    console.log("Adding");
    const res = await fetch("http://localhost:5000/lostnfound", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Newitem),
    });

    const data = await res.json();
    console.log("Pp");
    console.log(data);
  };

  // Table data

  // const lostnfoundData = [
  //     {
  //         "index":"1",
  //         "itemname":"Pen"
  //     },
  //     {
  //         "index":"2",
  //         "itemname":"Gun"
  //     },
  // ];

  //Done

  const card1 = (
    <div class="card1">
      <React.Fragment>
        <CardContent>
          <h4>Lost and Found Instructions:</h4>
          The students are requested to collect the missing items from the
          hostel supervisor's office. The contact information of the reporter is
          shared in the table.
        </CardContent>
      </React.Fragment>
    </div>
  );

  const card2 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h6>Found a lost item? Fill out the form below!</h6>
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  const card3 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h5>Looking for a lost item? Check out the table below!</h5>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
const role = get("role");
  return (
    <body>
      <Stack
        className="university-card"
        marginLeft={39}
        marginTop={3}
        alignItems={"center"}
      >
        <h2>Lost and Found</h2>
        <h5>Report and check your items here.</h5>
      </Stack>
      <br></br>
      <div class="container">
        <div class="leftpane2">
          <Box sx={{ minWidth: 275 }}>
            <Card>{card2}</Card>
          </Box>
          <br></br>
          <div className="lostnfound_form ps-4">
            <form>
              <TextField
                id="outlined-basic"
                label="Item Name"
                variant="filled"
                value={itemname}
                size="small"
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-basic"
                label="Student ID"
                variant="filled"
                value={studentid}
                size="small"
                onChange={(e) => setStudentid(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-basic"
                label="Student Contact"
                variant="filled"
                value={contact}
                size="small"
                onChange={(e) => setContact(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-basic"
                label="Item Description"
                variant="filled"
                value={description}
                size="small"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
              <br></br>
              <label class="lostnfound_label">
                <h6>Item status</h6>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="lost"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value="lost"
                    control={<Radio />}
                    onChange={() => setStatus("lost")}
                    label="Lost"
                  />
                  <FormControlLabel
                    value="found"
                    control={<Radio />}
                    onChange={() => setStatus("found")}
                    label="Found"
                  />
                </RadioGroup>
              </label>
              <br></br>
              <Button
                variant="contained"
                className="lostnfound_button"
                onClick={handleRedirecting}
              >
                submit
              </Button>
            </form>
          </div>
        </div>
        <div class="somepane"></div>
        <div class="middlepane">
          <Box sx={{ minWidth: 275 }}>
            <Card>{card3}</Card>
          </Box>
          <br></br>
          <div class="middlepane2">
            <div class="table_css">
              <table>
                <thead class="lostnfound_headerStyle">
                  <tr>
                    <th>Index</th>
                    <th>Item Name</th>
                    <th>Item Description</th>
                    <th>Student ID</th>
                    <th>Student Contact</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Last Modified</th>
                    <th>Status</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {lostnfound.map((data, index) => {
                    return (
                      <tr key={index} class="lostnfound_data_entry">
                        <td>{index + 1}</td>
                        <td>{data.itemname}</td>
                        <td>{data.description}</td>
                        <td>{data.studentid}</td>
                        <td>{data.contact}</td>
                        <td>{data.status}</td>
                        <td>{data.createdAt.substring(0, 10)}</td>
                        <td>{data.updatedAt.substring(0, 10)}</td>
                        <td>
                        {/* {role=="admin"&&(<td className="tdb"> 
                        <button onClick={()=>updateStatus(data._id)} 
                        className="button2">
                          Delete
                        </button></td>)} */}
                        {role=="admin"&&(<td className="tdb"> 
                        <button onClick={()=>handleDelete(data._id)}
                        className="button2">
                          Delete
                        </button></td>)}
                          {/* <Button variant="text">
                            <DeleteIcon />
                          </Button> */}
                        </td>
                        {/*onClick={handleDelete}*} */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
