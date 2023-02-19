import axios from "axios";
const baseUrl="https://images-api.nasa.gov/search?";
export const searchQuery =(query)=>{
    const url=`${baseUrl}q=${query}&media_type=image&page=1`
    return axios.get(url)
}
export const searchQuerySuggestions =(query)=>{
    const url=`${baseUrl}q=${query}&media_type=image&page=1`
    return axios.get(url)
}
export const searchQueryWithDates =(query,yearStart,yearEnd)=>{
    const url=`${baseUrl}q=${query}&year_start=${yearStart}&year_end=${yearEnd}&page=1&media_type=image`
    return axios.get(url)
}
export const searchById =(id)=>{
    const url=`${baseUrl}nasa_id=${id}`
    return axios.get(url)
}