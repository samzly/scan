import React, { useState } from "react";
import styled from "styled-components";
import arrowLeft from '/src/assets/images/Slider/arrow_left.svg';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { smallScreen } from "/src/styles/variables";
import window from "global/window";


const ArrowLeft = styled.button`
  width: 39px;
  height: 39px;
  border: none;
  background: url('${arrowLeft}') center;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(140%);
  }
`
const ArrowRight = styled(ArrowLeft)`
  rotate: 180deg;
`
const Container = styled.div`
  width: 100%;
  margin: 70px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${smallScreen} {
    margin-top: 32px;
  }
  .left-enter {
    transform: translateX(-400px);
  }
  .right-enter {
    transform: translateX(400px);
  }
  .left-enter-done, .right-enter-done {
    transform: translateX(0px);
    transition: all 0.5s cubic-bezier(.28,1.42,.18,1.01);
  }
`

const Slider = props => {

    let maxSlides;
    if (window.matchMedia('(max-width: 400px)').matches) {
        maxSlides = 1;
    } else {
        maxSlides = 3;
    }

    const [number, setNumber] = useState(maxSlides);
    const [switcher, setSwitcher] = useState('')

    if (number >= props.children.length) {
        setNumber(0)
    }  else if (number <= -(props.children.length - maxSlides)) {
        setNumber(maxSlides)
    }
    const arraySlides = [...[...props.children].splice(number - maxSlides, maxSlides), ...(number < maxSlides ? [...props.children].splice(0, number) : '')];
    const prevSlide = () => {
        let n = number;
        n--;
        setNumber(n);
        setSwitcher('left');
    }
    const nextSlide = () => {
        let n = number;
        n++;
        setNumber(n);
        setSwitcher('right');
    }

    return (
        <Container>
            <ArrowLeft onClick={prevSlide}/>
                {
                    arraySlides.map((item) => {
                        return (
                            <SwitchTransition>
                                <CSSTransition key={item.props.img.toString()} timeout={0} classNames={switcher}>
                                    {item}
                                </CSSTransition>
                            </SwitchTransition>
                        )
                    })
                }
            <ArrowRight onClick={nextSlide}/>
        </Container>
    )
}

export default Slider