import { useState, useEffect } from "react";
import { checkValidity, getPlayers, getValidPlayers } from "./services/team.service";

function App() {
  const [players,setPlayers] = useState([]);
  const [isValid,setIsValid]=useState(false);

  useEffect(()=>{
    getValidPlayers().then(players=>{
      setPlayers(players);
      setIsValid(checkValidity(players));
    })
  },[]);

  
  

  return (
    <div>
      {isValid && <div>Valid</div>}
      {!isValid && <div>Invalid</div>}
      <pre>
        {JSON.stringify(players,null,2)}
      </pre>
    </div>
  );
}

export default App;
