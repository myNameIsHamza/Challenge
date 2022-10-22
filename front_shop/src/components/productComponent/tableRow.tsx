import React from "react";
import { Link } from "react-router-dom";
import Product from "../../models/product";
import BaseService from "../../service/base.service";
import * as toastr from "toastr";

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

  return (
    <React.Fragment>
      <tr>
        <td><>{props.index}</></td>
        <td>{props.product.name}</td>
        <td>{props.product.description}</td>
        <td>{(Number(props.product.price)*props.factor).toFixed(2) +" "+ props.currencyName}</td>
        <td><>{props.product.categoryId}</></td>
        <td>
          <Link to={"/edit/" + props.product.uid} className="btn btn-primary">
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
