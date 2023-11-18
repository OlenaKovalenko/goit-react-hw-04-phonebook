import { FilterInput, FilterTitle } from "./Filter.styled"

export const Filter = ({ value, onFind }) => {
    return (
        <>
            <FilterTitle>Find contacts by name</FilterTitle>
            <FilterInput type="text" name="name" id="nameFilter" value={value} required onChange={onFind}/>
        </>
    )
}
