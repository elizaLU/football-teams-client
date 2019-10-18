import request from 'superagent'

export const TEAMS_FETCHED = 'TEAMS_FETCHED'

const baseUrl = 'http://localhost:4000'

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