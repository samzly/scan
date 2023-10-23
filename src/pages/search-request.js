import React from "react";
import Layout from "/src/components/layout/layout";
import styled from "styled-components";
import { inputStyle, primaryDark, primaryGrey, primaryLight, secondaryError, smallScreen } from "/src/styles/variables";
import selectArrow from '/src/assets/images/SearchRequestPage/select_arrow.svg';
import imageDocument from '/src/assets/images/SearchRequestPage/image_document.svg';
import imageFolders from '/src/assets/images/SearchRequestPage/image_folders.svg';
import background from '/src/assets/images/SearchRequestPage/background__search-request.svg';
import checkMark from '/src/assets/images/SearchRequestPage/check-mark.svg';
import Button from "/src/components/common/Button";
import useInput from "/src/hooks/useInput";
import useCheckbox from "/src/hooks/useCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { navigate} from "gatsby";
import useLimit from "/src/hooks/useLimit";
import { searchRequest } from "/src/store/slices/searchSlice";
import useInn from "/src/hooks/useInn";
import useDate from "/src/hooks/useDate";
import window from "global/window";


const Main = styled.main`
  display: flex;
  flex-direction: column;
  background: url(${background}) right 80% no-repeat;
  @media ${smallScreen} {
    padding: 20px 0 450px;
    background-size: 95%;
    background-position: 50% 97%;
  }
  .title {
    font-size: 40px;
    letter-spacing: 1.2px;
    margin-bottom: 25px;
    @media ${smallScreen} {
      font-size: 28px;
      letter-spacing: 0.28px;
      margin: 0 14px 25px;
    }
  }
  .description {
    font-size: 20px;
    letter-spacing: 0.4px;
    @media ${smallScreen} {
      width: 260px;
      font-size: 18px;
      margin: 0 14px;
    }
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
    @media ${smallScreen} {
      width: 60px;
      height: 72px;
      background-size: 100%;
      background-repeat: no-repeat;
      left: 80vw;
      top: 190px;
    }
  }
  .image_folders {
    width: 140px;
    min-height: 68px;
    left: calc(60px + 817px + 5vw + 15vw);
    top: calc(93px + 10vh + 18px);
    background: url(${imageFolders});
    @media ${smallScreen} {
      display: none;
    }
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
  @media ${smallScreen} {
    width: 375px;
    height:688px;
    padding: 24px 20px 27px;
    margin: 21px 0 0;
    column-gap: 0;
    flex-wrap: nowrap;
  }
  .label {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 85px;
    font-size: 18px;
    letter-spacing: 0.54px;
    position: relative;
    .input_title {
      width: max-content;
    }
    .input, .select, .option {
      ${inputStyle};
      font-size: 14px;
      letter-spacing: 0.42px;
    }
    .input {
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
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
    .error {
      color: ${secondaryError};
      font-size: 14px;
      letter-spacing: 0.14px;
      position: absolute;
      bottom: -25px;
      width: 210px;
      text-align: center;
      left: calc(50% - 210px / 2);
    }
    .error_date {
      left: calc((372px - 210px) / 2);
      @media ${smallScreen} {
        left: calc(50% - 210px / 2);
        bottom: -90px;
      }
    }
    .input_error {
      color: ${secondaryError};
      font-size: 14px;
      letter-spacing: 0.42px;
      &::placeholder {
        color: ${secondaryError};
      }
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
  @media ${smallScreen} {
    width: 100%;
  }
  *::placeholder {
    color: ${primaryGrey};
    text-align: center;
  }
`
const DateContainer = styled.div`
  width: calc(2 * 176px + 20px);
  display: flex;
  gap: 20px;
  @media ${smallScreen} {
    width: 100%;
    flex-direction: column;
  }
`

