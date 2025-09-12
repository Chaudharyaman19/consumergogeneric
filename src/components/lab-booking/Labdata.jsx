import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/labdata.css";
import Compare from "./Compare";
import Formbook from "./Formbook";
import Bookingdetails from "./Bookingdetails";
import { FaUpload } from "react-icons/fa";
import Aisupport from "../Ai/Aisupport";

export default function LabData() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [compareList, setCompareList] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentView, setCurrentView] = useState("labs");
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [navigate]);

  const TESTS = [
    {
      id: 1000,
      code: "T001",
      name: "Complete Blood Count (CBC)",
      type: "test",
    },
    { id: 1001, code: "T002", name: "Blood Glucose Test", type: "test" },
    { id: 1002, code: "T003", name: "Lipid Profile", type: "test" },
    { id: 1003, code: "T004", name: "Liver Function Test (LFT)", type: "test" },
    {
      id: 1004,
      code: "T005",
      name: "Kidney Function Test (KFT)",
      type: "test",
    },
    {
      id: 1005,
      code: "T006",
      name: "Thyroid Stimulating Hormone (TSH)",
      type: "test",
    },
    { id: 1006, code: "T007", name: "Hemoglobin A1c (HbA1c)", type: "test" },
    { id: 1007, code: "T008", name: "Vitamin D Test", type: "test" },
    { id: 1008, code: "T009", name: "Vitamin B12 Test", type: "test" },
    { id: 1009, code: "T010", name: "Iron Studies", type: "test" },
    {
      id: 1010,
      code: "T011",
      name: "Urine Routine and Microscopy",
      type: "test",
    },
    { id: 1011, code: "T012", name: "Urine Culture", type: "test" },
    {
      id: 1012,
      code: "T013",
      name: "Electrolytes (Sodium, Potassium, Chloride)",
      type: "test",
    },
    { id: 1013, code: "T014", name: "C-Reactive Protein (CRP)", type: "test" },
    {
      id: 1014,
      code: "T015",
      name: "Erythrocyte Sedimentation Rate (ESR)",
      type: "test",
    },
    {
      id: 1015,
      code: "T016",
      name: "Prothrombin Time (PT) / INR",
      type: "test",
    },
    { id: 1016, code: "T017", name: "Platelet Count", type: "test" },
    {
      id: 1017,
      code: "T018",
      name: "Red Blood Cell (RBC) Count",
      type: "test",
    },
    {
      id: 1018,
      code: "T019",
      name: "White Blood Cell (WBC) Count",
      type: "test",
    },
    { id: 1019, code: "T020", name: "Serum Creatinine", type: "test" },
    { id: 1020, code: "T021", name: "Blood Urea Nitrogen (BUN)", type: "test" },
    { id: 1021, code: "T022", name: "Albumin Test", type: "test" },
    { id: 1022, code: "T023", name: "Bilirubin Test", type: "test" },
    {
      id: 1023,
      code: "T024",
      name: "Alkaline Phosphatase (ALP)",
      type: "test",
    },
    { id: 1024, code: "T025", name: "AST/ALT (SGOT/SGPT)", type: "test" },
    { id: 1025, code: "T026", name: "Electrocardiogram (ECG)", type: "test" },
    { id: 1026, code: "T027", name: "Urinary Protein", type: "test" },
    { id: 1027, code: "T028", name: "Blood Culture", type: "test" },
    { id: 1028, code: "T029", name: "Stool Routine Test", type: "test" },
    { id: 1029, code: "T030", name: "Stool Occult Blood Test", type: "test" },
    { id: 1030, code: "T031", name: "Pregnancy Test (Beta HCG)", type: "test" },
    { id: 1031, code: "T032", name: "Serum Calcium", type: "test" },
    { id: 1032, code: "T033", name: "Serum Magnesium", type: "test" },
    { id: 1033, code: "T034", name: "Serum Phosphate", type: "test" },
    { id: 1034, code: "T035", name: "Rheumatoid Factor (RF)", type: "test" },
    {
      id: 1035,
      code: "T036",
      name: "Antinuclear Antibody (ANA)",
      type: "test",
    },
    { id: 1036, code: "T037", name: "Vitamin K Test", type: "test" },
    { id: 1037, code: "T038", name: "Creatine Kinase (CK)", type: "test" },
    {
      id: 1038,
      code: "T039",
      name: "Lactate Dehydrogenase (LDH)",
      type: "test",
    },
    {
      id: 1039,
      code: "T040",
      name: "Prostate-Specific Antigen (PSA)",
      type: "test",
    },
  ];

  const LABS = [
    {
      id: "labA",
      name: "Alpha Diagnostics",
      tests: TESTS.map((t, idx) => ({
        ...t,
        price: Math.round(500 + idx * 10 + (idx % 5) * 25),
      })),
    },
    {
      id: "labB",
      name: "Beta Labs",
      tests: TESTS.map((t, idx) => ({
        ...t,
        price: Math.round(480 + idx * 12 + ((idx + 3) % 7) * 18),
      })),
    },
  ];

  const handleAddToCompare = (test) => {
    if (!compareList.find((t) => t.id === test.id)) {
      setCompareList([...compareList, test]);
    }
  };

  const handleRemoveFromCompare = (id) => {
    setCompareList(compareList.filter((t) => t.id !== id));
  };

  const handleChoose = (test, choice) => {
    const prices = LABS.map(
      (lab) => lab.tests.find((x) => x.id === test.id)?.price
    );
    const chosenPrice =
      choice === "low" ? Math.min(...prices) : Math.max(...prices);
    const labName = LABS.find((lab) =>
      lab.tests.find((t) => t.id === test.id && t.price === chosenPrice)
    )?.name;

    setSelectedTest({
      id: test.id,
      testName: test.name,
      price: chosenPrice,
      labName,
    });
  };

  const handleCancelForm = () => setSelectedTest(null);

  const handleBookingComplete = (booking) => {
    setAllBookings((prev) => [...prev, booking]);
    setCurrentView("bookings");
  };

  const handleDirectSlotBooking = (test, labName) => {
    setSelectedTest({
      id: test.id,
      testName: test.name,
      price: test.price,
      labName,
    });
  };

  if (currentView === "bookings") {
    return (
      <Bookingdetails
        bookings={allBookings}
        onBack={() => setCurrentView("labs")}
      />
    );
  }

  return (
    <>
      <Aisupport />
      <div className="ld-container">
        <h2 className="ld-title">Labs & Tests</h2>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "-moz-initial",
            fontWeight: 400,
            padding: "5px 10px",
          }}
        >
          {/* If you know the test name, please search for it. If you are not sure,
          upload your <strong>prescription</strong>. */}
        </h2>

        <div className="ld-search-row">
          <input
            type="text"
            className="ld-search"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* <label className="ld-upload-label">
            <FaUpload className="ld-upload-icon" />
            Upload your prescription
            <input type="file" className="ld-upload" />
          </label> */}
        </div>

        <div className="ld-main-row">
          <div className="ld-labs-row">
            {LABS.map((lab) => (
              <div key={lab.id} className="ld-lab-card">
                <h3 className="ld-lab-name">{lab.name}</h3>
                <div className="ld-tests-list">
                  {lab.tests
                    .filter(
                      (t) =>
                        t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.code.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((test) => (
                      <div key={test.id} className="ld-test-row">
                        <div className="ld-test-info">
                          <div className="ld-test-code">{test.code}</div>
                          <div className="ld-test-name">{test.name}</div>
                        </div>
                        <div className="ld-test-actions">
                          <div className="ld-price">₹{test.price}</div>
                          <button
                            className="ld-compare-btn"
                            onClick={() => handleAddToCompare(test)}
                          >
                            Compare
                          </button>
                          <button
                            className="ld-add-slot-btn"
                            onClick={() =>
                              handleDirectSlotBooking(test, lab.name)
                            }
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {selectedTest && (
            <div className="fb-layout">
              <Formbook
                selectedTest={selectedTest}
                onCancel={handleCancelForm}
                onBookingComplete={handleBookingComplete}
              />
            </div>
          )}
        </div>

        <Compare
          compareList={compareList}
          labs={LABS}
          onRemove={handleRemoveFromCompare}
          onChoose={handleChoose}
        />
      </div>
    </>
  );
}
