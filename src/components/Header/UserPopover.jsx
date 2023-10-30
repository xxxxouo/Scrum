import { List, Popover,Typography } from 'antd'
import React from 'react'

function UserPopover({children}) {

  const content = (
    <div>
      <Typography.Text type='secondary'>组员列表</Typography.Text>
      <List size='small'>
        <List.Item>
          <p>组员1</p>
        </List.Item>
        <List.Item>
          <p>组员2</p>
        </List.Item>
      </List>
    </div>
  )

  return (
    <Popover placement="bottom" content={content}>
      {children}
    </Popover>
  )
}

export default UserPopover