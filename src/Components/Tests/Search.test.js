import React  from "react";
import { render,fireEvent } from "@testing-library/react";
import Search from '../Search'
//

it ("renders correctly",()=>{
    const {getByTestId,getByPlaceholderText}=render(<Search/>)
    expect(getByTestId("search-button")).toBeTruthy()
    expect(getByPlaceholderText("Search Anything")).toBeTruthy()
})

describe("Input value",()=>{
    test("updates on Change",()=>{
        const setSearchValue=jest.fn()
        const setSearchError=jest.fn()
        const {getByPlaceholderText}=render(<Search setSearchValue={setSearchValue} setSearchError={setSearchError}/>)

        fireEvent.change(getByPlaceholderText("Search Anything"),{target:{value:"testing input field"}})
         expect(getByPlaceholderText("Search Anything").value).toBe("testing input field")
    })
})

describe("Search Button",()=>{
    describe("With No Search Query Value",()=>{
        test("It doesnt trigger search function ",()=>{
            const onSearchButton=jest.fn()
            const setSearchValue=jest.fn()
            const setSearchError=jest.fn()
            const setResults=jest.fn();
            const {getByTestId,getByPlaceholderText}=render(<Search setSearchValue={setSearchValue} setSearchError={setSearchError} setResults={setResults} onSearchButton={onSearchButton}/>)
            fireEvent.click(getByTestId("search-button"))
            expect (onSearchButton).not.toHaveBeenCalled()
        })
        
    })
    describe("With  Search Query Value",()=>{
        test("It  trigger search function ",()=>{
            const onSearchButton=jest.fn()
            const setSearchValue=jest.fn()
            const setSearchError=jest.fn()
            const setResults=jest.fn();
            const {getByTestId,getByPlaceholderText}=render(<Search setSearchValue={setSearchValue} setSearchError={setSearchError} setResults={setResults} onSearchButton={onSearchButton}/>)
            fireEvent.change(getByPlaceholderText("Search Anything"),{target:{value:"testing input field"}})
            fireEvent.click(getByTestId("search-button"))
            expect (onSearchButton).toHaveBeenCalled()
        })
        
    })
})