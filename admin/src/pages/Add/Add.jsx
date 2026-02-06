import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useOutletContext } from "react-router-dom";
const Add = () => {
  const [image, setImage] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  const productName = useRef("");
  const productDesc = useRef("");
  const productCategory = useRef("");
  const productprice = useRef("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", productName.current.value);
    formData.append("description", productDesc.current.value);
    formData.append("category", productCategory.current.value);
    formData.append("price", productprice.current.value);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        // Reset form
        setImage(false);
        productName.current.value = "";
        productDesc.current.value = "";
        productCategory.current.value = "Salad";
        productprice.current.value = "";
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Type Here"
            ref={productName}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            ref={productDesc}
            name="description"
            rows="6"
            placeholder="write content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" ref={productCategory}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              ref={productprice}
            />
          </div>
        </div>
        <button type="submit" className="add-bttn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
