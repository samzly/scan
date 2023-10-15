import React, {useEffect, useRef, useState} from "react";
import Layout from "/src/components/layout/layout";
import styled from "styled-components";
import {inputStyle, primaryDark, primaryGrey, primaryLight} from "/src/styles/variables";
import selectArrow from '/src/assets/images/SearchRequestPage/select_arrow.svg';
import imageDocument from '/src/assets/images/SearchRequestPage/image_document.svg';
import imageFolders from '/src/assets/images/SearchRequestPage/image_folders.svg';
import background from '/src/assets/images/SearchRequestPage/background__search-request.svg';
import checkMark from '/src/assets/images/SearchRequestPage/check-mark.svg';
import Button from "../components/common/Button";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background: url(${background}) right 80% no-repeat;
  .title {
    font-size: 40px;
    letter-spacing: 1.2px;
    margin-bottom: 25px;
  }
  .description {
    font-size: 20px;
    letter-spacing: 0.4px;
  }
  .image_folders, .image_document {
    position: absolute;
  }
  .image_document {
    width: 91px;
    min-height: 111px;
    left: calc(60px + 817px + 5vw);
    top: calc(93px + 10vh);
    background: url(${imageDocument});
  }
  .image_folders {
    width: 140px;
    min-height: 68px;
    left: calc(60px + 817px + 5vw + 15vw);
    top: calc(93px + 10vh + 18px);
    background: url(${imageFolders});
  }
`
const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 141px;
  width: 872px;
  height: 543px;
  border-radius: 10px;
  background: ${primaryLight};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.20);
  padding: 20px 37px 0 44px;
  margin: 47px 0 64px;
  .label {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 85px;
    font-size: 18px;
    letter-spacing: 0.54px;
    .input_title {
      width: max-content;
    }
    .input, .select, .option {
      ${inputStyle};
      font-size: 14px;
      letter-spacing: 0.42px;
    }
    .select {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background: url(${selectArrow}) 95% no-repeat;
    }
    .input_date {
      opacity: 0;
      left: 0;
      position: absolute;
      width: inherit;
      z-index: 10;
      padding: 10px;
    }
  }
  .remark {
    color: ${primaryGrey};
    font-size: 14px;
    letter-spacing: 0.42px;
    margin-top: 10px;
  }
`
const FillableContainer = styled.div`
  width: 242px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  *::placeholder {
    color: ${primaryGrey};
    text-align: center;
  }
`
const DateContainer = styled.div`
  width: calc(2 * 176px + 20px);
  display: flex;
  gap: 20px;
`
const InputDateContainer = styled.div`
  width: 176px;
  height: 43px;
  position: relative;
`
const DateArrow = styled.img`
  position: absolute;
  left: 146px;
  top: 18px;
`

const InputDate = (props) => {
    let shownDate = props.value.split('-').reverse().join('.');
    return (
        <InputDateContainer>
            <input className='input' type='text' value={shownDate} placeholder={props.placeholder} onChange={() => {}}/>
            <input className='input input_date' type='date' required value={props.value} onChange={props.onChange}/>
            <DateArrow src={selectArrow}/>
        </InputDateContainer>
    )
}

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 16px;
`
const CheckboxLabel = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  gap: 17px;
  font-size: 18px;
  letter-spacing: 0.54px;
  ${props => !props.$state ? `opacity: 0.4` : null};
  .checkbox {
    opacity: 0;
    z-index: 10;
    width: 20px;
    height: 20px;
  }
  .checkbox_styled{
    position: absolute;
    display: block;
    opacity: 1;
    width: 20px;
    height: 20px;
    border: 1px solid ${primaryDark};
    content: '';
    ${props => props.$state ? `background: url(${checkMark}) center no-repeat` : null};
  }
`
const Checkbox = (props) => {
    return (
        <CheckboxLabel $state={props.state}>
            <input type='checkbox' className='checkbox' value={props.value} onChange={props.onChange}/>
            <div className='checkbox_styled'/>
            {props.children}
        </CheckboxLabel>
    )
}
const ButtonContainer = styled.div`
  align-self: end;
  margin-top: 138px;
`

