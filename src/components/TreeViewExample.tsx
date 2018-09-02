import * as React from 'react'
import TreeView, { INode, IGroup, IItem } from './TreeView'
import './TreeView.css'

type State = {
  treeViewData: (INode | IGroup)[]
  selectedTreeViewItem: IItem | null
}

const initialState: State = {
  treeViewData: [
    {key: '1', parentKey: '', kind: 'node',  name: 'node 1'},
    {key: '2', parentKey: '', kind: 'group', name: 'group 1', expand: false},
    {key: '3', parentKey: '', kind: 'node',  name: 'node 2'},
    {key: '4', parentKey: '', kind: 'group', name: 'group 2', expand: false}
  ],
  selectedTreeViewItem: null
}

export default class TreeViewExample extends React.Component<object, State> {
  readonly state = initialState

  onTreeViewItemSelected = (item: IItem | null) => {
    this.setState({selectedTreeViewItem: item})
  }

  render() {
    const { treeViewData, selectedTreeViewItem } = this.state
    return (
      <div className="tree-view-container">
        <TreeView
          layer={0}
          data={treeViewData}
          rootParentKey=''
          selectedItem={selectedTreeViewItem}
          onItemSelected={this.onTreeViewItemSelected}/>
      </div>
    )
  }
}
