import axios from "axios";
import unirest from "unirest";

class SearchBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: String,
      q: String,
      results: [],
      title: String,
      link: String,
      ingredients: String
    };
    this.getIngredients = this.getIngredients.bind(this);
    this.handleI = this.handleI.bind(this);
    this.handleJ = this.handleJ.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div className="searchBoxContainer">
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <label>
              Ingredients:
              <input type="text" name="ingredients" onChange={this.handleI} />
            </label>
            <label>
              Type:
              <input type="text" name="type" onChange={this.handleQ} />
              <input type="submit" value="Search" />
            </label>
          </form>
        </div>
        <div className="recipeContainer">
          {this.state.results.map((recipe, i) => (
            <span className="recipes">
              <span className="title">
                {recipe.title}
                {<br />}
                {"–––––––––––––––––––––––––––––––––––––"}
              </span>
              {<br />}
              {recipe.ingredients.split(",").map((ingredient, i) => (
                <li className="ingredients">{ingredient}</li>
              ))}
              {<br />}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchBoxes;
