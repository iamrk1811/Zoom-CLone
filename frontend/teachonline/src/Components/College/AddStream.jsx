import { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const AddStream = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [streamAddedInfo, setStreamAddedInfo] = useState("");
  const [stream, setStream] = useState("");


  const handleButtonClick = () => {
    fetch("/collegeAddStreamBackend", {
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify({
            stream
        })
    }).then(async (result) => {
        const data = await result.json();
        if(result.status === 200) {
            setStreamAddedInfo('success');
            setSuccessMsg(data.msg);
            setStream("");
        } else {
            setStreamAddedInfo('error');
            setErrorMsg(data.err);
        }
    })
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-12 col-md-8 col-lg-7"
            style={{ margin: "auto", display: "block" }}
          >
            <h3 className="text-center mb-4">Adding Stream</h3>
            <form className="form-group streamOptionComponentContainer text-center p-4">
              {streamAddedInfo === "error" && (
                <Alert severity="error">{errorMsg}</Alert>
              )}
              {streamAddedInfo === "success" && (
                <Alert severity="success">{successMsg}</Alert>
              )}
              <FormControl
                fullWidth={true}
                className="streamOptionComponentInput"
              >
                <InputLabel htmlFor="stream Name">Stream</InputLabel>
                <Input
                  value={stream}
                  name="stream"
                  onChange={(e) => {
                      setStreamAddedInfo("");
                      setStream(e.target.value);
                    }}
                />
              </FormControl>
              <Button
                onClick={handleButtonClick}
                fullWidth={true}
                className="mt-3 cbtn"
              >
                Add
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStream;
