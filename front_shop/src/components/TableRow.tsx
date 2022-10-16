import React from "react";
import { Link } from "react-router-dom";
import Category from "../models/category";
import BaseService from "../service/base.service";
import * as toastr from "toastr";

function Del(Id?: number) {
  BaseService.delete("/employees/", Id).then((rp) => {
    if (rp) {
      toastr.success("Member deleted.");
      window.location.reload();
    } else {
      toastr.error("Error");
    }
  });
}

interface IProps {
  category: Category;
  index: Number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => { 

  return (
    <tr>
      <td><>{props.index}</></td>
      <td>{props.category.name}</td>
      <td>{props.category.description}</td>
      <td><>{props.category.categoryId}</></td>
      <td>
        <Link to={"/edit/" + props.category.id} className="btn btn-primary">
          Edit
        </Link>
      </td>
      <td>
        <button onClick={() => Del(props.category.id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};
export default TableRow;
