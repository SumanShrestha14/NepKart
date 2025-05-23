import { CustomCategory } from "../types"
import { Categories } from "./Categories"
import {SearchInput } from "./SearchInput"

interface searchFiltersProps{
    data:CustomCategory[],
}

export const SearchFilters = ({data,}:searchFiltersProps) =>{
    return(
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput data={data}/> 
            <div className="hidden lg:block">
            <Categories data={data}/>
            </div>
        </div>
    )
} 