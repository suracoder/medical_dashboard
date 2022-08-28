
import './App.css';
import Dashboard from './components/Dashboard'
import React from 'react'
import { faUserShield, faCube,faBookMedical,faScrewdriver,faUserCog,faCartArrowDown,faPhotoVideo,faDice,faTag} from '@fortawesome/free-solid-svg-icons'
import IconMenu from './components/snippets/iconMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import AddCategory from './components/AddCategory'
import AddProduct from './components/AddProduct'
import AddItems from './components/editItems'
import Addtags from './components/Addtags'
import Slides from './components/slides'
import SparePart from './components/SparePart'
import loadData from './controller/loader'
import AddManual from './components/AddManual'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: '', color: 'blue', clicked: 'one' }
  }

  makeActive = (id,target) => {
    console.log("clicked here" + id)
      document.getElementById(this.state.clicked).classList.remove("active")
      this.setState({ clicked: id })
      target.classList.add("active")

    


  }
  render() {
    return <div className="flex padding">
      <BrowserRouter>
        <div className="sidenavigation w-20 whitebg lilpadding radius">
          <div  >
            <div id="zero" className="padding radius flex" >
              <FontAwesomeIcon icon={faUserShield} className="riticon" color={"#4BA0FA"} />
              <p className="headertext" style={{ color: "#4267FA" }}>Admin Panel</p>
            </div></div>
          <Link to="/addCategory"  >
            <div id="one" className="padding radius outliner active " onClick={(e)=>this.makeActive("one",e.currentTarget)}>
              <IconMenu text="Category" icon={faDice} color="white" />
            </div>


          </Link>
          <Link to="/editProduct" >
          <div id="two" className="padding radius  outliner" onClick={(e)=>this.makeActive("two",e.currentTarget)}>
            <IconMenu text="Add Product" icon={faCartArrowDown} color="gray" />
            </div>
          </Link>

          <Link to="/editItems" >
          <div id="four" className="padding radius  outliner" onClick={(e)=>this.makeActive("four",e.currentTarget)}>
            <IconMenu text="Add Items" icon={faCube} color="gray" />
            </div>
          </Link>
          <Link to="/addtags">
          <div id="five" className="padding radius  outliner" onClick={(e)=>this.makeActive("five",e.currentTarget)}>
            <IconMenu text="Add Tags" icon={faTag} color="gray" />
            </div>
          </Link>

          <Link to="/addSparePart">
          <div id="seven" className="padding radius  outliner" onClick={(e)=>this.makeActive("seven",e.currentTarget)}>
            <IconMenu text="Add SparePart" icon={faScrewdriver} color="gray" />
            </div>
          </Link>
          <Link to="/addManual">
          <div id="eight" className="padding radius  outliner" onClick={(e)=>this.makeActive("eight",e.currentTarget)}>
            <IconMenu text="Add Manual" icon={faBookMedical} color="gray" />
            </div>
          </Link>

          

          <Link to="/slides">
          <div id="six" className="padding radius  outliner" onClick={(e)=>this.makeActive("six",e.currentTarget)}>
            <IconMenu text="SlideShow" icon={faPhotoVideo} color="gray" />
            </div>
          </Link>
        </div>

        <div className="sidenavigation almostwhitebg w-80 padding radius">

          <Switch>
            <Route path="/" exact  component={Dashboard} />
            <Route path="/addCategory" component={AddCategory} />
            <Route path="/addManual" component={AddManual}/>
            <Route path="/editProduct" component={AddProduct} />
            <Route path="/editItems" component={AddItems} />
            <Route path="/addtags" component={Addtags}/>
            <Route path="/slides" component={Slides}/>
            <Route path="/addSparePart" component={SparePart}/>

          </Switch>

        </div>
      </BrowserRouter>
    </div>


  }
}

export default App;
