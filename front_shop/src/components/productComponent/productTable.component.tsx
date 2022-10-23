import * as React from "react";
import TableRow from "./tableRow";
import Product from "../../models/product";
import BaseService from "../../service/base.service";
import * as toastr from "toastr";
import { Link } from "react-router-dom";
interface props {
  factor: number,
  currencyName: string,
}
interface IState {
  listproducts: Array<Product>;
  isReady: Boolean;
  hasError: Boolean;
}

class ProductTable extends React.Component<props, IState> {
  public state: IState = {
    listproducts: new Array<Product>(),
    isReady: false,
    hasError: false,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
      listproducts: Array<Product>(),
      hasError: false,
    };
  }
  public async fetchProducts(): Promise<any> {
    let res = BaseService.getAll<Product>("/products").then((rp) => {
      return rp;
    });
    return res;
  }

  async getProductData() {
    const rp: any = await this.fetchProducts();
    if (rp.status === 200) {
      const data = rp.data;
      const listproducts = new Array<Product>();
      (data || []).forEach((p: any) => {
        listproducts.push(new Product(p.uid, p.name, p.description, p.price, p.categoryId));
      });

      this.setState({ listproducts: listproducts });
      this.setState({ isReady: true });
    } else {
      this.setState({ isReady: true });
      this.setState({ hasError: true });
    }
  }
  public componentDidMount() {
    this.getProductData();

    setTimeout(() => {
      if (!this.state.isReady) {
        toastr.info(
          "It is possible that the service is being restarted, please wait more ...",
          "",
          { timeOut: 8000 }
        );
      }

      if (this.state.hasError) {
        toastr.error(
          "An error occurred!",
          "",
          { timeOut: 8000 }
        );
      }
    }, 2000);
  }

  public tabRow = () => {
    if (!this.state.isReady) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      );
    }
    if (this.state.hasError) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            <div className="alert alert-danger" role="alert">
              An error occurred!
            </div>
          </td>
        </tr>
      );
    }

    return this.state.listproducts.map((object, i)=> {
      return <TableRow factor={this.props.factor} currencyName={this.props.currencyName} key={i} index={i + 1} product={object} />;
    });
  };

  public render(): React.ReactNode {
    return (
      <div>
        <h3 className="text-center">products List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Index</th>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category description</th>
              <th className="text-center" colSpan={1}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
        <div className="text-end"><Link to={"/createProduct/"} className="btn btn-success">
          Ajout product
        </Link></div>
      </div>
    );
  }
}
export default ProductTable;
