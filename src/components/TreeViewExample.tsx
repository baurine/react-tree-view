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
    {key: '4', parentKey: '', kind: 'group', name: 'group 2', expand: false},
    {key: '4_1', parentKey: '4', kind: 'node', name: 'node 3'}
  ],
  selectedTreeViewItem: null
}

const findParentKey = (selectedItem: IItem | null) => {
  if (selectedItem === null) return ''
  if (selectedItem.kind === 'group') return selectedItem.key
  return selectedItem.parentKey
}

export default class TreeViewExample extends React.Component<object, State> {
  readonly state = initialState

  onTreeViewItemSelected = (item: IItem | null) => {
    this.setState({selectedTreeViewItem: item})
  }

  onTreeViewItemExpandToggle = (item: IGroup) => {
    const newItems =
      this.state.treeViewData.map(data => {
        if (data.key === item.key) {
          return {...item, expand: !item.expand}
        }
        return data
      })
    this.setState({treeViewData: newItems})
  }

  addGroup = () => {
    this.addItem('group')
  }

  addNode = () => {
    this.addItem('node')
  }

  addItem = (kind: 'group' | 'node') => {
    const name = prompt("input group name:")
    if (name && name.length > 0) {
      const { treeViewData, selectedTreeViewItem } = this.state
      const parentKey = findParentKey(selectedTreeViewItem)
      let key
      if (parentKey === '') {
        key = treeViewData.length + ''
      } else {
        key = parentKey + '_' + treeViewData.length
      }
      let item: IGroup | INode
      if (kind === 'group') {
        item = {
          key,
          parentKey,
          kind,
          name,
          expand: false
        }
      } else {
        item = {
          key,
          parentKey,
          kind,
          name,
        }
      }
      this.setState({
        treeViewData: [
          ...treeViewData,
          item
        ]
      })
    }
  }

  deleteItem = () => {
    const { treeViewData, selectedTreeViewItem } = this.state
    if (selectedTreeViewItem) {
      this.setState({
        treeViewData: treeViewData.filter(item => item.key !== selectedTreeViewItem.key)
      })
    }
  }

  render() {
    const { treeViewData, selectedTreeViewItem } = this.state
    return (
      <div className="tree-view-container">
        <button onClick={this.addGroup}>Add Group</button>
        <button onClick={this.addNode}>Add Node</button>
        {
          selectedTreeViewItem &&
          <button onClick={this.deleteItem}>Delete Item</button>
        }
        <TreeView
          layer={0}
          data={treeViewData}
          rootParentKey=''
          selectedItem={selectedTreeViewItem}
          onItemSelected={this.onTreeViewItemSelected}
          onGroupExpandToggle={this.onTreeViewItemExpandToggle}/>
        <p style={{paddingTop: '60px'}}>
          { JSON.stringify(this.state.treeViewData) }
        </p>
      </div>
    )
  }
}
