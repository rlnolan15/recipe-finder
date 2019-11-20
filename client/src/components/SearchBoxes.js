import axios from "axios";
import unirest from "unirest";
import faker from "faker";
import Expand from "react-expand-animated";

class SearchBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: "tequila",
      results: [],
      title: String,
      link: String,
      ingredients: String,
      hover: false,
      open: false
    };

    //HTTP REQUESTS//
    this.getIngredients = this.getIngredients.bind(this);
    this.toggle = this.toggle.bind(this);

    //HANDLERS//
    this.handleI = this.handleI.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  onHover() {
    this.setState({
      hover: !this.state.hover
    });
  }
  handleI(e) {
    this.setState({
      i: e.target.value
    });
  }
  handleSubmit(e) {
    this.getIngredients();
    this.setState({
      i: ""
    });
    e.preventDefault();
  }

  async getIngredients() {
    let response = await axios({
      method: "GET",
      url: `https://api.edamam.com/search?q=${this.state.i}&app_id=3ec84f36&app_key=9daeb39e07bf34ea26cf263df010d38b`,
      headers: {
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => {
        console.log(response.data.hits);
        this.setState({
          results: response.data.hits
        });
      })
      .catch(err => {
        throw err;
      });
  }

  // saveRecipe(title, ingredients, e) {
  //   axios
  //     .post("/api/recipes", {
  //       title: title,
  //       ingredients: ingredients,
  //       link: null
  //     })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   e.preventDefault();
  // }

  componentDidMount() {
    this.getIngredients();
  }

  render() {
    const styles = {
      heart: {
        opacity: this.state.hover ? "75.0" : "0.5",
        transition: "opacity 100ms ease-in",
        position: "relative",
        height: "25px",
        width: "25px",
        left: "90%"
      },
      invisWrapper: {
        position: "relative"
      }
    };
    const transitions = ["height", "opacity", "background"];
    return (
      <div className="searchBoxContainer">
        <div className="headerTitleContainer">
          <img
            className="header"
            src="https://vinaigrettesaladkitchen.com/wp-content/uploads/2014/11/VG.17.011-website-new-menu-header.jpg"
          />
          <div className="text">
            <h1>What Can I Make?</h1>
            <div class="quip">
              Stopping your vegetables from going rotten since 2019
            </div>
          </div>
        </div>
        <div className="formDataContainer">
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <label className="ingredientsLabel">
                Random Things From Your Fridge:&nbsp;
                <input
                  type="text"
                  name="ingredients"
                  onChange={this.handleI}
                  className="textBox"
                />
              </label>
              <input className="submitButton" type="submit" value="Search" />
              <button className="favoritesButton">Favorites</button>
            </form>
          </div>
          <div className="recipeContainer">
            {this.state.results.map((recipe, i) => (
              <span className="recipes">
                <div
                  style={styles.invisWrapper}
                  onMouseEnter={this.onHover.bind(this)}
                  onMouseLeave={this.onHover.bind(this)}
                >
                  <img className="image" src={recipe.recipe.image} />
                  <img
                    style={styles.heart}
                    src="https://vectorskey.com/wp-content/uploads/2019/01/red-heart-png.png"
                    // onClick={this.saveRecipe()}
                  />
                </div>
                <span className="title">{recipe.recipe.label}</span>
                <button className="expand" onClick={this.toggle}>
                  See Ingredients!
                </button>
                {<br />}
                <Expand
                  open={this.state.open}
                  duration={500}
                  styles={styles}
                  transitions={transitions}
                >
                  {/* <ExpandBoxes> */}
                  <div className="recipeColumn">
                    {recipe.recipe.ingredientLines.map((ingredient, i) => (
                      <li className="ingredients">{"- " + ingredient}</li>
                    ))}
                  </div>
                  {/* </ExpandBoxes> */}
                </Expand>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBoxes;
