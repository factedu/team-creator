import p_data from './players.json'
import roles from './player_roles.json';

function randomArr(data){
    for (var a = 0; a < data.length; a++) {
        var x = data[a];
        var y = Math.floor(Math.random() * (a + 1));
        data[a] = data[y];
        data[y] = x;
    }
    return data;
}

export async function getPlayers(){
    const Max_WK = 1;
    const Max_ALLR = 2;
    const Max_BATS=4;
    const Max_BWL=4;
    const team = [];
    let WK=0,ALLR=0,BATS=0,BWL=0;
    const players = randomArr(p_data);
    players.map(p=>{
        if(p.player_role==='WK' && WK<Max_WK){
            team.push(p);
            WK+=1;
        }
        if (p.player_role === 'ALLR' && ALLR<Max_ALLR){
            team.push(p);
            ALLR+=1;
        }
        if (p.player_role === 'BATS' && BATS<Max_BATS){
            team.push(p);
            BATS+=1;
        }
        if (p.player_role === 'BWL' && BWL < Max_BWL){
            team.push(p);
            BWL+=1;
        }
    });
    return team;
}

export async function getValidPlayers(){
    // attempt to generate valid player's list
    const max_attempt = 10;
    for (let i = 0; i < max_attempt; i++) {
        const players = await getPlayers();
        if(checkValidity(players)){
            return players;
        }
    }
    return [];
}

export function checkValidity(players){
    const max_Score = 100;
    const max_from_a_team = 7;
    let score=0;
    const team=[];
    players.map(p=>{
        score+=parseInt(p.player_credits);
        //put the player in their team group
        if(!team[p.team_id])team[p.team_id]=[];
        team[p.team_id].push(p);
    });
    if(score>max_Score)return false;

    // check for valid team size
    const isValidTeamLength = true;
    team.map(t=>{
        console.log(t.length);
        if(t.length>max_from_a_team){
            isValidTeamLength=false;
        }
    })

    return isValidTeamLength;
}