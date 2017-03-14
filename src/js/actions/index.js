import { getAllRepos, getAllPullRequests, getPullRequestDetails } from '../api/githubService';

import config from '../../config/config.json';

export const ActionTypes = {
  ADD_PULL_REQUESTS: 'ADD_PULL_REQUESTS',
  UPDATE_PULL_REQUEST: 'UPDATE_PULL_REQUEST',
  SET_FAILED_REPOS: 'SET_FAILED_REPOS',
  REFRESH: 'REFRESH',
  START_LOADING: 'START_LOADING',
  SET_ERROR: 'SET_ERROR'
};

export function setError(error) {
  return {
    type: ActionTypes.SET_ERROR,
    error
  };
}

export function addPullRequests(pullRequests) {
  return {
    type: ActionTypes.ADD_PULL_REQUESTS,
    pullRequests
  };
}

export function addFailedRepos(failedRepos) {
  return {
    type: ActionTypes.SET_FAILED_REPOS,
    failedRepos
  };
}

export function updatePullRequest(pullRequest) {
  return {
    type: ActionTypes.UPDATE_PULL_REQUEST,
    pullRequest
  };
}

export function addFailedRepo(failedRepo) {
  return {
    type: ActionTypes.ADD_FAILED_REPO,
    failedRepo
  };
}

export function loadPullRequestDetails(owner, repo, number) {
  return dispatch =>
    getPullRequestDetails(owner, repo, number)
      .then(pullRequestData => {
        dispatch(updatePullRequest(pullRequestData));
      });
}
/*
export function loadPullRequests(value) {
  return dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    let repos = config.repos;
    if (value) {
      repos = value;
    }
    return getAllPullRequests(repos)
      .then(pullRequestData => {
        dispatch(addPullRequests(pullRequestData.pullRequests));
        dispatch(addFailedRepos(pullRequestData.failedRepos));
        return pullRequestData;
      }).then(pullRequestData => {
        pullRequestData.pullRequests.forEach(pullRequest => {
          const repo = pullRequest.base.repo;
          dispatch(loadPullRequestDetails(
              repo.owner.login, repo.name, pullRequest.number
          ));
        });
      });
  };
}
*/

export function loadPullRequests(value) {
  return dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    let users = config.users;
    if (value) {
      users = value;
    }
    return getAllRepos(users)
      .then(repos => {
        getAllPullRequests(repos)
          .then(pullRequestData => {
            dispatch(addPullRequests(pullRequestData.pullRequests));
            dispatch(addFailedRepos(pullRequestData.failedRepos));
            return pullRequestData;
          }).then(pullRequestData => {
            pullRequestData.pullRequests.forEach(pullRequest => {
              const repo = pullRequest.base.repo;
              dispatch(loadPullRequestDetails(
                repo.owner.login, repo.name, pullRequest.number
              ));
            });
          });
      });
  };
}

export function refresh() {
  return {
    type: ActionTypes.REFRESH
  };
}
