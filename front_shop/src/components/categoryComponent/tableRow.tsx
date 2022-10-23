import React, { useEffect, useState } from "react";
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
  const [desc, setDesc] = useState("");
  useEffect(() => {
    if (props.category.categoryId !== null) {
      BaseService.get<Category>('/category/', props.category.categoryId).then(
        (rp) => {
          if (rp.status === 200) {

            const category = rp.data;
            setDesc(category.description);
          } else {
            toastr.error(rp.Messages);
            console.log("Messages: " + rp.Messages);
            console.log("Exception: " + rp.Exception);
          }
        }

      );
    } else {
      setDesc("None");
    }

  }, [props.category.categoryId])
  return (
    <React.Fragment>
      <tr>
        <td><>{props.index}</></td>
        <td>{props.category.name}</td>
        <td>{props.category.description}</td>
        <td><>{desc}</></td>
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
