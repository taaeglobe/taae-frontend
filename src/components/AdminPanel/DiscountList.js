import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DiscountList = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    axios.get("https://taae-backend.onrender.com/api/discounts").then((res) => {
      setDiscounts(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`https://taae-backend.onrender.com/api/discounts/${id}`);
    setDiscounts(discounts.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h3>Special Discounts</h3>
      <Link to="/admin/discounts/add">Add New Discount</Link>
      <ul>
        {discounts.map((item) => (
          <li key={item._id}>
            {item.title} - {item.percentage}%
            <Link to={`/admin/discounts/edit/${item._id}`}>Edit</Link>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscountList;
