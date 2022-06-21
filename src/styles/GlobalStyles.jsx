import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    :root {
        --darkPurple: #392d71;
        --golden: #BEA187;
        
    }

    body,html{
        margin: 0;
        padding: 0;
    }

    .shadow-box{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
`;
export default GlobalStyles;
