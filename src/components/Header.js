import React from "react";
import styled from "styled-components";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {

    const [user] = useAuthState(auth);

    return (
        <HeaderContainer>
           {/* Header Middle */}
           <HeaderLeft>
               <HeaderAvatar
               onClick={()=> auth.signOut()}
                src={user?.photoURL}
                alt={user?.displayName}
               />

               <AccessTimeIcon/>
           </HeaderLeft>

            
           {/* Header Search */}
            <HeaderSearch>
                <SearchIcon/>
                <input type="text" placeholder="Search Users"/>
            </HeaderSearch>



           {/* Header Right */}
            <HeaderRight>
                <HelpOutlineIcon/>
            </HeaderRight>



        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--app-color);
    color: white;
`;

const HeaderLeft = styled.div`
    display: flex;
    flex: 0.3;
    align-items: center;
    margin-left: 20px;
    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const HeaderSearch = styled.div`
    display: flex;
    flex: 0.4;
    align-items: center;
    opacity: 1;
    background-color: #eae2e2;
    padding: 0 50px;
    color: black;
    border: 1px gray solid;
    border-radius: 20px;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: black;
    }
    > .MuiSvgIcon-root {
        color: black;
    }
`;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;
    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }
`;
