import React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { InterfaceStatusButtonFilter } from '../types'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export default function StatusButtonsFilter({ onStatusChange }: InterfaceStatusButtonFilter) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLInputElement
    // @ts-ignore
    onStatusChange(target.textContent)
  }

  return (
    <Box>
      <ButtonGroup variant='text' sx={{ dispaly: 'flex', alignItems: 'baseline' }}>
        <Typography variant='body1' gutterBottom>
          Filter by state:
        </Typography>
        <Button color='success' onClick={handleClick}>
          Approve
        </Button>
        <Button color='error' onClick={handleClick}>
          Cancel
        </Button>
        <Button color='info' onClick={handleClick}>
          Delivery
        </Button>
        <Button color='warning' onClick={handleClick}>
          Traveling
        </Button>
        <Button sx={{ color: 'gray' }} onClick={handleClick}>
          Reset
        </Button>
      </ButtonGroup>
    </Box>
  )
}
