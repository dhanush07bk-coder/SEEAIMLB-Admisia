import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import { supabase } from "../supabaseClient";


function Status() {

  const navigate = useNavigate();


  const [applications, setApplications] =
    useState([]);


  const [loggedIn, setLoggedIn] =
    useState(true);


  useEffect(() => {

    loadApplications();

  }, []);


  async function loadApplications() {

    const studentId =
      sessionStorage.getItem(
        "studentId"
      );


    if (!studentId) {

      setLoggedIn(false);

      return;
    }


    const {
      data,
      error
    } = await supabase
      .from("applications")
      .select(`
        id,
        course,
        status,
        created_at,
        colleges (
          name,
          location
        )
      `)
      .eq(
        "student_id",
        Number(studentId)
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );


    if (error) {

      console.log(error);

      return;
    }


    setApplications(
      data || []
    );

  }


  if (!loggedIn) {

    return (

      <div className="page">

        <div className="status-box">

          <h1>
            📊 Admisia Application Status
          </h1>


          <p>
            ⚠️ Please login to view
            your applications.
          </p>


          <button
            onClick={() =>
              navigate("/login")
            }
          >
            🔐 Login
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="page">

      <div className="status-box">

        <h1>
          📊 Admisia Application Status
        </h1>


        {applications.length === 0 && (

          <div className="empty-box">

            <p>
              You have not submitted
              any applications.
            </p>


            <button
              onClick={() =>
                navigate("/application")
              }
            >
              📝 Apply Now
            </button>

          </div>

        )}


        {applications.map(
          (application) => (

            <div
              className="status-result"
              key={application.id}
            >

              <h2>
                🏫{" "}
                {application.colleges?.name}
              </h2>


              <p>

                <strong>
                  Application ID:
                </strong>

                {" "}

                {application.id}

              </p>


              <p>

                <strong>
                  Course:
                </strong>

                {" "}

                {application.course}

              </p>


              <p>

                <strong>
                  Location:
                </strong>

                {" "}

                {application.colleges?.location}

              </p>


              <p>

                <strong>
                  Applied On:
                </strong>

                {" "}

                {new Date(
                  application.created_at
                ).toLocaleString()}

              </p>


              <h3>
                Status
              </h3>


              {application.status ===
                "Pending" && (

                <p className="status-pending">
                  🟡 Pending
                </p>

              )}


              {application.status ===
                "Approved" && (

                <p className="status-approved">
                  🟢 Approved
                </p>

              )}


              {application.status ===
                "Rejected" && (

                <p className="status-rejected">
                  🔴 Rejected
                </p>

              )}

            </div>

          )
        )}

      </div>

    </div>

  );
}

export default Status;