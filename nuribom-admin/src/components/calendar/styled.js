import styled from "styled-components";

export const CalendarWrap = styled.div`
    display: flex;
    justify-content : center;
    align-items : center;
    width: 30vw;
    @media screen and (max-width: 950px) {
        width: 24rem;
    }
    @media screen and (max-width: 680px) {
        width: 22rem;
    }
    @media screen and (max-width: 550px) {
        width: 17rem;
    }
    @media screen and (max-width: 420px) {
    }
    @media screen and (max-width: 380px) {
        width: 18rem;
    }
`

export const CalendarSide = styled.div`
    border-left: 1px solid #B4C7E7;
    width: 54vw;
    @media screen and (max-width: 950px) {
        border-left: none;
        margin-top: 2rem;
        border-top: 1px solid #B4C7E7;
        width: auto;
    }
    @media screen and (max-width: 680px) {
    }
    @media screen and (max-width: 550px) {
    }
    @media screen and (max-width: 420px) {
    }
    @media screen and (max-width: 380px) {
    }
`

export const CalendarSideMain = styled.div`
`

export const CalendarSideInner = styled.div`
    margin-top: 2rem;
    display : flex;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 15px;
`

export const MedicineCardOuter = styled.div`
    display: flex;
    justify-content : center;
    height: 17rem;
    overflow-y: scroll;
    @media screen and (max-width: 1200px) {
        height: 20rem;
    }
    &::-webkit-scrollbar {
        width: 0px;
    }
`

export const CallenderCardOuter = styled.div`
    display: flex;
    justify-content : center;
    height: 30rem;
    overflow-y: scroll;
    @media screen and (max-width: 1200px) {
        height: 20rem;
    }
    &::-webkit-scrollbar {
        width: 0px;
    }
`

export const MedicineCardFormDeChecked = styled.div`
    background: white;
    border-radius: 1.25rem;
    margin-top: 1rem;
    border: solid 2px #B4C7E7;
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    @media screen and (max-width: 950px) {
        width: 16rem;
    }
    @media screen and (max-width: 680px) {
        width: 15rem;
    }
    @media screen and (max-width: 550px) {
        width: 15rem;
    }
    
`

export const MedicineCardFormChecked = styled.div`
    background: white;
    border-radius: 1.25rem;
    border: solid 2px #9f9f9f;
    color: #9f9f9f;
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 950px) {
        width: 15rem;
    }
    @media screen and (max-width: 680px) {
        width: 15rem;
    }
    @media screen and (max-width: 550px) {
        width: 15rem;
    }
    
`


export const MedicineCardInner = styled.div`
    width: 35rem;
    white-space: nomal;
    overflow: auto;
    @media screen and (max-width: 950px) {
        width: 15rem;
    }
    @media screen and (max-width: 680px) {
        width: 15rem;
    }
    @media screen and (max-width: 550px) {
        width: 15rem;
    }
`

export const MainMedicineCardInner = styled.div`
    width: 17rem;
    white-space: nomal;
    overflow: auto;
    @media screen and (max-width: 950px) {
        width: 15rem;
    }
    @media screen and (max-width: 680px) {
        width: 15rem;
    }
    @media screen and (max-width: 550px) {
        width: 15rem;
    }
`

export const IconWrap = styled.div``

