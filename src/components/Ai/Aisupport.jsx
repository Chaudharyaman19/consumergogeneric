import { useState } from "react";
import { Camera, FileText, Search, MessageCircle, X } from "lucide-react";
import "../../css/ai/ai.css";
import { useNavigate } from "react-router-dom";
const TESTS = [
  { id: 1000, code: "T001", name: "Complete Blood Count (CBC)", short: "cbc" },
  { id: 1001, code: "T002", name: "Blood Glucose Test", short: "glucose" },
  { id: 1002, code: "T003", name: "Lipid Profile", short: "lipid" },
  { id: 1003, code: "T004", name: "Liver Function Test (LFT)", short: "lft" },
  { id: 1004, code: "T005", name: "Kidney Function Test (KFT)", short: "kft" },
  {
    id: 1005,
    code: "T006",  
    name: "Thyroid Stimulating Hormone (TSH)",
    short: "tsh",
  },
  { id: 1006, code: "T007", name: "Hemoglobin A1c (HbA1c)", short: "hba1c" },
  { id: 1007, code: "T008", name: "Vitamin D Test", short: "vitd" },
  { id: 1008, code: "T009", name: "Vitamin B12 Test", short: "b12" },
  { id: 1009, code: "T010", name: "Iron Studies", short: "iron" },
  {
    id: 1010,
    code: "T011",
    name: "Urine Routine and Microscopy",
    short: "urine",
  },
  { id: 1011, code: "T012", name: "Urine Culture", short: "urinec" },
  {
    id: 1012,
    code: "T013",
    name: "Electrolytes (Sodium, Potassium, Chloride)",
    short: "electro",
  },
  { id: 1013, code: "T014", name: "C-Reactive Protein (CRP)", short: "crp" },
  {
    id: 1014,
    code: "T015",
    name: "Erythrocyte Sedimentation Rate (ESR)",
    short: "esr",
  },
  { id: 1015, code: "T016", name: "Prothrombin Time (PT) / INR", short: "pt" },
  { id: 1016, code: "T017", name: "Platelet Count", short: "platelet" },
  { id: 1017, code: "T018", name: "Red Blood Cell (RBC) Count", short: "rbc" },
  {
    id: 1018,
    code: "T019",
    name: "White Blood Cell (WBC) Count",
    short: "wbc",
  },
  { id: 1019, code: "T020", name: "Serum Creatinine", short: "creatinine" },
  { id: 1020, code: "T021", name: "Blood Urea Nitrogen (BUN)", short: "bun" },
  { id: 1021, code: "T022", name: "Albumin Test", short: "albumin" },
  { id: 1022, code: "T023", name: "Bilirubin Test", short: "bilirubin" },
  { id: 1023, code: "T024", name: "Alkaline Phosphatase (ALP)", short: "alp" },
  { id: 1024, code: "T025", name: "AST/ALT (SGOT/SGPT)", short: "astalt" },
  { id: 1025, code: "T026", name: "Electrocardiogram (ECG)", short: "ecg" },
  { id: 1026, code: "T027", name: "Urinary Protein", short: "upro" },
  { id: 1027, code: "T028", name: "Blood Culture", short: "bculture" },
  { id: 1028, code: "T029", name: "Stool Routine Test", short: "stool" },
  { id: 1029, code: "T030", name: "Stool Occult Blood Test", short: "sobt" },
  { id: 1030, code: "T031", name: "Pregnancy Test (Beta HCG)", short: "preg" },
  { id: 1031, code: "T032", name: "Serum Calcium", short: "calcium" },
  { id: 1032, code: "T033", name: "Serum Magnesium", short: "magnesium" },
  { id: 1033, code: "T034", name: "Serum Phosphate", short: "phosphate" },
  { id: 1034, code: "T035", name: "Rheumatoid Factor (RF)", short: "rf" },
  { id: 1035, code: "T036", name: "Antinuclear Antibody (ANA)", short: "ana" },
  { id: 1036, code: "T037", name: "Vitamin K Test", short: "vitk" },
  { id: 1037, code: "T038", name: "Creatine Kinase (CK)", short: "ck" },
  { id: 1038, code: "T039", name: "Lactate Dehydrogenase (LDH)", short: "ldh" },
  {
    id: 1039,
    code: "T040",
    name: "Prostate-Specific Antigen (PSA)",
    short: "psa",
  },
];

