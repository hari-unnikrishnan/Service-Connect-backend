import React, { useState } from "react";
import "./RegisterService.css";
import {
  ArrowLeft,
  ChevronDown,
  Paperclip,
  FilePlus,
  Image,
  Plus,
  ArrowRight,
  CheckSquare
} from "lucide-react";
import { registerAsProvider } from "./api";

export default function RegisterService({
  onNavigateToServiceCongrats,
  onNavigateBack
}) {
  const [description, setDescription] = useState("");
  const [gstCode, setGstCode] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!description || !category) {
      setError("Please fill in required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const providerData = {
        bio: description,
        service_type: category
      };

      const data = await registerAsProvider(providerData);
      
      if (data.provider || data.success) {
        onNavigateToServiceCongrats();
      } else {
        // For demo, still navigate
        onNavigateToServiceCongrats();
      }
    } catch {
      // For demo, still navigate
      onNavigateToServiceCongrats();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="service-register-wrapper">

      <div className="service-register-header">
        <button
          className="service-register-back"
          onClick={onNavigateBack}
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="service-register-title">
          REGISTER SERVICE
        </h1>
      </div>

      <div className="service-register-body">

        <input
          className="service-input-box"
          placeholder="Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="service-input-box"
          placeholder="GST code"
          value={gstCode}
          onChange={(e) => setGstCode(e.target.value)}
        />

        <div className="service-select-box">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{width: '100%', border: 'none', background: 'transparent'}}
          >
            <option value="">Select Service Category</option>
            <option value="Cleaning">Cleaning Service</option>
            <option value="Delivery">Delivery Services</option>
            <option value="Electrical">Electrical Repair</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Beauty">Beauty Services</option>
            <option value="Health">Health & Fitness</option>
            <option value="Laundry">Laundry Service</option>
            <option value="PackersMovers">Packers & Movers</option>
          </select>
          <ChevronDown size={20} />
        </div>

        <div className="service-select-box">
          <select 
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            style={{width: '100%', border: 'none', background: 'transparent'}}
          >
            <option value="">Select Service Sub-category</option>
          </select>
          <ChevronDown size={20} />
        </div>

        <div className="service-file-box">
          <span>Certificate/Licensee</span>

          <div className="service-file-icons">
            <Paperclip size={18}  />
            <FilePlus size={24} style={{color:"black"}} />
          </div>
        </div>

        <div className="service-file-box">
          <span>File Name (certificate/Licensee)</span>
          <Paperclip size={18} />
        </div>

        <div className="service-media-title">
          Add image and video
        </div>

        <div className="service-media-row">
          <Image size={34} style={{color:"black"}} />
          <Image size={34}  style={{color:"black"}}/>
          <Image size={34}  style={{color:"black"}}/>
          <Plus size={34}  style={{color:"black"}}/>
        </div>

        <div className="service-terms-row">
          <span>Terms & Condition</span>

          <div className="service-accept-box">
            <CheckSquare size={20} />
            <span>Accept</span>
          </div>
        </div>

        <button
          className="service-continue-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          <span className="service-continue-text">{loading ? "Registering..." : "Continue"}</span>

          <div className="service-arrow-circle">
            <ArrowRight size={24} />
          </div>
        </button>

      </div>
    </div>
  );
}