import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import AdminFAQ from "./AdminFAQ";
import AdminUsers from "./UserFetch";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("offers");

  // Offers state & form data
  const [offers, setOffers] = useState([]);
  const [offerForm, setOfferForm] = useState({
    id: null,
    place_name: "",
    slogan: "",
    description: "",
    image: null, // newly selected File
    existingImage: null, // filename from server when editing
  });

  // Destinations state & form data
  const [destinations, setDestinations] = useState([]);
  const [destinationForm, setDestinationForm] = useState({
    id: null,
    place_name: "",
    description: "",
    type: "",
    image: null,
    existingImage: null,
  });

  // Team state & form data
  const [team, setTeam] = useState([]);
  const [teamForm, setTeamForm] = useState({
    id: null,
    name: "",
    role: "",
    phone: "",
    email: "",
    image: null,
    existingImage: null,
  });

  // previews
  const [offerPreview, setOfferPreview] = useState(null);
  const [destinationPreview, setDestinationPreview] = useState(null);
  const [teamPreview, setTeamPreview] = useState(null);

  // refs for auto-resize textareas
  const offerDescRef = useRef(null);
  const offerSloganRef = useRef(null);
  const destDescRef = useRef(null);

  // Base URL for images
  const imageBaseUrl = "http://localhost:5000/uploads/";

  // Fetch all on mount
  useEffect(() => {
    fetchOffers();
    fetchDestinations();
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Offers
  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/offers");
      setOffers(res.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  // Fetch Destinations
  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/popular-destinations"
      );
      setDestinations(res.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  // Fetch Team
  const fetchTeam = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/team");
      setTeam(res.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // Generic Delete Handler
  const handleDelete = async (id, type) => {
    try {
      const url =
        type === "offers"
          ? `http://localhost:5000/api/offers/${id}`
          : type === "destinations"
          ? `http://localhost:5000/api/popular-destinations/${id}`
          : `http://localhost:5000/api/team/${id}`;
      await axios.delete(url);

      if (type === "offers") fetchOffers();
      else if (type === "destinations") fetchDestinations();
      else fetchTeam();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  // --- Helper: auto-resize textarea element ---
  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  // Keep textareas sized correctly whenever content changes (or form is populated)
  useEffect(() => {
    autoResize(offerDescRef.current);
    autoResize(offerSloganRef.current);
  }, [offerForm.description, offerForm.slogan, activeSection]);

  useEffect(() => {
    autoResize(destDescRef.current);
  }, [destinationForm.description, activeSection]);

  // --- Offer image change & preview ---
  const handleOfferImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // revoke old object url
    if (offerPreview && offerPreview.startsWith("blob:"))
      URL.revokeObjectURL(offerPreview);
    setOfferForm({ ...offerForm, image: file });
    setOfferPreview(URL.createObjectURL(file));
  };

  // --- Destination image change & preview ---
  const handleDestinationImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (destinationPreview && destinationPreview.startsWith("blob:"))
      URL.revokeObjectURL(destinationPreview);
    setDestinationForm({ ...destinationForm, image: file });
    setDestinationPreview(URL.createObjectURL(file));
  };

  // --- Team image change & preview ---
  const handleTeamImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (teamPreview && teamPreview.startsWith("blob:"))
      URL.revokeObjectURL(teamPreview);
    setTeamForm({ ...teamForm, image: file });
    setTeamPreview(URL.createObjectURL(file));
  };

  // --- Offer Submit ---
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("place_name", offerForm.place_name);
      formData.append("slogan", offerForm.slogan || "");
      formData.append("description", offerForm.description || "");
      // append image only if a new file chosen
      if (offerForm.image) formData.append("image", offerForm.image);

      if (offerForm.id) {
        await axios.put(
          `http://localhost:5000/api/offers/${offerForm.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/offers", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // cleanup preview object urls
      if (offerPreview && offerPreview.startsWith("blob:"))
        URL.revokeObjectURL(offerPreview);

      setOfferForm({
        id: null,
        place_name: "",
        slogan: "",
        description: "",
        image: null,
        existingImage: null,
      });
      setOfferPreview(null);
      fetchOffers();
    } catch (error) {
      console.error("Error adding/updating offer:", error);
    }
  };

  // --- Destination Submit ---
  const handleDestinationSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("place_name", destinationForm.place_name);
      formData.append("description", destinationForm.description || "");
      formData.append("type", destinationForm.type || "");
      if (destinationForm.image)
        formData.append("image", destinationForm.image);

      if (destinationForm.id) {
        await axios.put(
          `http://localhost:5000/api/popular-destinations/${destinationForm.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/popular-destinations",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (destinationPreview && destinationPreview.startsWith("blob:"))
        URL.revokeObjectURL(destinationPreview);
      setDestinationForm({
        id: null,
        place_name: "",
        description: "",
        type: "",
        image: null,
        existingImage: null,
      });
      setDestinationPreview(null);
      fetchDestinations();
    } catch (error) {
      console.error("Error adding/updating destination:", error);
    }
  };

  // --- Team Submit ---
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", teamForm.name);
      formData.append("role", teamForm.role);
      formData.append("phone", teamForm.phone);
      formData.append("email", teamForm.email);
      if (teamForm.image) formData.append("image", teamForm.image);

      if (teamForm.id) {
        await axios.put(
          `http://localhost:5000/api/team/${teamForm.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/team", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (teamPreview && teamPreview.startsWith("blob:"))
        URL.revokeObjectURL(teamPreview);
      setTeamForm({
        id: null,
        name: "",
        role: "",
        phone: "",
        email: "",
        image: null,
        existingImage: null,
      });
      setTeamPreview(null);
      fetchTeam();
    } catch (error) {
      console.error("Error adding/updating team member:", error);
    }
  };

  // Populate Offer form for editing
  const handleEditOffer = (offer) => {
    setOfferForm({
      id: offer.id || offer._id,
      place_name: offer.place_name || "",
      slogan: offer.slogan || "",
      description: offer.description || "",
      image: null,
      existingImage: offer.image || null,
    });
    // set preview to existing image (will be replaced if user picks new file)
    setOfferPreview(offer.image ? imageBaseUrl + offer.image : null);
    setActiveSection("offers");
  };

  // Populate Destination form for editing
  const handleEditDestination = (dest) => {
    setDestinationForm({
      id: dest.id || dest._id,
      place_name: dest.place_name || "",
      description: dest.description || "",
      type: dest.type || "domestic",
      image: null,
      existingImage: dest.image || null,
    });
    setDestinationPreview(dest.image ? imageBaseUrl + dest.image : null);
    setActiveSection("destinations");
  };

  // Populate Team form for editing
  const handleEditTeam = (member) => {
    setTeamForm({
      id: member.id || member._id,
      name: member.name || "",
      role: member.role || "",
      phone: member.phone || "",
      email: member.email || "",
      image: null,
      existingImage: member.image || null,
    });
    setTeamPreview(member.image ? imageBaseUrl + member.image : null);
    setActiveSection("team");
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <button
          className={activeSection === "offers" ? "active" : ""}
          onClick={() => setActiveSection("offers")}
        >
          Manage Offers
        </button>
        <button
          className={activeSection === "destinations" ? "active" : ""}
          onClick={() => setActiveSection("destinations")}
        >
          Manage Destinations
        </button>
        <button
          className={activeSection === "team" ? "active" : ""}
          onClick={() => setActiveSection("team")}
        >
          Manage Team
        </button>
        <button
          className={activeSection === "faq" ? "active" : ""}
          onClick={() => setActiveSection("faq")}
        >
          Manage FAQ
        </button>
        <button
          className={activeSection === "user" ? "active" : ""}
          onClick={() => setActiveSection("user")}
        >
          Manage User
        </button>
      </aside>

      <main className="main-content">
        {/* OFFERS SECTION */}
        {activeSection === "offers" && (
          <>
            <h2>{offerForm.id ? "Edit Offer" : "Add Offer"}</h2>
            <form onSubmit={handleOfferSubmit} className="form-box">
              <input
                type="text"
                placeholder="Place Name"
                value={offerForm.place_name}
                onChange={(e) =>
                  setOfferForm({ ...offerForm, place_name: e.target.value })
                }
                required
              />

              {/* Slogan — textarea auto-resize */}
              <textarea
                ref={offerSloganRef}
                placeholder="Slogan"
                value={offerForm.slogan || ""}
                onChange={(e) => {
                  // update state then auto resize the field
                  setOfferForm({ ...offerForm, slogan: e.target.value });
                  autoResize(e.target);
                }}
                className="auto-textarea"
                required
              />

              {/* Description — textarea auto-resize */}
              <textarea
                ref={offerDescRef}
                placeholder="Description"
                value={offerForm.description}
                onChange={(e) => {
                  setOfferForm({ ...offerForm, description: e.target.value });
                  autoResize(e.target);
                }}
                className="auto-textarea"
                required
              />

              {/* image preview (existing or selected) */}
              {(offerPreview || offerForm.existingImage) && (
                <img
                  src={
                    offerPreview ||
                    (offerForm.existingImage &&
                      imageBaseUrl + offerForm.existingImage)
                  }
                  alt="Offer preview"
                  className="form-image-preview"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleOfferImageChange}
                required={!offerForm.id && !offerForm.existingImage}
              />
              <button type="submit">
                {offerForm.id ? "Update Offer" : "Add Offer"}
              </button>
            </form>

            <ul className="list-box">
              {offers.map((offer) => (
                <li key={offer.id || offer._id} className="list-item">
                  <div className="list-image-text">
                    {offer.image && (
                      <img
                        src={imageBaseUrl + offer.image}
                        alt={offer.place_name}
                        className="list-image"
                      />
                    )}
                    <div className="list-text-text">
                      <strong>{offer.place_name}</strong>
                      {/* show slogan and description fully */}
                      <p className="slogan">{offer.slogan}</p>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditOffer(offer)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(offer.id || offer._id, "offers")
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* DESTINATIONS SECTION */}
        {activeSection === "destinations" && (
          <>
            <h2>
              {destinationForm.id ? "Edit Destination" : "Add Destination"}
            </h2>
            <form onSubmit={handleDestinationSubmit} className="form-box">
              <input
                type="text"
                placeholder="Place Name"
                value={destinationForm.place_name}
                onChange={(e) =>
                  setDestinationForm({
                    ...destinationForm,
                    place_name: e.target.value,
                  })
                }
                required
              />

              <textarea
                ref={destDescRef}
                placeholder="Description"
                value={destinationForm.description}
                onChange={(e) => {
                  setDestinationForm({
                    ...destinationForm,
                    description: e.target.value,
                  });
                  autoResize(e.target);
                }}
                className="auto-textarea"
                required
              />

              {(destinationPreview || destinationForm.existingImage) && (
                <img
                  src={
                    destinationPreview ||
                    (destinationForm.existingImage &&
                      imageBaseUrl + destinationForm.existingImage)
                  }
                  alt="Destination preview"
                  className="form-image-preview"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleDestinationImageChange}
                required={!destinationForm.id && !destinationForm.existingImage}
              />

              <select
                value={destinationForm.type}
                onChange={(e) =>
                  setDestinationForm({
                    ...destinationForm,
                    type: e.target.value,
                  })
                }
                required
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
              <button type="submit">
                {destinationForm.id ? "Update Destination" : "Add Destination"}
              </button>
            </form>

            <ul className="list-box">
              {destinations.map((dest) => (
                <li key={dest.id || dest._id} className="list-item">
                  <div className="list-image-text">
                    {dest.image && (
                      <img
                        src={imageBaseUrl + dest.image}
                        alt={dest.place_name}
                        className="list-image"
                      />
                    )}
                    <div className="list-text">
                      <strong>{dest.place_name}</strong>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditDestination(dest)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(dest.id || dest._id, "destinations")
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* TEAM SECTION */}
        {activeSection === "team" && (
          <>
            <h2>{teamForm.id ? "Edit Team Member" : "Add Team Member"}</h2>
            <form onSubmit={handleTeamSubmit} className="form-box team-form">
              <input
                type="text"
                placeholder="Name"
                value={teamForm.name}
                onChange={(e) =>
                  setTeamForm({ ...teamForm, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={teamForm.role}
                onChange={(e) =>
                  setTeamForm({ ...teamForm, role: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={teamForm.phone}
                onChange={(e) =>
                  setTeamForm({ ...teamForm, phone: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={teamForm.email}
                onChange={(e) =>
                  setTeamForm({ ...teamForm, email: e.target.value })
                }
                required
              />

              {(teamPreview || teamForm.existingImage) && (
                <img
                  src={
                    teamPreview ||
                    (teamForm.existingImage &&
                      imageBaseUrl + teamForm.existingImage)
                  }
                  alt="Team preview"
                  className="form-image-preview team-image-preview"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleTeamImageChange}
                required={!teamForm.id && !teamForm.existingImage}
              />
              <button type="submit">
                {teamForm.id ? "Update Team Member" : "Add Team Member"}
              </button>
            </form>

            <ul className="team-list">
              {team.map((member) => (
                <li key={member.id || member._id} className="team-list-item">
                  <div className="list-image-text">
                    {member.image && (
                      <img
                        src={imageBaseUrl + member.image}
                        alt={member.name}
                        className="team-member-image"
                      />
                    )}
                    <div className="team-member-info">
                      <strong>{member.name}</strong>
                      <div>
                        <p>Role: {member.role}</p>
                        <p>Phone: {member.phone}</p>
                        <p>Email: {member.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="team-list-buttons">
                    <button
                      className="team-edit-btn"
                      onClick={() => handleEditTeam(member)}
                    >
                      Edit
                    </button>
                    <button
                      className="team-delete-btn"
                      onClick={() =>
                        handleDelete(member.id || member._id, "team")
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* FAQ SECTION */}
        {activeSection === "faq" && <AdminFAQ />}
        {activeSection === "user" && <AdminUsers />}
      </main>
    </div>
  );
};

export default AdminDashboard;
