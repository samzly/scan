import React, {useState} from "react";
import styled from "styled-components";
import arrowLeft from '/src/assets/images/Slider/arrow_left.svg';
import {SwitchTransition, CSSTransition} from "react-transition-group";

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

const Slider = (props) => {
    const [number, setNumber] = useState(3);
    const [switcher, setSwitcher] = useState('')
    if (number >= props.children.length) {
        setNumber(0)
    }  else if (number <= -(props.children.length - 3)) {
        setNumber(3)
    }
    const arraySlides = [...[...props.children].splice(number - 3, 3), ...(number < 3 ? [...props.children].splice(0, number) : '')];
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
                    arraySlides.map((item) => (
                        <SwitchTransition>
                            <CSSTransition key={props.children.indexOf(item)} timeout={0} classNames={switcher}>
                                {item}
                            </CSSTransition>
                        </SwitchTransition>

                    ))
                }
            <ArrowRight onClick={nextSlide}/>
        </Container>
    )
}

export default Slider