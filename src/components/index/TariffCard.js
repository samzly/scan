import React from "react";
import styled from "styled-components";
import {primaryDark, primaryLight} from "/src/styles/variables";
import itemMark from '/src/assets/images/IndexPage/tariff_item-mark.svg';

                                                                                           // MOCK

import {store} from "../../MOCKS";
import Button from "/src/components/common/Button";

const Container = styled.div`
  width: 415px;
  height: 540px;
  display: grid;
  grid-template-rows: 132px 36px 65px 1fr 107px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.20);
  & > * {
    padding-left: 30px;
  }
`
const Header = styled.div`
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background: url('${props => props.$backgroundImage || null}') ${props => props.$backgroundColor || primaryLight} 95% 30% no-repeat;
  border-radius: 10px 10px 0 0;
  * {
    color: ${props => props.$textColor || 'inherit'};
  }
  .title {
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 0.3px;
    margin-top: 30px;
  }
  .annotation {
    letter-spacing: 0.18px;
  }
`
const MarkCurrent = styled.div`
  grid-row: 2 / 3;
  justify-self: end;
  align-self: end;
  margin-right: 10px;
  padding: 0;
  text-align: center;
  line-height: 24px;
  color: ${primaryLight};
  font-size: 14px;
  letter-spacing: 0.14px;
  width: 134px;
  height: 24px;
  border-radius: 10px;
  background: #3BA5E0;
`
const Price = styled.div`
  grid-row: 3 / 4;
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 10px;
  .currentPrice {
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
  .oldPrice {
    opacity: 0.5;
    font-size: 25px;
    font-weight: 500;
    letter-spacing: 0.25px;
    text-decoration-line: line-through;
  }
  .creditPrice {
    letter-spacing: 0.18px;
  }
`
const Features = styled.div`
  grid-row: 4 / 5;
  padding-top: 59px;
  .list_title {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.2px;
  }
  .list {
    margin-top: 10px;
  }
  .item {
    background: url('${itemMark}') no-repeat;
    list-style-type: none;
    padding-left: 28px;
    letter-spacing: 0.18px;
    margin-bottom: 8px;
  }
`
const ButtonContainer = styled.div`
  grid-row: 5 / 6;
  padding: 0;
  justify-self: center;
  align-self: center;
  * {
    font-size: 20px;
  }

`

const TariffCard = (props) => {

                                                                                        // MOCK


    const current = props.title.toLowerCase() === store.tariff.toLowerCase();
    return (
        <Container style={current ? {border: '2px solid ' + props.backgroundColor} : null}>
            <Header $backgroundImage={props.backgroundImage} $backgroundColor={props.backgroundColor} $textColor={props.textColor}>
                <h3 className='title'>{props.title}</h3>
                <p className='annotation'>{props.annotation}</p>
            </Header>
            {current ? <MarkCurrent>Текущий тариф</MarkCurrent> : null}
            <Price>
                <strong className='currentPrice'>{props.currentPrice} ₽</strong>
                <span className='oldPrice'>{props.oldPrice} ₽</span>
                {props.creditPrice ? <p className='creditPrice'>или {props.creditPrice} ₽/мес. при рассрочке на 24 мес.</p> : null}
            </Price>
            <Features>
                <strong className='list_title'>В тариф входит:</strong>
                <ul className='list'>
                    {props.featuresArray.map((item) => (
                        <li className='item'>{item}</li>
                    ))}
                </ul>
            </Features>
            <ButtonContainer>
                <Button activeCondition={true} backgroundColor={current ? '#D2D2D2' : null} color={current ? primaryDark : null}>
                    {current ? 'Перейти в личный кабинет' : 'Подробнее'}
                </Button>
            </ButtonContainer>
        </Container>
    )
}

export default TariffCard