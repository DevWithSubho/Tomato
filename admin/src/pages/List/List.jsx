import axios from "axios";
import "./List.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
const List = () => {
  const [list, setlist] = useState([]);
  const url = import.meta.env.VITE_BACKEND_UR;
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setlist(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onDeleteFunc = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove`, {
        data: {
          id,
        },
      });
      await fetchList();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cross" onClick={() => onDeleteFunc(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
