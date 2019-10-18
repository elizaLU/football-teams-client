import request from 'superagent'

export const TEAMS_FETCHED = 'TEAMS_FETCHED'

const baseUrl = 'http://localhost:5000'

const teamsFetched = teams => ({
  type: TEAMS_FETCHED,
  payload: teams
})

export const loadTeams = () => (dispatch, getState) => {
  // when the state already contains events, we don't fetch them again
  if (getState().teams.length !== 0) return

  // a GET /events request
  request(`${baseUrl}/teams`)
    .then(response => {
      // dispatch an EVENTS_FETCHED action that contains the events
      dispatch(teamsFetched(response.body))
    })
    .catch(console.error)
}

export const TEAM_CREATE_SUCCESS = 'TEAM_CREATE_SUCCESS'

const teamCreateSuccess = team => ({
  type: TEAM_CREATE_SUCCESS,
  payload: team
})

export const createTeam = (data) => dispatch => {
  request
    .post(`${baseUrl}/teams`)
    .send(data)
    .then(response => {
      dispatch(teamCreateSuccess(response.body))
    })
    .catch(console.error)
}

export const FETCH_TEAM_SUCCESS = 'FETCH_TEAM_SUCCESS'

const fetchTeamSuccess = team => ({
  type: FETCH_TEAM_SUCCESS,
  payload: team
})

export const loadTeam = (id) => (dispatch, getState) => {
  console.log('CAN WE GET THE STATE??', getState())
  request(`${baseUrl}/teams/${id}`)
    .then(response => {
      console.log(response)
      dispatch(fetchTeamSuccess(response.body))
    })
}