import InfoIcon from "@material-ui/icons/Info";

const Notification = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-12 col-md-8 col-lg-7"
            style={{ margin: "auto", display: "block" }}
          >
            <div className="send-notification">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Time</th>
                    <th scope="col">By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <InfoIcon />
                    </td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>
                      <InfoIcon />
                    </td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>
                      <InfoIcon />
                    </td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