const LABS = [
  {
    id: "labA",
    name: "Alpha Diagnostics",
    tests: TESTS.map((t, idx) => ({ ...t, price: 500 + idx * 20 })),
  },
  {
    id: "labB",
    name: "Beta Labs",
    tests: TESTS.map((t, idx) => ({ ...t, price: 480 + idx * 18 })),
  },
];

const PrescriptionAnalyzer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prescriptionText, setPrescriptionText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestedTests, setSuggestedTests] = useState([]);
  const [selectedLab, setSelectedLab] = useState("labA");
  const [activeTab, setActiveTab] = useState("upload");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    setPrescriptionText("");
    setSelectedImage(null);
    setSuggestedTests([]);
    setSelectedLab("labA");
    setActiveTab("upload");
    setLoading(false);
  };

  const analyzePrescription = (text) => {
    if (!text.trim()) return [];
    const normalized = text
      .toLowerCase()
      .replace(/[^a-z0-9,]/g, "")
      .split(",")
      .map((t) => t.trim());

    const matchedTests = TESTS.filter((test) =>
      normalized.some(
        (t) =>
          t.includes(test.name.toLowerCase()) ||
          (test.short && t.includes(test.short))
      )
    );

    return matchedTests;
  };

  const handleTextAnalysis = () => {
    if (!prescriptionText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const tests = analyzePrescription(prescriptionText);
      setSuggestedTests(tests);
      setLoading(false);
    }, 1000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setLoading(true);

    setTimeout(() => {
      const fileName = file.name.toLowerCase();
      let tests = [];
      if (fileName.includes("prescription")) {
        const sampleText = "cbc, glucose, lipid";
        tests = analyzePrescription(sampleText);
      }
      setSuggestedTests(tests);
      setLoading(false);
    }, 1000);
  };

  const getTestsWithPrices = () => {
    const labData = LABS.find((l) => l.id === selectedLab);
    return suggestedTests.map((t) => ({
      ...t,
      price: labData.tests.find((lt) => lt.id === t.id)?.price || 0,
    }));
  };

  const totalPrice = getTestsWithPrices().reduce((sum, t) => sum + t.price, 0);

  return (
    <div>
      {!isOpen && (
        <button className="pa-chat-bubble" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="pa-popup">
          <div className="pa-popup-header">
            <h2>Ai Friend</h2>
            <button className="pa-close-btn" onClick={handleClose}>
              <X size={20} />
            </button>
          </div>

          <div className="pa-tabs">
            <button
              onClick={() => setActiveTab("upload")}
              className={`pa-tab-button ${
                activeTab === "upload" ? "active" : "inactive"
              }`}
            >
              <Camera size={16} /> Upload
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`pa-tab-button ${
                activeTab === "text" ? "active" : "inactive"
              }`}
            >
              <FileText size={16} /> Text
            </button>
          </div>

          {activeTab === "upload" ? (
            <div className="pa-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {selectedImage && (
                <div className="pa-image-preview">
                  <img src={selectedImage} alt="Prescription" />
                </div>
              )}
            </div>
          ) : (
            <div className="pa-text">
              <textarea
                placeholder="Enter prescription details..."
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
                className="pa-textarea"
              />
              <button
                onClick={handleTextAnalysis}
                disabled={!prescriptionText.trim() || loading}
                className="pa-button"
              >
                <Search size={16} /> {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          )}

          {loading && <p style={{ margin: "10px 0" }}>Loading...</p>}

          {!loading && suggestedTests.length === 0 && (
            <p className="pa-no-tests">No tests found.</p>
          )}

          {!loading && suggestedTests.length > 0 && (
            <div>
              <div className="pa-lab-select">
                <label>Choose Lab:</label>
                <select
                  style={{ marginLeft: "5px" }}
                  value={selectedLab}
                  onChange={(e) => setSelectedLab(e.target.value)}
                >
                  {LABS.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pa-tests-container">
                {getTestsWithPrices().map((t) => (
                  <div key={t.id} className="pa-test-card">
                    <h4>{t.name}</h4>
                    <p>{t.code}</p>
                    <div className="pa-price-book">
                      <span className="pa-price">₹{t.price}</span>
                      {/* <button className="pa-book-btn">Book</button> */}
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="pa-total">Total: ₹{totalPrice}</div> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrescriptionAnalyzer;
