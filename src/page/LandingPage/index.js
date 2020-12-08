import React, { useContext, useState } from "react";
import "../../App.css";
import Text from "../../components/Text";

import * as colors from '../../data/constants';

import './landing.css';

import { Logo } from '../../data/images/index';
import { Row, Col, Container } from 'react-bootstrap';

import { UserContext } from "../../providers/UserProvider";

const LandingPage = ({history}) => {
  const { language, setLanguage } = useContext(UserContext)


  return (
    <Container fluid>
        <div className="background" style={{marginBottom: 200}}>
            <Logo />
            <div className="line" style={{marginTop: 12}} />
            <Row style={{width: '100%', textAlign: 'center', paddingTop: 4, paddingBottom: 4}}>
                <Col xs={3} xl={3} onClick={() => history.push('/mypage')}>
                    <div className="LeftSDPink f12">Mypage</div>
                </Col>
                <Col xs={6} xl={6} onClick={() => history.push('/board')}>
                    <div className="LeftSDPink f12">Leaderboard</div>
                </Col>
                <Col xs={3} xl={3}>
                    <div className="LeftSDPink f12">Tutorial</div>
                </Col>
            </Row>
            <div className="line" />

            <div className="landing-content">
                <div className="VPink f24">
                    About
                </div>

                <div className="landing-text">
                    <div className="ko">
                        <div className="LeftSDPink f12">
                            분류의 게임을 디자인해보았다. 분류의 제목을 보고 내용을 예상하는 것, 
                            계획적으로 분류에 분류를 더해 정교한 검색 결과를 의도하는 것, 
                            의도 속에서 발생하는 선택과 폐기라는 것이 게임 속에서 반복된다. 
                        </div>
                        <div className="LeftSDPink f12" style={{marginTop: 20}}>
                            당신은 분류의 기술로 정보와 지식을 다듬는 세공사가 된다. 
                            지식 세공사로서 당신의 목표는 단 하나의 검색 결과를 표시하는 5개의 분류를 선정하는 것이다. 
                            뻔하디뻔한 위키피디아지만, 연습하다 보면 당신도 지식정보사회 속에서 필요한 어떤 지혜를 얻을 수 있지 않을까? 
                        </div>
                    </div>

                    <div className="en">
                        <div className="LeftSDPink f12">
                           Here is a classification game. 
                           Expecting from the title of the classification, 
                           intentionally adding classification to the classification and intending a sophisticated result, 
                           and the choices and discards that occur within the intention are repeated in this play.
                        </div>
                        <div className="LeftSDPink f12" style={{marginTop: 20}}>
                            You become a craftsman who refines information and knowledge with the art of classification. 
                           As a knowledgesmith, your goal is to select 5 categories that display only one search result. 
                           It's obvious Wikipedia, but if you practice, you might get a kind-of wisdom you can use in the knowledge and information society?
                        </div>
                    </div>
                </div>
                <div className="VPink f24" style={{marginTop: 16}}>
                    Credit
                </div>
                <div className="landing-text">
                    <div className="role">
                        <div className="LeftSDPink f12">게임 디자인</div>
                        <div className="LeftSDPink f12">Game Design</div>

                        <div className="LeftSDPink f12" style={{marginTop: 20}}>비주얼 커뮤니케이션</div>
                        <div className="LeftSDPink f12">Visual Communication</div>

                        <div className="LeftSDPink f12" style={{marginTop: 20}}>개발</div>
                        <div className="LeftSDPink f12">Web Dev</div>
                    </div>

                    <div className="name">
                        <div className="LeftSDPink f12">정승기</div>
                        <div className="LeftSDPink f12">Seungki</div>

                        <div className="LeftSDPink f12" style={{marginTop: 20}}>이찬우</div>
                        <div className="LeftSDPink f12">Chanu</div>

                        <div className="LeftSDPink f12" style={{marginTop: 20}}>김유진</div>
                        <div className="LeftSDPink f12">Yoojin</div>
                    </div>
                </div>

            </div>

            
        </div>

        <div className="landing-pc-floating">
             <div className="landing-floating language" style={{justifyContent: 'space-between'}}>
                <div className="styled-btn" 
                onClick={()=>setLanguage('en')}
                style={{height: 32, backgroundColor: language === 'en' ? colors.pink : colors.green, marginRight: 8}}>
                <div className="SDPink f12" style={{
                    color: language === 'en' ? colors.green : colors.pink
                }}>ENGLISH WIKI</div>
                </div>
                <div className="styled-btn"
                onClick={()=>setLanguage('ko')}
                style={{height: 32, backgroundColor: language === 'ko' ? colors.pink : colors.green, marginLeft: 8}}>
                <div className="SDPink f12" style={{
                    color: language === 'ko' ? colors.green : colors.pink
                }}>한글 위키</div>
                </div>
            </div>

            <div className="landing-floating">
                <div className="styled-btn" onClick={() => {
                    history.push(`/game/${language}`)
                }}>
                    <div className="VPink f24">Start Crafting</div>
                </div>
            </div>
        </div>


    </Container>
  )
}

export default LandingPage;