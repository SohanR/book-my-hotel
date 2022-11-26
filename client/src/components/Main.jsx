import React from "react";
import styled from "styled-components";
import HeroImage from "./../assets/hero.png";
import Button from "./Button";

const Main = () => {
    return (
        <Section>
          <div className="background">
            <img src={HeroImage} alt="Hero" />
          </div>
          <div className="content">
            <div className="info">
              <h1>It's Time To</h1>
              <h1>Explore The World</h1>
              <a href="http://localhost:3000/hotels/">
                <Button text="Book Hotel Now" />
              </a>
            </div>
            </div>
        </Section>
      );
    }
    
    const Section = styled.section`
      margin-top: 2rem;
      position: relative;
      .background {
        img {
          height: 90vh;
          width: 100%;
        }
      }
      .content {
        .info {
          position: absolute;
          top: 5rem;
          margin-left: 8rem;
          h1 {
            font-size: 5rem;
            margin-bottom: 2rem;
          }
        }

    `;
    
    export default Main;