import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../models/product";
import BaseService from "../../service/base.service";
import * as toastr from "toastr";
import Category from "../../models/category";

function Del(Id?: number) {
  BaseService.delete("/product/", Id).then((rp) => {
    if (rp) {
      toastr.success("Member deleted.");
      window.location.reload();
    } else {
      toastr.error("Error");
    }
  });
}



interface IProps {
  factor: number,
  currencyName: string,
  product: Product;
  index: Number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
const [desc, setDesc] = useState("");
  useEffect(() => {
    if (props.product.categoryId !== null) {
      BaseService.get<Category>('/category/', props.product.categoryId).then(
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

  }, [props.product.categoryId])

  return (
    <React.Fragment>
      <tr>
        <td><>{props.index}</></td>
        <td>{props.product.name}</td>
        <td>{props.product.description}</td>
        <td>{(Number(props.product.price)*props.factor).toFixed(2) +" "+ props.currencyName}</td>
        <td><>{desc}</></td>
        <td>
          <Link to={"/editProduct/" + props.product.uid} className="btn btn-primary">
            Edit
          </Link>
        </td>
        <td>
          <button onClick={() => Del(props.product.uid)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>

    </React.Fragment>
  );
};
export default TableRow;
