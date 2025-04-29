import React from "react";
import { getImageBase64, validateExt } from "../utils";
import { FaTimes } from "react-icons/fa";

const InputImg = (props) => {
  const {
    title = "Image",
    img,
    setImg,
    imgRef,
    formData,
    setFormData,
    setLoading,
    className,
    ...rest
  } = props;
  const handleFileChange = async (e) => {
    try {
      setLoading(true);
      const target = e.target.files;
      const validated = validateExt(target);
      const imgBase64 = await getImageBase64(target[0]);
      setFormData((prev) => ({
        ...prev,
        img: imgBase64,
      }));
      if (validated) {
        setImg(true);
      }
      if (!validated) {
        setImg(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const clearImage = () => {
    setLoading(true);
    imgRef.current.value = "";
    setImg(false);
    setFormData((prev) => ({
      ...prev,
      img: "",
    }));
    setLoading(false);
  };
  return (
    <div className="mb-5">
      <label htmlFor="img" className="text-2xl block mb-2">
        {title}
      </label>
      {/* displayed img */}
      {img && (
        <div className="relative">
          <div
            className="absolute right-[-10px] top-[-15px] w-[35px] h-[35px] flex justify-center items-center bg-red-600 rounded-full cursor-pointer"
            onClick={clearImage}
          >
            <FaTimes className="text-white" />
          </div>
          <img src={formData.img} alt="" className="my-3 w-full" />
        </div>
      )}
      <input
        id="img"
        type="file"
        className={`border-slate-300 w-full rounded-md focus:ring-2 ${className}`}
        onChange={handleFileChange}
        ref={imgRef}
      />
    </div>
  );
};

export default InputImg;
