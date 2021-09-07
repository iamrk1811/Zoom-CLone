import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableCell,
  TableRow
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


const AvailableTeachers = () => {
  const [rows, setRows] = useState([{teacherName: "", teacherEmail:"", teacherStream:""}]);

  useEffect(() => {
    fetch("/collegeGetTeachersBackend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(async (result) => {
      const data = await result.json();
      if (result.status === 200) {
          setRows(data.Teachers);
      }
    });
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      width: '100%',
    },
  });
  const classes = useStyles();


//   delete teacher
const collegeDeleteTeacher = (data) => {
    fetch("/collegeDeleteTeacherBackend", {
        method:"POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify({
            email: data
        })
    }).then((result) => {
        if(result.status === 200) {
            const updatedRows = rows.filter((obj) => {
                return obj.teacherEmail !== data;
            })
            setRows(updatedRows);
        }
    })
}
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="right">Stream</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.teacherEmail}>
                <StyledTableCell align="left" component="th" scope="row">
                  {row.teacherName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.teacherEmail}</StyledTableCell>
                <StyledTableCell align="right">{row.teacherStream}</StyledTableCell>
                <StyledTableCell align="right"><DeleteOutlineIcon style={{cursor:"pointer"}} onClick={() => {collegeDeleteTeacher(row.teacherEmail)}} /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AvailableTeachers;
