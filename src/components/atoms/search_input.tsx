"use client";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { TSearchInput } from "@/types/types";
import { mapSearchInputOptions } from "@/utils/utils";

const SearchInput = ({ label, options, className = '', onChange, value }: TSearchInput) => {
    const mappedOptions = mapSearchInputOptions(options);
    const renderInput = (params: AutocompleteRenderInputParams) => <TextField {...params} />;
    return (
        <div className={className}>
            <label>{label}</label>
            <Autocomplete
                disablePortal
                options={mappedOptions}
                sx={{ width: 300 }}
                renderInput={renderInput}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default SearchInput
