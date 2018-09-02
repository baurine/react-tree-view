import * as React from 'react'
import classNames from 'classnames'

export interface IItem {
  key: string
  kind: 'group' | 'node'
  parentKey: string

  name: string
}

export interface INode extends IItem {
  kind: 'node'
}

export interface IGroup extends IItem {
  kind: 'group'
  expand: boolean
}

type Props = {
  layer: number

  data: IItem[]
  rootParentKey: string
  selectedItem: IItem | null

  onGroupExpandToggle?: (group: IGroup) => void
  onItemSelected?: (item: IItem | null) => void
}

function checkItemSelected(oriItem: IItem, selectedItem: IItem | null): boolean {
  if (selectedItem === null) return false
  return selectedItem.key === oriItem.key
}

export default class TreeView extends React.Component<Props, object> {
  clickGroup = (e: any, group: IGroup) => {
    e.stopPropagation()

    const { onItemSelected, onGroupExpandToggle } = this.props
    onItemSelected && onItemSelected(group)
    onGroupExpandToggle && onGroupExpandToggle(group)
  }

  filterItems = () => {
    const { rootParentKey, data } = this.props
    return data.filter(item => item.parentKey === rootParentKey)
  }

  renderTreeViewItem = (item: IItem) => {
    if (item.kind === 'group') {
      return this.renderGroup(item as IGroup)
    } else {
      return this.renderNode(item as INode)
    }
  }

  renderNode = (item: INode) => {
    const {layer, onItemSelected, selectedItem } = this.props
    return (
      <div key={item.key}
           className={
             classNames('tree-item',
                        'node-item',
                        {selected: checkItemSelected(item, selectedItem)})}
           style={{paddingLeft: `${20*layer}px`}}
           onClick={()=> onItemSelected && onItemSelected(item)}>
        { item.name }
      </div>
    )
  }

  renderGroup = (item: IGroup) => {
    const { layer, selectedItem } = this.props
    return (
      <div className='group-item'
           key={item.key}>
        <div className={
               classNames('tree-item',
                          {selected: checkItemSelected(item, selectedItem)})}
             style={{paddingLeft: `${20*layer}px`}}
             onClick={(e) => this.clickGroup(e, item)}>
          { item.expand ? ' - ' : ' + '}
          { item.name }
        </div>
        {
          item.expand && <TreeView {...this.props} layer={layer+1} rootParentKey={item.key}/>
        }
      </div>
    )
  }

  render() {
    return (
      <div className="tree-view">
        { this.filterItems().map(this.renderTreeViewItem) }
      </div>
    )
  }
}
