import { TPriceInput } from '@/types/types'
import { TextField } from '@mui/material'
import React from 'react'


const PriceInput = ({ label, value, className = '', onChange, disabled = false }: TPriceInput) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label>{label}</label>
            <TextField
                type="number"
                value={value}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    )
}

export default PriceInput