const InputDateContainer = styled.div`
  width: 176px;
  height: 43px;
  position: relative;
  @media ${smallScreen} {
    width: 100%;
  }
`
const DateArrow = styled.img`
  position: absolute;
  left: 146px;
  top: 18px;
  @media ${smallScreen} {
    left: 90%;
  }
`
const InputDate = props => {
    let shownDate = props.value.split('-').reverse().join('.');
    return (
        <InputDateContainer>
            <input className={'input' + (props.error ? ' input_error' : '')} type='text' value={shownDate} placeholder={props.placeholder} onChange={props.onChange}/>
            <input className='input input_date' type='date' value={props.value} onChange={props.onChange}/>
            <DateArrow src={selectArrow}/>
        </InputDateContainer>
    )
}

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 16px;
  @media ${smallScreen} {
    display: none;
  }
`
const CheckboxLabel = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  gap: 17px;
  font-size: 18px;
  letter-spacing: 0.54px;
  ${props => !props.$value ? `opacity: 0.4` : null};
  .checkbox {
    opacity: 0;
    z-index: 10;
    width: 20px;
    height: 20px;
  }
  .checkbox_styled {
    position: absolute;
    display: block;
    opacity: 1;
    width: 20px;
    height: 20px;
    border: 1px solid ${primaryDark};
    content: '';
    ${props => props.$value ? `background: url(${checkMark}) center no-repeat` : null};
  }
`
const Checkbox = (props) => {
    return (
        <CheckboxLabel $value={props.value}>
            <input type='checkbox' className='checkbox' onChange={props.onChange}/>
            <div className='checkbox_styled'/>
            {props.children}
        </CheckboxLabel>
    )
}

const ButtonContainer = styled.div`
  align-self: end;
  margin-top: 138px;
  @media ${smallScreen} {
    width: 100%;
    margin: 0;
    align-self: center;
  }
`

