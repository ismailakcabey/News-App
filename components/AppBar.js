import * as React from 'react'
import { Appbar } from 'react-native-paper'

const Header = ()=>{
    return(
        <Appbar.Header style={{marginTop:40 , backgroundColor:"blue"}}>
            <Appbar.Content title="HomeScreen"/>
        </Appbar.Header>
    )
}

export default Header;