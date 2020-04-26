import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const Form = styled.form`
    width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fe7f09; 
    img {
        width: 250px;
        margin: 10px 0 40px;       
    }
    p {
        color: #fff;
        margin-bottom: 15px;
        border: 1px solid #fff;
        padding: 10px;
        width: 100%;
        text-align: center;
    }
    input {
        flex: 1;
        font-size: 15px;
        padding-botton: 20px;
    }
    button {
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        background: #000;
        height: 56px;
        border: 0;
        border-radius: 10px;
        width: 100%;
        margin-top: 20px;
        cursor: pointer;
    }
    register {
      color: #000;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      background: #fe7f09;
      height: 56px;
      border: 0;
      border-radius: 10px;
      width: 100%;
      margin-top: 20px;
      cursor: pointer;
    }
    hr {
        margin: 20px 0;
        border: none;
        border-bottom: 1px solid #cdcdcd;
        width: 100%;
    }
    a {
        font-size: 16;
        font-weight: bold;
        color: #999;
        text-decoration: none;
    }
`;