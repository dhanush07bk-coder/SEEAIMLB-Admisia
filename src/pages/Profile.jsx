import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import { supabase } from "../supabaseClient";


function Profile() {

  const navigate = useNavigate();


  const [student, setStudent] =
    useState(null);


  const [profile, setProfile] =
    useState(null);


  const [applications, setApplications] =
    useState([]);


  useEffect(() => {

    loadProfile();

  }, []);


  async function loadProfile() {

    const studentId =
      sessionStorage.getItem(
        "studentId"
      );


    const studentEmail =
      sessionStorage.getItem(
        "studentEmail"
      );


    if (!studentId) {

      return;
    }


    setStudent({

      id: studentId,

      email: studentEmail

    });


    const {
      data: profileData,
      error: profileError
    } = await supabase
      .from("profiles")
      .select("*")
      .eq(
        "student_id",
        Number(studentId)
      )
      .maybeSingle();


    if (profileError) {

      console.log(profileError);

      return;
    }


    setProfile(
      profileData
    );


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


  if (!student) {

    return (

      <div className="page">

        <div className="profile-card">

          <h1>
            👤 My Admisia Profile
          </h1>


          <p>
            Please login to view
            your profile.
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

      <div className="profile-card">

        <h1>
          👤 My Admisia Profile
        </h1>


        <h2>
          Personal Information
        </h2>


        <div className="profile-item">

          <strong>
            Email
          </strong>


          <span>
            {student.email}
          </span>

        </div>


        {profile && (

          <>

            <div className="profile-item">

              <strong>
                Name
              </strong>

              <span>
                {profile.name}
              </span>

            </div>


            <div className="profile-item">

              <strong>
                Mobile
              </strong>

              <span>
                {profile.phone}
              </span>

            </div>


            <div className="profile-item">

              <strong>
                Age
              </strong>

              <span>
                {profile.age}
              </span>

            </div>

          </>

        )}


        <h2
          style={{
            marginTop: "40px"
          }}
        >
          📄 My Applications
        </h2>


        {applications.length === 0 && (

          <div className="empty-box">

            <p>
              No applications submitted yet.
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
              className="application-summary"
              key={application.id}
            >

              <h3>

                🏫{" "}

                {application.colleges?.name}

              </h3>


              <p>

                <strong>
                  Location:
                </strong>

                {" "}

                {application.colleges?.location}

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
                  Application ID:
                </strong>

                {" "}

                {application.id}

              </p>


              <p>

                <strong>
                  Status:
                </strong>

                {" "}


                {application.status ===
                  "Pending" && (

                  <span className="status-pending">
                    🟡 Pending
                  </span>

                )}


                {application.status ===
                  "Approved" && (

                  <span className="status-approved">
                    🟢 Approved
                  </span>

                )}


                {application.status ===
                  "Rejected" && (

                  <span className="status-rejected">
                    🔴 Rejected
                  </span>

                )}

              </p>

            </div>

          )
        )}


        <button
          onClick={() =>
            navigate("/application")
          }
          style={{
            marginTop: "20px"
          }}
        >
          ➕ Apply to Another College
        </button>


      </div>

    </div>

  );
}

export default Profile;