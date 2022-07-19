import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

function Online({user}) {
  return (
    <>
    <ListItem
            
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt=''
                  src={user.profilePicture}
                />
              </ListItemAvatar>
              <ListItemText id='' primary={user.username} />
            </ListItemButton>
          </ListItem>
    </>
  )
}

export default Online