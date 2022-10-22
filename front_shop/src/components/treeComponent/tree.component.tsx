import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import ProductTable from '../productComponent/productTable.component';
import Product from '../../models/product';
import CategoryTable from '../categoryComponent/categoryTable.component';
import Category from '../../models/category';

interface props {
  factor: number,
  currencyName: string,
}


class Tree extends React.Component<props> {
  public state: any = []
  constructor(props: any) {
    super(props);
    this.state = {
      allData: [],
      factor: 1,
      currencyName: 'EUR',
    };
  }
  allData: any = [];

  //instance of ProductTable class
  private productTable: ProductTable = new ProductTable({
    isReady: false,
    listproducts: Array<Product>(),
    hasError: false,
  });
  //instance of categoryTableClass
  private categoryTable: CategoryTable = new CategoryTable({
    isReady: false,
    listCategories: Array<Category>(),
    hasError: false,
  });

  public async componentDidMount() {
    const products = await this.productTable.fetchProducts();
    const categories = await this.categoryTable.fetchCategories();

    this.allData = categories.data;
    const allDataSize:number = this.allData.length

    products.data.map((p: any, k: any) => {
      return this.allData.push(
        {
          uid: k + allDataSize + 1,
          name: p.name,
          description: p.description,
          price: Number(p.price * this.props.factor).toFixed(2) + " " + this.props.currencyName,
          categoryId: p.categoryId
        })
    });
    this.setState({ allData: this.allData, factor: this.props.factor, currencyName: this.props.currencyName });
  }

  componentDidUpdate() {
    if (this.state.factor !== this.props.factor || this.state.currencyName !== this.props.currencyName) {
      console.log("update")
      this.componentDidMount()
    }
  }




  makeTree = (nodes: any, parentId: any) => {
    return nodes
      .filter((node: any) => node.categoryId === parentId)
      .reduce(
        (tree: any, node: any) => [
          ...tree,
          {
            ...node,
            children: this.makeTree(nodes, node.uid),
          },
        ],
        [],
      )
  }
  createItemsFromTree = (fromTree: any) => {
    if (fromTree.children.length) {
      return (
        <TreeItem key={fromTree.uid} nodeId={String(fromTree.uid)} label={fromTree.name}>
          {fromTree.children.length > 0 &&
            fromTree.children.map((child: any) => this.createItemsFromTree(child))}
        </TreeItem>
      );
    }
    return (
      <span style={{ height: "100%",display: "flex",alignItems:"center" }} > <TreeItem style={{ display: "flex",alignItems:"center" }} key={fromTree.uid} nodeId={String(fromTree.uid)} label={fromTree.name} />
        <span style={{  left: "20px" }}>{fromTree.price}</span>
      </span>

    );
  };

  public render(): React.ReactNode {
    return (<TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ flexGrow: 1,display:'flex'}}
    >
      {
        this.makeTree(this.state.allData, null).map((tree: any) => {
          return  this.createItemsFromTree(tree)
        })
      }

    </TreeView>);

  }

}
export default Tree;