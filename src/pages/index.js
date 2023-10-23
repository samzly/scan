import React from "react";
import Layout from "/src/components/layout/layout";
import styled from "styled-components";
import backgroundSectionService from '/src/assets/images/IndexPage/background__section_service.svg';
import backgroundSectionPicture from '/src/assets/images/IndexPage/background__section_picture.svg';
import Button from "/src/components/common/Button";
import iconTimer from '/src/assets/images/Slider/icon_timer.svg';
import iconLoupe from '/src/assets/images/Slider/icon_loupe.svg';
import iconShield from '/src/assets/images/Slider/icon_shield.svg';
import iconSupport from '/src/assets/images/Slider/icon_support.svg';
import iconBeginner from '/src/assets/images/IndexPage/background_tariff-beginner.svg';
import iconPro from '/src/assets/images/IndexPage/background_tariff-pro.svg';
import iconBusiness from '/src/assets/images/IndexPage/background_tariff-business.svg';
import Slide from "/src/components/index/slider/Slide";
import Slider from "/src/components/index/slider/Slider";
import TariffCard from "/src/components/index/TariffCard";
import { secondaryOrange, secondaryAqua, primaryDark, primaryLight, smallScreen } from "/src/styles/variables";
import { navigate } from "gatsby";
import { useSelector } from "react-redux";

const SectionService = styled.section`
  padding-bottom: 90px;
  margin: 70px 0 110px;
  background: url('${backgroundSectionService}') right/639px no-repeat;
  @media ${smallScreen} {
    height: 670px;
    margin: 30px 0 55px;
    padding-bottom: 0;
    background-size: 100%;
    background-position: 50% 100%;
  }
  .title {
    font-size: 60px;
    letter-spacing: 0.6px;
    width: 743px;
    @media ${smallScreen} {
      font-size: 28px;
      letter-spacing: 0.28px;
      width: 100%;
    }
  }
  .annotation {
    font-size: 20px;
    letter-spacing: 0.2px;
    margin: 20px 0 70px;
    @media ${smallScreen} {
      font-size: 18px;
      margin-bottom: 32px;
    }
  }
`
const SectionSlider = styled.section`
  .title {
    font-size: 45px;
    letter-spacing: 0.45px;
    @media ${smallScreen} {
      font-size: 28px;
      letter-spacing: 0.28px;
    }
  }
`
const SectionPicture = styled.div`
  background: url('${backgroundSectionPicture}') no-repeat;
  height: 576px;
  @media ${smallScreen} {
    height: 420px;
    background-size: 250%;
    background-position: 0% 100%;
  }
`
const SectionTariffs = styled.section`
  margin: 108px 0 118px;
  @media ${smallScreen} {
    margin: 80px 0 43px;
  }
  .tariff_cards {
    display: flex;
    justify-content: space-between;
    @media ${smallScreen} {
      flex-direction: column;
      gap: 43px;
    }
  }
  & > .title {
    font-size: 45px;
    letter-spacing: 0.45px;
    margin-bottom: 30px;
    @media ${smallScreen} {
      font-size: 28px;
      letter-spacing: 0.28px;
    }
  }
`

const IndexPage = () => {

    const isAuthorized = useSelector(state => state.user?.isAuthorized);

    return (
        <Layout>
            <main>
                <SectionService>
                    <h1 className='title'>
                        сервис по поиску<br/> публикаций <br/> о компании <br/> по его ИНН
                    </h1>
                    <p className='annotation'>
                        Комплексный анализ публикаций, получение данных <br/>в формате PDF на электронную почту.
                    </p>
                    <Button activeCondition={isAuthorized} width='335px' onClick={e => {
                        e.preventDefault();
                        navigate('/search-request/');
                    }}>Запросить данные</Button>
                </SectionService>
                <SectionSlider>
                    <h2 className='title'>почему <br/>именно мы</h2>
                    <Slider>
                        <Slide img={iconTimer}>Высокая и оперативная скорость обработки заявки</Slide>
                        <Slide img={iconLoupe}>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</Slide>
                        <Slide img={iconShield}>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</Slide>
                        <Slide img={iconSupport}>Лучшие специалисты техподдержки</Slide>
                    </Slider>
                </SectionSlider>
                <SectionPicture/>
                <SectionTariffs>
                    <h2 className='title'>наши тарифы</h2>
                    <div className='tariff_cards'>
                        <TariffCard
                            backgroundImage={iconBeginner}
                            backgroundColor={secondaryOrange}
                            title='Beginner'
                            annotation='Для небольшого исследования'
                            currentPrice='799'
                            oldPrice='1 200'
                            creditPrice='150'
                            featuresArray={[
                                'Безлимитная история запросов',
                                'Безопасная сделка',
                                'Поддержка 24/7',
                            ]}
                        />
                        <TariffCard
                            backgroundImage={iconPro}
                            backgroundColor={secondaryAqua}
                            title='Pro'
                            annotation='Для HR и фрилансеров'
                            currentPrice='1 299'
                            oldPrice='2 600'
                            creditPrice='279'
                            featuresArray={[
                                'Все пункты тарифа Beginner',
                                'Экспорт истории',
                                'Рекомендации по приоритетам',
                            ]}
                        />
                        <TariffCard
                            backgroundImage={iconBusiness}
                            backgroundColor={primaryDark}
                            textColor={primaryLight}
                            title='Business'
                            annotation='Для корпоративных клиентов'
                            currentPrice='2 379'
                            oldPrice='3 700'
                            featuresArray={[
                                'Все пункты тарифа Pro',
                                'Безлимитное количество запросов',
                                'Приоритетная поддержка',
                            ]}
                        />
                    </div>
                </SectionTariffs>
            </main>
        </Layout>
    )
}

export default IndexPage;

export const Head = () => <>
    <title>Сервис "СКАН" - Главная</title>
</>