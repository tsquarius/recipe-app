import React from "react";
import styled from "styled-components";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const DivRow = styled.div`
  color: gray;
  min-height: 200px;
  border-radius: 10px;
  margin-bottom: 2px;
  @media (min-width: 700px) {
    height: 400px;
    display: flex;
    flex-direction: row;
  }
`;

const DivVertical = styled.div`
  color: gray;
  min-height: 200px;
  border-radius: 10px;
  margin-bottom: 2px;
  @media (min-width: 700px) {
    height: 400px;
    display: flex;
    flex-direction: column;
  }
`;

const SubHeaders = styled.h2`
  font-weight: 400;
  font-size: 36px;
  margin: 20px;
`;

const NavButton = styled.div`
  color: gray;
  width: 25%;
  a {
    width: 100%;
  }
  :hover {
    background: #c1c0ff;
    transition: 0.3s background ease;
  }
`;

const Paragraph = styled.p`
  width: 75%;
  margin: 0 auto;
`;

const AboutImg = styled.img`
  width: 50%;
  height: 55%;
  overflow: hidden;
  object-fit: cover;
  margin: auto;
  margin-top: 10px;
`;

const HowImg = styled.img`
  width: 50%;
  height: 70%;
  overflow: hidden;
  object-fit: cover;
  margin-top: 10px;
`;

const Github = styled.a`
  font-weight: bold;
  :hover {
    text-decoration: underline;
  }
`;

const Welcome = props => {
  return [
    <nav id="Top" key="nav" className="welcome-nav">
      <NavButton>
        <HashLink smooth to="/#Intro">
          What is Forage?
        </HashLink>
      </NavButton>
      <NavButton>
        <HashLink smooth to="#HowTo">
          How to use Forage
        </HashLink>
      </NavButton>
      <NavButton>
        <HashLink smooth to="/#About">
          About
        </HashLink>
      </NavButton>
      <NavButton>
        <Link to="/recipes">Get Started</Link>
      </NavButton>
    </nav>,

    <DivVertical key="what" id="Intro" className="main-content-section">
      <SubHeaders>What is Forage?</SubHeaders>
      <Paragraph>
        Forage is mobile-ready webapp designed for hungry users who want to
        experiment with different recipes using ingredients already in their
        kitchen. Users are also invited to share their own recipe creations.
      </Paragraph>
      <AboutImg src="https://firebasestorage.googleapis.com/v0/b/recipeapp-258123.appspot.com/o/burgers-with-fries-and-tomatoes-2454533.jpg?alt=media&token=f747ec9c-0a4f-44c0-a23e-cb174549aca2" />
    </DivVertical>,
    <DivRow key="how" id="HowTo" className="main-content-section">
      <SubHeaders>How do I use Forage?</SubHeaders>
      <div>
        <h3>Search a Recipe</h3>
        <Paragraph>
          Start by entering an ingredient in the search bar and gain access
          recipes in an instant!
        </Paragraph>
        <HowImg src="https://firebasestorage.googleapis.com/v0/b/recipeapp-258123.appspot.com/o/search.gif?alt=media&token=4911918e-efb1-477d-a9b7-9febba08389c" />
      </div>
      <div>
        <h3>Upload a Recipe</h3>
        <p>
          Once you've signed up and logged in, click on "Submit Recipe" and
          begin filling out your recipe.
        </p>
        <HowImg src="https://firebasestorage.googleapis.com/v0/b/recipeapp-258123.appspot.com/o/submit.gif?alt=media&token=cfae34bc-8510-466c-a73e-1e28c0b29f32" />
      </div>
    </DivRow>,
    <DivVertical key="why" id="About" className="main-content-section">
      <SubHeaders>Why was Forage created?</SubHeaders>
      <Paragraph>
        Forage was created as a personal project to help develop my abilities
        with the MERN stack and GraphQL/Apollo. <br />
        <Github href="https://github.com/tsquarius/recipe-app" target="_blank">
          See source on Github
        </Github>
      </Paragraph>

      <Link
        smooth
        to="/recipes"
        className="button"
        style={{
          margin: "auto",
          "font-size": "20px",
          "margin-top": "10px",
          "margin-bottom": "10px"
        }}
      >
        Get Started
      </Link>
    </DivVertical>,
    <div key="scroll" className="bottom-row">
      <HashLink smooth to="/#Top" className="button" style={{ margin: "auto" }}>
        Back to Top
      </HashLink>
    </div>
  ];
};

export default Welcome;
