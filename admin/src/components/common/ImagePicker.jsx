import { ImagePlus } from "lucide-react";

export default function ImagePicker({ preview, onChange, label = "Image upload" }) {
  return (
    <label className="image-picker">
      {preview ? <img src={preview} alt="Upload preview" /> : <ImagePlus size={34} />}
      <span>{label}</span>
      <input type="file" accept="image/*" onChange={onChange} />
    </label>
  );
}
