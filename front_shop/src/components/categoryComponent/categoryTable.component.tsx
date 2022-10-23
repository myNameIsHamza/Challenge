import * as React from "react";
import TableRow from "./tableRow";
import Category from "../../models/category";
import BaseService from "../../service/base.service";
import * as toastr from "toastr";
import { Link } from "react-router-dom";
interface IProps { }
interface IState {
  listCategories: Array<Category>;
  isReady: Boolean;
  hasError: Boolean;
}

class CategoryTable extends React.Component<IProps, IState> {
  public state: IState = {
    listCategories: new Array<Category>(),
    isReady: false,
    hasError: false,
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      isReady: false,
      listCategories: Array<Category>(),
      hasError: false,
    };
  }

  public async fetchCategories(): Promise<any> {
    let res = BaseService.getAll<Category>("/categories").then((rp) => {
      return rp;
    });
    return res;
  }

  async getCategoryData() {
    const rp = await this.fetchCategories();
    if (rp.status === 200) {
      const data = rp.data;
      const listCategories = new Array<Category>();
      (data || []).forEach((p: any) => {
        listCategories.push(new Category(p.uid, p.name, p.description, p.categoryId));
      });

      this.setState({ listCategories: listCategories });
      this.setState({ isReady: true });
    } else {
      this.setState({ isReady: true });
      this.setState({ hasError: true });
    }
  }

  public componentDidMount() {
    this.getCategoryData();

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

    return this.state.listCategories.map(function (object, i) {
      return <TableRow key={i} index={i + 1} category={object} />;
    });
  };

  public render(): React.ReactNode {
    return (
      <div>
        <h3 className="text-center">Categories List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Index</th>
              <th>Category</th>
              <th>Description</th>
              <th>Parent category description</th>
              <th className="text-center" colSpan={1}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
        <div className="text-end"><Link to={"/createCategory/"} className="btn btn-success">
          Ajout category
        </Link></div>
      </div>
    );
  }
}
export default CategoryTable;