const SearchRequestPage = () => {

    const isAuthorized = useSelector(state => state.user.isAuthorized)
    if (!isAuthorized) {
        navigate('/')
    }

    const
        [inn, setInn, errorInn, setErrorInn] = useInn(),
        [tonality, setTonality] = useInput('any'),
        [limit, setLimit, errorLimit, setErrorLimit] = useLimit('', 1, 1000),
        [startDate, setStartDate, endDate, setEndDate, errorDate, setErrorDate] = useDate(),
        [maxFullness, setMaxFullness] = useCheckbox(false),
        [inBusinessNews, setInBusinessNews] = useCheckbox(false),
        [onlyMainRole, setOnlyMainRole] = useCheckbox(false),
        [onlyWithRiskFactors, setOnlyWithRiskFactors] = useCheckbox(false),
        [excludeTechNews, setExcludeTechNews] = useCheckbox(false),
        [excludeAnnouncements, setExcludeAnnouncements] = useCheckbox(false),
        [excludeDigests, setExcludeDigests] = useCheckbox(false);

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!inn) {
            setErrorInn(true);
            return
        }
        if (!limit) {
            setErrorLimit(true);
            return
        }
        if (!startDate || !endDate) {
            setErrorDate(true);
            return
        }
        const request = {
            'intervalType': 'month',
            'histogramTypes': [
                'totalDocuments',
                'riskFactors'
            ],
            'issueDateInterval': {
                'startDate': startDate + 'T00:00:00+03:00',
                'endDate': endDate + 'T23:59:59+03:00',
            },
            'searchContext': {
                'targetSearchEntitiesContext': {
                    'targetSearchEntities': [
                        {
                            'type': 'company',
                            'sparkId': null,
                            'entityId': null,
                            'inn': inn,
                            'maxFullness': maxFullness,
                            'inBusinessNews': inBusinessNews
                        }
                    ],
                    'onlyMainRole': onlyMainRole,
                    'tonality': tonality,
                    'onlyWithRiskFactors': onlyWithRiskFactors,
                    'riskFactors': {
                        'and': [],
                        'or': [],
                        'not': []
                    },
                    'themes': {
                        'and': [],
                        'or': [],
                        'not': []
                    }
                },
                'themesFilter': {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            'similarMode': 'duplicates',
            'limit': limit,
            'sortType': 'sourceInfluence',
            'sortDirectionType': 'desc',
            'attributeFilters': {
                'excludeTechNews': excludeTechNews,
                'excludeAnnouncements': excludeAnnouncements,
                'excludeDigests': excludeDigests
            },
            'searchArea': {
                'includedSources': [],
                'excludedSources': [],
                'includedSourceGroups': [],
                'excludedSourceGroups': []
            },
        };
        await dispatch(searchRequest(request))
        navigate('/search-response');
    }

    return (
        <Layout>
            <Main>
                <h1 className='title'>Найдите необходимые<br/>данные в пару кликов.</h1>
                <p className='description'>Задайте параметры поиска. <br/>
                    Чем больше заполните, тем точнее поиск</p>
                <div className='image_document' />
                <div className='image_folders' />
                <SearchForm method='POST' action='/' onSubmit={handleSubmit}>
                    <FillableContainer>
                        <label className='label'>
                            <span>ИНН компании<sup>*</sup></span>
                            <input className={'input' + (errorInn ? ' input_error' : '')} placeholder='10 цифр' type='number' value={inn} onChange={setInn}/>
                            {errorInn ? <div className='error'>Введите корректные данные</div> : null}
                        </label>
                        <label className='label'>
                            <span>Тональность</span>
                            <select className='select' value={tonality} onChange={setTonality}>
                                <option className='option' value='any'>Любой</option>
                                <option className='option' value='positive'>Позитивная</option>
                                <option className='option' value='negative'>Негативная</option>
                            </select>
                        </label>
                        <label className='label'>
                            <span className='input_title'>Количество документов в выдаче<sup>*</sup></span>
                            <input className={'input' + (errorLimit ? ' input_error' : '')} placeholder='От 1 до 1000' type='number' value={limit} onChange={setLimit}/>
                            {errorLimit ? <div className='error'>Введите корректные данные</div> : null}
                        </label>
                        <label className='label label_date'>
                            <span className='input_title'>Диапазон поиска<sup>*</sup></span>
                            <DateContainer>
                                <InputDate error={errorDate} value={startDate} placeholder='Дата начала' onChange={setStartDate}/>
                                <InputDate error={errorDate} value={endDate} placeholder='Дата конца' onChange={setEndDate}/>
                                {errorDate ? <div className='error error_date'>Введите корректные данные</div> : null}
                            </DateContainer>
                        </label>
                    </FillableContainer>
                    <CheckboxContainer>
                        <Checkbox value={maxFullness} onChange={setMaxFullness}>
                            Признак максимальной полноты
                        </Checkbox>
                        <Checkbox value={inBusinessNews} onChange={setInBusinessNews}>
                            Упоминания в бизнес-контексте
                        </Checkbox>
                        <Checkbox value={onlyMainRole} onChange={setOnlyMainRole}>
                            Главная роль в публикации
                        </Checkbox>
                        <Checkbox value={onlyWithRiskFactors} onChange={setOnlyWithRiskFactors}>
                            Публикации только с риск-факторами
                        </Checkbox>
                        <Checkbox value={excludeTechNews} onChange={setExcludeTechNews}>
                            Включать технические новости рынков
                        </Checkbox>
                        <Checkbox value={excludeAnnouncements} onChange={setExcludeAnnouncements}>
                            Включать анонсы и календари
                        </Checkbox>
                        <Checkbox value={excludeDigests} onChange={setExcludeDigests}>
                            Включать сводки новостей
                        </Checkbox>
                    </CheckboxContainer>
                    <ButtonContainer>
                        <Button width={
                            window.matchMedia('(max-width: 400px)').matches ? null : '305px'
                        } activeCondition={!errorInn && !errorDate && !errorLimit && tonality}>Поиск</Button>
                        <p className='remark'>* Обязательные к заполнению поля</p>
                    </ButtonContainer>
                </SearchForm>
            </Main>
        </Layout>
    )
}

export default SearchRequestPage

export const Head = () => <>
    <title>Сервис "СКАН" - Поиск данных</title>
</>