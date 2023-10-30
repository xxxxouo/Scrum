import { List, Popover,Typography,Divider } from 'antd'
import React from 'react'

function ProjectPopover({children}) {

  const content = (
    <div>
      <Typography.Text type='secondary'>收藏项目</Typography.Text>
      <List size='small'>
        <List.Item>
          <p>物流管理项目</p>
        </List.Item>
        <List.Item>
          <p>物流管理项目</p>
        </List.Item>
      </List>
      <Divider style={{margin:'0 0 5px'}}  />
      <div>创建项目</div>
    </div>
  )

  return (
    <Popover placement="bottom" content={content}>
      {children}
    </Popover>
  )
}

export default ProjectPopover