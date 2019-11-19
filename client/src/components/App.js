import axios from "axios";
import SearchBoxes from "./SearchBoxes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  //on button click, get request to api for relevent recipes, comp for this
  //update state as filling in two boxes  ^^

  //get req to database for saved recipes
  //comp for saved recipes section

  //

  render() {
    return (
      <div className="parentContainer">
        <SearchBoxes />
      </div>
    );
  }
}

export default App;
