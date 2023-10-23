import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import arrowRight from "/src/assets/images/SearchResponsePage/arrowRight.svg"
import { primary, primaryGrey, primaryLight, smallScreen } from "/src/styles/variables";
import { useDispatch, useSelector } from "react-redux";
import Loader from "/src/components/common/Loader";
import instance from "/axios";
import { searchArticlesDates } from "/src/store/slices/searchSlice";
import window from "global/window";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 27px 0 107px;
  @media ${smallScreen} {
    margin-bottom: 57px;
  }
`
const ArrowRight = styled.button`
  width: 39px;
  height: 39px;
  border: none;
  background: url('${arrowRight}') center;
  cursor: ${props => props.$end ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$end ? 0.3 : 1};
  @media ${smallScreen} {
    align-self: end;
    margin-bottom: 15px;
  }
  &:hover {
    transform: scale(140%);
  }
`
const ArrowLeft = styled(ArrowRight)`
  rotate: 180deg;
`
const Slider = styled.div`
  height: 158px;
  width: 100%;
  display: flex;
  border-radius: 10px;
  border: 2px solid ${primary};
  background: ${primaryLight};
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  @media ${smallScreen} {
    flex-direction: column;
    height: 140px;
    min-width: 300px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`
const SliderHeader = styled.div`
  min-width: 133px;
  height: 158px;
  padding: 17px 0 17px 28px;
  background: ${primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  @media ${smallScreen} {
    width: 100%;
    height: 70px;
    min-height: 70px;
    justify-content: space-around;
    flex-direction: row;
    padding: 0;
  }
  p {
    color: ${primaryLight};
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.4px;
    @media ${smallScreen} {
      line-height: 70px;
    }
  }
`
const Slide = styled.div`
  min-width: 131px;
  height: 158px;
  padding: 18px 0 18px;
  background: ${primaryLight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media ${smallScreen} {
    width: 300px;
    height: 70px;
    flex-direction: row;
    padding: 20px 40px 20px 10px
  }
  p {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.36px;
    @media ${smallScreen} {
      &:nth-child(2) {
        margin-right: 40px;
      }
    }
  }
`
const Line = styled.rect`
  height: 124px;
  width: 2px;
  fill: ${primaryGrey};
  opacity: 0.4;
`

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media ${smallScreen} {
    width: 300px;
    height: 300px;
  }
`
const SlideContainer = styled.div`
  display: flex;
  .svg {
    height: 100%;
    width: 2px;
    padding: 17px 0;
    @media ${smallScreen} {
      display: none;
    }
  }
`

const SliderSearch = () => {

    const request = useSelector(state => state.search.articlesRequest);

    const
        [translate, setTranslate] = useState(0),
        [sliderContainerWidth, setSliderContainerWidth] = useState(0);
    const refSlider = useRef();

    //получение данных

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const fetchData = async () => {
        setLoader(true);
        const responseDates = await instance.post('objectsearch/histograms', request);
        const totalDocuments = responseDates.data.data[0].data;
        const riskFactors = responseDates.data.data[1].data;
        const articlesDates = [...totalDocuments];
        articlesDates.forEach((item, index) => {
            item.risks = riskFactors[index].value;
            item.numberToSort = (new Date(item.date)).getTime();
            item.date = item.date.slice(0, 10).split('-').reverse().join('.');
        })
        articlesDates.sort((a, b) => {
            return a.numberToSort - b.numberToSort
        })
        articlesDates.forEach(item => delete item.numberToSort)
        dispatch(searchArticlesDates(articlesDates));
        setLoader(false)
    }
    useEffect(() => {
        fetchData().catch(e => console.log(`It's a Bird... It's a Plane... It's ${e}!`))
    }, [])

    const articlesDates = useSelector(state => state.search.articlesDates);

        // работа слайдера

    useEffect(() => {
        setSliderContainerWidth(refSlider.current.getBoundingClientRect().width - 133);
    }, [])
    const maxTranslate = articlesDates.length * 133 - sliderContainerWidth;
    useEffect(() => {
        refSlider.current.scrollLeft = translate;
        if (translate < 0) {
            setTranslate(0);
        } else if (translate > maxTranslate && translate > 0) {
            setTranslate(window.matchMedia("(max-width: 400px)").matches ? 300 : maxTranslate);
            setTranslate(maxTranslate);
        }
    }, [translate])

    // текст загрузки и таймер, если не удалось загрузить

    const [text, setText] = useState('Загружаем данные ')
    let timer = setTimeout(() => {
        if (loader === true)
            setText('Не удалось загрузить')
    }, 10000);
    useEffect(() => {
        clearTimeout(timer)
    }, [timer])

    return (
        <Container>
            <ArrowLeft $end={translate === 0} onClick={() => setTranslate(prev => window.matchMedia("(max-width: 400px)").matches ? prev - 300 : prev - 133)}/>
                <Slider ref={refSlider}>
                    <SliderHeader>
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </SliderHeader>
                    <SliderContainer>
                        <Loader loader={loader} text={text}>
                            {articlesDates.map((item, index) =>
                                <SlideContainer key={index}>
                                    <Slide>
                                        <p>{item.date}</p>
                                        <p>{item.value}</p>
                                        <p>{item.risks}</p>
                                    </Slide>
                                    <svg className='svg'>
                                        <Line/>
                                    </svg>
                                </SlideContainer>
                            )}
                        </Loader>
                    </SliderContainer>
                </Slider>
            <ArrowRight $end={translate === maxTranslate} onClick={() => setTranslate(next => window.matchMedia("(max-width: 400px)").matches ? next + 300 : next + 133)}/>
        </Container>
    )
}

export default SliderSearch