import { Link } from "react-router-dom"
import "./Home.css"


export const Home = () => {
    return (
        <>
        <div>
        <div className="container">
        <div className="title-container">
            <h1 className="title">
                <span>Practice Journal</span>
            </h1>
        </div>
          
        <div className="block">
            <div className="block--img block1"></div>
            <div className="block--text">
            <div className="text--head">Dreams</div>
            <div className="text--quote">“Music can change the world because it can change people.”</div>
            <div className="text--person">Bono</div>
            </div>
        </div>

        <div className="block">
            <div className="block--img block2"></div>
            <div className="block--text">
            <div className="text--head">Fun</div>
            <div className="text--quote">“Music has to be about having fun, unless it's abut something else.”</div>
            <div className="text--person">Fleigh</div>
            </div>
        </div>

        <div className="block">
            <div className="block--img block3"></div>
            <div className="block--text">
            <div className="text--head">Write it Down</div>
            <div className="text--quote">“You have absolutely GOT to write down your practice sessions.”</div>
            <div className="text--person">Kendra Schumann</div>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}