import React from "react";
import { useSelector } from "react-redux";
import { navigate } from "gatsby";
import Layout from "/src/components/layout/layout";
import styled from "styled-components";
import background from "/src/assets/images/SearchResponsePage/background__search-response.svg";
import { primaryGrey, smallScreen } from "/src/styles/variables";
import SliderSearch from "/src/components/search-response/SliderSearch";
import Articles from "/src/components/search-response/articles/Articles";

const Main = styled.main`
  display: flex;
  flex-direction: column;
`
const SectionPresentation = styled.section`
  background: url(${background}) right/30% no-repeat;
  padding: 69px 0 127px;
  @media ${smallScreen} {
    padding: 20px 0 314px;
    background-size: 100%;
    background-position: 50% 85%;
  }
  .title {
    font-size: 40px;
    letter-spacing: 1.6px;
    margin-bottom: 36px;
    @media ${smallScreen} {
      margin-bottom: 21px;
      font-size: 28px;
      letter-spacing: 0.28px;
    }
  }
  .description {
    font-size: 20px;
    letter-spacing: 0.4px;
    @media ${smallScreen} {
      font-size: 17px;
      letter-spacing: 0.12px;
    }
  }
`
const SectionSlider = styled.section`
  .title_total-articles {
    font-size: 30px;
    letter-spacing: 0.6px;
    @media ${smallScreen} {
      font-size: 28px;
      letter-spacing: 0.28px;
    }
  }
  .text_total-articles {
    color: ${primaryGrey};
    margin-top: 17px;
    font-size: 18px;
    letter-spacing: 0.36px;
  }
`
const SectionArticles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 109px;
  .title_articles {
    align-self: start;
    font-size: 30px;
    letter-spacing: 0.6px;
  }
`

const SearchResponsePage = () => {

    const isAuthorized = useSelector(state => state.user.isAuthorized)
    if (!isAuthorized) {
        navigate('/')
    }

    const
        articlesDates = useSelector(state => state.search.articlesDates);

    let totalArticles = 0;
    for (let i = 0; i < articlesDates.length; i++) {
        totalArticles = totalArticles + articlesDates[i].value;
    }

    return (
        <Layout>
            <Main>
                <SectionPresentation>
                    <h1 className='title'>Ищем. Скоро <br/> будут результаты</h1>
                    <p className='description'>Поиск может занять некоторое время,<br/>просим сохранять терпение.</p>
                </SectionPresentation>
                <SectionSlider>
                    <h2 className='title_total-articles'>Общая сводка</h2>
                    <p className='text_total-articles'>Найдено {totalArticles} вариантов</p>
                    <SliderSearch/>
                </SectionSlider>
                <SectionArticles>
                    <h2 className='title_articles'>Список документов</h2>
                    <Articles />
                </SectionArticles>
            </Main>
        </Layout>
    )
}

export default SearchResponsePage

export const Head = () => <>
    <title>Сервис "СКАН" - Результаты поиска</title>
</>