import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { searchArticlesIds } from "/src/store/slices/searchSlice";
import instance from "/axios";
import Button from "/src/components/common/Button";
import Article from "./Article";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ContainerArticles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
  padding: 58px 0;
`
const Articles = () => {

    const request = useSelector(state => state.search.articlesRequest);

    const
        [articles, setArticles] = useState([]),
        [count, setCount] = useState(0);

    //получаем все id

    const dispatch = useDispatch()
    const fetchAllIds = async () => {
        const responseIds = await instance.post('objectsearch', request);
        const articlesIds = responseIds.data.items.map(item => {
            return item.encodedId
        })
        dispatch(searchArticlesIds(articlesIds));
        setCount(0);
    }
    useEffect(() => {
        fetchAllIds().catch(e => console.log(`It's a Bird... It's a Plane... It's ${e}!`));
    }, [])

    //запрашиваем данные на 10 id

    const articlesIds = useSelector(state => state.search.articlesIds);
    const [isShown, setShown] = useState(false);
    let articlesShown;
    const fetchShownIds = async () => {
        if (articlesIds.length <= 10) {
            articlesShown = articlesIds.slice(count);
        } else {
            articlesShown = articlesIds.slice(count, count + 10);
            setShown(true)
        }
        if (articlesShown.length < 10) setShown(false);
        const response = await instance.post('documents', {
            "ids": articlesShown
        })
        setArticles([...articles, ...response.data]);
    }
    useEffect(() => {
        fetchShownIds().catch(e => {
            console.log(`It's a Bird... It's a Plane... It's ${e}!`);
            articles.map((item, index) => {
                console.log('article #', index, ' with error: ', item.fail)
            })
        })
    }, [count, articlesIds])

    const handleClick = () => {
        setCount(count + 10);
    }

    return (
        <Container>
            <ContainerArticles>
                {articles ? articles.map((item, index) => (
                    <Article id={item} key={index}/>
                )) : null}
            </ContainerArticles>
            {isShown ? <Button onClick={handleClick} activeCondition={true} width='305px'>Показать больше</Button> : null}
        </Container>
    )
}

export default Articles

