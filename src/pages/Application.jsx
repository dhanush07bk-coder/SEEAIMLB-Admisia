import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

import { supabase } from "../supabaseClient";


function Application() {

  const navigate = useNavigate();


  const [searchParams] =
    useSearchParams();


  const [studentId, setStudentId] =
    useState("");


  const [name, setName] =
    useState("");


  const [phone, setPhone] =
    useState("");


  const [age, setAge] =
    useState("");


  const [college, setCollege] =
    useState("");


  const [course, setCourse] =
    useState("");


  const [colleges, setColleges] =
    useState([]);


  const [marksheet10, setMarksheet10] =
    useState(null);


  const [marksheet12, setMarksheet12] =
    useState(null);


  const [identity, setIdentity] =
    useState(null);


  const [message, setMessage] =
    useState("");


  const [applicationId, setApplicationId] =
    useState("");


  useEffect(() => {

    loadStudent();

    loadColleges();

  }, []);


  async function loadStudent() {

    const id =
      sessionStorage.getItem(
        "studentId"
      );


    if (!id) {

      setMessage(
        "⚠️ Please login before applying."
      );

      return;
    }


    setStudentId(id);


    const {
      data,
      error
    } = await supabase
      .from("profiles")
      .select("*")
      .eq(
        "student_id",
        Number(id)
      )
      .maybeSingle();


    if (error) {

      console.log(error);

      return;
    }


    if (data) {

      setName(
        data.name || ""
      );


      setPhone(
        data.phone || ""
      );


      setAge(
        data.age
          ? String(data.age)
          : ""
      );

    }

  }


  async function loadColleges() {

    const {
      data,
      error
    } = await supabase
      .from("colleges")
      .select("*")
      .order("name");


    if (error) {

      console.log(error);

      setMessage(
        "❌ Unable to load colleges."
      );

      return;
    }


    setColleges(
      data || []
    );


    const selectedCollege =
      searchParams.get(
        "college"
      );


    if (selectedCollege) {

      setCollege(
        selectedCollege
      );

    }

  }


  async function handleSubmit(event) {

    event.preventDefault();

    setMessage("");

    setApplicationId("");


    if (!studentId) {

      setMessage(
        "⚠️ Please login first."
      );

      return;
    }


    if (name.trim() === "") {

      setMessage(
        "⚠️ Please enter your name."
      );

      return;
    }


    if (name.length < 3) {

      setMessage(
        "⚠️ Name must contain at least 3 characters."
      );

      return;
    }


    if (name.length > 50) {

      setMessage(
        "⚠️ Name cannot exceed 50 characters."
      );

      return;
    }


    if (!/^[A-Za-z ]+$/.test(name)) {

      setMessage(
        "⚠️ Name can contain only letters and spaces."
      );

      return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

      setMessage(
        "⚠️ Mobile number must contain exactly 10 digits."
      );

      return;
    }


    if (
      age === "" ||
      Number(age) < 16 ||
      Number(age) > 60
    ) {

      setMessage(
        "⚠️ Age must be between 16 and 60."
      );

      return;
    }


    if (college === "") {

      setMessage(
        "⚠️ Please select a college."
      );

      return;
    }


    if (course === "") {

      setMessage(
        "⚠️ Please select a course."
      );

      return;
    }


    if (
      !marksheet10 ||
      !marksheet12 ||
      !identity
    ) {

      setMessage(
        "⚠️ Please upload all three documents."
      );

      return;
    }


    const allowedTypes = [

      "application/pdf",

      "image/jpeg",

      "image/png"

    ];


    if (
      !allowedTypes.includes(
        marksheet10.type
      ) ||

      !allowedTypes.includes(
        marksheet12.type
      ) ||

      !allowedTypes.includes(
        identity.type
      )
    ) {

      setMessage(
        "⚠️ Only PDF, JPG, JPEG and PNG files are allowed."
      );

      return;
    }


    const maxSize =
      2 * 1024 * 1024;


    if (
      marksheet10.size > maxSize ||
      marksheet12.size > maxSize ||
      identity.size > maxSize
    ) {

      setMessage(
        "⚠️ Each document must be smaller than 2 MB."
      );

      return;
    }


    /* SAVE PERSONAL DETAILS */

    const {
      error: profileError
    } = await supabase
      .from("profiles")
      .upsert({

        student_id:
          Number(studentId),

        name:
          name.trim(),

        phone:
          phone,

        age:
          Number(age)

      }, {

        onConflict:
          "student_id"

      });


    if (profileError) {

      console.log(profileError);

      setMessage(
        "❌ Unable to save student details."
      );

      return;
    }


    /* SAVE APPLICATION */

    const {
      data,
      error
    } = await supabase
      .from("applications")
      .insert({

        student_id:
          Number(studentId),

        college_id:
          Number(college),

        course:
          course,

        status:
          "Pending"

      })
      .select()
      .single();


    if (error) {

      console.log(error);


      if (
        error.code === "23505"
      ) {

        setMessage(
          "⚠️ You have already applied to this college."
        );

      } else {

        setMessage(
          "❌ Application submission failed."
        );

      }

      return;
    }


    setApplicationId(
      data.id
    );


    setMessage(
      "✅ Application submitted successfully!"
    );


    setCollege("");

    setCourse("");

    setMarksheet10(null);

    setMarksheet12(null);

    setIdentity(null);

  }


  if (!studentId) {

    return (

      <div className="page">

        <div className="form-container">

          <h1>
            📝 Admisia Application
          </h1>

          <p>
            ⚠️ Please login before applying.
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

      <div className="form-container">

        <h1>
          📝 Admisia Application
        </h1>


        <form onSubmit={handleSubmit}>


          <h3>
            👤 Personal Details
          </h3>


          <label>
            Full Name
          </label>


          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            maxLength="50"
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
          />


          <label>
            Mobile Number
          </label>


          <input
            type="tel"
            placeholder="Enter 10 digit mobile number"
            value={phone}
            maxLength="10"
            inputMode="numeric"
            onChange={(event) =>
              setPhone(
                event.target.value
              )
            }
          />


          <label>
            Age
          </label>


          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            min="16"
            max="60"
            onChange={(event) =>
              setAge(
                event.target.value
              )
            }
          />


          <label>
            Select College
          </label>


          <select
            value={college}
            onChange={(event) =>
              setCollege(
                event.target.value
              )
            }
          >

            <option value="">
              Select College
            </option>


            {colleges.map(
              (collegeItem) => (

                <option
                  key={collegeItem.id}
                  value={collegeItem.id}
                >

                  {collegeItem.name}

                  {" - "}

                  {collegeItem.location}

                </option>

              )
            )}

          </select>


          <label>
            Select Course
          </label>


          <select
            value={course}
            onChange={(event) =>
              setCourse(
                event.target.value
              )
            }
          >

            <option value="">
              Select Course
            </option>


            <option value="BTech CSE">
              BTech CSE
            </option>


            <option value="BCA">
              BCA
            </option>


            <option value="BBA">
              BBA
            </option>


            <option value="BCom">
              BCom
            </option>

          </select>


          <h3>
            📄 Required Documents
          </h3>


          <label>
            10th Marksheet
          </label>


          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(event) =>
              setMarksheet10(
                event.target.files[0]
              )
            }
          />


          <small>
            PDF/JPG/PNG • Maximum 2 MB
          </small>


          <label>
            12th Marksheet
          </label>


          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(event) =>
              setMarksheet12(
                event.target.files[0]
              )
            }
          />


          <small>
            PDF/JPG/PNG • Maximum 2 MB
          </small>


          <label>
            Identity Proof
          </label>


          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(event) =>
              setIdentity(
                event.target.files[0]
              )
            }
          />


          <small>
            PDF/JPG/PNG • Maximum 2 MB
          </small>


          <button type="submit">
            Submit Application
          </button>


        </form>


        {message !== "" && (

          <p className="form-message">
            {message}
          </p>

        )}


        {applicationId !== "" && (

          <div className="application-id">

            <h3>
              🎉 Application Submitted
            </h3>


            <p>
              Application ID:
            </p>


            <h2>
              {applicationId}
            </h2>


            <p>
              Your application is currently
              Pending.
            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default Application;