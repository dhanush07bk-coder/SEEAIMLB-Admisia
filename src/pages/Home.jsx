import { Link } from "react-router-dom";

function Home() {

  const colleges = [
    {
      id: 1,
      name: "REVA University",
      image: "/colleges/reva.jpg",
      address:
        "Rukmini Knowledge Park, Kattigenahalli, Yelahanka, Bengaluru - 560064",
      description:
        "Explore programs in engineering, technology, management, science and more."
    },

    {
      id: 2,
      name: "Christ University",
      image: "/colleges/christ.jpg",
      address:
        "Hosur Road, Bengaluru - 560029, Karnataka",
      description:
        "Discover undergraduate and postgraduate programs across multiple disciplines."
    },

    {
      id: 3,
      name: "PES University",
      image: "/colleges/pes.jpg",
      address:
        "100 Feet Ring Road, BSK III Stage, Bengaluru - 560085",
      description:
        "Explore opportunities in engineering, technology, management and science."
    },

    {
      id: 4,
      name: "RV University",
      image: "/colleges/rv.jpg",
      address:
        "RV Vidyanikethan Post, 8th Mile, Mysuru Road, Bengaluru - 560059",
      description:
        "Explore programs in technology, design, business, law and other fields."
    },

    {
      id: 5,
      name: "Dayananda Sagar University",
      image: "/colleges/dsu.jpg",
      address:
        "Devarakaggalahalli, Harohalli, Kanakapura Road, Bengaluru - 562112",
      description:
        "Explore programs in engineering, health sciences, management and more."
    }
  ];

  return (
    <div className="page">

      {/* HERO */}

      <section className="hero">

        <h1>
          🎓 Welcome to Admisia
        </h1>

        <h2>
          Your Path to Higher Education
        </h2>

        <p>
          Discover colleges, submit your application,
          upload your documents and track your admission
          journey — all from one simple platform.
        </p>

        <Link to="/application">

          <button>
            🚀 Start Your Application
          </button>

        </Link>

      </section>


      {/* COLLEGES */}

      <section className="college-section">

        <h2>
          Explore Colleges
        </h2>

        <p className="college-intro">
          Find the right college and take
          the next step toward your future.
        </p>


        <div className="college-grid">

          {colleges.map((college) => (

            <div
              className="college-card"
              key={college.id}
            >

              <img
                src={college.image}
                alt={college.name}
                className="college-image"
              />


              <div className="college-content">

                <h2>
                  {college.name}
                </h2>


                <p className="college-address">
                  📍 {college.address}
                </p>


                <p className="college-description">
                  {college.description}
                </p>


                <Link
                  to={`/application?college=${college.id}`}
                >

                  <button className="college-apply-button">
                    Apply Now →
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* FEATURES */}

      <section className="features-section">

        <h2>
          Everything You Need
        </h2>


        <div className="cards">

          <div className="card">

            <h2>
              📝 Easy Applications
            </h2>

            <p>
              Complete your college application
              through a simple online form.
            </p>

          </div>


          <div className="card">

            <h2>
              📄 Documents
            </h2>

            <p>
              Submit your marksheets and
              identity documents easily.
            </p>

          </div>


          <div className="card">

            <h2>
              🏫 Multiple Colleges
            </h2>

            <p>
              Apply to different colleges
              without repeating your details.
            </p>

          </div>


          <div className="card">

            <h2>
              📊 Track Applications
            </h2>

            <p>
              Keep track of every application
              and its admission status.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;