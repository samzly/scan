import React from "react";
import styled from "styled-components";
import {
    primaryGrey,
    primaryLight,
    secondaryAqua,
    secondaryBlue,
    secondaryOrange, smallScreen
} from "/src/styles/variables";
import imageMock from "/src/assets/images/mock/image_article.jpg"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 641px;
  height: 694px;
  padding: 19px 30px 35px;
  border-radius: 10px;
  background: ${primaryLight};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.20);
  @media ${smallScreen} {
    max-width: 335px;
    padding: 20px 15px;
  }
`
const Header = styled.div`
  margin-bottom: 24px;
  * {
    color: ${primaryGrey};
    font-size: 16px;
    letter-spacing: 0.32px;
    margin-right: 15px;
  }
`
const Title = styled.h3`
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 0.52px;
  @media ${smallScreen} {
    font-size: 19px;
  }
`
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
`
const Tag = styled.div`
  font-size: 12px;
  letter-spacing: 0.24px;
  width: fit-content;
  line-height: 20px;
  height: 20px;
  padding: 0 12px;
  border-radius: 5px;
  background: ${props => props.$color};
  @media ${smallScreen} {
    font-size: 10px;
  }
`
const Image = styled.div`
  width: 100%;
  min-height: 158px;
  border-radius: 10px;
  margin: 17px 0 20px;
  background: url(${props => props.$image}) center/100% no-repeat;
`
const Text = styled.div`
  overflow: hidden;
  font-size: 16px;
  letter-spacing: 0.32px;
  opacity: 0.5;
  margin-bottom: 60px;
  @media ${smallScreen} {
    font-size: 12px;
  }
`
const TextBlur = styled.div`
  height: 30px;
  width: 100%;
  position: absolute;
  bottom: 90px;
  left: 0;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  @media ${smallScreen} {
    bottom: 80px
  }
`
const Button = styled.a`
  display: block;
  position: absolute;
  bottom: 35px;
  left: 30px;
  width: 223px;
  height: 46px;
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  letter-spacing: 0.32px;
  border-radius: 5px;
  background: ${secondaryAqua};
  text-decoration: none;
  @media ${smallScreen} {
    width: 200px;
    left: 15px;
    bottom: 25px;
  }
`
const WordCount = styled.span`
  place-self: end;
  position: absolute;
  bottom: 35px;
  right: 30px;
  font-size: 16px;
  letter-spacing: 0.32px;
  color: ${primaryGrey};
  @media ${smallScreen} {
    font-size: 14px;
    bottom: 25px;
    right: 15px;
  }
`

const Article = React.memo(props => {

    const parseText = text => text.replace(/(&(\/?[^>]+);)/g, '').replace(/(<(\/?[^>]+)>)/g, '').replace(/ +/g, ' ').trim()

    const
        article = props.id.ok,
        source = article.url,
        text = parseText(article.content.markup),
        image = article.content.markup.match(/src="(.+?)"/g),
        sourceSite = source.match(/https?:\/\/(.*?)\//g),
        sourceName = article.source.name,
        date = article.issueDate.slice(0, 10).split('-').reverse().join('.'),
        title = parseText(article.title.text),
        isTechNews = article.attributes.isTechNews,
        isAnnouncements = article.attributes.isAnnouncement,
        isDigest = article.attributes.isDigest,
        wordCount = article.attributes.wordCount;

    return (

        <Container>
            <Header>
                <span>{date}</span>
                <a href={sourceSite ? sourceSite[0] : null} target='_blank'>{sourceName}</a>
            </Header>
            <Title>{title}</Title>
            <TagContainer>
                {isTechNews ? <Tag $color={secondaryOrange}>Технические новости</Tag> : null}
                {isAnnouncements ? <Tag $color={secondaryAqua}>Анонсы и события</Tag> : null}
                {isDigest ? <Tag $color={secondaryBlue}>Сводки новостей</Tag> : null}
            </TagContainer>
            <Image $image={image ? image[0].replace(/src=/, '') : imageMock}/>
            <Text>
                {text}
            </Text>
            <TextBlur/>
            {source ? <Button href={source} target='_blank'>Читать в источнике</Button> : null}
            <WordCount>{wordCount} слова</WordCount>
        </Container>
    )
})

export default Article

