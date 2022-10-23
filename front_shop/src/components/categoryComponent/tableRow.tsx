import React from "react";
import { Link } from "react-router-dom";
import Category from "../../models/category";
import BaseService from "../../service/base.service";
import * as toastr from "toastr";

function Del(Id?: number) {
  BaseService.delete("/category/", Id).then((rp) => {
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
    <React.Fragment>
      <tr>
        <td><>{props.index}</></td>
        <td>{props.category.name}</td>
        <td>{props.category.description}</td>
        <td><>{props.category.categoryId}</></td>
        <td>
          <Link to={"/editCategory/" + props.category.uid} className="btn btn-primary">
            Edit
          </Link>
        </td>
        <td>
          <button onClick={() => Del(props.category.uid)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>

    </React.Fragment>
  );
};
export default TableRow;