const SearchRequestPage = () => {

    const
        [inn, setInn] = useState(''),
        [tonality, setTonality] = useState('any'),
        [limit, setLimit] = useState(''),
        [startDate, setStartDate] = useState(''),
        [endDate, setEndDate] = useState(''),
        [maxFullness, setMaxFullness] = useState(false),
        [inBusinessNews, setInBusinessNews] = useState(false),
        [onlyMainRole, setOnlyMainRole] = useState(false),
        [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false),
        [excludeTechNews, setExcludeTechNews] = useState(false),
        [excludeAnnouncements, setExcludeAnnouncements] = useState(false),
        [excludeDigests, setExcludeDigests] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
    }

    const validDate = () => {
        const now = new Date;
        const currentDateArray = [now.getFullYear().toString(), (now.getMonth() + 1).toString(), now.getDate().toString()];
        const startDateArray = startDate.split('-');
        const endDateArray = endDate.split('-');
        return startDateArray <= endDateArray && endDateArray <= currentDateArray;
    }

    return (
        <Layout>
            <Main>
                <h1 className='title'>Найдите необходимые<br/>данные в пару кликов.</h1>
                <p className='description'>Задайте параметры поиска. <br/>
                    Чем больше заполните, тем точнее поиск</p>
                <div className='image_document' />
                <div className='image_folders' />
                <SearchForm method='POST' action='/' onSubmit={submitHandler}>
                    <FillableContainer>
                        <label className='label'>
                            <span>ИНН компании<sup>*</sup></span>
                            <input className='input' placeholder='10 цифр' type='text' value={inn} required onChange={e => setInn(e.target.value)}/>
                        </label>
                        <label className='label'>
                            <span>Тональность</span>
                            <select className='select' value={tonality} required onChange={e => setTonality(e.target.value)}>
                                <option className='option' value='any'>Любой</option>
                                <option className='option' value='positive'>Позитивная</option>
                                <option className='option' value='negative'>Негативная</option>
                            </select>
                        </label>
                        <label className='label'>
                            <span className='input_title'>Количество документов в выдаче<sup>*</sup></span>
                            <input className='input' placeholder='От 1 до 1000' type='text' value={limit} required onChange={e => setLimit(+e.target.value)}/>
                        </label>
                        <label className='label label_date'>
                            <span className='input_title'>Диапазон поиска<sup>*</sup></span>
                            <DateContainer>
                                <InputDate value={startDate} placeholder='Дата начала' onChange={e => setStartDate(e.target.value)}/>
                                <InputDate value={endDate} placeholder='Дата конца' onChange={e => setEndDate(e.target.value)}/>
                            </DateContainer>
                        </label>
                    </FillableContainer>
                    <CheckboxContainer>
                        <Checkbox state={maxFullness} value='maxFullness' onChange={(e) => setMaxFullness(!!e.target.checked)}>
                            Признак максимальной полноты
                        </Checkbox>
                        <Checkbox state={inBusinessNews} value='inBusinessNews' onChange={(e) => setInBusinessNews(!!e.target.checked)}>
                            Упоминания в бизнес-контексте
                        </Checkbox>
                        <Checkbox state={onlyMainRole} value='onlyMainRole' onChange={(e) => setOnlyMainRole(!!e.target.checked)}>
                            Главная роль в публикации
                        </Checkbox>
                        <Checkbox state={onlyWithRiskFactors} value='onlyWithRiskFactors' onChange={(e) => setOnlyWithRiskFactors(!!e.target.checked)}>
                            Публикации только с риск-факторами
                        </Checkbox>
                        <Checkbox state={excludeTechNews} value='excludeTechNews' onChange={(e) => setExcludeTechNews(!!e.target.checked)}>
                            Включать технические новости рынков
                        </Checkbox>
                        <Checkbox state={excludeAnnouncements} value='excludeAnnouncements' onChange={(e) => setExcludeAnnouncements(!!e.target.checked)}>
                            Включать анонсы и календари
                        </Checkbox>
                        <Checkbox state={excludeDigests} value='excludeDigests' onChange={(e) => setExcludeDigests(!!e.target.checked)}>
                            Включать сводки новостей
                        </Checkbox>
                    </CheckboxContainer>
                    <ButtonContainer>
                        <Button width='305px' activeCondition={inn && tonality && limit && validDate()}>Поиск</Button>
                        <p className='remark'>* Обязательные к заполнению поля</p>
                    </ButtonContainer>
                </SearchForm>
            </Main>
        </Layout>
    )
}

export default SearchRequestPage