import axios from "axios";
import unirest from "unirest";
import faker from "faker";

class SearchBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: "",
      q: "",
      results: [],
      title: String,
      link: String,
      ingredients: String,
      hover: false
    };
    this.getIngredients = this.getIngredients.bind(this);
    this.handleI = this.handleI.bind(this);
    this.handleJ = this.handleJ.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleJ(e) {
    this.setState({
      q: e.target.value
    });
  }
  handleSubmit(e) {
    this.getIngredients();
    this.setState({
      i: "",
      q: ""
    });
    e.preventDefault();
  }

  async getIngredients() {
    let response = await axios({
      method: "GET",
      url: "https://recipe-puppy.p.rapidapi.com/",
      headers: {
        "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
        "x-rapidapi-key": "cb8c96604amsh40f56a11ab937a7p1fe68ejsn788fdccf68b1"
      },
      params: {
        p: 1,
        i: this.state.i,
        q: this.state.q
      }
    })
      .then(response => {
        this.setState({
          results: response.data.results
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
        // width: "100%",
        // height: "100%",
        position: "relative"
      }
    };
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
                Ingredients:&nbsp;
                <input type="text" name="ingredients" onChange={this.handleI} />
              </label>
              <label className="typeLabel">
                {"      "}
                Type:&nbsp;
                <input type="text" name="type" onChange={this.handleQ} />
                <input className="submitButton" type="submit" value="Search" />
              </label>
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
                  <img className="image" src={faker.image.food()} />
                  <img
                    style={styles.heart}
                    src="https://vectorskey.com/wp-content/uploads/2019/01/red-heart-png.png"
                    // onClick={this.saveRecipe(recipe.title, recipe.ingredients)}
                  />
                </div>
                <span className="title">{recipe.title}</span>
                {<br />}
                <div className="recipeColumn">
                  {recipe.ingredients.split(",").map((ingredient, i) => (
                    <li className="ingredients">{ingredient}</li>
                  ))}
                  {<br />}
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBoxes;
